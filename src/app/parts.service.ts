import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Observable} from "rxjs";
import 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import { HttpClient } from '@angular/common/http';




@Injectable({
  providedIn: 'root'
})
export class PartsService {

  constructor(private http: HttpClient) { }

 

  result ; size: number = 0 ; test: number = 0;
  code=[]; name = []; description= []; data; fQuantity = []; fDdata = [] ; fSKUCode = []; onFData =[]; cat = [];
   tonHand : number[] = []; tonHandMonth = []; onHandData = [];
   openOrderCost: number[] =[];; cate = []; ans ; 


  getAPIData(){

 
    this.ans = this.http.get('https://jsonplaceholder.typicode.com/users');
    return this.ans; 
  }


  postAPIData(){
    return this.http.post('/api/OnHandCost', "CAT_A")
  }

   getAllParts()
  {
    const url = 'http://172.20.10.12:5000' || 'http://localhost:5000'

 //   const url = 'http://192.168.1.84:5000/' || 'http://localhost:5000/'
   // const url = 'http://10.3.14.214:5000/' || 'http://localhost:5000/'
  //  const url = 'http://localhost:5000/'
    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then((result) => {
       

        console.log(result.recordsets);
         this.size = Object.keys(result.recordsets[0]).length
        console.log(this.size)

        this.data = result.recordsets[0];
        
        console.log(this.data)

        console.log(this.data[0].SKUcode)

       // for (var i = 0 ; i < this.size ; i++)
      
        for (var i = 0 ; i <  this.size ; i++)
        {
         this.code[i] = this.data[i].SKUcode
         this.name[i] = this.data[i].SKUname
         this.description[i] = this.data[i].SKUDescription
        }

        console.log(this.code)
        console.log(this.code[0])

      

      
        
      
      })

      return this.data;

      
     
  }

  getDemandForecast()
  {

    const url = 'http://172.20.10.12:5000/demand' || 'http://localhost:5000/demand'

//    const url = 'http://192.168.1.84:5000/demand' || 'http://localhost:5000/demand'
  //  const url = 'http://10.3.14.214:5000/demand' || 'http://localhost:5000/demand'
  //  const url = 'http://localhost:5000/demand'
    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then((result) => {
       

        console.log(result.recordsets);
         this.size = Object.keys(result.recordsets[0]).length
        console.log(this.size)

        this.onFData = result.recordsets[0];
        
        console.log(this.onFData)

        console.log(this.onFData[0].ForecastedQuantity)

       // for (var i = 0 ; i < this.size ; i++)
      
        for (var i = 0 ; i < 6 ; i++)
        {
         this.fQuantity[i] = this.onFData[i].ForecastedQuantity
          this.fSKUCode[i] = this.onFData[i].SKUcode
        }

      

      

      
        
      
      })

      
     
  }

  getCategory()
  {

    const url = 'http://172.20.10.12:5000/getCategory' || 'http://localhost:5000/getCategory'
//  const url = 'http://192.168.1.84:5000/getCategory' || 'http://localhost:5000/getCategory'
  //  const url = 'http://10.3.14.214:5000/getCategory' || 'http://localhost:5000/getCategory'
     
   //const url = 'http://10.3.14.214:8100/getCategory'
    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then((result) => {
       
        console.log(result);
        console.log(result.recordsets);
         this.size = Object.keys(result.recordsets[0]).length
        console.log(this.size)

        this.cate = result.recordsets[0];
        
        console.log(this.cate)


        for (var i = 0 ; i < this.size ; i++)
        {
         this.cat[i] = this.cate[i].Category
        
   
        }

        

        
         
      })

      
     
  }


  getOnHandCost()
  {
    
    const url = 'http://172.20.10.12:5000/onHandCost' || 'http://localhost:5000/onHandCost'
//   const url = 'http://192.168.1.84:5000/onHandCost' || 'http://localhost:5000/onHandCost'
  //  const url = 'http://10.3.14.214:5000/onHandCost' || 'http://localhost:5000/onHandCost'
    //const url = 'http://localhost:5000/onHandCost'
    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then((result) => {
       

        console.log(result.recordsets);
         this.size = Object.keys(result.recordsets[0]).length
        console.log(this.size)

        this.onHandData = result.recordsets[0];
        
        console.log(this.onHandData)

       

        this.test = this.onHandData[0].totalOnHand;

        console.log(this.test)

       // for (var i = 0 ; i < this.size ; i++)
      
        for (var i = 0 ; i < this.size ; i++)
        {
         this.tonHand[i] = this.onHandData[i].totalOnHand
        this.openOrderCost[i] = this.onHandData[i].totalOpenOrder
   
        }


        for (var i = 0 ; i < 6 ; i++)
        {
         
         this.tonHandMonth[i] = this.onHandData[i].Monthly
   
        }       
      
      })

      
     
  }



}






