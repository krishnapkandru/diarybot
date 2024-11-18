import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FlashcardFolder } from '../../models/note.model';

@Component({
  selector: 'app-folder-tree',
  template: `
    <div class="folder-tree">
      <div *ngFor="let folder of folders" class="folder-item">
        <div class="folder-header" 
             [class.active]="selectedFolder?.id === folder.id"
             (click)="selectFolder(folder)">
          <span class="folder-icon">📁</span>
          <span *ngIf="!folder.isEditing" class="folder-name">{{ folder.name }}</span>
          <input *ngIf="folder.isEditing"
                 type="text"
                 [value]="folder.name"
                 (blur)="onRename(folder, $event)"
                 (keyup.enter)="onRename(folder, $event)"
                 (keyup.escape)="cancelRename(folder)"
                 #renameInput>
          <div class="folder-actions">
            <button (click)="$event.stopPropagation(); startRename(folder)">✏️</button>
            <button (click)="$event.stopPropagation(); onCreateSubfolder(folder)">➕</button>
            <button (click)="$event.stopPropagation(); onDelete(folder)">🗑️</button>
          </div>
        </div>
        
        <div class="subfolder-container" *ngIf="folder.children.length">
          <app-folder-tree
            [folders]="folder.children"
            [selectedFolder]="selectedFolder"
            (folderSelected)="onFolderSelected($event)"
            (createFolder)="createFolder.emit($event)"
            (renameFolder)="renameFolder.emit($event)"
            (deleteFolder)="deleteFolder.emit($event)"
          ></app-folder-tree>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .folder-tree {
      padding-left: 15px;
    }
    .folder-item {
      margin: 5px 0;
    }
    .folder-header {
      display: flex;
      align-items: center;
      padding: 5px;
      border-radius: 4px;
      cursor: pointer;
    }
    .folder-header:hover {
      background: #f5f5f5;
    }
    .folder-header.active {
      background: #e3f2fd;
    }
    .folder-icon {
      margin-right: 8px;
    }
    .folder-name {
      flex: 1;
    }
    .folder-actions {
      display: none;
      gap: 5px;
    }
    .folder-header:hover .folder-actions {
      display: flex;
    }
    .folder-actions button {
      padding: 2px;
      background: none;
      border: none;
      cursor: pointer;
      font-size: 12px;
    }
    input {
      flex: 1;
      padding: 2px 5px;
      border: 1px solid #ddd;
      border-radius: 3px;
    }
  `]
})
export class FolderTreeComponent {
  @Input() folders: (FlashcardFolder & { isEditing?: boolean })[] = [];
  @Input() selectedFolder: FlashcardFolder | null = null;
  @Output() folderSelected = new EventEmitter<FlashcardFolder | null>();
  @Output() createFolder = new EventEmitter<string>();
  @Output() renameFolder = new EventEmitter<{ id: string; name: string }>();
  @Output() deleteFolder = new EventEmitter<string>();

  selectFolder(folder: FlashcardFolder) {
    this.folderSelected.emit(folder);
  }

  onCreateSubfolder(folder: FlashcardFolder) {
    this.createFolder.emit(folder.id);
  }

  startRename(folder: FlashcardFolder & { isEditing?: boolean }) {
    folder.isEditing = true;
    setTimeout(() => {
      const input = document.querySelector(`input[value="${folder.name}"]`) as HTMLInputElement;
      if (input) {
        input.focus();
        input.select();
      }
    });
  }

  onRename(folder: FlashcardFolder & { isEditing?: boolean }, event: Event) {
    const input = event.target as HTMLInputElement;
    const newName = input.value.trim();
    if (newName && newName !== folder.name) {
      this.renameFolder.emit({ id: folder.id, name: newName });
    }
    folder.isEditing = false;
  }

  cancelRename(folder: FlashcardFolder & { isEditing?: boolean }) {
    folder.isEditing = false;
  }

  onDelete(folder: FlashcardFolder) {
    this.deleteFolder.emit(folder.id);
  }

  onFolderSelected(folder: FlashcardFolder | null) {
    this.folderSelected.emit(folder);
  }
}