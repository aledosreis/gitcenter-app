import {
	FollowersResponse,
	RepoResponse,
	ReposResponse,
	RepositoryCommitsResponse,
	UserResponse,
} from '@/@types/github'

const BASE_API_URL = 'https://api.github.com/'

export async function getUserData(user: string): Promise<UserResponse> {
	const response = await fetch(
		// 'https://api.github.com/users/{user}'
		`${BASE_API_URL}users/${user}`
	)
	return response.json()
}

export async function getRepositories(user: string): Promise<ReposResponse> {
	const response = await fetch(
		// 'https://api.github.com/users/{user}/repos{?type,page,per_page,sort}'
		`${BASE_API_URL}users/${user}/repos`
	)
	return response.json()
}

export async function getRepositoryData(
	owner: string,
	repository: string
): Promise<RepoResponse> {
	const response = await fetch(
		// 'https://api.github.com/repos/{owner}/{repo}'
		`${BASE_API_URL}repos/${owner}/${repository}`
	)
	return response.json()
}

export async function getRepositoryCommits(
	user: string,
	repository: string
): Promise<RepositoryCommitsResponse> {
	const response = await fetch(
		// 'https://api.github.com/repos/{user}/{repo}/commits'
		`${BASE_API_URL}repos/${user}/${repository}/commits`
	)

	return response.json()
}

export async function getUserFollowers(
	user: string
): Promise<FollowersResponse> {
	const response = await fetch(
		// 'https://api.github.com/users/{user}/followers'
		`${BASE_API_URL}users/${user}/followers`
	)

	return response.json()
}

export async function getUserFollowing(
	user: string
): Promise<FollowersResponse> {
	const response = await fetch(
		// 'https://api.github.com/users/{user}/following'
		`${BASE_API_URL}users/${user}/following`
	)

	return response.json()
}
