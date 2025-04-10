import React from "react";

interface nickNameInputFieldProps {
    value: string;
    placeholder: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error: string;
}

const NickNameInputField = ({
    error,
    value,
    placeholder,
    onChange,
}: nickNameInputFieldProps) => {
    return (
        <div>
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={`transition-all duration-100 text-black outline-none focus:border-black text-lg  font-medium tracking-tight border-b-2 border-[#444444] 
                    ${error ? "focus:border-red-500" : ""}
                    `}
            />
            {error && <p className="text-xs text-red-500">{error}</p>}
        </div>
    );
};

export default NickNameInputField;
