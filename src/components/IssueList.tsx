'use client'

import { RepositoryIssueResponse } from '@/@types/github'
import { formatDate } from '@/utils/date'
import clsx from 'clsx'
import { CircleDotIcon } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export function IssueList({
	issues,
	newIssueURL,
}: {
	issues: RepositoryIssueResponse[]
	newIssueURL: string
}) {
	const [state, setState] = useState<'open' | 'closed' | 'all'>('open')
	const status: (typeof state)[] = ['open', 'closed', 'all']

	return (
		<div className='flex flex-col gap-5'>
			{/* buttons */}
			<div className='flex justify-between'>
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
				<Link
					href={newIssueURL}
					target='_blank'
					className='px-3 py-2 rounded-md bg-primary flex items-center mx-5'>
					New Issue
				</Link>
			</div>
			{/* list */}
			<div className='flex flex-col gap-1'>
				{issues
					.filter((issue) => issue.state === state || state === 'all')
					.map((issue) => (
						<Link
							href={issue.html_url}
							target='_blank'
							key={issue.id}
							className='w-full border border-separator px-3 py-2 bg-card flex justify-between items-center'>
							<div className='flex gap-2'>
								<CircleDotIcon
									className={
										issue.state === 'closed' ? 'text-closed' : 'text-open'
									}
								/>
								<span>{issue.title}</span>
								<span
									className={`px-3 rounded-xl ${
										issue.state === 'closed' ? 'bg-closed' : 'bg-open'
									}`}>
									{issue.state}
								</span>
							</div>
							<span className='text-sm text-light'>
								{issue.state === 'closed'
									? `Closed at ${formatDate(issue.closed_at!)}`
									: `Created by ${issue.user.login} at ${formatDate(
											issue.created_at
									  )}`}
							</span>
						</Link>
					))}
			</div>
		</div>
	)
}
