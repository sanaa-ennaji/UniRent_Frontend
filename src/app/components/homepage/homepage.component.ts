import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MapComponent } from "../map/map.component";
import { FooterComponent } from "../../shared/footer/footer.component";

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [NavbarComponent, CommonModule, RouterModule, FooterComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  

}
