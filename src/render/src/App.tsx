import { ChangeEvent, useState } from 'react';
import { InputFile } from "@/components/ui/inputFile";
import { Button } from "@/components/ui/button";
import { CardDemo } from "@/components/ui/cardContent";
import WebTorrent, { Torrent } from "webtorrent";

export function App() {
  const [torrentFile, setTorrentFile] = useState<File>();

  function handleDownloadClick() {
    if (!torrentFile) return;

    const client = new WebTorrent()
    client.add(torrentFile, (torrent: Torrent) => {
      console.log("Downloading Torrent: ", torrent);
    });
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setTorrentFile(e.target.files[0]);
    } else {
      throw Error("Could not open selected file.");
    }
  }

  return (
    <div className='mt-14 p-6 mx-auto border border-zinc-800'>
      <CardDemo className="mb-5" />
      <InputFile onChange={handleFileChange}/>
      <Button className ="mt-5" onClick={handleDownloadClick}>Download Torrent</Button>
  </div>
  )
}