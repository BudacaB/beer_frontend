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
  attenuations: Array<number>;
  hasServerResponded: boolean = false;

  constructor(private beersService: BeersService) { }

  ngOnInit() {

    this.beersService.getBeers().subscribe(
      (response) => {
        this.allBeers = response as Array<any>;
        this.filteredBeers = this.allBeers;
        console.log('remaining: ', this.allBeers.length )
        this.allBeers.sort(this.beersByName);
        this.attenuations = this.allBeers.map(this.selectOnlyAttenuations)
        .sort((a,b) => a - b).filter((v, i, a) => a.indexOf(v) === i)
        this.hasServerResponded = true;
      }
    )
  }

  beersByName = (firstObj, secondObj) => firstObj.name.localeCompare(secondObj.name);

  selectOnlyAttenuations = beer => beer.attenuation_level;
  
  filterThisAttenuation(level) {
    this.filteredBeers = this.allBeers.filter(beer => beer.attenuation_level === level);
    console.log('remaining: ', this.allBeers.length )
  }

  clearSelection() {
    this.filteredBeers = this.allBeers;
  }

}
