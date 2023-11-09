import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

// utilities
import prismadb from "@/lib/prismadb";

// components
import SettingsForm from "./components/settings-form";

// setttings page props
type SettingsPageProps = {
  params: {
    storeId: string;
  };
};

// settings page
const SettingsPage: React.FC<SettingsPageProps> = async ({ params }) => {
  // get user id
  const { userId } = auth();

  // check if user is logged ih
  if (!userId) redirect("/sign-in");

  // fetch user's store data
  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  });

  // redirect if store doesn't exists
  if (!store) redirect("/");

  return (
    <div className="flex-col">
      {/* settings form */}
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingsForm initialData={store} />
      </div>
    </div>
  );
};

export default SettingsPage;
