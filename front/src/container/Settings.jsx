import avatarMale from "../assets/avatar-male.png";
import avatarFemale from "../assets/avatar-female.png";
import Button from "../components/Button";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { CheckBadgeIcon, HeartIcon } from "@heroicons/react/24/solid";

import { useEffect, useState } from "react";
import { supabase } from "../util/supabaseClient.js";
import { useNavigate } from "react-router-dom";

import { format } from 'date-fns'

import { useStore } from "../util/useStore";
import { shallow } from "zustand/shallow";

function emailToName(email) {
	if(email.length < 1){
		return ''
	}
	return email.substring(0, email.indexOf("@"));
}

export default function Settings(props) {
	const navigate = useNavigate();

	async function logout() {
		const { error } = await supabase.auth.signOut();
		if (!error) {
			props.dispatch({
				type: "SET_IS_LOADING",
			});
			navigate("/");
		}
	}

	const [user, tasks] = useStore(
		(state) => [state.user, state.tasks],
		shallow
	);

	return (
		<section className="w-full flex flex-col items-center md:px-12">
			<h1 className="w-full text-4xl mb-2">settings</h1>

			<ul className="w-full v-flex my-4 border-2 border-secondary-100 rounded-xl overflow-hidden">
				<li className="h-flex w-full p-5 border-b-2 border-secondary-100">
					<img
						src={avatarMale}
						alt="Avatar"
						className="w-16 h-16 aspect-square mr-4"
					/>
					<div>
						<h1 className="flex items-center gap-1">
							{emailToName(user?.email || '')}
							<CheckBadgeIcon className="w-8 h-8 fill-primary-100" />
						</h1>
						<p className="text-secondary-100 text-lg">
							Joined on {format(new Date(user?.created_at || ''), 'MMM yyyy')}
						</p>
					</div>
				</li>
				<li className="h-flex w-full justify-between border-b-2 p-5 border-secondary-100">
					<h1>Tracked Commits</h1>
					<p className="text-xl">{tasks.length}</p>
				</li>
				<li className="w-full p-5">
					<a href="http://trycommit.app/" target="_blank" className="h-flex justify-between">
						<h1>
							Original App
						</h1>
						<ArrowUpRightIcon className="w-6 h-6"/>
					</a>
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
				Version v0.2
				<br />
				made with <HeartIcon className="w-4 h-4 aspect-square fill-secondary-100 inline" />
				<br />
				by ashishk
			</p>
		</section>
	);
}
