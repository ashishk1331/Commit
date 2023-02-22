import { XCircleIcon } from '@heroicons/react/24/outline'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import Button from '../components/Button'

import { supabase } from '../util/supabaseClient.js'

export default function LoginCode(props){


	return (
		<section className="w-full h-screen overflow-hidden flex flex-col items-center gap-3 pt-16">
			<Button outline="none" onClick={() => props.dispatch({
				type: 'SET_SLIDE',
				value: 0
			})}>
				<XCircleIcon className="h-8 w-8"/>
			</Button>

			<h1 className="mt-6">
				Paste the code here
			</h1>
			<form 
				className="w-[80%] text-center flex flex-col items-center"
				onClick={async (e) => {
					e.preventDefault()
					props.dispatch({
						type: 'SET_IS_LOADING'
					})
					const code = props.state.code
					const email = props.state.email

					const re = /^\d{6}$/gm;
					if(re.test(code)){
					
						const { data, error } = await supabase.auth.verifyOtp({ email: email, token: code, type: 'magiclink'})
						if(!error){
							props.navigate('/app')
						}
						console.log(code, data, error)
					}
					props.dispatch({
						type: 'SET_IS_LOADING'
					})
				}}
			>
				<input 
					type="text" 
					placeholder="type here..." 
					value={props.state.code}
					onChange={(e) => props.dispatch({
						type: 'SET_CODE',
						value: e.target.value
					})}
				/>
				<p className=" px-4 text-secondary-100 mt-4 mb-24">
					<a href="#" className="underline">
						resend
					</a>
					{' '}
					code after 45s
				</p>

				<Button>
					<CheckCircleIcon className="w-6 h-6 fill-primary-100"/>
					check-in
				</Button>
			</form>
		</section>
	)
}