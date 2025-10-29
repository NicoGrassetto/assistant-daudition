import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Microphone, Pause, Stop, User, UserCircle } from '@phosphor-icons/react';
import { formatTimestamp } from '@/lib/constants';
import type { TranscriptionBlock, Speaker } from '@/lib/types';

interface RecordingViewProps {
  auditionId: string;
  onStop: (transcription: TranscriptionBlock[]) => void;
}

const SIMULATED_TRANSCRIPTION_SAMPLES: Array<{ speaker: Speaker; text: string }> = [
  { speaker: 'police', text: "Bonjour, nous allons procéder à votre audition. Pouvez-vous décliner votre identité complète ?" },
  { speaker: 'witness', text: "Oui, je m'appelle Martin Dubois, né le 15 mars 1985 à Lyon." },
  { speaker: 'police', text: "Merci. Pouvez-vous nous raconter ce que vous avez vu hier soir vers 20h30 ?" },
  { speaker: 'witness', text: "J'étais en train de rentrer chez moi quand j'ai vu deux individus sortir précipitamment du magasin." },
  { speaker: 'police', text: "Pouvez-vous décrire ces individus ?" },
  { speaker: 'witness', text: "L'un portait une veste noire et l'autre un sweat à capuche gris. Ils couraient vers une voiture blanche." },
];

export function RecordingView({ auditionId, onStop }: RecordingViewProps) {
  const [isRecording, setIsRecording] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [duration, setDuration] = useState(0);
  const [transcription, setTranscription] = useState<TranscriptionBlock[]>([]);

  useEffect(() => {
    if (!isRecording || isPaused) return;

    const interval = setInterval(() => {
      setDuration((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRecording, isPaused]);

  useEffect(() => {
    if (!isRecording || isPaused) return;

    const transcriptInterval = setInterval(() => {
      const sampleIndex = Math.floor(transcription.length % SIMULATED_TRANSCRIPTION_SAMPLES.length);
      const sample = SIMULATED_TRANSCRIPTION_SAMPLES[sampleIndex];
      
      const newBlock: TranscriptionBlock = {
        id: `block-${Date.now()}-${Math.random()}`,
        speaker: sample.speaker,
        text: sample.text,
        timestamp: duration,
      };

      setTranscription((prev) => [...prev, newBlock]);
    }, 8000);

    return () => clearInterval(transcriptInterval);
  }, [isRecording, isPaused, duration, transcription.length]);

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  const handleStop = () => {
    setIsRecording(false);
    onStop(transcription);
  };

  return (
    <div className="p-8 space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[32px] font-bold tracking-tight">Enregistrement en cours</h2>
          <p className="text-muted-foreground mt-1">ID: {auditionId}</p>
        </div>
        <Badge variant={isPaused ? "outline" : "default"} className="bg-accent text-accent-foreground text-lg px-4 py-2 animate-pulse">
          {isPaused ? "EN PAUSE" : "REC"} • {formatTimestamp(duration)}
        </Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Contrôles d'enregistrement</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-4 justify-center">
          <Button 
            onClick={handlePause} 
            size="lg" 
            variant={isPaused ? "default" : "outline"}
            className="gap-2"
          >
            <Pause weight="fill" className="h-5 w-5" />
            {isPaused ? "Reprendre" : "Pause"}
          </Button>
          <Button 
            onClick={handleStop} 
            size="lg" 
            variant="destructive"
            className="gap-2"
          >
            <Stop weight="fill" className="h-5 w-5" />
            Arrêter
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Transcription en temps réel</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 max-h-[500px] overflow-y-auto">
            {transcription.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Microphone className="h-12 w-12 mx-auto mb-3 opacity-30" />
                <p>En attente de parole...</p>
              </div>
            ) : (
              transcription.map((block) => (
                <div 
                  key={block.id} 
                  className={`flex gap-3 p-4 rounded-lg ${
                    block.speaker === 'police' 
                      ? 'bg-blue-50 border-l-4 border-primary' 
                      : 'bg-muted border-l-4 border-muted-foreground'
                  }`}
                >
                  <div className="flex-shrink-0">
                    {block.speaker === 'police' ? (
                      <UserCircle className="h-6 w-6 text-primary" weight="fill" />
                    ) : (
                      <User className="h-6 w-6 text-muted-foreground" weight="fill" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium uppercase">
                        {block.speaker === 'police' ? 'Agent' : 'Auditionné'}
                      </span>
                      <span className="text-xs font-mono text-muted-foreground">
                        {formatTimestamp(block.timestamp)}
                      </span>
                    </div>
                    <p className="text-[15px] leading-relaxed">{block.text}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
