import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MagnifyingGlass, FileText } from '@phosphor-icons/react';
import { STATUS_LABELS, STATUS_COLORS, INFRACTION_LABELS, formatDate } from '@/lib/constants';
import type { Audition, AuditionStatus, InfractionType } from '@/lib/types';

interface AuditionsListViewProps {
  auditions: Audition[];
  onOpenAudition: (id: string) => void;
}

export function AuditionsListView({ auditions, onOpenAudition }: AuditionsListViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<AuditionStatus | 'all'>('all');
  const [typeFilter, setTypeFilter] = useState<InfractionType | 'all'>('all');

  const filteredAuditions = auditions.filter((audition) => {
    const matchesSearch = 
      audition.officerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      audition.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (audition.witnessName?.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || audition.status === statusFilter;
    const matchesType = typeFilter === 'all' || audition.infractionType === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="p-8 space-y-6">
      <div>
        <h2 className="text-[32px] font-bold tracking-tight">Auditions</h2>
        <p className="text-muted-foreground mt-1">Gérez et consultez toutes vos auditions</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filtres et recherche</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher par agent, lieu, auditionné..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as AuditionStatus | 'all')}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                {Object.entries(STATUS_LABELS).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={(v) => setTypeFilter(v as InfractionType | 'all')}>
              <SelectTrigger className="w-full md:w-[220px]">
                <SelectValue placeholder="Type d'infraction" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les types</SelectItem>
                {Object.entries(INFRACTION_LABELS).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="text-sm text-muted-foreground">
          {filteredAuditions.length} audition(s) trouvée(s)
        </div>
        {filteredAuditions.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <FileText className="h-12 w-12 mx-auto mb-3 opacity-30 text-muted-foreground" />
              <p className="text-muted-foreground">Aucune audition ne correspond à vos critères</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {filteredAuditions.map((audition) => (
              <Card key={audition.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => onOpenAudition(audition.id)}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <Badge className={STATUS_COLORS[audition.status]}>
                          {STATUS_LABELS[audition.status]}
                        </Badge>
                        <h3 className="text-lg font-semibold">
                          {INFRACTION_LABELS[audition.infractionType]}
                        </h3>
                        {audition.flaggedForReview && (
                          <Badge variant="destructive">À réviser</Badge>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm text-muted-foreground">
                        <div>
                          <span className="font-medium">Agent:</span> {audition.officerName}
                        </div>
                        <div>
                          <span className="font-medium">Lieu:</span> {audition.location}
                        </div>
                        {audition.witnessName && (
                          <div>
                            <span className="font-medium">Auditionné:</span> {audition.witnessName}
                          </div>
                        )}
                      </div>
                      <div className="mt-3 flex items-center gap-4 text-xs font-mono text-muted-foreground">
                        <span>Créé: {formatDate(audition.createdAt)}</span>
                        <span>Modifié: {formatDate(audition.updatedAt)}</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={(e) => {
                      e.stopPropagation();
                      onOpenAudition(audition.id);
                    }}>
                      Ouvrir
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
