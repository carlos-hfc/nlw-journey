import { InputHTMLAttributes, ReactNode } from "react"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon: ReactNode
}

export function Input({ icon, className, ...props }: InputProps) {
  return (
    <div className="flex h-14 flex-1 items-center gap-2 rounded-lg border border-zinc-950 bg-zinc-950 px-4 [&>svg]:size-5 [&>svg]:text-zinc-400">
      {icon}
      <input
        {...props}
        className={`flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none ${className}`}
      />
    </div>
  )
}
