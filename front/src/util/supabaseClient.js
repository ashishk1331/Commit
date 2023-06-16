import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
	import.meta.env["VITE_SUPABASE_PROJECT_URL"],
	import.meta.env["VITE_SUPABASE_ANNON_KEY"]
);

export async function addTask(props) {
	const { error } = await supabase.from("tasks").insert({
		title: props.title,
		occurrance: props.occurrance,
		user_id: props.user_id,
	});

	if (error) {
		throw new Error(error);
	}
}

export async function deleteTask(props) {
	const { error } = await supabase.from("tasks").delete().eq("id", props.id);

	if (error) {
		throw new Error(error);
	}
}

export async function fetchTasks(props) {
	const { data: tasks, error } = await supabase
		.from("tasks")
		.select()
		.eq("user_id", props.user_id)
		.order("created_at", { ascending: false });

	if (error) {
		return [];
	}
	return tasks;
}

export async function fetchDays(props) {
	const { data: days, error } = await supabase
		.from("days")
		.select("days")
		.eq("user_id", props.user_id);

	if (error) {
		return [];
	}

	return days;
}

export async function updateDays(props) {
	const { data, error } = await supabase
		.from("days")
		.update({ days: JSON.stringify(props.days) })
		.eq("user_id", props["user_id"]);

	if (error) {
		return error;
	}

	return data;
}