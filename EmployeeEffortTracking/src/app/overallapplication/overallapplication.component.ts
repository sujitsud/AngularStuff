import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js';
import { UserService } from '../_services/user.service';
import { first } from 'rxjs/operators';
import { User } from '../_models/user';
import { FormBuilder } from '@angular/forms';
import { AlertService } from '../_services/alert.service';
import { DatePipe } from '@angular/common';
//import * as Highcharts from 'highcharts';
//import * as highchartsHeatmap from 'highcharts/modules/heatmap';
//import { MapChart, Chart } from 'angular-highcharts';



export interface Tile {
	cols: number;
	rows: number;
	text: string;
	header: string;
}

@Component({
	selector: 'app-overallapplication',
	templateUrl: './overallapplication.component.html',
	styleUrls: ['./overallapplication.component.css']
})
export class OverallapplicationComponent implements OnInit {

	tiles: Tile[] = [
		{ text: 'One', cols: 3, rows: 1, header: "TrendChart" },
		{ text: 'Two', cols: 1, rows: 1, header: "Doughnut" },
		{ text: 'Three', cols: 3, rows: 1, header: "Bar" },
		{ text: 'Four', cols: 1, rows: 1, header: "Data Table" },
	];
	myTooltip = undefined;
	
	overallTrendChartResponse: any;
	LineChart = [];
	HeatChart = [];
	BarChart: any;
	strArray = [];
	dataArray = [];
	percentNumber: string;
	arr_length: number;
	readonly APP_URL = 'https://wwwin-iap-dev.cisco.com/eepoc';

	


	chartColors = [];
	overallDoughnutChartResponse: any;
	DoughnutChart: any;
	doughnutstrArray = [];
	doughnutdataArray = [];
	doughnutarr_length: number;

	horizontalBarChartColors = [];
	overallHorizontalBarChartResponse : any;
	HorizontalChart : any;
	horizontalstrArray = [];
	horizontaldataArray = [];
	horizontalarr_length : number ;


	barchartColors = [];
	overallBarChartResponse: any;
	barstrArray = [];
	bardataArray = [];
	bardata1Array = [];
	bardata2Array = [];
	bararr_length: number;

	percentResponse: any;
	caseCountMonthResponse: any;
	users: User[] = [];
	currentUser: User;
	optionsSelect: Array<any>;



	constructor(
		private userService: UserService,
		private _http: HttpClient,
		private formBuilder: FormBuilder,
		private alertService: AlertService,
		private datePipe: DatePipe) {
		this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

	}

