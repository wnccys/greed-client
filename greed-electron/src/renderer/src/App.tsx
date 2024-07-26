import { InputFile } from "@renderer/components/ui/inputfile";
import { useState } from "react";

export function App(): JSX.Element {
  const [downloadResult, setDownloadResult] = useState<string | undefined>(undefined);

  return (
    <>
      <h1>Hello Greed</h1>
      <br/>
      <InputFile updateDownloadResult={setDownloadResult}/>
      <p className="pt-5">{downloadResult}</p>
    </>
  );
}