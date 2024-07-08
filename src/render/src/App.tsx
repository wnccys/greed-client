import { useState } from 'react';
import { InputFile } from "@/components/ui/inputFile";
import { Button } from "@/components/ui/button";
import { CardDemo } from "@/components/ui/cardContent";
import fs from 'fs';
import WebTorrent, { Torrent } from "webtorrent";
// import { ChangeEvent } from "react";

export function App() {
  const [torrentFile, setTorrentFile] = useState('');

  function handleDownloadClick() {
    const dummyFile = fs.readFileSync('../../torrent_files/small.torrent', 'utf-8');
    if (dummyFile === '') return

    setTorrentFile(dummyFile);
    const client = new WebTorrent()
    client.add(torrentFile, (torrent: Torrent) => {
      console.log(torrent);
    });
  }

  // const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files[0]) {
  //     setTorrentFile(e.target.files[0]);
  //   }
  // };

  return (
    <div className='mt-14 p-6 mx-auto border border-zinc-800'>
      <CardDemo className="mb-5" />
      {/* <InputFile onChange={handleFileChange}/> */}
      <InputFile /> 
      <Button className ="mt-5" onClick={handleDownloadClick}>Download Torrent</Button>
  </div>
  )
}