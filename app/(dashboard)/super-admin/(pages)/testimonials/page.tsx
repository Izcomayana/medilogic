"use client"

import { PageHeader } from '@/app/(dashboard)/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  Star,
  Search,
  Eye,
  Check,
  Calendar,
  User,
  MessageSquare,
} from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { useEffect } from "react"
import { api } from "@/lib/api"
import { useAuthorizedRequest } from '@/hooks/useRequest';
import { formatDateTime } from '@/utils/datetime';

type Testimonial = {
  id: string
  short_id: string
  name: string
  content: string
  is_approved: boolean
  created_at: string
}

export default function TestimonialsPage() {
  const [testimonialsList, setTestimonialsList] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTestimonial, setSelectedTestimonial] =
    useState<Testimonial | null>(null)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [approving, setApproving] = useState(false)

  const authorizedRequest = useAuthorizedRequest();

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true)

        await authorizedRequest(async (token) => {
          const res = await api.get<Testimonial[]>("/testimonials/", {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          })
          setTestimonialsList(res.data)
        }, 'failed to get testimonies');
      } catch (err) {
        toast.error("Failed to load testimonials")
      } finally {
        setLoading(false)
      }
    }

    fetchTestimonials()
  }, [])

  const filteredTestimonials = testimonialsList.filter((testimonial) => {
    const term = searchTerm.toLowerCase()
    return (
      testimonial.name.toLowerCase().includes(term) ||
      testimonial.content.toLowerCase().includes(term)
    )
  })

  const pendingCount = testimonialsList.filter((t) => !t.is_approved).length
  const approvedCount = testimonialsList.filter((t) => t.is_approved).length

  const totalTestimonials = testimonialsList.length;

  const handleViewDetails = (testimonial: Testimonial) => {
    setSelectedTestimonial(testimonial)
    setIsDetailsModalOpen(true)
  }

  const handleApprove = async (testimonialId: string) => {
    try {
      setApproving(true)

      await authorizedRequest(async (token) => {
        const res = await api.patch<Testimonial>(
          `/testimonials/${testimonialId}/approve`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        setTestimonialsList((prev) =>
          prev.map((t) =>
            t.id === testimonialId ? res.data : t
          )
        )

        toast.success("Testimonial approved successfully ✅")
        setIsDetailsModalOpen(false)
        setSelectedTestimonial(null)
      }, "Failed to approve testimonial")
    } catch (err: any) {
      toast.error(
        err?.response?.data?.detail?.[0]?.msg ??
        "Failed to approve testimonial"
      )
    } finally {
      setApproving(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <PageHeader title="Testimonials" subtitle={`Pending approvals: ${pendingCount}`} />

      <main className="flex-1 p-6">
        {/* Stats Row */}
        <div className="grid gap-4 md:grid-cols-3 mb-6">
          <Card className="dashboard-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-300">Total Testimonials</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{totalTestimonials}</div>
            </CardContent>
          </Card>
          <Card className="dashboard-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-300">Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-500">{pendingCount}</div>
            </CardContent>
          </Card>
          <Card className="dashboard-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-300">Approved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[#15941f]">{approvedCount}</div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card className="dashboard-card mb-6">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Search className="h-5 w-5" />
              Search & Filter
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search by name or testimonial content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              />
            </div>
          </CardContent>
        </Card>

        {/* Testimonials Table */}
        <Card className="dashboard-card">
          <CardContent className="p-0">
            {loading ? (
              <div className="text-center py-12 text-gray-400">
                Loading testimonials...
              </div>
            ) : filteredTestimonials.length === 0 ? (
              <div className="text-center py-12">
                <MessageSquare className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">No testimonials found</h3>
                <p className="text-gray-400">
                  {searchTerm
                    ? "Try adjusting your search term."
                    : totalTestimonials === 0
                      ? "No testimonials submitted yet."
                      : "All testimonials are approved! 🎉"}
                </p>
              </div>
            ) : (
              <div className="rounded-md border border-gray-700">
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-700 hover:bg-gray-800">
                      <TableHead className="text-gray-300">Name</TableHead>
                      <TableHead className="text-gray-300">Content</TableHead>
                      <TableHead className="text-gray-300">Submitted</TableHead>
                      <TableHead className="text-gray-300">Status</TableHead>
                      <TableHead className="text-gray-300">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTestimonials.map((testimonial) => (
                      <TableRow key={testimonial.id} className="border-gray-700 hover:bg-gray-800">
                        <TableCell className="font-medium text-white flex items-center gap-2">
                          <User className="h-4 w-4 text-gray-400" />
                          {testimonial.name}
                        </TableCell>
                        <TableCell className="text-gray-300 max-w-md truncate">
                          {testimonial.content}
                        </TableCell>
                        <TableCell className="text-gray-300">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDateTime(testimonial.created_at)}
                          </div>
                        </TableCell>
                        <TableCell>
                          {testimonial.is_approved ? (
                            <Badge className="bg-[#15941f] text-white">Approved</Badge>
                          ) : (
                            <Badge className="bg-yellow-600 text-white">Pending</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewDetails(testimonial)}
                            className="border-gray-600 text-gray-800 hover:bg-gray-700"
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      {/* Testimonial Details Modal */}
      <Dialog open={isDetailsModalOpen} onOpenChange={setIsDetailsModalOpen}>
        <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              Testimonial Details
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Review the testimonial before approving or rejecting.
            </DialogDescription>
          </DialogHeader>

          {selectedTestimonial && (
            <div className="space-y-6 py-4">
              {/* Testimonial Information */}
              <div className="space-y-4">
                <div>
                  <Label className="text-gray-400 text-sm">Submitted By</Label>
                  <p className="text-white font-medium mt-1 flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {selectedTestimonial.name}
                  </p>
                </div>
                <div>
                  <Label className="text-gray-400 text-sm">Submitted Date</Label>
                  <p className="text-white mt-1 flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {formatDateTime(selectedTestimonial.created_at)}
                  </p>
                </div>
                <div>
                  <Label className="text-gray-400 text-sm">Status</Label>
                  <div className="mt-1">
                    {selectedTestimonial.is_approved ? (
                      <Badge variant="secondary" className="bg-[#15941f] text-white">
                        <Check className="h-3 w-3 mr-1" />
                        Approved
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="bg-yellow-600 text-white">
                        Pending
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              {/* Testimonial Content */}
              <div className="space-y-2">
                <Label className="text-gray-400 text-sm">Testimonial Content</Label>
                <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                  <p className="text-gray-100 leading-relaxed italic">{selectedTestimonial.content}</p>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            {selectedTestimonial && !selectedTestimonial.is_approved ? (
              <Button
                onClick={() => handleApprove(selectedTestimonial.id)}
                disabled={approving}
                className="primary-button"
              >
                {approving ? (
                  "Approving..."
                ) : (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Approve Testimonial
                  </>
                )}
              </Button>
            ) : (
              <Button
                variant="outline"
                className="border-gray-600 text-gray-300 bg-transparent"
                disabled
              >
                Already Approved
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
