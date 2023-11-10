import Avatar from '@/components/Avatar'
import { getUserData, getUserFollowers, getUserFollowing } from '@/utils/fetch'
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
import Link from 'next/link'

export default async function DashboardPage() {
	const user = await getUserData('octocat')
	const followers = await getUserFollowers('octocat')
	const following = await getUserFollowing('octocat')

	return (
		<div className='w-full flex flex-col gap-5 py-5 px-3'>
			<div className='flex w-full justify-between items-center'>
				<div className='flex gap-2 items-center'>
					<Avatar user={user} />

					<div className='flex flex-col'>
						<h2 className='text-xl font-extrabold'>
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
							{user.public_repos} public repos
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
					className='flex items-center gap-1 border px-2 py-1 rounded-md'>
					<GithubIcon />
					Go to Github
				</Link>
			</div>

			<span className='text-zinc-300 italic w-full'>
				{user.bio || "You didn't wrote nothing in your Github profile bio"}
			</span>

			<div className='w-full h-px bg-zinc-500' />

			<div className='w-full bg-zinc-900 p-5 rounded-md grid grid-cols-2 gap-5'>
				{/* Followers Card */}
				<div className='flex flex-col gap-3 items-center bg-zinc-800 rounded-md p-3'>
					<span className='self-start text-lg font-semibold'>
						Followers{' '}
						<span className='font-normal text-base italic'>
							(shows max 10 followers)
						</span>
					</span>
					<div className='flex gap-1'>
						{followers.slice(0, 10).map((follower) => (
							<Avatar
								key={follower.name}
								user={follower}
								className='h-10 w-10 border'
							/>
						))}
					</div>
				</div>

				{/* Following Card */}
				<div className='flex flex-col gap-3 items-center bg-zinc-800 rounded-md p-3'>
					<span className='self-start text-lg font-semibold'>
						Following{' '}
						<span className='font-normal text-base italic'>
							(shows max 10 following)
						</span>
					</span>
					<div className='flex gap-1'>
						{following.slice(0, 10).map((follow) => (
							<Avatar
								key={follow.name}
								user={follow}
								className='h-10 w-10 border'
							/>
						))}
					</div>
				</div>
			</div>

			{/* Commit graph */}
			{/* Repositories List (5 max) */}
		</div>
	)
}
