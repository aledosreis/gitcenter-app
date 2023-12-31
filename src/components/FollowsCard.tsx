import { UserResponse } from '@/@types/github'
import Avatar from '@/components/Avatar'

export function FollowsCard({
	users,
	type,
}: {
	users: UserResponse[]
	type: 'followers' | 'following'
}) {
	return (
		<div className='flex flex-col gap-3 items-center bg-foreground rounded-md p-3 flex-1'>
			<span className='self-start text-lg font-semibold capitalize'>
				{type}{' '}
			</span>
			<div className='flex -space-x-2 overflow-hidden'>
				{users.length > 0 ? (
					users.slice(0, 10).map((user) => (
						<Avatar
							key={user.login}
							user={user}
							className='border'
						/>
					))
				) : (
					<span className='italic text-light'>No {type} found</span>
				)}
			</div>
		</div>
	)
}
