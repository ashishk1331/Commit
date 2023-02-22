import CommitForm from './CommitForm'
import TaskManage from './TaskManage'
import { PlusCircleIcon, EllipsisHorizontalCircleIcon as Menu } from '@heroicons/react/24/outline'
import { SparklesIcon } from '@heroicons/react/24/solid'
import { useState, useEffect } from 'react'
import { dayBuilder } from '../util/BuilderFunc'

function cn(...classes){
    return classes.filter(Boolean).join(' ')
}

function Day(props){

    const i = props.score

    return (
        <div className={cn(
            "min-w-full h-full aspect-square rounded-xl m-auto",
            i >= 5 && "bg-primary-100",
            i === 4 && "bg-primary-200",
            i === 3 && "bg-primary-300" ,
            i === 2 && "bg-secondary-100",
            i <= 1 && "bg-secondary-200",
        )} />
    )
}

export default function AllDays(props){

	const [ form, setForm ] = useState(false)
    const [ manage, setManage ] = useState(false)

    let days = props.state.days

	return (
		<section className="w-full">
			<div className="w-full flex items-center justify-between mb-8">
                <button onClick={() => setManage(true)}>
                    <Menu className="w-10 h-10 stroke-neutral-100" />
                </button>

				<button onClick={() => setForm(true)}>
					<PlusCircleIcon className="w-10 h-10 stroke-neutral-100" />
				</button>
			</div>
            <h1 className="text-4xl mb-2">all days</h1>
			{
				props.state.days.length > 0 ?
                <div className="w-full grid grid-cols-7 gap-3 my-6 sm:px-16">
                    {
                        props.state.days.map((i, index) => <Day key={index+''} score={i.score} />)
                    }
                </div>				
                :
				<p className="text-secondary-100 italic text-xl flex items-baseline gap-2">
					Start running some tasks
					<SparklesIcon className="w-6 h-6 fill-secondary-100 rotate-[6deg]" />
				</p>
			}
			{
				form && <CommitForm setForm={setForm} dispatch={props.dispatch} data={props.state} />
			}
            {
                manage && <TaskManage setForm={setForm} setManage={setManage} dispatch={props.dispatch} data={props.state} />
            }
		</section>
	)
}