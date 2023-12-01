"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ApiList } from "@/components/ui/api-list";

import { columns, ColorColumn } from "./columns";
import { useState } from "react";

interface ColorClientProps {
  data: ColorColumn[];
}

export const ColorClient: React.FC<ColorClientProps> = ({ data }) => {
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleNewColor = () => {
    setLoading(true);
    router.push(`/${params.storeId}/colors/new`);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`Cores (${data.length})`} description="Editar cores" />
        <Button onClick={handleNewColor} disabled={loading}>
          <Plus className="mr-2 h-4 w-4" /> Novo
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      {/* <Heading title="API" description="API Calls for Colors" />
      <Separator />
      <ApiList entityName="colors" entityIdName="colorId" /> */}
    </>
  );
};
