<<<<<<< HEAD
=======
import axios from 'axios';
import { ChangeEvent, useState } from 'react';
import { InputFile } from "@/components/ui/inputFile";
import { Button } from "@/components/ui/button";
import { CardDemo } from "@/components/ui/CardContent";
>>>>>>> c4fca77ac31585748d95398197e4f7940fa17b1d

export function App() {
  const baseURL = 'http://localhost:5172/download';
  const [torrentFile, setTorrentFile] = useState<File>();

<<<<<<< HEAD
  
    return (
     <div className="w-[1200px] h-[1000px] flex "> {/* div father */}
        
         <Box className="w-[1000px] h-[700px] rounded-lg bg-black flex flex-col "> {/* box pai back ground client */}

             <Box className="w-[1000px] h-[45px] rounded-lg bg-white border border-black ">
                    <Xis/>
             </Box> {/* header */}

                <Box className="w-[200px] h-[500px] rounded-lg bg-gradient-to-br from-gray-800 to-gray-600 flex text-left"> {/* box filho - status box*/}
                <Table_One className='text-white' />
                </Box> 
                 
              
         </Box>
     </div>
   
  
    );
=======
  async function downloadTorrent() {
    const formData = new FormData;

    if (!torrentFile) {
      return
    }

    formData.append('torrentFile', torrentFile, torrentFile.name);

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
>>>>>>> c4fca77ac31585748d95398197e4f7940fa17b1d
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setTorrentFile(e.target.files[0]);
    }
  }

 