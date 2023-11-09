// icons
import { CreditCard, DollarSign, Package } from "lucide-react";

// components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Overview } from "@/components/overview";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

// utilities
import { formatter } from "@/lib/utils";

// actions
import { getTotalRevenue } from "@/actions/get-total-revenue";
import { getSalesCount } from "@/actions/get-sales-count";
import { getStockCount } from "@/actions/get-stock-count";
import { getGraphRevenue } from "@/actions/get-graph-revenue";

// dashboard page props
type DashboardPageProps = {
  params: { storeId: string };
};

// dashboard page
const DashboardPage: React.FC<DashboardPageProps> = async ({ params }) => {
  // fetch graph data
  const totalRevenue = await getTotalRevenue(params.storeId);
  const salesCount = await getSalesCount(params.storeId);
  const stockCount = await getStockCount(params.storeId);
  const graphRevenue = await getGraphRevenue(params.storeId);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        {/* heading - dashboard */}
        <Heading title="Dashboard" description="Overview of your store" />

        {/* horizontal separator */}
        <Separator />

        <div className="grid gap-4 grid-cols-3">
          {/* total revenue card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {formatter.format(totalRevenue)}
              </div>
            </CardContent>
          </Card>

          {/* sales count card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sales</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">+{salesCount}</div>
            </CardContent>
          </Card>

          {/* products in stock card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Products In Stock
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stockCount}</div>
            </CardContent>
          </Card>
        </div>

        {/* graph revenue card */}
        <Card className="col-span-4">
          {/* card header - overview */}
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>

          {/* card content - revenue graph */}
          <CardContent className="pl-2">
            <Overview data={graphRevenue} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
