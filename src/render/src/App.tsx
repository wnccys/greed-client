

import '@radix-ui/themes/styles.css';
import { Table_One } from './components/ui/table';
import { Box, Theme, ThemePanel } from '@radix-ui/themes';

export function App() {

  
    return (
     <div className="w-[1200px] h-[1000px] flex "> {/* div father */}
        
         <Box className="w-[1000px] h-[700px] rounded-lg bg-black flex flex-col "> {/* box pai back ground client */}

             <Box className="w-[1000px] h-[45px] rounded-lg bg-white border border-black "/> {/* header */}

                <Box className="w-[200px] h-[500px] rounded-lg bg-gradient-to-br from-gray-800 to-gray-600 flex text-left"> {/* box filho - status box*/}
                <Table_One className='text-white' />
                </Box> 
                 
              
         </Box>
     </div>
   
  
    );
  }


 