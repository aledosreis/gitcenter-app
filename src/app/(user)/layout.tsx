import { ReactNode } from 'react'

export default function UserLayout({ children }: { children: ReactNode }) {
	return (
		<>
			<aside>Sidebar</aside>
			<main className='flex-1 p-4'>{children}</main>
		</>
	)
}
