import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, TranslateModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  isMenuOpen = false; // controla el menú responsive (burger de Bulma)

  constructor(public translate: TranslateService) {}

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  switchLang(lang: 'es' | 'en'): void {
    this.translate.use(lang);
    this.closeMenu();
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }
}
