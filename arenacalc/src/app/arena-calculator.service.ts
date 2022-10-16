import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArenaCalculatorService {

  constructor() { }

  computeTBC(rating : number, bracketType : number): number{
    let exponent : number = (-0.00412 * rating);
    let number : number = 2.71828;

    let points : number = 1022 / (1 + 123 * Math.pow(number, exponent)) + 580
    switch(bracketType){
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

  computeTLK(rating : number, bracketType : number): number{
    return this.computeTBC(rating, bracketType);
  }
}
