"use client";
import {
	ShieldExclamationIcon,
	ArrowUturnLeftIcon,
} from "@heroicons/react/24/outline";

export default function (props) {
	return (
		<div className="absolute inset-0 w-full h-full flex">
			<div className="m-auto flex flex-col items-center text-center gap-4 mt-24">
				<a
					href="#"
					className="h-flex gap-2 w-full mb-8"
					onClick={(e) =>
						props.dispatch({
							type: "SET_SLIDE",
							value: 0,
						})
					}
				>
					<ArrowUturnLeftIcon className="w-4 h-4" />
					Back
				</a>
				<ShieldExclamationIcon className="w-12 h-12 fill-primary-100" />
				<p className="text-lg">
					The server is not connected.
					<br />
					Please tell{" "}
					<a
						href="https://twitter.com/AshishK1331"
						className="inline border-b-2 border-secondary-100"
					>
						AshishK
					</a>{" "}
					to start the engines.
				</p>
			</div>
		</div>
	);
}
