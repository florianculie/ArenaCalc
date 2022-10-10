import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-bracket-calc',
  templateUrl: './bracket-calc.component.html',
  styleUrls: ['./bracket-calc.component.css']
})
export class BracketCalcComponent implements OnInit {

  @Input() bracketType!: number;
  ratingInput: number = 0;
  tbcPoints!: number;
  tlkPoints!: number;


  constructor() { }

  ngOnInit(): void {
    this.ratingInput = 0;
    this.tbcPoints = 0;
    this.tlkPoints = 0;
  }

  onClick(){
    this.tbcPoints = this.computeTBC(this.ratingInput);
    this.tlkPoints = this.computeTLK(this.ratingInput);
  }

  computeTBC(rating : number): number{
    let exponent : number = (-0.00412 * rating);
    let number : number = 2.71828;

    let points : number = 1022 / (1 + 123 * Math.pow(number, exponent)) + 580
    switch(this.bracketType){
      case 2:
        points = points * 0.76;
        break;
      case 3:
        points = points * 0.88;
        break;
      case 5:
      default:
        break;
    }
    return Math.round(points);
  }

  computeTLK(rating : number): number{
    return this.computeTBC(rating);
  }
}
