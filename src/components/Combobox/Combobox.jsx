import React, { useState } from 'react';
import './Combobox.css';

export function Combobox({ options, onSelect }) {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleSelect = (option) => {
        setSelectedOption(option);
        onSelect(option);
    };

    return (
        <div>
            <select className='combo-style' value={selectedOption} onChange={(e) => handleSelect(e.target.value)}>
                <option value={null}>Selecciona una opción</option>
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
}

