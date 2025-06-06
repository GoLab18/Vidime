import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  authForm: FormGroup;
  isLoginMode = true;
  isSwitching = false;
  isLoading = false;
  error: string | null = null;
  passwordVisible = false;

  constructor(private fb: FormBuilder) {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });

    const savedEmail = localStorage.getItem('savedEmail');
    if (savedEmail) {
      this.authForm.patchValue({
        email: savedEmail,
        rememberMe: true
      });
    }
  }

  onSwitchMode() {
    this.error = null;
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() {
    if (!this.authForm.valid) {
      return;
    }
    
    this.isLoading = true;
    const { email, _, rememberMe } = this.authForm.value;
    
    if (rememberMe) {
      localStorage.setItem('savedEmail', email);
    } else {
      localStorage.removeItem('savedEmail');
    }

    setTimeout(() => {
      this.isLoading = false;
      console.log('Auth submitted', { 
        email, 
        isLoginMode: this.isLoginMode,
        rememberMe
      });
      
    }, 1500);
  }

  onSocialLogin(provider: string) {
    this.isLoading = true;
    console.log(`Logging in with ${provider}`);
    setTimeout(() => {
      this.isLoading = false;
    }, 1500);
  }

  togglePasswordVisibility(event: Event) {
    event.preventDefault();
    const input = (event.target as HTMLElement).previousElementSibling as HTMLInputElement;
    
    if (input.type === 'password') this.passwordVisible = true;
    else this.passwordVisible = false;
  }
}
