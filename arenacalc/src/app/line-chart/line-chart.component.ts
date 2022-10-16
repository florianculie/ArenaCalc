import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { ArenaCalculatorService } from '../arena-calculator.service';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {
  public chart: any;
  ratingLabels!: number[];
  ratingTwos!: number[];
  ratingThrees!: number[];
  ratingFives!: number[];

  constructor(private arenaCalculatorService: ArenaCalculatorService) { }

  ngOnInit(): void {
    this.ratingLabels = [ 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700,
      1800, 1900, 2000, 2100, 2200, 2300, 2400, 2500, 2600, 2700, 2800, 2900, 3000 ];
    this.ratingTwos = [];
    this.ratingThrees = [];
    this.ratingFives = [];
    this.ratingLabels.forEach(label => {
      this.ratingTwos.push(this.arenaCalculatorService.computeTLK(label, 2));
      this.ratingThrees.push(this.arenaCalculatorService.computeTLK(label, 3));
      this.ratingFives.push(this.arenaCalculatorService.computeTLK(label, 5));
    });
    this.createChart(this.ratingLabels, this.ratingTwos, this.ratingThrees, this.ratingFives);
  }

  createChart(labels: number[], twosSerie: number[], threesSerie: number[], fivesSerie: number[]){

    this.chart = new Chart("MyChart", {
      type: 'line', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: labels,
	       datasets: [
          {
            label: "2v2",
            data: twosSerie,
            backgroundColor: '#FFD770',
            borderColor: '#FFD770'
          },
          {
            label: "3v3",
            data: threesSerie,
            backgroundColor: '#20AC68',
            borderColor: '#20AC68'
          },
          {
            label: "5v5",
            data: fivesSerie,
            backgroundColor: '#B33F62',
            borderColor: '#B33F62'
          }
        ]
      },
      options: {
        aspectRatio: 2.5,
        elements:{
          line:{
            tension: 0.1
          }
        },
        plugins:{
          legend:{
            labels:{
              color:'#EEEEEE'
            }
          },
          tooltip:{
            backgroundColor: '#77ABB7',
          }
        },
        scales:{
          y:{
            ticks:{
              color:'#EEEEEE'
            }
          },
          x:{
            ticks:{
              color:'#EEEEEE'
            }
          }
        }
      }
    });
  }

}
