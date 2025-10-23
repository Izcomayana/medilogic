'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useAuthorizedRequest } from '@/hooks/useRequest';
import { useProfile } from '@/hooks/useProfile';
import { api } from '@/lib/api';
import { Pod, PodFile } from '@/app/(dashboard)/driver/hooks/typePod';
import {
  formatDateStart,
  formatDateEnd,
  DateRangeLocal,
} from '@/app/(dashboard)/components/DateRange';

export function usePodAdmin() {
  const [loadingPods, setLoadingPods] = useState(false);
  const [podsList, setPodsList] = useState<any[]>([]);

  return {};
}
