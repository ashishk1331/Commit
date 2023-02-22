import Button from '../components/Button'
import { XCircleIcon, PencilIcon, PlusIcon,PlusCircleIcon, MinusCircleIcon } from '@heroicons/react/24/outline'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'

function cn(...classes){
    return classes.filter(Boolean).join(' ')
}

export default function TaskManage(props){

	const [ editingMode, setEditingMode ] = useState(false)
	const [ edited, setEdited ] = useState([])

	return (
		<section className="w-full absolute inset-0 z-[99] h-full flex flex-col items-center pt-6">
			<div className="w-full h-flex justify-between">
				<Button outline="false" onClick={() => {
					props.setManage(false)
				}}>
					<XCircleIcon className="w-10 h-10 stroke-neutral-100"/>
				</Button>

				<Button outline="false" onClick={() => {
					let prev = editingMode
					setEditingMode(!prev)
				}}>
					<PencilIcon className="w-8 h-8 stroke-neutral-100"/>
				</Button>
			</div>

			<h1 className="w-full px-6 my-4 text-4xl">habits</h1>

			<ul className="px-6 w-full pb-28">
			{
				props.data.tasks.length > 0 ?
				props.data.tasks.map(i => (
					<li key={i.id} className="w-full h-flex">
					<div  className="w-full h-flex justify-between my-4 border-2 border-secondary-100 rounded-xl overflow-hidden p-5">
						<h1 className={cn("text-2xl font-normal", edited.includes(i.id) ? "line-through text-secondary-100": "")}>{i.title}</h1>
						<p className="text-secondary-100 text-lg">
							{ 
								i.occurrance.length === 7 ?
								'everyday'
								: 
								i.occurrance.join(', ')
							}
						</p>
						</div>
						{
							editingMode &&
							(
								edited.includes(i.id) ?
								<Button outline="false" className="px-3" onClick={() => {
										setEdited(edited.filter(given_id => given_id !== i.id))
								}}>
									<PlusCircleIcon className="w-12 h-12 stroke-primary-100" />
								</Button>
								:
								<Button outline="false" className="px-3" onClick={() => {
										if(!edited.includes(i.id)){
											setEdited([i.id , ...edited])
										}
								}} >
									<MinusCircleIcon className="w-12 h-12 stroke-red-500" />
								</Button>
							)
						}
					</li>
				))
				:
				<>
					<p className="text-secondary-100 text-2xl text-center my-4">No habits for given today</p>
					<button className="p-3 px-6 text-xl rounded-full flex items-center gap-2 w-fit mx-auto border-2 border-neutral-100" onClick={() => props.setForm(true)}>
						<PlusIcon className="w-7 h- stroke-neutral-100" />
						<h1>add</h1>
					</button>
				</>
			}
			</ul>

			{
				editingMode &&
				<div 
					className="w-full fixed bottom-0 h-flex bg-secondary-300 p-5"
					onClick={async () => {
						if(edited.length > 0){
							await props.dispatch({
								type: 'REMOVE_TASKS',
								value: edited
							})
						}
						setEditingMode(false)
					}}
				>
					<Button className="mx-auto">
						<CheckCircleIcon className="w-8 h-8 fill-primary-100" />				
						Save
					</Button>
				</div>
			}
		</section>
	)
}