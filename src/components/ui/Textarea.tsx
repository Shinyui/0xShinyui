import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  isInvalid?: boolean;
  showCharCount?: boolean;
  maxLength?: number;
}

export default function Textarea({
  label,
  error,
  isInvalid = false,
  showCharCount = false,
  maxLength,
  value,
  className = '',
  ...props
}: TextareaProps) {
  const hasError = isInvalid || !!error;
  const charCount = typeof value === 'string' ? value.length : 0;

  return (
    <div className="w-full">
      {label && (
        <label
          className="block mb-2 text-sm font-medium"
          style={{ color: 'var(--text-primary)' }}
        >
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <textarea
        value={value}
        className={`w-full p-3 rounded-lg border text-sm resize-y transition-all duration-200 ${className}`}
        style={{
          backgroundColor: 'var(--background)',
          borderColor: hasError ? '#ef4444' : 'var(--border-color)',
          color: 'var(--text-primary)',
          minHeight: '80px',
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = hasError ? '#ef4444' : 'var(--accent-gold)';
          e.currentTarget.style.boxShadow = hasError
            ? '0 0 0 3px rgba(239, 68, 68, 0.2)'
            : '0 0 0 3px rgba(240, 185, 11, 0.2)';
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = hasError ? '#ef4444' : 'var(--border-color)';
          e.currentTarget.style.boxShadow = 'none';
        }}
        maxLength={maxLength}
        {...props}
      />
      <div className="flex justify-between items-center mt-1">
        {error && (
          <p className="text-sm text-red-500">❌ {error}</p>
        )}
        {showCharCount && maxLength && (
          <span
            className="text-xs ml-auto"
            style={{ color: 'var(--text-muted)' }}
          >
            {charCount} / {maxLength} 字符
          </span>
        )}
      </div>
    </div>
  );
}
