import { ArrowRightCircleIcon } from 'lucide-react'
import Link from 'next/link'

export function GoToDashboardButton() {
	return (
		<Link
			href='/dashboard'
			className='flex gap-1 items-center rounded-md px-2 py-1 w-fit bg-violet-600'>
			Go to Dashboard
			<ArrowRightCircleIcon />
		</Link>
	)
}
