import { Component } from '@angular/core';

@Component({
  selector: 'app-theme-toggle',
  imports: [],
  templateUrl: './theme-toggle.component.html',
  styleUrl: './theme-toggle.component.css'
})
export class ThemeToggleComponent {
  isDarkMode = false ; 
  toggleTheme(){
    this.isDarkMode = !this.isDarkMode;
    if(this.isDarkMode){
      document.documentElement.classList.add('dark');
    } else{
      document.documentElement.classList.remove('dark');
    }
  }

}
