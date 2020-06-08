import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import * as Chart from 'chart.js';
import { flatMap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PartsService } from '../parts.service';
import { stringToKeyValue } from '@angular/flex-layout/extended/typings/style/style-transforms';
import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { formatDate } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

@Component({
  selector: 'app-sku-performace',
  templateUrl: './sku-performace.component.html',
  styleUrls: ['./sku-performace.component.css']
})
export class SkuPerformaceComponent implements OnInit {
  toggleOptions: Array<String> = ["Past 6 Months", "Past 1 Year","Past 2 Year"];
  isMenuCollapsed:any;
  selectionChanged(item) {

    var timeOnhandCost = [];
    var timetonHandMonths = [];

    console.log(this.chartChosen)
    console.log("Selected value: " + item.value);


  }
   chosenTime:any; 
   newVal;chartChosen;size;
 timeOnhandCost=[];
   timetonHandMonths = [];
  constructor(private http: HttpClient, public PartsService: PartsService) 
  {


    this.PartsService.$isChosen.subscribe((data) => {
      console.log("In Child Component", data);
      console.log(data.category);
      this.chosenTime = data.category;
 

      PartsService.getChosenCategory(data.category).subscribe(
        res => {
          

          this.PartsService.getTimeStamp(this.chosenTime, this.newVal).subscribe(
            res => {

              console.log(this.chosenTime)
              console.log(this.newVal)
              console.log(this.chartChosen)
              console.log(res);

              let dataTest = res.recordsets[0];
              this.size = Object.keys(res.recordsets[0]).length
              console.log(this.size);
              console.log(dataTest)

              for (var i = 0; i < this.size; i++) {
               this.timeOnhandCost[i] = dataTest[i].totalOnHand
               // this.timetonHandMonths[i] = formatDate(dataTest[i].Monthly, this.format, this.locale);

              }

              console.log(this.timeOnhandCost);

              console.log(this.timetonHandMonths); 
            } )
          
          })
    })

   }

  ngOnInit(): void {




    var mixedChart = new Chart("line", {
      type: 'bar',
          data: {
            labels: ["17-Sep", "24-Sep", "1-Oct", "8-Oct","15-Oct","22-Oct","29-Oct","5-Nov","12-Nov","19-Nov"],
            datasets: [{
               
                type: "line",
                borderColor: "#eb4034",
                data: [408,300,320,270,320,832,200,300,450,150],
                fill: false,
                yAxisID: 'first-y-axis'
              }, 
              {
               
                type: "bar",
                backgroundColor: "rgb(51,129,184)",
                data: [600,700,675,734,600,800,720,640,630,680],
                yAxisID: 'second-y-axis'
              }, 
              
            ]
          },
          options: {
            scales:
            {
              xAxes:[{stacked:true,gridLines:{lineWidth:0}}],
              yAxes:[
                {   
                  id: 'first-y-axis',
                  type: 'linear',
                  position: 'right',
                gridLines:{lineWidth:0}},
                {
                  id: 'second-y-axis',
                  type: 'linear',
                  position: 'left',
                  gridLines:{lineWidth:0}
                }]
            },
            title: {
              display: false,
              text: 'Performance History'
            },
            legend: { display: false }
          }
      });



var mixedChart = new Chart("mixedChart2", {
type: 'bar',
    data: {
      labels: ["Curr mth", "Last 2", "Last 3", "Last 4","Last 5","Last 6"],
      datasets: [{
         
          type: "line",
          borderColor: "#eb4034",
          data: [408,547,675,734,320,832],
          label:"TargetIP(Qty)",
          fill: false
        }, {
         
          type: "line",
          borderColor: "#ebe534",
          data: [133,221,783,1200,2300,3640],
          label:"Turns",
          fill: false
        },
        {
         
          type: "bar",
          backgroundColor: "rgb(51,129,184)",
          label:"OnHand(Qty)",
          data: [408,547,675,734,234,443],
        }, {
        
          type: "bar",
          backgroundColor: "rgb(103,189,32)",
          label:"Open Order(Qty)",
          data: [133,221,783,2478,2345,653]
        },
        
      ]
    },
    options: {
      scales:
      {
        xAxes:[{stacked:true,  gridLines:{lineWidth:0}}],
        yAxes:[{stacked:true,gridLines:{lineWidth:0}},
          
            {   
              id: 'first-y-axis',
              type: 'linear',
              position: 'right',
              gridLines:{lineWidth:0}},
              
        ]
      },
      title: {
        display: false,
        text: 'Performance History'
      },
      legend: { display: true }
    }
});




var mixedChart = new Chart("mixedChart", {
  type: 'bar',
      data: {
        labels: ["Sep-17", "Oct-17", "Nov-17", "Dec-17","Jan-18","Feb-18"],
        datasets: [{
           
            type: "line",
            borderColor: "#eb4034",
            data: [408,820,675,732,650,832],
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
          xAxes : [
            {
              gridLines: {
                    lineWidth: 0
                }
            }
          ]
        },
        legend: { display: false }
      }
  });
  

  }
}


