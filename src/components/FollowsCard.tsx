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
		<div className='flex flex-col gap-3 items-center bg-zinc-800 rounded-md p-3 flex-1'>
			<span className='self-start text-lg font-semibold capitalize'>
				{type}{' '}
				<span className='font-normal text-base italic lowercase'>
					(shows max 10 {type})
				</span>
			</span>
			<div className='flex -space-x-2 overflow-hidden'>
				{users.length > 0 ? (
					users.slice(0, 10).map((user) => (
						<Avatar
							key={user.login}
							user={user}
							className='h-10 w-10 border '
						/>
					))
				) : (
					<span className='italic text-zinc-500'>No {type} found</span>
				)}
			</div>
		</div>
	)
}
