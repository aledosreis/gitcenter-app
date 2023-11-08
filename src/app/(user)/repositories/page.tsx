import { Repository } from '@/components/Repository'
import { getRepositories } from '@/utils/fetch'

export default async function RepositoriesPage() {
	const repositories = await getRepositories('octocat')

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
