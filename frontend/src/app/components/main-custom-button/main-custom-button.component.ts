import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-main-custom-button',
  imports: [],
  templateUrl: './main-custom-button.component.html',
  styleUrl: './main-custom-button.component.css'
})
export class MainCustomButtonComponent {
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled: boolean = false;
  @Input() isLoading: boolean = false;
  @Input() buttonText: string = 'Submit';
  @Input() loadingText: string = 'Loading...';
}
