import { Button } from "@renderer/components/ui/button"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@renderer/components/ui/table"

export function Settings() {
    return (
        <div className="flex flex-col items-center mt-5 p-5">
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
            </div>
        </div>
    )
}