import { getUserData } from '@/utils/fetch'
import {
	BookMarkedIcon,
	BuildingIcon,
	GithubIcon,
	LinkIcon,
	MailIcon,
	MapPinIcon,
	SquareCodeIcon,
	Users2Icon,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default async function DashboardPage() {
	const user = await getUserData('octocat')

	return (
		<div className='w-full flex flex-col gap-5 py-5 px-3'>
			<div className='flex w-full justify-between items-center'>
				<div className='flex gap-2 items-center'>
					<Image
						alt={user.name}
						src={user.avatar_url}
						width={0}
						height={0}
						sizes='100vw'
						className='h-14 w-14 object-contain rounded-full'
					/>

					<div className='flex flex-col'>
						<h2 className='text-2xl font-extrabold'>
							Hello, <span className='text-violet-500'>{user.name}</span>
						</h2>
						<span className='text-zinc-300 text-lg'>@{user.login}</span>
					</div>
				</div>

				<div className='grid grid-cols-2 gap-2'>
					<div
						className='flex gap-1'
						title='Company'>
						<BuildingIcon />
						<span className='text-zinc-300'>
							{user.company || 'Not registered'}
						</span>
					</div>
					<div
						className='flex gap-1'
						title='Email'>
						<MailIcon />
						<span className='text-zinc-300'>
							{user.email || 'Not registered'}
						</span>
					</div>
					<div
						className='flex gap-1'
						title='Location'>
						<MapPinIcon />
						<span className='text-zinc-300'>
							{user.location || 'Not registered'}
						</span>
					</div>
					<div
						className='flex gap-1'
						title='Blog'>
						<LinkIcon />
						{user.blog ? (
							<Link
								href={user.blog}
								target='_blank'
								className='text-zinc-300'>
								{user.blog}
							</Link>
						) : (
							<span className='text-zinc-300'>
								{user.blog || 'Not registered'}
							</span>
						)}
					</div>
				</div>

				<div className='grid grid-cols-2 gap-2'>
					<div className='flex gap-1'>
						<BookMarkedIcon />
						<span className='text-zinc-300'>
							{user.public_repos} public repositories
						</span>
					</div>
					<div className='flex gap-1'>
						<Users2Icon />
						<span className='text-zinc-300'>{user.followers} followers</span>
					</div>
					<div className='flex gap-1'>
						<SquareCodeIcon />
						<span className='text-zinc-300'>
							{user.public_gists} pubic gists
						</span>
					</div>
					<div className='flex gap-1'>
						<Users2Icon />
						<span className='text-zinc-300'>{user.following} following</span>
					</div>
				</div>

				<Link
					href={user.html_url}
					target='_blank'
					className='flex items-center gap-1'>
					<GithubIcon />
					Go to Github
				</Link>
			</div>

			{user.bio && (
				<span className='text-zinc-300 italic w-full'>{user.bio}</span>
			)}

			<div className='w-full h-px bg-zinc-500' />

			<div className='w-full bg-zinc-900 p-2 rounded-md grid grid-cols-2'>
				<span>a</span>
				<span>a</span>
				<span>a</span>
				<div>
					<pre>{JSON.stringify(user, null, 2)}</pre>
				</div>
			</div>

			{/* Commit graph */}
			{/* Repositories List (5 max) */}
		</div>
	)
}
