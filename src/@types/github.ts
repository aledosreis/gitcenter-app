/**
 * Response type for the endpoint https://api.github.com/users/{user}
 */
export interface GithubUserResponse {
	login: string
	avatar_url: string
	html_url: string
	repos_url: string
	name: string
	location: string | null
	email: string | null
	bio: string | null
	public_repos: number
	public_gists: number
	followers: number
	following: number
}

/**
 * Response type for the endpoint https://api.github.com/repos/{owner}/{repository}
 */
export interface GithubRepoResponse {
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
	parent?: GithubRepoResponse
}

/**
 * Response type for the endpoint https://api.github.com/users/{user}/repos
 */
export type GithubUserReposResponse = GithubRepoResponse[]

interface GithubRepositoryCommitResponse {
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
	author: GithubUserResponse
	committer: GithubUserResponse
}

/**
 * Response type for the endpoint https://api.github.com/repos/{user}/{repo}/commits
 */
export type GithubRepositoryCommitsResponse = GithubRepositoryCommitResponse[]
