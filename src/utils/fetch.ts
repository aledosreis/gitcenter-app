import {
	GithubRepoResponse,
	GithubUserReposResponse,
	GithubUserResponse,
} from '@/@types/github'

const BASE_API_URL = 'https://api.github.com/'

export async function getUserData(user: string): Promise<GithubUserResponse> {
	const response = await fetch(
		// 'https://api.github.com/users/{user}'
		`${BASE_API_URL}users/${user}`
	)
	return response.json()
}

export async function getRepositories(
	user: string
): Promise<GithubUserReposResponse> {
	const response = await fetch(
		// 'https://api.github.com/users/{user}/repos{?type,page,per_page,sort}'
		`${BASE_API_URL}users/${user}/repos`
	)
	return response.json()
}

export async function getRepositoryData(
	owner: string,
	repository: string
): Promise<GithubRepoResponse> {
	const response = await fetch(
		// 'https://api.github.com/repos/{owner}/{repo}'
		`${BASE_API_URL}repos/${owner}/${repository}`
	)
	return response.json()
}
