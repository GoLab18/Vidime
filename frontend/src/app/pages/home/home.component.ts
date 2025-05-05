import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private router: Router) {}

  navigateToVideo(videoUuid: string, id: number) {
    this.router.navigate(['/watch', videoUuid], { state: { id } });
  }

  videos = [
    {
      id: 1,
      uuid: '123e4567-e89b-12d3-a456-426614174000',
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
      uuid: '123e4567-e89b-12d3-a456-426614174001',
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
      uuid: '123e4567-e89b-12d3-a456-426614174002',
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
    },
    {
      id: 4,
      uuid: '123e4567-e89b-12d3-a456-426614174003',
      thumbnail: 'https://picsum.photos/300/200?random=3',
      title: 'Space Exploration: Mars Mission Update',
      channel: {
        name: 'SpaceX Live',
        avatar: 'https://picsum.photos/50/50?random=3',
        verified: true
      },
      views: '1.2M',
      timestamp: '2 days ago',
      duration: '12:30',
      tags: ['Space', 'Science', 'Technology']
    },
    {
      id: 5,
      uuid: '123e4567-e89b-12d3-a456-426614174004',
      thumbnail: 'https://picsum.photos/300/200?random=4',
      title: 'Street Food Around the World',
      channel: {
        name: 'FoodieLife',
        avatar: 'https://picsum.photos/50/50?random=4',
        verified: false
      },
      views: '456K',
      timestamp: '3 days ago',
      duration: '25:45',
      tags: ['Food', 'Travel', 'Cooking']
    },
    {
      id: 6,
      uuid: '123e4567-e89b-12d3-a456-426614174005',
      thumbnail: 'https://picsum.photos/300/200?random=5',
      title: 'AI and Machine Learning Basics',
      channel: {
        name: 'AI Academy',
        avatar: 'https://picsum.photos/50/50?random=5',
        verified: true
      },
      views: '890K',
      timestamp: '1 week ago',
      duration: '45:15',
      tags: ['AI', 'Machine Learning', 'Programming']
    },
    {
      id: 7,
      uuid: '123e4567-e89b-12d3-a456-426614174006',
      thumbnail: 'https://picsum.photos/300/200?random=6',
      title: 'Street Photography: Capturing Moments',
      channel: {
        name: 'PhotoVoyage',
        avatar: 'https://picsum.photos/50/50?random=6',
        verified: false
      },
      views: '321K',
      timestamp: '4 days ago',
      duration: '18:20',
      tags: ['Photography', 'Street', 'Art']
    },
    {
      id: 8,
      uuid: '123e4567-e89b-12d3-a456-426614174007',
      thumbnail: 'https://picsum.photos/300/200?random=7',
      title: 'Gaming News: Latest Releases',
      channel: {
        name: 'GameSpot',
        avatar: 'https://picsum.photos/50/50?random=7',
        verified: true
      },
      views: '1.5M',
      timestamp: '1 day ago',
      duration: '35:45',
      tags: ['Gaming', 'News', 'Reviews']
    },
    {
      id: 9,
      uuid: '123e4567-e89b-12d3-a456-426614174008',
      thumbnail: 'https://picsum.photos/300/200?random=8',
      title: 'Music Production: Beginner Guide',
      channel: {
        name: 'BeatLab',
        avatar: 'https://picsum.photos/50/50?random=8',
        verified: false
      },
      views: '678K',
      timestamp: '3 hours ago',
      duration: '15:30',
      tags: ['Music', 'Production', 'Tutorial']
    },
    {
      id: 10,
      uuid: '123e4567-e89b-12d3-a456-426614174009',
      thumbnail: 'https://picsum.photos/300/200?random=9',
      title: 'Fitness Challenge: 30 Day Plan',
      channel: {
        name: 'FitLife',
        avatar: 'https://picsum.photos/50/50?random=9',
        verified: true
      },
      views: '987K',
      timestamp: '2 weeks ago',
      duration: '22:15',
      tags: ['Fitness', 'Workout', 'Health']
    }
  ];
}
