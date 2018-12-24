import { Component, OnInit } from '@angular/core';
import { BeersService } from '../beers.service';

@Component({
  selector: 'app-beers',
  templateUrl: './beers.component.html',
  styleUrls: ['./beers.component.css']
})
export class BeersComponent implements OnInit {

  allBeers: Array<any>;
  filteredBeers: Array<any>;
  hasServerResponded: boolean = false;
  inputSearch: String = "";

  constructor(private beersService: BeersService) { }

  ngOnInit() {

    this.beersService.getBeers().subscribe(
      (response) => {
        this.allBeers = response as Array<any>;
        this.filteredBeers = this.allBeers;
        console.log('remaining: ', this.allBeers.length )
        this.allBeers.sort(this.beersByName);
        this.hasServerResponded = true;
      }
    )
  }

  beersByName = (firstObj, secondObj) => firstObj.name.localeCompare(secondObj.name);

  onBeersWereFilterred(filterredResult:Array<any>){
    this.filteredBeers = filterredResult;
  }

  searchedBeerName() {
    return this.inputSearch;
  }

  onTypedText(value: String) {
    this.inputSearch = value;
  }

}
