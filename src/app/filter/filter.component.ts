import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  @Input() allBeers:Array<any> = [];
  @Output() action = new EventEmitter<Array<any>>();
  attenuations: Array<number>;
  selectedAttenuation: string = "All";
  
  constructor() { }

  ngOnInit() {
    this.attenuations = this.allBeers
          .map(this.selectOnlyAttenuations)
          .sort(this.ascendingOrder)
          .filter(this.noDuplicates)

    let lastVisitedAttenuation: string = window.localStorage.getItem("selectedAttenuation");
    if(lastVisitedAttenuation != "All"){
      let parsedAttenuation: number = parseFloat(lastVisitedAttenuation);
      this.filterThisAttenuation(parsedAttenuation)
    }
  }

  filterThisAttenuation(level) {
    console.log(typeof level)
    this.selectedAttenuation = level;
    this.action.emit(this.onlyFilterredBeers(level))
    this.storeSelection();
  }

  clearSelection() {
    this.selectedAttenuation = "All";
    this.action.emit(this.allBeers);
    this.storeSelection();
  }

  selectOnlyAttenuations = beer => beer.attenuation_level;

  ascendingOrder(a, b){
    return a - b;
  }

  noDuplicates(currentValue, position, entireArray): boolean{
    return entireArray.indexOf(currentValue) === position;
  }

  onlyFilterredBeers(level){
    return this.allBeers.filter(beer => beer.attenuation_level === level);
  }

  storeSelection():void{
    window.localStorage.setItem("selectedAttenuation", this.selectedAttenuation)
  }

}
