"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";

export type ProductColumn = {
  id: string;
  name: string;
  price: string;
  category: string;
  size: string;
  color: string;
  createdAt: string;
  isFeatured: boolean;
  isArchived: boolean;
  stock: number;
};

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "isFeatured",
    header: "Destaque",
    cell: ({ row }) => <div>{row.original.isFeatured ? "SIM" : "NÃO"}</div>,
  },
  {
    accessorKey: "isArchived",
    header: "Arquivado",
    cell: ({ row }) => <div>{row.original.isArchived ? "SIM" : "NÃO"}</div>,
  },
  {
    accessorKey: "price",
    header: "Preço",
  },
  {
    accessorKey: "category",
    header: "Categoria",
  },
  {
    accessorKey: "size",
    header: "Tamanho",
  },
  {
    accessorKey: "stock",
    header: "Estoque",
  },
  {
    accessorKey: "color",
    header: "Cor",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {/* {row.original.color} */}
        <div
          className="h-6 w-6 rounded-full border"
          style={{ backgroundColor: row.original.color }}
        />
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Cadastrado em",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
