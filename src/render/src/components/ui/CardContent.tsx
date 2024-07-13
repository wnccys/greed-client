import {
  Card,
  CardContent,
} from "@/components/ui/card"

type CardProps = React.ComponentProps<typeof Card>

export function CardDemo({ className, ...props }: CardProps) {
  return (
    <>
      <CardContent className="grid gap-4">
        <div className=" flex items-center space-x-4 rounded-md border p-4">
          <div className="flex-1 space-y-1">
            <img src="https://placehold.co/300x200" alt="" />
          </div>
        </div>
      </CardContent>
    </>
  )
}
