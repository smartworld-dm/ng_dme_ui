import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { environment } from 'environments/environment';
import { AppState } from './app.service';

export const ROOT_SELECTOR = 'app';

@Component({
  selector: ROOT_SELECTOR,
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.css'
  ],
  template: `
    <header>
        <nav class="navbar navbar-expand bg-nav pl-md-5 ml-md-0">
            <a [routerLink]=" ['/'] " class="navbar-brand mr-sm-0" routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
              <img [src]="logo" class="head-logo" alt="logo" />
            </a>
            <ul class="navbar-nav flex-row ml-auto d-md-flex">
                <li class="nav-item ">
                    <a [routerLink]=" ['/login'] " class="btn btn-outline-light my-2 my-lg-0" routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
                      Login
                    </a>
                </li>
            </ul>
        </nav>
    </header>

    <main>
      <router-outlet></router-outlet>
    </main>
    
    <footer class="bg-dark text-center px-3 text-white">
        <span>© 2018  Limited. All rights reserved. " Deliver-Me" and "Beautiful business" are trademarks of  Deliver-Me Limited.</span>
    </footer>
  `
})

export class AppComponent implements OnInit {
  public name = 'Angular Starter:';
  public logo = 'assets/img/logo-2.png';
  public twitter = 'https://twitter.com/gdi2290';

  constructor(
    public appState: AppState
  ) {}

  public ngOnInit() {
    console.log('Initial App State', this.appState.state);
  }
}
