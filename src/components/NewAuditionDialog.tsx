import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { INFRACTION_LABELS } from '@/lib/constants';
import type { InfractionType } from '@/lib/types';

interface NewAuditionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: {
    infractionType: InfractionType;
    location: string;
    witnessName?: string;
  }) => void;
}

export function NewAuditionDialog({ open, onOpenChange, onSubmit }: NewAuditionDialogProps) {
  const [infractionType, setInfractionType] = useState<InfractionType>('autre');
  const [location, setLocation] = useState('');
  const [witnessName, setWitnessName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (location.trim()) {
      onSubmit({
        infractionType,
        location: location.trim(),
        witnessName: witnessName.trim() || undefined
      });
      setLocation('');
      setWitnessName('');
      setInfractionType('autre');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Nouvelle audition</DialogTitle>
            <DialogDescription>
              Renseignez les informations de base pour démarrer l'enregistrement
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="infraction-type">Type d'infraction *</Label>
              <Select value={infractionType} onValueChange={(v) => setInfractionType(v as InfractionType)}>
                <SelectTrigger id="infraction-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(INFRACTION_LABELS).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Lieu de l'audition *</Label>
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="ex: Commissariat Central, Paris 15e"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="witness-name">Nom de l'auditionné (optionnel)</Label>
              <Input
                id="witness-name"
                value={witnessName}
                onChange={(e) => setWitnessName(e.target.value)}
                placeholder="ex: Jean DUPONT"
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button type="submit">Démarrer l'enregistrement</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
