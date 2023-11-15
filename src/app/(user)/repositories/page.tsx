import { auth } from '@/auth'
import { Repository } from '@/components/Repository'
import { getRepositories } from '@/utils/fetch'

export default async function RepositoriesPage() {
	const session = await auth()
	if (!session) return null
	const {
		user: {
			access_token,
			profile: { login },
		},
	} = session

	const repositories = await getRepositories(login, access_token!)

	return (
		<div className='w-full flex flex-col gap-5'>
			<div className='flex flex-col gap-3'>
				<h1 className='font-bold'>Repositories in this account</h1>
				<div className='w-full h-px bg-zinc-500' />
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
