/**
 * Github User data response type
 * Endpoint: https://api.github.com/users/{user}
 * Endpoint: https://api.github.com/users/{user}/followers will return user array
 * Endpoint: https://api.github.com/users/{user}/following will return user array
 */
export interface UserResponse {
	login: string
	avatar_url: string
	html_url: string
	repos_url: string
	name: string
	company: string | null
	blog: string | null
	location: string | null
	email: string | null
	bio: string | null
	public_repos: number
	public_gists: number
	followers: number
	following: number
}

/**
 * Github repository data response type
 * Endpoint: https://api.github.com/repos/{owner}/{repository} for single repository
 * Endpoint: https://api.github.com/users/{user}/repos/ will return repositories array
 */
export interface RepoResponse {
	id: number
	name: string
	html_url: string
	description: string
	fork: boolean
	url: string
	pushed_at: string
	git_url: string
	ssh_url: string
	clone_url: string
	svn_url: string
	homepage: string
	language: string
	visibility: string
	parent?: RepoResponse
}

/**
 * Github Commit data response type
 * Endpoint: https://api.github.com/repos/{user}/{repo}/commits/{sha} for single commit
 * Endpoint: https://api.github.com/repos/{user}/{repo}/commits will return commit array
 */
export interface RepositoryCommitResponse {
	sha: string
	commit: {
		author: {
			name: string
			email: string
			date: string
		}
		committer: {
			name: string
			email: string
			date: string
		}
		message: string
	}
	html_url: string
	author: UserResponse
	committer: UserResponse
}
