// import Versions from './components/Versions'
// import electronLogo from './assets/electron.svg'
import { useState } from 'react';
import { InputFile } from "@renderer/components/ui/inputfile";

export function App(): JSX.Element {
  const [versions] = useState(window.electron.process.versions);

  return (
    <>
      <h1>Hello Greed</h1>
      <br/>
      <h2>Node: v{versions.node}, Chrome: v{versions.chrome}</h2>
      <InputFile></InputFile>
    </>
  );
}