import React from "react";
import './Buttons.css'
import { useNavigate } from "react-router";


export function BackButton({navigateTo}){
    let navigate = useNavigate();
    const navigation = () => {
        navigate(navigateTo);
    }
    return (
        <button className='backButton' onClick={navigation}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
        </button>
    )
}
