import axios, { AxiosResponse } from 'axios';
import { ChangeEvent, useState } from 'react';
import { InputFile } from "@/components/ui/inputFile";
import { Button } from "@/components/ui/button";
import { CardDemo } from "@/components/ui/cardContent";

const baseURL = 'http://10.0.0.41/5172';

export function App() {
  const [torrentFile, setTorrentFile] = useState<File>();
  const [response, setResponse] = useState<AxiosResponse>();

  function downloadTorrent() {
    console.log("Torrent File: ", torrentFile?.name);
    axios.post(baseURL, {
        body: torrentFile,
      })
    .then((axiosResponse) => {
      setResponse(axiosResponse);
      console.log(response);
    });

    console.log("Response from server: ", response);
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setTorrentFile(e.target.files[0]);
    }
  }

  return (
    <div className='mt-14 p-6 mx-auto border border-zinc-800'>
      <CardDemo className="mb-5" />
      <InputFile onChange={handleFileChange}/>
      <Button className ="mt-5" onClick={downloadTorrent}>Download Torrent</Button>
  </div>
  )
}