import { Component, OnInit } from '@angular/core';
import {Chart} from 'chart.js';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-irttrendchart',
  templateUrl: './irttrendchart.component.html',
  styleUrls: ['./irttrendchart.component.css']
})
export class IrttrendchartComponent implements OnInit {
	title ="IRT Trendchart";
	irtTrendChartResponse : any;
    LineChart = [];
	strArray = [];
	dataArray = [];
	arr_length: number;
	readonly APP_URL = 'https://wwwin-iap-dev.cisco.com/eepoc';
	constructor(private _http: HttpClient) {

	}

	ngOnInit() {

		const application = 'GLOBAL';
		console.log("Application")
		this._http.get(this.APP_URL + '/applicationTrendChart', {
			params: {
				application: application
			}

		}).subscribe((data) => {
			this.irtTrendChartResponse = data;
			this.arr_length = this.irtTrendChartResponse.length
			console.log('IRT Res:::', this.irtTrendChartResponse);
			for (var i = 0; i < this.arr_length; i++) {
				
				this.strArray.push(this.irtTrendChartResponse[i]["MONTH"]);
				this.dataArray.push(this.irtTrendChartResponse[i]["INCIDENT_COUNT"]);
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
						borderColor: "darkslateblue",
						borderWidth: 1
					}]
				},
				options: {
					title: {

						text: 'IRT Line Chart',
						fontSize: 20,
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
