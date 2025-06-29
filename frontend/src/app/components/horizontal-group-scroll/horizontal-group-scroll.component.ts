import { AfterViewInit, Component, Input, SimpleChanges, ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { HomeVideoComponent } from '../home-video/home-video.component';

@Component({
  selector: 'app-horizontal-group-scroll',
  imports: [HomeVideoComponent],
  templateUrl: './horizontal-group-scroll.component.html',
  styleUrl: './horizontal-group-scroll.component.css'
})
export class HorizontalGroupScrollComponent implements AfterViewInit {
  @Input() items: any[] = [];
  @Input() type: 'video' | 'playlist' = 'video';

  @ViewChild('listContainer') listContainer!: ElementRef<HTMLDivElement>;

  itemGroupSize: number = 0;
  scrollStep: number = 0;
  scrollLeftVisible = false;
  scrollRightVisible = false;

  ngAfterViewInit() {
    setTimeout(() => {
      this.updateLayout();
      this.handleScroll();

      window.addEventListener('resize', () => {
        this.updateLayout();
      });
  
      this.listContainer.nativeElement.addEventListener('scroll', this.handleScroll.bind(this));
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['items']) {
      setTimeout(() => this.updateLayout());
    }
  }

  updateLayout() {
    const container = this.listContainer.nativeElement;
    const containerWidth = container.offsetWidth;
    const scrollWidth = container.scrollWidth;
  
    let itemWidth = 324;
    let itemsPerGroup = Math.floor(containerWidth / itemWidth);
  
    this.itemGroupSize = Math.max(1, itemsPerGroup);
    this.scrollStep = this.itemGroupSize * itemWidth + 24;
  
    this.scrollLeftVisible = container.scrollLeft > 0;
    this.scrollRightVisible = scrollWidth > containerWidth;
  }

  handleScroll() {
    const container = this.listContainer.nativeElement;
    const scrollLeft = container.scrollLeft;

    this.scrollLeftVisible = scrollLeft > 0;
    this.scrollRightVisible = scrollLeft < container.scrollWidth - container.clientWidth - 1;
  }

  handleScrollLeft() {
    const newScroll = Math.max(0, this.listContainer.nativeElement.scrollLeft - this.scrollStep);
    this.listContainer.nativeElement.scrollTo({left: newScroll, behavior: 'smooth'});
  }

  handleScrollRight() {
    const newScroll = this.listContainer.nativeElement.scrollLeft + this.scrollStep;
    this.listContainer.nativeElement.scrollTo({left: newScroll, behavior: 'smooth'});
  }

  groupItems<T>(items: T[], groupSize: number): T[][] {
    if (!items?.length || groupSize <= 0) return [];
    
    let groups: T[][] = [];
    for (let i = 0; i < items.length; i += groupSize) groups.push(items.slice(i, i + groupSize));
    return groups;
  }

  get itemGroups() {
    return this.groupItems(this.items, this.itemGroupSize);
  }
}
