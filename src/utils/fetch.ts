import {
	RepoResponse,
	RepositoryCommitResponse,
	UserResponse,
} from '@/@types/github'

const BASE_API_URL = 'https://api.github.com/'

/**
 * Fetch data from Github user
 * @param user username from a Github user
 * @param access_token token for authorization request
 */
export async function getUserData(
	user: string,
	access_token: string
): Promise<UserResponse> {
	const response = await fetch(`${BASE_API_URL}users/${user}`, {
		headers: {
			Authorization: `Bearer ${access_token}`,
		},
	})
	return response.json()
}

/**
 * Fech all repositories owned by a Github user
 * @param user  username from a Github User
 * @param access_token token for authorization request
 */
export async function getRepositories(
	user: string,
	access_token: string
): Promise<RepoResponse[]> {
	const response = await fetch(`${BASE_API_URL}users/${user}/repos`, {
		headers: {
			Authorization: `Bearer ${access_token}`,
		},
	})
	return response.json()
}

/**
 * Fetch data from a specific repository
 * @param owner username from the repository's owner
 * @param repository name of the repository
 * @param access_token token for authorization request
 */
export async function getRepositoryData(
	owner: string,
	repository: string,
	access_token: string
): Promise<RepoResponse> {
	const response = await fetch(`${BASE_API_URL}repos/${owner}/${repository}`, {
		headers: {
			Authorization: `Bearer ${access_token}`,
		},
	})
	return response.json()
}

/**
 * Fetch all commits from a repository
 * @param user username from the repository's owner
 * @param repository name of the repository
 * @param access_token token for authorization request
 */
export async function getRepositoryCommits(
	user: string,
	repository: string,
	access_token: string
): Promise<RepositoryCommitResponse[]> {
	const response = await fetch(
		`${BASE_API_URL}repos/${user}/${repository}/commits`,
		{
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		}
	)

	return response.json()
}

/**
 * Fetch followers from Github user
 * @param user username from a Github user
 * @param access_token token for authorization request
 */
export async function getUserFollowers(
	user: string,
	access_token: string
): Promise<UserResponse[]> {
	const response = await fetch(`${BASE_API_URL}users/${user}/followers`, {
		headers: {
			Authorization: `Bearer ${access_token}`,
		},
	})

	return response.json()
}

/**
 * Fetch following from Github user
 * @param user username from a Github user
 * @param access_token token for authorization request
 */
export async function getUserFollowing(
	user: string,
	access_token: string
): Promise<UserResponse[]> {
	const response = await fetch(`${BASE_API_URL}users/${user}/following`, {
		headers: {
			Authorization: `Bearer ${access_token}`,
		},
	})

	return response.json()
}
