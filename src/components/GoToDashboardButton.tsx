import { ArrowRightCircleIcon } from 'lucide-react'

export function GoToDashboardButton() {
	return (
		<button className='flex gap-1 items-center rounded-md px-2 py-1 w-fit bg-violet-600'>
			Go to Dashboard
			<ArrowRightCircleIcon />
		</button>
	)
}
