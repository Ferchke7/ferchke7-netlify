const GITHUB_API = "https://api.github.com/users/Ferchke7";
const GITHUB_SEARCH_API = "https://api.github.com/search/issues";
const ACTIVITY_CACHE_KEY = "ferdavs.githubActivity.v1";

function ensureFetch() {
    if (typeof fetch !== "function") {
        return Promise.reject(new Error("Fetch API is not available"));
    }

    return Promise.resolve();
}

function isLocalDevelopment() {
    return typeof window !== "undefined" && ["localhost", "127.0.0.1"].includes(window.location.hostname);
}

function normalizeBundle(data) {
    return {
        events: Array.isArray(data?.events) ? data.events : [],
        mergedPullRequests: {
            total: typeof data?.mergedPullRequests?.total === "number" ? data.mergedPullRequests.total : 0,
            items: Array.isArray(data?.mergedPullRequests?.items) ? data.mergedPullRequests.items : [],
        },
        repositories: Array.isArray(data?.repositories) ? data.repositories : [],
        errors: Array.isArray(data?.errors) ? data.errors : [],
    };
}

export function readGithubActivityCache() {
    if (typeof window === "undefined") {
        return null;
    }

    try {
        const cached = window.localStorage.getItem(ACTIVITY_CACHE_KEY);
        return cached ? normalizeBundle(JSON.parse(cached)) : null;
    } catch {
        return null;
    }
}

export function writeGithubActivityCache(bundle) {
    if (typeof window === "undefined") {
        return;
    }

    try {
        window.localStorage.setItem(ACTIVITY_CACHE_KEY, JSON.stringify(bundle));
    } catch {
        // Storage can be unavailable in private browsing; the UI still works without cache.
    }
}

export function getGithubActivityBundle() {
    return ensureFetch()
        .then(() => fetch("/.netlify/functions/github-activity"))
        .then((response) => {
            if (!response.ok) {
                throw new Error("GitHub activity function request failed");
            }

            return response.json();
        })
        .then(normalizeBundle)
        .catch((functionError) => {
            if (!isLocalDevelopment()) {
                throw functionError;
            }

            return Promise.allSettled([getGithubRepositories(), getGithubEvents(), getMergedPullRequests()])
                .then((results) => {
                    const [repoResult, eventResult, prResult] = results;
                    return normalizeBundle({
                        errors: results
                            .filter((result) => result.status === "rejected")
                            .map((result) => ({ source: "github", message: result.reason?.message || "GitHub request failed" })),
                        events: eventResult.status === "fulfilled" ? eventResult.value : [],
                        mergedPullRequests: prResult.status === "fulfilled" ? prResult.value : { total: 0, items: [] },
                        repositories: repoResult.status === "fulfilled" ? repoResult.value : [],
                    });
                });
        });
}

export function getGithubRepositories() {
    return ensureFetch()
        .then(() => fetch(`${GITHUB_API}/repos?per_page=100&sort=pushed`))
        .then((response) => {
            if (!response.ok) {
                throw new Error("GitHub repositories request failed");
            }

            return response.json();
        })
        .then((data) => Array.isArray(data) ? data : []);
}

export function getGithubEvents() {
    return ensureFetch()
        .then(() => fetch(`${GITHUB_API}/events/public?per_page=100`))
        .then((response) => {
            if (!response.ok) {
                throw new Error("GitHub events request failed");
            }

            return response.json();
        })
        .then((data) => Array.isArray(data) ? data : []);
}

export function getMergedPullRequests() {
    const query = encodeURIComponent("author:Ferchke7 is:pr is:merged");

    return ensureFetch()
        .then(() => fetch(`${GITHUB_SEARCH_API}?q=${query}&per_page=50`))
        .then((response) => {
            if (!response.ok) {
                throw new Error("GitHub merged pull requests request failed");
            }

            return response.json();
        })
        .then((data) => ({
            total: typeof data.total_count === "number" ? data.total_count : 0,
            items: Array.isArray(data.items) ? data.items : [],
        }));
}
