import { Component, OnInit, ViewChild, HostListener, AfterViewInit, ChangeDetectorRef} from '@angular/core';
import { MdbTablePaginationComponent, MdbTableDirective } from 'angular-bootstrap-md';
import { HttpClient, HttpParams } from '@angular/common/http';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css']
})
export class DatatableComponent implements OnInit , AfterViewInit {
	@ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective
  personList: any = [];
  previous: any = [];
   readonly APP_URL = 'https://wwwin-iap-dev.cisco.com/eepoc';
clicked = false;

editField: string;
searchText: string = '';
selectedEorV: string;
selectedStatus : string;
selectedResource : string;
 
 
  constructor(private cdRef: ChangeDetectorRef,private _http: HttpClient) {   }
@HostListener('input') oninput() {
    this.searchItems();
  }
  ngOnInit() {
     this.personList= [
	/*  {id: 2, summary: 'TIMS', eorv: 'E', status: 'Pending', resourceName: 'rsreelat'},
	  {id: 2, summary: 'TIMS', eorv: 'E', status: 'Pending', resourceName: 'marengan'},
	   {id: 2, summary: 'TIMS', eorv: 'E', status: 'Pending', resourceName: 'sujitsud'},
		{id: 2, summary: 'TIMS', eorv: 'E', status: 'Pending', resourceName: 'degahlot'},
		 {id: 2, summary: 'PRRQ', eorv: 'E', status: 'Pending', resourceName: 'shimukhe'},
		  {id: 2, summary: 'CQI', eorv: 'E', status: 'Pending', resourceName: 'shimukhe'},
		   */
			 
		  
	];
	 this.mdbTable.setDataSource(this.personList);
    this.personList = this.mdbTable.getDataSource();
	this.previous = this.mdbTable.getDataSource();
	
	

  }
   ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(4);

    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }
  updateList(id: number, property: string, event: any) {
      const editField = event.target.textContent;
	  this.personList[id][property] = editField;
	  

	
    }

    remove(id: any) {
      //this.awaitingPersonList.push(this.personList[id]);
	  this.personList.splice(id, 1);
	   this.mdbTable.setDataSource(this.personList);
    this.personList = this.mdbTable.getDataSource();
    }

	insert(id : any){
		
		this._http.get(this.APP_URL + '/insert', {
            params: {
                editField:  this.editField,
                selectedEorV: this.selectedEorV,
				selectedStatus: this.selectedStatus,
				selectedResource: this.selectedResource
            }

        }).subscribe((data) => {
            
			Swal.fire("Saved successfully","","success");
	
           
        },
            error => {
               this.clicked = false;
            });
	}
    add() {
      /* if (this.awaitingPersonList.length > 0) {
        const person = this.awaitingPersonList[0];
        this.personList.push(person);
        this.awaitingPersonList.splice(0, 1);
	  } */
	/* if (localStorage.getItem('idkey') === null) {
		let idSequence = 0;
		localStorage.setItem('idkey', idSequence.toString());
	}
	 let counter = Number(localStorage.getItem('idkey'));
	 counter = counter +1; */
	
	 this.clicked = false;
	  const personDetails={};
	 
	  personDetails['id']='';
	  personDetails['summary']='';
	  personDetails['eorv']='';
	  personDetails['status']='';
	  personDetails['resourceName']='';
	 // this.personList.push(personDetails);
	 this.personList.unshift(personDetails);
	   this.mdbTable.setDataSource(this.personList);
	this.personList = this.mdbTable.getDataSource();
	//localStorage.setItem('idkey', counter.toString());
	

    }

    changeValue(id: number, property: string, event: any) {
		
	  this.editField = event.target.textContent;
	console.log("Edit Field", this.editField)

	 
		
	}
	
	searchItems() {
    const prev = this.mdbTable.getDataSource();

    if (!this.searchText) {
      this.mdbTable.setDataSource(this.previous);
      this.personList = this.mdbTable.getDataSource();
    }

    if (this.searchText) {
      this.personList = this.mdbTable.searchLocalDataBy(this.searchText);
      this.mdbTable.setDataSource(prev);
    }
  }

  selectHandler(event :any){
	this.selectedEorV=event.target.value;
	console.log("Selected e  or v::",this.selectedEorV)

  }
  selectHandler1(event : any){
	  this.selectedStatus = event.target.value;
	  console.log("Selected status",this.selectedStatus)

  }
  selectHandler2(event : any){
this.selectedResource = event.target.value;
console.log("Selected Resource",this.selectedResource) 


}


  }
