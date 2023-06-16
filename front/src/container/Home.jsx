import NavBar from "../components/NavBar";
import AllDays from "./AllDays";
import Today from "./Today";
import Settings from "./Settings";
import Loader from "../components/Loader";

import { dayBuilder } from "../util/BuilderFunc";
import { useState, useEffect, useReducer } from "react";
import {
	addTask,
	deleteTask,
	fetchTasks,
	fetchDays,
	updateDays,
	supabase,
} from "../util/supabaseClient.js";
import { useNavigate } from "react-router-dom";
import { useStorage } from "../util/useStorage";

import { useStore } from "../util/useStore";
import { shallow } from "zustand/shallow";
import { differenceInDays } from "date-fns";

function checkDay(lastLoggedInDate) {
	return differenceInDays(lastLoggedInDate, new Date()) >= 1;
}

export default function (props) {
	const [get, set] = useStorage();

	const initialState = {
		days: [],
		tasks: [],
		score: 0,
		isLoading: true,
		user: null,
		slide: 1,
	};

	/* action = type + value */
	function reducer(prev, action) {
		let obj = { ...prev };
		switch (action.type) {
			case "SET_IS_LOADING":
				obj.isLoading = !prev.isLoading;
				break;

			case "SET_A_DAY":
				obj.days = [action.value, ...prev.days];
				break;

			case "SET_DAYS":
				obj.days = [...action.value, ...prev.days];
				if (obj.days.length < 1) {
					obj.days.push(
						dayBuilder({
							score: obj.score,
						})
					);
				} else if (!checkDay({ day: obj.days[0] })) {
					obj.days.push(
						dayBuilder({
							score: obj.score,
						})
					);
				}
				break;

			case "ADD_A_TASK":
				obj.tasks = [action.value, ...prev.tasks];
				addTask(action.value);
				set({
					tasks: obj.tasks,
				});
				break;

			case "SET_TASKS":
				if (typeof action.value === "object") {
					for (let task of action.value) {
						if (
							prev.tasks.filter((i) => i.id === task.id).length <
							1
						) {
							obj.tasks.push(task);
						}
					}
				} else {
					obj.tasks = [action.value, ...prev.tasks];
				}
				let local = get("tasks")[0];
				let doneID = new Set(local.map((i) => i.finished && i.id));
				doneID.delete(undefined);
				obj.score = doneID.size;

				for (let i = 0; i < obj.tasks.length; i++) {
					if (doneID.has(obj.tasks[i].id)) {
						obj.tasks[i].finished = true;
					}
				}

				set({
					tasks: obj.tasks,
				});
				break;

			case "REMOVE_TASKS":
				obj.tasks = [
					...prev.tasks.filter((i) => !action.value.includes(i.id)),
				];
				for (let taskId of action.value) {
					deleteTask({
						id: taskId,
					});
				}
				set({
					tasks: obj.tasks,
				});
				break;

			case "SET_USER":
				obj.user = action.value;
				break;

			case "SET_SLIDE":
				obj.slide = action.value;
				break;

			case "SET_SCORE":
				obj.score = action.value;
				obj.days[0].score = action.value;
				updateDays({
					days: obj.days,
				});
				break;

			/*
				action = type + value
								--> value = id + finished
			*/
			case "UPDATE_TASK_FINISHED":
				let score = 0;
				for (let i = 0; i < prev.tasks.length; i++) {
					if (prev.tasks[i].id === action.value.id) {
						obj.tasks[i].finished = action.value.finished;
						break;
					}
					if (obj.tasks[i].finished) {
						score += 1;
					}
				}
				obj.score = score;
				set({
					tasks: obj.tasks,
				});
				break;

			default:
				throw new Error("Invalid choice.");
		}
		return obj;
	}

	const [state, dispatch] = useReducer(reducer, initialState);
	const [menu, setMenu] = useState(1);
	const navigate = useNavigate();

	const setTasks = useStore((state) => state.setTasks);
	const setUser = useStore((state) => state.setUser);

	useEffect(() => {
		(async function () {
			const {
				data: { session },
			} = await supabase.auth.getSession();
			if (!session) {
				navigate("/");
			} else {
				const {
					data: { user },
				} = await supabase.auth.getUser();
				dispatch({
					type: "SET_USER",
					value: user,
				});

				setUser(user);

				let tasks = await fetchTasks({
					user_id: user.id,
				});

				dispatch({
					type: "SET_TASKS",
					value: tasks,
				});

				setTasks(tasks);

				let days = await fetchDays({
					user_id: user.id,
				});

				dispatch({
					type: "SET_DAYS",
					value: days,
				});
			}

			if (state.isLoading) {
				dispatch({
					type: "SET_IS_LOADING",
				});
			}
		})();
	}, [supabase]);

	if (state.isLoading) {
		dispatch({
			type: "SET_IS_LOADING",
		});
	}

	return (
		<>
			<section className="container mx-auto md:w-[768px] p-6 pb-24">
				{(state.slide === 0 && (
					<AllDays state={state} dispatch={dispatch} />
				)) ||
					(state.slide === 1 && (
						<Today state={state} dispatch={dispatch} />
					)) ||
					(state.slide === 2 && (
						<Settings state={state} dispatch={dispatch} />
					))}
			</section>
			<NavBar state={state} dispatch={dispatch} />
			{state.isLoading && <Loader />}
		</>
	);
}
