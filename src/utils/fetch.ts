import {
	RepoResponse,
	RepositoryCommitResponse,
	RepositoryIssueResponse,
	RepositoryReadmeResponse,
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
 */
export async function getCurrentUserFollowers(): Promise<UserResponse[]> {
	const url = `${BASE_API_URL}user/followers`
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
export async function getRepositoryReadme(
	owner: string,
	repository: string
): Promise<RepositoryReadmeResponse> {
	const url = `${BASE_API_URL}repos/${owner}/${repository}/readme`
	const response = await fetchData(url)
	return response.json()
}

/**
 * Fetch repository's collaborators
 * @param owner owner of repository
 * @param repository name of repository
 */
export async function getRepositoryCollaborators(
	owner: string,
	repository: string
): Promise<UserResponse[]> {
	const url = `${BASE_API_URL}repos/${owner}/${repository}/collaborators`
	const response = await fetchData(url)
	return response.json()
}

/**
 * Fetch repository's issues and PRs
 * @param owner owner of repository
 * @param repository name of repository
 */
export async function getRepositoryIssuesAndPRs(
	owner: string,
	repository: string
): Promise<RepositoryIssueResponse[]> {
	const url = `${BASE_API_URL}repos/${owner}/${repository}/issues`
	const response = await fetchData(url)
	return response.json()
}
