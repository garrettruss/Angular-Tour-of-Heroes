/* 
Why services
Components shouldn't fetch or save data directly and they certainly shouldn't knowingly present fake data. They should focus on presenting data and delegate data access to a service.

In this tutorial, you'll create a HeroService that all application classes can use to get heroes. Instead of creating that service with the 
new
keyword, you'll rely on Angular dependency injection to inject it into the HeroesComponent constructor.

Services are a great way to share information among classes that don't know each other. You'll create a MessageService and inject it in two places.

Inject in HeroService, which uses the service to send a message.
Inject in MessagesComponent, which displays that message, and also displays the ID when the user clicks a hero.

@Injectable() services
Notice that the new service imports the Angular Injectable symbol and annotates the class with the @Injectable() decorator. This marks the class as one that participates in the dependency injection system. The HeroService class is going to provide an injectable service, and it can also have its own injected dependencies.

The @Injectable() decorator accepts a metadata object for the service, the same way the @Component() decorator did for your component classes.

*/

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { MessageService } from './message.service';


/* You must make the HeroService available to the dependency injection system before Angular can inject it into the HeroesComponent by registering a provider. A provider is something that can create or deliver a service; in this case, it instantiates the HeroService class to provide the service.

To make sure that the HeroService can provide this service, register it with the injector, which is the object that is responsible for choosing and injecting the provider where the application requires it.

By default, the Angular CLI command ng generate service registers a provider with the root injector for your service by including provider metadata, that is providedIn: 'root' in the @Injectable() decorator.

When you provide the service at the root level, Angular creates a single, shared instance of HeroService and injects into any class that asks for it. Registering the provider in the @Injectable metadata also allows Angular to optimize an application by removing the service if it turns out not to be used after all.
*/

@Injectable({
  providedIn: 'root'
})

/* The HeroService could get hero data from anywhere—a web service, local storage, or a mock data source. Removing data access from components means you can change your mind about the implementation anytime, without touching any components. They don't know how the service works.
 */

export class HeroService {

  /* Modify the constructor with a parameter that declares a private messageService property. Angular will inject the singleton MessageService into that property when it creates the HeroService. This is a typical "service-in-service" scenario: you inject the MessageService into the HeroService which is injected into the HeroesComponent. */
  constructor(private messageService: MessageService) { }

  /* Add a getHeroes method to return the mock heroes. of(HEROES) returns an Observable<Hero[]> that emits a single value, the array of mock heroes. Modify the getHeroes() method to send a message when the heroes are fetched. */
  getHeroes(): Observable<Hero[]> {
    const heroes = of(HEROES);
    this.messageService.add('HeroService: fetched heroes');
    return heroes;
  }

}
