import {
	RepoResponse,
	RepositoryCommitResponse,
	UserResponse,
} from '@/@types/github'
import { auth } from '@/auth'

const BASE_API_URL = 'https://api.github.com/'

/**
 * Fetch data from provided url
 * @param url URL of request
 */
async function fetchData(url: string) {
	const session = await auth()
	if (!session) return Response.json({ message: 'Not authenticated' })

	const response = await fetch(url, {
		headers: {
			Authorization: `Bearer ${session.user.access_token}`,
		},
	})

	return response
}

/**
 * Fetch data from Github user
 * @param user username from a Github user
 */
export async function getUserData(user: string): Promise<UserResponse> {
	const url = `${BASE_API_URL}users/${user}`
	const response = await fetchData(url)
	return response.json()
}

/**
 * Fech all repositories owned by a Github user
 * @param user  username from a Github User
 * @variation getCurrentUserRepositories for current user repositories
 */
export async function getRepositories(user: string): Promise<RepoResponse[]> {
	const url = `${BASE_API_URL}users/${user}/repos`
	const response = await fetchData(url)
	return response.json()
}

/**
 * Fech all repositories owned by a Github user
 */
export async function getCurrentUserRepositories(): Promise<RepoResponse[]> {
	const url = `${BASE_API_URL}user/repos`
	const response = await fetchData(url)
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
	const url = `${BASE_API_URL}repos/${owner}/${repository}`
	const response = await fetchData(url)
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
	const url = `${BASE_API_URL}repos/${user}/${repository}/commits`
	const response = await fetchData(url)
	return response.json()
}

/**
 * Fetch followers from Github user
 * @param user username from a Github user
 * @variation getCurrentUserFollowers for current user followers
 */
export async function getUserFollowers(user: string): Promise<UserResponse[]> {
	const url = `${BASE_API_URL}users/${user}/followers`
	const response = await fetchData(url)
	return response.json()
}

/**
 * Fetch followers from Github user
 */
export async function getCurrentUserFollowers(): Promise<UserResponse[]> {
	const url = `${BASE_API_URL}user/followers`
	const response = await fetchData(url)
	return response.json()
}

/**
 * Fetch following from Github user
 * @param user username from a Github user
 * @variation getCurrentUserFollowing for current user following
 */
export async function getUserFollowing(user: string): Promise<UserResponse[]> {
	const url = `${BASE_API_URL}users/${user}/following`
	const response = await fetchData(url)
	return response.json()
}

/**
 * Fetch following from Github user
 */
export async function getCurrentUserFollowing(): Promise<UserResponse[]> {
	const url = `${BASE_API_URL}user/following`
	const response = await fetchData(url)
	return response.json()
}

/**
 * Fetch repository's README.md file
 * @param owner owner of repository
 * @param repository name of repository
 */
export async function getRepositoryReadme(owner: string, repository: string) {
	const url = `${BASE_API_URL}repos/${owner}/${repository}/readme`
	const response = await fetchData(url)
	return response.json()
}
