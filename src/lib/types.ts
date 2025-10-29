export type UserRole = 'field' | 'station' | 'supervisor';

export type AuditionStatus = 'draft' | 'recording' | 'in-review' | 'validated';

export type InfractionType = 
  | 'vol-qualifie'
  | 'accident-circulation'
  | 'agression'
  | 'cambriolage'
  | 'trafic-stupefiants'
  | 'violence-conjugale'
  | 'autre';

export type Speaker = 'police' | 'witness';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  badge: string;
}

export interface TranscriptionBlock {
  id: string;
  speaker: Speaker;
  text: string;
  timestamp: number;
  tags?: string[];
  legalRefs?: string[];
}

export interface Audition {
  id: string;
  status: AuditionStatus;
  infractionType: InfractionType;
  date: string;
  location: string;
  officerId: string;
  officerName: string;
  witnessName?: string;
  transcription: TranscriptionBlock[];
  audioUrl?: string;
  duration?: number;
  pvGenerated: boolean;
  flaggedForReview: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LegalDocument {
  id: string;
  title: string;
  type: 'law' | 'standard' | 'doctrine' | 'islp' | 'note';
  category: InfractionType;
  content: string;
  reference: string;
}

export interface AuditLog {
  id: string;
  auditionId: string;
  userId: string;
  userName: string;
  action: string;
  timestamp: string;
  details?: string;
}
