import Aria2 from "aria2";
import WebSocket from "ws";
import fetch from "node-fetch";

//const torrent = new WebTorrent();
const aria2 = new Aria2({
    WebSocket: WebSocket,
    fetch: fetch,
    host: 'localhost',
    port: 6800,
    secure: false,
    secret: '', 
    path: '/jsonrpc'//request path of interface json rpc
});

aria2.open()  // open connection
    .then(() => {
        console.log('Connection to Aria2 opened');
        // Call the function here to ensure the connection is open before making the call
    })
    .catch((err:Error) => console.log('Error connecting to Aria2:', err));


export async function MagneticLinkURI(magnet: String) {
  //const magnet = "magnet:?xt=urn:btih:722fe65b2aa26d14f35b4ad627d20236e481d924&dn=alice.txt";
  try {
      const [guid] = await 
      aria2.call("addUri", [magnet], { dir: "/tmp" });


      console.log(`Download started with GID: ${guid}`);
  } catch (error) {
      console.log('Error adding URI:', error);
  }
}


/*
Os métodos para interface Rpc costumam pedir tokens de autorizacao porém system.listMethods e system.listNotifications 
podem ser executados sem token oq n altera em nada pois são seguros sem os tokens.
[
'onDownloadStart',
'onDownloadPause',
'onDownloadStop'  ,
'onDownloadComplete',
'onDownloadError',
'onBtDownloadComplete'
]

*/ 



/* Baixe o Aria2 no link: https://github.com/aria2/aria2/releases/tag/release-1.37.0 e configure na variável de ambiente do seu sistema


1-abra um shell e inicie a conexão com o servidor aria2 com o seguinte comando:  
aria2c --enable-rpc --rpc-listen-all=true --rpc-allow-origin-all 
configurado na porta 6800 e deixe escutando

Inicie o servidor local normalmente com npm run all--

há duas formas de testar o download de arquivos magnéticos primeiramente com uma resquest do tipo post 
com postman ou outra api no end point: http://localhost:5173/magnetic 
ou com fetch com js passando o argumento no body  com o link magnético : 
{
    "magnetLink": "magnet:?xt=urn:btih:722fe65b2aa26d14f35b4ad627d20236e481d924&dn=alice.txt"
}

ou simplesmente inicie o servidor do aria 2 dessa forma:

aria2c "link magnetico" 

ou se quiser registrar os logs do download 

aria2c -l C:\caminho\Downloads\log.txt "link magnético"

//aria2c --enable-rpc --rpc-listen-all=true --rpc-allow-origin-all */
