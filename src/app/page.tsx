import { auth } from '@/auth'
import { GithubButton } from '@/components/GithubButton'
import { GoToDashboardButton } from '@/components/GoToDashboardButton'
import { GithubIcon } from 'lucide-react'

export default async function Home() {
	const session = await auth()
	return (
		<main className='flex min-h-screen flex-col w-full'>
			{/* Icon will act as background image for the page */}
			<GithubIcon className='absolute w-full h-full opacity-25 -z-10' />

			{/* header */}
			<div className='flex justify-between items-center px-10 py-5'>
				<h2 className='text-lg font-bold'>Git Center</h2>

				<div className='flex gap-3'>
					{session ? <GoToDashboardButton /> : <GithubButton />}
				</div>
			</div>

			{/* page */}
			<div className='flex-1 py-10 flex flex-col gap-36 mx-auto'>
				<div className='flex flex-col gap-3'>
					<h1 className='font-bold text-2xl'>
						Manage all your Github Repositories
					</h1>
					<p className='text-xl'>The app to center all your work</p>
				</div>

				<div className='flex items-center justify-center'>
					{session ? <GoToDashboardButton /> : <GithubButton />}
				</div>
			</div>
		</main>
	)
}
