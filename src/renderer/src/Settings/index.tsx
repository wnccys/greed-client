import { Button } from "@renderer/components/ui/button"
import { Input } from "@renderer/components/ui/input"
import { Label } from "@renderer/components/ui/label"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@renderer/components/ui/table"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@renderer/components/ui/dialog"


export function Settings() {
    return (
        <div className="flex flex-col items-center self-center mt-8 p-5 cursor-default border rounded max-w-[50vw] shadow-zinc-950 shadow-xl">
            <p className="text-xl">Current Torrent Sources</p>
            <div>
                <Table className="mt-5">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[160px]">Source Name</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Repacks</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell className="font-medium">FitGirl Repacks</TableCell>
                            <TableCell>Syncronized</TableCell>
                            <TableCell className="text-right">1000</TableCell>
                            <TableCell className="text-right">
                                <Button className="bg-zinc-800 hover:bg-red-500">Remove</Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>

                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="float-right bg-zinc-800 hover:bg-zinc-700 mt-5">Add</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px] bg-zinc-950">
                        <DialogHeader>
                        <DialogTitle>Adding Download Source</DialogTitle>
                        <DialogDescription>
                            To add new sources, set a path to a .json file or a link to a source.
                            Some community-trusted sources can be found here: <a href="https://hydralinks.cloud/sources/" 
                            target="_blank" rel="noreferrer">https://hydralinks.cloud/sources/</a>.
                        </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Name 
                                </Label>
                                <Input id="name" placeholder="Ex. Fitgirl Repacks" className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="username" className="text-right">
                                    Link
                                </Label>
                                <Input id="username" placeholder="Ex. fitgirlrepacks.site" className="col-span-3" />
                            </div>
                        </div>
                        <DialogFooter>
                        <Button type="submit">Save</Button>
                        </DialogFooter>
                    </DialogContent>

                </Dialog>
            </div>
        </div>
    )
}