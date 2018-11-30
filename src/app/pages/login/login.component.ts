import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { AuthenticationService, MessageService, UserService } from '../../services';
import { AppState } from '../../app.service';

@Component({
  selector: 'login',
  styleUrls: [ './login.component.css' ],
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {
  public localState = { value: '' };
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  message: any;
  subscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private messageService: MessageService,
    public appState: AppState) {
    this.subscription = this.messageService.getMessage().subscribe(message => { 
      if (message.tokenData)
        this.userService.getUser(message.tokenData.token)
        .pipe(first())
        .subscribe(
          data => {
            this.messageService.sendMessage({user: data, tokenData: data});
            this.router.navigate([this.returnUrl]);
          },
          error => {
            console.log('Error - ', error);
            this.loading = false;
        });
    });
  }

  public ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.appState.set('isLogged', false);
    this.appState.set('tokenData', '');
    this.authenticationService.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
  }

  public ngAfterViewInit() {
      setTimeout(() => {
        this.appState.set('currentUrl', '/login');
        this.messageService.sendMessage({currentUrl: '/login'});
      });
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid)
      return;

    this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.appState.set('isLogged', true);
          this.appState.set('tokenData', data);
          this.messageService.sendMessage({isLogged: true, tokenData: data});
        },
        error => {
          console.log('Error - ', error);
          this.loading = false;
      });
  }
}
