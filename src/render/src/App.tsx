import { useState } from 'react';
import { InputFile } from "@/components/ui/inputFile";
import { Button } from "@/components/ui/button";
import { CardDemo } from "@/components/ui/cardContent";
import WebTorrent, { Torrent } from "webtorrent";

export function App() {
  const [torrentFile, setTorrentFile] = useState<File | null>(null);

  function handleDownloadClick() {
    console.log('TorrentFile: ', torrentFile);
    if (!torrentFile) return;

    const client = new WebTorrent()
    client.add(torrentFile, (torrent: Torrent) => {
      console.log(torrent);
    });
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files !== undefined) {
      console.log("on event target files!!");
      console.log(event.target.files[0]);
      setTorrentFile(event.target.files[0]);
    } else {
      throw Error('Error handling files.');
    }
  }

  return (
    <div className='mt-14 p-6 mx-auto border border-zinc-800'>
      <CardDemo className="mb-5" />
      <InputFile onChange={ (event: any) => handleFileChange(event) }/>
      <Button className ="mt-5" onClick={handleDownloadClick}>Download Torrent</Button>
  </div>
  )
}