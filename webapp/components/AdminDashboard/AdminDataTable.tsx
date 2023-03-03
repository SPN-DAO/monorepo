import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import * as React from "react";

type Item = {
  encryptedCid: string;
  isDecrypted: boolean;
  walletAddress: string;
  tokenId?: number;
  sessionPayment: number;
};

// This is demo data, will be replaced with real data
const defaultData: Item[] = [
  {
    encryptedCid:
      "BuoW4MxSRnx14AtUMANfaqe9uJBGIeKoUt7mO9IAibMyOqrk78HVNG7PE3zZ_ZpNdGscs_kY_xvU9Fa0QjuFHA==",
    isDecrypted: true,
    walletAddress: "0xB0Ee2f94f0680d6131316d6056Dcf5827Abe492B",
    tokenId: 2,
    sessionPayment: 0.01,
  },
  {
    encryptedCid:
      "82cf7QgtXp7XVpeBdWenUxRAJDDTYnmGIDr7oxwEE2v8MlqjumztIcyYVEUGTQz3Igcy6iOq7qnyvmU1z_kMoQ==",
    isDecrypted: true,
    walletAddress: "0x72fC6D5f8759f812b8Ae1155A9A8ED4780678EeC",
    tokenId: 3,
    sessionPayment: 0.01,
  },
];

const columnHelper = createColumnHelper<Item>();

const columns = [
  columnHelper.accessor("walletAddress", {
    header: () => "Holder Wallet Address",
    cell: (item) => <Text>{item.getValue()}</Text>,
  }),
  columnHelper.accessor("sessionPayment", {
    header: () => "Session Payment",
    cell: (item) => <Text>{item.getValue()} FIL</Text>,
  }),
  columnHelper.accessor("isDecrypted", {
    header: () => "Status",
    cell: (item) => (item.getValue() ? "Decrypted" : "Encrypted"),
  }),
];

export default function AdminDataTable() {
  const [data, setData] = React.useState(() => [...defaultData]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <TableContainer>
      <Table
        colorScheme="gray"
        overflow="hidden"
        borderRadius="lg"
        borderBottom="2px solid white"
      >
        <Thead bgColor="blackAlpha.50">
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody bgColor="white" fontSize="sm">
          {table.getRowModel().rows.map((row) => (
            <Tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <Td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
