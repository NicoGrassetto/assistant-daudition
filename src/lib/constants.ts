import type { InfractionType, AuditionStatus, UserRole } from './types';

export const INFRACTION_LABELS: Record<InfractionType, string> = {
  'vol-qualifie': 'Vol qualifié',
  'accident-circulation': 'Accident de circulation',
  'agression': 'Agression',
  'cambriolage': 'Cambriolage',
  'trafic-stupefiants': 'Trafic de stupéfiants',
  'violence-conjugale': 'Violence conjugale',
  'autre': 'Autre'
};

export const STATUS_LABELS: Record<AuditionStatus, string> = {
  'draft': 'Brouillon',
  'recording': 'En cours',
  'in-review': 'En révision',
  'validated': 'Validé'
};

export const ROLE_LABELS: Record<UserRole, string> = {
  'field': 'Agent terrain',
  'station': 'Agent bureau',
  'supervisor': 'Superviseur'
};

export const STATUS_COLORS: Record<AuditionStatus, string> = {
  'draft': 'bg-muted text-muted-foreground',
  'recording': 'bg-accent text-accent-foreground',
  'in-review': 'bg-blue-100 text-blue-800',
  'validated': 'bg-green-100 text-green-800'
};

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}

export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  
  if (hours > 0) {
    return `${hours}h ${minutes.toString().padStart(2, '0')}m ${secs.toString().padStart(2, '0')}s`;
  }
  return `${minutes}m ${secs.toString().padStart(2, '0')}s`;
}

export function formatTimestamp(timestamp: number): string {
  const minutes = Math.floor(timestamp / 60);
  const seconds = Math.floor(timestamp % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}
