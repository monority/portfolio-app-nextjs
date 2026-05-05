import type { ReactNode } from "react";

import "./shared.css";

interface FormFieldProps {
    label: string;
    children: ReactNode;
    className?: string;
}

export default function FormField({ label, children, className }: FormFieldProps) {
    return (
        <label className={["msg-field", className].filter(Boolean).join(" ")}>
            <span className="msg-label">{label}</span>
            {children}
        </label>
    );
}
