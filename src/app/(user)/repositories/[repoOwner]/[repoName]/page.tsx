export default function RepositoryPage({
	params,
}: {
	params: { repoOwner: string; repoName: string }
}) {
	return (
		<p>
			{params.repoOwner}/{params.repoName}
		</p>
	)
}
