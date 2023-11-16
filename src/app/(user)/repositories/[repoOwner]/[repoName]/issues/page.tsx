import { auth } from '@/auth'
import { Separator } from '@/components/Separator'
import { formatDate } from '@/utils/date'
import { getRepositoryIssuesAndPRs } from '@/utils/fetch'
import { ArrowLeftIcon, CircleDotIcon, GithubIcon } from 'lucide-react'
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
			<div className='w-full justify-center items-center -my-4 h-screen gap-4'>
				<div className='flex h-full items-center justify-center'>
					<GithubIcon
						size={500}
						className='opacity-25'
					/>
					<div className='flex flex-col gap-3'>
						<h1 className='text-3xl font-bold'>
							You can not see issues from repositories you do not own.
						</h1>
						<p className='text-zinc-300 text-xl'>
							Please go to your repositories using Repositories menu
						</p>
					</div>
				</div>
			</div>
		)
	}

	const issues = (await getRepositoryIssuesAndPRs(repoOwner, repoName)).filter(
		(issue) => !issue.pull_request
	)

	return (
		<div className='flex flex-col w-full gap-5 px-1'>
			{/* Header */}
			<div className='bg-zinc-900 px-3 py-1 rounded-md flex justify-between items-center'>
				<h1 className='text-2xl flex gap-2 items-center'>
					<CircleDotIcon />
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

			{/* Commits list */}
			<div className='flex flex-col gap-1'>
				{issues.map((issue) => (
					<div
						key={issue.id}
						className='w-full border border-zinc-600 px-3 py-2 bg-zinc-900 flex justify-between items-center'>
						<div className='flex gap-2'>
							<CircleDotIcon />
							<span>{issue.title}</span>
							<span
								className={`px-3 rounded-xl ${
									issue.state === 'closed' ? 'bg-red-600' : 'bg-green-600'
								}`}>
								{issue.state}
							</span>
						</div>
						<span className='text-sm text-zinc-300'>
							{issue.state === 'closed'
								? `Closed at ${formatDate(issue.closed_at!)}`
								: `Created by ${issue.user.login} at ${formatDate(
										issue.created_at
								  )}`}
						</span>
					</div>
				))}
			</div>
		</div>
	)
}
