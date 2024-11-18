import { Component, Input } from '@angular/core';
import { Note } from '../../models/note.model';

@Component({
  selector: 'app-flashcard',
  template: `
    <div class="flashcard" [class.flipped]="isFlipped" (click)="flip()">
      <div class="flashcard-inner">
        <div class="flashcard-front">
          <div class="content">{{ note?.flashcardFront }}</div>
        </div>
        <div class="flashcard-back">
          <div class="content">{{ note?.flashcardBack }}</div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .flashcard {
      width: 300px;
      height: 200px;
      perspective: 1000px;
      cursor: pointer;
    }
    .flashcard-inner {
      position: relative;
      width: 100%;
      height: 100%;
      text-align: center;
      transition: transform 0.6s;
      transform-style: preserve-3d;
    }
    .flashcard.flipped .flashcard-inner {
      transform: rotateY(180deg);
    }
    .flashcard-front, .flashcard-back {
      position: absolute;
      width: 100%;
      height: 100%;
      backface-visibility: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      padding: 20px;
    }
    .flashcard-back {
      transform: rotateY(180deg);
    }
  `]
})
export class FlashcardComponent {
  @Input() note?: Note;
  isFlipped = false;

  flip() {
    this.isFlipped = !this.isFlipped;
  }
}