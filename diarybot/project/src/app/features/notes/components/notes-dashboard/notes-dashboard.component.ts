import { Component, OnInit } from '@angular/core';
import { FolderService, Folder } from '../../services/folder.service';

@Component({
  selector: 'app-notes-dashboard',
  template: `
    <div class="notes-dashboard">
      <div class="breadcrumb">
        <button class="breadcrumb-item" (click)="navigateToFolder(null)">Root</button>
        <ng-container *ngFor="let folder of currentPath$ | async">
          <span class="breadcrumb-separator">/</span>
          <button class="breadcrumb-item" (click)="navigateToFolder(folder.id)">
            {{ folder.name }}
          </button>
        </ng-container>
      </div>

      <button class="new-folder-btn" (click)="createFolder()">New Folder</button>

      <div class="folders-grid">
        <div *ngFor="let folder of currentFolders" class="folder-card">
          <div class="folder-content" (click)="navigateToFolder(folder.id)">
            <div class="folder-actions">
              <button (click)="$event.stopPropagation(); renameFolder(folder)">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
              </button>
              <button (click)="$event.stopPropagation(); createSubfolder(folder)">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 5v14M5 12h14"/>
                </svg>
              </button>
              <button (click)="$event.stopPropagation(); deleteFolder(folder)">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                </svg>
              </button>
            </div>

            <div class="folder-icon-wrapper">
              <svg class="folder-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 6C2 4.89543 2.89543 4 4 4H9L11 6H20C21.1046 6 22 6.89543 22 8V18C22 19.1046 21.1046 20 20 20H4C2.89543 20 2 19.1046 2 18V6Z" 
                      fill="#E3F2FD" 
                      stroke="#1976D2" 
                      stroke-width="2"/>
              </svg>
            </div>

            <div class="folder-info">
              <div class="folder-name">{{ folder.name }}</div>
              <div class="item-count">
                {{ folder.children.length }} {{ folder.children.length === 1 ? 'item' : 'items' }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .notes-dashboard {
      padding: 20px;
    }

    .breadcrumb {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      padding: 10px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .breadcrumb-item {
      background: none;
      border: none;
      color: #1976D2;
      cursor: pointer;
      padding: 5px 10px;
      border-radius: 4px;
    }

    .breadcrumb-item:hover {
      background: #E3F2FD;
    }

    .breadcrumb-separator {
      color: #666;
      margin: 0 5px;
    }

    .new-folder-btn {
      margin-bottom: 20px;
      padding: 10px 20px;
      background: #1976D2;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    .folders-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 24px;
    }

    .folder-card {
      height: 250px;
    }

    .folder-content {
      background: white;
      border-radius: 16px;
      padding: 24px;
      height: 100%;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
      cursor: pointer;
    }

    .folder-content:hover {
      transform: translateY(-4px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }

    .folder-actions {
      position: absolute;
      top: 12px;
      right: 12px;
      display: flex;
      gap: 8px;
      opacity: 0;
      transition: opacity 0.2s ease;
    }

    .folder-content:hover .folder-actions {
      opacity: 1;
    }

    .folder-actions button {
      background: none;
      border: none;
      color: #666;
      cursor: pointer;
      padding: 4px;
      border-radius: 4px;
      transition: all 0.2s ease;
    }

    .folder-actions button:hover {
      background: #f0f0f0;
      color: #1976D2;
    }

    .folder-icon-wrapper {
      width: 100px;
      height: 100px;
      background: #E3F2FD;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 20px;
    }

    .folder-icon {
      width: 60px;
      height: 60px;
    }

    .folder-info {
      text-align: center;
      margin-top: auto;
    }

    .folder-name {
      font-size: 1.4em;
      font-weight: 500;
      color: #333;
      margin-bottom: 8px;
    }

    .item-count {
      font-size: 1em;
      color: #666;
    }
  `]
})
export class NotesDashboardComponent implements OnInit {
  currentPath$ = this.folderService.getCurrentPath();
  currentFolders: Folder[] = [];
  currentParentId: string | null = null;

  constructor(private folderService: FolderService) {}

  ngOnInit() {
    this.loadCurrentFolders();
  }

  private loadCurrentFolders() {
    this.currentFolders = this.folderService.getCurrentFolders(this.currentParentId);
  }

  navigateToFolder(folderId: string | null) {
    this.currentParentId = folderId;
    this.folderService.setCurrentPath(folderId);
    this.loadCurrentFolders();
  }

  createFolder() {
    const name = prompt('Enter folder name:');
    if (name) {
      this.folderService.createFolder(name, this.currentParentId);
      this.loadCurrentFolders();
    }
  }

  createSubfolder(parentFolder: Folder) {
    const name = prompt('Enter subfolder name:');
    if (name) {
      this.folderService.createFolder(name, parentFolder.id);
      this.loadCurrentFolders();
    }
  }

  renameFolder(folder: Folder) {
    const newName = prompt('Enter new folder name:', folder.name);
    if (newName && newName !== folder.name) {
      this.folderService.updateFolder(folder.id, { name: newName });
      this.loadCurrentFolders();
    }
  }

  deleteFolder(folder: Folder) {
    if (confirm(`Are you sure you want to delete "${folder.name}" and all its contents?`)) {
      this.folderService.deleteFolder(folder.id);
      this.loadCurrentFolders();
    }
  }
}