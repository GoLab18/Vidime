import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormErrorMessageComponent } from '../form-error-message/form-error-message.component';

@Component({
  selector: 'app-form-group-tile',
  imports: [ReactiveFormsModule, FormErrorMessageComponent],
  templateUrl: './form-group-tile.component.html',
  styleUrl: './form-group-tile.component.css'
})
export class FormGroupTileComponent {
  @Input({required: true}) control!: FormControl;
  @Input({required: true}) controlName!: string;
  @Input({required: true}) maxLength!: number;
  @Input() label = '';
  @Input() icon = '';
  @Input() placeholder = '';
  @Input() useTextArea = false;
  @Input() errors: { type: string, message: string }[] = [];

  get fetchFirstErrorMessage(): string | null {
    if (!this.control || !this.control.errors) return null;
    
    for (const err of this.errors) {
      if (this.control.hasError(err.type) && (this.control.dirty || this.control.touched)) return err.message;
    }

    return null;
  }
}
