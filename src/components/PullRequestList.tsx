'use client'

import { RepositoryIssueResponse } from '@/@types/github'
import { formatDate } from '@/utils/date'
import clsx from 'clsx'
import { GitPullRequestIcon } from 'lucide-react'
import { useState } from 'react'

export default function PullRequestList({
	pulls,
}: {
	pulls: RepositoryIssueResponse[]
}) {
	const [state, setState] = useState<'open' | 'closed' | 'all'>('open')
	const status: (typeof state)[] = ['open', 'closed', 'all']

	return (
		<div className='flex flex-col gap-5'>
			{/* buttons */}
			<div className='flex gap-4 px-5'>
				{status.map((stat) => (
					<button
						onClick={(e) => setState(stat)}
						className={clsx('px-3 py-2 rounded-full uppercase border-2', {
							'border-violet-600': stat === state,
						})}
						key={stat}>
						{stat}
					</button>
				))}
			</div>
			{/* list */}
			<div className='flex flex-col gap-1'>
				{pulls
					.filter((pull) => pull.state === state || state === 'all')
					.map((pull) => (
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
