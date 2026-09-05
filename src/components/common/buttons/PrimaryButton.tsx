// common/buttons/PrimaryButton.tsx
import { type ButtonHTMLAttributes} from 'react';

export function PrimaryButton({ children, className = '', ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`w-fit bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors cursor-pointer shadow-md disabled:opacity-50 ${className}`.trim()}
    >
      {children}
    </button>
  );
}