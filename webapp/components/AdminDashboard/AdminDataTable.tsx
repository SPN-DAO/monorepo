import {
  Box,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  Row,
  Table as TableType,
  useReactTable,
} from "@tanstack/react-table";
import * as React from "react";

import IndeterminateCheckbox from "../atoms/IndeterminateCheckbox";
import DecryptButton from "../molecules/admin/dashboard/DecryptButton";
import EncryptedStatus from "../molecules/admin/dashboard/EncryptedStatus";

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
    isDecrypted: false,
    walletAddress: "0x72fC6D5f8759f812b8Ae1155A9A8ED4780678EeC",
    tokenId: 3,
    sessionPayment: 0.01,
  },
  {
    encryptedCid:
      "BuoW4MxSRnx14AtUMANfaqe9uJBGIeKoUt7mO9IAibMyOqrk78HVNG7PE3zZ_ZpNdGscs_kY_xvU9Fa0QjuFHA==",
    isDecrypted: true,
    walletAddress: "0xB0Ee2f94f0680d6131316d6056Dcf5827Abe492B",
    tokenId: 4,
    sessionPayment: 0.01,
  },
  {
    encryptedCid:
      "82cf7QgtXp7XVpeBdWenUxRAJDDTYnmGIDr7oxwEE2v8MlqjumztIcyYVEUGTQz3Igcy6iOq7qnyvmU1z_kMoQ==",
    isDecrypted: false,
    walletAddress: "0x72fC6D5f8759f812b8Ae1155A9A8ED4780678EeC",
    tokenId: 5,
    sessionPayment: 0.01,
  },
  {
    encryptedCid:
      "BuoW4MxSRnx14AtUMANfaqe9uJBGIeKoUt7mO9IAibMyOqrk78HVNG7PE3zZ_ZpNdGscs_kY_xvU9Fa0QjuFHA==",
    isDecrypted: true,
    walletAddress: "0xB0Ee2f94f0680d6131316d6056Dcf5827Abe492B",
    tokenId: 6,
    sessionPayment: 0.01,
  },
  {
    encryptedCid:
      "82cf7QgtXp7XVpeBdWenUxRAJDDTYnmGIDr7oxwEE2v8MlqjumztIcyYVEUGTQz3Igcy6iOq7qnyvmU1z_kMoQ==",
    isDecrypted: false,
    walletAddress: "0x72fC6D5f8759f812b8Ae1155A9A8ED4780678EeC",
    tokenId: 7,
    sessionPayment: 0.01,
  },
  {
    encryptedCid:
      "BuoW4MxSRnx14AtUMANfaqe9uJBGIeKoUt7mO9IAibMyOqrk78HVNG7PE3zZ_ZpNdGscs_kY_xvU9Fa0QjuFHA==",
    isDecrypted: true,
    walletAddress: "0xB0Ee2f94f0680d6131316d6056Dcf5827Abe492B",
    tokenId: 8,
    sessionPayment: 0.01,
  },
  {
    encryptedCid:
      "82cf7QgtXp7XVpeBdWenUxRAJDDTYnmGIDr7oxwEE2v8MlqjumztIcyYVEUGTQz3Igcy6iOq7qnyvmU1z_kMoQ==",
    isDecrypted: false,
    walletAddress: "0x72fC6D5f8759f812b8Ae1155A9A8ED4780678EeC",
    tokenId: 9,
    sessionPayment: 0.01,
  },
  {
    encryptedCid:
      "BuoW4MxSRnx14AtUMANfaqe9uJBGIeKoUt7mO9IAibMyOqrk78HVNG7PE3zZ_ZpNdGscs_kY_xvU9Fa0QjuFHA==",
    isDecrypted: true,
    walletAddress: "0xB0Ee2f94f0680d6131316d6056Dcf5827Abe492B",
    tokenId: 10,
    sessionPayment: 0.01,
  },
  {
    encryptedCid:
      "82cf7QgtXp7XVpeBdWenUxRAJDDTYnmGIDr7oxwEE2v8MlqjumztIcyYVEUGTQz3Igcy6iOq7qnyvmU1z_kMoQ==",
    isDecrypted: false,
    walletAddress: "0x72fC6D5f8759f812b8Ae1155A9A8ED4780678EeC",
    tokenId: 11,
    sessionPayment: 0.01,
  },
  {
    encryptedCid:
      "BuoW4MxSRnx14AtUMANfaqe9uJBGIeKoUt7mO9IAibMyOqrk78HVNG7PE3zZ_ZpNdGscs_kY_xvU9Fa0QjuFHA==",
    isDecrypted: true,
    walletAddress: "0xB0Ee2f94f0680d6131316d6056Dcf5827Abe492B",
    tokenId: 12,
    sessionPayment: 0.01,
  },
  {
    encryptedCid:
      "82cf7QgtXp7XVpeBdWenUxRAJDDTYnmGIDr7oxwEE2v8MlqjumztIcyYVEUGTQz3Igcy6iOq7qnyvmU1z_kMoQ==",
    isDecrypted: false,
    walletAddress: "0x72fC6D5f8759f812b8Ae1155A9A8ED4780678EeC",
    tokenId: 13,
    sessionPayment: 0.01,
  },
];

const columnHelper = createColumnHelper<Item>();

const columns = [
  {
    id: "select",
    header: ({ table }: { table: TableType<Item> }) => (
      <IndeterminateCheckbox
        {...{
          checked: table.getIsAllRowsSelected(),
          indeterminate: table.getIsSomeRowsSelected(),
          onChange: table.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }: { row: Row<Item> }) => (
      <div className="px-1">
        <IndeterminateCheckbox
          {...{
            checked: row.getIsSelected(),
            disabled: !row.getCanSelect(),
            indeterminate: row.getIsSomeSelected(),
            onChange: row.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  },

  columnHelper.accessor("walletAddress", {
    header: () => "Holder Wallet Address",
    cell: (item) => (
      <Flex>
        <Text>{item.getValue()}</Text>
      </Flex>
    ),
  }),
  columnHelper.accessor("sessionPayment", {
    header: () => "Session Payment",
    cell: (item) => <Text>{item.getValue()} FIL</Text>,
  }),
  columnHelper.accessor("isDecrypted", {
    header: () => "Status",
    cell: (item) =>
      item.getValue() ? <EncryptedStatus isDecrypted /> : <DecryptButton />,
  }),
];

export default function AdminDataTable() {
  const [data, setData] = React.useState(() => [...defaultData]);

  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    state: {
      rowSelection,
    },
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
  });

  return (
    <TableContainer>
      <Box overflowY="auto" maxHeight="60vh">
        <Table
          colorScheme="gray"
          overflow="hidden"
          borderRadius="lg"
          borderBottom="2px solid white"
        >
          <Thead bgColor="#E6EDF9">
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
      </Box>
    </TableContainer>
  );
}
