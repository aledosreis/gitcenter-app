import clsx from 'clsx'
import { Profile } from 'next-auth/types'
import Image from 'next/image'

export default function Avatar({
	user,
	className,
}: {
	user: Profile
	className?: string
}) {
	return (
		<div title={user.login}>
			<Image
				alt={user.login}
				src={user.avatar_url}
				width={0}
				height={0}
				sizes='100vw'
				className={clsx('h-14 w-14 object-fill rounded-full', className)}
			/>
		</div>
	)
}
