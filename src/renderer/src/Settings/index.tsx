import { Button } from "@renderer/ShadComponents/ui/button";
import { Input } from "@renderer/ShadComponents/ui/input";
import { Label } from "@renderer/ShadComponents/ui/label";
import { Toaster } from "@renderer/ShadComponents/ui/sonner";
import { toast } from "sonner";
import * as Tabs from "@radix-ui/react-tabs";
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
	const [downloadPath, setDownloadPath] = useState<string>();

	useEffect(() => {
		window.electron.ipcRenderer
			.invoke("getCurrentDownloadPath")
			.then((currentPath: string) => {
				setDownloadPath(currentPath);
			});
	}, []);

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

	useEffect(() => {
		window.electron.ipcRenderer.on(
			"updateDownloadPath",
			(_event, newPath: string) => {
				setDownloadPath(newPath);
			},
		);

		return () => {
			window.electron.ipcRenderer.removeAllListeners("updateDownloadPath");
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
		window.api.removeSourceFromDB(sourceName).then((result) => {
			if (result[0] === "Success") {
				window.electron.ipcRenderer
					.invoke("getSourcesList")
					.then((receivedSources) => {
						setSources(receivedSources);
					});

				toast.success(result[0], {
					description: result[1],
				});

				return;
			}

			toast.error(result[0], {
				description: result[1],
			});
		});
	}

	function changeDefaultPath() {
		window.api.changeDefaultPath().then((result) => {
			if (result[0] === "Success") {
				toast.success(result[0], {
					description: result[1],
				});

				return;
			}

			toast.error(result[0], {
				description: result[1],
			});
		});
	}

	return (
		<div
			className="flex flex-col items-center self-center mt-[10em] p-5 
			cursor-default rounded h-screen"
		>
			<Tabs.Root className="flex flex-col w-[50rem]" defaultValue="tab1">
				<Tabs.List
					className="shrink-0 flex border-b border-mauve6"
					aria-label="Manage your account"
				>
					<Tabs.Trigger
						className="bg-zinc-[#09090b] px-5 h-[45px] flex-1 flex items-center justify-center text-[15px] 
						leading-none text-mauve11 select-none first:rounded-tl-md last:rounded-tr-md 
						hover:text-violet11 data-[state=active]:text-violet11 
						data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current 
						data-[state=active]:focus:relative outline-none cursor-default transition-all duration-300"
						value="tab1"
					>
						General Settings
					</Tabs.Trigger>
					<Tabs.Trigger
						className="bg-zinc-[#09090b] px-5 h-[45px] flex-1 flex items-center justify-center 
			text-[15px] leading-none text-mauve11 select-none first:rounded-tl-md last:rounded-tr-md  
			data-[state=active]:shadow-current data-[state=active]:focus:relative 
			data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0]
			 data-[state=active]:focus:shadow-white outline-none cursor-default transition-all duration-300"
						value="tab2"
					>
						Sources
					</Tabs.Trigger>
				</Tabs.List>
				<Tabs.Content
					className="grow p-5 bg-zinc-[#09090b] rounded-b-md outline-none"
					value="tab1"
				>
					<fieldset className="mb-[15px] flex flex-col justify-start pt-4">
						<div className="flex">
							<label
								className="text-[13px] leading-none mt-1 text-white block "
								htmlFor="name"
							>
								Default Download Path
							</label>
							<Input className="" disabled value={downloadPath} />
							<Button
								className="float-right bg-neutral-600 ms-8 hover:bg-zinc-600 
					hover:-translate-y-1 hover:duration-500 transition-all"
								onClick={changeDefaultPath}
							>
								Change
							</Button>
						</div>
					</fieldset>
					<div className="flex justify-end mt-5">
						<Button
							className="float-right bg-zinc-800
				hover:bg-zinc-700 hover:-translate-y-1 hover:duration-500 transition-all mt-10"
							onClick={() => setIsDialogOpen(true)}
						>
							Save
						</Button>
					</div>
				</Tabs.Content>
				<Tabs.Content
					className="grow p-5 bg-zinc-[#09090b] rounded-b-md outline-none"
					value="tab2"
				>
					<div className="max-h-full p-5 rounded">
						<div className="self-center">
							<Table className="mt-5 mb-5">
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
													{String(source.name).slice(1, -1)}
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
										className="float-right bg-zinc-800
								hover:bg-zinc-700 hover:-translate-y-1 hover:duration-500 transition-all mt-10"
										onClick={() => setIsDialogOpen(true)}
									>
										Add
									</Button>
								</DialogTrigger>
								<DialogContent className="sm:max-w-[525px] bg-zinc-950">
									<DialogHeader>
										<DialogTitle>Adding Download Sources</DialogTitle>
										<DialogDescription>
											To add new sources, set a path to a .json file or a link
											to a source. Some community-trusted sources can be found
											here: {""}
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
				</Tabs.Content>
			</Tabs.Root>
		</div>
	);
}
