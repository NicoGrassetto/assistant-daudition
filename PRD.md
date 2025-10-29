# Planning Guide

Assistant numérique d'audition et de rédaction de PV - une plateforme complète pour les forces de l'ordre françaises permettant l'enregistrement audio avec transcription IA, la séparation des locuteurs, et la génération automatisée de procès-verbaux conformes aux normes légales.

**Experience Qualities**:
1. **Professionnelle** - L'interface doit inspirer confiance et crédibilité, adaptée à un contexte judiciaire sensible où chaque détail compte
2. **Efficace** - Réduire drastiquement le temps de rédaction des PV tout en maintenant la rigueur procédurale
3. **Intuitive** - Permettre aux agents de terrain et de bureau d'utiliser l'outil sans formation extensive, même en situation stressante

**Complexity Level**: Complex Application (advanced functionality, accounts)
- Cette application nécessite une gestion avancée des rôles utilisateurs (agent terrain, agent bureau, superviseur), une intégration avec des systèmes externes (ISLP), des fonctionnalités de traitement audio IA sophistiquées, et un système de gestion documentaire complet avec versioning.

## Essential Features

### 1. Enregistrement et transcription d'audition
- **Functionality**: Capture audio en temps réel avec transcription automatique et séparation des locuteurs (Auditionné/Policier)
- **Purpose**: Capturer fidèlement les déclarations tout en libérant l'agent de la prise de notes manuelle
- **Trigger**: Bouton "Démarrer l'enregistrement" depuis le dashboard ou création d'une nouvelle audition
- **Progression**: Clic "Nouvelle audition" → Saisie métadonnées (date, lieu, infraction) → Démarrage enregistrement → Transcription en temps réel avec séparation locuteurs → Pause/Arrêt → Sauvegarde automatique
- **Success criteria**: Transcription précise à 95%+, séparation locuteurs correcte à 90%+, latence < 2 secondes

### 2. Édition et annotation de transcription
- **Functionality**: Éditeur de texte enrichi avec timestamps, tagging de moments clés, et liaison aux articles de loi
- **Purpose**: Permettre la correction et l'enrichissement contextuel de la transcription brute
- **Trigger**: Après arrêt de l'enregistrement ou ouverture d'une audition existante
- **Progression**: Sélection du texte → Correction manuelle ou ajout de tag → Choix du type (aveu, contradiction, élément matériel) → Association article de loi si pertinent → Sauvegarde
- **Success criteria**: Édition fluide sans lag, tags visibles et filtrables, timestamps synchronisés avec l'audio

### 3. Génération automatique de PV
- **Functionality**: Création de procès-verbal formaté selon les modèles réglementaires avec auto-complétion depuis la transcription
- **Purpose**: Transformer une audition en document juridique valide en quelques clics
- **Trigger**: Bouton "Générer le PV" depuis l'interface d'édition
- **Progression**: Sélection du type d'infraction → Choix du template → Vérification des métadonnées → Auto-remplissage depuis transcription → Révision manuelle → Export PDF/DOCX → Transmission sécurisée
- **Success criteria**: PV conforme aux normes, export en < 5 secondes, signature numérique intégrée

### 4. Bibliothèque documentaire intelligente
- **Functionality**: Repository searchable de lois, standards internes, doctrine, et contenus ISLP avec filtres avancés
- **Purpose**: Accès rapide aux références juridiques pendant l'audition ou la rédaction
- **Trigger**: Recherche depuis la barre globale ou bouton "Consulter la doc" dans l'éditeur
- **Progression**: Saisie terme de recherche → Filtres (type doc, catégorie infraction) → Sélection résultat → Prévisualisation → Annotation ou lien vers PV actif
- **Success criteria**: Résultats pertinents en < 1 seconde, prévisualisation sans chargement de page

### 5. Dashboard superviseur avec audit trail
- **Functionality**: Vue d'ensemble des auditions en cours, PV en attente de validation, statistiques, et historique complet des actions
- **Purpose**: Supervision qualité, formation des agents, traçabilité juridique
- **Trigger**: Connexion avec rôle superviseur
- **Progression**: Vue synthétique → Drill-down sur audition spécifique → Consultation historique versions → Commentaires/validation → Notification à l'agent
- **Success criteria**: Visibilité complète des activités, audit trail immuable, notifications temps réel

