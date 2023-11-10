/**
 * Response type for the endpoint https://api.github.com/users/{user}
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
 * Response type for the endpoint https://api.github.com/repos/{owner}/{repository}
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
 * Response type for the endpoint https://api.github.com/users/{user}/repos
 */
export type ReposResponse = RepoResponse[]

interface RepositoryCommitResponse {
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

/**
 * Response type for the endpoint https://api.github.com/repos/{user}/{repo}/commits
 */
export type RepositoryCommitsResponse = RepositoryCommitResponse[]

/**
 * Response type for the endpoint https://api.github.com/users/{user}/followers
 * And https://api.github.com/users/{user}/following
 */
export type FollowersResponse = UserResponse[]
