import { GithubIcon } from 'lucide-react'

export function Forbidden({
	title,
	subtitle = 'Please go to your repositories using Repositories menu',
}: {
	title: string
	subtitle?: string
}) {
	return (
		<div className='w-full justify-center items-center -my-4 h-screen gap-4'>
			<div className='flex h-full items-center justify-center'>
				<GithubIcon
					size={500}
					className='opacity-25'
				/>
				<div className='flex flex-col gap-3'>
					<h1 className='text-3xl font-bold'>{title}</h1>
					<p className='text-zinc-300 text-xl'>{subtitle}</p>
				</div>
			</div>
		</div>
	)
}
