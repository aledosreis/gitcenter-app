'use client'

import { RepositoryIssueResponse } from '@/@types/github'
import { formatDate } from '@/utils/date'
import clsx from 'clsx'
import { GitPullRequestIcon } from 'lucide-react'
import Link from 'next/link'
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
							'border-primary': stat === state,
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
						<Link
							href={pull.html_url}
							target='_blank'
							key={pull.id}
							className='w-full border border-separator px-3 py-2 bg-card flex justify-between items-center'>
							<div className='flex gap-2'>
								<GitPullRequestIcon
									className={
										pull.state === 'closed' ? 'text-closed' : 'text-open'
									}
								/>
								<span>{pull.title}</span>
								<span
									className={`px-3 rounded-xl ${
										pull.state === 'closed' ? 'bg-closed' : 'bg-open'
									}`}>
									{pull.state}
								</span>
							</div>
							<span className='text-sm text-light'>
								{pull.state === 'closed'
									? `Closed at ${formatDate(pull.closed_at!)}`
									: `Created by ${pull.user.login} at ${formatDate(
											pull.created_at
									  )}`}
							</span>
						</Link>
					))}
			</div>
		</div>
	)
}
