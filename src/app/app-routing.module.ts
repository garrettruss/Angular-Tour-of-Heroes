import { NgModule } from '@angular/core';
// the app-routing.module.ts file imports RouterModule and Routes so the application can have routing functionality. 
import { RouterModule, Routes } from '@angular/router';
// The next import, HeroesComponent, will give the Router somewhere to go once you configure the routes.
import { HeroesComponent } from './heroes/heroes.component';

/* Routes tell the Router which view to display when a user clicks a link or pastes a URL into the browser address bar. Since app-routing.module.ts already imports HeroesComponent, you can use it in the routes array.

A typical Angular Route has two properties:

path: a string that matches the URL in the browser address bar.
component: the component that the router should create when navigating to this route.
This tells the router to match that URL to path: 'heroes' and display the HeroesComponent when the URL is something like localhost:4200/heroes. */

const routes: Routes = [
  { path: 'heroes', component: HeroesComponent }
];

/* The @NgModule metadata initializes the router and starts it listening for browser location changes.

The imports line adds the RouterModule to the AppRoutingModule imports array and configures it with the routes in one step by calling RouterModule.forRoot(). The method is called forRoot() because you configure the router at the application's root level. The forRoot() method supplies the service providers and directives needed for routing, and performs the initial navigation based on the current browser URL.

Next, AppRoutingModule exports RouterModule so it will be available throughout the application.
*/

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }