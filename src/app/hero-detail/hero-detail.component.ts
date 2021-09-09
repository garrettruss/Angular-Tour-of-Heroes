import { Component, OnInit, Input } from '@angular/core';
//The HeroDetailComponent template binds to the component's hero property which is of type Hero.
import { Hero } from '../hero';

/* Previously, the parent HeroesComponent set the HeroDetailComponent.hero property and the HeroDetailComponent displayed the hero.

HeroesComponent doesn't do that anymore. Now the router creates the HeroDetailComponent in response to a URL such as ~/detail/11.

The HeroDetailComponent needs a new way to obtain the hero-to-display. This section explains the following:

Get the route that created it
Extract the id from the route
Acquire the hero with that id from the server using the HeroService
*/

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService } from '../hero.service';

// This component only receives a hero object through its hero property and displays it.
@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})

export class HeroDetailComponent implements OnInit {

  // The hero property must be an Input property, annotated with the @Input() decorator, because the external HeroesComponent will bind to it like this:
  //<app-hero-detail [hero]="selectedHero"></app-hero-detail>
  //@Input() hero?: Hero;

  hero: Hero | undefined;

  /*  The ActivatedRoute holds information about the route to this instance of the HeroDetailComponent. This component is interested in the route's parameters extracted from the URL. The "id" parameter is the id of the hero to display.

  The HeroService gets hero data from the remote server and this component will use it to get the hero-to-display.

  The location is an Angular service for interacting with the browser. You'll use it later to navigate back to the view that navigated here.*/

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}

  // In the ngOnInit() lifecycle hook call getHero() 
  ngOnInit(): void {
    this.getHero();
  }

  /* The route.snapshot is a static image of the route information shortly after the component was created.

   The paramMap is a dictionary of route parameter values extracted from the URL. The "id" key returns the id of the hero to fetch.

   Route parameters are always strings. The JavaScript Number function converts the string to a number, which is what a hero id should be.

  */

  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  //Add a goBack() method to the component class that navigates backward one step in the browser's history stack using the Location service that you injected previously.
  goBack(): void {
    this.location.back();
  }
  

}

/* The HeroesComponent used to display the hero details on its own, before you removed that portion of the template. This section guides you through delegating logic to the HeroDetailComponent.

The two components will have a parent/child relationship. The parent HeroesComponent will control the child HeroDetailComponent by sending it a new hero to display whenever the user selects a hero from the list. */