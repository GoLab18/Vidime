import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  videos = [
    {
      id: 1,
      thumbnail: 'https://picsum.photos/300/200',
      title: 'Amazing Nature Documentary',
      channel: {
        name: 'NatureExplorer',
        avatar: 'https://picsum.photos/50/50',
        verified: true
      },
      views: '125K',
      timestamp: '2 days ago',
      duration: '12:30',
      tags: ['Nature', 'Documentary']
    },
    {
      id: 2,
      thumbnail: 'https://picsum.photos/300/200?random=1',
      title: 'Tech Review: Latest Gadgets 2025',
      channel: {
        name: 'TechInsider',
        avatar: 'https://picsum.photos/50/50?random=1',
        verified: true
      },
      views: '89K',
      timestamp: '5 hours ago',
      duration: '8:45',
      tags: ['Tech', 'Review']
    },
    {
      id: 3,
      thumbnail: 'https://picsum.photos/300/200?random=2',
      title: 'Cooking Masterclass: Italian Cuisine',
      channel: {
        name: 'ChefLife',
        avatar: 'https://picsum.photos/50/50?random=2',
        verified: false
      },
      views: '256K',
      timestamp: '1 week ago',
      duration: '15:20',
      tags: ['Cooking', 'Food']
    }
  ];
}
