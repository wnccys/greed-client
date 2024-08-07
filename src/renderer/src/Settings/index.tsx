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
import { useRef, useState } from "react";
import { Cross2Icon } from "@radix-ui/react-icons";

export function Settings() {
	const sourceLinkRef = useRef<HTMLInputElement>(null);
	const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

	function addSourceToDB() {
		if (sourceLinkRef.current) {
			if (
				sourceLinkRef.current.value.length > 0
			) {
				window.api.setNewTorrentSource(
					sourceLinkRef.current.value,
				);

				toast.success("Success", {
					description: "Source Added To Collection.",
				});

				setIsDialogOpen(false);

				return;
			}

			toast.error("Error", {
				description: "All fields Must Be Filled.",
			});

			console.log("error: text can't be blank");
		}
	}

	return (
		<div
			className="flex flex-col items-center self-center mt-[10em] p-5 
			cursor-default border rounded shadow-zinc-950 shadow-xl"
		>
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
						<TableRow className="hover:bg-zinc-800/50">
							<TableCell className="font-medium">FitGirl Repacks</TableCell>
							<TableCell>Syncronized</TableCell>
							<TableCell className="text-right">1000</TableCell>
							<TableCell className="text-right">
								<Button className="bg-zinc-800 hover:bg-red-500">Remove</Button>
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>

				<Dialog open={isDialogOpen}>
					<DialogTrigger asChild>
						<Button
							className="float-right bg-zinc-800 hover:bg-zinc-700 mt-5"
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
									ring-offset-background 
									transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 
									focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none 
									data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
							>
								<Cross2Icon className="h-4 w-4 cursor-pointer" onClick={() => setIsDialogOpen(false)}	/>
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
							<Button type="submit" onClick={addSourceToDB}>
								Save
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
				<Toaster className="bg-slate-950 drop-shadow-xl" />
			</div>
		</div>
	);
}
