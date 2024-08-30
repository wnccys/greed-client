import * as React from "react"

import { cn } from "@renderer/ShadComponents/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none",
          className
        )}
        ref={ref}
        {...props}
        />
    )
  }
)
Input.displayName = "Input"

export { Input }
