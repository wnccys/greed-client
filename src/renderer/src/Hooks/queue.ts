import { useEffect, useState } from "react";

export function useQueue() {
    const [queue, setQueue] = useState<QueueItem[]>([]);

    useEffect(() => {
        window.electron.ipcRenderer.on("updateQueueItems", (queueItems: QueueItem[])=> {
            console.log("queue items: ", queueItems);
            setQueue(queueItems);
        });

        return () => {
            window.electron.ipcRenderer.removeAllListeners("updateQueueItems");
        }
    })

    console.log("QUEUE: ", queue);

    return queue;
}