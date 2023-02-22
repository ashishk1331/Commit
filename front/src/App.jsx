import LandingPage from './container/LandingPage'
import LoginPage from './container/LoginPage'
import LoginCode from './container/LoginCode'
import Home from './container/Home'
import Loader from './components/Loader'

import { useEffect, useState, useReducer } from 'react'
import { supabase } from './util/supabaseClient.js'
import { useNavigate } from "react-router-dom";

export default function App(){

    const initialState = {
        email: '',
        code: '',
        slide: 0,
        isLoading: false,
    }

    /* action = type + value */
    const reducer = (prev, action) => {
        let obj = {...prev}
        switch(action.type){
            case 'SET_IS_LOADING':
                obj.isLoading = !prev.isLoading
                break

            case 'SET_EMAIL':
                obj.email = action.value
                break

            case 'SET_CODE':
                obj.code = action.value
                break

            case 'SET_SLIDE':
                obj.slide = action.value
                break

            default:
                throw new Error('Invalid choice.')
        }
        return obj
    }

    const [ state, dispatch ] = useReducer(reducer, initialState)
    const [ plane, setPlane ] = useState(0)
    const navigate = useNavigate();

    useEffect(() => {
        (async function(){
            const { data: { session } } = await supabase.auth.getSession()
            if(session){
                navigate("/app");
            }
            if(state.isLoading){
                dispatch({
                    type: 'SET_IS_LOADING'
                })
            }
        })()
    }, [supabase])

    return (
        <div className="container mx-auto md:w-[768px]">
        {
            (state.slide === 0 && <LandingPage state={state} dispatch={dispatch} />)
            ||
            (state.slide === 1 && <LoginPage state={state} dispatch={dispatch} />) 
            || 
            (state.slide === 2 && <LoginCode state={state} dispatch={dispatch} navigate={navigate} />)
        }
        { state.isLoading && <Loader /> }
        </div>
    )
}