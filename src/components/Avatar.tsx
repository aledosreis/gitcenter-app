import { UserResponse } from '@/@types/github'
import clsx from 'clsx'
import Image from 'next/image'

export default function Avatar({
	user,
	className,
}: {
	user: UserResponse
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
				className={clsx('h-14 w-14 object-contain rounded-full', className)}
			/>
		</div>
	)
}
