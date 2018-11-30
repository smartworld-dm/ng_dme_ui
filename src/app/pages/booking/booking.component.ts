import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AppState } from '../../app.service';
import { MessageService } from '../../services';

@Component({
  selector: 'booking',
  styleUrls: [ './booking.component.css' ],
  templateUrl: './booking.component.html'
})

export class BookingComponent implements OnInit {
  public localState = { value: '' };

  constructor(
    public appState: AppState,
    private messageService: MessageService
  ) {
  }

  public ngOnInit() {
  }

  public ngAfterViewInit() {
    this.appState.set('currentUrl', '/booking');
    this.messageService.sendMessage({currentUrl: '/booking'});
  }
}
