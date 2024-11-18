import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FlashcardFolder, Note } from '../features/notes/models/note.model';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private folders: FlashcardFolder[] = [];
  private notes: Note[] = [];
  private foldersSubject = new BehaviorSubject<FlashcardFolder[]>([]);
  private notesSubject = new BehaviorSubject<Note[]>([]);

  constructor() {
    this.loadData();
  }

  private loadData() {
    const savedFolders = localStorage.getItem('flashcardFolders');
    const savedNotes = localStorage.getItem('notes');
    
    if (savedFolders) {
      this.folders = JSON.parse(savedFolders);
      this.foldersSubject.next(this.folders);
    }
    
    if (savedNotes) {
      this.notes = JSON.parse(savedNotes);
      this.notesSubject.next(this.notes);
    }
  }

  private saveData() {
    localStorage.setItem('flashcardFolders', JSON.stringify(this.folders));
    localStorage.setItem('notes', JSON.stringify(this.notes));
    this.foldersSubject.next(this.folders);
    this.notesSubject.next(this.notes);
  }

  getFolders(): Observable<FlashcardFolder[]> {
    return this.foldersSubject.asObservable();
  }

  getNotes(): Observable<Note[]> {
    return this.notesSubject.asObservable();
  }

  createFolder(name: string, parentId: string | null = null): FlashcardFolder {
    const newFolder: FlashcardFolder = {
      id: Date.now().toString(),
      name,
      parentId,
      children: [],
      notes: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    if (parentId) {
      const success = this.addToParentFolder(newFolder, this.folders);
      if (!success) {
        // If parent not found, add to root
        this.folders.push(newFolder);
      }
    } else {
      this.folders.push(newFolder);
    }

    this.saveData();
    return newFolder;
  }

  private addToParentFolder(folder: FlashcardFolder, folders: FlashcardFolder[]): boolean {
    for (let i = 0; i < folders.length; i++) {
      if (folders[i].id === folder.parentId) {
        folders[i].children.push(folder);
        return true;
      }
      if (folders[i].children.length > 0) {
        const found = this.addToParentFolder(folder, folders[i].children);
        if (found) return true;
      }
    }
    return false;
  }

  getItemCount(folderId: string): number {
    const folder = this.findFolder(folderId, this.folders);
    if (!folder) return 0;
    
    const noteCount = this.notes.filter(note => note.folderId === folderId).length;
    const childFolderCount = folder.children.length;
    return noteCount + childFolderCount;
  }

  private findFolder(folderId: string, folders: FlashcardFolder[]): FlashcardFolder | null {
    for (const folder of folders) {
      if (folder.id === folderId) return folder;
      if (folder.children.length > 0) {
        const found = this.findFolder(folderId, folder.children);
        if (found) return found;
      }
    }
    return null;
  }

  updateFolderName(folderId: string, newName: string) {
    const updateFolder = (folders: FlashcardFolder[]) => {
      for (let folder of folders) {
        if (folder.id === folderId) {
          folder.name = newName;
          folder.updatedAt = new Date();
          return true;
        }
        if (folder.children.length && updateFolder(folder.children)) {
          return true;
        }
      }
      return false;
    };

    updateFolder(this.folders);
    this.saveData();
  }

  deleteFolder(folderId: string) {
    const deleteFromFolders = (folders: FlashcardFolder[]): boolean => {
      for (let i = 0; i < folders.length; i++) {
        if (folders[i].id === folderId) {
          folders.splice(i, 1);
          return true;
        }
        if (folders[i].children.length && deleteFromFolders(folders[i].children)) {
          return true;
        }
      }
      return false;
    };

    deleteFromFolders(this.folders);
    // Also delete all notes in this folder and its subfolders
    const deleteFolderAndSubfolderNotes = (folderId: string) => {
      const folder = this.findFolder(folderId, this.folders);
      if (folder) {
        this.notes = this.notes.filter(note => note.folderId !== folderId);
        folder.children.forEach(child => deleteFolderAndSubfolderNotes(child.id));
      }
    };

    deleteFolderAndSubfolderNotes(folderId);
    this.saveData();
  }

  createNote(note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>): Note {
    const newNote: Note = {
      ...note,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.notes.push(newNote);
    this.saveData();
    return newNote;
  }

  updateNote(noteId: string, updates: Partial<Note>) {
    const noteIndex = this.notes.findIndex(n => n.id === noteId);
    if (noteIndex !== -1) {
      this.notes[noteIndex] = {
        ...this.notes[noteIndex],
        ...updates,
        updatedAt: new Date()
      };
      this.saveData();
    }
  }

  deleteNote(noteId: string) {
    this.notes = this.notes.filter(note => note.id !== noteId);
    this.saveData();
  }
}