import { Sidebar } from '@/components/Sidebar'
import { ReactNode } from 'react'

export default function UserLayout({ children }: { children: ReactNode }) {
	return (
		<>
			<Sidebar />
			<main className='flex-1 p-4'>{children}</main>
		</>
	)
}
