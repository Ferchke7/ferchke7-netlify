const GITHUB_USER = "Ferchke7";
const GITHUB_API = `https://api.github.com/users/${GITHUB_USER}`;
const GITHUB_SEARCH_API = "https://api.github.com/search/issues";

function githubHeaders() {
    const headers = {
        Accept: "application/vnd.github+json",
        "User-Agent": "ferdavs-portfolio",
        "X-GitHub-Api-Version": "2022-11-28",
    };

    if (process.env.GITHUB_TOKEN) {
        headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    return headers;
}

async function readJson(url) {
    const response = await fetch(url, { headers: githubHeaders() });

    if (!response.ok) {
        const message = await response.text();
        throw new Error(`${response.status} ${response.statusText}: ${message}`);
    }

    return response.json();
}

async function settle(name, request, fallback) {
    try {
        return { name, value: await request(), error: null };
    } catch (error) {
        return { name, value: fallback, error: error.message };
    }
}

exports.handler = async () => {
    const query = encodeURIComponent(`author:${GITHUB_USER} is:pr is:merged`);
    const [repos, events, mergedPullRequests] = await Promise.all([
        settle("repositories", () => readJson(`${GITHUB_API}/repos?per_page=100&sort=pushed`), []),
        settle("events", () => readJson(`${GITHUB_API}/events/public?per_page=100`), []),
        settle("mergedPullRequests", () => readJson(`${GITHUB_SEARCH_API}?q=${query}&per_page=50`), { total_count: 0, items: [] }),
    ]);

    const errors = [repos, events, mergedPullRequests]
        .filter((result) => result.error)
        .map((result) => ({ source: result.name, message: result.error }));

    return {
        statusCode: 200,
        headers: {
            "Cache-Control": "public, max-age=300, stale-while-revalidate=3600",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            errors,
            events: Array.isArray(events.value) ? events.value : [],
            mergedPullRequests: {
                total: typeof mergedPullRequests.value.total_count === "number" ? mergedPullRequests.value.total_count : 0,
                items: Array.isArray(mergedPullRequests.value.items) ? mergedPullRequests.value.items : [],
            },
            repositories: Array.isArray(repos.value) ? repos.value : [],
        }),
    };
};
