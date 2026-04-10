import React from 'react';
import { motion } from 'motion/react';

interface PanelProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  rightElement?: React.ReactNode;
}

export const Panel: React.FC<PanelProps> = ({ title, children, className = '', rightElement }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`glass-panel p-4 flex flex-col h-full ${className}`}
    >
      {(title || rightElement) && (
        <div className="flex justify-between items-center mb-4 border-b border-white/5 pb-2">
          {title && <h3 className="text-xs uppercase tracking-[0.2em] text-white/70">{title}</h3>}
          {rightElement}
        </div>
      )}
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </motion.div>
  );
};

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Input: React.FC<InputProps> = ({ label, ...props }) => {
  return (
    <div className="mb-4">
      <label className="label-text">{label}</label>
      <input className="input-field" {...props} />
    </div>
  );
};

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string; label: string }[];
}

export const Select: React.FC<SelectProps> = ({ label, options, ...props }) => {
  return (
    <div className="mb-4">
      <label className="label-text">{label}</label>
      <select className="input-field appearance-none bg-black" {...props}>
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
};

export const Button: React.FC<{
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit';
}> = ({ children, variant = 'primary', onClick, className = '', type = 'button' }) => {
  const baseClass = variant === 'primary' ? 'btn-primary' : 'btn-secondary';
  return (
    <button type={type} onClick={onClick} className={`${baseClass} ${className}`}>
      {children}
    </button>
  );
};
