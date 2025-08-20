'use client';

import { Hero } from '@/components/Hero';
import { Lock, Shield, CheckCircle, FileText } from 'lucide-react';
import HealthcareCompliance from './components/HealthcareCompliance';
import DataProtection from './components/DataProtection';
import AuditTrails from './components/AuditTrials';
import DataExport from './components/DataExport';
import InfrastructureSecurity from './components/InfrasctructureSecurity';
import StayingAhead from './components/StayingAhead';
import { CTA } from '@/components/CTA';

export const Compliance = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white overflow-x-hidden">
      <Hero
        badgeIcon={<Lock className="w-4 h-4" />}
        badgeText="Compliance & Security"
        heading={"Security Isn't"}
        heading2={'Optional'}
        heading3={"— It's Mission-Critical"}
        subText={
          "In healthcare logistics, security isn't optional — it's mission-critical. That's why Medilogic is built with privacy-first architecture, audit-ready reporting, and full alignment with GDPR, ISO 27001, and the NHS DSP Toolkit."
        }
        descBadgeIcon={<Shield className="w-4 h-4 mr-2" />}
        descBadgeText={'Privacy-First Architecture'}
        descBadgeIcon2={<CheckCircle className="w-4 h-4 mr-2" />}
        descBadgeText2={'Audit-Ready Reporting'}
        descSubText="Built from the ground up to meet the strictest standards in the UK healthcare system."
      />
      <HealthcareCompliance />
      <DataProtection />
      <AuditTrails />
      <DataExport />
      <InfrastructureSecurity />
      <StayingAhead />
      <CTA
        badgeText={'Want to See Our Compliance Docs?'}
        badgeIcon={<FileText className="w-4 h-4" />}
        heading={'Contact Our Compliance Team'}
      />
    </div>
  );
};
