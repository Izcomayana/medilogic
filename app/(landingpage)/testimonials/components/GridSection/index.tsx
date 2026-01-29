'use client';

import { useEffect, useState } from 'react';
import { fadeInUp, staggerDelay } from '@/app/(landingpage)/hooks/annimation';
import { useInView } from '@/app/(landingpage)/hooks/useInView';
import { Card, CardContent } from '@/components/ui/card';
import { Quote, User } from 'lucide-react';
import { api } from '@/lib/api';
import { toast } from 'sonner';

type Testimonial = {
  id: string;
  short_id: string;
  name: string;
  content: string;
  is_approved: boolean;
  created_at: string;
};

const gradients = [
  'from-[#15941f]/5 to-green-50',
  'from-blue-50 to-indigo-50',
  'from-emerald-50 to-teal-50',
  'from-orange-50 to-red-50',
  'from-purple-50 to-pink-50',
];

export default function TestimonialsGridSection() {
  const [gridRef, gridInView] = useInView(0.1);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await api.get<Testimonial[]>('/testimonials/public');

        setTestimonials(
          res.data
            .filter((t) => t.is_approved)
            .sort(
              (a, b) =>
                new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime()
            )
        );
      } catch {
        toast.error('Failed to load testimonials');
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (loading) {
    return (
      <section className="py-20 text-center text-gray-500">
        Loading testimonials…
      </section>
    );
  }

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section ref={gridRef} className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.id}
              className={`group hover:shadow-2xl transition-all duration-700 border-0 shadow-lg overflow-hidden hover:-translate-y-2`}
              style={staggerDelay(index)}
            >
              <CardContent
                className={`p-8 bg-gradient-to-br ${
                  gradients[index % gradients.length]
                } relative`}
              >
                <Quote className="absolute top-4 right-4 w-14 h-14 opacity-10" />

                <blockquote className="text-gray-700 leading-relaxed mb-6 italic">
                  “{testimonial.content}”
                </blockquote>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/70 flex items-center justify-center">
                    <User className="w-5 h-5 text-gray-700" />
                  </div>
                  <div className="font-semibold text-gray-900">
                    {testimonial.name}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
