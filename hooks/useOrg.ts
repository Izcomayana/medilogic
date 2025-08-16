import { useState, useEffect, useMemo, useCallback } from "react";
import { toast } from "sonner";
import { Organization } from "../app/(dashboard)/super-admin/(pages)/organizations/org";
import { useAuth } from "@/components/auth";
import { isTokenExpired } from "@/hooks/token";
import axios from "axios";

export function useOrganizations() {
  const { token, refreshAccessToken } = useAuth();
  const [orgs, setOrgs] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    if (!token) return;
    let isMounted = true;

    const fetchOrgs = async () => {
      setLoading(true);
      let validToken = token;

      if (isTokenExpired(validToken)) {
        const refreshed = await refreshAccessToken();
        if (!refreshed) return;
        validToken = refreshed;
      }

      try {
        const res = await axios.get(
          "https://medilogic-backend.onrender.com/super/organizations",
          { headers: { Authorization: `Bearer ${validToken}` } },
        );

        if (!isMounted) return;
        const mapped = res.data.map((o: any) => ({
          id: o.id,
          name: o.name,
          type: o.type,
          status: o.is_active,
          userCount: o.user_count ?? 0,
          createdDate: new Date(o.created_at).toLocaleDateString(),
          invite_code: o.invite_code,
          ico_registered: o.ico_registered,
          data_retention_years: o.data_retention_years,
        }));
        setOrgs(mapped);
      } catch (err: any) {
        toast.error(err?.response?.data?.detail || err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchOrgs();
    return () => {
      isMounted = false;
    };
  }, [token]);

  const filteredOrganizations = useMemo(() => {
    return orgs.filter(
      (org) =>
        org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        org.type.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [orgs, searchTerm, statusFilter]);

  return {
    orgs,
    setOrgs,
    loading,
    filteredOrganizations,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
  };
}
