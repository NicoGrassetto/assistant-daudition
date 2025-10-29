import { useState, useEffect } from 'react';
import { useKV } from '@github/spark/hooks';
import { Toaster } from '@/components/ui/sonner';
import { AppSidebar } from '@/components/AppSidebar';
import { AppHeader } from '@/components/AppHeader';
import { DashboardView } from '@/components/views/DashboardView';
import { AuditionsListView } from '@/components/views/AuditionsListView';
import { AuditionEditorView } from '@/components/views/AuditionEditorView';
import { RecordingView } from '@/components/views/RecordingView';
import { LibraryView } from '@/components/views/LibraryView';
import { SettingsView } from '@/components/views/SettingsView';
import { NewAuditionDialog } from '@/components/NewAuditionDialog';
import type { Audition, User, LegalDocument, TranscriptionBlock, InfractionType } from '@/lib/types';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [currentUser] = useState<User>({
    id: 'user-1',
    name: 'Marie BERNARD',
    role: 'station',
    badge: 'PN-75-2843'
  });
  const [onlineStatus, setOnlineStatus] = useState(true);
  const [showNewAuditionDialog, setShowNewAuditionDialog] = useState(false);
  const [activeAuditionId, setActiveAuditionId] = useState<string | null>(null);
  const [recordingAuditionId, setRecordingAuditionId] = useState<string | null>(null);

  const [auditions, setAuditions] = useKV<Audition[]>('auditions', []);
  const [legalDocuments] = useKV<LegalDocument[]>('legal-documents', []);

  useEffect(() => {
    const handleOnline = () => setOnlineStatus(true);
    const handleOffline = () => setOnlineStatus(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleNavigate = (view: string) => {
    setCurrentView(view);
    setActiveAuditionId(null);
    setRecordingAuditionId(null);
    
    if (view === 'new-audition') {
      setShowNewAuditionDialog(true);
    }
  };

  const handleCreateAudition = (data: {
    infractionType: InfractionType;
    location: string;
    witnessName?: string;
  }) => {
    const newAudition: Audition = {
      id: `AUD-${Date.now()}`,
      status: 'recording',
      infractionType: data.infractionType,
      date: new Date().toISOString(),
      location: data.location,
      officerId: currentUser.id,
      officerName: currentUser.name,
      witnessName: data.witnessName,
      transcription: [],
      pvGenerated: false,
      flaggedForReview: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setAuditions((current) => [...(current || []), newAudition]);
    setRecordingAuditionId(newAudition.id);
    setShowNewAuditionDialog(false);
    setCurrentView('recording');
  };

  const handleStopRecording = (transcription: TranscriptionBlock[]) => {
    if (!recordingAuditionId) return;

    setAuditions((current) =>
      (current || []).map((a) =>
        a.id === recordingAuditionId
          ? {
              ...a,
              status: 'draft',
              transcription,
              duration: transcription.length > 0 ? transcription[transcription.length - 1].timestamp : 0,
              updatedAt: new Date().toISOString(),
            }
          : a
      )
    );

    setActiveAuditionId(recordingAuditionId);
    setRecordingAuditionId(null);
    setCurrentView('editor');
  };

  const handleOpenAudition = (id: string) => {
    setActiveAuditionId(id);
    setCurrentView('editor');
  };

  const handleUpdateAudition = (updatedAudition: Audition) => {
    setAuditions((current) =>
      (current || []).map((a) => (a.id === updatedAudition.id ? updatedAudition : a))
    );
  };

  const handleBackFromEditor = () => {
    setActiveAuditionId(null);
    setCurrentView('auditions');
  };

  const activeAudition = activeAuditionId
    ? (auditions || []).find((a) => a.id === activeAuditionId)
    : null;

  const recordingAudition = recordingAuditionId
    ? (auditions || []).find((a) => a.id === recordingAuditionId)
    : null;

  return (
    <div className="flex h-screen bg-background">
      <AppSidebar currentView={currentView} onNavigate={handleNavigate} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <AppHeader user={currentUser} onlineStatus={onlineStatus} />
        
        <main className="flex-1 overflow-y-auto">
          {currentView === 'dashboard' && (
            <DashboardView
              auditions={auditions || []}
              onOpenAudition={handleOpenAudition}
              onNewAudition={() => setShowNewAuditionDialog(true)}
            />
          )}
          
          {currentView === 'auditions' && (
            <AuditionsListView
              auditions={auditions || []}
              onOpenAudition={handleOpenAudition}
            />
          )}
          
          {currentView === 'editor' && activeAudition && (
            <AuditionEditorView
              audition={activeAudition}
              onBack={handleBackFromEditor}
              onUpdate={handleUpdateAudition}
            />
          )}
          
          {currentView === 'recording' && recordingAudition && (
            <RecordingView
              auditionId={recordingAudition.id}
              onStop={handleStopRecording}
            />
          )}
          
          {currentView === 'library' && (
            <LibraryView documents={legalDocuments || []} />
          )}
          
          {currentView === 'settings' && <SettingsView />}
          
          {(currentView === 'recordings' || currentView === 'islp') && (
            <div className="p-8 text-center">
              <div className="max-w-md mx-auto space-y-4">
                <h2 className="text-2xl font-bold">Module à venir</h2>
                <p className="text-muted-foreground">
                  Cette fonctionnalité sera disponible dans une prochaine version
                </p>
              </div>
            </div>
          )}
        </main>
      </div>

      <NewAuditionDialog
        open={showNewAuditionDialog}
        onOpenChange={setShowNewAuditionDialog}
        onSubmit={handleCreateAudition}
      />

      <Toaster position="top-right" />
    </div>
  );
}

export default App;