"use client";

import { useState } from "react";
import { style } from "./style";

interface TextboxProps {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  autoComplete?: string;
}

export default function Textbox({ label, name, type, placeholder, value, onChange, error, autoComplete }: TextboxProps) {
  return (
    <div className="mb-4">
      {error && (
        <span id={`${name}-error`} className="field-error" style={{color:"rgb(224, 85, 85)"}} role="alert">
          {error}
        </span>
      )}
      <label htmlFor={name} className={style.textbox_label_class} style={{color: style.grey}}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        className={style.textbox_class}
        aria-describedby={error ? `${name}-error` : undefined}
        aria-invalid={!!error}
      />
    </div>
  );
}