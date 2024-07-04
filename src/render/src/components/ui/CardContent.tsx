import { BellIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"

type CardProps = React.ComponentProps<typeof Card>

export function CardDemo({ className, ...props }: CardProps) {
  return (
    <>
      <CardHeader>
        <CardTitle>Game Image Placeholder</CardTitle>
        <CardDescription>Download Torrent Games</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className=" flex items-center space-x-4 rounded-md border p-4">
          <div className="flex-1 space-y-1">
            <img src="https://placehold.co/300x200" alt="" />
          </div>
        </div>
      </CardContent>
      <CardFooter>
      </CardFooter>
      </>
  )
}
