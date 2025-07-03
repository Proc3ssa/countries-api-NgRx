import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

isDarkTheme: boolean = false;
toggleClass = "fa-regular fa-moon";

  

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    document.body.className = ''; 
    document.body.classList.add(this.isDarkTheme ? 'dark-theme' : 'light-theme'); 

   

  }

}
