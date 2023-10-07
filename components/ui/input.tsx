import * as React from "react"

import { cn } from "@/utils/ui.utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "mt-8 flex h-10 border border-black text-xl text-center bg-[#F5F1ED]  placeholder:text-muted-foreground focus-visible:outline-none",
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
