import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Microphone, CheckCircle, Clock } from '@phosphor-icons/react';
import { STATUS_LABELS, STATUS_COLORS, INFRACTION_LABELS, formatDate } from '@/lib/constants';
import type { Audition } from '@/lib/types';

interface DashboardViewProps {
  auditions: Audition[];
  onOpenAudition: (id: string) => void;
  onNewAudition: () => void;
}

export function DashboardView({ auditions, onOpenAudition, onNewAudition }: DashboardViewProps) {
  const stats = {
    total: auditions.length,
    draft: auditions.filter(a => a.status === 'draft').length,
    inReview: auditions.filter(a => a.status === 'in-review').length,
    validated: auditions.filter(a => a.status === 'validated').length
  };

  const recentAuditions = [...auditions]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5);

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[32px] font-bold tracking-tight">Tableau de bord</h2>
          <p className="text-muted-foreground mt-1">Vue d'ensemble de vos auditions</p>
        </div>
        <Button onClick={onNewAudition} size="lg" className="gap-2">
          <Microphone weight="fill" className="h-5 w-5" />
          Nouvelle audition
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total</CardDescription>
            <CardTitle className="text-3xl">{stats.total}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-muted-foreground">
              <FileText className="h-4 w-4 mr-2" />
              <span className="text-sm">Auditions</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Brouillons</CardDescription>
            <CardTitle className="text-3xl">{stats.draft}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-muted-foreground">
              <Clock className="h-4 w-4 mr-2" />
              <span className="text-sm">En attente</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>En révision</CardDescription>
            <CardTitle className="text-3xl">{stats.inReview}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-accent">
              <Clock className="h-4 w-4 mr-2" />
              <span className="text-sm">À traiter</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Validées</CardDescription>
            <CardTitle className="text-3xl">{stats.validated}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-green-600">
              <CheckCircle className="h-4 w-4 mr-2" />
              <span className="text-sm">Terminées</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Auditions récentes</CardTitle>
          <CardDescription>Les 5 dernières auditions modifiées</CardDescription>
        </CardHeader>
        <CardContent>
          {recentAuditions.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-3 opacity-30" />
              <p>Aucune audition pour le moment</p>
              <Button onClick={onNewAudition} variant="link" className="mt-2">
                Créer votre première audition
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {recentAuditions.map((audition) => (
                <div
                  key={audition.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => onOpenAudition(audition.id)}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge className={STATUS_COLORS[audition.status]}>
                        {STATUS_LABELS[audition.status]}
                      </Badge>
                      <span className="text-sm font-medium">
                        {INFRACTION_LABELS[audition.infractionType]}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>Agent: {audition.officerName}</p>
                      <p>Lieu: {audition.location}</p>
                      <p className="font-mono text-xs">
                        Modifié: {formatDate(audition.updatedAt)}
                      </p>
                    </div>
                  </div>
                  {audition.flaggedForReview && (
                    <Badge variant="destructive" className="ml-4">
                      À réviser
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
