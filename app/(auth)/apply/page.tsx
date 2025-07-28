"use client";

import { HomeLogo } from "@/components/HomeLogo";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminTab } from "./components/AdminTab";
import { RegulatorTab } from "./components/RegulatorTab";

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
              <AdminTab />
            </TabsContent>

            {/* Regulator Form */}
            <TabsContent value="regulator">
              <RegulatorTab />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Apply;
