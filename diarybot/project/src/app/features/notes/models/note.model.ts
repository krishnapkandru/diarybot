export interface FlashcardFolder {
  id: string;
  name: string;
  parentId: string | null;
  children: FlashcardFolder[];
  notes: Note[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  folderId: string;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}