	ngOnInit() {
		

		this.optionsSelect = [
			{ value: '1', label: 'Option 1' },
			{ value: '2', label: 'Option 2' },
			{ value: '3', label: 'Option 3' },
		];
		console.log("Application")
		this._http.get(this.APP_URL + '/overallApplicationTrendChart').subscribe((data) => {
			this.overallTrendChartResponse = data;
			this.arr_length = this.overallTrendChartResponse.length
			console.log('App Res:::', this.overallTrendChartResponse);
			for (var i = 0; i < this.arr_length; i++) {

				this.strArray.push(this.overallTrendChartResponse[i]["MONTH"]);
				this.dataArray.push(this.overallTrendChartResponse[i]["COUNT(INCIDENT_NUMBER)"]);
			}

			this.LineChart = new Chart('overallLineChart', {
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
						borderWidth: 2
					}]
				},
				options: {
					responsive: true,
					maintainAspectRatio: false,
					title: {
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



		this._http.get(this.APP_URL + '/applicationDoughnutChart').subscribe((data) => {
			this.overallDoughnutChartResponse = data;
			this.doughnutarr_length = this.overallDoughnutChartResponse.length
			console.log('Doughnut Res:::', this.overallDoughnutChartResponse);
			for (var i = 0; i < this.doughnutarr_length; i++) {

				this.doughnutstrArray.push(this.overallDoughnutChartResponse[i]["APPLICATION_NAME"]);
				this.doughnutdataArray.push(this.overallDoughnutChartResponse[i]["COUNT"]);
			}



			this.DoughnutChart = new Chart('pieChart', {
				type: 'doughnut',
				data: {
					labels: this.doughnutstrArray,
					datasets: [{
						label: 'No. of cases ',
						data: this.doughnutdataArray,
						backgroundColor: [],
						borderWidth: 1

					}]

				},
				options: {

					legend: {
						position: 'right'
					},
					responsive: true,
					maintainAspectRatio: false,
					title: {

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
			});

			this.chartColors = ['rgba(75,0,130)', 'rgba(128,0,0)', 'rgba(220,20,60)', 'rgba(0,100,0)', 'rgba(0,0,128)', 'rgba(238,130,238)', 'rgba(176,196,222)', 'rgba(128,128,0)', 'rgba(144,238,144)', 'rgba(139,0,139)', 'rgba(219,112,147)', 'rgba(255,0,0)', 'rgba(0,0,255)', 'rgba(238,232,170)', 'rgba(0,128,0)', 'rgba(100,149,237)', 'rgba(30,144,255)', 'rgba(138,43,226)', 'rgba(255,20,147)', 'rgba(244,164,96)'];
			var datast = this.DoughnutChart.data.datasets[0];
			for (var i = 0; i < datast.data.length; i++) {
				datast.backgroundColor[i] = this.chartColors[i];

			}
			this.DoughnutChart.update();

		},
			error => {
				console.log('Error occured', error);
			});

		//Bar Chart

		this._http.get(this.APP_URL + '/overallApplicationBarChart').subscribe((data) => {
			this.overallBarChartResponse = data;
			this.bararr_length = this.overallBarChartResponse.length
			console.log('Bar Res:::', this.overallBarChartResponse);
			for (var i = 0; i < this.bararr_length; i++) {

				this.barstrArray.push(this.overallBarChartResponse[i]['MONTH']);
				this.bardataArray.push(this.overallBarChartResponse[i]["TOTAL"]);
				this.bardata1Array.push(this.overallBarChartResponse[i]["MET_SLA"]);
				this.bardata2Array.push(this.overallBarChartResponse[i]["MISSED_SLA"]);

			}



			this.BarChart = new Chart('overallBarChart', {
				type: 'bar',
				data: {
					labels: this.barstrArray,
					datasets: [{
						label: "TOTAL",
						backgroundColor: "blue",
						data: this.bardataArray
					}, {
						label: "MET_SLA",
						backgroundColor: "green",
						data: this.bardata1Array
					}, {
						label: "MISSED_SLA",
						backgroundColor: "red",
						data: this.bardata2Array
					}]

				},
				options: {
					barValueSpacing: 20,
					legend: {
						position: 'right'
					},
					responsive: true,
					maintainAspectRatio: false,
					title: {

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
			});

			this.barchartColors = ['rgba(230,230,250)', 'rgba(128,0,0)', 'rgba(220,20,60)', 'rgba(0,100,0)', 'rgba(0,0,128)', 'rgba(238,130,238)', 'rgba(176,196,222)', 'rgba(0,128,0)', 'rgba(100,149,237)', 'rgba(30,144,255)', 'rgba(138,43,226)', 'rgba(255,20,147)', 'rgba(244,164,96)', , 'rgba(128,128,0)', 'rgba(144,238,144)', 'rgba(139,0,139)', 'rgba(219,112,147)', 'rgba(255,0,0)', 'rgba(0,0,255)', 'rgba(238,232,170)',];
			var datast = this.BarChart.data.datasets[0];
			for (var i = 0; i < datast.data.length; i++) {
				datast.backgroundColor[i] = this.barchartColors[i];

			}
			this.BarChart.update();

		},
			error => {
				console.log('Error occured', error);
			});


		this._http.get(this.APP_URL + '/percentageIncrement').subscribe((data) => {
			this.percentResponse = data;
			console.log('Percent Response', this.percentResponse[0]["PERCENTAGE"])
			this.percentNumber = this.percentResponse[0]["PERCENTAGE"].toFixed(2).toString().substring(1);

		},
			error => {
				console.log('Error occured', error);
			}
		);


		this._http.get(this.APP_URL + '/totalCaseCountAndMonth').subscribe((data) => {
			this.caseCountMonthResponse = data;
			console.log('Casecount  Response', this.caseCountMonthResponse[0]["CASE_COUNT"])


		},
			error => {
				console.log('Error occured', error);
			}
		);




			



			this.HorizontalChart = new Chart('horizontalChart', {
				type: 'horizontalBar',
				data: {
					 labels: ["Satyazit Madala", "Shilpi Mukherjee","Ramya Sreelatha","Mani Rengan","Manjushree Kattimani","Bharathi Lokesh","Deepak Gahlot","Sujith Sudhakaran","Varshitha Nanjappa","Lopamudra Dash","Jeevitha Ramya","Bhavana Achari"],
					datasets: [
						{
			label:"IRT",
            backgroundColor: 'rgba(46,139,87)',
            fillColor: "#000000",
		   data: [2,2,2,2,0,1,1,2,1,0,0,1]
		   
		},
		{
			label:"PRRQ",
            backgroundColor: 'rgba(128,0,0)',
            fillColor: "#000000",
            data: [1,0,0,0,1,1,1,0,2,0,0,0]
		},
		{
			label:"TIMS",
            backgroundColor: 'rgba(0,255,255)',
            fillColor: "#000000",
            data: [0,0,0,0,0,0,0,2,1,0,0,2]
		},
		{
			label:"QDDTS",
            backgroundColor: 'rgba(255,0,0)',
            fillColor: "#000000",
            data: [0,0,0,0,2,0,0,0,0,0,0,0]
		},
		{
			label:"BPR",
            backgroundColor: 'rgba(255,255,0)',
            fillColor: "#000000",
            data: [2,2,2,2,0,0,0,1,0,0,0,0]
		},
		{
			label:"CFN",
            backgroundColor: 'rgba(0,255,0)',
            fillColor: "#000000",
            data: [0,1,0,2,0,0,0,0,0,0,0,0]
		},
		{
			label:"CQI",
            backgroundColor: 'rgba(0,0,255)',
            fillColor: "#000000",
            data: [0,0,0,0,2,0,0,0,1,0,0,0]
		},
		{
			label:"CC",
            backgroundColor: 'rgba(255,165,0)',
            fillColor: "#000000",
            data: [0,2,0,1,2,0,0,0,0,0,0,0]
		},
		{
			label:"QIS",
            backgroundColor: 'rgba(255,0,255)',
            fillColor: "#000000",
            data: [0,0,0,2,0,0,0,0,0,0,0,0]
		},
		{
			label:"S3",
            backgroundColor: 'rgba(255,20,147)',
            fillColor: "#000000",
            data: [0,2,0,2,0,0,0,0,0,0,0,0]
		},
		{
			label:"CLARITY",
            backgroundColor: 'rgba(250,128,114)',
            fillColor: "#000000",
            data: [0,0,2,0,2,2,0,2,0,0,0,0]
		},
		{
			label:"IRT_QA",
            backgroundColor: 'rgba(47,79,79)',
            fillColor: "#000000",
            data: [0,0,0,0,0,0,0,0,0,0,2,0]
		},
		{
			label:"CQI_QA",
            backgroundColor: 'rgba(25,25,112)',
            fillColor: "#000000",
            data: [0,0,0,0,0,0,0,0,0,2,0,0]
		}





					]

				},
				 options: {
					 
					 title: {

						display: true
					},
      legend: {
	   position: 'right',
		labels: {
               usePointStyle : true
            }
	  },
	  scales: {
        xAxes:[{
          stacked: true
        }],
        yAxes:[{
          stacked: true
        }],
      }
			}
		});

			


		this.loadAllUsers();
	}

	

	deleteUser(id: number) {
		this.userService.delete(id).pipe(first()).subscribe(() => {
			this.loadAllUsers();
		});
	}

	private loadAllUsers() {
		this.userService.getAll().pipe(first()).subscribe(users => {
			this.users = users;
		});
	}



}
