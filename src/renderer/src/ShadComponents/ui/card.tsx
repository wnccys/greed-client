import * as React from "react"

<<<<<<< HEAD:src/renderer/src/components/ui/card.tsx
import { cn } from "@renderer/components/lib/utils"
=======
import { cn } from "@renderer/ShadComponents/lib/utils"
>>>>>>> 5095f491525e76447a40d89d34828e9d282c5da2:src/renderer/src/ShadComponents/ui/card.tsx

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border bg-card text-card-foreground shadow",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
<<<<<<< HEAD:src/renderer/src/components/ui/card.tsx
    className={cn("flex flex-col space-y-1.5 p-6 bg-black", className)}
=======
    className={cn("flex flex-col space-y-1.5 p-6", className)}
>>>>>>> 5095f491525e76447a40d89d34828e9d282c5da2:src/renderer/src/ShadComponents/ui/card.tsx
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
<<<<<<< HEAD:src/renderer/src/components/ui/card.tsx
  <div ref={ref} className={cn("p-6 pt-0 bg-black", className)} {...props} />
=======
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
>>>>>>> 5095f491525e76447a40d89d34828e9d282c5da2:src/renderer/src/ShadComponents/ui/card.tsx
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
<<<<<<< HEAD:src/renderer/src/components/ui/card.tsx
    className={cn("flex items-center p-6 pt-0 bg-black", className)}
=======
    className={cn("flex items-center p-6 pt-0", className)}
>>>>>>> 5095f491525e76447a40d89d34828e9d282c5da2:src/renderer/src/ShadComponents/ui/card.tsx
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
