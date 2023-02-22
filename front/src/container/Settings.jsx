import avatarMale from '../assets/avatar-male.png'
import avatarFemale from '../assets/avatar-female.png'
import Button from '../components/Button'
import { ArrowUpRightIcon } from '@heroicons/react/24/outline'
import { CheckBadgeIcon } from '@heroicons/react/24/solid'

import { useEffect, useState } from 'react'
import { supabase } from '../util/supabaseClient.js'
import { useNavigate } from "react-router-dom";

export default function Settings(props){

	const months = [
		'jan',
		'feb',
		'mar',
		'apr',
		'may',
		'jun',
		'jul',
		'aug',
		'sep',
		'oct',
		'nov',
		'dec'
	]
	const navigate = useNavigate();

	async function logout(){
		const { error } = await supabase.auth.signOut()
		if(!error){
			props.dispatch({
				type: 'SET_IS_LOADING'
			})
			navigate('/')
		}
	}

	let userName = ''
	if(props.state.user?.email){
		userName = props.state.user.email
		if(userName.length > 0){
			userName = userName.substring(0,userName.indexOf('@'))
		}
	}
	let createdAT = new Date()
	if(props.state.user?.created_at){
		createdAT = new Date(props.state.user.created_at)
	}
	let mon = months[createdAT.getUTCMonth()],
		year = createdAT.getFullYear();

	let commits = props.state.tasks.length || 0

	return (
		<section className="w-full flex flex-col items-center md:px-12">

			<h1 className="w-full text-4xl mb-2">settings</h1>

			<ul className="w-full v-flex my-4 border-2 border-secondary-100 rounded-xl overflow-hidden">
				<li className="h-flex w-full p-5 border-b-2 border-secondary-100">
					<img src={avatarMale} alt="" className="w-16 h-16 aspect-square mr-4" />
					<div>
						<h1 className="flex items-center gap-1">
							{ userName }
							<CheckBadgeIcon className="w-8 h-8 fill-primary-100" />
						</h1>
						<p className="text-secondary-100 text-lg">Joined on { mon + ' ' + year } </p>					
					</div>
				</li>
				<li className="h-flex w-full justify-between border-b-2 p-5 border-secondary-100">
					<h1>Tracked Commits</h1>
					<p className="text-xl">{ commits }</p>
				</li>
				<li className="w-full p-5">
					<h1>
						<a href="http://trycommit.app/" target="_blank">
							Original App
						</a>
					</h1>
				</li>
			</ul>

			{/*<ul className="w-full v-flex my-4 border-2 border-secondary-100 rounded-xl overflow-hidden">
				<li className="h-flex w-full justify-between  border-b-2 p-5 border-secondary-100">
					<h1>Appearance</h1>
					<p className="text-lg text-secondary-100">Dark</p>
				</li>				
			</ul>*/}

			<ul className="w-full v-flex my-4 border-2 border-primary-100 rounded-xl overflow-hidden">
				<li className="h-flex w-full justify-around p-5">
					<button onClick={async () => logout()} className="w-full">
						<div className="h-flex gap-2 w-fit m-auto">
							<h1>Log out</h1>
							<ArrowUpRightIcon className="w-5 h-5 stroke-primary-100" />
						</div>
					</button>					
				</li>
			</ul>

			<p className="text-secondary-100 font-medium my-4 text-center">
				Version v0.1
				<br />
				made in love
			</p>
		</section>
	)
}