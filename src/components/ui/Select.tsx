import React, { forwardRef } from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  isInvalid?: boolean;
  options: Array<{ value: string; label: string; disabled?: boolean }>;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, isInvalid = false, options, className = '', ...props }, ref) => {
    const hasError = isInvalid || !!error;

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
        <select
          ref={ref}
          className={`w-full p-3 rounded-lg border text-sm cursor-pointer transition-all duration-200 ${className}`}
          style={{
            backgroundColor: 'var(--background)',
            borderColor: hasError ? '#ef4444' : 'var(--border-color)',
            color: 'var(--text-primary)',
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
          {...props}
        >
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
              style={{
                backgroundColor: 'var(--card-background)',
                color: 'var(--text-primary)',
              }}
            >
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <p className="mt-2 text-sm text-red-500">❌ {error}</p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;
