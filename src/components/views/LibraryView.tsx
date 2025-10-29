import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MagnifyingGlass, BookOpen, FileText, Scales, BookBookmark } from '@phosphor-icons/react';
import type { LegalDocument } from '@/lib/types';

interface LibraryViewProps {
  documents: LegalDocument[];
}

export function LibraryView({ documents }: LibraryViewProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDocs = documents.filter((doc) =>
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.reference.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'law': return <Scales className="h-5 w-5" />;
      case 'doctrine': return <BookBookmark className="h-5 w-5" />;
      case 'standard': return <FileText className="h-5 w-5" />;
      default: return <BookOpen className="h-5 w-5" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'law': return 'Loi';
      case 'doctrine': return 'Doctrine';
      case 'standard': return 'Standard';
      case 'islp': return 'ISLP';
      case 'note': return 'Note';
      default: return type;
    }
  };

  return (
    <div className="p-8 space-y-6">
      <div>
        <h2 className="text-[32px] font-bold tracking-tight">Bibliothèque documentaire</h2>
        <p className="text-muted-foreground mt-1">Accès rapide aux références juridiques et standards</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher dans la bibliothèque..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="text-sm text-muted-foreground">
          {filteredDocs.length} document(s) trouvé(s)
        </div>
        {filteredDocs.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <BookOpen className="h-12 w-12 mx-auto mb-3 opacity-30 text-muted-foreground" />
              <p className="text-muted-foreground">Aucun document ne correspond à votre recherche</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {filteredDocs.map((doc) => (
              <Card key={doc.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4 flex-1">
                      <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                        {getTypeIcon(doc.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">{getTypeLabel(doc.type)}</Badge>
                          <h3 className="text-lg font-semibold">{doc.title}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{doc.content}</p>
                        <p className="text-xs font-mono text-muted-foreground">Réf: {doc.reference}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Consulter
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
