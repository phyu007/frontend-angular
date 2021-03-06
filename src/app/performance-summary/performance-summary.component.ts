import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import * as Chart from 'chart.js';
import { flatMap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PartsService } from '../parts.service';
import { stringToKeyValue } from '@angular/flex-layout/extended/typings/style/style-transforms';
import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-performance-summary',
  templateUrl: './performance-summary.component.html',
  styleUrls: ['./performance-summary.component.scss'],
})
export class PerformanceSummaryComponent implements OnInit {


  selected = 'option2';
  public timeStamp = ["6 months", "1 year", "2 year"];
  canvas: any;
  isMenuCollapsed:any;

  @ViewChild('sourceCanvas') sourceCanvasRef: ElementRef<HTMLCanvasElement>;
  @ViewChild('targetCanvas') targetCanvasRef: ElementRef<HTMLCanvasElement>;

  format = 'MMM/yyyy';
  locale = 'en-US';chartChosen;
  
  public time = ""; public newVal ;public chosenTime;  
  toggleOptions: Array<String> = ["Past 6 Months", "Past 1 Year","Past 2 Year"];

  
  selectionChanged(item) {

    var timeOnhandCost = [];
    var timetonHandMonths = [];

    console.log(this.chartChosen)
    console.log("Selected value: " + item.value);


  }

  public onChange(event): void {

    var timeOnhandCost = [] ;
   var  timetonHandMonths = [];


    this.time = event.target.value;

    console.log(this.time)
   this.newVal = 0;
   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

   switch (this.time ) {

     case '6 months':
       this.newVal  = 6;
       break;
     case '1 year':
       this.newVal  = 12;
       break;

     case '2 year':
       this.newVal  = 24;
       break;

     default:

       this.newVal  = 24;
       break;

   }
     console.log(this.newVal);
  
    this.PartsService.$isChosen.subscribe((data) => {
     console.log("In Child Component of time changed", data);
     console.log(data.category);
     this.chosenTime = data.category;
    });

    

     this.PartsService.getTimeStamp(this.chosenTime,this.newVal).subscribe(
       res => {

         console.log(this.chosenTime)
         console.log(this.newVal)
         console.log(res);

         this.data = res.recordsets[0];
         this.size = Object.keys(res.recordsets[0]).length
         console.log(this.size);
       //  console.log(this.data[12].totalOnHand);

         for (var i = 0; i < this.size; i++) {
           timeOnhandCost[i] = this.data[i].totalOnHand
           timetonHandMonths[i] =  formatDate(this.data[i].Monthly, this.format, this.locale);

         }
        
         console.log(timeOnhandCost);

         console.log(timetonHandMonths); 
       
         var chart = new Chart('canvas', {


          // The type of chart we want to create
          type: 'bar',


          // The data for our dataset
          data: {
            labels: timetonHandMonths,   //this.toonHandMonths

            datasets: [{

              label: 'COGSByCategory',
              backgroundColor: 'rgb(240,139,132)',
              data: [500, 1010, 805, 250, 230, 3056, 4535]

            },
            {
              label: 'OnhandCostByCategory',
              backgroundColor: 'rgb(48,124,207)',
              data: timeOnhandCost
            },
            {
              label: 'OpenOrderCostByCategory',
              backgroundColor: 'rgb(160,219,179)',
              data: [230, 900, 450, 212, 200, 3230, 400]
            }
            ]
          },


          options: {
            responsive: true,
            scales: {
              yAxes: [
                {
                  gridLines: {
                    lineWidth: 0
                  }
                }
              ],
              xAxes: [
                {
                  gridLines: {
                    lineWidth: 0
                  }
                }
              ]
            },

            legend: { display: true },
            plugins: {
              datalabels:
              {
                display: true,
                anchor: 'end',
                align: 'top',
              }
            }
          }



        });
         
         const sourceCanvas = this.sourceCanvasRef.nativeElement;
         const sourceCtx = sourceCanvas.getContext('2d');
         const targetCanvas = this.targetCanvasRef.nativeElement;
         const targetCtx = targetCanvas.getContext('2d');

         var myChart = new Chart(sourceCtx, {
           type: 'bar',

           data: {

             labels: timetonHandMonths,   //this.toonHandMonths
             datasets: [{

               label: 'COGSByCategory',
               backgroundColor: 'rgb(240,139,132)',
               data: [500, 1010, 805, 250, 230, 3056, 4535]

             },
             {
               label: 'OnhandCostByCategory',
               backgroundColor: 'rgb(48,124,207)',
               data: timeOnhandCost
             },
             {
               label: 'OpenOrderCostByCategory',
               backgroundColor: 'rgb(160,219,179)',
               data: [230, 900, 450, 212, 200, 3230, 400]
             }
             ]
           },
           options: {
             legend:
             {
               labels:
               {
                 fontSize:18
               }
             },
             responsive: true,
             scales: {
               xAxes: [{
                 gridLines: {
                   lineWidth: 0
                 }
               }],
               yAxes: [{
                 type: 'linear',
                 ticks: {
                   callback: function (value, index, values) {
                     return '$' + value;
                   }
                 },
                 gridLines: {
                   lineWidth: 0
                 }

               }],
             },
             animation: {
               onComplete: function () {
                 if (!this.rectangleSet) {
                   const scale = window.devicePixelRatio;
                 //  const copyWidth = myChart.scales['y-axis-0'].width - 10;
                   const copyWidth = myChart.options.scales['y-axis-0'].width - 10;
                 //  const copyHeight = myChart.scales['y-axis-0'].height + myChart.scales['y-axis-0'].top + 10;
                   const copyHeight = myChart.options.scales['y-axis-0'].height + myChart.options.scales['y-axis-0'].top + 10;

                   targetCtx.scale(scale, scale);
                   targetCtx.canvas.width = copyWidth * scale;
                   targetCtx.canvas.height = copyHeight * scale;
                   targetCtx.canvas.style.width = copyWidth + 'px';
                   targetCtx.canvas.style.height = copyHeight + 'px';
                   targetCtx.drawImage(sourceCanvas, 0, 0, copyWidth * scale, copyHeight * scale, 0, 0, copyWidth * scale, copyHeight * scale);
                   sourceCtx.clearRect(0, 0, copyWidth, copyHeight);
                   this.rectangleSet = true;
                 }
               },
               onProgress: function () {
                 if (this.rectangleSet) {
                 //  var copyWidth = myChart.scales['y-axis-0'].width;
                   var copyWidth = myChart.options.scales['y-axis-0'].width;
                //   var copyHeight = myChart.scales['y-axis-0'].height + myChart.scales['y-axis-0'].top + 10;
                   var copyHeight = myChart.options.scales['y-axis-0'].height + myChart.options.scales['y-axis-0'].top + 10;
                   this.sourceCtx.clearRect(0, 0, copyWidth, copyHeight);
                 }
               },
             }
           },
          
        
         });


       
       
       
       
       
       });
      }




