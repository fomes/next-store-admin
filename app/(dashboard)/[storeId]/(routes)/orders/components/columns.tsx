"use client";

import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";

export type OrderColumn = {
  id: string;
  phone: string;
  address: string;
  isPaid: boolean;
  totalPrice: string;
  products: string;
  createdAt: string;
};

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "products",
    header: "Produtos",
  },
  {
    accessorKey: "phone",
    header: "Telefone",
  },
  {
    accessorKey: "address",
    header: "Endereço",
  },
  {
    accessorKey: "totalPrice",
    header: "Total",
  },
  {
    accessorKey: "isPaid",
    header: "Pago",
    cell: ({ row }) => (
      <div
        className={cn(
          "w-10 flex justify-center rounded-lg px-2 font-semibold",
          `${row.original.isPaid ? "bg-lime-500" : "bg-red-500"}`
        )}
      >
        {row.original.isPaid ? "SIM" : "NÃO"}
      </div>
    ),
  },

  {
    accessorKey: "createdAt",
    header: "Data",
  },
];
