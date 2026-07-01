import { useEffect, useMemo, useState } from "react";
import { getGithubActivityBundle, readGithubActivityCache, writeGithubActivityCache } from "../api/github";
import { resumeProfile } from "../data/resumeProfile";

const EMPTY_PR_METRICS = { total: 0, items: [] };

function sortByLatestPush(projects) {
    return [...projects].sort((a, b) => new Date(b.pushed_at || 0) - new Date(a.pushed_at || 0));
}

function getTopLanguages(projects) {
    const languageCounts = getLanguageDistribution(projects);

    return languageCounts
        .slice(0, 3)
        .map((item) => item.name);
}

function getLanguageDistribution(projects) {
    const counts = projects.reduce((result, project) => {
        if (!project.language) {
            return result;
        }

        result[project.language] = (result[project.language] || 0) + 1;
        return result;
    }, {});

    return Object.entries(counts)
        .sort(([, totalA], [, totalB]) => totalB - totalA)
        .map(([name, value]) => ({ name, value }));
}

function getKeywordCount(projects, keywords) {
    return projects.filter((project) => {
        const searchableText = `${project.name || ""} ${project.description || ""} ${(project.topics || []).join(" ")}`.toLowerCase();

        return keywords.some((keyword) => searchableText.includes(keyword));
    }).length;
}

function getLatestProject(projects) {
    return sortByLatestPush(projects)[0];
}

function getMonthKey(dateValue) {
    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
        return "Unknown";
    }

    return date.toLocaleDateString("en-US", { month: "short", year: "2-digit" });
}

function getMonthlyActivity(projects) {
    const latestProjects = sortByLatestPush(projects).slice(0, 18);
    const monthCounts = latestProjects.reduce((result, project) => {
        const month = getMonthKey(project.pushed_at);
        result[month] = (result[month] || 0) + 1;
        return result;
    }, {});

    return Object.entries(monthCounts)
        .reverse()
        .map(([month, total]) => ({ month, total }));
}

function getEventTypeDistribution(events) {
    const counts = events.reduce((result, event) => {
        if (!event.type) {
            return result;
        }

        result[event.type] = (result[event.type] || 0) + 1;
        return result;
    }, {});

    return Object.entries(counts)
        .sort(([, totalA], [, totalB]) => totalB - totalA)
        .slice(0, 8)
        .map(([name, value]) => ({ name, value }));
}

function getRepositoryImpact(projects) {
    return [...projects]
        .sort((a, b) => ((b.stargazers_count || 0) + (b.forks_count || 0)) - ((a.stargazers_count || 0) + (a.forks_count || 0)))
        .slice(0, 8)
        .map((project) => ({
            forks: project.forks_count || 0,
            name: project.name,
            stars: project.stargazers_count || 0,
        }));
}

function getFreshRepositories(projects) {
    return sortByLatestPush(projects)
        .slice(0, 8)
        .map((project) => ({
            date: project.pushed_at,
            name: project.name,
            value: Math.max(1, Math.round((Date.now() - new Date(project.pushed_at || 0).getTime()) / 86400000)),
        }));
}

function getPullRequestsByRepository(mergedPullRequests) {
    const groups = mergedPullRequests.items.reduce((result, item) => {
        const repositoryName = getRepositoryNameFromApiUrl(item.repository_url);
        result[repositoryName] = (result[repositoryName] || 0) + 1;
        return result;
    }, {});

    return Object.entries(groups)
        .sort(([, totalA], [, totalB]) => totalB - totalA)
        .slice(0, 8)
        .map(([name, value]) => ({ name, value }));
}

function getSiteUrl(project) {
    if (project.homepage) {
        return project.homepage;
    }

    if (project.has_pages) {
        return `https://ferchke7.github.io/${project.name}/`;
    }

    return "";
}

function getLiveSites(projects) {
    const liveKeywords = ["site", "demo", "portfolio", "landing", "web", "app", "netlify", "pages"];

    return projects
        .filter((project) => {
            const searchableText = `${project.name || ""} ${project.description || ""} ${(project.topics || []).join(" ")}`.toLowerCase();

            return project.homepage || project.has_pages || liveKeywords.some((keyword) => searchableText.includes(keyword));
        })
        .map((project) => ({
            ...project,
            siteUrl: getSiteUrl(project) || project.html_url,
        }));
}

function buildChartData(projects, events, mergedPullRequests) {
    const languageDistribution = getLanguageDistribution(projects);
    const monthlyActivity = getMonthlyActivity(projects);

    return {
        eventTypes: getEventTypeDistribution(events),
        freshness: getFreshRepositories(projects),
        languageDistribution,
        monthlyActivity,
        pullRequestsByRepository: getPullRequestsByRepository(mergedPullRequests),
        radar: resumeProfile.skillClusters,
        repositoryImpact: getRepositoryImpact(projects),
    };
}

