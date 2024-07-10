import axios, { AxiosResponse } from 'axios';
import { ChangeEvent, useState } from 'react';
import { InputFile } from "@/components/ui/inputFile";
import { Button } from "@/components/ui/button";
import { CardDemo } from "@/components/ui/cardContent";

const baseURL = 'http://localhost:5172/download';

export function App() {
  const [torrentFile, setTorrentFile] = useState<File>();
  // const [response, setResponse] = useState<AxiosResponse>();

  async function downloadTorrent(e: any) {
    e.preventDefault();
    console.log("Torrent File: ", torrentFile);

    try {
      axios.post(baseURL, {
          body: torrentFile,
        })
      .then((axiosResponse) => {
        console.log(axiosResponse);
      })
      .catch((e) => {
        console.log(e);
      });
    } catch (e) {
      console.error("Failed to make request: ", e);
    }
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
      <Button className ="mt-5" type="submit" onClick={downloadTorrent}>Download Torrent</Button>
  </div>
  )
}