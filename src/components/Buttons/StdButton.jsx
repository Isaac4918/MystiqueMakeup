import React from 'react';
import './Buttons.css';

export function StdButton({text = '', onClickFunction, buttonType = 'Normal'}) {
    if(buttonType === 'Accept'){
        return (
            <button className='accept-button' onClick={onClickFunction}>{text}</button>
        );
    }
    else if(buttonType === 'Cancel'){
        return (
            <button className='cancel-button' onClick={onClickFunction}>{text}</button>
        );
    }
    else if(buttonType === 'Normal'){
        return (
            <button className='normal-button' onClick={onClickFunction}>{text}</button>
        );
    }

    
}
