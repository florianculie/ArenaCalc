import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bracket-calc',
  templateUrl: './bracket-calc.component.html',
  styleUrls: ['./bracket-calc.component.scss']
})
export class BracketCalcComponent implements OnInit {

  bracketName!: string;
  bracketType: number = 2
  ratingInput: number = 0;
  tlkPoints!: number;
  tbcPoints!: number;


  constructor() { }

  ngOnInit(): void {
    this.computeBracket();
    this.ratingInput = 0;
    this.tlkPoints = 0;
    this.tbcPoints = 0;
  }

  onClick(){
    alert(this.ratingInput)
    this.tlkPoints = this.computeTLK(this.ratingInput);
    this.tbcPoints = this.computeTBC(this.ratingInput);
  }

  computeTLK(rating : number): number{
    return rating + 10;
  }
//Math.pow(number, exponent)
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

  computeBracket(){
    if(this.bracketType == 2){
        this.bracketName = "2v2";
    }
    if(this.bracketType == 2){
        this.bracketName = "2v2";
    }
    if(this.bracketType == 2){
        this.bracketName = "2v2";
    }
  }
}
