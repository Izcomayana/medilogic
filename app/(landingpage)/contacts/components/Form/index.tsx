'use client';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { MessageSquareText, MessageCircle } from 'lucide-react';
import { useInView } from '@/app/(landingpage)/hooks/useInView';
import { fadeInUp } from '@/app/(landingpage)/hooks/annimation';
import { useState } from 'react';
import { toast } from 'sonner';
import { api } from '@/lib/api';

export default function ContactForm() {
  const [formRef, formInView] = useInView(0.1);

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  const submit = async () => {
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill all fields');
      return;
    }

    try {
      setLoading(true);
      await api.post('/enquiries/', form);
      toast.success('Enquiry submitted. We’ll contact you shortly.');
      setForm({ name: '', email: '', message: '' });
    } catch (e) {
      toast.error('Failed to submit enquiry');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      ref={formRef}
      className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white"
    >
      <div className="container mx-auto max-w-3xl">
        <div
          className={`text-center mb-12 ${fadeInUp} ${formInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
        >
          <div className="inline-flex items-center gap-2 bg-[#15941f]/10 text-[#15941f] px-4 py-2 rounded-full text-sm font-medium mb-6 hover:scale-105 transition-transform duration-300">
            <MessageSquareText className="w-4 h-4" />
            Get in Touch
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Quick Contact Form
          </h2>
        </div>

        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-8 rounded-xl shadow-lg ${fadeInUp} ${formInView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'}`}
          style={{ transitionDelay: '200ms' }}
        >
          <div className="md:col-span-1">
            <Label htmlFor="fullName" className="sr-only">
              Full Name
            </Label>
            <Input
              id="fullName"
              type="text"
              placeholder="Full Name"
              required
              className="h-12"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div className="md:col-span-1">
            <Label htmlFor="email" className="sr-only">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Email Address"
              required
              className="h-12"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="message" className="sr-only">
              Your Message
            </Label>
            <Textarea
              id="message"
              placeholder="Your Message"
              rows={5}
              required
              className="min-h-[120px]"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
          </div>
          <div className="md:col-span-2 text-center">
            <Button
              onClick={submit}
              disabled={loading}
              type="submit"
              size="lg"
              className="bg-[#15941f] hover:bg-[#15941f]/90 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group hover:scale-105"
            >
              {loading ? 'Sending...' : 'Send Message'}
            </Button>
          </div>
        </div>
      </div>
      {/* Optional Live Chat Widget Placeholder */}
      <div className="fixed bottom-4 right-4 z-50">
        <button className="bg-[#15941f] text-white rounded-full p-4 shadow-lg hover:scale-110 transition-transform">
          <MessageCircle className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
}
