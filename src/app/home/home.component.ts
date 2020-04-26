import { Component, OnInit } from '@angular/core';
import { PartsService } from '../parts.service';
import { Observable } from 'rxjs';
import * as CanvasJS from './canvasjs.min.js';
import * as Chart from 'chart.js';
import { error } from '@angular/compiler/src/util';
import { HttpHeaders, HttpClient } from '@angular/common/http';


import * as XLSX from "xlsx";
import { Http } from '@angular/http';





@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {



  file: File;


  values: number[] = [233, 115, 130, 137];
  public codes = []; size: number = 0; public tonHandMonths = []; test: number = 0;
  public names = []; public description = []; public data;
  public onHandCost: number[]; public onHandData = [];
  public OpenOrderCost: number[];
  public cat = []; public recordsets = []; files;  title = 'fileUpload'


  getWidth(): any {
    if (document.body.offsetWidth < 850) {
      return '90%';
    }

    return 850;
  }


  selectFile(event){  //grab the event 
    if(event.target.files.length > 0 ){  //if there are any file
      const file = event.target.files[0]  //get that file
      this.files= file ; // assign 
    }
  }

  onSubmit(){
    const formData = new FormData();
    formData.append('file', this.files);

    this.http.post<any>("http://192.168.1.127:5000/file" || "/api/file", formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    )
  }

  processFile()
  {
    console.log("Find the file. and Read it in python")
  }


  public onChange(event): void {  // event will give you full breif of action


    const newVal = event.target.value;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post("http://192.168.1.127:5000/OnHandLoadedCost" || "/api/OnHandLoadedCost", { newVal }).subscribe(
    
  //  this.http.post("http://10.3.14.214:5000/OnHandLoadedCost" || "/api/OnHandLoadedCost", { newVal }).subscribe(
      res => {

    //   this.data = res.recordsets[0];
    //  this.size = Object.keys(res.recordsets[0]).length
        console.log(this.size);



        for (var i = 0; i < 6; i++) {
          this.onHandCost[i] = this.data[i].totalOnHand
          this.tonHandMonths[i] = this.data[i].Monthly

        }

        console.log(this.tonHandMonths);

        console.log(this.onHandCost);


        var chart = new Chart('canvas', {


          // The type of chart we want to create
          type: 'bar',


          // The data for our dataset
          data: {
            labels: ["Jan/2019", "Feb/2019", "Mar/2019", "Apr/2019", "May/2019", "Jun/2019"],   //this.toonHandMonths

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
            scales: {
              yAxes: [{
                ticks: {
                  // Include a dollar sign in the ticks
                  callback: function (value, index, values) {
                    return '$' + value;
                  }
                },
                gridLines:{lineWidth:0}
              }],
              xAxes : [
                {
                  gridLines: {
                        lineWidth: 0
                    }
                }
              ]
            },
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


        var chart = new Chart('canvas2', {


          // The type of chart we want to create
          type: 'bar',


          // The data for our dataset
          data: {
            labels: ["SKU1001", "SKU1002", "SKU1003", "SKU1004", "SKU1005", "SKU1006"],   //this.SKUcodes

            datasets: [{

              label: 'ExcessCost',
              backgroundColor: 'rgb(240,139,132)',
              data: [500, 1010, 805, 250, 230, 3056, 4535]

            },
            ]
          },


          options: {
              scales: {
              yAxes: [{
                stacked: true,
                ticks:{
                  callback: function (value, index, values) {
                    return '$' + value;
                  }
                }
              }]
            },
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


        var myLineChart = new Chart('line2', {
          type: 'line',
          data: {
            labels: ["Jan/2019", "Feb/2019", "Mar/2019", "Apr/2019", "May/2019", "Jun/2019"],   //this.toonHandMonths

            datasets: [{

              label: 'COGSByCategory',
              backgroundColor: 'rgb(48,124,207)',
              data: [500, 1010, 805, 250, 230, 3056, 4535]

            },

            ]
          },
          options: {
            scales: {
              yAxes: [{
                stacked: true,
                ticks:{
                  callback: function (value, index, values) {
                    return '$' + value;
                  }
                }
              }]
            },
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


        var myLineChart = new Chart('line', {
          type: 'line',
          data: {
            labels: ["Jan/2019", "Feb/2019", "Mar/2019", "Apr/2019", "May/2019", "Jun/2019"],   //this.toonHandMonths

            datasets: [{

              label: 'COGSByCategory',
              backgroundColor: 'rgb(99, 255, 222)',
              borderColor: 'rgb(256, 99, 132)',
              data: [500, 1010, 805, 250, 230, 3056, 4535]

            },
            {
              label: 'OnhandCostByCategory',
              backgroundColor: 'rgb(255, 99, 132)',
              borderColor: 'rgb(255, 99, 132)',
              data: this.onHandCost
            },
            {
              label: 'OpenOrderCostByCategory',
              backgroundColor: 'rgb(51, 209, 255)',
              borderColor: 'rgb(256, 99, 132)',
              data: [230, 900, 450, 212, 200, 3230, 400]
            }
            ]
          },
          options: {

            scales: {
              yAxes: [{
                stacked: true,
                ticks:{
                  callback: function (value, index, values) {
                    return '$' + value;
                  }
                }
              }]
            },
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



        var myBarChart = new Chart("barChart", {
          type: 'horizontalBar',
          data: {
            labels: ["SKU1001", "SKU1002", "SKU1003", "SKU1004", "SKU1005", "SKU1006"],
                     // "SKU1001", "SKU1002", "SKU1003", "SKU1004", "SKU1005", "SKU1006",
                      //"SKU1001", "SKU1002", "SKU1003", "SKU1004", "SKU1005", "SKU1006"],   //this.SKUcodes

            datasets: [{

              label: 'TotalCOGS',
              backgroundColor: 'rgb(240,139,132)',
              data: [500, 1010, 805, 250, 230, 3056, 4535], //500, 1010, 805, 250, 230, 3056, 4535,500, 1010, 805, 250, 230, 3056, 4535]

            },
            {
              label: 'AvgOnhandCost',
              backgroundColor: 'rgb(48,124,207)',
              data: this.onHandCost
            },
            {
              label: 'AvgOpenOrderCost',
              backgroundColor: 'rgb(160,219,179)',
              data: [230, 900, 450, 212, 200, 3230, 400], //230, 900, 450, 212, 200, 3230, 400,230, 900, 450, 212, 200, 3230, 400]
            }
            ]
          },
          options: {
            scales: {
              xAxes: [{
                ticks:{
                  callback: function (value, index, values) {
                    return '$' + value;
                  }
                }
              }]
            },
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
              data: this.onHandCost
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
            legend: { display: false , position: 'bottom' },
            plugins: {
              datalabels:
              {
                display: false,
                anchor: 'end',
                align: 'bottom',
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
            legend: { display: false , position: 'bottom' },
            plugins: {
              datalabels:
              {
                display: false,
                anchor: 'end',
                align: 'bottom',
              }
            }
          }
        });


        var myChart = new Chart("stackedBarChart", {
          type: 'horizontalBar',
          data: {
            labels: ["SKU1001", "SKU1002", "SKU1003", "SKU1004", "SKU1005", "SKU1006"],   //this.SKUcodes
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
                gridLines:{lineWidth:0}
              }],
              xAxes: [{
                stacked: true,
                    gridLines:{lineWidth:0}
              }]
            }
          }
        });
        var mixedChart = new Chart("mixedChart", {
          type: 'bar',
          data: {
            datasets: [{
              label: 'Bar Dataset',
              data: [10, 20, 30, 40],
              // this dataset is drawn below
              order: 1,
              backgroundColor: 'rgba(97, 188, 109, 0.2)',
              borderColor: 'rgba(97, 188, 109, .8)'
            }, {
              label: 'Line Dataset',
              data: [10, 50, 30, 60],
              type: 'line',
              // this dataset is drawn on top
              order: 2,
              backgroundColor: 'rgba(236, 107, 86, 0.2)',
              borderColor: 'rgba(236, 107, 86, .8)'
            }],
            labels: ['January', 'February', 'March', 'April']
          },

        });





      },
      err => {
        console.log('err:' + err);
      }
    );
    console.log(newVal);


  }

  public Upload() {
    console.log("this is inside upload")

    let SKU_Codes: string[] = []; var SKU_Name; var SKU_Description; var cat; var SKU_Code; var SKU_Cat; var SKU_cost; var excelRows; var onHandrows; var that = this;
    let SKU_Cats: string[] = [];
    let SKU_Costs: any[] = []; let quantity: any[] = [];

    let SKU_CodesonHand: string[] = [];
    var SKU_CodeonHand;

    let onHandQuantitysDec: any[] = [];

    let onHandQuantitysJan: any[] = [];

    let onHandQuantitysFeb: any[] = [];

    let onHandQuantitysMar: any[] = [];

    let onHandQuantitysApr: any[] = [];

    let onHandQuantitysMay: any[] = [];

    let onHandQuantitysJun: any[] = [];
    //Reference the FileUpload element.
    var fileUpload = document.getElementById("fileUpload");

    let BR = (<HTMLInputElement>document.getElementById("fileUpload")).files[0];

    let inputValue = (document.getElementById("fileUpload") as HTMLInputElement).value;


    //Validate whether File is valid Excel file.
    var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;



    // if (regex.test(inputValue.toLowerCase())) {
    if (typeof (FileReader) != "undefined") {
      var reader = new FileReader();

      //For browsers other than IE 
      if (reader.readAsBinaryString) {
        reader.onload = function (e) {


          //Read the excel file data.

          var workbook = XLSX.read(e.target.result, {
            type: 'binary'
          });

          //Fetch the name of First Sheet.
          var firstSheet = workbook.SheetNames[0];

          var onHandSheet = workbook.SheetNames[3]; //Inventory Level History



          console.log("firstsheetname" + firstSheet);

          console.log("test sheet name is" + onHandSheet);
          //Read all rows from First Sheet into an JSON array.
          //set row 6 as headers
          excelRows = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheet], { range: 5 });

          onHandrows = XLSX.utils.sheet_to_json(workbook.Sheets[onHandSheet], { range: 5 }); //onHand

          console.log("inside excel export" + JSON.stringify(excelRows));

          //Create a HTML table element

          var table = document.createElement("table");
          table.border = "1";

          //Add the header row
          var row = table.insertRow(-1);

          //Add the header cells
          var headerCell = document.createElement("TH");
          headerCell.innerHTML = "SKU Code";
          row.appendChild(headerCell);

          headerCell = document.createElement("TH");
          headerCell.innerHTML = "SKU Name";
          row.appendChild(headerCell);

          headerCell = document.createElement("TH");
          headerCell.innerHTML = "SKU Description";
          row.appendChild(headerCell);

          // ===============onHand============================== / 

          const months = ['1/1/2018','2/1/2018','3/1/2018','4/1/2018','5/1/2018','6/1/2018','7/1/2018','8/1/2018','9/1/2018','10/1/2018','11/1/2018','12/1/2018','1/1/2019','2/1/2019','3/1/2019','4/1/2019','5/1/2019','6/1/2019','7/1/2019','8/1/2019','9/1/2019','10/1/2019','11/11/2019','12/1/2019']
          for (var i = 0; i < onHandrows.length; i++) {

            var j = 0;
            SKU_CodesonHand[i] = JSON.stringify(onHandrows[i].SKU_CODE).replace(/^"(.*)"$/, '$1');

            SKU_CodeonHand = SKU_CodesonHand[i]
            quantity[j]=onHandrows[i].Jan_18
            quantity[j+1]=onHandrows[i].Feb_18
            quantity[j+2]=onHandrows[i].Mar_18
            quantity[j+3]=onHandrows[i].Apr_18
            quantity[j+4]=onHandrows[i].May_18
            quantity[j+5]=onHandrows[i].Jun_18
            quantity[j+6]=onHandrows[i].Jul_18
            quantity[j+7]=onHandrows[i].Aug_18
            quantity[j+8]=onHandrows[i].Sep_18
            quantity[j+9]=onHandrows[i].Oct_18
            quantity[j+10]=onHandrows[i].Nov_18
            quantity[j+11]=onHandrows[i].Dec_18
            quantity[j+12]=onHandrows[i].Jan_19
            quantity[j+13]=onHandrows[i].Feb_19
            quantity[j+14]=onHandrows[i].Mar_19
            quantity[j+15]=onHandrows[i].Apr_19
            quantity[j+16]=onHandrows[i].May_19
            quantity[j+17]=onHandrows[i].Jun_19
            quantity[j+18]=onHandrows[i].Jul_19
            quantity[j+19]=onHandrows[i].Aug_19
            quantity[j+20]=onHandrows[i].Sep_19
            quantity[j+21]=onHandrows[i].Oct_19
            quantity[j+22]=onHandrows[i].Nov_19
            quantity[j+23]=onHandrows[i].Dec_19


            

            

            console.log(SKU_CodesonHand);
            console.log(quantity);


            for (var j = 0; j < quantity.length; j++) {

              var onHandQuantity = quantity[j];
              var onHandQuantity = quantity[j];
              var month = months[j];
              console.log(onHandQuantity);
              console.log(month);
              console.log(SKU_CodeonHand);
              
              that.http.post("http://192.168.1.127:5000/insertonHandData" || "/api/insertonHandData", { SKU_CodeonHand, onHandQuantity,month }).subscribe(res => {

              //that.http.post("http://10.3.14.214:5000/insertonHandData" || "/api/insertonHandData", { SKU_CodeonHand, onHandQuantity }).subscribe(res => {
                console.log(res);
              })
            }

          }


          // ===============onHand============================== / 



          //Add the data rows from Excel file.
          for (var i = 0; i < excelRows.length; i++) {
            //Add the data row.

            var row = table.insertRow(-1);

            console.log(JSON.stringify(excelRows[i]));


            //console.log(JSON.stringify(excelRows[i]['1']));
            // console.log(JSON.stringify(excelRows[i]['4']));


            SKU_Codes[i] = JSON.stringify(excelRows[i].SKU_CODE).replace(/^"(.*)"$/, '$1');
            SKU_Cats[i] = JSON.stringify(excelRows[i].Category).replace(/^"(.*)"$/, '$1');
            SKU_Costs[i] = excelRows[i].Unit_Cost;

            console.log(SKU_Costs);



            SKU_Code = SKU_Codes[i];
            SKU_Cat = SKU_Cats[i];
            SKU_cost = SKU_Costs[i];

            console.log(SKU_cost);

            //Add the data cells.
            var cell = row.insertCell(-1);
            cell.innerHTML = JSON.stringify(excelRows[i].SKU_CODE).replace(/^"(.*)"$/, '$1');



            cell = row.insertCell(-1);
            cell.innerHTML = JSON.stringify(excelRows[i].SKU_Name).replace(/^"(.*)"$/, '$1');

            cell = row.insertCell(-1);
            cell.innerHTML = JSON.stringify(excelRows[i].SKU_Description).replace(/^"(.*)"$/, '$1');
            that.http.post("http://192.168.1.127:5000/insertData" || "/api/insertData", { SKU_Code, SKU_Cat, SKU_cost }).subscribe(res => {

            
          //  that.http.post("http://10.3.14.214:5000/insertData" || "/api/insertData", { SKU_Code, SKU_Cat, SKU_cost }).subscribe(res => {
              console.log(res);
            })
            // HomeComponent.prototype.http.post("/api/insertData", { SKU_Code }).subscribe(res => {
            //   console.log(res);
            //  })


          }

          var dvExcel = document.getElementById("dvExcel");
          dvExcel.innerHTML = "";
          dvExcel.appendChild(table);


        };

        //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });


        //   console.log(SKU_Code);

        //    this.http.post("/api/insertData", { SKU_Code }).subscribe(res => {
        //  console.log(res);
        // })

        reader.readAsBinaryString(BR);
      } else {
        //for IE browsers 
        // reader.onload = function(e)
        // {
        //   var data = "";
        //   var bytes = new Uint8Array(e.target.result);
        //   for( var i =0 ; i < bytes.byteLength;i++)
        //   {
        //     data += String.fromCharCode(bytes[i]);
        //   }
        //   ProcessExcel(data);
        // };
        // reader.readAsArrayBuffer(BR);
      }

    }
    else {
      alert("This browser does not support HTML5");
    }



    //}
    // else {
    //   alert("Please upload a valid Excel file.")
    // }

  }


  Test() {

    let SKU_Codes: string[] = []; var SKU_Name; var SKU_Description; var cat; var SKU_Code; var excelRows; var that = this;
    var excelRowsTest;
    //Reference the FileUpload element.
    var fileUpload = document.getElementById("fileUpload");

    let BR = (<HTMLInputElement>document.getElementById("fileUpload")).files[0];

    let inputValue = (document.getElementById("fileUpload") as HTMLInputElement).value;


    //Validate whether File is valid Excel file.
    var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;



    // if (regex.test(inputValue.toLowerCase())) {
    if (typeof (FileReader) != "undefined") {
      var reader = new FileReader();

      //For browsers other than IE 
      if (reader.readAsBinaryString) {
        reader.onload = function (e) {


          //Read the excel file data.

          var workbook = XLSX.read(e.target.result, {
            type: 'binary'
          });

          //Fetch the name of Second Sheet.
          var secondSheet = workbook.SheetNames[0];

          console.log("firstsheetname" + secondSheet);

          //Read all rows from First Sheet into an JSON array.
          //set row 6 as headers


          excelRows = XLSX.utils.sheet_to_json(workbook.Sheets[secondSheet], { range: 5 });

          console.log("inside excel export" + JSON.stringify(excelRows));

          //Create a HTML table element

          var table = document.createElement("table");
          table.border = "1";

          //Add the header row
          var row = table.insertRow(-1);

          //Add the header cells
          var headerCell = document.createElement("TH");
          headerCell.innerHTML = "Id";
          row.appendChild(headerCell);

          headerCell = document.createElement("TH");
          headerCell.innerHTML = "Name";
          row.appendChild(headerCell);

          headerCell = document.createElement("TH");
          headerCell.innerHTML = "Country";
          row.appendChild(headerCell);


          //Add the data rows from Excel file.
          for (var i = 0; i < excelRows.length; i++) {
            //Add the data row.

            var row = table.insertRow(-1);

            //Add the data cells.
            var cell = row.insertCell(-1);
            cell.innerHTML = JSON.stringify(excelRows[i].SKU_CODE).replace(/^"(.*)"$/, '$1');

            cell = row.insertCell(-1);
            cell.innerHTML = JSON.stringify(excelRows[i].SKU_Name).replace(/^"(.*)"$/, '$1');

            cell = row.insertCell(-1);
            cell.innerHTML = JSON.stringify(excelRows[i].SKU_Description).replace(/^"(.*)"$/, '$1');



          }

          var dvExcel = document.getElementById("dvExcel");
          dvExcel.innerHTML = "";
          dvExcel.appendChild(table);


        };

        reader.readAsBinaryString(BR);
      } else {

      }

    }
    else {
      alert("This browser does not support HTML5");
    }

  }

  constructor(private http: HttpClient, public PartsService: PartsService) {

    this.PartsService = PartsService;
    PartsService.getAllParts();
    PartsService.getOnHandCost();
    PartsService.getCategory();

    this.test = PartsService.ans;



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






  }




  ngOnInit(): void {

    
    var chart = new Chart('canvas', {
      // The type of chart we want to create
      type: 'bar',


      // The data for our dataset
      data: {
        labels: ["SKU1001", "SKU1002", "SKU1003", "SKU1004", "SKU1005", "SKU1006"],   //this.SKUcodes
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
        labels: ["SKU1001", "SKU1002", "SKU1003", "SKU1004", "SKU1005", "SKU1006"],   //this.SKUcodes
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
            gridLines:{lineWidth:0}
          }],
          xAxes: [{
            stacked: true,
            gridLines:{lineWidth:0}
          }]
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
        cutoutPercentage:70,
        legend: { display: false , position: 'bottom' },
        plugins: {
          datalabels:
          {
            display: true,
            anchor: 'end',
            align: 'bottom',
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
        cutoutPercentage:70,
        legend: { display: false , position: 'bottom' },
        plugins: {
          datalabels:
          {
            display: false,
            anchor: 'end',
            align: 'bottom',
          }
        }
      }
    });

   


    this.PartsService.getAPIData().subscribe((Response) => {

      console.log('response is', Response)
    }, (error) => {
      console.log('error is', error)
    })

    this.PartsService.postAPIData().subscribe((response) => {
      console.log('response from post data is ', response);
    }, (error) => {
      console.log('error during post is ', error)
    })




  }

  public barChartOptions =
    {
      scaleShowVerticalLines: false,
      responsive: true
    };


  public barChartType = 'bar';
  public barChartLegend = true;


  public barChartData = [{ data: [67, 48, 40, 19, 27, 90], label: 'OnhandCostByCategory' }];


  fileChange(file) {
    this.file = file.target.files[0];
    var reader = new FileReader();

    console.log(this.file.name);
  }




  ProcessExcel(data) {
    //Read the excel file data.

    var workbook = XLSX.read(data, {
      type: 'binary'
    });

    //Fetch the name of First Sheet.
    var firstSheet = workbook.SheetNames[0];

    //Read all rows from First Sheet into an JSON array.
    var excelRows = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheet]);


    //Create a HTML table element

    var table = document.createElement("table");
    table.border = "1";

    //Add the header row
    var row = table.insertRow(-1);

    //Add the header cells
    var headerCell = document.createElement("TH");
    headerCell.innerHTML = "SKU Code";
    row.appendChild(headerCell);

    headerCell = document.createElement("TH");
    headerCell.innerHTML = "SKU Name";
    row.appendChild(headerCell);

    headerCell = document.createElement("TH");
    headerCell.innerHTML = "SKU Description";
    row.appendChild(headerCell);

    //Add the data rows from Excel file.
    for (var i = 0; i < excelRows.length; i++) {

      //Add the data row.
      var row = table.insertRow(-1);

      //Add the data cells.
      var cell = row.insertCell(-1);
      //cell.innerHTML = excelRows[i].SKU Code;

      cell = row.insertCell(-1);
      // cell.innerHTML = excelRows[i].SKU Name;

      cell = row.insertCell(-1);
      //cell.innerHTML = excelRows[i].SKU Description;
    }

    var dvExcel = document.getElementById("dvExcel");
    dvExcel.innerHTML = "";
    dvExcel.appendChild(table);


  }






}








