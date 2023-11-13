import { Separator } from '@/components/Separator'
import { getRepositoryCommits, getRepositoryData } from '@/utils/fetch'
import {
	Code2Icon,
	EyeIcon,
	GitForkIcon,
	GithubIcon,
	StarIcon,
} from 'lucide-react'
import Link from 'next/link'

export default async function RepositoryPage({
	params,
}: {
	params: { repoOwner: string; repoName: string }
}) {
	const repoData = await getRepositoryData(params.repoOwner, params.repoName)
	const commits = await getRepositoryCommits(params.repoOwner, params.repoName)
	const lastCommit = commits.at(0)

	return (
		<div className='flex flex-col gap-5 px-1'>
			{/* Header */}
			<div className='flex flex-col bg-zinc-900 p-3 rounded-md gap-3'>
				{/* Repository Info */}
				<div className='flex items-center justify-between'>
					<div className='flex flex-col gap-1 bg-zinc-800 p-2 rounded-md'>
						<h1 className='font-bold text-lg'>{repoData.full_name}</h1>
						{repoData.fork && repoData.parent && (
							<p className='font-light text-sm text-zinc-300'>
								Forked from: {repoData.parent.full_name}
							</p>
						)}
					</div>

					<div className='flex gap-5'>
						<div className='flex gap-2 items-center bg-zinc-800 p-2 rounded-md'>
							<EyeIcon />
							{repoData.subscribers_count} watchers
						</div>
						<div className='flex gap-2 items-center bg-zinc-800 p-2 rounded-md'>
							<GitForkIcon />
							{repoData.forks} forks
						</div>
						<div className='flex gap-2 items-center bg-zinc-800 p-2 rounded-md'>
							<StarIcon />
							{repoData.watchers} starts
						</div>
						<div className='flex gap-2 items-center bg-zinc-800 p-2 rounded-md'>
							<Code2Icon />
							Language: {repoData.language || 'None'}
						</div>
					</div>

					<Link
						className='flex border px-2 py-1 rounded-md'
						target='_blank'
						href={repoData.html_url}>
						<GithubIcon />
						Go to Repository
					</Link>
				</div>

				{/* Repo Description */}
				<span className='text-zinc-300 italic w-full'>
					{repoData.description || "This repository hasn't any description."}
				</span>
			</div>

			<Separator />

			{/* Last commit */}
			<div className='flex justify-between rounded-md bg-zinc-800 py-2 px-4 mx-2'>
				<span>
					Last commit:{' '}
					<span className='text-zinc-300 italic'>
						{lastCommit?.commit.message}
					</span>{' '}
					by {lastCommit?.author.login} at {lastCommit?.commit.author.date}
				</span>
				{/* Will be a link later */}
				<span>{commits.length} commits</span>
			</div>

			<Separator />

			<pre>{JSON.stringify(commits, null, 2)}</pre>
		</div>
	)
}
