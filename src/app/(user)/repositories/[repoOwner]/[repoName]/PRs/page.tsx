import { auth } from '@/auth'
import { Forbidden } from '@/components/Forbidden'
import PullRequestList from '@/components/PullRequestList'
import { Separator } from '@/components/Separator'
import { getRepositoryIssuesAndPRs } from '@/utils/fetch'
import { ArrowLeftIcon, GitPullRequestIcon } from 'lucide-react'
import Link from 'next/link'

export default async function RepositoryPRsPage({
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
			<Forbidden title='You can not see PRs from repositories you do not own.' />
		)
	}

	const pulls = (await getRepositoryIssuesAndPRs(repoOwner, repoName)).filter(
		(pull) => pull.pull_request
	)

	return (
		<div className='flex flex-col w-full gap-5 px-1'>
			{/* Header */}
			<div className='bg-zinc-900 px-3 py-1 rounded-md flex justify-between items-center'>
				<h1 className='text-2xl flex gap-2 items-center'>
					<GitPullRequestIcon className='text-violet-600' />
					Pull Requests from {repoOwner}/{repoName}
				</h1>

				<Link
					href={`/repositories/${repoOwner}/${repoName}`}
					className='border px-2 py-1 rounded-md flex gap-2 items-center'>
					<ArrowLeftIcon />
					Back to repository
				</Link>
			</div>

			<Separator />

			{/* PRs list */}
			<PullRequestList pulls={pulls} />
		</div>
	)
}
