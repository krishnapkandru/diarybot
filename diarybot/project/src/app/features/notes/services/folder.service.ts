import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Folder {
  id: string;
  name: string;
  parentId: string | null;
  children: Folder[];
  createdAt: Date;
  updatedAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class FolderService {
  private folders: Folder[] = [];
  private foldersSubject = new BehaviorSubject<Folder[]>([]);
  private currentPath: Folder[] = [];
  private currentPathSubject = new BehaviorSubject<Folder[]>([]);

  constructor() {
    this.loadFolders();
  }

  private loadFolders() {
    const savedFolders = localStorage.getItem('folders');
    if (savedFolders) {
      this.folders = JSON.parse(savedFolders);
      this.foldersSubject.next(this.folders);
    }
  }

  private saveFolders() {
    localStorage.setItem('folders', JSON.stringify(this.folders));
    this.foldersSubject.next(this.folders);
  }

  getFolders(): Observable<Folder[]> {
    return this.foldersSubject.asObservable();
  }

  getCurrentPath(): Observable<Folder[]> {
    return this.currentPathSubject.asObservable();
  }

  createFolder(name: string, parentId: string | null = null): Folder {
    const newFolder: Folder = {
      id: Date.now().toString(),
      name,
      parentId,
      children: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    if (parentId) {
      const parent = this.findFolder(parentId);
      if (parent) {
        parent.children.push(newFolder);
      }
    } else {
      this.folders.push(newFolder);
    }

    this.saveFolders();
    return newFolder;
  }

  updateFolder(folderId: string, updates: Partial<Folder>) {
    const folder = this.findFolder(folderId);
    if (folder) {
      Object.assign(folder, { ...updates, updatedAt: new Date() });
      this.saveFolders();
    }
  }

  deleteFolder(folderId: string) {
    const deleteFromArray = (folders: Folder[]) => {
      const index = folders.findIndex(f => f.id === folderId);
      if (index !== -1) {
        folders.splice(index, 1);
        return true;
      }
      for (const folder of folders) {
        if (deleteFromArray(folder.children)) {
          return true;
        }
      }
      return false;
    };

    deleteFromArray(this.folders);
    this.saveFolders();
  }

  private findFolder(folderId: string, folders: Folder[] = this.folders): Folder | null {
    for (const folder of folders) {
      if (folder.id === folderId) return folder;
      const found = this.findFolder(folderId, folder.children);
      if (found) return found;
    }
    return null;
  }

  setCurrentPath(folderId: string | null) {
    if (!folderId) {
      this.currentPath = [];
    } else {
      const path: Folder[] = [];
      const buildPath = (folders: Folder[]): boolean => {
        for (const folder of folders) {
          if (folder.id === folderId) {
            path.push(folder);
            return true;
          }
          if (buildPath(folder.children)) {
            path.unshift(folder);
            return true;
          }
        }
        return false;
      };
      buildPath(this.folders);
      this.currentPath = path;
    }
    this.currentPathSubject.next(this.currentPath);
  }

  getCurrentFolders(parentId: string | null = null): Folder[] {
    if (!parentId) {
      return this.folders;
    }
    const parent = this.findFolder(parentId);
    return parent ? parent.children : [];
  }
}