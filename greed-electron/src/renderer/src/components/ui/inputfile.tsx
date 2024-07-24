import { Input } from "@renderer/components/ui/input"
 
export function InputFile() {
  function handleChange() {
    window.electron.ipcRenderer.invoke('ping');
    window.api.openFile();
  }
  
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Input id="picture" type="file" onChange={handleChange}/>
    </div>
  )
}