  message: string;

  receiveMessage($event) {
    this.message = $event
  }

  file: File;


  values: number[] = [233, 115, 130, 137];
  public codes = []; size: number = 0; public tonHandMonths = []; test: number = 0;
  public names = []; public description = []; public data;
  public onHandCost: number[]; public onHandData = [];
  public OpenOrderCost: number[];
  public cat = []; public recordsets = [];

  public shareData: string;




  constructor(private http: HttpClient, public PartsService: PartsService) {

    this.PartsService = PartsService;
    PartsService.getAllParts();
    PartsService.getOnHandCost();
    PartsService.getCategory();

    PartsService.postChosenCategory();

    var timeStamp = ["6 months", "1 year", "2 year"];

    this.PartsService.$isChosen.subscribe((data) => {
      console.log("In Child Component", data);
      console.log(data.category);


      PartsService.getChosenCategory(data.category).subscribe(
        res => {
          console.log(res);

          this.data = res.recordsets[0];
          this.size = Object.keys(res.recordsets[0]).length
          console.log(this.size);

          for (var i = 0; i < this.size; i++) {
            this.onHandCost[i] = this.data[i].totalOnHand
            this.tonHandMonths[i] = formatDate(this.data[i].Monthly, this.format, this.locale);

          }

          console.log(this.tonHandMonths);

          console.log(this.onHandCost);
          const formattedDate = formatDate(this.tonHandMonths[0], this.format, this.locale);

          var chart = new Chart('canvas', {


            // The type of chart we want to create
            type: 'bar',

            // The data for our dataset
            data: {
              labels: this.tonHandMonths,   //this.toonHandMonths

              datasets: [{

                label: 'COGSByCategory',
                backgroundColor: 'rgb(240,139,132)',
                data: [500, 1010, 805, 250, 230, 3056, 4535]

              },
              {
                label: 'OnhandCostByCategory',
                backgroundColor: 'rgb(48,124,207)',
                data: this.onHandCost
              },
              {
                label: 'OpenOrderCostByCategory',
                backgroundColor: 'rgb(160,219,179)',
                data: [230, 900, 450, 212, 200, 3230, 400]
              }
              ]
            },


            options: {
              responsive: true,
              scales: {
                yAxes: [
                  {

                    ticks: {
                      // Include a dollar sign in the ticks
                      callback: function (value, index, values) {
                        return '$' + value;
                      }

                    },
                    gridLines: {
                      lineWidth: 0
                    }
                  },
                ],
                xAxes: [
                  {
                    gridLines: {
                      lineWidth: 0
                    }
                  }
                ]
              },

              legend: { display: true },
              plugins: {
                datalabels:
                {
                  display: true,
                  anchor: 'end',
                  align: 'top',
                }
              }
            }



          });








          var data = {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [{
              label: "My First dataset",
              fillColor: "rgba(220,220,220,0.2)",
              strokeColor: "rgba(220,220,220,1)",
              pointColor: "rgba(220,220,220,1)",
              pointStrokeColor: "#fff",
              pointHighlightFill: "#fff",
              pointHighlightStroke: "rgba(220,220,220,1)",
              data: [65, 59, 80, 81, 56, 55, 40]
            },
            {
              label: "My Second dataset",
              fillColor: "rgba(151,187,205,0.2)",
              strokeColor: "rgba(151,187,205,1)",
              pointColor: "rgba(151,187,205,1)",
              pointStrokeColor: "#fff",
              pointHighlightFill: "#fff",
              pointHighlightStroke: "rgba(151,187,205,1)",
              data: [28, 48, 40, 19, 86, 27, 90]
            }
            ]
          };

  


          var myBarChart = new Chart("barChart", {
            type: 'horizontalBar',
            data: {
              labels: this.codes,
              datasets: [{

                label: 'TotalCOGS',
                backgroundColor: 'rgb(240,139,132)',
                data: [500, 1010, 805, 250, 230, 3056, 4535],
                barPercentage: 1.0

              },
              {
                label: 'AvgOnhandCost',
                backgroundColor: 'rgb(48,124,207)',
                data: [600, 101, 905, 25, 330, 956, 453],
                barPercentage: 1.0

              },
              {
                label: 'AvgOpenOrderCost',
                backgroundColor: 'rgb(160,219,179)',
                data: [230, 900, 450, 212, 200, 3230, 400],
                barPercentage: 1.0

              }
              ]
            },
            options: {
              responsive: true,

              scales: {
                yAxes: [

                  {
                    gridLines: {
                      lineWidth: 0
                    }
                  },

                ],
                xAxes: [
                  {

                    gridLines: {
                      lineWidth: 0,

                    }
                  }
                ]
              },
              maintainAspectRatio: false,
              legend: { display: true },
              plugins: {
                datalabels:
                {
                  display: true,
                  anchor: 'end',
                  align: 'top',
                }
              }
            }
          });



          var myPieChart = new Chart("doughnutChart2", {
            type: 'doughnut',
            data: {
              datasets: [{
                data: [10, 20],
                backgroundColor: ['rgb(160,219,179)', 'rgb(240,139,132)']
              }],

              // These labels appear in the legend and in the tooltips when hovering different arcs
              labels: [
                'Threshold',
                'ExcessCost',

              ]
            },
            options: {
              responsive: true,
              legend: { display: false },
              plugins: {
                datalabels:
                {
                  display: true,
                  anchor: 'end',
                  align: 'top',
                }
              }
            }
          });

          var chart = new Chart('canvas2', {
            // The type of chart we want to create
            type: 'bar',
      
      
            // The data for our dataset
            data: {
              labels: this.codes,   //this.SKUcodes
              datasets: [{
      
                label: 'COGSByCategory',
                backgroundColor: 'rgb(99, 255, 222)',
                borderColor: 'rgb(256, 99, 132)',
                data: [112, 130, 150, 200, 208, 230, 245]
      
              }
              ]
            },
      
      
            options: {
              responsive: true,
              scales: {
                yAxes: [
                  {
                    gridLines: {
                          lineWidth: 0
                      }
                  }
                ],
                xAxes : [
                  {
                    gridLines: {
                          lineWidth: 0
                      }
                  }
                ]
              },
              legend: { display: false },
              plugins: {
                datalabels:
                {
                  display: false,
                  anchor: 'end',
                  align: 'top',
                }
              }
            }
      
      
      
          });


          var myChart = new Chart("stackedBarChart", {
            type: 'horizontalBar',
            data: {
              labels:  this.codes,   //this.SKUcodes
              datasets: [{
                label: "Within",
                backgroundColor: 'rgb(160,219,179)',
                data: [7000, 5565, 3806, 5925, 5721, 6635, 14080, 9027, 25553],
                barPercentage: 1.0
              }, {
                label: "Excess Cost",
                backgroundColor: 'rgb(240,139,132)',
                data: [17724, 2565, 1506, 3625, 3721, 4635, 7080, 4027, 12553],
                barPercentage: 1.0
              },
              {
                label: "ThresholdCost",
                backgroundColor: 'rgb(160,219,179)',
                data: [8000, 6000, 4000, 500, 572, 6646, 140, 9043, 255],
                barPercentage: 1.0
              }]
            },
            options: {
              tooltips: {
                enabled: false
              },
              animation: {
                duration: 0,
                onComplete: function () {
                  if (this.data.datasets.length === 2) {
                    var ctx = this.chart.ctx;
                    ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, 'normal', Chart.defaults.global.defaultFontFamily);
                    ctx.fillStyle = this.chart.config.options.defaultFontColor;
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'bottom';
                    var firstDataSet = this.data.datasets[0];
                    var secondDataSet = this.data.datasets[1];
                    if (firstDataSet.length === secondDataSet.length) {
                      for (var i = 0; i < firstDataSet.data.length; i++) {
                        var firstModel = firstDataSet._meta[Object.keys(firstDataSet._meta)[0]].data[i]._model;
                        var secondModel = secondDataSet._meta[Object.keys(secondDataSet._meta)[0]].data[i]._model;
                        var total = firstDataSet.data[i] + secondDataSet.data[i];
                        if (firstDataSet.data[i] >= secondDataSet.data[i]) {
                          ctx.fillText((firstDataSet.data[i] * 100 / total).toFixed(2) + '%', firstModel.x, firstModel.y + 30);
                        } else {
                          ctx.fillText((secondDataSet.data[i] * 100 / total).toFixed(2) + '%', secondModel.x, secondModel.y + 30);
                        }
                      }
                    }
                  }
                }
              },
              scales: {
                yAxes: [{

                  gridLines: {
                    lineWidth: 0
                  },
                  ticks: {
                    beginAtZero: true
                  },
                  stacked: true,
                  
                }],
                xAxes: [{
                  gridLines: {
                    lineWidth: 0
                  },
                  stacked: true,
                }]
              },
              maintainAspectRatio: false,
              legend: { display: true },
            }
          });

          const sourceCanvas = this.sourceCanvasRef.nativeElement;
          const sourceCtx = sourceCanvas.getContext('2d');
          const targetCanvas = this.targetCanvasRef.nativeElement;
          const targetCtx = targetCanvas.getContext('2d');

          var myChart = new Chart(sourceCtx, {
            type: 'bar',

            data: {

              labels: this.tonHandMonths,   //this.toonHandMonths
              datasets: [{

                label: 'COGSByCategory',
                backgroundColor: 'rgb(240,139,132)',
                data: [500, 1010, 805, 250, 230, 3056, 4535]

              },
              {
                label: 'OnhandCostByCategory',
                backgroundColor: 'rgb(48,124,207)',
                data: this.onHandCost
              },
              {
                label: 'OpenOrderCostByCategory',
                backgroundColor: 'rgb(160,219,179)',
                data: [230, 900, 450, 212, 200, 3230, 400]
              }
              ]
            },
            options: {
              legend:
              {
                labels:
                {
                  fontSize:18
                }
              },
              responsive: true,
              scales: {
                xAxes: [{
                  gridLines: {
                    lineWidth: 0
                  }
                }],
                yAxes: [{
                  type: 'linear',
                  ticks: {
                    callback: function (value, index, values) {
                      return '$' + value;
                    }
                  },
                  gridLines: {
                    lineWidth: 0
                  }

                }],
              },
              animation: {
                onComplete: function () {
                  if (!this.rectangleSet) {
                    const scale = window.devicePixelRatio;
                  //  const copyWidth = myChart.scales['y-axis-0'].width - 10;
                    const copyWidth = myChart.options.scales['y-axis-0'].width - 10;
                  //  const copyHeight = myChart.scales['y-axis-0'].height + myChart.scales['y-axis-0'].top + 10;
                    const copyHeight = myChart.options.scales['y-axis-0'].height + myChart.options.scales['y-axis-0'].top + 10;

                    targetCtx.scale(scale, scale);
                    targetCtx.canvas.width = copyWidth * scale;
                    targetCtx.canvas.height = copyHeight * scale;
                    targetCtx.canvas.style.width = copyWidth + 'px';
                    targetCtx.canvas.style.height = copyHeight + 'px';
                    targetCtx.drawImage(sourceCanvas, 0, 0, copyWidth * scale, copyHeight * scale, 0, 0, copyWidth * scale, copyHeight * scale);
                    sourceCtx.clearRect(0, 0, copyWidth, copyHeight);
                    this.rectangleSet = true;
                  }
                },
                onProgress: function () {
                  if (this.rectangleSet) {
                  //  var copyWidth = myChart.scales['y-axis-0'].width;
                    var copyWidth = myChart.options.scales['y-axis-0'].width;
                 //   var copyHeight = myChart.scales['y-axis-0'].height + myChart.scales['y-axis-0'].top + 10;
                    var copyHeight = myChart.options.scales['y-axis-0'].height + myChart.options.scales['y-axis-0'].top + 10;
                    this.sourceCtx.clearRect(0, 0, copyWidth, copyHeight);
                  }
                },
              }
            },
           
         
          });



          var mixedChart = new Chart("mixedChart2", {
            type: 'bar',
            data: {
              labels: ["Curr mth", "Last 2", "Last 3", "Last 4", "Last 5", "Last 6"],
              datasets: [{

                type: "line",
                borderColor: "#eb4034",
                data: [408, 547, 675, 734, 320, 832],
                label: "TargetIP(Qty)",
                fill: false
              }, {

                type: "line",
                borderColor: "#ebe534",
                data: [133, 221, 783, 1200, 2300, 3640],
                label: "Turns",
                fill: false
              },
              {

                type: "bar",
                backgroundColor: "rgb(51,129,184)",
                label: "OnHand(Qty)",
                data: [408, 547, 675, 734, 234, 443],
              }, {

                type: "bar",
                backgroundColor: "rgb(103,189,32)",
                label: "Open Order(Qty)",
                data: [133, 221, 783, 2478, 2345, 653]
              },

              ]
            },
            options: {
              scales:
              {
                xAxes: [{ stacked: true }],
                yAxes: [{ stacked: true },
                {
                  id: 'first-y-axis',
                  type: 'linear',
                  position: 'right',
                },
                ]
              },
              title: {
                display: false,
                text: 'Performance History'
              },  
              legend: { display: true , labels:{fontSize:18} }
            }
          });

          var mixedChart = new Chart("line2", {
            type: 'bubble',
            data: {
              labels: ["Sep-17", "Oct-17", "Nov-17", "Dec-17", "Jan-18", "Feb-18"],
              datasets: [{


                data: [
                  { x: 10, y: 10, r: 10 },
                  { x: 15, y: 5, r: 15 },
                  { x: 26, y: 12, r: 23 },
                  { x: 70, y: 13, r: 8 },
                ],
                label: 'Inventory turns',
                backgroundColor: 'green',
                borderColor: 'blue',
                hoverBackgroundColor: 'purple',
                hoverBorderColor: 'red',
              },


              ]
            },
            options: {
              scales:
              {
                xAxes: [
                  {
                    stacked: true,
                    gridLines: { lineWidth: 0 }
                  }

                ],
                yAxes: [{
                  stacked: true,
                  gridLines: { lineWidth: 0 }
                }]
              },
              title: {
                display: false,
                text: 'Performance History'
              },
              legend: { display: false , labels:{
                fontSize:18
              } }
            }
          });


          var mixedChart = new Chart("mixedChart", {
            type: 'bar',
            data: {
              labels: ["Sep-17", "Oct-17", "Nov-17", "Dec-17", "Jan-18", "Feb-18"],
              datasets: [{

                type: "line",
                borderColor: "#eb4034",
                data: [408, 820, 675, 732, 650, 832],
                fill: false
              },
              ]
            },
            options: {
              title: {
                display: false,
                text: 'Performance History'
              },
              legend: { display: false }
            }
          });

        }
      );


    })






    this.data = PartsService.data;
    this.codes = PartsService.code;
    this.names = PartsService.name;

    this.onHandCost = PartsService.tonHand;
    this.OpenOrderCost = PartsService.openOrderCost;
    this.tonHandMonths = PartsService.tonHandMonth;
    this.onHandData = PartsService.onHandData;

    this.description = PartsService.description;

    this.cat = PartsService.cat;


    console.log(this.cat);



    console.log(this.codes)
    console.log(this.onHandCost)

    console.log(this.onHandData);



    console.log(typeof this.onHandData)

    console.log(this.test);
    this.shareData = this.PartsService.getData();





  }




  ngOnInit(): void {

  


  }

}

