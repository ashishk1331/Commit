function cn(...classes){
	return classes.filter(Boolean).join(' ')
}

export default function Button(props){
	return (
		<button onClick={props.onClick} className={cn("p-3 px-6 text-xl rounded-full flex items-center gap-2", !props.outline ? "border-2 border-primary-100" : "", props.className)}>
			{ props.children }
		</button>
	)
}