import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import * as Chart from 'chart.js';
import { flatMap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PartsService } from '../parts.service';
import { stringToKeyValue } from '@angular/flex-layout/extended/typings/style/style-transforms';
import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { formatDate } from '@angular/common';






@Component({
  selector: 'app-excess-inventory',
  templateUrl: './excess-inventory.component.html',
  styleUrls: ['./excess-inventory.component.css'],
})
export class ExcessInventoryComponent implements OnInit {

  public timeStamp = ["6 months", "1 year", "2 year"]
  format = 'MMM/yyyy';
  locale = 'en-US';

  
  @Output('change') change = new EventEmitter();

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
  public cat = []; public recordsets = []; public chosenTime;
  public time = ""; public newVal ; 
  public shareData: string;

  //public timeOnhandCost: number [];
  //public timetonHandMonths = [];



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
        
        
        
        
        
        });
  
   // })




  

    // this.PartsService.getTimeStamp(newVal).subscribe(
    //   res => {
    //     console.log(res);

    //     this.data = res.recordsets[0];
    //     this.size = Object.keys(res.recordsets[0]).length
    //     console.log(this.size);

    //     for (var i = 0; i < this.size; i++) {
    //       this.onHandCost[i] = this.data[i].totalOnHand
    //       this.tonHandMonths[i] = this.data[i].Monthly

    //     }

    //     console.log(this.tonHandMonths);

    //     console.log(this.onHandCost); 

    //     var chart = new Chart('canvas', {


    //       // The type of chart we want to create
    //       type: 'bar',


    //       // The data for our dataset
    //       data: {
    //         labels: this.tonHandMonths,   //this.toonHandMonths

    //         datasets: [{

    //           label: 'COGSByCategory',
    //           backgroundColor: 'rgb(240,139,132)',
    //           data: [500, 1010, 805, 250, 230, 3056, 4535]

    //         },
    //         {
    //           label: 'OnhandCostByCategory',
    //           backgroundColor: 'rgb(48,124,207)',
    //           data: this.onHandCost
    //         },
    //         {
    //           label: 'OpenOrderCostByCategory',
    //           backgroundColor: 'rgb(160,219,179)',
    //           data: [230, 900, 450, 212, 200, 3230, 400]
    //         }
    //         ]
    //       },


    //       options: {
    //         responsive: true,
    //         scales: {
    //           yAxes: [
    //             {
    //               gridLines: {
    //                 lineWidth: 0
    //               }
    //             }
    //           ],
    //           xAxes: [
    //             {
    //               gridLines: {
    //                 lineWidth: 0
    //               }
    //             }
    //           ]
    //         },

    //         legend: { display: true },
    //         plugins: {
    //           datalabels:
    //           {
    //             display: true,
    //             anchor: 'end',
    //             align: 'top',
    //           }
    //         }
    //       }



    //     });

    //   }
    // );

    // this.http.post("http://192.168.1.84:5000/OnHandLoadedCost" || "/api/OnHandLoadedCost", { newVal }).subscribe(

    //   res => {


    //   //this.data = res.recordsets[0];
    //  //  this.size = Object.keys(res.recordsets[0]).length
    //       console.log(this.size);

    //      console.log(res);

    //       for (var i = 0; i < 6; i++) {
    //         this.onHandCost[i] = this.data[i].totalOnHand
    //         this.tonHandMonths[i] = this.data[i].Monthly

    //       }

    //       console.log(this.tonHandMonths);

    //       console.log(this.onHandCost);



    // var chart = new Chart('canvas2', {


    //   // The type of chart we want to create
    //   type: 'bar',


    //   // The data for our dataset
    //   data: {
    //     labels: [ "SKU1001" ,"SKU1002" , "SKU1003" , "SKU1004","SKU1005", "SKU1006"],   //this.SKUcodes

    //     datasets: [{

    //       label: 'ExcessCost',
    //       backgroundColor: 'rgb(240,139,132)',
    //       data: [500, 1010, 805, 250, 230, 3056, 4535]

    //     },
    //     ]
    //   },


    //   options: {
    //     responsive: true,
    //     legend: { display: true },
    //     plugins: {
    //       datalabels:
    //       {
    //         display: true,
    //         anchor: 'end',
    //         align: 'top',
    //       }
    //     }
    //   }



    // });

    //     var mixedChart = new Chart("line", {
    //       type: 'bar',
    //           data: {
    //             labels: ["17-Sep", "24-Sep", "1-Oct", "8-Oct","15-Oct","15-Oct"],
    //             datasets: [{

    //                 type: "line",
    //                 borderColor: "#eb4034",
    //                 data: [408,547,675,734,320,832],
    //                 fill: false,
    //                 yAxisID: 'first-y-axis'
    //               }, 
    //               {

    //                 type: "bar",
    //                 backgroundColor: "rgb(51,129,184)",
    //                 data: [800,700,675,734,450,1000],
    //                 yAxisID: 'second-y-axis'
    //               }, 

    //             ]
    //           },
    //           options: {
    //             scales:
    //             {
    //               xAxes:[{stacked:true}],
    //               yAxes:[
    //                 {   
    //                   id: 'first-y-axis',
    //                   type: 'linear',
    //                   position: 'right',},
    //                 {
    //                   id: 'second-y-axis',
    //                   type: 'linear',
    //                   position: 'left',
    //                 }]
    //             },
    //             title: {
    //               display: false,
    //               text: 'Performance History'
    //             },
    //             legend: { display: false }
    //           }
    //       });


    //       var rectangleSet = false;
    //   var myBarChart = new Chart("barChart", {

    //     type: 'horizontalBar',
    //     data: {
    //       labels: [ "SKU1001" ,"SKU1002" , "SKU1003" , "SKU1004","SKU1005", "SKU1006","SKU1001" ,"SKU1002" , "SKU1003" , "SKU1004","SKU1005", "SKU1006"],   //this.SKUcodes

    //       datasets: [{

    //         label: 'TotalCOGS',
    //         backgroundColor: 'rgb(240,139,132)',
    //         data: [500, 1010, 805, 250, 230, 3056, 4535,500, 1010, 805, 250, 230, 3056, 4535]

    //       },
    //       {
    //         label: 'AvgOnhandCost',
    //         backgroundColor: 'rgb(48,124,207)',
    //         data: [600, 101, 905, 25, 330, 956, 453,600, 101, 905, 25, 330, 956, 453]
    //       },
    //       {
    //         label: 'AvgOpenOrderCost',
    //         backgroundColor: 'rgb(160,219,179)',
    //         data: [230, 900, 450, 212, 200, 3230, 400,230, 900, 450, 212, 200, 3230, 400]
    //       }
    //       ]
    //     },
    //     options:  {

    //     }
    // });

    // var myPieChart = new Chart("pieChart", {
    //   type: 'pie',
    //   data: {
    //     labels: ['COGSByCategory',
    //             'OnhandCostByCategory',
    //             'OpenOrderCostByCategory'],

    //     datasets: [{

    //       backgroundColor: 'rgb(99, 255, 222)',
    //       borderColor: 'rgb(256, 99, 132)',
    //       data: [500, 1010, 805, 250, 230, 3056, 4535]

    //     },
    //     {
    //       backgroundColor: 'rgb(255, 99, 132)',
    //       borderColor: 'rgb(255, 99, 132)',
    //       data: [300, 500, 900, 350, 100, 600, 456]
    //     },
    //     {

    //       backgroundColor: 'rgb(51, 209, 255)',
    //       borderColor: 'rgb(256, 99, 132)',
    //       data: [230, 900, 450, 212, 200, 3230, 400]
    //     }
    //     ]
    //   },
    //   options:  {
    //     responsive: true,
    //     legend: { display: true },
    //     plugins: {
    //       datalabels:
    //       {
    //         display: true,
    //         anchor: 'end',
    //         align: 'top',
    //       }
    //     }
    //   }
    // });


    // var myPieChart = new Chart("doughnutChart", {
    // type: 'doughnut',
    // data : {
    //   datasets: [{
    //       data: [10, 20],
    //       backgroundColor: [ 'rgb(132,202,240)', 'rgb(255,255,0)']
    //   }],

    //   // These labels appear in the legend and in the tooltips when hovering different arcs
    //   labels: [
    //       'OnhandCost',
    //       'OpenOrderCost',

    //   ]
    // },
    // options:  {
    //   responsive: true,
    //   legend: { display: false },
    //   plugins: {
    //     datalabels:
    //     {
    //       display: true,
    //       anchor: 'end',
    //       align: 'top',
    //     }
    //   }
    // }
    // });


    // var myPieChart = new Chart("doughnutChart2", {
    // type: 'doughnut',
    // data : {
    // datasets: [{
    //     data: [10, 20],
    //     backgroundColor: [ 'rgb(160,219,179)', 'rgb(240,139,132)']
    // }],

    // // These labels appear in the legend and in the tooltips when hovering different arcs
    // labels: [
    //     'Threshold',
    //     'ExcessCost',

    // ]
    // },
    // options:  {
    // responsive: true,
    // legend: { display: false },
    // plugins: {
    //   datalabels:
    //   {
    //     display: true,
    //     anchor: 'end',
    //     align: 'top',
    //   }
    // }
    // }
    // });


    // var myChart = new Chart("stackedBarChart", {
    // type: 'horizontalBar',
    // data: {
    // labels: [ "SKU1001" ,"SKU1002" , "SKU1003" , "SKU1004","SKU1005", "SKU1006"],   //this.SKUcodes
    // datasets: [{
    //       label : "Within",
    //       backgroundColor: 'rgb(160,219,179)',
    //       data: [7000, 5565, 3806, 5925, 5721, 6635, 14080, 9027, 25553]
    //   }, {
    //       label : "Excess Cost",
    //       backgroundColor: 'rgb(240,139,132)',
    //       data: [17724, 2565, 1506, 3625, 3721, 4635, 7080, 4027, 12553]
    //       //data: [17, 1, 18, 14, 3, 1, 5, 10, 1]
    //   },
    //   {
    //     label : "ThresholdCost",
    //     backgroundColor: 'rgb(160,219,179)',
    //     data: [8000, 6000, 4000, 500, 572, 6646, 140, 9043, 255],
    //     barThickness : 10
    // }]
    // },
    // options: {
    //   tooltips: {
    //       enabled: false
    //   },
    //   animation: {
    //       duration: 0,
    //       onComplete: function() {
    //           if (this.data.datasets.length === 2) {
    //               var ctx = this.chart.ctx;
    //               ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, 'normal', Chart.defaults.global.defaultFontFamily);
    //               ctx.fillStyle = this.chart.config.options.defaultFontColor;
    //               ctx.textAlign = 'center';
    //               ctx.textBaseline = 'bottom';
    //               var firstDataSet = this.data.datasets[0];
    //               var secondDataSet = this.data.datasets[1];
    //               if (firstDataSet.length === secondDataSet.length) {
    //                   for (var i = 0; i < firstDataSet.data.length; i++) {
    //                       var firstModel = firstDataSet._meta[Object.keys(firstDataSet._meta)[0]].data[i]._model;
    //                       var secondModel = secondDataSet._meta[Object.keys(secondDataSet._meta)[0]].data[i]._model;
    //                       var total = firstDataSet.data[i] + secondDataSet.data[i];
    //                       if (firstDataSet.data[i] >= secondDataSet.data[i]) {
    //                           ctx.fillText((firstDataSet.data[i] * 100 / total).toFixed(2) + '%', firstModel.x, firstModel.y + 30);
    //                       }else{
    //                           ctx.fillText((secondDataSet.data[i] * 100 / total).toFixed(2) + '%', secondModel.x, secondModel.y + 30);
    //                       }
    //                   }
    //               }
    //           }
    //       }
    //   },
    //   scales: {
    //       yAxes: [{
    //           ticks: {
    //               beginAtZero: true
    //           },
    //           stacked: true
    //       }],
    //       xAxes: [{
    //           stacked: true,
    //       }]
    //   }
    // }
    // });


    // var mixedChart = new Chart("mixedChart", {
    // type: 'bar',
    // data: {
    //   datasets: [{
    //       label: 'Bar Dataset',
    //       data: [10, 20, 30, 40],
    //       // this dataset is drawn below
    //       order: 1,
    //       backgroundColor: 'rgba(97, 188, 109, 0.2)',
    //       borderColor: 'rgba(97, 188, 109, .8)'
    //   }, {
    //       label: 'Line Dataset',
    //       data: [10, 50, 30, 60],
    //       type: 'line',
    //       // this dataset is drawn on top
    //       order: 2,
    //       backgroundColor: 'rgba(236, 107, 86, 0.2)',
    //       borderColor: 'rgba(236, 107, 86, .8)'
    //   }],
    //   labels: ['January', 'February', 'March', 'April']
    // },

    // });

    // var mixedChart = new Chart("mixedChart2", {
    // type: 'bar',
    //     data: {
    //       labels: ["Curr mth", "Last 2", "Last 3", "Last 4","Last 5","Last 6"],
    //       datasets: [{

    //           type: "line",
    //           borderColor: "#eb4034",
    //           data: [408,547,675,734,320,832],
    //           label:"TargetIP(Qty)",
    //           fill: false
    //         }, {

    //           type: "line",
    //           borderColor: "#ebe534",
    //           data: [133,221,783,1200,2300,3640],
    //           label:"Turns",
    //           fill: false
    //         },
    //         {

    //           type: "bar",
    //           backgroundColor: "rgb(51,129,184)",
    //           label:"OnHand(Qty)",
    //           data: [408,547,675,734,234,443],
    //         }, {

    //           type: "bar",
    //           backgroundColor: "rgb(103,189,32)",
    //           label:"Open Order(Qty)",
    //           data: [133,221,783,2478,2345,653]
    //         },

    //       ]
    //     },
    //     options: {
    //       scales:
    //       {
    //         xAxes:[{stacked:true}],
    //         yAxes:[{stacked:true},
    //             {   
    //               id: 'first-y-axis',
    //               type: 'linear',
    //               position: 'right',},
    //         ]
    //       },
    //       title: {
    //         display: false,
    //         text: 'Performance History'
    //       },
    //       legend: { display: true }
    //     }
    // });

    // var mixedChart = new Chart("line2", {
    //   type: 'bubble',
    //       data: {
    //         labels:  ["Sep-17", "Oct-17", "Nov-17", "Dec-17","Jan-18","Feb-18"],
    //         datasets: [{


    //           data: [
    //             { x: 10, y: 10, r: 10 },
    //             { x: 15, y: 5, r: 15 },
    //             { x: 26, y: 12, r: 23 },
    //             { x: 70, y: 13 , r: 8 },
    //           ],
    //           label: 'Inventory turns',
    //           backgroundColor: 'green',
    //           borderColor: 'blue',
    //           hoverBackgroundColor: 'purple',
    //           hoverBorderColor: 'red',
    //           }, 


    //         ]
    //       },
    //       options: {
    //         scales:
    //         {
    //           xAxes:[{stacked:true}],
    //           yAxes:[{stacked:true}]
    //         },
    //         title: {
    //           display: false,
    //           text: 'Performance History'
    //         },
    //         legend: { display: false }
    //       }
    //   });


    // var mixedChart = new Chart("mixedChart", {
    //   type: 'bar',
    //       data: {
    //         labels: ["Sep-17", "Oct-17", "Nov-17", "Dec-17","Jan-18","Feb-18"],
    //         datasets: [{

    //             type: "line",
    //             borderColor: "#eb4034",
    //             data: [408,820,675,732,650,832],
    //             fill: false
    //           },         
    //         ]
    //       },
    //       options: {
    //         title: {
    //           display: false,
    //           text: 'Performance History'
    //         },
    //         legend: { display: false }
    //       }
    //   });




    //   },

    //   err => {
    //     console.log('err:' + err);
    //   }

    // );

   // console.log(newVal);





  }

  constructor(private http: HttpClient, public PartsService: PartsService) {

    this.PartsService = PartsService;
    PartsService.getAllParts();
    PartsService.getOnHandCost();
    PartsService.getCategory();

    PartsService.postChosenCategory();
    //this.PartsService.timestamp(this.newVal);
    

 
    this.PartsService.$isTimeStamp.subscribe((data) => {
      console.log("In Child Component for Time Stamp", data);
      console.log(data);
   
    })

    this.PartsService.$isChosen.subscribe((data) => {
      console.log("In Child Component", data);
      console.log(data.category);

      this.PartsService.$isTimeStamp.subscribe((data) => {
        console.log("In Child Component for Time Stamp", data);
        console.log(data);
     
      })

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

          console.log(this.onHandCost); });


          
      // PartsService.getTimeStamp(data.category,this.chosenTime).subscribe(
      //   res => {
      //     console.log(res);

      //     this.data = res.recordsets[0];
      //     this.size = Object.keys(res.recordsets[0]).length
      //     console.log(this.size);

      //     for (var i = 0; i < this.size; i++) {
      //       this.onHandCost[i] = this.data[i].totalOnHand
      //       this.tonHandMonths[i] = this.data[i].Monthly

      //     }

      //     console.log(this.tonHandMonths);

      //     console.log(this.onHandCost); });

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


          var chart = new Chart('canvas2', {


            // The type of chart we want to create
            type: 'bar',


            // The data for our dataset
            data: {
              labels: this.codes,  //this.SKUcodes

              datasets: [{

                label: 'ExcessCost',
                backgroundColor: 'rgb(240,139,132)',
                data: [500, 1010, 805, 250, 230, 3056, 4535]

              },
              ]
            },


            options: {
              responsive: true,
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

          var mixedChart = new Chart("line", {
            type: 'bar',
            data: {
              labels: ["17-Sep", "24-Sep", "1-Oct", "8-Oct", "15-Oct", "15-Oct"],
              datasets: [{

                type: "line",
                borderColor: "#eb4034",
                data: [408, 547, 675, 734, 320, 832],
                fill: false,
                yAxisID: 'first-y-axis'
              },
              {

                type: "bar",
                backgroundColor: "rgb(51,129,184)",
                data: [800, 700, 675, 734, 450, 1000],
                yAxisID: 'second-y-axis'
              },

              ]
            },
            options: {
              scales:
              {
                xAxes: [{ stacked: true, gridLines: { lineWidth: 0 } },

                ],
                yAxes: [
                  {
                    id: 'first-y-axis',
                    type: 'linear',
                    position: 'right',
                    gridLines: { lineWidth: 0 },
                  },
                  {
                    id: 'second-y-axis',
                    type: 'linear',
                    position: 'left',
                    gridLines: { lineWidth: 0 },
                  }]
              },
              title: {
                display: false,
                text: 'Performance History'
              },
              legend: { display: false }
            }
          });




          var chartTest = new Chart("barChart", {
            type: 'horizontalBar',
            data: {
              labels: this.codes,   //this.SKUcodes

              datasets: [{

                label: 'TotalCOGS',
                backgroundColor: 'rgb(240,139,132)',
                data: [500, 1010, 805, 250, 230, 3056, 4535]

              },
              {
                label: 'AvgOnhandCost',
                backgroundColor: 'rgb(48,124,207)',
                data: [600, 101, 905, 25, 330, 956, 453]
              },
              {
                label: 'AvgOpenOrderCost',
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




          var myPieChart = new Chart("pieChart", {
            type: 'pie',
            data: {
              labels: ['COGSByCategory',
                'OnhandCostByCategory',
                'OpenOrderCostByCategory'],

              datasets: [{

                backgroundColor: 'rgb(99, 255, 222)',
                borderColor: 'rgb(256, 99, 132)',
                data: [500, 1010, 805, 250, 230, 3056, 4535]

              },
              {
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: [300, 500, 900, 350, 100, 600, 456]
              },
              {

                backgroundColor: 'rgb(51, 209, 255)',
                borderColor: 'rgb(256, 99, 132)',
                data: [230, 900, 450, 212, 200, 3230, 400]
              }
              ]
            },
            options: {
              responsive: true,
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


          var myPieChart = new Chart("doughnutChart", {
            type: 'doughnut',
            data: {
              datasets: [{
                data: [10, 20],
                backgroundColor: ['rgb(132,202,240)', 'rgb(255,255,0)']
              }],

              // These labels appear in the legend and in the tooltips when hovering different arcs
              labels: [
                'OnhandCost',
                'OpenOrderCost',

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


          var myChart = new Chart("stackedBarChart", {
            type: 'horizontalBar',
            data: {
              labels: this.codes,   //this.SKUcodes
              datasets: [{
                label: "Within",
                backgroundColor: 'rgb(160,219,179)',
                data: [7000, 5565, 3806, 5925, 5721, 6635, 14080, 9027, 25553]
              }, {
                label: "Excess Cost",
                backgroundColor: 'rgb(240,139,132)',
                data: [17724, 2565, 1506, 3625, 3721, 4635, 7080, 4027, 12553]
                //data: [17, 1, 18, 14, 3, 1, 5, 10, 1]
              },
              {
                label: "ThresholdCost",
                backgroundColor: 'rgb(160,219,179)',
                data: [8000, 6000, 4000, 500, 572, 6646, 140, 9043, 255],
                barThickness: 10
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
                  ticks: {
                    beginAtZero: true
                  },
                  stacked: true,
                  gridLines: {
                    lineWidth: 0
                  }
                }],
                xAxes: [{
                  stacked: true,
                  gridLines: {
                    lineWidth: 0
                  }
                }]
              }
            }
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
                xAxes: [{ stacked: true, gridLines: { lineWidth: 0 } },
                ],
                yAxes: [{ stacked: true, gridLines: { lineWidth: 0 } },
                {
                  id: 'first-y-axis',
                  type: 'linear',
                  position: 'right',
                  gridLines: { lineWidth: 0 }
                },
                ]
              },
              title: {
                display: false,
                text: 'Performance History'
              },
              legend: { display: true }
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
              legend: { display: false }
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
              legend: { display: false }
            }
          //});

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



    //     var chart = new Chart('canvas2', {


    //       // The type of chart we want to create
    //       type: 'bar',


    //       // The data for our dataset
    //       data: {
    //         labels: [ "SKU1001" ,"SKU1002" , "SKU1003" , "SKU1004","SKU1005", "SKU1006"],   //this.SKUcodes

    //         datasets: [{

    //           label: 'ExcessCost',
    //           backgroundColor: 'rgb(240,139,132)',
    //           data: [500, 1010, 805, 250, 230, 3056, 4535]

    //         },
    //         ]
    //       },


    //       options: {
    //         responsive: true,
    //         legend: { display: true },
    //         plugins: {
    //           datalabels:
    //           {
    //             display: true,
    //             anchor: 'end',
    //             align: 'top',
    //           }
    //         }
    //       }



    //     });

    //     var mixedChart = new Chart("line", {
    //       type: 'bar',
    //           data: {
    //             labels: ["17-Sep", "24-Sep", "1-Oct", "8-Oct","15-Oct","15-Oct"],
    //             datasets: [{

    //                 type: "line",
    //                 borderColor: "#eb4034",
    //                 data: [408,547,675,734,320,832],
    //                 fill: false,
    //                 yAxisID: 'first-y-axis'
    //               }, 
    //               {

    //                 type: "bar",
    //                 backgroundColor: "rgb(51,129,184)",
    //                 data: [800,700,675,734,450,1000],
    //                 yAxisID: 'second-y-axis'
    //               }, 

    //             ]
    //           },
    //           options: {
    //             scales:
    //             {
    //               xAxes:[{stacked:true}],
    //               yAxes:[
    //                 {   
    //                   id: 'first-y-axis',
    //                   type: 'linear',
    //                   position: 'right',},
    //                 {
    //                   id: 'second-y-axis',
    //                   type: 'linear',
    //                   position: 'left',
    //                 }]
    //             },
    //             title: {
    //               display: false,
    //               text: 'Performance History'
    //             },
    //             legend: { display: false }
    //           }
    //       });




    //   var chartTest = new Chart("barChart", {
    //     type: 'horizontalBar',
    //     data: {
    //       labels: [ "SKU1001" ,"SKU1002" , "SKU1003" , "SKU1004","SKU1005", "SKU1006"],   //this.SKUcodes

    //       datasets: [{

    //         label: 'TotalCOGS',
    //         backgroundColor: 'rgb(240,139,132)',
    //         data: [500, 1010, 805, 250, 230, 3056, 4535]

    //       },
    //       {
    //         label: 'AvgOnhandCost',
    //         backgroundColor: 'rgb(48,124,207)',
    //         data: [600, 101, 905, 25, 330, 956, 453]
    //       },
    //       {
    //         label: 'AvgOpenOrderCost',
    //         backgroundColor: 'rgb(160,219,179)',
    //         data: [230, 900, 450, 212, 200, 3230, 400]
    //       }
    //       ]
    //     },
    //     options:  {
    //       responsive: true,
    //       maintainAspectRatio:false,
    //       legend: { display: true },
    //       plugins: {
    //         datalabels:
    //         {
    //           display: true,
    //           anchor: 'end',
    //           align: 'top',
    //         }
    //       }
    //     }
    // });




    // var myPieChart = new Chart("pieChart", {
    //   type: 'pie',
    //   data: {
    //     labels: ['COGSByCategory',
    //             'OnhandCostByCategory',
    //             'OpenOrderCostByCategory'],

    //     datasets: [{

    //       backgroundColor: 'rgb(99, 255, 222)',
    //       borderColor: 'rgb(256, 99, 132)',
    //       data: [500, 1010, 805, 250, 230, 3056, 4535]

    //     },
    //     {
    //       backgroundColor: 'rgb(255, 99, 132)',
    //       borderColor: 'rgb(255, 99, 132)',
    //       data: [300, 500, 900, 350, 100, 600, 456]
    //     },
    //     {

    //       backgroundColor: 'rgb(51, 209, 255)',
    //       borderColor: 'rgb(256, 99, 132)',
    //       data: [230, 900, 450, 212, 200, 3230, 400]
    //     }
    //     ]
    //   },
    //   options:  {
    //     responsive: true,
    //     legend: { display: true },
    //     plugins: {
    //       datalabels:
    //       {
    //         display: true,
    //         anchor: 'end',
    //         align: 'top',
    //       }
    //     }
    //   }
    // });


    // var myPieChart = new Chart("doughnutChart", {
    // type: 'doughnut',
    // data : {
    //   datasets: [{
    //       data: [10, 20],
    //       backgroundColor: [ 'rgb(132,202,240)', 'rgb(255,255,0)']
    //   }],

    //   // These labels appear in the legend and in the tooltips when hovering different arcs
    //   labels: [
    //       'OnhandCost',
    //       'OpenOrderCost',

    //   ]
    // },
    // options:  {
    //   responsive: true,
    //   legend: { display: false },
    //   plugins: {
    //     datalabels:
    //     {
    //       display: true,
    //       anchor: 'end',
    //       align: 'top',
    //     }
    //   }
    // }
    // });


    // var myPieChart = new Chart("doughnutChart2", {
    // type: 'doughnut',
    // data : {
    // datasets: [{
    //     data: [10, 20],
    //     backgroundColor: [ 'rgb(160,219,179)', 'rgb(240,139,132)']
    // }],

    // // These labels appear in the legend and in the tooltips when hovering different arcs
    // labels: [
    //     'Threshold',
    //     'ExcessCost',

    // ]
    // },
    // options:  {
    // responsive: true,
    // legend: { display: false },
    // plugins: {
    //   datalabels:
    //   {
    //     display: true,
    //     anchor: 'end',
    //     align: 'top',
    //   }
    // }
    // }
    // });


    // var myChart = new Chart("stackedBarChart", {
    // type: 'horizontalBar',
    // data: {
    // labels: [ "SKU1001" ,"SKU1002" , "SKU1003" , "SKU1004","SKU1005", "SKU1006"],   //this.SKUcodes
    // datasets: [{
    //       label : "Within",
    //       backgroundColor: 'rgb(160,219,179)',
    //       data: [7000, 5565, 3806, 5925, 5721, 6635, 14080, 9027, 25553]
    //   }, {
    //       label : "Excess Cost",
    //       backgroundColor: 'rgb(240,139,132)',
    //       data: [17724, 2565, 1506, 3625, 3721, 4635, 7080, 4027, 12553]
    //       //data: [17, 1, 18, 14, 3, 1, 5, 10, 1]
    //   },
    //   {
    //     label : "ThresholdCost",
    //     backgroundColor: 'rgb(160,219,179)',
    //     data: [8000, 6000, 4000, 500, 572, 6646, 140, 9043, 255],
    //     barThickness : 10
    // }]
    // },
    // options: {
    //   tooltips: {
    //       enabled: false
    //   },
    //   animation: {
    //       duration: 0,
    //       onComplete: function() {
    //           if (this.data.datasets.length === 2) {
    //               var ctx = this.chart.ctx;
    //               ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, 'normal', Chart.defaults.global.defaultFontFamily);
    //               ctx.fillStyle = this.chart.config.options.defaultFontColor;
    //               ctx.textAlign = 'center';
    //               ctx.textBaseline = 'bottom';
    //               var firstDataSet = this.data.datasets[0];
    //               var secondDataSet = this.data.datasets[1];
    //               if (firstDataSet.length === secondDataSet.length) {
    //                   for (var i = 0; i < firstDataSet.data.length; i++) {
    //                       var firstModel = firstDataSet._meta[Object.keys(firstDataSet._meta)[0]].data[i]._model;
    //                       var secondModel = secondDataSet._meta[Object.keys(secondDataSet._meta)[0]].data[i]._model;
    //                       var total = firstDataSet.data[i] + secondDataSet.data[i];
    //                       if (firstDataSet.data[i] >= secondDataSet.data[i]) {
    //                           ctx.fillText((firstDataSet.data[i] * 100 / total).toFixed(2) + '%', firstModel.x, firstModel.y + 30);
    //                       }else{
    //                           ctx.fillText((secondDataSet.data[i] * 100 / total).toFixed(2) + '%', secondModel.x, secondModel.y + 30);
    //                       }
    //                   }
    //               }
    //           }
    //       }
    //   },
    //   scales: {
    //       yAxes: [{
    //           ticks: {
    //               beginAtZero: true
    //           },
    //           stacked: true
    //       }],
    //       xAxes: [{
    //           stacked: true,
    //       }]
    //   }
    // }
    // });


    // var mixedChart = new Chart("mixedChart2", {
    // type: 'bar',
    //     data: {
    //       labels: ["Curr mth", "Last 2", "Last 3", "Last 4","Last 5","Last 6"],
    //       datasets: [{

    //           type: "line",
    //           borderColor: "#eb4034",
    //           data: [408,547,675,734,320,832],
    //           label:"TargetIP(Qty)",
    //           fill: false
    //         }, {

    //           type: "line",
    //           borderColor: "#ebe534",
    //           data: [133,221,783,1200,2300,3640],
    //           label:"Turns",
    //           fill: false
    //         },
    //         {

    //           type: "bar",
    //           backgroundColor: "rgb(51,129,184)",
    //           label:"OnHand(Qty)",
    //           data: [408,547,675,734,234,443],
    //         }, {

    //           type: "bar",
    //           backgroundColor: "rgb(103,189,32)",
    //           label:"Open Order(Qty)",
    //           data: [133,221,783,2478,2345,653]
    //         },

    //       ]
    //     },
    //     options: {
    //       scales:
    //       {
    //         xAxes:[{stacked:true}],
    //         yAxes:[{stacked:true},
    //             {   
    //               id: 'first-y-axis',
    //               type: 'linear',
    //               position: 'right',},
    //         ]
    //       },
    //       title: {
    //         display: false,
    //         text: 'Performance History'
    //       },
    //       legend: { display: true }
    //     }
    // });

    // var mixedChart = new Chart("line2", {
    //   type: 'bubble',
    //       data: {
    //         labels:  ["Sep-17", "Oct-17", "Nov-17", "Dec-17","Jan-18","Feb-18"],
    //         datasets: [{


    //           data: [
    //             { x: 10, y: 10, r: 10 },
    //             { x: 15, y: 5, r: 15 },
    //             { x: 26, y: 12, r: 23 },
    //             { x: 70, y: 13 , r: 8 },
    //           ],
    //           label: 'Inventory turns',
    //           backgroundColor: 'green',
    //           borderColor: 'blue',
    //           hoverBackgroundColor: 'purple',
    //           hoverBorderColor: 'red',
    //           }, 


    //         ]
    //       },
    //       options: {
    //         scales:
    //         {
    //           xAxes:[{stacked:true}],
    //           yAxes:[{stacked:true}]
    //         },
    //         title: {
    //           display: false,
    //           text: 'Performance History'
    //         },
    //         legend: { display: false }
    //       }
    //   });


    // var mixedChart = new Chart("mixedChart", {
    //   type: 'bar',
    //       data: {
    //         labels: ["Sep-17", "Oct-17", "Nov-17", "Dec-17","Jan-18","Feb-18"],
    //         datasets: [{

    //             type: "line",
    //             borderColor: "#eb4034",
    //             data: [408,820,675,732,650,832],
    //             fill: false
    //           },         
    //         ]
    //       },
    //       options: {
    //         title: {
    //           display: false,
    //           text: 'Performance History'
    //         },
    //         legend: { display: false }
    //       }
    //   });



  }




}


export interface SKUEventArgs2 {
  newVal : number;
}