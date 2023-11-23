import { SidebarLinks } from '@/components/SidebarLinks'
import { logout } from '@/utils/actions'
import { LogOut } from 'lucide-react'
import { Separator } from './Separator'

export function Sidebar() {
	return (
		<aside className='fixed flex flex-col justify-between h-screen w-52 bg-card border-r border-separator px-3 py-4'>
			<div className='flex flex-col gap-4 w-full items-center'>
				<h1 className='font-bold text-lg'>GitCenter</h1>

				<Separator />

				<SidebarLinks />
			</div>

			<form action={logout}>
				<button className='flex bg-primary w-full py-1 px3 items-center gap-2 rounded-md justify-center hover:bg-hover'>
					<LogOut />
					Logout
				</button>
			</form>
		</aside>
	)
}
