import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBullhorn, faCalendarCheck, faUserCircle, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar2',
  imports: [FontAwesomeModule
  ],
  templateUrl: './navbar2.component.html',
  styleUrl: './navbar2.component.css'
})
export class Navbar2Component {
  faBullhorn = faBullhorn;
  faCalendarCheck = faCalendarCheck;
  faUserCircle = faUserCircle;
  faPlus = faPlus;
}
