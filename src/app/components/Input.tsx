import React from 'react';

interface InputProps {
    value: string;
    setValue: (value: string) => void;
    placholder: string
}

const Input: React.FC<InputProps> = ({ value, setValue, placholder }) => {
    return (
        <input
            value={value}
            placeholder={placholder}
            onChange={(e) => setValue(e.target.value)}
            className="input-type-text"
        />
    );
}

export default Input;
