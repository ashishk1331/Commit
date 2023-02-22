import { CheckCircleIcon } from '@heroicons/react/24/solid'

export default function Loader(props){
	return (
		<div className="absolute inset-0 w-full h-full flex">
			<CheckCircleIcon className="w-12 h-12 fill-secondary-100 animate-pulse m-auto" />
		</div>
	)
}