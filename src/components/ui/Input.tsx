import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  isInvalid?: boolean;
}

export default function Input({
  label,
  error,
  isInvalid = false,
  className = '',
  ...props
}: InputProps) {
  const hasError = isInvalid || !!error;

  return (
    <div className="w-full">
      {label && (
        <label
          className="block mb-2 text-sm font-medium"
          style={{ color: 'var(--text-primary)' }}
        >
          {label}
        </label>
      )}
      <input
        className={`w-full p-3 rounded-lg border text-sm ${className}`}
        style={{
          backgroundColor: 'var(--background)',
          borderColor: hasError ? '#ef4444' : 'var(--border-color)',
          color: 'var(--text-primary)',
        }}
        {...props}
      />
      {error && (
        <p className="mt-2 text-sm text-red-500">❌ {error}</p>
      )}
    </div>
  );
}
