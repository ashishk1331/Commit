import CommitForm from "./CommitForm";
import TaskManage from "./TaskManage";
import {
    PlusCircleIcon as Add,
    EllipsisHorizontalCircleIcon as Menu,
} from "@heroicons/react/24/outline";
import { SparklesIcon } from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";
import { useStore } from "../util/useStore";
import { twMerge } from "tailwind-merge";

function Day(props) {
    const i = props.score;

    return (
        <li
            className={twMerge(
                "min-w-full h-full aspect-square rounded-xl m-auto",
                i >= 5 && "bg-primary-100",
                i === 4 && "bg-primary-200",
                i === 3 && "bg-primary-300",
                i === 2 && "bg-secondary-100",
                i <= 1 && "bg-secondary-200"
            )}
        />
    );
}

export default function AllDays(props) {
    const [form, setForm] = useState(false);
    const [manage, setManage] = useState(false);

    let days = useStore((state) => state.days);
    let setDays = useStore((state) => state.setDays);

    useEffect(() => {
        if (days.length < 1) {
            setDays([0, 0, 0, 0, 0]);
        }
    }, []);

    return (
        <section className="w-full">
            <div className="w-full flex items-center justify-between mb-8">
                <button onClick={() => setManage(true)}>
                    <Menu className="w-10 h-10 stroke-neutral-100" />
                </button>

                <button onClick={() => setForm(true)}>
                    <Add className="w-10 h-10 stroke-neutral-100" />
                </button>
            </div>
            <h1 className="text-4xl mb-2">all days</h1>
            {days.length > 0 && (
                <ul className="w-full grid grid-cols-7 gap-3 my-6 sm:px-16">
                    {days.map((i, index) => (
                        <Day key={index + ""} score={i} />
                    ))}
                </ul>
            )}
            {form && (
                <CommitForm
                    setForm={setForm}
                    dispatch={props.dispatch}
                    data={props.state}
                />
            )}
            {manage && (
                <TaskManage
                    setForm={setForm}
                    setManage={setManage}
                    dispatch={props.dispatch}
                    data={props.state}
                />
            )}
        </section>
    );
}
