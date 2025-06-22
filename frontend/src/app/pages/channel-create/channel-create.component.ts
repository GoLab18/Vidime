import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { CdnService } from '../../services/cdn.service';
import { HintBubbleComponent } from '../../components/hint-bubble/hint-bubble.component';
import { FormGroupTileComponent } from '../../components/form-group-tile/form-group-tile.component';
import { FormatFileSizePipe } from '../../pipes/format-file-size.pipe';
import { MainCustomButtonComponent } from '../../components/main-custom-button/main-custom-button.component';

@Component({
  selector: 'app-channel-create',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HintBubbleComponent, FormGroupTileComponent, FormatFileSizePipe, MainCustomButtonComponent],
  templateUrl: './channel-create.component.html',
  styleUrl: './channel-create.component.css'
})
export class ChannelCreateComponent implements OnDestroy {
  channelForm: FormGroup;
  isLoading = false;
  error: string | null = null;
  selectedImageFile: File | null = null;
  previewUrl: string | null = null;
  maxFileSize = 5 * 1024 * 1024;
  returnUrl = '/';
  isSuccess = false;
  successMessage = '';
  redirectTimer: any;
  maxLengthName = 50;
  maxLengthDescription = 1000;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private cdnService: CdnService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.channelForm = this.fb.group({
      name: ['', [
        Validators.required, 
        Validators.minLength(3),
        Validators.maxLength(this.maxLengthName),
        Validators.pattern(/^[a-zA-Z0-9\s\-_]+$/)
      ]],
      description: ['', [
        Validators.required,
        Validators.maxLength(this.maxLengthDescription)
      ]],
      picture: [null]
    });

    this.route.queryParamMap.subscribe((params: any) => {
      this.returnUrl = params.get('returnUrl') || '/';
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];

      if (!file.type.match('image.*')) {
        this.error = 'Only image files are allowed!';
        return;
      }
      
      if (file.size > this.maxFileSize) {
        this.error = 'File is too large! Maximum size is 5MB.';
        return;
      }
      
      this.selectedImageFile = file;
      this.error = null;
      
      const reader = new FileReader();
      reader.onload = () => { this.previewUrl = reader.result as string; };
      reader.readAsDataURL(file);
      
      this.channelForm.patchValue({ picture: file.name });
    }
  }

  onClearPreview() {
    this.selectedImageFile = null;
    this.previewUrl = null;
    this.channelForm.patchValue({ picture: null });
  }

  onSubmit() {
    if (this.channelForm.invalid) {
      Object.values(this.channelForm.controls).forEach(control => {
        control.markAsTouched();
      });
      
      return;
    }

    this.isLoading = true;
    this.error = null;

    const { name, description } = this.channelForm.value;

    this.cdnService.uploadImage(this.selectedImageFile).subscribe({
      next: (url) => {
        this.authService.createChannel(name, url, description).subscribe({
          next: () => {
            this.isLoading = false;
            this.isSuccess = true;
            this.successMessage = 'Channel has been created!';

            this.redirectTimer = setTimeout(() => {
              this.router.navigate([this.returnUrl]);
            }, 1000);
          },
          error: (err) => {
            this.isLoading = false;
            this.error = err.error?.message || 'Failed to create channel. Please try again.';
          }
        });
      },
      error: (err) => {
        this.isLoading = false;
        this.error = err.error?.message || 'Failed to upload file. Please try again.';
      }
    });
  }

  get nameControl(): FormControl {
    return this.channelForm.get('name') as FormControl;
  }

  get descriptionControl(): FormControl {
    return this.channelForm.get('description') as FormControl;
  }

  ngOnDestroy() {
    if (this.redirectTimer) clearTimeout(this.redirectTimer);
  }
}
