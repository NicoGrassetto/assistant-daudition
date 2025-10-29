import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, FileText, Waveform, Tag, Download, Flag } from '@phosphor-icons/react';
import { STATUS_LABELS, STATUS_COLORS, INFRACTION_LABELS, formatDate, formatTimestamp } from '@/lib/constants';
import type { Audition, TranscriptionBlock } from '@/lib/types';
import { toast } from 'sonner';

interface AuditionEditorViewProps {
  audition: Audition;
  onBack: () => void;
  onUpdate: (audition: Audition) => void;
}

export function AuditionEditorView({ audition, onBack, onUpdate }: AuditionEditorViewProps) {
  const [transcription, setTranscription] = useState(audition.transcription);
  const [activeTab, setActiveTab] = useState('transcription');

  const handleBlockEdit = (blockId: string, newText: string) => {
    setTranscription((prev) =>
      prev.map((block) =>
        block.id === blockId ? { ...block, text: newText } : block
      )
    );
  };

  const handleSave = () => {
    const updatedAudition = {
      ...audition,
      transcription,
      updatedAt: new Date().toISOString(),
    };
    onUpdate(updatedAudition);
    toast.success('Audition sauvegardée');
  };

  const handleGeneratePV = () => {
    const updatedAudition = {
      ...audition,
      transcription,
      pvGenerated: true,
      status: 'in-review' as const,
      updatedAt: new Date().toISOString(),
    };
    onUpdate(updatedAudition);
    toast.success('PV généré avec succès');
  };

  const handleToggleFlag = () => {
    const updatedAudition = {
      ...audition,
      flaggedForReview: !audition.flaggedForReview,
      updatedAt: new Date().toISOString(),
    };
    onUpdate(updatedAudition);
    toast.success(audition.flaggedForReview ? 'Signalement retiré' : 'Audition signalée pour révision');
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h2 className="text-[32px] font-bold tracking-tight">
              {INFRACTION_LABELS[audition.infractionType]}
            </h2>
            <p className="text-muted-foreground mt-1">ID: {audition.id}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Badge className={STATUS_COLORS[audition.status]}>
            {STATUS_LABELS[audition.status]}
          </Badge>
          {audition.pvGenerated && (
            <Badge variant="outline" className="bg-green-50 text-green-700">
              PV généré
            </Badge>
          )}
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="font-medium text-muted-foreground">Agent:</span>
              <p className="mt-1">{audition.officerName}</p>
            </div>
            <div>
              <span className="font-medium text-muted-foreground">Lieu:</span>
              <p className="mt-1">{audition.location}</p>
            </div>
            <div>
              <span className="font-medium text-muted-foreground">Date:</span>
              <p className="mt-1 font-mono text-xs">{formatDate(audition.createdAt)}</p>
            </div>
            {audition.witnessName && (
              <div>
                <span className="font-medium text-muted-foreground">Auditionné:</span>
                <p className="mt-1">{audition.witnessName}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button onClick={handleSave} className="gap-2">
          <FileText weight="fill" className="h-4 w-4" />
          Sauvegarder
        </Button>
        <Button onClick={handleGeneratePV} variant="secondary" className="gap-2">
          <Download weight="fill" className="h-4 w-4" />
          Générer le PV
        </Button>
        <Button 
          onClick={handleToggleFlag} 
          variant={audition.flaggedForReview ? "destructive" : "outline"}
          className="gap-2"
        >
          <Flag weight="fill" className="h-4 w-4" />
          {audition.flaggedForReview ? 'Retirer le signalement' : 'Signaler pour révision'}
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="transcription" className="gap-2">
            <FileText className="h-4 w-4" />
            Transcription
          </TabsTrigger>
          <TabsTrigger value="audio" className="gap-2">
            <Waveform className="h-4 w-4" />
            Audio
          </TabsTrigger>
          <TabsTrigger value="tags" className="gap-2">
            <Tag className="h-4 w-4" />
            Tags & Annotations
          </TabsTrigger>
        </TabsList>

        <TabsContent value="transcription" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Transcription éditable</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transcription.map((block) => (
                  <div
                    key={block.id}
                    className={`p-4 rounded-lg border ${
                      block.speaker === 'police'
                        ? 'bg-blue-50 border-primary'
                        : 'bg-muted border-muted-foreground'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant={block.speaker === 'police' ? 'default' : 'secondary'} className="text-xs">
                        {block.speaker === 'police' ? 'Agent' : 'Auditionné'}
                      </Badge>
                      <span className="text-xs font-mono text-muted-foreground">
                        {formatTimestamp(block.timestamp)}
                      </span>
                    </div>
                    <Textarea
                      value={block.text}
                      onChange={(e) => handleBlockEdit(block.id, e.target.value)}
                      className="min-h-[80px] bg-white"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audio" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Lecteur audio</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <Waveform className="h-16 w-16 mx-auto mb-4 opacity-30" />
                <p>Lecteur audio (simulation)</p>
                <p className="text-sm mt-2">Durée: {audition.duration ? Math.floor(audition.duration / 60) : 0} minutes</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tags" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Tags et annotations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <Tag className="h-16 w-16 mx-auto mb-4 opacity-30" />
                <p>Système de tagging (à venir)</p>
                <p className="text-sm mt-2">Permettra de marquer les moments clés de l'audition</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
