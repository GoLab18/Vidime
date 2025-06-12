import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-hint-bubble',
  imports: [NgClass],
  templateUrl: './hint-bubble.component.html',
  styleUrl: './hint-bubble.component.css'
})
export class HintBubbleComponent {
  @Input() hint: string = '';
  @Input() isError: boolean = false;
}
