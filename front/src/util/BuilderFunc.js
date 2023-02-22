import  {nanoid} from 'nanoid'

export function dayBuilder(props){
	if(!props.score){
		props.score = 0
	}
	return {
		id: nanoid(),
		tasks: [],
		score: props.score,
		date: new Date().getTime()
	}
}

export function taskBuilder(){
	return {
		id: nanoid(),
		title: '',
		finished: false,
		occurrance: []
	}
}