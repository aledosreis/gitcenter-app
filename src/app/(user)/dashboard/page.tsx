import { auth } from '@/auth'
import Avatar from '@/components/Avatar'
import { FollowsCard } from '@/components/FollowsCard'
import { Separator } from '@/components/Separator'
import { getCurrentUserFollowers, getCurrentUserFollowing } from '@/utils/fetch'
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
		user: { profile, ...user },
	} = session
	const followers = await getCurrentUserFollowers()
	const following = await getCurrentUserFollowing()

	return (
		<div className='w-full flex flex-col gap-5 px-1'>
			{/* Header */}
			<div className='flex flex-col bg-card p-3 gap-3 rounded-md'>
				<div className='flex w-full justify-between items-center'>
					{/* User Details */}
					<div className='flex gap-2 items-center bg-foreground rounded-md p-2'>
						<Avatar user={profile} />

						<div className='flex flex-col'>
							<h2 className='text-xl font-extrabold'>
								Hello, <span className='text-hover'>{user.name}</span>
							</h2>
							<span className='text-light text-lg'>@{profile.login}</span>
						</div>
					</div>

					{/* User Contact */}
					<div className='grid grid-cols-2 gap-y-2 bg-foreground rounded-md p-2'>
						<div
							className='flex gap-1'
							title='Company'>
							<BuildingIcon className='text-primary' />
							<span className='text-light'>
								{profile.company || 'Not registered'}
							</span>
						</div>
						<div
							className='flex gap-1'
							title='Email'>
							<MailIcon className='text-primary' />
							<span className='text-light'>
								{user.email || 'Not registered'}
							</span>
						</div>
						<div
							className='flex gap-1'
							title='Location'>
							<MapPinIcon className='text-primary' />
							<span className='text-light'>
								{profile.location || 'Not registered'}
							</span>
						</div>
						<div
							className='flex gap-1'
							title='Blog'>
							<LinkIcon className='text-primary' />
							{profile.blog ? (
								<Link
									href={profile.blog}
									target='_blank'
									className='text-light'>
									{profile.blog}
								</Link>
							) : (
								<span className='text-light'>
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

				<span className='text-light italic w-full'>
					{profile.bio || "You didn't wrote nothing in your Github profile bio"}
				</span>
			</div>

			<Separator />

			{/* User Git Stats */}
			<div className='flex justify-around bg-card rounded-md p-2'>
				<div className='flex gap-1'>
					<BookMarkedIcon className='text-primary' />
					<span className='text-light'>
						{profile.public_repos} public repos
					</span>
				</div>
				<div className='flex gap-1'>
					<Users2Icon className='text-primary' />
					<span className='text-light'>{profile.followers} followers</span>
				</div>
				<div className='flex gap-1'>
					<SquareCodeIcon className='text-primary' />
					<span className='text-light'>{profile.public_gists} pubic gists</span>
				</div>
				<div className='flex gap-1'>
					<Users2Icon className='text-primary' />
					<span className='text-light'>{profile.following} following</span>
				</div>
			</div>

			<Separator />

			{/* Cards */}
			<div className='w-full bg-card p-5 rounded-md flex gap-5'>
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
