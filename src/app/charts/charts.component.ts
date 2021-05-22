import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import {Chart,registerables} from 'node_modules/chart.js';
Chart.register(...registerables);

import { Store } from '@ngrx/store';
import {dataModel} from '../data.model';
import { AppState } from '../app.state';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
  

  dataFromAPI: any;
  myDataModel: Observable<dataModel>;

  constructor(private dataService:DataService,private store: Store<any>) { 
    // this.myDataModel = this.store.select(state => state.dataArrays);
    this.myDataModel = this.store.select(state => state.dataArrays);
  }

  ngOnInit(): void {
    this.dataService.getData()
    .subscribe(
      (value) => {
                  this.dataFromAPI = value; 
                  // this.drawChart();      
                  this.updateData();      
      },
      (error) => {console.log("error: " + error)}
    );

  }

  updateData() {
    this.store.dispatch({
      type: 'UPDATE_DATA',
      payload: <dataModel> {
        lines: this.dataFromAPI.lineData,
        bars: this.dataFromAPI.barsData,
        bubbles: this.dataFromAPI.bubbleData
      }
    });
    this.drawChart();
  }

  drawChart(){
    // var dataArrays = this.dataFromAPI;
     var dataArrays : dataModel;
      this.store.select(state => state.dataArrays)
      .subscribe(
       (data) => { dataArrays = data
        var myChart = new Chart("myChart", {
          type: 'bar',
          data: {
              labels: ['1', '2', '3', '4', '5', '6','7', '8', '9', '10'],
              datasets: [
                {
                  type: 'line',
                  label: 'Line Demo',
                  backgroundColor: 'green',
                  borderColor: 'green',
                  // data: dataArrays.lineData,
                  data: dataArrays.lines,
                },
                {
                  type: 'bubble',
                  label: 'bubble Demo',
                  backgroundColor: 'red',
                  data: dataArrays.bubbles
                },
                {
                  type: 'bar',
                  label: 'Bar Demo',
                  backgroundColor: '#7579ef',
                  data: dataArrays.bars
                }, 
              ]
          },
          options: {
              scales: {
                  y: {
                      beginAtZero: true
                  }
              }
          }
        });
      }
     );

    // var myChart = new Chart("myChart", {
    //     type: 'bar',
    //     data: {
    //         labels: ['1', '2', '3', '4', '5', '6','7', '8', '9', '10'],
    //         datasets: [
    //           {
    //             type: 'line',
    //             label: 'Line Demo',
    //             backgroundColor: 'green',
    //             borderColor: 'green',
    //             // data: dataArrays.lineData,
    //             data: dataArrays.lines,
    //           },
    //           {
    //             type: 'bubble',
    //             label: 'bubble Demo',
    //             backgroundColor: 'red',
    //             data: dataArrays.bubbleData
    //           },
    //           {
    //             type: 'bar',
    //             label: 'Bar Demo',
    //             backgroundColor: '#7579ef',
    //             data: dataArrays.barsData
    //           }, 
    //         ]
    //     },
    //     options: {
    //         scales: {
    //             y: {
    //                 beginAtZero: true
    //             }
    //         }
    //     }
    //});
  }

}
