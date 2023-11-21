import { auth } from '@/auth'
import { Forbidden } from '@/components/Forbidden'
import { Separator } from '@/components/Separator'
import { formatDate } from '@/utils/date'
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

			{/* Commits list */}
			<div className='flex flex-col gap-1'>
				{pulls.map((pull) => (
					<div
						key={pull.id}
						className='w-full border border-zinc-600 px-3 py-2 bg-zinc-900 flex justify-between items-center'>
						<div className='flex gap-2'>
							<GitPullRequestIcon
								className={
									pull.state === 'closed' ? 'text-red-600' : 'text-green-600'
								}
							/>
							<span>{pull.title}</span>
							<span
								className={`px-3 rounded-xl ${
									pull.state === 'closed' ? 'bg-red-600' : 'bg-green-600'
								}`}>
								{pull.state}
							</span>
						</div>
						<span className='text-sm text-zinc-300'>
							{pull.state === 'closed'
								? `Closed at ${formatDate(pull.closed_at!)}`
								: `Created by ${pull.user.login} at ${formatDate(
										pull.created_at
								  )}`}
						</span>
					</div>
				))}
			</div>
		</div>
	)
}
