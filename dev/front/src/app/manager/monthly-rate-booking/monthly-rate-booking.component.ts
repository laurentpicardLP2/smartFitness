import { ReportingService } from 'src/app/services/reporting.service';
import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-monthly-rate-booking',
  templateUrl: './monthly-rate-booking.component.html',
  styleUrls: ['./monthly-rate-booking.component.css']
})
export class MonthlyRateBookingComponent implements OnInit {
  chart: Chart;
  previousMonth: number;
  monthDataSet: string[] = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"]
  monthLabels: string[] = [];

  constructor(private reportingService: ReportingService) { }

  ngOnInit() {

  this.previousMonth = ((new Date()).getMonth() > 0) ? (new Date()).getMonth() - 1 : 11;
    for(let m = this.previousMonth; m < 12; m++){
      this.monthLabels.push(this.monthDataSet[m]);
    }
    for(let m = 0; m < this.previousMonth; m++){
      this.monthLabels.push(this.monthDataSet[m]);
    }

    this.chart = new Chart('synthese', {
      type: 'bar',
      data: {
        labels: this.monthLabels,
        datasets: [
            {
                label: (new Date().getFullYear()-2) + "-" + (new Date().getFullYear()-1),
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
                data: this.reportingService.listDataSet1,
                spanGaps: false,
            },
            {
              label: (new Date().getFullYear()-1) + "-" + (new Date().getFullYear()),
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
              data: this.reportingService.listDataSet2,
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
