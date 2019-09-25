import { Component, OnInit } from '@angular/core';
import {Chart} from 'chart.js';

@Component({
  selector: 'app-irtbarchart',
  templateUrl: './irtbarchart.component.html',
  styleUrls: ['./irtbarchart.component.css']
})
export class IrtbarchartComponent implements OnInit {
    title="IRT Pie Chart";
    BarChart=[];
  constructor() { }

  ngOnInit() {
      this.BarChart =new Chart('barChart', {
          type: 'horizontalBar',
          data: {
            labels: [ 'Jan',"Feb","Mar","Apr","May","June","July","Aug","Sep"],
            datasets: [{
                label : 'No. of cases ',
                data :[9,7,3,5,2,10,11,2,6],
                backgroundColor: 'rgba(255,69,0)',
                borderWidth:1
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
  }

}
