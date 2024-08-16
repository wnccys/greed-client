import { Button } from "@renderer/ShadComponents/ui/button";
import { Input } from "@renderer/ShadComponents/ui/input";
import { Label } from "@renderer/ShadComponents/ui/label";
import { Toaster } from "@renderer/ShadComponents/ui/sonner";
import { toast } from "sonner";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@renderer/ShadComponents/ui/table";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogFooter,
	DialogTitle,
	DialogTrigger,
} from "@renderer/ShadComponents/ui/dialog";
import { useEffect, useRef, useState } from "react";
import { Cross2Icon } from "@radix-ui/react-icons";

export function Settings() {
	const sourceLinkRef = useRef<HTMLInputElement>(null);
	const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
	const [sources, setSources] = useState([]);

	useEffect(() => {
		window.electron.ipcRenderer
			.invoke("getSourcesList")
			.then((receivedSources) => {
				setSources(receivedSources);
			});

		return () => {
			window.electron.ipcRenderer.removeAllListeners("getSourcesList");
		};
	}, []);

	function addSourceToDB() {
		if (sourceLinkRef.current) {
			if (sourceLinkRef.current.value.length > 0) {
				window.api.addSourceToDB(sourceLinkRef.current.value).then((result) => {
					if (result[0] === "Success") {
						toast.success(result[0], {
							description: result[1],
						});

						window.electron.ipcRenderer
							.invoke("getSourcesList")
							.then((receivedSources) => {
								setSources(receivedSources);
							});

						setIsDialogOpen(false);
						return;
					}

					toast.error(result[0], {
						description: result[1],
					});
				});
			}
		}
	}

	function removeSourceFromDB(sourceName: string) {
		window.api.removeSourceFromDB(sourceName);
	}

	return (
		<div
			className="flex flex-col items-center self-center mt-[10em] p-5 
	cursor-default rounded h-screen"
		>
			<div className="max-h-full border p-5 rounded shadow-zinc-950 shadow-xl">
				<p className="text-xl">Current Torrent Sources</p>
				<div className="self-center">
					<Table className="mt-5">
						<TableHeader className="hover:bg-zinc-900">
							<TableRow>
								<TableHead className="w-[160px]">Source Name</TableHead>
								<TableHead>Status</TableHead>
								<TableHead className="text-right">Repacks</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{/* biome-ignore lint/suspicious/noExplicitAny: <explanation> */}
							{sources.map((source: any, index) => {
								return (
									// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
									<TableRow className="hover:bg-zinc-800/50" key={index}>
										<TableCell className="font-medium">
											{String(source.name).slice(1,-1)}
										</TableCell>
										<TableCell>Syncronized</TableCell>
										<TableCell className="text-right">
											{source.downloadsCount}
										</TableCell>
										<TableCell className="text-right">
											<Button
												className="bg-zinc-800 hover:bg-red-500
												hover:-translate-y-1 hover:duration-500 transition-all"
												onClick={() => removeSourceFromDB(source.name)}
											>
												Remove
											</Button>
										</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>

					<Dialog open={isDialogOpen}>
						<DialogTrigger asChild>
							<Button
								className="float-right bg-zinc-800 mt-5
						hover:bg-zinc-700 hover:-translate-y-1 hover:duration-500 transition-all"
								onClick={() => setIsDialogOpen(true)}
							>
								Add
							</Button>
						</DialogTrigger>
						<DialogContent className="sm:max-w-[525px] bg-zinc-950">
							<DialogHeader>
								<DialogTitle>Adding Download Sources</DialogTitle>
								<DialogDescription>
									To add new sources, set a path to a .json file or a link to a
									source. Some community-trusted sources can be found here: {""}
									<a
										href="https://hydralinks.cloud/sources/"
										target="_blank"
										rel="noreferrer"
									>
										https://hydralinks.cloud/sources/
									</a>
									.
								</DialogDescription>
								<div
									className="absolute right-4 top-2 rounded-sm opacity-70 
								ring-offset-background hover:bg-zinc-800 
								hover:-translate-y-[2px] hover:duration-300 
								transition-all hover:opacity-100 focus:outline-none focus:ring-2 
								focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none 
								data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
								>
									<Cross2Icon
										className="size-4 cursor-pointer"
										onClick={() => setIsDialogOpen(false)}
									/>
								</div>
							</DialogHeader>
							<div className="grid gap-4 py-4">
								<div className="grid grid-cols-4 items-center gap-4">
									<Label htmlFor="username" className="text-right">
										Source Link
									</Label>
									<Input
										id="sourceLink"
										placeholder="Ex. fitgirl-repacks.site"
										className="col-span-3"
										ref={sourceLinkRef}
									/>
								</div>
							</div>

							<DialogFooter>
								<Button
									type="submit"
									onClick={addSourceToDB}
									className="hover:bg-zinc-800 hover:-translate-y-1
							hover:duration-500 transition-all"
								>
									Save
								</Button>
							</DialogFooter>
						</DialogContent>
					</Dialog>
					<Toaster className="bg-slate-950 drop-shadow-xl" />
				</div>
			</div>
		</div>
	);
}
