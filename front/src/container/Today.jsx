import CommitForm from "./CommitForm";
import { useState, useEffect } from "react";
import Button from "../components/Button";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useStore } from "../util/useStore.js";
import { shallow } from "zustand/shallow";
import { twMerge } from "tailwind-merge";

function Item(props) {
	const [f, setScore] = useStore(
		(state) => [state.finished, state.setScore],
		shallow
	);
	const [finished, setFinished] = useState(props.data.finished);

	return (
		<li
			className="flex items-center gap-3 cursor-pointer"
			onClick={() => {
				let newValue = !finished;

				props.data.finished = newValue;
				setFinished(newValue);
				props.dispatch({
					type: "UPDATE_TASK_FINISHED",
					value: {
						id: props.data.id,
						finished: newValue,
					},
				});
				f(props.data.id);
				setScore(calculateScore(props.tasks));
			}}
		>
			<div
				className={twMerge(
					"min-w-10 h-10 aspect-square rounded-xl",
					finished ? "bg-primary-100" : "bg-secondary-200"
				)}
			/>
			<h1 className="font-normal text-2xl">{props.data.title}</h1>
		</li>
	);
}

function calculateScore(tasks) {
	let finished = tasks.reduce((prev, cur) => {
		return prev + (cur.finished ? 1 : 0);
	}, 0);
	let total = tasks.length;
	return Math.round((finished / total) * 5) || 0;
}

export default function Today(props) {
	const [form, setForm] = useState(false);

	const [score, tasks] = useStore(
		(state) => [state.score, state.tasks],
		shallow
	);

	const calscore = calculateScore(tasks);

	return (
		<section className="w-full flex flex-col">
			<h1 className="text-4xl">today</h1>
			<p className="text-secondary-100 mt-4 text-lg">
				The task of building a good habit is like cultivating a delicate
				flower one day at a time.
			</p>

			<div
				className={twMerge(
					"w-[240px] h-[240px] rounded-[20%] my-8",
					calscore >= 5 && "bg-primary-100",
					calscore === 4 && "bg-primary-200",
					calscore === 3 && "bg-primary-300",
					calscore === 2 && "bg-secondary-100",
					calscore <= 1 && "bg-secondary-200",
					tasks.length < 1 && "mx-auto"
				)}
			/>

			<ul className="w-full flex flex-col gap-4">
				{tasks.length > 0 ? (
					tasks.map((i) => (
						<Item
							key={i.id}
							tasks={tasks}
							dispatch={props.dispatch}
							data={i}
						/>
					))
				) : (
					<>
						<p className="text-secondary-100 text-2xl text-center mb-2">
							No habits for given today
						</p>
						<button
							className="p-3 px-6 text-xl rounded-full flex items-center gap-2 w-fit mx-auto border-2 border-neutral-100"
							onClick={() => setForm(true)}
						>
							<PlusIcon className="w-7 h- stroke-neutral-100" />
							<h1>add</h1>
						</button>
					</>
				)}
			</ul>

			{form && (
				<CommitForm
					setForm={setForm}
					dispatch={props.dispatch}
					data={props.state}
				/>
			)}
		</section>
	);
}
