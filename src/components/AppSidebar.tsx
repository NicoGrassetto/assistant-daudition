import { House, Microphone, FileText, FolderOpen, Headphones, CloudArrowUp, Gear } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
}

function NavItem({ icon, label, active, onClick }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-colors text-left",
        active 
          ? "bg-primary text-primary-foreground" 
          : "text-foreground hover:bg-muted"
      )}
    >
      <span className="text-xl">{icon}</span>
      <span className="font-medium text-[15px]">{label}</span>
    </button>
  );
}

interface AppSidebarProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

export function AppSidebar({ currentView, onNavigate }: AppSidebarProps) {
  return (
    <aside className="w-64 h-screen bg-card border-r border-border flex flex-col">
      <div className="p-6 border-b border-border">
        <h1 className="text-lg font-bold text-primary">Assistant d'Audition</h1>
        <p className="text-xs text-muted-foreground mt-1">Police Nationale</p>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        <NavItem 
          icon={<House weight="fill" />} 
          label="Tableau de bord" 
          active={currentView === 'dashboard'}
          onClick={() => onNavigate('dashboard')}
        />
        <NavItem 
          icon={<Microphone weight="fill" />} 
          label="Nouvelle audition" 
          active={currentView === 'new-audition'}
          onClick={() => onNavigate('new-audition')}
        />
        <NavItem 
          icon={<FileText weight="fill" />} 
          label="Auditions" 
          active={currentView === 'auditions'}
          onClick={() => onNavigate('auditions')}
        />
        <NavItem 
          icon={<FolderOpen weight="fill" />} 
          label="Bibliothèque" 
          active={currentView === 'library'}
          onClick={() => onNavigate('library')}
        />
        <NavItem 
          icon={<Headphones weight="fill" />} 
          label="Enregistrements" 
          active={currentView === 'recordings'}
          onClick={() => onNavigate('recordings')}
        />
        <NavItem 
          icon={<CloudArrowUp weight="fill" />} 
          label="ISLP" 
          active={currentView === 'islp'}
          onClick={() => onNavigate('islp')}
        />
      </nav>
      
      <div className="p-4 border-t border-border">
        <NavItem 
          icon={<Gear weight="fill" />} 
          label="Paramètres" 
          active={currentView === 'settings'}
          onClick={() => onNavigate('settings')}
        />
      </div>
    </aside>
  );
}
