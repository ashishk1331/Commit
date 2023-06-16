import logo1 from "../assets/1-logo.png";
import logo2 from "../assets/2-logo.png";
import logo3 from "../assets/3-logo.png";
import logo4 from "../assets/4-logo.png";
import logo5 from "../assets/5-logo.png";
import banner1 from "../assets/1-banner.png";
import banner2 from "../assets/2-banner.jpg";
import banner3 from "../assets/3-banner.jpg";
import banner4 from "../assets/4-banner.jpg";
import Button from "../components/Button";
import {
	ArrowSmallRightIcon,
	ArrowUpRightIcon,
	MapPinIcon,
} from "@heroicons/react/24/solid";

export default function LandingPage(props) {
	return (
		<>
			<section className="w-full h-screen overflow-hidden v-flex gap-6 pt-16 md:flex-row md:w-full md:justify-around">
				<div className="v-flex gap-4">
					<img
						src={logo1}
						alt="Commit logo."
						className="max-w-16 w-fit max-h-16 aspect-square mx-auto"
					/>
					<h1 className="text-center">
						build habits that last,
						<br />
						not streaks that fade
					</h1>

					<Button
						onClick={() =>
							props.dispatch({
								type: "SET_SLIDE",
								value: 1,
							})
						}
						className="w-fit mx-auto"
					>
						<p className="font-medium">login</p>
						<ArrowSmallRightIcon className="h-6 w-6 fill-primary-100" />
					</Button>
				</div>

				<div className="w-[80%] h-[100%] border-2 border-secondary-100 mt-12 rounded-3xl mx-auto md:w-1/2">
					<img
						src={banner1}
						alt=""
						className="w-full object-cover rounded-3xl"
					/>
				</div>
			</section>

			<section className="w-full h-screen overflow-hidden v-flex gap-3 pt-16 mt-12 md:flex-row-reverse md:w-full md:justify-around">
				<div className="v-flex gap-4">
					<img
						src={logo2}
						alt="Commit logo."
						className="max-w-16 max-h-16 aspect-square"
					/>
					<h1 className="text-center">
						become better,
						<br />
						one day at a time
					</h1>
				</div>

				<div className="w-[80%] h-[100%] border-2 border-secondary-100 mt-12 rounded-3xl md:w-1/2">
					<img
						src={banner2}
						alt=""
						className="w-full object-cover rounded-3xl mt-12"
					/>
				</div>
			</section>

			<section className="w-full h-screen overflow-hidden v-flex gap-3 pt-16 mt-12 md:flex-row md:justify-around">
				<div className="v-flex gap-4">
					<img
						src={logo3}
						alt="Commit logo."
						className="max-w-16 w-fit max-h-16 aspect-square mx-auto"
					/>
					<h1 className="text-center">
						commit
						<br />
						to the change
					</h1>
				</div>

				<div className="w-[80%] h-[100%] border-2 border-secondary-100 mt-12 rounded-3xl md:w-1/2">
					<img
						src={banner3}
						alt=""
						className="w-full object-cover rounded-3xl mt-12"
					/>
				</div>
			</section>

			<section className="w-full h-screen overflow-hidden v-flex gap-3 pt-16 mt-12 md:flex-row-reverse md:w-full md:justify-around">
				<div className="v-flex gap-4">
					<img
						src={logo4}
						alt="Commit logo."
						className="max-w-16 max-h-16 aspect-square"
					/>
					<h1 className="text-center">
						elegant design,
						<br />
						maximum efficiency
					</h1>
				</div>

				<div className="w-[80%] h-[100%] border-2 border-secondary-100 mt-12 rounded-3xl md:w-1/2">
					<img
						src={banner4}
						alt=""
						className="w-full object-cover rounded-3xl mt-12"
					/>
				</div>
			</section>

			<footer className="w-full text-center p-12 py-24">
				<p className="text-lg">
					clone of the{" "}
					<a
						href="http://trycommit.app/"
						target="_blank"
						className="underline"
					>
						commit app
					</a>
				</p>
				<p className="text-secondary-100 my-3">Created by</p>
				<a
					className="h-flex w-fit mx-auto p-4 border-2 border-secondary-100 rounded-xl"
					href="https://bio.link/ashishk"
					target="_blank"
				>
					<h1 className="h-flex">
						AshishK
						<ArrowUpRightIcon className="w-6 h-6 fill-primary-100 stroke-primary-100" />
					</h1>
				</a>
			</footer>
		</>
	);
}
