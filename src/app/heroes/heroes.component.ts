import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
//import { HEROES } from '../mock-heroes';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit {

  selectedHero?: Hero;
  heroes: Hero[] = [];
  

  /* Add a private heroService parameter of type HeroService to the constructor. The parameter simultaneously defines a private heroService property and identifies it as a HeroService injection site. When Angular creates a HeroesComponent, the Dependency Injection system sets the heroService parameter to the singleton instance of HeroService. */

  constructor(private heroService: HeroService, private messageService: MessageService) { }

  /* While you could call getHeroes() in the constructor, that's not the best practice.Reserve the constructor for minimal initialization such as wiring constructor parameters to properties. The constructor shouldn't do anything. It certainly shouldn't call a function that makes HTTP requests to a remote server as a real data service would. Instead, call getHeroes() inside the ngOnInit lifecycle hook and let Angular call ngOnInit() at an appropriate time after constructing a HeroesComponent instance.*/

  ngOnInit() {
    this.getHeroes();
  }

  // onSelect() method assigns the clicked hero from the template to the component's selectedHero.
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
  }

  /* Create a method to retrieve the heroes from the service.

  The HeroService.getHeroes() method has a synchronous signature, which implies that the HeroService can fetch heroes synchronously. The HeroesComponent consumes the getHeroes() result as if heroes could be fetched synchronously.

  This will not work in a real application. You're getting away with it now because the service currently returns mock heroes. But soon the application will fetch heroes from a remote server, which is an inherently asynchronous operation.

  The HeroService must wait for the server to respond, getHeroes() cannot return immediately with hero data, and the browser will not block while the service waits.

  HeroService.getHeroes() must have an asynchronous signature of some kind.

  The new version waits for the Observable to emit the array of heroes—which could happen now or several minutes from now. The subscribe() method passes the emitted array to the callback, which sets the component's heroes property.

  This asynchronous approach will work when the HeroService requests heroes from the server.
  
  */

  getHeroes(): void {
    this.heroService.getHeroes()
        .subscribe(heroes => this.heroes = heroes);
  }


}
