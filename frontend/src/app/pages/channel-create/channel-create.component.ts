import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { CdnService } from '../../services/cdn.service';
import { HintBubbleComponent } from '../../components/hint-bubble/hint-bubble.component';

@Component({
  selector: 'app-channel-create',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HintBubbleComponent],
  templateUrl: './channel-create.component.html',
  styleUrl: './channel-create.component.css'
})
export class ChannelCreateComponent implements OnDestroy {
  channelForm: FormGroup;
  isLoading = false;
  error: string | null = null;
  selectedImageFile: File | null = null;
  previewUrl: string | null = null;
  maxFileSize = 5 * 1024 * 1024; // 5MB
  returnUrl = '/';
  isSuccess = false;
  successMessage = '';
  redirectTimer: any;

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
        Validators.maxLength(50),
        Validators.pattern(/^[a-zA-Z0-9\s\-_]+$/)
      ]],
      description: ['', [
        Validators.required,
        Validators.maxLength(1000)
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
            setTimeout(() => {}, 1000)
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

  hasError(controlName: string, errorType: string): boolean {
    const control = this.channelForm.get(controlName);
    return control ? control.hasError(errorType) && (control.dirty || control.touched) : false;
  }

  ngOnDestroy() {
    if (this.redirectTimer) clearTimeout(this.redirectTimer);
  }
}
