// utilities
import prismadb from "@/lib/prismadb";

// components
import SizeForm from "./components/size-form";

// size page
const SizePage = async ({
  params,
}: {
  params: Promise<{ sizeId: string }>;
}) => {
  const { sizeId } = await params;

  // fetch size data
  const size = await prismadb.size.findUnique({
    where: {
      id: sizeId,
    },
  });

  return (
    <div className="flex-col">
      {/* size create/update form */}
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeForm initialData={size} />
      </div>
    </div>
  );
};

export default SizePage;
