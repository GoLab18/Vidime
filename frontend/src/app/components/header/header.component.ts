import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { ChannelSlim } from '../../models/channel.model';

@Component({
  selector: 'app-header',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {
  searchQuery: string = '';
  isLoggedIn = false;
  channel: ChannelSlim | null = null;
  authSubscription?: Subscription;
  channelSubscription?: Subscription;
  
  @Output() sidebarToggle = new EventEmitter<void>();

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authSubscription = this.authService.currUserId$.subscribe(userId => {
      this.isLoggedIn = !!userId;

      this.channelSubscription = this.authService.currChannel$.subscribe(channel => {
        this.channel = channel;
      });
    });
  }

  ngOnDestroy() {
    if (this.authSubscription) this.authSubscription.unsubscribe();
    if (this.channelSubscription) this.channelSubscription.unsubscribe();
  }

  toggleSidebar() {
    this.sidebarToggle.emit();
  }

  onSearch() {
    console.log('Searching for:', this.searchQuery);
  }

  onLogin() {
    this.router.navigate(['/auth']);
  }

  onLogout() {
    this.authService.manualLogout();
  }
}
