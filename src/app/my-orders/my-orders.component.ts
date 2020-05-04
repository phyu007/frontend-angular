import { Component,  Input, OnInit, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import * as Chart from 'chart.js';
@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  name = 'Angular  6';
  canvas: any;

  @Input() data: [];
  @ViewChild('sourceCanvas') sourceCanvasRef: ElementRef<HTMLCanvasElement>;
  @ViewChild('targetCanvas') targetCanvasRef: ElementRef<HTMLCanvasElement>;

  ngOnChanges(changes: SimpleChanges): void {
    const sourceCanvas = this.sourceCanvasRef.nativeElement;
    const sourceCtx = sourceCanvas.getContext('2d');
    const targetCanvas = this.targetCanvasRef.nativeElement;
    const targetCtx = targetCanvas.getContext('2d');
    
    targetCtx.clearRect(0, 0, targetCanvas.width, targetCanvas.height);

    var myChart = new Chart(sourceCtx, {
      type: 'line',      
      
      data: {
        datasets: [{
          label: 'Höhenlinie',
          backgroundColor: "rgba(255, 99, 132,0.4)",
          borderColor: "rgb(255, 99, 132)",
          fill: true,
          data: this.data,
        }]
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Höhenlinie'
        },
        scales: {
          xAxes: [{
            type: 'linear',
            position: 'bottom',
            ticks: {
              callback: (tick) => {
                if (tick >= 1000) {
                  return (tick / 1000).toString() + ' km';
                }
                return tick.toString() + ' m';
              }
            },
            scaleLabel: {
              labelString: 'Länge',
              display: true,
            }
          }],
          yAxes: [{
            type: 'linear',
            ticks: {
              callback: (tick) => tick.toString() + ' m'
            },
            scaleLabel: {
              labelString: 'Höhe',
              display: true
            }
          }],
        },          
        animation: {
          onComplete: function() {
            if (!this.rectangleSet) {
              const scale = window.devicePixelRatio;
              const copyWidth = myChart['y-axis-0'].width - 10;
              const copyHeight = myChart['y-axis-0'].height + myChart['y-axis-0'].top + 10;
              
              targetCtx.scale(scale, scale);
              targetCtx.canvas.width = copyWidth * scale;
              targetCtx.canvas.height = copyHeight * scale;
              targetCtx.canvas.style.width = copyWidth + 'px';
              targetCtx.canvas.style.height = copyHeight + 'px';
              targetCtx.drawImage(sourceCanvas, 0, 0, copyWidth * scale, copyHeight * scale, 0, 0,copyWidth * scale, copyHeight * scale);
              sourceCtx.clearRect(0, 0, copyWidth, copyHeight);
              this.rectangleSet = true;
            }
          },
          onProgress: function() {
            if (this.rectangleSet) {
              var copyWidth = myChart['y-axis-0'].width;
              var copyHeight = myChart['y-axis-0'].height + myChart['y-axis-0'].top + 10;
              sourceCtx.clearRect(0, 0, copyWidth, copyHeight);
            }
          },
        }
      }
    });
  }

}
