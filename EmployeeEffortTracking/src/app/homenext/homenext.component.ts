import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../_services/user.service';
import { AlertService } from '../_services/alert.service';
import {Chart} from 'chart.js';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({

    templateUrl: './homenext.component.html',
    styleUrls: ['./homenext.component.css']
})
export class HomenextComponent implements OnInit {

    effortNextForm: FormGroup;
    cqiloading = false;
    bprloading = false;
    cqisubmitted = false;
    bprsubmitted = false;
    cfnloading= false;
    cfnsubmitted = false;


	readonly APP_URL = 'https://wwwin-iap-dev.cisco.com/eepoc';
	applicationTitle : string;


	cqiTrendChartResponse : any;
    cqiLineChart = [];
	cqidataArray = [];


	
	bprTrendChartResponse : any;
    bprLineChart = [];
	bprdataArray = [];

	cfnTrendChartResponse : any;
    cfnLineChart = [];
	cfndataArray = [];

	cqiPieChartColors =[];
	cqiPieChartResponse : any;
	  cqiPieChart :any;
	  

	bprPieChartColors =[];
	bprPieChartResponse : any;
	  bprPieChart :any;
	  
	  cfnPieChartColors =[];
	cfnPieChartResponse : any;
  	cfnPieChart :any;

	arr_length: number;


    cqiresponse: any; bprresponse: any; cfnresponse: any;
    constructor(
        private userService: UserService,
        private _http: HttpClient,
        private formBuilder: FormBuilder,
		private alertService: AlertService,
		private modalService: NgbModal) {

    }

    ngOnInit() {
        this.effortNextForm = this.formBuilder.group({
            cqiDateRange: ['', Validators.required],
            bprDateRange: ['', Validators.required],
            cfnDateRange :['', Validators.required]

        });
    }
    get f() { return this.effortNextForm.controls; }

    getCqiCount() {

        const firstDate = this.effortNextForm.get('cqiDateRange').value.toLocaleString().split(',');
        const firstpartDate = firstDate[0];
        const secondDate = firstDate[2];
        const application = 'CQI';
        console.log("Value::" + this.effortNextForm.get('cqiDateRange').value);
        this.cqisubmitted = true;

        // stop here if form is invalid
        if (!this.effortNextForm.get('cqiDateRange').value) {

            return;
        }

        this.cqiloading = true;


        this._http.get(this.APP_URL + '/count', {
            params: {
                firstDate: firstpartDate,
                secondDate: secondDate,
                application: application
            }

        }).subscribe((data) => {
            this.cqiresponse = data;
            console.log(this.cqiresponse);

        },
            error => {
                this.alertService.error(error);
                this.cqiloading = false;
            });
    }

     getBprCount() {
        const firstDate = this.effortNextForm.get('bprDateRange').value.toLocaleString().split(',');
        const firstpartDate = firstDate[0];
        const secondDate = firstDate[2];
        const application = 'BPR';
        console.log("Value::" + this.effortNextForm.get('bprDateRange').value);
        this.bprsubmitted = true;

        // stop here if form is invalid
        if (!this.effortNextForm.get('bprDateRange').value) {

            return;
        }

        this.bprloading = true;


        this._http.get(this.APP_URL + '/count', {
            params: {
                firstDate: firstpartDate,
                secondDate: secondDate,
                application: application
            }

        }).subscribe((data) => {
            this.bprresponse = data;
            console.log(this.bprresponse);

        },
            error => {
                this.alertService.error(error);
                this.bprloading = false;
            });
    }

    getCfnCount() {
        const firstDate = this.effortNextForm.get('cfnDateRange').value.toLocaleString().split(',');
        const firstpartDate = firstDate[0];
        const secondDate = firstDate[2];
        const application = 'Feature';
        console.log("Value::" + this.effortNextForm.get('cfnDateRange').value);
        this.cfnsubmitted = true;

        // stop here if form is invalid
        if (!this.effortNextForm.get('cfnDateRange').value) {

            return;
        }

        this.cfnloading = true;


        this._http.get(this.APP_URL + '/count', {
            params: {
                firstDate: firstpartDate,
                secondDate: secondDate,
                application: application
            }

        }).subscribe((data) => {
            this.cfnresponse = data;
            console.log(this.cfnresponse);

        },
            error => {
                this.alertService.error(error);
                this.cfnloading = false;
            });
	}
	
