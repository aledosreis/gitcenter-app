import { auth } from '@/auth'
import { Forbidden } from '@/components/Forbidden'
import { IssueList } from '@/components/IssueList'
import { Separator } from '@/components/Separator'
import { getRepositoryIssuesAndPRs } from '@/utils/fetch'
import { ArrowLeftIcon, CircleDotIcon } from 'lucide-react'
import Link from 'next/link'

export default async function RepositoryIssuesPage({
	params: { repoOwner, repoName },
}: {
	params: { repoOwner: string; repoName: string }
}) {
	const session = await auth()
	if (!session) return null

	const {
		user: {
			profile: { login },
		},
	} = session

	if (repoOwner !== login) {
		return (
			<Forbidden title='You can not see issues from repositories you do not own.' />
		)
	}

	const issues = (await getRepositoryIssuesAndPRs(repoOwner, repoName)).filter(
		(issue) => !issue.pull_request
	)

	const NEW_ISSUE_URL = `https://github.com/${repoOwner}/${repoName}/issues/new`

	return (
		<div className='flex flex-col w-full gap-5 px-1'>
			{/* Header */}
			<div className='bg-card px-3 py-1 rounded-md flex justify-between items-center'>
				<h1 className='text-2xl flex gap-2 items-center'>
					<CircleDotIcon className='text-open' />
					Issues from {repoOwner}/{repoName}
				</h1>

				<Link
					href={`/repositories/${repoOwner}/${repoName}`}
					className='border px-2 py-1 rounded-md flex gap-2 items-center'>
					<ArrowLeftIcon />
					Back to repository
				</Link>
			</div>

			<Separator />

			{/* Issues list */}
			<IssueList
				issues={issues}
				newIssueURL={NEW_ISSUE_URL}
			/>
		</div>
	)
}
