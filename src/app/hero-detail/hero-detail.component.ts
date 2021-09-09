import { Component, OnInit, Input } from '@angular/core';
//The HeroDetailComponent template binds to the component's hero property which is of type Hero.
import { Hero } from '../hero';

// This component only receives a hero object through its hero property and displays it.
@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  // The hero property must be an Input property, annotated with the @Input() decorator, because the external HeroesComponent will bind to it like this:
  //<app-hero-detail [hero]="selectedHero"></app-hero-detail>
  @Input() hero?: Hero;

  constructor() { }

  ngOnInit(): void {
  }

}

/* The HeroesComponent used to display the hero details on its own, before you removed that portion of the template. This section guides you through delegating logic to the HeroDetailComponent.

The two components will have a parent/child relationship. The parent HeroesComponent will control the child HeroDetailComponent by sending it a new hero to display whenever the user selects a hero from the list. */