  
import { BarGrid } from "../ShadComponents/ui/bargrid";
import { useState } from "react";
import { CardHeader } from "@renderer/ShadComponents/ui/gridHeader";

export function Download() {
  const [downloadResult, setDownloadResult] = useState<string | undefined>(
		undefined,
	);


  return (
    <div>

      <div id="gridRede" className="container flex flex-col h-20px overflow-hidden p-0">

        <div className="flex-grow p-4">
          <CardHeader
          title="Download"
         description="Rede"
        />
        <BarGrid/>  
          </div>      

      </div>

       <div id="gridDisco" className="container flex flex-col h-20px overflow-hidden p-0">
       <div className="flex-grow p-4">
       <CardHeader
         title="Download"
         description="Disco"
       />
         <BarGrid/>  
           </div>      
       </div>
    
       </div>
    
  );
}