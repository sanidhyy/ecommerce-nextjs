// utilities
import prismadb from "@/lib/prismadb";

// components
import ColorForm from "./components/color-form";

// color page
const ColorPage = async ({ params }: { params: { colorId: string } }) => {
  // fetch color data
  const color = await prismadb.color.findUnique({
    where: {
      id: params.colorId,
    },
  });

  return (
    <div className="flex-col">
      {/* color create/update form */}
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorForm initialData={color} />
      </div>
    </div>
  );
};

export default ColorPage;