function getRepositoryNameFromApiUrl(repositoryUrl) {
    if (!repositoryUrl) {
        return "Unknown repository";
    }

    return repositoryUrl.replace("https://api.github.com/repos/", "");
}

function getContributionGroups(mergedPullRequests) {
    const groups = mergedPullRequests.items.reduce((result, item) => {
        const repositoryName = getRepositoryNameFromApiUrl(item.repository_url);
        const mergedAt = item.pull_request?.merged_at || item.closed_at;
        const group = result[repositoryName] || {
            latestMergedAt: mergedAt,
            repositoryName,
            pullRequests: [],
            total: 0,
        };

        group.total += 1;
        group.latestMergedAt = new Date(mergedAt || 0) > new Date(group.latestMergedAt || 0)
            ? mergedAt
            : group.latestMergedAt;
        group.pullRequests.push({
            id: item.id,
            number: item.number,
            title: item.title,
            url: item.html_url,
            mergedAt,
        });
        result[repositoryName] = group;

        return result;
    }, {});

    return Object.values(groups)
        .sort((a, b) => new Date(b.latestMergedAt || 0) - new Date(a.latestMergedAt || 0))
        .map((group) => ({
            ...group,
            pullRequests: group.pullRequests
                .sort((a, b) => new Date(b.mergedAt || 0) - new Date(a.mergedAt || 0))
                .slice(0, 3),
        }));
}

function getMergedPullRequestList(mergedPullRequests) {
    return mergedPullRequests.items
        .map((item) => ({
            id: item.id,
            mergedAt: item.pull_request?.merged_at || item.closed_at,
            number: item.number,
            repositoryName: getRepositoryNameFromApiUrl(item.repository_url),
            title: item.title,
            url: item.html_url,
        }))
        .sort((a, b) => new Date(b.mergedAt || 0) - new Date(a.mergedAt || 0));
}

export function useGithubActivity() {
    const cachedBundle = readGithubActivityCache();
    const [repositories, setRepositories] = useState(sortByLatestPush(cachedBundle?.repositories || []));
    const [events, setEvents] = useState(cachedBundle?.events || []);
    const [mergedPullRequests, setMergedPullRequests] = useState(cachedBundle?.mergedPullRequests || EMPTY_PR_METRICS);
    const [isLoading, setIsLoading] = useState(!cachedBundle);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;
        setIsLoading(true);

        getGithubActivityBundle()
            .then((bundle) => {
                if (!isMounted) {
                    return;
                }

                setRepositories(sortByLatestPush(bundle.repositories));
                setEvents(bundle.events);
                setMergedPullRequests(bundle.mergedPullRequests);
                setError(bundle.errors.length ? new Error(bundle.errors[0].message) : null);
                writeGithubActivityCache(bundle);
            })
            .catch((requestError) => {
                if (isMounted) {
                    setError(requestError);
                }
            })
            .finally(() => {
                if (isMounted) {
                    setIsLoading(false);
                }
            });

        return () => {
            isMounted = false;
        };
    }, []);

    const describedRepositories = useMemo(
        () => repositories.filter((project) => project.description),
        [repositories]
    );

    const liveSites = useMemo(
        () => getLiveSites(describedRepositories),
        [describedRepositories]
    );

    const stats = useMemo(() => {
        const latestProject = getLatestProject(describedRepositories);
        const topLanguages = getTopLanguages(describedRepositories);
        const pushEvents = events.filter((event) => event.type === "PushEvent").length;
        const stars = describedRepositories.reduce((total, project) => total + (project.stargazers_count || 0), 0);
        const forks = describedRepositories.reduce((total, project) => total + (project.forks_count || 0), 0);

        return {
            backendProjects: getKeywordCount(describedRepositories, ["api", "server", "spring", "asp.net", "backend", ".net"]),
            describedProjects: describedRepositories.length,
            forks,
            frontendProjects: getKeywordCount(describedRepositories, ["react", "frontend", "ui", "web", "typescript"]),
            latestProject,
            liveSites: liveSites.length,
            mergedPullRequests: mergedPullRequests.total,
            pushEvents,
            stars,
            topLanguage: topLanguages[0] || "C# / .NET",
            topLanguages,
        };
    }, [describedRepositories, events, liveSites, mergedPullRequests]);

    const chartData = useMemo(
        () => buildChartData(describedRepositories, events, mergedPullRequests),
        [describedRepositories, events, mergedPullRequests]
    );

    const contributionGroups = useMemo(
        () => getContributionGroups(mergedPullRequests),
        [mergedPullRequests]
    );

    const mergedPullRequestList = useMemo(
        () => getMergedPullRequestList(mergedPullRequests),
        [mergedPullRequests]
    );

    return {
        chartData,
        contributionGroups,
        describedRepositories,
        error,
        events,
        isLoading,
        liveSites,
        mergedPullRequests,
        mergedPullRequestList,
        repositories,
        stats,
    };
}
