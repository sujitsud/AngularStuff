import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AlertService } from '../_services/alert.service';
import { DatePipe } from '@angular/common';
import {IrttrendchartComponent} from '../irttrendchart/irttrendchart.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {Chart} from 'chart.js';




@Component({
    templateUrl: 'home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	applicationTitle : string;
    effortForm: FormGroup;
    irtloading = false;
    qddtsloading = false;
    irtsubmitted = false;
    qddtssubmitted = false;
    timssubmitted = false;
    prrqsubmitted = false;

    currentUser: User;
    readonly APP_URL = 'https://wwwin-iap-dev.cisco.com/eepoc';
    isCollapsed: boolean = true;
    users: User[] = [];
    irtresponse: any; qddtsresponse: any; timsresponse: any; prrqresponse: any;


	irtTrendChartResponse : any;
    irtLineChart = [];
	irtdataArray = [];
	arr_length: number;

	qddtsTrendChartResponse: any;
    qddtsLineChart = [];
	qddtsdataArray = [];
	


	timsTrendChartResponse: any;
	timsLineChart = [];
	timsdataArray = [];

	prrqTrendChartResponse: any;
	prrqLineChart = [];
	prrqdataArray = [];


	timsPieChartColors =[];
	timsPieChartResponse : any;
  	 timsPieChart :any;
	
	irtPieChartColors =[];
	irtPieChartResponse : any;
	irtPieChart :any;
	   
	qddtsPieChartColors =[];
	qddtsPieChartResponse : any;
	  qddtsPieChart :any;
	  
	  prrqPieChartColors =[];
	prrqPieChartResponse : any;
  	prrqPieChart :any;
	

    constructor(
        private userService: UserService,
        private _http: HttpClient,
        private formBuilder: FormBuilder,
        private alertService: AlertService,
		private datePipe: DatePipe,
		private modalService: NgbModal
		) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    }

    ngOnInit() {

        this.effortForm = this.formBuilder.group({
            dateRange: ['', Validators.required],
            qddtsDateRange: ['', Validators.required],
            timsDateRange: ['', Validators.required],
            prrqDateRange: ['', Validators.required]
        });

	   // this.loadAllUsers();
	  
    }
    get f() { return this.effortForm.controls; }

    /* deleteUser(id: number) {
        this.userService.delete(id).pipe(first()).subscribe(() => {
            this.loadAllUsers();
        });
    }

    private loadAllUsers() {
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.users = users;
        });
    }
 */


	
    getIrtCount() {
        const firstDate = this.effortForm.get('dateRange').value.toLocaleString().split(',');
        const firstpartDate = firstDate[0];
        const secondDate = firstDate[2];
        const application = 'GLOBAL';

        this.irtsubmitted = true;
        console.log('Date::' + this.effortForm.get('dateRange').value);
        console.log('First Date ::' + firstpartDate + ' ' + 'Second date::' + secondDate);

        // console.log('Date::' + this.datePipe.transform(this.effortForm.get('dateRange').value, 'MM/dd/yyyy'));
        // stop here if form is invalid

        if (!this.effortForm.get('dateRange').value) {
            return;
        }

        this.irtloading = true;
        this._http.get(this.APP_URL + '/count', {
            params: {
                firstDate: firstpartDate,
                secondDate: secondDate,
                application: application
            }

        }).subscribe((data) => {
            this.irtresponse = data;
            console.log(this.irtresponse);
            this.isCollapsed = !this.isCollapsed;
        },
            error => {
                this.alertService.error(error);
                this.irtloading = false;
            });
    }

    getQddtsCount() {
        const firstDate = this.effortForm.get('qddtsDateRange').value.toLocaleString().split(',');
        const firstpartDate = firstDate[0];
        const secondDate = firstDate[2];
        const application = 'QDDTS';
        this.qddtssubmitted = true;

        // stop here if form is invalid
        if (!this.effortForm.get('qddtsDateRange').value) {
            return;
        }

        this.qddtsloading = true;

        this._http.get(this.APP_URL + '/count', {
            params: {
                firstDate: firstpartDate,
                secondDate: secondDate,
                application: application
            }

        }).subscribe((data) => {
            this.qddtsresponse = data;
            console.log(this.qddtsresponse);
            this.isCollapsed = !this.isCollapsed;
        },
            error => {
                this.alertService.error(error);
                this.qddtsloading = false;
            });
    }

    getTimsCount() {
        const firstDate = this.effortForm.get('timsDateRange').value.toLocaleString().split(',');
        const firstpartDate = firstDate[0];
        const secondDate = firstDate[2];
        const application = 'TIMS';
        this.timssubmitted = true;

        // stop here if form is invalid
        if (!this.effortForm.get('timsDateRange').value) {
            return;
        }

        // this.loading = true;

        this._http.get(this.APP_URL + '/count', {
            params: {
                firstDate: firstpartDate,
                secondDate: secondDate,
                application: application
            }

        }).subscribe((data) => {
            this.timsresponse = data;
            console.log(this.timsresponse);
            this.isCollapsed = !this.isCollapsed;
        },
            error => {
                this.alertService.error(error);
                //this.loading = false;
            });

    }


    getPrrqCount() {
        const firstDate = this.effortForm.get('prrqDateRange').value.toLocaleString().split(',');
        const firstpartDate = firstDate[0];
        const secondDate = firstDate[2];
        const application = 'PRRQ';
        this.prrqsubmitted = true;

        // stop here if form is invalid
        if (!this.effortForm.get('prrqDateRange').value) {
            return;
        }

        //this.loading = true;

        this._http.get(this.APP_URL + '/count', {
            params: {
                firstDate: firstpartDate,
                secondDate: secondDate,
                application: application
            }

        }).subscribe((data) => {
            this.prrqresponse = data;
            console.log(this.prrqresponse);
            this.isCollapsed = !this.isCollapsed;
        },
            error => {
                this.alertService.error(error);
                //this.loading = false;
            });

    }

    toggleCollapsed() {
        this.isCollapsed = !this.isCollapsed;
	}
	
	openLg(content) {
		this.applicationTitle="IRT CaseTrend";
		const strArray = [];
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
				
				strArray.push(this.irtTrendChartResponse[i]["MONTH"]);
				this.irtdataArray.push(this.irtTrendChartResponse[i]["INCIDENT_COUNT"]);
			}
			
			this.irtLineChart = new Chart('irtLineChart', {
				type: 'line',
				data: {
					// labels: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"],
					labels: strArray,
					datasets: [{
						label: 'No of Cases raised in each Months',
						data: this.irtdataArray,
						fill: false,
						lineTension: 0.2,
						borderColor: "darkslateblue",
						borderWidth: 2
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
    this.modalService.open(content, { centered: true });
  }

  populateQddts(content){
	  this.applicationTitle= "QDDTS CaseTrend";
	  const qddtsstrArray = [];
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
				
				qddtsstrArray.push(this.qddtsTrendChartResponse[i]["MONTH"]);
				this.qddtsdataArray.push(this.qddtsTrendChartResponse[i]["INCIDENT_COUNT"]);
			}
			
			this.qddtsLineChart = new Chart('qddtsLineChart', {
				type: 'line',
				data: {
					// labels: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"],
					labels:qddtsstrArray,
					datasets: [{
						label: 'No of Cases raised in each Months',
						data: this.qddtsdataArray,
						fill: false,
						lineTension: 0.2,
						borderColor: "firebrick",
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

  populateTims(content){
	   this.applicationTitle= "TIMS CaseTrend";
	const timsstrArray = [];
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
				
				timsstrArray.push(this.timsTrendChartResponse[i]["MONTH"]);
				this.timsdataArray.push(this.timsTrendChartResponse[i]["INCIDENT_COUNT"]);
			}
			
			this.timsLineChart = new Chart('timsLineChart', {
				type: 'line',
				data: {
					// labels: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"],
					labels: timsstrArray,
					datasets: [{
						label: 'No of Cases raised in each Months',
						data: this.timsdataArray,
						fill: false,
						lineTension: 0.2,
						borderColor: "brown",
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

 populatePrrq(content){
	const application = 'PRRQ';
this.applicationTitle= "PRRQ CaseTrend";
		const prrqstrArray = [];
		console.log("Application")
		this._http.get(this.APP_URL + '/applicationTrendChart', {
			params: {
				application: application
			}

		}).subscribe((data) => {
			this.prrqTrendChartResponse = data;
			this.arr_length = this.prrqTrendChartResponse.length
			console.log('PRRQ Res:::', this.prrqTrendChartResponse);
			for (var i = 0; i < this.arr_length; i++) {
				
				prrqstrArray.push(this.prrqTrendChartResponse[i]["MONTH"]);
				this.prrqdataArray.push(this.prrqTrendChartResponse[i]["INCIDENT_COUNT"]);
			}
			
			this.prrqLineChart = new Chart('prrqLineChart', {
				type: 'line',
				data: {
					// labels: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"],
					labels: prrqstrArray,
					datasets: [{
						label: 'No of Cases raised in each Months',
						data: this.prrqdataArray,
						fill: false,
						lineTension: 0.2,
						borderColor: "forestgreen",
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

 populateTimsPieChart(content){
	 this.applicationTitle ="TIMS Categorization";
	 const  timsPieStrArray = [];
	 const timsPieDataArray = [];
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
				
				timsPieStrArray.push(this.timsPieChartResponse[i]["CASE_CATEGORIZATION"]);
				timsPieDataArray.push(this.timsPieChartResponse[i]["COUNT"]);
			}

  					 
			
			 this.timsPieChart =new Chart('timsPieChart', {
          type: 'pie',
          data: {
            labels: timsPieStrArray,
            datasets: [{
                label : 'No. of cases ',
                data :timsPieDataArray,
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
			this.modalService.open(content, { centered: true });
 }

 populateIRTPieChart(content){
	  this.applicationTitle ="IRT Categorization";
	 const  irtPieStrArray = [];
	 const irtPieDataArray = [];
		const application = 'GLOBAL';
		console.log("Application")
		this._http.get(this.APP_URL + '/applicationBarChart', {
			params: {
				application: application
			}

		}).subscribe((data) => {
			this.irtPieChartResponse = data;
			this.arr_length = this.irtPieChartResponse.length
			console.log('IRT Res:::', this.irtPieChartResponse);
			for (var i = 0; i < this.arr_length; i++) {
				
				irtPieStrArray.push(this.irtPieChartResponse[i]["CASE_CATEGORIZATION"]);
				irtPieDataArray.push(this.irtPieChartResponse[i]["COUNT"]);
			}

  					 
			
			 this.irtPieChart =new Chart('irtPieChart', {
          type: 'pie',
          data: {
            labels: irtPieStrArray,
            datasets: [{
                label : 'No. of cases ',
                data :irtPieDataArray,
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
	
  this.irtPieChartColors=['rgba(138,43,226)','rgba(255,20,147)','rgba(244,164,96)','rgba(230,230,250)','rgba(128,0,0)','rgba(220,20,60)','rgba(0,100,0)','rgba(0,0,128)','rgba(238,130,238)','rgba(176,196,222)','rgba(255,0,0)','rgba(0,0,255)','rgba(238,232,170)','rgba(0,128,0)','rgba(100,149,237)','rgba(30,144,255)','rgba(128,128,0)','rgba(144,238,144)','rgba(139,0,139)','rgba(219,112,147)'];
			var datast= this.irtPieChart.data.datasets[0];
			for (var i = 0; i < datast.data.length; i++) {
            datast.backgroundColor[i]=this.irtPieChartColors[i];
   
  }
  this.irtPieChart.update();
	
		},
			error => {
				console.log('Error occured', error);
			});
			this.modalService.open(content, { centered: true });
 }

 populateQDDTSPieChart(content){

	 this.applicationTitle ="QDDTS Categorization";
	 const  qddtsPieStrArray = [];
	 const qddtsPieDataArray = [];
		const application = 'QDDTS';
		console.log("Application")
		this._http.get(this.APP_URL + '/applicationBarChart', {
			params: {
				application: application
			}

		}).subscribe((data) => {
			this.qddtsPieChartResponse = data;
			this.arr_length = this.qddtsPieChartResponse.length
			console.log('QDDTS Res:::', this.qddtsPieChartResponse);
			for (var i = 0; i < this.arr_length; i++) {
				
				qddtsPieStrArray.push(this.qddtsPieChartResponse[i]["CASE_CATEGORIZATION"]);
				qddtsPieDataArray.push(this.qddtsPieChartResponse[i]["COUNT"]);
			}

  					 
			
			 this.qddtsPieChart =new Chart('qddtsPieChart', {
          type: 'pie',
          data: {
            labels: qddtsPieStrArray,
            datasets: [{
                label : 'No. of cases ',
                data :qddtsPieDataArray,
				backgroundColor: [],
                borderWidth:2
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
	
  this.qddtsPieChartColors=['rgba(220,20,60)','rgba(0,100,0)','rgba(0,0,128)','rgba(238,130,238)','rgba(176,196,222)','rgba(255,0,0)','rgba(0,0,255)','rgba(138,43,226)','rgba(255,20,147)','rgba(244,164,96)','rgba(230,230,250)','rgba(128,0,0)','rgba(238,232,170)','rgba(0,128,0)','rgba(100,149,237)','rgba(30,144,255)','rgba(128,128,0)','rgba(144,238,144)','rgba(139,0,139)','rgba(219,112,147)'];
			var datast= this.qddtsPieChart.data.datasets[0];
			for (var i = 0; i < datast.data.length; i++) {
            datast.backgroundColor[i]=this.qddtsPieChartColors[i];
   
  }
  this.qddtsPieChart.update();
	
		},
			error => {
				console.log('Error occured', error);
			});
			this.modalService.open(content, { centered: true });
 }

 populatePRRQPieChart(content){

	this.applicationTitle ="PRRQ Categorization";
	 const  prrqPieStrArray = [];
	 const prrqPieDataArray = [];
		const application = 'PRRQ';
		console.log("Application")
		this._http.get(this.APP_URL + '/applicationBarChart', {
			params: {
				application: application
			}

		}).subscribe((data) => {
			this.prrqPieChartResponse = data;
			this.arr_length = this.prrqPieChartResponse.length
			console.log('PRRQ Res:::', this.prrqPieChartResponse);
			for (var i = 0; i < this.arr_length; i++) {
				
				prrqPieStrArray.push(this.prrqPieChartResponse[i]["CASE_CATEGORIZATION"]);
				prrqPieDataArray.push(this.prrqPieChartResponse[i]["COUNT"]);
			}

  					 
			
			 this.prrqPieChart =new Chart('prrqPieChart', {
          type: 'pie',
          data: {
            labels: prrqPieStrArray,
            datasets: [{
                label : 'No. of cases ',
                data :prrqPieDataArray,
				backgroundColor: [],
                borderWidth:2
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
	
  this.prrqPieChartColors=['rgba(220,20,60)','rgba(0,100,0)','rgba(0,0,128)','rgba(238,130,238)','rgba(176,196,222)','rgba(255,0,0)','rgba(0,0,255)','rgba(138,43,226)','rgba(255,20,147)','rgba(244,164,96)','rgba(230,230,250)','rgba(128,0,0)','rgba(238,232,170)','rgba(0,128,0)','rgba(100,149,237)','rgba(30,144,255)','rgba(128,128,0)','rgba(144,238,144)','rgba(139,0,139)','rgba(219,112,147)'];
			var datast= this.prrqPieChart.data.datasets[0];
			for (var i = 0; i < datast.data.length; i++) {
            datast.backgroundColor[i]=this.prrqPieChartColors[i];
   
  }
  this.prrqPieChart.update();
	
		},
			error => {
				console.log('Error occured', error);
			});
			this.modalService.open(content, { centered: true });

 }

}