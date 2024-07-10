

import '@radix-ui/themes/styles.css';
import { Table_One } from './components/ui/table';
import { Box, Theme, ThemePanel } from '@radix-ui/themes';

export function App() {

  
    return (
     <div className="w-[1000px] h-[1000px] flex justify-center items-center"> {/* div pai */}
        
         <Box className="w-[800px] h-[500px] rounded-lg bg-black flex "> {/* box pai */}
            
         <Box className="w-[200px] h-[490px] rounded-lg bg-gradient-to-br from-gray-800 to-gray-600 flex justify-center items-center">
              <Table_One className='text-blue' />
              </Box> 
              
         </Box>
     </div>
   
  
    );
  }


 