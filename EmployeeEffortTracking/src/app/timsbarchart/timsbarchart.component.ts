import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Chart} from 'chart.js';

@Component({
  selector: 'app-timsbarchart',
  templateUrl: './timsbarchart.component.html',
  styleUrls: ['./timsbarchart.component.css']
})
export class TimsbarchartComponent implements OnInit {
title ="TIMS PieChart ";
   timsPieChartColors =[];
	timsPieChartResponse : any;
  	 timsPieChart :any;
	timsPieStrArray = [];
	timsPieDataArray = [];
	arr_length: number;
	readonly APP_URL = 'https://wwwin-iap-dev.cisco.com/eepoc';
	constructor(private _http: HttpClient) {

	}

	ngOnInit() {

		const application = 'TIMS';
		console.log("Application")
		this._http.get(this.APP_URL + '/applicationBarChart', {
			params: {
				application: application
			}

		}).subscribe((data) => {
			this.timsPieChartResponse = data;
			this.arr_length = this.timsPieChartResponse.length
			console.log('TIMS Res:::', this.timsPieChartResponse);
			for (var i = 0; i < this.arr_length; i++) {
				
				this.timsPieStrArray.push(this.timsPieChartResponse[i]["CASE_CATEGORIZATION"]);
				this.timsPieDataArray.push(this.timsPieChartResponse[i]["COUNT"]);
			}

  					 
			
			 this.timsPieChart =new Chart('timsPieChart', {
          type: 'pie',
          data: {
            labels: this.timsPieStrArray,
            datasets: [{
                label : 'No. of cases ',
                data :this.timsPieDataArray,
				backgroundColor: [],
                borderWidth:0.5
            }]
            
          },
          options:{
              title:{
                  text:'Pie Chart',
                  display:true
              },
              scales:{
                  yAxes:[{
                      ticks:{
                          beginAtZero:true
                      }
                  }]
              }
          }
	  });
	
  this.timsPieChartColors=['rgba(255,0,0)','rgba(0,0,255)','rgba(238,232,170)','rgba(0,128,0)','rgba(100,149,237)','rgba(30,144,255)','rgba(138,43,226)','rgba(255,20,147)','rgba(244,164,96)','rgba(230,230,250)','rgba(128,0,0)','rgba(220,20,60)','rgba(0,100,0)','rgba(0,0,128)','rgba(238,130,238)','rgba(176,196,222)','rgba(128,128,0)','rgba(144,238,144)','rgba(139,0,139)','rgba(219,112,147)'];
			var datast= this.timsPieChart.data.datasets[0];
			for (var i = 0; i < datast.data.length; i++) {
            datast.backgroundColor[i]=this.timsPieChartColors[i];
   
  }
  this.timsPieChart.update();
	
		},
			error => {
				console.log('Error occured', error);
			});
       
}

	}


