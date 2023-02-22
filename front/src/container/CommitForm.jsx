import { XCircleIcon } from '@heroicons/react/24/outline'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import Button from '../components/Button'
import Loader from '../components/Loader'

import { useReducer, useState } from 'react'
import { nanoid } from 'nanoid'

function cn(...classes){
	return classes.filter(Boolean).join(' ')
}

function Tag(props){
	return (
		<a
			href="#" 
			type="presentation"
			onClick={props.onClick} 
			className={cn("w-full text-center border-2 py-2 text-xl rounded-lg", props.selected ? "border-neutral-100 text-neutral-100" : "border-secondary-100 text-secondary-100")
		}>
			{ props.text }
		</a>
	)
}

function evaluateOtherDay(state){
	let keys = Object.keys(state)

	function sanitise(value){
		if(value < 0){
			value += 7
		}
		return value%7
	}

	let a = true
	for(let i=0; i< 6; i+=2){
		a = a && state[keys[sanitise(i)]] && !state[keys[sanitise(i - 1)]] && !state[keys[sanitise(i + 1)]]
	}

	let b = true
	for(let i=1; i< 6; i+=2){
		b = b && state[keys[sanitise(i)]] && !state[keys[sanitise(i - 1)]] && !state[keys[sanitise(i + 1)]]
	}

	let c = true
	for(let i=2; i< 7; i+=2){
		c = c && state[keys[sanitise(i)]] && !state[keys[sanitise(i - 1)]] && !state[keys[sanitise(i + 1)]]
	}

	return a || b || c
}

export default function CommitForm(props){


	const initialState = {
		mon: false,
		tue: false,
		wed: false,
		thu: false,
		fri: false,
		sat: false,
		sun: false,
	}

	/* action = type + value */
	/* value = day */
	const reducer = (prev, action) => {
		let obj = {...prev}
		switch(action.type){
			case 'SET_EVERYDAY':
				let prevState = Object.keys(prev).reduce(function (previous, key) {
								    return previous && prev[key];
								}, true)

				for(let day of Object.keys(prev)){
					obj[day] = !prevState
				}
				break

			case 'SET_EVERY_OTHER_DAY':
				let keys = Object.keys(prev)
				if(evaluateOtherDay(prev)){
					for(let day of Object.keys(prev)){
						obj[day] = false
					}
				}
				for(let i=0; i< keys.length - 2; i+=2){
					obj[keys[i]] = true
				}
				break

			case 'SET_DAY':
				obj[action.value] = !prev[action.value]
				break
		}
		return obj
	}

	const [ state, dispatch ] = useReducer(reducer, initialState)
	const [ task, setTask ] = useState('')

	return (
		<section className="w-full absolute inset-0 z-[999] h-full flex flex-col items-center pt-12">
			<Button outline="false" onClick={() => {
				props.setForm(false)
			}}>
				<XCircleIcon className="w-10 h-10 stroke-neutral-100"/>
			</Button>

			<form 
				className="mt-12 w-[90%] flex flex-col items-center"
				onSubmit={(e) => {
					e.preventDefault()
					let title = task
					let days = Object.keys(state).filter(i => state[i])
					let id = nanoid()
					while(true){
						if(props.data.tasks.filter(i => i.id === id).length < 1){
							break
						}
						id = nanoid()
					}

					if(days.length < 1 && title.length < 1) { return }
					props.dispatch({
						type: 'ADD_A_TASK',
						value: {
							id: id,
							title: title,
							occurrance: days,
							finished: false,
							user_id: props.data.user.id
						}
					})

					e.target.reset()
					props.setForm(false)
				}}
			>
				<label className="w-full flex flex-col gap-3 mb-8">
					<h1>What do you commit to do?</h1>
					<input 
						type="text" 
						placeholder="type the prompt here..." 
						value={task}
						onChange={(e) => setTask(e.target.value)}
					/>
				</label>

				<label className="w-full mb-16">
					<h1 className="mb-2">How often?</h1>
					<div className="flex items-center justify-between mb-3 gap-3">
						<Tag 
							text="everyday"
							selected={
								Object.keys(state).reduce(function (previous, key) {
								    return previous && state[key];
								}, true)
							}
							onClick={(e) => {
								dispatch({
								type: 'SET_EVERYDAY'
								})
							}}
						/>
						<Tag 
							text="every other day"
							selected={
								evaluateOtherDay(state)
							}
							onClick={() => {
								dispatch({
									type: 'SET_EVERY_OTHER_DAY'
								})
							}}
						/>
					</div>
					<div className="flex items-center justify-between mb-3 gap-3">
						{
							Object.keys(state).slice(0, 4).map((i, ind) => 
									<Tag 
										key={i} 
										text={i}
										selected={state[i]}
										onClick={(e) => {
											dispatch({
											type: 'SET_DAY',
											value: i
										})
										}}
									/>
								)
						}
					</div>
					<div className="flex items-center gap-3">
						{
							Object.keys(state).slice(4).map((i, ind) => 
								<Tag 
									key={i} 
									text={i} 
									selected={state[i]}
									onClick={(e) => {
										dispatch({
											type: 'SET_DAY',
											value: i
										})
									}}
								/>
							)
						}
					</div>
				</label>

				<Button>
					<CheckCircleIcon className="w-8 h-8 fill-primary-100" />
					<h1>commit</h1>
				</Button>
			</form>
		</section>
	)
}