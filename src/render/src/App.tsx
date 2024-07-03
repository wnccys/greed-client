import { Box, Container } from '@mui/material'
import { DownloadButton } from './components/DownloadButton'

export function App() {
  async function initTorrentDownload() {
    //TODO
  }

  return (
    <>
      <Container sx={{
        padding: "5em",
      }}>
        <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
          This Box renders as an HTML section element.
        </Box>
        <DownloadButton />
      </Container>
    </>
  )
}