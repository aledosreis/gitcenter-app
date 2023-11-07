import { SidebarLinks } from '@/components/SidebarLinks'

export function Sidebar() {
	return (
		<aside className='h-full min-h-screen w-52 flex flex-col items-center gap-4 border-r border-zinc-600 px-3 py-4'>
			<h1 className='font-bold'>GitCenter</h1>

			<div className='w-full h-px bg-zinc-600' />

			<SidebarLinks />
		</aside>
	)
}
