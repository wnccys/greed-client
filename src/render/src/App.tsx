import { InputFile } from "@/components/ui/inputFile";
import { Button } from "@/components/ui/button";
import { CardDemo } from "@/components/ui/CardContent";

export function App() {
  return (
    <div className='p-6 max-w-4xl mx-auto border border-zinc-800'>
      <CardDemo className="mb-5" />
      <InputFile />
      <Button className ="mt-5">Download Torrent</Button>
  </div>
  )
}