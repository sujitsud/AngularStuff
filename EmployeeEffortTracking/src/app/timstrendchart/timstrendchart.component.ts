import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Chart } from 'chart.js';

@Component({
selector: 'app-timstrendchart',
templateUrl: './timstrendchart.component.html',
styleUrls: ['./timstrendchart.component.css']
})
export class TimstrendchartComponent implements OnInit {
	title = 'TIMS Trendchart';

	timsTrendChartResponse: any;
	LineChart = [];
	strArray = [];
	dataArray = [];
	arr_length: number;
	readonly APP_URL = 'https://wwwin-iap-dev.cisco.com/eepoc';
	constructor(private _http: HttpClient) {

	}

	ngOnInit() {

		const application = 'TIMS';
		console.log("Application")
		this._http.get(this.APP_URL + '/applicationTrendChart', {
			params: {
				application: application
			}

		}).subscribe((data) => {
			this.timsTrendChartResponse = data;
			this.arr_length = this.timsTrendChartResponse.length
			console.log('TIMS Res:::', this.timsTrendChartResponse);
			for (var i = 0; i < this.arr_length; i++) {
				
				this.strArray.push(this.timsTrendChartResponse[i]["MONTH"]);
				this.dataArray.push(this.timsTrendChartResponse[i]["INCIDENT_COUNT"]);
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
						borderColor: "brown",
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
