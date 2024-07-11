import axios from 'axios';
import { ChangeEvent, useState } from 'react';
import { InputFile } from "@/components/ui/inputFile";
import { Button } from "@/components/ui/button";
import { CardDemo } from "@/components/ui/cardContent";

export function App() {
  const baseURL = 'http://localhost:5172/download';
  const [torrentFile, setTorrentFile] = useState<File>();

  async function downloadTorrent() {
    const formData = new FormData;
    if (torrentFile) {
      formData.append('torrentFile', torrentFile, 'small.torrent');
    }

    try {
      axios.post(baseURL, formData, {
        headers: { 'Content-Type': 'application/x-bittorrent' }
      })
      .then((response) => {
        console.log('Response From Server: ', response);
      })
      .catch((e) => {
        console.log('Error receiving request: ', e);
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
      <Button className ="mt-5" onClick={downloadTorrent}>Download Torrent</Button>
  </div>
  )
}