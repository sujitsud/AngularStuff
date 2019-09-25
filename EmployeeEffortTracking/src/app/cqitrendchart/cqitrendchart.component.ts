import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Chart} from 'chart.js';

@Component({
  selector: 'app-cqitrendchart',
  templateUrl: './cqitrendchart.component.html',
  styleUrls: ['./cqitrendchart.component.css']
})
export class CqitrendchartComponent implements OnInit {

  title = 'CQI Trendchart';

	cqiTrendChartResponse: any;
	LineChart = [];
	strArray = [];
	dataArray = [];
	arr_length: number;
	readonly APP_URL = 'https://wwwin-iap-dev.cisco.com/eepoc';
	constructor(private _http: HttpClient) {

	}

	ngOnInit() {

		const application = 'CQI';
		console.log("Application")
		this._http.get(this.APP_URL + '/applicationTrendChart', {
			params: {
				application: application
			}

		}).subscribe((data) => {
			this.cqiTrendChartResponse = data;
			this.arr_length = this.cqiTrendChartResponse.length
			console.log('CQI Res:::', this.cqiTrendChartResponse);
			for (var i = 0; i < this.arr_length; i++) {
				
				this.strArray.push(this.cqiTrendChartResponse[i]["MONTH"]);
				this.dataArray.push(this.cqiTrendChartResponse[i]["INCIDENT_COUNT"]);
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
						borderColor: "forestgreen",
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
