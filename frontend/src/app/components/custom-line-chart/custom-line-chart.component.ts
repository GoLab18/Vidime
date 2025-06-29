import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Chart, ChartConfiguration, ChartType, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-custom-line-chart',
  standalone: true,
  imports: [],
  templateUrl: './custom-line-chart.component.html',
  styleUrls: ['./custom-line-chart.component.css']
})
export class CustomLineChartComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input({required: true}) labels: string[] = [];
  @Input({required: true}) data: number[] = [];
  @Input({required: true}) title: string = '';
  
  @ViewChild('chartCanvas') private chartRef!: ElementRef<HTMLCanvasElement>;
  
  private lineChart: Chart | null = null;
  private isViewInitialized = false;
  
  ngAfterViewInit() {
    this.isViewInitialized = true;
    this.createOrUpdateChart();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.isViewInitialized && (changes['data'] || changes['labels'] || changes['title'])) {
      this.createOrUpdateChart();
    }
  }

  ngOnDestroy() {
    if (this.lineChart) this.lineChart.destroy();
  }

  private createOrUpdateChart() {
    if (!this.isViewInitialized || !this.chartRef?.nativeElement) return;

    const ctx = this.chartRef.nativeElement.getContext('2d');
    
    if (this.lineChart) this.lineChart.destroy();

    let yMin = 0, yMax = 10;
    
    if (this.data.length > 0) {
      const min = Math.min(...this.data);
      const max = Math.max(...this.data);
      const margin = Math.max(1, (max - min) * 0.1);
      yMin = Math.max(0, min - margin);
      yMax = max + margin;
    }
    
    const lineGradient = this.createGradient(ctx!, 0, 0, 0, 400, [
      { offset: 0, color: 'rgba(57, 255, 20, 0.8)' },
      { offset: 1, color: 'rgba(57, 255, 20, 0.1)' }
    ]);

    const areaUnderGradient = this.createGradient(ctx!, 0, 0, 0, 400, [
      { offset: 0, color: 'rgba(57, 255, 20, 0.2)' },
      { offset: 1, color: 'rgba(57, 255, 20, 0.1)' }
    ]);

    this.lineChart = new Chart(ctx!, {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: [
          {
            label: this.title,
            data: this.data,
            borderColor: lineGradient,
            borderWidth: 2,
            backgroundColor: areaUnderGradient,
            pointBackgroundColor: '#39ff14',
            pointHoverRadius: 4,
            pointHoverBorderWidth: 0,
            pointRadius: 1,
            tension: 0.4,
            fill: true
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          title: {
            display: true,
            text: `${this.title}`,
            color: '#39ff14',
            font: {
              family: '"Roboto", sans-serif',
              size: 20,
              weight: 'normal'
            }
          },
          tooltip: {
            backgroundColor: 'rgba(30, 30, 30, 0.95)',
            titleColor: '#39ff14',
            bodyColor: '#e0e0e0',
            borderColor: '#39ff14',
            borderWidth: 1,
            padding: 12,
            displayColors: false
          }
        },
        scales: {
          x: {
            grid: {
              color: 'rgba(200, 200, 200, 0.1)',
              borderColor: 'rgba(200, 200, 200, 0.1)'
            },
            ticks: {
              color: '#a0a0a0',
              font: {
                family: '"Roboto", sans-serif',
                size: 11
              }
            }
          },
          y: {
            beginAtZero: false,
            suggestedMin: yMin,
            suggestedMax: yMax,
            grid: {
              color: 'rgba(200, 200, 200, 0.1)',
              borderColor: 'rgba(200, 200, 200, 0.1)'
            },
            ticks: {
              color: '#a0a0a0',
              font: {
                family: '"Roboto", sans-serif',
                size: 12
              }
            }
          }
        },
        animation: {
          duration: 800,
          easing: 'easeInOutQuart'
        },
        elements: {
          line: {
            borderWidth: 2
          }
        },
        interaction: {
          mode: 'nearest',
          intersect: false,
          axis: 'x'
        }
      }
    } as ChartConfiguration<ChartType, number[], string>);
  }

  private createGradient(
    ctx: CanvasRenderingContext2D,
    x0: number, y0: number,
    x1: number, y1: number,
    colorStops: { offset: number; color: string }[]
  ): CanvasGradient {
    const gradient = ctx.createLinearGradient(x0, y0, x1, y1);
    colorStops.forEach(stop => {
      gradient.addColorStop(stop.offset, stop.color);
    });
    
    return gradient;
  }
}
