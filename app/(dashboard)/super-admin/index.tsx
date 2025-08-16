/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Building2,
  // Users,
  Shield,
  // AlertTriangle,
  // RotateCcw,
  // TrendingUp,
  UserPlus,
  // Loader2,
} from "lucide-react";
import axios from "axios";
import { useAuth } from "@/components/auth";
import { isTokenExpired } from "@/hooks/token";
import CreateOrganizationDialog from "./(pages)/organizations/components/creatOrg";
import { toast } from "sonner";
import { Organization } from "./(pages)/organizations/org";

export default function Dashboard() {
  const { token, refreshAccessToken, setToken } = useAuth();
  const [orgCount, setOrgCount] = useState<number | null>(null);
  const [regulatorCount, setRegulatorCount] = useState<number | null>(null);
  const [orgs, setOrgs] = useState<Organization[]>([]);

  useEffect(() => {
    console.log("Organizations:", orgs);
    const fetchOrganizations = async () => {
      let validToken = token;

      if (!validToken || isTokenExpired(validToken)) {
        console.log("Token expired → refreshing...");
        try {
          const refreshed = await refreshAccessToken();
          if (!refreshed) return; // still failed
          validToken = refreshed; // ✅ use freshly returned token
        } catch (err: any) {
          console.error("Failed to refresh token:", err);
          return;
        }
      }

      try {
        const res = await axios.get(
          "https://medilogic-backend.onrender.com/super/organizations",
          {
            headers: {
              Authorization: `Bearer ${validToken}`,
            },
          },
        );

        setOrgCount(res.data.length);
      } catch (error: any) {
        console.error(
          "Failed to fetch organizations:",
          error?.response?.data?.detail || error.message,
        );
      }
    };

    const fetchRegulators = async () => {
      let validToken = token;

      if (!validToken || isTokenExpired(validToken)) {
        console.log("Token expired → refreshing...");
        try {
          const refreshed = await refreshAccessToken();
          if (!refreshed) return; // still failed
          validToken = refreshed; // ✅ use freshly returned token
        } catch (err: any) {
          console.error("Failed to refresh token:", err);
          return;
        }
      }

      try {
        const res = await axios.get(
          "https://medilogic-backend.onrender.com/super/super/regulators",
          {
            headers: {
              Authorization: `Bearer ${validToken}`,
            },
          },
        );

        setRegulatorCount(res.data.length);
      } catch (error: any) {
        console.error(
          "Failed to fetch regulators:",
          error?.response?.data?.detail || error.message,
        );
      }
    };

    fetchOrganizations();
    fetchRegulators();
  }, [token, refreshAccessToken, setToken]);

  const stats = [
    {
      title: "Total Organizations",
      value: orgCount !== null ? String(orgCount) : ".",
      change: "+2 this month",
      icon: Building2,
      trend: "up",
    },
    // {
    //   title: "Total Org Users",
    //   value: "1,247",
    //   change: "+18% from last month",
    //   icon: Users,
    //   trend: "up",
    // },
    {
      title: "Total Regulators",
      value: regulatorCount !== null ? String(regulatorCount) : ".",
      change: "No change",
      icon: Shield,
      trend: "neutral",
    },
    // {
    //   title: "Pending Deactivations",
    //   value: "3",
    //   change: "Requires attention",
    //   icon: AlertTriangle,
    //   trend: "warning",
    // },
    // {
    //   title: "Invite Codes Regenerated",
    //   value: "12",
    //   change: "This month",
    //   icon: RotateCcw,
    //   trend: "neutral",
    // },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <header className="flex h-16 items-center gap-4 border-b border-gray-700 bg-gray-900 px-6">
        <SidebarTrigger className="text-white hover:bg-gray-800" />
        <div className="flex-1">
          <h1 className="text-xl font-semibold text-white">
            Super Admin Dashboard
          </h1>
          <p className="text-sm text-gray-400">Welcome back, Damola</p>
        </div>
      </header>

      <main className="flex-1 p-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {stats.map((stat, index) => (
            <Card key={index} className="dashboard-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {stat.value}
                </div>
                {/* <div
                  className={`text-xs flex items-center gap-1 mt-1 ${
                    stat.trend === "up"
                      ? "text-[#15941f]"
                      : stat.trend === "warning"
                        ? "text-yellow-500"
                        : "text-gray-400"
                  }`}
                >
                  {stat.trend === "up" && <TrendingUp className="h-3 w-3" />}
                  {stat.change}
                </div> */}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle className="text-white">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-[#15941f]"></div>
                  <div className="flex-1">
                    <p className="text-sm text-white">
                      New organization "TechCorp" created
                    </p>
                    <p className="text-xs text-gray-400">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                  <div className="flex-1">
                    <p className="text-sm text-white">
                      Invite code regenerated for "FinanceInc"
                    </p>
                    <p className="text-xs text-gray-400">4 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                  <div className="flex-1">
                    <p className="text-sm text-white">
                      Regulator "John Smith" added
                    </p>
                    <p className="text-xs text-gray-400">1 day ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle className="text-white">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                <CreateOrganizationDialog
                  onCreate={async (orgData) => {
                    try {
                      let validToken = token;
                      if (!validToken || isTokenExpired(validToken)) {
                        const refreshed = await refreshAccessToken();
                        if (!refreshed) {
                          toast.error(
                            "Authentication expired. Please log in again.",
                          );
                          return;
                        }
                        validToken = refreshed;
                      }

                      const res = await axios.post(
                        "https://medilogic-backend.onrender.com/super/organizations",
                        orgData,
                        {
                          headers: {
                            Authorization: `Bearer ${validToken}`,
                            "Content-Type": "application/json",
                          },
                        },
                      );

                      // optimistic update
                      setOrgs((prev) => [
                        ...prev,
                        {
                          id: res.data.id,
                          name: res.data.name,
                          type: res.data.type,
                          status: res.data.is_active,
                          userCount: res.data.user_count ?? 0,
                          createdDate: new Date(
                            res.data.created_at,
                          ).toLocaleDateString(),
                          invite_code: res.data.invite_code,
                          ico_registered: res.data.ico_registered,
                          data_retention_years: res.data.data_retention_years,
                        },
                      ]);

                      toast.success("Organization created successfully");
                    } catch (err: any) {
                      const detail = err?.response?.data?.detail;
                      const msg = Array.isArray(detail)
                        ? detail.map((d: any) => d.msg).join(" • ")
                        : detail ||
                          err.message ||
                          "Failed to create organization";
                      toast.error(msg);
                      throw err; // so dialog keeps open (since we await it)
                    }
                  }}
                />
                <button className="primary-button flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium">
                  <Shield className="h-4 w-4" />
                  Add Regulator
                </button>
                <button className="primary-button flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium">
                  <UserPlus className="h-4 w-4" />
                  Create User
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
