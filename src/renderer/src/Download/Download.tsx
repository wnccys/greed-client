  
import { BarGrid } from "../components/ui/bargrid";
import { useState } from "react";

export function Download() {
  const [downloadResult, setDownloadResult] = useState<string | undefined>(
		undefined,
	);


  return (

      <div id="grid" className="container flex flex-col h-screen overflow-hidden p-0">
      <div className="flex-grow p-4"> {/* Adiciona padding e garante que o Grid tenha espaço */}
        <BarGrid />
        <BarGrid />
      </div>
    </div>
      
    
  );
}