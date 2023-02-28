import { Component, OnInit, Input } from '@angular/core';
import { ArenaCalculatorService } from '../arena-calculator.service';

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


  constructor(private arenaCalculatorService: ArenaCalculatorService) {  }

  ngOnInit(): void {
    this.ratingInput = 0;
    this.tbcPoints = 0;
    this.tlkPoints = 0;
  }

  onClick(){
    this.tbcPoints = this.arenaCalculatorService.computeTBC(this.ratingInput, this.bracketType);
    this.tlkPoints = this.arenaCalculatorService.computeTLK(this.ratingInput, this.bracketType);
  }
}
