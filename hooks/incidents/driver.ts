// useDriverIncidents.ts
import { useIncidentsBase } from './base';

export function useDriverIncidents() {
  const base = useIncidentsBase([]);

  const { formData, setFormData, reporting, reportIncident } = base;

  return {
    ...base,
    formData,
    setFormData,
    reporting,
    reportIncident,
  };
}
