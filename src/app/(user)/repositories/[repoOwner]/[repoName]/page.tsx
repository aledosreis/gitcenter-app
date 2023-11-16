import { CloneButton } from '@/components/CloneButton'
import { Separator } from '@/components/Separator'
import { formatDate } from '@/utils/date'
import {
	getRepositoryCommits,
	getRepositoryData,
	getRepositoryReadme,
} from '@/utils/fetch'
import {
	CircleDotIcon,
	Code2Icon,
	EyeIcon,
	GitBranchIcon,
	GitCommitHorizontalIcon,
	GitForkIcon,
	GitPullRequestIcon,
	GithubIcon,
	GlobeIcon,
	HistoryIcon,
	LockIcon,
	StarIcon,
	UnlockIcon,
} from 'lucide-react'
import Link from 'next/link'

export default async function RepositoryPage({
	params: { repoOwner, repoName },
}: {
	params: { repoOwner: string; repoName: string }
}) {
	const repoData = await getRepositoryData(repoOwner, repoName)
	const commits = await getRepositoryCommits(repoOwner, repoName)
	const { commit, author } = commits.at(0)!

	const readme = await getRepositoryReadme(repoOwner, repoName)

	return (
		<div className='flex flex-col gap-5 px-1'>
			{/* Header */}
			<div className='flex flex-col bg-zinc-900 p-3 rounded-md gap-3'>
				{/* Repository Info */}
				<div className='flex items-center justify-between'>
					<div className='flex flex-col gap-1 bg-zinc-800 p-2 rounded-md'>
						<h1 className='flex gap-2 font-bold text-lg'>
							{repoData.visibility === 'public' ? <UnlockIcon /> : <LockIcon />}
							{repoData.full_name}
						</h1>
						{repoData.fork && repoData.parent && (
							<p className='font-light text-sm text-zinc-300'>
								Forked from: {repoData.parent.full_name}
							</p>
						)}
					</div>

					<div className='grid grid-cols-2 gap-2 2xl:flex 2xl:gap-5'>
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

			{/* Website section */}
			<div className='flex justify-between py-2 px-4 rounded-md bg-zinc-900 items-center'>
				{/* Website */}
				<div className='flex gap-2'>
					<GlobeIcon />
					{repoData.homepage ? (
						<Link
							target='_blank'
							href={repoData.homepage}>
							{repoData.homepage}
						</Link>
					) : (
						'No website for this repository'
					)}
				</div>

				{/* Issues, PRs, Branch and Clone button */}
				<div className='flex gap-10 items-center'>
					<div className='flex gap-2'>
						{/* @TODO: Put issues and PR's count */}
						<Link
							className='flex gap-2 bg-zinc-800 px-2 py-1 rounded-md'
							href={`/repositories/${repoData.full_name}/issues`}>
							<CircleDotIcon /> 0 open issues
						</Link>
						<Link
							className='flex gap-2 bg-zinc-800 px-2 py-1 rounded-md'
							href={`/repositories/${repoData.full_name}/PRs`}>
							<GitPullRequestIcon /> 0 open PRs
						</Link>
						<span className='flex gap-2 bg-zinc-800 px-2 py-1 rounded-md'>
							<GitBranchIcon /> Branch: {repoData.default_branch}
						</span>
					</div>
					<CloneButton url={repoData.clone_url} />
				</div>
			</div>

			<Separator />

			{/* Last commit */}
			<div className='flex justify-between rounded-md bg-zinc-900 py-2 px-4'>
				<div className='flex gap-1'>
					<GitCommitHorizontalIcon />
					<span className='font-semibold'>Last commit:</span>
					<span className='text-zinc-300 italic'>{commit.message}</span>
					<span> - by {author?.login || commit.author.name} at</span>
					<span className='italic'>{formatDate(commit.author.date)}</span>
				</div>
				<Link
					href={`/repositories/${repoData.full_name}/commits`}
					className='flex gap-2'>
					<HistoryIcon />
					<span>{commits.length} commits</span>
				</Link>
			</div>

			<Separator />

			<div className='bg-zinc-900 w-full py-2 px-4'>
				{/* @TODO: Show README.md from this repository if exists */}
				{readme.content ? (
					atob(readme.content)
				) : (
					<span className='block text-center text-lg font-semibold py-2'>
						No readme file found
					</span>
				)}
			</div>

			<Separator />

			<div className='bg-zinc-900 w-full py-2 px-4'>
				{/* TODO: List colaborators of repository */}
			</div>
		</div>
	)
}
