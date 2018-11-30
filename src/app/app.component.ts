import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { environment } from 'environments/environment';
import { AppState } from './app.service';
import { MessageService, AuthenticationService } from './services';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

export const ROOT_SELECTOR = 'app';

@Component({
  selector: ROOT_SELECTOR,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html',
})

export class AppComponent implements OnInit {
  public name = 'Angular Starter:';
  public logo = 'assets/img/logo-2.png';
  public twitter = 'https://twitter.com/gdi2290';
  public isLogged = false;
  public currentUser = {};
  message: any;
  subscription: Subscription;
  public homeUrl = '/';
  public currentUrl = this.router.url;

  constructor(
    public appState: AppState,
    private messageService: MessageService,
    private authenticationService: AuthenticationService,
    private router: Router,
  ) {
  }

  public ngOnInit() {
    console.log('Initial App State', this.appState.state);
    this.subscription = this.messageService.getMessage().subscribe(message => { 
      this.isLogged = this.appState.get('isLogged');
      this.currentUser = this.appState.get('currentUser');
      this.currentUrl = this.appState.get('currentUrl');
    });
  }

  public ngAfterViewInit() {
  }

  public logout() {
    this.authenticationService.logout();
    this.appState.set('isLogged', false);
    this.messageService.sendMessage({isLogged: false});
    this.router.navigate([this.homeUrl]);
  }
}
