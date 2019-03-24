import { Component, OnInit } from '@angular/core';
import { CommandService } from 'src/app/services/command.service';

import { Command } from 'src/app/models/command.model';
import { TimestampFacility } from 'src/app/models/timestamp-facility.model';
import { Seance } from 'src/app/models/seance.model';
import { SeanceService } from 'src/app/services/seance.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-timestamp-facility',
  templateUrl: './timestamp-facility.component.html',
  styleUrls: ['./timestamp-facility.component.css']
})
export class TimestampFacilityComponent implements OnInit {

  timestampFacilities: TimestampFacility[]
  seance: Seance;
  command: Command;
  chart;
  

  constructor(private commandService: CommandService,
              private seanceService: SeanceService) { }

  ngOnInit() {

    this.chart = new Chart('myChart', {
      type: 'bar',
      data: {
        labels: ["Janvier", "February", "March", "April", "May", "June", "July"],
        datasets: [
            {
                label: "My First dataset",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(75,192,192,0.4)",
                borderColor: "rgba(75,192,192,1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(75,192,192,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [65, 59, 80, 81, 56, 55, 40],
                spanGaps: false,
            }
        ]
    },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          }
      }
  });

    // this.seanceService.seanceSubject.subscribe(res => {
    //   this.seance = res;
    //   this.timestampFacilities = res.timestampFacilities;
    //   console.log(" this.timestampFacilities : ",  this.timestampFacilities);
    // });

    // this.commandService.commandSubject.subscribe(res => {
    //   this.command = res;
    // });


    // this.commandService.commandSubject.subscribe(res => {
      
    //   console.log("facility-booking ", res.items[res.items.length-1]) ;
      
      
    // });
  }
}
