import {
	Github,
	Linkedin,
	Nextjs,
	ReactIcon,
	Threejs,
	Twitter,
} from "components/svgs";

const LINKS = [
	{
		title: "Three.js certificate",
		href: "https://threejs-journey.com/certificate/view/12180",
		image:
			"https://pbs.twimg.com/profile_images/1510259524271173638/lgTEVmRi_400x400.jpg",
	},
	{
		title: "CSS for JS Dev certificate",
		href: "https://courses.joshwcomeau.com/certificate/630a7b796d13304caa064ec9",
	},
];

const SOCIALS = [
	{
		name: "Twitter",
		href: "https://twitter.com/jody_gnzls",
		icon: Twitter,
	},
	{
		name: "Github",
		href: "https://github.com/JodyGs",
		icon: Github,
	},
	{
		name: "LinkedIn",
		href: "https://linkedin.com/in/jody-gnzls",
		icon: Linkedin,
	},
];

const MY_STACK = [
	{
		name: "React",
		icon: ReactIcon,
	},
	{
		name: "Next.js",
		icon: Nextjs,
	},
	{
		name: "Three.js",
		icon: Threejs,
	},
];

function LinkCard({
	href,
	title,
	image,
}) {
	return (
		<a
			href={href}
			className="flex items-center p-1 w-full rounded-md hover:scale-105 transition-all bg-gray-100 mb-3"
		>
			<div className="flex items-center text-center w-full text-gray-800">
				{image ? (
					<Image
						className="rounded-md"
						alt={title}
						src={image}
						width={40}
						height={40}
					/>
				) : (
					<div className="h-10 w-10"></div>
				)}
				<h2 className="font-semibold w-full">{title}</h2>
			</div>
		</a>
	);
}

export default function Overlay() {
	return (
		<>
			<div className="flex flex-col items-center w-full mt-16 px-8">
				<img
					className="rounded-full"
					alt={"Jody Gonzales"}
					src={
						"https://pbs.twimg.com/profile_images/1561019205968957440/f9P9z31O_400x400.png"
					}
					width={96}
					height={96}
				/>
				<h1 className="font-bold mt-4 text-xl">Jody Gonzales</h1>
				<div className="flex space-x-4 mb-8 mt-2">
					{MY_STACK.map(({ name, icon: Icon }) => (
						<a key={name}>
							<Icon className="h-6 w-6 fill-white" />
						</a>
					))}
				</div>
				{LINKS.map((link) => (
					<LinkCard key={link.href} {...link} />
				))}
				<div className="flex space-x-4 mt-8">
					{SOCIALS.map(({ href, name, icon: Icon }) => (
						<a key={name} href={href}>
							<Icon className="h-6 w-6 fill-white" />
						</a>
					))}
				</div>
			</div>
			<div className="absolute bottom-2 right-2">
				<p>
					linktr.ee clone 🌀 by JodyGs (
					<a
						href="https://github.com/JodyGs/my-linktree"
						className="text-blue-400 hover:text-blue-300"
					>
						source code
					</a>
					)
				</p>
			</div>
		</>
	);
}