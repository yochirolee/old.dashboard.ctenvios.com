import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmployeeSales, EmployeeSalesByMonth } from "./employee-sales";

export function SalesTabs() {
   return (
      <div className="flex w-full max-w-sm flex-col gap-6">
         <Tabs defaultValue="account">
            <TabsList>
               <TabsTrigger value="account">Daily</TabsTrigger>
               <TabsTrigger value="password">Monthly</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
               <EmployeeSales />
            </TabsContent>
            <TabsContent value="password">
               <EmployeeSalesByMonth />
            </TabsContent>
         </Tabs>
      </div>
   );
}
