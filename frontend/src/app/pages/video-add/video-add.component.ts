import { Component, OnDestroy } from '@angular/core';
import { VideoPlayerComponent } from '../../components/video-player/video-player.component';
import { VideoCreateInfo } from '../../models/video.model';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { VideoService } from '../../services/video.service';
import { CdnService } from '../../services/cdn.service';
import { Router } from '@angular/router';
import { FormGroupTileComponent } from '../../components/form-group-tile/form-group-tile.component';
import { AuthService } from '../../services/auth.service';
import { HintBubbleComponent } from '../../components/hint-bubble/hint-bubble.component';
import { FormatFileSizePipe } from '../../pipes/format-file-size.pipe';
import { CommonModule } from '@angular/common';
import { FormatDurationPipe } from '../../pipes/format-duration.pipe';
import { MainCustomButtonComponent } from '../../components/main-custom-button/main-custom-button.component';

@Component({
  selector: 'app-video-add',
  imports: [CommonModule, ReactiveFormsModule, VideoPlayerComponent, FormGroupTileComponent,
    HintBubbleComponent, FormatFileSizePipe, FormatDurationPipe, MainCustomButtonComponent],
  templateUrl: './video-add.component.html',
  styleUrl: './video-add.component.css'
})
export class VideoAddComponent implements OnDestroy {
  videoForm: FormGroup;
  isLoading = false;
  error: string | null = null;
  selectedImageFile?: File;
  selectedVideoFile?: File;
  imagePreviewUrl?: string;
  videoPreviewUrl?: string;
  maxThumbnailSize = 5 * 1024 * 1024;
  maxVideoSize = 1024 * 1024 * 1024;
  successMessage = '';
  maxLengthTitle = 100;
  maxLengthDescription = 1000;
  videoDurationMillis = 0;
  redirectTimer: any;

  constructor(
    private fb: FormBuilder,
    private videoService: VideoService,
    private cdnService: CdnService,
    private authService: AuthService,
    private router: Router,
  ) {
    this.videoForm = this.fb.group({
      title: ['', [
        Validators.required,
        Validators.maxLength(this.maxLengthTitle)
      ]],
      description: ['', [
        Validators.required,
        Validators.maxLength(this.maxLengthDescription)
      ]],
      cdnName: [null, [Validators.required]],
      thumbnailName: [null, [Validators.required]]
    });
  }

  get titleControl(): FormControl {
    return this.videoForm.get('title') as FormControl;
  }

  get descriptionControl(): FormControl {
    return this.videoForm.get('description') as FormControl;
  }

  onFileSelected(event: Event) {
    console.log('On file selected');
    const input = event.target as HTMLInputElement;

    if (!input.files || !input.files[0]) return;
    
    const file = input.files[0];

    const isImageFile = file.type.match('image/*');
    const isVideoFile = file.type.match('video/*');

    if (!isImageFile && !isVideoFile) {
      this.error = 'Wrong file type!';
      return;
    }

    if (isImageFile) {
      if (file.name == this.selectedImageFile?.name) return;
      
      if (file.size > this.maxThumbnailSize) {
        this.error = 'Image size is too large! Maximum size is 5MB.';
        return;
      }

      const reader = new FileReader();
      reader.onload = () => { this.imagePreviewUrl = reader.result as string; };
      reader.readAsDataURL(file);
      
      this.selectedImageFile = file;
      this.videoForm.patchValue({ thumbnailName: file.name });
    } else {
      if (file.name == this.selectedVideoFile?.name) return;
      
      if (file.size > this.maxVideoSize) {
        this.error = 'Video size is too large! Maximum size is 1GB.';
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        this.videoPreviewUrl = reader.result as string;
    
        const video = document.createElement('video');
        video.preload = 'metadata';
        video.src = this.videoPreviewUrl;
        video.onloadedmetadata = () => {
          window.URL.revokeObjectURL(video.src);
          this.videoDurationMillis = video.duration * 1000;
        };
      };

      reader.readAsDataURL(file);

      this.selectedVideoFile = file;
      this.videoForm.patchValue({ cdnName: file.name });
    }

    this.error = null;
  }

  onSubmit() {
    if (this.videoForm.invalid) {
      Object.values(this.videoForm.controls).forEach(control => control.markAsTouched());
      return;
    }

    this.isLoading = true;
    this.error = null;

    this.cdnService.uploadVideoWithThumbnail(this.selectedVideoFile!, this.selectedImageFile!).subscribe({
      next: ({cdnUrl, thumbnailUrl}) => {
        const newVideo: VideoCreateInfo = {
          channelId: this.authService.currentChannelId!,
          tags: [],
          title: this.videoForm.get('title')?.value,
          description: this.videoForm.get('description')?.value,
          cdnUrl,
          thumbnailUrl,
          duration: this.videoDurationMillis
        }
        this.videoService.createVideo(newVideo).subscribe({
          next: () => {
            this.isLoading = false;
            this.successMessage = 'Video has been created!';

            this.redirectTimer = setTimeout(() => this.router.navigate(['/']), 1000);
          },
          error: (err) => {
            this.isLoading = false;
            this.error = err.error?.message || 'Failed to create video. Please try again.';
          }
        });
      },
      error: (err) => {
        this.isLoading = false;
        this.error = err.error?.message || 'Failed to upload video. Please try again.';
      }
    });

  }

  onClearThumbnail() {
    this.imagePreviewUrl = undefined;
    this.selectedImageFile = undefined;
    this.videoForm.patchValue({ thumbnailName: null });
  }

  onClearVideo() {
    this.videoPreviewUrl = undefined;
    this.selectedVideoFile = undefined;
    this.videoDurationMillis = 0;
    this.videoForm.patchValue({ cdnName: null });
  }

  ngOnDestroy() {
    if (this.redirectTimer) clearTimeout(this.redirectTimer);
  }
}
