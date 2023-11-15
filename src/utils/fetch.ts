import {
	RepoResponse,
	RepositoryCommitResponse,
	UserResponse,
} from '@/@types/github'

const BASE_API_URL = 'https://api.github.com/'

/**
 * Fetch data from Github user
 * @param user username from a Github user
 */
export async function getUserData(user: string): Promise<UserResponse> {
	const response = await fetch(`${BASE_API_URL}users/${user}`)
	return response.json()
}

/**
 * Fech all repositories owned by a Github user
 * @param user  username from a Github User
 */
export async function getRepositories(user: string): Promise<RepoResponse[]> {
	const response = await fetch(`${BASE_API_URL}users/${user}/repos`)
	return response.json()
}

/**
 * Fetch data from a specific repository
 * @param owner username from the repository's owner
 * @param repository name of the repository
 */
export async function getRepositoryData(
	owner: string,
	repository: string
): Promise<RepoResponse> {
	const response = await fetch(`${BASE_API_URL}repos/${owner}/${repository}`)
	return response.json()
}

/**
 * Fetch all commits from a repository
 * @param user username from the repository's owner
 * @param repository name of the repository
 */
export async function getRepositoryCommits(
	user: string,
	repository: string
): Promise<RepositoryCommitResponse[]> {
	const response = await fetch(
		`${BASE_API_URL}repos/${user}/${repository}/commits`
	)

	return response.json()
}

/**
 * Fetch followers from Github user
 * @param user username from a Github user
 */
export async function getUserFollowers(user: string): Promise<UserResponse[]> {
	const response = await fetch(`${BASE_API_URL}users/${user}/followers`)

	return response.json()
}

/**
 * Fetch following from Github user
 * @param user username from a Github user
 */
export async function getUserFollowing(user: string): Promise<UserResponse[]> {
	const response = await fetch(`${BASE_API_URL}users/${user}/following`)

	return response.json()
}
