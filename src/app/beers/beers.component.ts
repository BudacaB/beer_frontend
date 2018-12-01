import { Component, OnInit } from '@angular/core';
import { BeersService } from '../beers.service';

@Component({
  selector: 'app-beers',
  templateUrl: './beers.component.html',
  styleUrls: ['./beers.component.css']
})
export class BeersComponent implements OnInit {

  beers: Array<any>;
  hasServerResponded: boolean = false;

  constructor(private beersService: BeersService) { }

  ngOnInit() {

    this.beersService.getBeers().subscribe(
      (response) => {
        this.beers = response as Array<any>;
        this.hasServerResponded = true;
      }
    )

  }

}
