'use client'

import clsx from 'clsx'
import { BookMarkedIcon, HomeIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
	{ name: 'Dashboard', path: '/dashboard', icon: HomeIcon },
	{ name: 'Repositories', path: '/repositories', icon: BookMarkedIcon },
]

export function SidebarLinks() {
	const pathname = usePathname()
	return (
		<div className='flex flex-col gap-3 w-full'>
			{links.map((link) => {
				const Icon = link.icon
				return (
					<Link
						key={link.path}
						className={clsx('flex gap-2  py-1 px-3 rounded-md items-center', {
							'bg-violet-600 hover:bg-violet-500':
								link.path === pathname || pathname.startsWith(link.path),
							'hover:bg-gray-800':
								link.path !== pathname && !pathname.startsWith(link.path),
						})}
						href={link.path}>
						<Icon />
						{link.name}
					</Link>
				)
			})}
		</div>
	)
}
