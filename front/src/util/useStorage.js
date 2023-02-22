let storage = localStorage

function get_item(...keys){
	let res = []
	for(let key of keys){
		const data = JSON.parse(localStorage.getItem(key))
		res.push(data)
	}
	return res
}

function set_item(map) {
	if(typeof map === 'number' && map === -1){
		localStorage.clear()
	}

	for(let key in map){
		localStorage.setItem(key, JSON.stringify(map[key]))
	}
	return Object.entries(map)
}

export function useStorage(map) {
	if(map){
		set_item(map)
	}
	return [ get_item, set_item ]
}