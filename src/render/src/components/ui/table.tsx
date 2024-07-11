import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue} from "@nextui-org/react";

const rows = [
  {
    key: "1",
    status: "All (0)",
  },
  {
    key: "2",
    status: "Downloading (0)",
  },
  {
    key: "3",
    status: "Seeding (0)",
  },
  {
    key: "4",
    status: "Completed (0)",
  },
];

const columns = [
    {
    key: "status",
    label: "STATUS",
  },
];

interface TableOneProps {
  className: string,
}

export function Table_One({ className

 }: TableOneProps) {
  return (
    <Table className={className} aria-label="Example table with dynamic content">
      <TableHeader columns={columns}>
        {(column:any) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={rows}>
        {(item:any) => (
          <TableRow key={item.key}>
            {(columnKey:any) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}