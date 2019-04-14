import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ReportingService } from 'src/app/services/reporting.service';

@Component({
  selector: 'app-balance-by-facility',
  templateUrl: './balance-by-facility.component.html',
  styleUrls: ['./balance-by-facility.component.css']
})
export class BalanceByFacilityComponent implements OnInit {
  chart: Chart;

  constructor(private reportingService: ReportingService) { }

  ngOnInit() {
    
    this.chart = new Chart('rentability', {
      type: 'bar',
      data: {
        labels: this.reportingService.listLabelSetRentability,
        datasets: [
            {
                label: "Comparatif recettes - dépenses par équipement",
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
                data: this.reportingService.listDataSetRentability,
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

  ngOnDestroy(){
    for(let i=0; i<this.reportingService.listDataSetRentability.length; i++){
      this.reportingService.listDataSetRentability = [];
      this.reportingService.listLabelSetRentability = [];
    }
  }


}
