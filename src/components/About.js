import MyImage from "./images/prof.jpg";
import { Anchor, Avatar, Badge, Container, Group, Loader, SimpleGrid, Text, Title } from "@mantine/core";
import {
    IconBrandGithubFilled,
    IconBrandLinkedin,
    IconChartBar,
    IconCloud,
    IconCode,
    IconExternalLink,
    IconGitPullRequest,
    IconMail,
    IconRocket,
    IconServer,
    IconSparkles,
    IconTopologyStar3,
} from "@tabler/icons-react";
import { useMemo } from "react";
import { resumeProfile } from "../shared/data/resumeProfile";
import { useGithubActivity } from "../shared/hooks/useGithubActivity";
import NeonChart from "../shared/ui/NeonChart";

function getNeonChartOptions(chartData) {
    const textColor = "#f7fbff";
    const mutedColor = "#a8b3c7";

    return {
        language: {
            backgroundColor: "transparent",
            color: ["#25f4ee", "#ff3ea5", "#a3ff12", "#9d6cff", "#ffd166", "#5ef38c"],
            tooltip: { trigger: "item" },
            legend: { bottom: 0, textStyle: { color: mutedColor } },
            series: [
                {
                    type: "pie",
                    radius: ["48%", "72%"],
                    center: ["50%", "42%"],
                    avoidLabelOverlap: true,
                    label: { color: textColor },
                    labelLine: { lineStyle: { color: "rgba(255,255,255,.35)" } },
                    data: chartData.languageDistribution.length
                        ? chartData.languageDistribution
                        : [{ name: "GitHub API", value: 1 }],
                },
            ],
        },
        activity: {
            backgroundColor: "transparent",
            color: ["#25f4ee"],
            tooltip: { trigger: "axis" },
            grid: { left: 34, right: 16, top: 20, bottom: 34 },
            xAxis: {
                type: "category",
                data: chartData.monthlyActivity.map((item) => item.month),
                axisLabel: { color: mutedColor },
                axisLine: { lineStyle: { color: "rgba(255,255,255,.18)" } },
            },
            yAxis: {
                type: "value",
                minInterval: 1,
                splitLine: { lineStyle: { color: "rgba(255,255,255,.08)" } },
                axisLabel: { color: mutedColor },
            },
            series: [
                {
                    type: "bar",
                    barMaxWidth: 34,
                    data: chartData.monthlyActivity.map((item) => item.total),
                    itemStyle: {
                        borderRadius: [8, 8, 2, 2],
                        shadowBlur: 18,
                        shadowColor: "rgba(37,244,238,.42)",
                    },
                },
            ],
        },
        radar: {
            backgroundColor: "transparent",
            color: ["#ff3ea5"],
            tooltip: {},
            radar: {
                radius: "66%",
                splitNumber: 4,
                indicator: chartData.radar.map((item) => ({ name: item.name, max: 100 })),
                axisName: { color: mutedColor },
                splitLine: { lineStyle: { color: "rgba(255,255,255,.12)" } },
                splitArea: { areaStyle: { color: ["rgba(255,255,255,.02)", "rgba(37,244,238,.04)"] } },
                axisLine: { lineStyle: { color: "rgba(255,255,255,.12)" } },
            },
            series: [
                {
                    type: "radar",
                    data: [
                        {
                            value: chartData.radar.map((item) => item.value),
                            name: "Engineering focus",
                            areaStyle: { color: "rgba(255,62,165,.18)" },
                            lineStyle: { width: 3 },
                            symbolSize: 5,
                        },
                    ],
                },
            ],
        },
        events: {
            backgroundColor: "transparent",
            color: ["#25f4ee", "#ff3ea5", "#a3ff12", "#9d6cff", "#ffd166"],
            tooltip: { trigger: "item" },
            series: [
                {
                    type: "pie",
                    roseType: "radius",
                    radius: ["18%", "72%"],
                    center: ["50%", "52%"],
                    label: { color: textColor },
                    labelLine: { lineStyle: { color: "rgba(255,255,255,.35)" } },
                    data: chartData.eventTypes.length ? chartData.eventTypes : [{ name: "Waiting for API", value: 1 }],
                },
            ],
        },
        pullRequestsByRepository: {
            backgroundColor: "transparent",
            color: ["#ff3ea5"],
            tooltip: { trigger: "axis" },
            grid: { left: 120, right: 20, top: 20, bottom: 24 },
            xAxis: {
                type: "value",
                minInterval: 1,
                splitLine: { lineStyle: { color: "rgba(255,255,255,.08)" } },
                axisLabel: { color: mutedColor },
            },
            yAxis: {
                type: "category",
                data: chartData.pullRequestsByRepository.map((item) => item.name),
                axisLabel: { color: mutedColor, width: 112, overflow: "truncate" },
                axisLine: { lineStyle: { color: "rgba(255,255,255,.18)" } },
            },
            series: [
                {
                    type: "bar",
                    data: chartData.pullRequestsByRepository.map((item) => item.value),
                    itemStyle: { borderRadius: [0, 8, 8, 0], shadowBlur: 18, shadowColor: "rgba(255,62,165,.36)" },
                },
            ],
        },
        impact: {
            backgroundColor: "transparent",
            color: ["#25f4ee", "#ffd166"],
            tooltip: { trigger: "axis" },
            legend: { bottom: 0, textStyle: { color: mutedColor } },
            grid: { left: 38, right: 16, top: 20, bottom: 54 },
            xAxis: {
                type: "category",
                data: chartData.repositoryImpact.map((item) => item.name),
                axisLabel: { color: mutedColor, rotate: 28, width: 80, overflow: "truncate" },
                axisLine: { lineStyle: { color: "rgba(255,255,255,.18)" } },
            },
            yAxis: {
                type: "value",
                minInterval: 1,
                splitLine: { lineStyle: { color: "rgba(255,255,255,.08)" } },
                axisLabel: { color: mutedColor },
            },
            series: [
                { name: "Stars", type: "bar", stack: "impact", data: chartData.repositoryImpact.map((item) => item.stars) },
                { name: "Forks", type: "bar", stack: "impact", data: chartData.repositoryImpact.map((item) => item.forks) },
            ],
        },
        freshness: {
            backgroundColor: "transparent",
            color: ["#a3ff12"],
            tooltip: {
                trigger: "axis",
                formatter: (params) => `${params[0].name}<br/>${params[0].value} days since last push`,
            },
            grid: { left: 120, right: 20, top: 20, bottom: 24 },
            xAxis: {
                type: "value",
                splitLine: { lineStyle: { color: "rgba(255,255,255,.08)" } },
                axisLabel: { color: mutedColor },
            },
            yAxis: {
                type: "category",
                inverse: true,
                data: chartData.freshness.map((item) => item.name),
                axisLabel: { color: mutedColor, width: 112, overflow: "truncate" },
                axisLine: { lineStyle: { color: "rgba(255,255,255,.18)" } },
            },
            series: [
                {
                    type: "bar",
                    data: chartData.freshness.map((item) => item.value),
                    itemStyle: { borderRadius: [0, 8, 8, 0], shadowBlur: 16, shadowColor: "rgba(163,255,18,.28)" },
                },
            ],
        },
    };
}

