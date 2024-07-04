import { InputFile } from "@/components/ui/inputFile";
import { Button } from "@/components/ui/button"

export function App() {
  return (
      <div className='p-6 max-w-4xl mx-auto border border-zinc-800'>
        <InputFile />
        <Button className ="mt-5">Download Torrent</Button>
    </div>
  )
}