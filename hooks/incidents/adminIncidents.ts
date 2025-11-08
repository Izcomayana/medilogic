/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { useIncidentsBase } from './base';

export function useAdminIncidents() {
  const base = useIncidentsBase([]);

  // Modal form state
  const [modalState, setModalState] = useState({
    newStatus: '',
    internalNote: '',
  });

  return {
    ...base,
    modalState,
    setModalState,
  };
}
