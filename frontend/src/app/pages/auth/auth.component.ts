import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent implements OnInit, OnDestroy {
  authForm: FormGroup;
  isLoginMode = true;
  isLoading = false;
  isSuccess = false;
  successMessage = '';
  error: string | null = null;
  passwordVisible = false;
  private redirectTimer: any;
  private returnUrl = '/';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      rememberMe: [false]
    });

    let savedEmail = localStorage.getItem('savedEmail');
    if (savedEmail) this.authForm.patchValue({ email: savedEmail, rememberMe: true });
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe((params: any) => {
      this.returnUrl = params.get('returnUrl') || '/';
    });
  }

  onSwitchMode() {
    this.error = null;
    this.isSuccess = false;
    this.isLoginMode = !this.isLoginMode;
    this.authForm.get('password')?.reset();
  }

  onSubmit() {
    if (!this.authForm.valid) return;
    
    this.isLoading = true;
    this.error = null;
    this.isSuccess = false;

    const { email, password, rememberMe } = this.authForm.value;
    
    if (rememberMe) localStorage.setItem('savedEmail', email);
    else localStorage.removeItem('savedEmail');
    
    const auth$ = this.isLoginMode
      ? this.authService.login(email, password)
      : this.authService.signup(email, password);
    
    auth$.pipe(
      finalize(() => this.isLoading = false)
    ).subscribe({
      next: () => this.handleAuthSuccess(),
      error: (error) => {
        this.error = error.message;
        this.isLoading = false;
      }
    });
  }

  onSocialLogin(provider: 'google' | 'facebook' | 'github') {
    this.authService.socialLogin(provider);
  }

  private handleAuthSuccess() {
    this.isSuccess = true;
    this.successMessage = this.isLoginMode
      ? 'Login successful!'
      : 'Registration successful! Please log in.';
    
    if (this.isLoginMode) {
      this.redirectTimer = setTimeout(() => {
        this.router.navigate(['channel/choice'], { queryParams: { returnUrl: this.returnUrl } });
      }, 2000);
    } else {
      setTimeout(() => {
        this.isLoginMode = true;
        this.isSuccess = false;
        this.successMessage = '';

        this.authForm.patchValue({ email: this.authForm.value.email, password: '' });
      }, 2000);
    }
  }

  ngOnDestroy() {
    if (this.redirectTimer) clearTimeout(this.redirectTimer);
  }

  togglePasswordVisibility(event: Event) {
    event.preventDefault();
    this.passwordVisible = !this.passwordVisible;
  }
}
