import { Component } from '@angular/core';
import { HandlerService } from '../app/handler.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pkmn-sword-data';

  constructor(public handler: HandlerService) {}

	ngOnInit() {
		this.handler.hideBackgroundLoader();
	}

}