function formatDate(dateValue) {
    if (!dateValue) {
        return "Merged";
    }

    return new Date(dateValue).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function About() {
    const { chartData, contributionGroups, isLoading, mergedPullRequestList, stats } = useGithubActivity();
    const chartOptions = useMemo(() => getNeonChartOptions(chartData), [chartData]);
    const latestProjectName = stats.latestProject?.name || "GitHub repositories";
    const latestProjectDate = stats.latestProject
        ? new Date(stats.latestProject.pushed_at).toLocaleDateString()
        : "live API";

    const metricCards = [
        {
            icon: IconServer,
            stat: stats.describedProjects,
            title: "Public repos",
            text: "Repositories with descriptions and visible engineering context.",
        },
        {
            icon: IconGitPullRequest,
            stat: stats.mergedPullRequests,
            title: "Merged PRs",
            text: "Merged pull requests found through GitHub Search API.",
        },
        {
            icon: IconCloud,
            stat: stats.liveSites,
            title: "Live sites / demos",
            text: "Detected from homepage URLs, GitHub Pages, and live/demo keywords.",
        },
        {
            icon: IconChartBar,
            stat: stats.topLanguage,
            title: "Top language",
            text: `Latest active repo: ${latestProjectName}, updated ${latestProjectDate}.`,
        },
    ];

    return (
        <main>
            <section className="landing-hero">
                <Container size="lg" className="landing-hero-inner">
                <div className="hero-copy">
                    <Badge className="status-badge" leftSection={<IconRocket size={14} />}>
                        {resumeProfile.role}
                    </Badge>
                    <Title order={1} className="hero-title">
                        {resumeProfile.name}
                    </Title>
                    <Text className="hero-subtitle">
                        {resumeProfile.summary}
                    </Text>

                    <Text className="hero-note">
                        I like backend systems that are boring in production: explicit boundaries, reliable message flow,
                        clean persistence, and dashboards that make operational work easier to understand.
                    </Text>

                    <Group spacing="xs" className="skill-badge-row">
                        {resumeProfile.highlights.map((skill) => (
                            <Badge key={skill} className="skill-badge">
                                {skill}
                            </Badge>
                        ))}
                    </Group>

                    <Group spacing="sm" className="hero-actions">
                        <Anchor className="social-link" href={resumeProfile.github} target="_blank" rel="noreferrer">
                            <IconBrandGithubFilled size={20} />
                            GitHub
                        </Anchor>
                        <Anchor className="social-link" href={resumeProfile.linkedin} target="_blank" rel="noreferrer">
                            <IconBrandLinkedin size={20} />
                            LinkedIn
                        </Anchor>
                        <Anchor className="social-link" href={`mailto:${resumeProfile.email}`}>
                            <IconMail size={20} />
                            Email
                        </Anchor>
                    </Group>
                </div>

                <aside className="hero-proof-panel">
                    <div className="profile-orbit">
                        <Avatar className="profile-avatar" src={MyImage} radius="50%" size={190} />
                        <div className="orbit-chip chip-react">Kafka</div>
                        <div className="orbit-chip chip-dotnet">.NET</div>
                        <div className="orbit-chip chip-java">DDD</div>
                    </div>

                    <div className="hero-proof-grid">
                        {metricCards.map((item) => (
                            <article key={item.title}>
                                <Text>{item.title}</Text>
                                <strong>{item.stat}</strong>
                            </article>
                        ))}
                    </div>

                    <div className="availability-card">
                        <IconSparkles size={20} />
                        <Text>Open to backend-heavy full-stack roles, distributed systems work, and open-source collaboration.</Text>
                    </div>
                </aside>
                </Container>
            </section>

            <Container size="lg" py="xl">
            <section className="section-block">
                <div className="section-heading">
                    <Badge variant="outline" color="cyan">Open-source contributions</Badge>
                    <Title order={2}>Merged pull requests, newest first</Title>
                </div>

                {isLoading ? (
                    <div className="loading-state compact-loading">
                        <Loader color="cyan" />
                        <Text color="dimmed">Reading merged PRs from GitHub...</Text>
                    </div>
                ) : (
                    <>
                        <SimpleGrid cols={4} breakpoints={[{ maxWidth: "md", cols: 2 }, { maxWidth: "xs", cols: 1 }]} spacing="lg">
                            {metricCards.map((item) => {
                                const Icon = item.icon;

                                return (
                                    <article className="contribution-card" key={item.title}>
                                        <Icon size={28} />
                                        <Text className="contribution-stat">{item.stat}</Text>
                                        <Title order={3}>{item.title}</Title>
                                        <Text>{item.text}</Text>
                                    </article>
                                );
                            })}
                        </SimpleGrid>

                        <div className="oss-showcase">
                            <aside className="oss-summary-panel">
                                <Text className="oss-kicker">Contribution map</Text>
                                <Title order={3}>{stats.mergedPullRequests} merged pull requests</Title>
                                <Text>
                                    Sorted by merge date from GitHub Search API, newest work first. Repository chips show where the merged work landed.
                                </Text>
                                <div className="oss-repo-chips">
                                    {contributionGroups.map((group) => (
                                        <Anchor
                                            className="oss-repo-chip"
                                            href={`https://github.com/${group.repositoryName}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            key={group.repositoryName}
                                        >
                                            <span>{group.repositoryName}</span>
                                            <strong>{group.total}</strong>
                                        </Anchor>
                                    ))}
                                </div>
                            </aside>

                            <div className="pr-timeline">
                                {mergedPullRequestList.slice(0, 10).map((pullRequest) => (
                                    <Anchor className="pr-timeline-item" href={pullRequest.url} target="_blank" rel="noreferrer" key={pullRequest.id}>
                                        <div className="pr-timeline-node">
                                            <IconGitPullRequest size={18} />
                                        </div>
                                        <div className="pr-timeline-content">
                                            <Group spacing="xs" className="pr-timeline-meta">
                                                <Badge className="skill-badge">{pullRequest.repositoryName}</Badge>
                                                <Text>#{pullRequest.number}</Text>
                                                <Text>{formatDate(pullRequest.mergedAt)}</Text>
                                            </Group>
                                            <strong>{pullRequest.title}</strong>
                                        </div>
                                        <IconExternalLink className="pr-timeline-icon" size={18} />
                                    </Anchor>
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </section>

            <section className="section-block">
                <div className="section-heading">
                    <Badge variant="outline" color="pink" leftSection={<IconTopologyStar3 size={14} />}>
                        Apache ECharts
                    </Badge>
                    <Title order={2}>Live engineering signals</Title>
                </div>

                <SimpleGrid cols={3} breakpoints={[{ maxWidth: "md", cols: 1 }]} spacing="lg">
                    <article className="chart-panel">
                        <Title order={3}>Language distribution</Title>
                        <NeonChart option={chartOptions.language} />
                    </article>
                    <article className="chart-panel">
                        <Title order={3}>Recent repo activity</Title>
                        <NeonChart option={chartOptions.activity} />
                    </article>
                    <article className="chart-panel">
                        <Title order={3}>Engineering focus</Title>
                        <NeonChart option={chartOptions.radar} />
                    </article>
                    <article className="chart-panel">
                        <Title order={3}>GitHub event types</Title>
                        <NeonChart option={chartOptions.events} />
                    </article>
                    <article className="chart-panel chart-panel-wide">
                        <Title order={3}>Merged PRs by repository</Title>
                        <NeonChart option={chartOptions.pullRequestsByRepository} />
                    </article>
                    <article className="chart-panel chart-panel-wide">
                        <Title order={3}>Repository stars and forks</Title>
                        <NeonChart option={chartOptions.impact} />
                    </article>
                    <article className="chart-panel chart-panel-wide">
                        <Title order={3}>Recently pushed repositories</Title>
                        <NeonChart option={chartOptions.freshness} />
                    </article>
                </SimpleGrid>
            </section>

            <section className="section-block closing-section">
                <div className="section-heading">
                    <Badge variant="outline" color="violet" leftSection={<IconCode size={14} />}>Contact</Badge>
                    <Title order={2}>Let's build something reliable</Title>
                </div>

                <div className="closing-card">
                    <Text>
                        If the work involves APIs, distributed workflows, data consistency, or turning complex backend
                        behavior into a clear product surface, that is exactly where I like to be useful.
                    </Text>
                    <Group spacing="sm" className="hero-actions">
                        <Anchor className="social-link" href={resumeProfile.github} target="_blank" rel="noreferrer">
                            <IconBrandGithubFilled size={20} />
                            GitHub
                        </Anchor>
                        <Anchor className="social-link" href={resumeProfile.linkedin} target="_blank" rel="noreferrer">
                            <IconBrandLinkedin size={20} />
                            LinkedIn
                        </Anchor>
                        <Anchor className="social-link" href={`mailto:${resumeProfile.email}`}>
                            <IconMail size={20} />
                            Email
                        </Anchor>
                    </Group>
                </div>
            </section>
        </Container>
        </main>
    )
}
