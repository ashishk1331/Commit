import {
	MapPinIcon,
	CalendarIcon,
	Cog6ToothIcon,
} from "@heroicons/react/24/solid";

function cn(...classes) {
	return classes.filter(Boolean).join(" ");
}

function Item(props) {
	return (
		<li
			className={cn(
				"flex flex-col items-center w-fit cursor-pointer ",
				props.selected ? " text-neutral-100 " : " text-secondary-100"
			)}
			onClick={props.onClick}
		>
			{props.children}
		</li>
	);
}

export default function NavBar(props) {
	return (
		<ul className="fixed bottom-0 w-full py-4 flex items-center justify-around">
			<Item
				selected={props.state.slide === 0}
				onClick={() =>
					props.dispatch({
						type: "SET_SLIDE",
						value: 0,
					})
				}
			>
				<CalendarIcon
					className={cn(
						"w-6 h-6",
						props.state.slide === 0
							? "fill-neutral-100"
							: "fill-secondary-100"
					)}
				/>
				all days
			</Item>
			<Item
				selected={props.state.slide === 1}
				onClick={() =>
					props.dispatch({
						type: "SET_SLIDE",
						value: 1,
					})
				}
			>
				<MapPinIcon
					className={cn(
						"w-6 h-6",
						props.state.slide === 1
							? "fill-neutral-100"
							: "fill-secondary-100"
					)}
				/>
				today
			</Item>
			<Item
				selected={props.state.slide === 2}
				onClick={() =>
					props.dispatch({
						type: "SET_SLIDE",
						value: 2,
					})
				}
			>
				<Cog6ToothIcon
					className={cn(
						"w-6 h-6",
						props.state.slide === 2
							? "fill-neutral-100"
							: "fill-secondary-100"
					)}
				/>
				settings
			</Item>
		</ul>
	);
}