## Edge Case Handling

- **Perte de connexion**: Mode hors-ligne automatique avec synchronisation différée des enregistrements et transcriptions dès retour en ligne
- **Échec séparation locuteurs**: Interface manuelle permettant de réassigner les blocs de texte au bon locuteur avec un code couleur
- **Bruit de fond excessif**: Alerte visuelle en temps réel + suggestion de repositionnement micro + filtrage audio post-traitement
- **Audition interrompue**: Sauvegarde automatique toutes les 30 secondes + reprise exacte au dernier point avec marqueur temporel
- **Contradiction avec ISLP**: Système de détection de divergences et workflow de résolution avec champs de réconciliation
- **Données sensibles**: Masquage automatique des informations personnelles dans les exports selon le destinataire
- **Formats audio incompatibles**: Conversion automatique vers format standardisé avec préservation de la qualité originale

## Design Direction

L'interface doit évoquer le sérieux et la fiabilité d'un outil professionnel gouvernemental tout en offrant une expérience moderne et épurée inspirée des systèmes bancaires sécurisés. Le design sera sobre et efficace, privilégiant la clarté de l'information et la rapidité d'exécution sur l'ornementation. L'ambiance générale doit être rassurante et structurée, avec une hiérarchie visuelle forte qui guide naturellement l'utilisateur à travers des workflows complexes. Interface riche avec de multiples panneaux et informations densifiées mais organisées, adaptée à des utilisateurs professionnels qui passent de longues heures sur l'outil.

## Color Selection

Palette personnalisée évoquant l'autorité, la confiance et le professionnalisme administratif français avec une touche de modernité numérique.

