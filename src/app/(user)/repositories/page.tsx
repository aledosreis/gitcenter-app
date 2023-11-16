import { auth } from '@/auth'
import { Repository } from '@/components/Repository'
import { Separator } from '@/components/Separator'
import { getCurrentUserRepositories } from '@/utils/fetch'

export default async function RepositoriesPage() {
	const session = await auth()
	if (!session) return null
	const {
		user: {
			profile: { login },
		},
	} = session

	const repositories = await getCurrentUserRepositories()

	return (
		<div className='w-full flex flex-col gap-5'>
			<div className='flex flex-col gap-3'>
				<h1 className='font-bold text-xl'>Repositories for @{login}</h1>
				<Separator />
			</div>

			<div className='flex flex-col gap-1'>
				{repositories.map((repository) => (
					<Repository
						key={repository.id}
						repository={repository}
					/>
				))}
			</div>
		</div>
	)
}
