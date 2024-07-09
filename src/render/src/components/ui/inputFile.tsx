import { Input } from "@/components/ui/input"

interface inputFileProps {
  onChange?: (e: any) => void,
}

export function InputFile({ onChange }: inputFileProps) {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Input id="picture" onClick={onChange} type="file" />
    </div>
  )
}