	populateCQICaseTrend(content){
		this.applicationTitle="CQI CaseTrend";
		const cqistrArray = [];
		const application = 'CQI';
		console.log("Application")
		this._http.get(this.APP_URL + '/applicationTrendChart', {
			params: {
				application: application
			}

		}).subscribe((data) => {
			this.cqiTrendChartResponse = data;
			this.arr_length = this.cqiTrendChartResponse.length
			console.log('IRT Res:::', this.cqiTrendChartResponse);
			for (var i = 0; i < this.arr_length; i++) {
				
				cqistrArray.push(this.cqiTrendChartResponse[i]["MONTH"]);
				this.cqidataArray.push(this.cqiTrendChartResponse[i]["INCIDENT_COUNT"]);
			}
			
			this.cqiLineChart = new Chart('cqiLineChart', {
				type: 'line',
				data: {
					// labels: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"],
					labels: cqistrArray,
					datasets: [{
						label: 'No of Cases raised in each Months',
						data: this.cqidataArray,
						fill: false,
						lineTension: 0.2,
						borderColor: "darkslateblue",
						borderWidth: 2
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
    this.modalService.open(content, { centered: true });
	}



	populateBPRCaseTrend(content){
		this.applicationTitle="BPR CaseTrend";
		const bprstrArray = [];
		const application = 'BPR';
		console.log("Application")
		this._http.get(this.APP_URL + '/applicationTrendChart', {
			params: {
				application: application
			}

		}).subscribe((data) => {
			this.bprTrendChartResponse = data;
			this.arr_length = this.bprTrendChartResponse.length
			console.log('BPR Res:::', this.bprTrendChartResponse);
			for (var i = 0; i < this.arr_length; i++) {
				
				bprstrArray.push(this.bprTrendChartResponse[i]["MONTH"]);
				this.bprdataArray.push(this.bprTrendChartResponse[i]["INCIDENT_COUNT"]);
			}
			
			this.bprLineChart = new Chart('bprLineChart', {
				type: 'line',
				data: {
					// labels: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"],
					labels: bprstrArray,
					datasets: [{
						label: 'No of Cases raised in each Months',
						data: this.bprdataArray,
						fill: false,
						lineTension: 0.2,
						borderColor: "darkgreen",
						borderWidth: 2
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
    this.modalService.open(content, { centered: true });
	}


	populateCFNCaseTrend(content){
		this.applicationTitle="CFN CaseTrend";
		const cfnstrArray = [];
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
				
				cfnstrArray.push(this.cfnTrendChartResponse[i]["MONTH"]);
				this.cfndataArray.push(this.cfnTrendChartResponse[i]["INCIDENT_COUNT"]);
			}
			
			this.cfnLineChart = new Chart('cfnLineChart', {
				type: 'line',
				data: {
					// labels: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"],
					labels: cfnstrArray,
					datasets: [{
						label: 'No of Cases raised in each Months',
						data: this.cfndataArray,
						fill: false,
						lineTension: 0.2,
						borderColor: "blue",
						borderWidth: 2
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
    this.modalService.open(content, { centered: true });
	}

	populateCqiPieChart(content){
	 this.applicationTitle ="CQI Categorization";
	 const  cqiPieStrArray = [];
	 const cqiPieDataArray = [];
		const application = 'CQI';
		console.log("Application")
		this._http.get(this.APP_URL + '/applicationBarChart', {
			params: {
				application: application
			}

		}).subscribe((data) => {
			this.cqiPieChartResponse = data;
			this.arr_length = this.cqiPieChartResponse.length
			console.log('CQI Res:::', this.cqiPieChartResponse);
			for (var i = 0; i < this.arr_length; i++) {
				
				cqiPieStrArray.push(this.cqiPieChartResponse[i]["CASE_CATEGORIZATION"]);
				cqiPieDataArray.push(this.cqiPieChartResponse[i]["COUNT"]);
			}

  					 
			
			 this.cqiPieChart =new Chart('cqiPieChart', {
          type: 'pie',
          data: {
            labels: cqiPieStrArray,
            datasets: [{
                label : 'No. of cases ',
                data :cqiPieDataArray,
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
	
  this.cqiPieChartColors=['rgba(255,0,0)','rgba(0,0,255)','rgba(238,232,170)','rgba(0,128,0)','rgba(100,149,237)','rgba(30,144,255)','rgba(138,43,226)','rgba(255,20,147)','rgba(244,164,96)','rgba(230,230,250)','rgba(128,0,0)','rgba(220,20,60)','rgba(0,100,0)','rgba(0,0,128)','rgba(238,130,238)','rgba(176,196,222)','rgba(128,128,0)','rgba(144,238,144)','rgba(139,0,139)','rgba(219,112,147)'];
			var datast= this.cqiPieChart.data.datasets[0];
			for (var i = 0; i < datast.data.length; i++) {
            datast.backgroundColor[i]=this.cqiPieChartColors[i];
   
  }
  this.cqiPieChart.update();
	
		},
			error => {
				console.log('Error occured', error);
			});
			this.modalService.open(content, { centered: true });
 }

 populateBprPieChart(content){
	 this.applicationTitle ="BPR Categorization";
	 const  bprPieStrArray = [];
	 const bprPieDataArray = [];
		const application = 'BPR';
		console.log("Application")
		this._http.get(this.APP_URL + '/applicationBarChart', {
			params: {
				application: application
			}

		}).subscribe((data) => {
			this.bprPieChartResponse = data;
			this.arr_length = this.bprPieChartResponse.length
			console.log('BPR Res:::', this.bprPieChartResponse);
			for (var i = 0; i < this.arr_length; i++) {
				
				bprPieStrArray.push(this.bprPieChartResponse[i]["CASE_CATEGORIZATION"]);
				bprPieDataArray.push(this.bprPieChartResponse[i]["COUNT"]);
			}

  					 
			
			 this.bprPieChart =new Chart('bprPieChart', {
          type: 'pie',
          data: {
            labels: bprPieStrArray,
            datasets: [{
                label : 'No. of cases ',
                data :bprPieDataArray,
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
	
  this.bprPieChartColors=['rgba(255,20,147)','rgba(255,0,0)','rgba(0,0,255)','rgba(238,232,170)','rgba(0,128,0)','rgba(100,149,237)','rgba(30,144,255)','rgba(138,43,226)','rgba(244,164,96)','rgba(230,230,250)','rgba(128,0,0)','rgba(220,20,60)','rgba(0,100,0)','rgba(0,0,128)','rgba(238,130,238)','rgba(176,196,222)','rgba(128,128,0)','rgba(144,238,144)','rgba(139,0,139)','rgba(219,112,147)'];
			var datast= this.bprPieChart.data.datasets[0];
			for (var i = 0; i < datast.data.length; i++) {
            datast.backgroundColor[i]=this.bprPieChartColors[i];
   
  }
  this.bprPieChart.update();
	
		},
			error => {
				console.log('Error occured', error);
			});
			this.modalService.open(content, { centered: true });
 }

populateCfnPieChart(content){
	 this.applicationTitle ="CFN Categorization";
	 const  cfnPieStrArray = [];
	 const cfnPieDataArray = [];
		const application = 'Feature';
		console.log("Application")
		this._http.get(this.APP_URL + '/applicationBarChart', {
			params: {
				application: application
			}

		}).subscribe((data) => {
			this.cfnPieChartResponse = data;
			this.arr_length = this.cfnPieChartResponse.length
			console.log('CFN Res:::', this.cfnPieChartResponse);
			for (var i = 0; i < this.arr_length; i++) {
				
				cfnPieStrArray.push(this.cfnPieChartResponse[i]["CASE_CATEGORIZATION"]);
				cfnPieDataArray.push(this.cfnPieChartResponse[i]["COUNT"]);
			}

  					 
			
			 this.cfnPieChart =new Chart('cfnPieChart', {
          type: 'pie',
          data: {
            labels: cfnPieStrArray,
            datasets: [{
                label : 'No. of cases ',
                data :cfnPieDataArray,
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
	
  this.cfnPieChartColors=['rgba(100,149,237)','rgba(255,0,0)','rgba(0,0,255)','rgba(238,232,170)','rgba(0,128,0)','rgba(30,144,255)','rgba(138,43,226)','rgba(255,20,147)','rgba(244,164,96)','rgba(230,230,250)','rgba(128,0,0)','rgba(220,20,60)','rgba(0,100,0)','rgba(0,0,128)','rgba(238,130,238)','rgba(176,196,222)','rgba(128,128,0)','rgba(144,238,144)','rgba(139,0,139)','rgba(219,112,147)'];
			var datast= this.cfnPieChart.data.datasets[0];
			for (var i = 0; i < datast.data.length; i++) {
            datast.backgroundColor[i]=this.cfnPieChartColors[i];
   
  }
  this.cfnPieChart.update();
	
		},
			error => {
				console.log('Error occured', error);
			});
			this.modalService.open(content, { centered: true });
 }
}
