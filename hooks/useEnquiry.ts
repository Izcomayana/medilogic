import { useEffect, useState } from "react"
import { api } from "@/lib/api"
import { toast } from "sonner"
import { useAuthorizedRequest } from "@/hooks/useRequest"

export type Enquiry = {
  id: string
  short_id: string
  name: string
  email: string
  message: string
  created_at: string
}

export function useEnquiries() {
  const authorizedRequest = useAuthorizedRequest()
  const [enquiries, setEnquiries] = useState<Enquiry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        await authorizedRequest(async (token) => {
          const res = await api.get<Enquiry[]>("/enquiries/", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          setEnquiries(res.data)
        }, "Failed to load enquiries")
      } catch {
        toast.error("Unable to fetch enquiries")
      } finally {
        setLoading(false)
      }
    }

    fetchEnquiries()
  }, [])

  return {
    enquiries,
    loading,
    total: enquiries.length,
    recent: enquiries.slice(0, 5),
  }
}
