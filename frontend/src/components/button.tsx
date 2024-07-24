import { ButtonHTMLAttributes } from "react"
import { tv, VariantProps } from "tailwind-variants"

const buttonVariants = tv({
  base: "flex items-center justify-center gap-2 rounded-lg px-5 font-medium",
  variants: {
    variant: {
      primary: "bg-lime-300 text-lime-950 hover:bg-lime-400",
      secondary: "bg-zinc-800 text-zinc-200 hover:bg-zinc-700",
    },
    size: {
      default: "py-2",
      full: "h-11 w-full",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "default",
  },
})

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ variant, size, className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={buttonVariants({ variant, size, className })}
    />
  )
}
