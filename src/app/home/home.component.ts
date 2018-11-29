import {
  Component,
  OnInit
} from '@angular/core';

import { AppState } from '../app.service';

@Component({
  selector: 'home',
  styleUrls: [ './home.component.css' ],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  public localState = { value: '' };
  public img1 = 'assets/img/1.png';
  public img2 = 'assets/img/2.png';
  public img3 = 'assets/img/3.png';

  constructor(
    public appState: AppState,
  ) {}

  public ngOnInit() {
    console.log('hello `Home` component');
  }
}
