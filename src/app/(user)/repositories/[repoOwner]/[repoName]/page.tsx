import { CloneButton } from '@/components/CloneButton'
import { Separator } from '@/components/Separator'
import { formatDate } from '@/utils/date'
import { getRepositoryCommits, getRepositoryData } from '@/utils/fetch'
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
	const { commit, author } = commits.at(0)!

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

			{/* Website section */}
			<div className='flex justify-between py-2 px-4 rounded-md bg-zinc-900 items-center'>
				{/* Website */}
				<div className='flex gap-2'>
					<GlobeIcon />
					{repoData.homepage ? (
						<Link href={repoData.homepage}>{repoData.homepage}</Link>
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
						{/* @TODO: Fetch branches and get last commit from selected branch */}
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
					<span className='text-zinc-300 italic'>
						{/* {lastCommit?.commit.message} */}
						{commit.message}
					</span>
					<span> - by {author.login} at</span>
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

			{/* @TODO: Show README.md from this repository if exists */}
			{/* @TOOD: List files and folders in repository (?) */}

			{/* TODO: List colaborators of repository */}
			{/* TODO: Show all languages used on repository (?) */}

			{/* <pre>{JSON.stringify(commits, null, 2)}</pre> */}
		</div>
	)
}
