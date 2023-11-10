import { Sidebar } from '@/components/Sidebar'
import { ReactNode } from 'react'

export default function UserLayout({ children }: { children: ReactNode }) {
	return (
		<>
			<Sidebar />
			<main className='ml-52 flex-1 p-4 w-screen'>{children}</main>
		</>
	)
}
