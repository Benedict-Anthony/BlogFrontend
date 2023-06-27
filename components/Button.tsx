import React from 'react'
type ButtonProps = {
    title: string
    type: "submit" | "button"
    onClick?: () => void
    color?: "primary" | "neutral" | "primary" | "accent" | "warning" | "error" | "success" | "info"
}
const Button = ({ title, type, color, onClick }: ButtonProps) => {
    return (
        <button className={`btn btn-sm btn-active btn-${color ? color : ""}`} type={type} onClick={onClick}>
            {title}
        </button >
    )
}

export default Button
