import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

export function SettingsView() {
  return (
    <div className="p-8 space-y-6 max-w-4xl">
      <div>
        <h2 className="text-[32px] font-bold tracking-tight">Paramètres</h2>
        <p className="text-muted-foreground mt-1">Configurez votre environnement de travail</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Préférences utilisateur</CardTitle>
          <CardDescription>Personnalisez votre expérience</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="notifications">Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Recevoir des notifications pour les nouvelles auditions
              </p>
            </div>
            <Switch id="notifications" defaultChecked />
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <Label htmlFor="language">Langue</Label>
            <Select defaultValue="fr">
              <SelectTrigger id="language">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="en">English</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Audio et enregistrement</CardTitle>
          <CardDescription>Configuration des périphériques audio</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="input-device">Périphérique d'entrée</Label>
            <Select defaultValue="default">
              <SelectTrigger id="input-device">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Microphone par défaut</SelectItem>
                <SelectItem value="usb">Microphone USB</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="noise-detection">Détection de bruit</Label>
              <p className="text-sm text-muted-foreground">
                Alerter en cas de bruit de fond excessif
              </p>
            </div>
            <Switch id="noise-detection" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="auto-save">Sauvegarde automatique</Label>
              <p className="text-sm text-muted-foreground">
                Sauvegarder toutes les 30 secondes
              </p>
            </div>
            <Switch id="auto-save" defaultChecked />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Sécurité et confidentialité</CardTitle>
          <CardDescription>Protection des données sensibles</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="retention">Politique de rétention</Label>
            <Select defaultValue="90">
              <SelectTrigger id="retention">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30">30 jours</SelectItem>
                <SelectItem value="90">90 jours</SelectItem>
                <SelectItem value="180">180 jours</SelectItem>
                <SelectItem value="365">1 an</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="encryption">Chiffrement des données</Label>
              <p className="text-sm text-muted-foreground">
                Chiffrer automatiquement les enregistrements
              </p>
            </div>
            <Switch id="encryption" defaultChecked />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
