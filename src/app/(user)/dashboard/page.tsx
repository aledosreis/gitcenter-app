import { auth } from '@/auth'
import Avatar from '@/components/Avatar'
import { FollowsCard } from '@/components/FollowsCard'
import { Separator } from '@/components/Separator'
import { getUserFollowers, getUserFollowing } from '@/utils/fetch'
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
	const session = await auth()
	if (!session) return null
	const {
		user: { profile, access_token, ...user },
	} = session
	// const user = await getUserData('octocat')
	const followers = await getUserFollowers(profile.login, access_token!)
	const following = await getUserFollowing(profile.login, access_token!)

	return (
		<div className='w-full flex flex-col gap-5 px-1'>
			{/* Header */}
			<div className='flex flex-col bg-zinc-900 p-3 gap-3 rounded-md'>
				<div className='flex w-full justify-between items-center'>
					{/* User Details */}
					<div className='flex gap-2 items-center bg-zinc-800 rounded-md p-2'>
						<Avatar user={profile} />

						<div className='flex flex-col'>
							<h2 className='text-xl font-extrabold'>
								Hello, <span className='text-violet-500'>{user.name}</span>
							</h2>
							<span className='text-zinc-300 text-lg'>@{profile.login}</span>
						</div>
					</div>

					{/* User Contact */}
					<div className='grid grid-cols-2 gap-y-2 bg-zinc-800 rounded-md p-2'>
						<div
							className='flex gap-1'
							title='Company'>
							<BuildingIcon />
							<span className='text-zinc-300'>
								{profile.company || 'Not registered'}
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
								{profile.location || 'Not registered'}
							</span>
						</div>
						<div
							className='flex gap-1'
							title='Blog'>
							<LinkIcon />
							{profile.blog ? (
								<Link
									href={profile.blog}
									target='_blank'
									className='text-zinc-300'>
									{profile.blog}
								</Link>
							) : (
								<span className='text-zinc-300'>
									{profile.blog || 'Not registered'}
								</span>
							)}
						</div>
					</div>

					<Link
						href={profile.html_url}
						target='_blank'
						className='flex items-center gap-1 border px-2 py-1 rounded-md'>
						<GithubIcon />
						Go to Github
					</Link>
				</div>

				<span className='text-zinc-300 italic w-full'>
					{profile.bio || "You didn't wrote nothing in your Github profile bio"}
				</span>
			</div>

			<Separator />

			{/* User Git Stats */}
			<div className='flex justify-around bg-zinc-900 rounded-md p-2'>
				<div className='flex gap-1'>
					<BookMarkedIcon />
					<span className='text-zinc-300'>
						{profile.public_repos} public repos
					</span>
				</div>
				<div className='flex gap-1'>
					<Users2Icon />
					<span className='text-zinc-300'>{profile.followers} followers</span>
				</div>
				<div className='flex gap-1'>
					<SquareCodeIcon />
					<span className='text-zinc-300'>
						{profile.public_gists} pubic gists
					</span>
				</div>
				<div className='flex gap-1'>
					<Users2Icon />
					<span className='text-zinc-300'>{profile.following} following</span>
				</div>
			</div>

			<Separator />

			{/* Cards */}
			<div className='w-full bg-zinc-900 p-5 rounded-md flex gap-5'>
				{/* Followers Card */}
				<FollowsCard
					type='followers'
					users={followers}
				/>

				{/* Following Card */}
				<FollowsCard
					type='following'
					users={following}
				/>
			</div>

			<Separator />
		</div>
	)
}
