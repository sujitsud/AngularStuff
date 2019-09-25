import { Component, OnInit } from '@angular/core';
import {Chart} from 'chart.js';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-qddtstrendchart',
  templateUrl: './qddtstrendchart.component.html',
  styleUrls: ['./qddtstrendchart.component.css']
})
export class QddtstrendchartComponent implements OnInit {
	title ="QDDTS Trendchart";
	qddtsTrendChartResponse: any;
    LineChart = [];
	strArray = [];
	dataArray = [];
	arr_length: number;
	readonly APP_URL = 'https://wwwin-iap-dev.cisco.com/eepoc';
	constructor(private _http: HttpClient) {

	}

	ngOnInit() {

		const application = 'QDDTS';
		console.log("Application")
		this._http.get(this.APP_URL + '/applicationTrendChart', {
			params: {
				application: application
			}

		}).subscribe((data) => {
			this.qddtsTrendChartResponse = data;
			this.arr_length = this.qddtsTrendChartResponse.length
			console.log('QDDTS Res:::', this.qddtsTrendChartResponse);
			for (var i = 0; i < this.arr_length; i++) {
				
				this.strArray.push(this.qddtsTrendChartResponse[i]["MONTH"]);
				this.dataArray.push(this.qddtsTrendChartResponse[i]["INCIDENT_COUNT"]);
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
						borderColor: "firebrick",
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
