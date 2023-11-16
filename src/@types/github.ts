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

export interface RepoResponse {
	id: number
	name: string
	full_name: string
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
	forks: number
	watchers: number
	default_branch: string
	parent?: RepoResponse
	subscribers_count: number
}

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

export interface RepositoryReadmeResponse {
	type: string
	encoding: string
	size: number
	name: string
	path: string
	content: string
	sha: string
}

export interface RepositoryIssueResponse {
	html_url: string
	id: number
	number: number
	title: string
	user: UserResponse
	state: 'open' | 'closed'
	comments: number
	created_at: string
	closed_at: string | null
	pull_request?: {
		merged_at: string | null
	}
	body: string
}