- **Primary Color**: Bleu République (#1F3A93 → oklch(0.35 0.12 265)) - Couleur institutionnelle évoquant l'autorité de l'État et la confiance, utilisée pour les actions principales et la navigation
- **Secondary Colors**: 
  - Gris Ardoise foncé (#2C3E50 → oklch(0.32 0.02 240)) pour les éléments secondaires et panels
  - Gris Acier clair (#95A5A6 → oklch(0.68 0.01 240)) pour les éléments désactivés
- **Accent Color**: Orange Sécurité (#E67E22 → oklch(0.68 0.15 50)) - Utilisé pour les alertes importantes, boutons d'enregistrement actif, et notifications critiques
- **Foreground/Background Pairings**:
  - Background (Gris très clair #F8F9FA → oklch(0.98 0 0)): Texte principal Anthracite (#212529 → oklch(0.20 0 0)) - Ratio 15.8:1 ✓
  - Card (Blanc pur #FFFFFF → oklch(1 0 0)): Texte Anthracite (#212529) - Ratio 16.5:1 ✓
  - Primary (Bleu République #1F3A93): Texte Blanc (#FFFFFF) - Ratio 8.2:1 ✓
  - Secondary (Gris Ardoise #2C3E50): Texte Blanc (#FFFFFF) - Ratio 9.1:1 ✓
  - Accent (Orange Sécurité #E67E22): Texte Noir (#000000) - Ratio 4.8:1 ✓
  - Muted (Gris Fumée #ECF0F1 → oklch(0.95 0.005 240)): Texte Gris Foncé (#5D6D7E → oklch(0.48 0.01 240)) - Ratio 5.2:1 ✓

## Font Selection

Typographie institutionnelle française évoquant la clarté administrative et la légibilité sur écran prolongée, avec une hiérarchie claire inspirée des documents officiels.

- **Primary Font**: Inter (Google Fonts) - Police sans-serif moderne et hautement lisible, optimisée pour les interfaces administratives
- **Monospace Font**: JetBrains Mono pour les timestamps, identifiants ISLP, et codes

- **Typographic Hierarchy**:
  - H1 (Titre principal page): Inter Bold/32px/tight (-0.02em)/line-height 1.2
  - H2 (Sections majeures): Inter SemiBold/24px/normal/line-height 1.3
  - H3 (Sous-sections): Inter Medium/18px/normal/line-height 1.4
  - Body (Contenu standard): Inter Regular/15px/normal/line-height 1.6
  - Small (Métadonnées, timestamps): Inter Regular/13px/normal/line-height 1.5
  - Caption (Labels, infobulles): Inter Medium/12px/wide (0.01em)/line-height 1.4/uppercase
  - Monospace (Codes, IDs): JetBrains Mono Regular/14px/normal/line-height 1.5

## Animations

Les animations doivent être sobres et fonctionnelles, jamais distrayantes dans un contexte professionnel sérieux. Elles servent uniquement à confirmer les actions, indiquer les états de chargement, et faciliter la compréhension des transitions entre vues complexes. Pas de fantaisie ludique, mais des micro-interactions rassurantes qui renforcent la sensation de contrôle et de fiabilité du système.

- **Purposeful Meaning**: Chaque transition renforce la stabilité et la prévisibilité - les panels coulissent horizontalement pour suggérer une navigation latérale dans l'arborescence, les modals apparaissent avec un léger fade pour ne pas surprendre l'utilisateur
- **Hierarchy of Movement**: 
  - Critique (statut enregistrement): animation immédiate et visible (pulsation rouge pour REC)
  - Important (sauvegarde, validation): feedback discret mais certain (checkmark vert)
  - Secondaire (navigation): transitions fluides 200-300ms
  - Tertiaire (tooltips, hovers): apparition instantanée sans délai

## Component Selection

- **Components**: 
  - **Sidebar** pour navigation principale avec sections collapsibles (Dashboard, Auditions, Documents, ISLP, Paramètres)
  - **Card** pour chaque audition dans la liste avec métadonnées (date, agent, type infraction, statut)
  - **Dialog** pour la création de nouvelle audition avec formulaire métadonnées
  - **Tabs** pour basculer entre Transcription/Audio/PV dans la vue d'édition
  - **Table** pour le dashboard superviseur avec tri/filtre avancé
  - **Sheet** (drawer latéral) pour la bibliothèque documentaire sans quitter le contexte
  - **Badge** pour les statuts (En cours, Brouillon, En révision, Validé) avec code couleur
  - **Textarea** avec formatting pour l'éditeur de transcription
  - **Select** avec recherche pour le choix d'infraction
  - **Alert** pour les notifications système (perte connexion, bruit excessif)
  - **Progress** pour l'indicateur d'upload et génération de PV
  - **Avatar** pour identification rapide de l'agent connecté
  - **Tooltip** pour explications contextuelles sur les champs complexes

- **Customizations**: 
  - Composant AudioWaveform personnalisé (visualisation forme d'onde avec Canvas API)
  - Composant SpeakerBlock (bloc de texte avec indicateur visuel locuteur - bleu pour policier, gris pour auditionné)
  - Composant TimestampMarker (marqueur cliquable synchronisé audio/texte)
  - Composant LegalReferenceCard (carte de référence juridique avec prévisualisation)

- **States**: 
  - Bouton "Enregistrer": repos (bleu), hover (bleu +10% luminosité), actif (rouge pulsant), pause (orange), disabled (gris)
  - Champs input: repos (border gris clair), focus (border bleu + shadow subtle), error (border rouge + message), success (border vert léger)
  - Cards auditions: normal (blanc), hover (élévation subtile), sélectionnée (border bleue épaisse), draft (opacité 0.8)

- **Icon Selection**: 
  - **Microphone** (enregistrement), **Pause** (pause), **Stop** (arrêt)
  - **FileText** (PV/document), **Folder** (bibliothèque), **Users** (locuteurs)
  - **Upload**, **Download** (import/export), **Share** (transmission)
  - **Eye** (prévisualisation), **Edit** (édition), **Check** (validation)
  - **AlertTriangle** (alertes), **Clock** (timestamps), **Tag** (tagging)

- **Spacing**: 
  - Padding cards: p-6 (24px)
  - Spacing entre sections: gap-8 (32px)
  - Spacing entre éléments de formulaire: gap-4 (16px)
  - Sidebar padding: p-4 (16px)
  - Margin bottom titres: mb-6 (24px)

- **Mobile**: 
  - Sidebar devient hamburger menu en overlay en dessous de 768px
  - Tabs horizontales deviennent accordéon vertical
  - Table du dashboard devient liste de cards empilées
  - Audio waveform se simplifie en lecteur audio basique
  - Vue édition passe en mode single-panel avec navigation par boutons flottants
  - Touch targets minimum 44x44px pour tous les boutons d'action
