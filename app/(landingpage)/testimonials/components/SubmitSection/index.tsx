'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { MessageSquare, ArrowRight, Loader2 } from 'lucide-react';
import { useInView } from '@/app/(landingpage)/hooks/useInView';
import { fadeInUp } from '@/app/(landingpage)/hooks/annimation';
import { toast } from 'sonner';
import { api } from '@/lib/api';
import { useAuthorizedRequest } from '@/hooks/useRequest';

type TestimonialPayload = {
  name: string;
  content: string;
};

export default function SubmitTestimonialSection() {
  const [submitRef, submitInView] = useInView(0.1);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const authorizedRequest = useAuthorizedRequest();

  const [form, setForm] = useState<TestimonialPayload>({
    name: '',
    content: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.content.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);

      await authorizedRequest(async (token) => {
        await api.post('/testimonials/', {
          name: form.name.trim(),
          content: form.content.trim(),
        });

        toast.success('Thank you! Your testimonial was submitted 🎉');
        setForm({ name: '', content: '' });
        setOpen(false);
      }, 'filed to submit testimony')
    } catch (err: any) {
      toast.error(
        err?.response?.data?.detail?.[0]?.msg ??
        'Failed to submit testimonial'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      ref={submitRef}
      className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white"
    >
      <div className="container mx-auto max-w-4xl text-center">
        <div
          className={`${fadeInUp} ${submitInView
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-0 translate-y-12 scale-95'
            }`}
        >
          <div className="inline-flex items-center gap-2 bg-[#15941f]/10 text-[#15941f] px-4 py-2 rounded-full text-sm font-medium mb-6">
            <MessageSquare className="w-4 h-4" />
            Share Your Experience
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Want to Share Your Experience?
          </h2>

          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Have a Medilogic success story? We’d love to hear from you.
          </p>

          <Button
            size="lg"
            onClick={() => setOpen(true)}
            className="bg-[#15941f] hover:bg-[#15941f]/90 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:scale-105 transition"
          >
            Submit Your Testimonial
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>

        {/* Modal */}
        {open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
            <div className="bg-white rounded-2xl p-8 w-full max-w-lg shadow-xl">
              <h3 className="text-2xl font-bold mb-6 text-gray-900">
                Submit Testimonial
              </h3>

              <div className="space-y-4">
                <Input
                  name="name"
                  placeholder="Your name"
                  value={form.name}
                  onChange={handleChange}
                />

                <Textarea
                  name="content"
                  placeholder="Share your experience..."
                  rows={5}
                  value={form.content}
                  onChange={handleChange}
                />
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <Button
                  variant="ghost"
                  onClick={() => setOpen(false)}
                  disabled={loading}
                >
                  Cancel
                </Button>

                <Button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="bg-[#15941f] text-white"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    'Submit'
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}




// 'use client';

// import { Button } from '@/components/ui/button';
// import { MessageSquare, ArrowRight } from 'lucide-react';
// import { useInView } from '@/app/(landingpage)/hooks/useInView';
// import { fadeInUp } from '@/app/(landingpage)/hooks/annimation';

// export default function SubmitTestimonialSection() {
//   const [submitRef, submitInView] = useInView(0.1);

//   return (
//     <section
//       ref={submitRef}
//       className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white"
//     >
//       <div className="container mx-auto max-w-4xl text-center">
//         <div
//           className={`${fadeInUp} ${submitInView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'}`}
//         >
//           <div className="inline-flex items-center gap-2 bg-[#15941f]/10 text-[#15941f] px-4 py-2 rounded-full text-sm font-medium mb-6 hover:scale-105 transition-transform duration-300">
//             <MessageSquare className="w-4 h-4" />
//             Share Your Experience
//           </div>
//           <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
//             Want to Share Your Experience?
//           </h2>
//           <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
//             Have a Medilogic success story? We&apos;d love to hear from you.
//           </p>
//           <div
//             className={`${fadeInUp} ${submitInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
//             style={{ transitionDelay: '300ms' }}
//           >
//             <Button
//               size="lg"
//               className="bg-[#15941f] hover:bg-[#15941f]/90 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group hover:scale-105"
//             >
//               Submit Your Testimonial
//               <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
//             </Button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
