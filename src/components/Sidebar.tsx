import { SidebarLinks } from '@/components/SidebarLinks'
import { LogOut } from 'lucide-react'

export function Sidebar() {
	return (
		<aside className='fixed flex flex-col justify-between h-screen w-52 bg-zinc-900 border-r border-zinc-600 px-3 py-4'>
			<div className='flex flex-col gap-4 w-full items-center'>
				<h1 className='font-bold text-lg'>GitCenter</h1>

				<div className='w-full h-px bg-zinc-600' />

				<SidebarLinks />
			</div>

			<button className='flex bg-violet-600 w-full py-1 px3 items-center gap-2 rounded-md justify-center hover:bg-violet-500'>
				<LogOut />
				Logout
			</button>
		</aside>
	)
}
