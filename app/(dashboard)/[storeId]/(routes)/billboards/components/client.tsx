"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ApiList } from "@/components/ui/api-list";

import { columns, BillboardColumn } from "./columns";
import { useState } from "react";

interface BillboardClientProps {
  data: BillboardColumn[];
}

export const BillboardClient: React.FC<BillboardClientProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const router = useRouter();

  const handleNewBillboard = () => {
    setLoading(true);
    router.push(`/${params.storeId}/billboards/new`);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Campanhas (${data.length})`}
          description="Editar campanhas da sua loja"
        />
        <Button onClick={handleNewBillboard} disabled={loading}>
          <Plus className="mr-2 h-4 w-4" /> Novo
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="label" columns={columns} data={data} />
      {/* <Heading title="API" description="API Calls for Billboards" />
      <Separator />
      <ApiList entityName="billboards" entityIdName="billboardId" /> */}
    </>
  );
};
