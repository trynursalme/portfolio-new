export interface GitHubRepoData {
    name: string;
    full_name: string;
    description: string | null;
    stargazers_count: number;
    language: string | null;
    updated_at: string;
    homepage: string | null;
    readme?: string; // Markdown content
}

export async function fetchGitHubRepo(repoUrl: string): Promise<GitHubRepoData | null> {
    try {
        // Extract owner/repo from URL
        // Supports: https://github.com/owner/repo or just owner/repo
        let repoPath = repoUrl;
        if (repoUrl.startsWith('https://github.com/')) {
            repoPath = repoUrl.replace('https://github.com/', '');
        }
        // Remove trailing slash
        repoPath = repoPath.replace(/\/$/, '');

        // Check if valid format 'owner/repo'
        if (repoPath.split('/').length < 2) return null;

        const headers: HeadersInit = {
            'Accept': 'application/vnd.github.v3+json',
        };

        if (process.env.GITHUB_TOKEN) {
            headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
        }

        // 1. Fetch Repo Info
        const resInfo = await fetch(`https://api.github.com/repos/${repoPath}`, { headers });
        if (!resInfo.ok) {
            console.error(`GitHub API Error: ${resInfo.status} ${resInfo.statusText}`);
            return null;
        }
        const info = await resInfo.json();

        // 2. Fetch README (Raw)
        // We use the raw header or download_url, usually direct raw.githubusercontent is easiest if we know branch,
        // but API allows asking for raw media type.
        const resReadme = await fetch(`https://api.github.com/repos/${repoPath}/readme`, {
            headers: {
                ...headers,
                'Accept': 'application/vnd.github.v3.raw'
            }
        });

        let readme = '';
        if (resReadme.ok) {
            readme = await resReadme.text();
            // Limit readme size to first paragraph or so?
            // Requirement: "First paragraph of README.md"
            // We'll return full for now and process later? Or cut it here.
            // Let's store full (or reasonable chunk) and cut in UI or at save time.
            // Actually, db might get big. Let's truncate to 2000 chars roughly.
            readme = readme.slice(0, 5000);
        }

        return {
            name: info.name,
            full_name: info.full_name,
            description: info.description,
            stargazers_count: info.stargazers_count,
            language: info.language,
            updated_at: info.updated_at,
            homepage: info.homepage,
            readme
        };

    } catch (error) {
        console.error("Failed to fetch GitHub data:", error);
        return null;
    }
}
