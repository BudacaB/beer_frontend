import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterUserInput'
})
export class FilterUserInputPipe implements PipeTransform {

  transform(beers: Array<any>, args?: any): any {
    console.log("args:", args);
    if (args === "") {
      return beers;
    }
    return beers.filter((currentBeer) => this.matchesName(currentBeer, args));
  }

  matchesName(currentBeer, args){
    let evaluation = currentBeer.name.toLowerCase().indexOf(args) !== -1;
    console.log(currentBeer.name + " evaluatedTo: " + evaluation);
    return evaluation;
  }

}
