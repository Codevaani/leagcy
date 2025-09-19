'use client'

import TiffinDetail from '@/pages/TiffinDetail'

export const dynamic = 'force-dynamic'

interface TiffinDetailPageProps {
  params: {
    id: string
  }
}

export default function TiffinDetailPage({ params }: TiffinDetailPageProps) {
  return <TiffinDetail />
}
