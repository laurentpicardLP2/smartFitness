import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-monthly-rate-booking',
  templateUrl: './monthly-rate-booking.component.html',
  styleUrls: ['./monthly-rate-booking.component.css']
})
export class MonthlyRateBookingComponent implements OnInit {
  chart: Chart;
  

  constructor() { }

  ngOnInit() {

  //   this.chart = new Chart('myChart', {
  //     type: 'bar',
  //     data: {
  //       labels: ["1900", "1950", "1999", "2050"],
  //       datasets: [
  //         {
  //           label: "Africa",
  //           backgroundColor: "#3e95cd",
  //           data: [133,221,783,2478]
  //         }, {
  //           label: "Europe",
  //           backgroundColor: "#8e5ea2",
  //           data: [408,547,675,734]
  //         }
  //       ]
  //     },
  //     options: {
  //       title: {
  //         display: true,
  //         text: 'Population growth (millions)'
  //       }
  //     }
  // });


    this.chart = new Chart('myChart', {
      type: 'bar',
      data: {
        labels: ["Janvier", "February", "March", "April", "May", "June", "July"],
        datasets: [
            {
                label: "2017-2018",
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
                data: [9440, 8000, 7000, 6000, 6500, 7500, 8500],
                spanGaps: false,
            },
            {
              label: "2018-2019",
              fill: false,
              lineTension: 0.1,
              backgroundColor: "#8e5ea2",
              borderColor: "#8e5ea2",
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: "#8e5ea2",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "#8e5ea2",
              pointHoverBorderColor: "rgba(220,220,220,1)",
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: [13440, 12000, 11000, 10000, 10500, 11500, 12500],
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

  
  }
}
