import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Chart} from 'chart.js';

@Component({
  selector: 'app-cfntrendchart',
  templateUrl: './cfntrendchart.component.html',
  styleUrls: ['./cfntrendchart.component.css']
})
export class CfntrendchartComponent implements OnInit {
	title ="CFN Trendchart";
	cfnTrendChartResponse: any;
    LineChart = [];
	strArray = [];
	dataArray = [];
	arr_length: number;
	readonly APP_URL = 'https://wwwin-iap-dev.cisco.com/eepoc';
	constructor(private _http: HttpClient) {

	}

	ngOnInit() {

		const application = 'Feature';
		console.log("Application")
		this._http.get(this.APP_URL + '/applicationTrendChart', {
			params: {
				application: application
			}

		}).subscribe((data) => {
			this.cfnTrendChartResponse = data;
			this.arr_length = this.cfnTrendChartResponse.length
			console.log('CFN Res:::', this.cfnTrendChartResponse);
			for (var i = 0; i < this.arr_length; i++) {
				
				this.strArray.push(this.cfnTrendChartResponse[i]["MONTH"]);
				this.dataArray.push(this.cfnTrendChartResponse[i]["INCIDENT_COUNT"]);
			}
			
			this.LineChart = new Chart('lineChart', {
				type: 'line',
				data: {
					// labels: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"],
					labels: this.strArray,
					datasets: [{
						label: 'No of Cases raised in each Months',
						data: this.dataArray,
						fill: false,
						lineTension: 0.2,
						borderColor: "indigo",
						borderWidth: 1
					}]
				},
				options: {
					title: {
						text: 'Line Chart',
						display: true
					},
					scales: {
						yAxes: [{
							ticks: {
								beginAtZero: true
							}
						}]
					}
				}
			})
		},
			error => {
				console.log('Error occured', error);  
			});

	}

}
