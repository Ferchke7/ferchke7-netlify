const GITHUB_API = "https://api.github.com/users/Ferchke7";
const GITHUB_SEARCH_API = "https://api.github.com/search/issues";

function ensureFetch() {
    if (typeof fetch !== "function") {
        return Promise.reject(new Error("Fetch API is not available"));
    }

    return Promise.resolve();
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
