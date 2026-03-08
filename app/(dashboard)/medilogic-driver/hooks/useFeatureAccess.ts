import useMedilogicDriver from './useMeDriver';

export default function useFeatureAccess() {
  const { profile } = useMedilogicDriver();

  if (!profile) {
    return {
      canUploadDocs: false,
      canViewAnalytics: false,
      canSeeOrgNames: false,
      badge: 'none',
      isPremium: false,
    };
  }

  return {
    canUploadDocs: profile.can_upload_docs,
    canViewAnalytics: profile.can_view_analytics,
    canSeeOrgNames: profile.can_see_org_names,
    badge: profile.badge_type,
    isPremium: profile.subscription_status === 'active',
  };
}
