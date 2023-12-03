"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ApiList } from "@/components/ui/api-list";

import { columns, SizeColumn } from "./columns";
import { useState } from "react";

interface SizesClientProps {
  data: SizeColumn[];
}

export const SizesClient: React.FC<SizesClientProps> = ({ data }) => {
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleNewSize = () => {
    setLoading(true);
    router.push(`/${params.storeId}/sizes/new`);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Tamanhos (${data.length})`}
          description="Editar tamanhos"
        />
        <Button onClick={handleNewSize} disabled={loading}>
          <Plus className="mr-2 h-4 w-4" /> Novo
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      {/* <Heading title="API" description="API Calls for Sizes" />
      <Separator />
      <ApiList entityName="sizes" entityIdName="sizeId" /> */}
    </>
  );
};
