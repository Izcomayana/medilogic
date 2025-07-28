import { HomeLogo } from "@/components/HomeLogo";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Apply = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center px-4 pt-8 pb-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <HomeLogo />
        </div>

        <div className="flex w-full flex-col gap-6">
          <Tabs defaultValue="admin">
            <TabsList>
              <TabsTrigger value="admin" className="cursor-pointer mr-4">
                Apply as Admin
              </TabsTrigger>
              <TabsTrigger value="regulator" className="cursor-pointer mr-4">
                Apply as Regulator
              </TabsTrigger>
            </TabsList>

            {/* Admin Form */}
            <TabsContent value="admin">
              <Card>
                <CardHeader>
                  <CardTitle>Admin Application</CardTitle>
                  <CardDescription>
                    Submit your details to request access as a clinic or waste
                    company admin.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="admin-name">Full Name</Label>
                    <Input id="admin-name" placeholder="John Doe" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="admin-email">Email</Label>
                    <Input
                      type="email"
                      id="admin-email"
                      placeholder="admin@email.com"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="admin-password">Password</Label>
                    <Input type="password" id="admin-password" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="admin-confirm-password">
                      Confirm Password
                    </Label>
                    <Input type="password" id="admin-confirm-password" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="admin-org-type">Organization Type</Label>
                    <Input
                      id="admin-org-type"
                      placeholder="Clinic, Waste Company, etc."
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="admin-org-name">Organization Name</Label>
                    <Input id="admin-org-name" placeholder="HealthCare Plus" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="admin-message">Additional Message</Label>
                    <Input
                      id="admin-message"
                      placeholder="Message to Super Admin..."
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Submit for Review</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Regulator Form */}
            <TabsContent value="regulator">
              <Card>
                <CardHeader>
                  <CardTitle>Regulator Application</CardTitle>
                  <CardDescription>
                    Submit your details to apply as a healthcare logistics
                    regulator.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="reg-name">Full Name</Label>
                    <Input id="reg-name" placeholder="Jane Smith" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="reg-email">Email</Label>
                    <Input
                      type="email"
                      id="reg-email"
                      placeholder="regulator@email.com"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="reg-password">Password</Label>
                    <Input type="password" id="reg-password" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="reg-confirm-password">
                      Confirm Password
                    </Label>
                    <Input type="password" id="reg-confirm-password" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="reg-country">Regulated Country</Label>
                    <Input id="reg-country" placeholder="United Kingdom" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="reg-state">Regulated State</Label>
                    <Input
                      id="reg-state"
                      placeholder="England, Scotland, etc."
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="reg-message">Additional Message</Label>
                    <Input
                      id="reg-message"
                      placeholder="Message to Super Admin..."
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Submit for Review</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Apply;

// import { HomeLogo } from "@/components/HomeLogo";
// import React from "react";
// // import { AppWindowIcon, CodeIcon } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// const Apply = () => {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center px-4 pt-8 pb-12">
//       <div className="w-full max-w-md">
//         <div className="text-center mb-8">
//           <HomeLogo />
//         </div>

//         <div className="flex w-full max-w-sm flex-col gap-6">
//           <Tabs defaultValue="account">
//             <TabsList>
//               <TabsTrigger value="account" className="cursor-pointer mr-4">Apply as an admin</TabsTrigger>
//               <TabsTrigger value="password" className="cursor-pointer mr-4">Apply as a regulator</TabsTrigger>
//             </TabsList>
//             <TabsContent value="account">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Account</CardTitle>
//                   <CardDescription>
//                     Make changes to your account here. Click save when
//                     you&apos;re done.
//                   </CardDescription>
//                 </CardHeader>
//                 <CardContent className="grid gap-6">
//                   <div className="grid gap-3">
//                     <Label htmlFor="tabs-demo-name">Name</Label>
//                     <Input id="tabs-demo-name" defaultValue="Pedro Duarte" />
//                   </div>
//                   <div className="grid gap-3">
//                     <Label htmlFor="tabs-demo-username">Username</Label>
//                     <Input id="tabs-demo-username" defaultValue="@peduarte" />
//                   </div>
//                 </CardContent>
//                 <CardFooter>
//                   <Button>Save changes</Button>
//                 </CardFooter>
//               </Card>
//             </TabsContent>
//             <TabsContent value="password">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Password</CardTitle>
//                   <CardDescription>
//                     Change your password here. After saving, you&apos;ll be
//                     logged out.
//                   </CardDescription>
//                 </CardHeader>
//                 <CardContent className="grid gap-6">
//                   <div className="grid gap-3">
//                     <Label htmlFor="tabs-demo-current">Current password</Label>
//                     <Input id="tabs-demo-current" type="password" />
//                   </div>
//                   <div className="grid gap-3">
//                     <Label htmlFor="tabs-demo-new">New password</Label>
//                     <Input id="tabs-demo-new" type="password" />
//                   </div>
//                 </CardContent>
//                 <CardFooter>
//                   <Button>Save password</Button>
//                 </CardFooter>
//               </Card>
//             </TabsContent>
//           </Tabs>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Apply;
