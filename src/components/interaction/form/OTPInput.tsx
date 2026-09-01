"use client"

import React, { useRef, useState } from 'react'

interface OTPInputProps {
    length: number;
    onChange: (otp: string) => void;
    className?: string;
    placeholder?: string
    disabled?: boolean;
    autocomplete?: React.HTMLInputAutoCompleteAttribute;
    inputMode?: "decimal" | "email" | "none" | "numeric" | "search" | "tel" | "text" | "url";
}

export function OTPInput({
    length,
    disabled,
    onChange,
    autocomplete,
    inputMode = "text",
    className = "",
    placeholder = "",
}: OTPInputProps) {
    const [otp, setOtp] = useState<string[]>(Array(length).fill(''));
    const inputs = useRef<HTMLInputElement[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>, index: number) => {
        const value = e.target.value

        if (value.length < 2) {
            let newArr = [...otp];
            newArr[index] = value.toUpperCase();
            setOtp(newArr);
            onChange(newArr.join(""))
        }

        if (value && index < length - 1) {
            inputs.current[index + 1].focus()
            inputs.current[index + 1].select()
        }
    }

    const handleBackspaceAndEnter = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace" && index > 0) {
            inputs.current[index - 1].focus()
            inputs.current[index - 1].select()
        }
    }

    const getPlaceholder = (index: number): string => placeholder.length >= (index + 1) ? placeholder[index].toUpperCase() : ""

    return (
        <div className={`flex gap-2 ${className}`}>
            {otp.map((character, index) => (
                <input key={index} value={character}
                    ref={(ref) => {inputs.current[index] = ref!}}
                    type="text"
                    disabled={disabled}
                    autoComplete={autocomplete}
                    placeholder={getPlaceholder(index)}
                    className={`text-center w-12 h-7.5 px-2 text-sm bg-white border-4 border-black outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] placeholder:text-bla focus:border-oh-blue ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
                    inputMode={inputMode}
                    aria-label={`OTP digit ${index + 1} of ${length}`}
                    onChange={(e) => handleChange(e, index)}
                    onKeyUp={(e) => handleBackspaceAndEnter(e, index)}
                />
            ))}
        </div>
    );
};