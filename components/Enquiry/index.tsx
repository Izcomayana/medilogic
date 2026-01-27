'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { api } from '@/lib/api';

type Props = {
  open: boolean;
  onClose: () => void;
};

export function EnquiryModal({ open, onClose }: Props) {
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
      onClose();
      setForm({ name: '', email: '', message: '' });
    } catch (e) {
      toast.error('Failed to submit enquiry');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Get a Demo</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            placeholder="Your name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <Input
            placeholder="Email address"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <Textarea
            placeholder="Tell us about your needs"
            rows={4}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />

          <Button
            className="w-full bg-[#15941f]"
            disabled={loading}
            onClick={submit}
          >
            {loading ? 'Submitting...' : 'Submit enquiry'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
