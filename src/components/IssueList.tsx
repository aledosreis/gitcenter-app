'use client'

import { RepositoryIssueResponse } from '@/@types/github'
import { formatDate } from '@/utils/date'
import clsx from 'clsx'
import { CircleDotIcon } from 'lucide-react'
import { useState } from 'react'

export function IssueList({ issues }: { issues: RepositoryIssueResponse[] }) {
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
				{issues
					.filter((issue) => issue.state === state || state === 'all')
					.map((issue) => (
						<div
							key={issue.id}
							className='w-full border border-zinc-600 px-3 py-2 bg-zinc-900 flex justify-between items-center'>
							<div className='flex gap-2'>
								<CircleDotIcon
									className={
										issue.state === 'closed' ? 'text-red-600' : 'text-green-600'
									}
								/>
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