import { XCircleIcon } from "@heroicons/react/24/outline";
import Button from "../components/Button";
import Error from "./Error";
import { useState } from "react";
import { supabase } from "../util/supabaseClient.js";

export default function LoginPage(props) {
	const [serverError, setServerError] = useState(false);

	return (
		<section className="w-full h-screen overflow-hidden flex flex-col items-center gap-3 pt-16">
			<Button
				outline="none"
				onClick={() =>
					props.dispatch({
						type: "SET_SLIDE",
						value: 0,
					})
				}
			>
				<XCircleIcon className="h-8 w-8" />
			</Button>

			<h1 className="mt-6">Your email id?</h1>
			<form
				className="w-[80%] text-center flex flex-col items-center"
				onSubmit={async (e) => {
					e.preventDefault();
					const email = props.state.email;
					props.dispatch({
						type: "SET_IS_LOADING",
					});
					const re = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/gm;
					if (re.test(email)) {
						const { data, error } =
							await supabase.auth.signInWithOtp({
								email: email,
							});
						if (!error) {
							props.dispatch({
								type: "SET_SLIDE",
								value: 2,
							});
						} else {
							setServerError(true);
						}
					}
					props.dispatch({
						type: "SET_IS_LOADING",
					});
					e.target.reset()
				}}
			>
				<input
					type="text"
					placeholder="type here..."
					name="email"
					value={props.state.email}
					onChange={(e) =>
						props.dispatch({
							type: "SET_EMAIL",
							value: e.target.value,
						})
					}
				/>
				<p className="p-6 px-4 text-secondary-100 mt-4 mb-24">
					Here, you only need your working email for logging in.
					<br />
					Also, a code will be sent to you to verify your mail
					address.
					<br />
					Use that code to log into the app.
				</p>

				<Button type="submit">submit</Button>
			</form>

			{serverError && <Error dispatch={props.dispatch} />}
		</section>
	);
}
