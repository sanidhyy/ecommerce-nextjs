// utilities
import prismadb from "@/lib/prismadb";

// components
import BillboardForm from "./components/billboard-form";

// billboard page
const BillboardPage = async ({
  params,
}: {
  params: { billboardId: string };
}) => {
  // fetch billboard data
  const billboard = await prismadb.billboard.findUnique({
    where: {
      id: params.billboardId,
    },
  });

  return (
    <div className="flex-col">
      {/* billboard create/update form */}
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardForm initialData={billboard} />
      </div>
    </div>
  );
};

export default BillboardPage;
