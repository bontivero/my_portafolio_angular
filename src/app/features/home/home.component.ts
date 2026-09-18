import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NgxParticlesModule } from '@tsparticles/angular';
import type { ISourceOptions } from '@tsparticles/engine';
import { Observable } from 'rxjs';

import { DataService } from '../../core/services/data.service';
import { PersonalInfo } from '../../core/models/personal-info.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule, NgxParticlesModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  personalInfo$: Observable<PersonalInfo>;

  // Configuración del fondo de partículas: sutil, colores corporativos
  // (turquesa Bulma #00d1b2), velocidad baja para no distraer del contenido.
  particlesOptions: ISourceOptions = {
    fpsLimit: 60,
    background: { color: { value: 'transparent' } },
    particles: {
      number: { value: 45, density: { enable: true } },
      color: { value: '#00d1b2' },
      links: {
        enable: true,
        color: '#00d1b2',
        distance: 140,
        opacity: 0.25,
      },
      move: {
        enable: true,
        speed: 0.8,
        outModes: { default: 'bounce' },
      },
      opacity: { value: 0.4 },
      size: { value: { min: 1, max: 3 } },
    },
    interactivity: {
      events: { onHover: { enable: true, mode: 'grab' } },
      modes: { grab: { distance: 120, links: { opacity: 0.4 } } },
    },
    detectRetina: true,
  };

  constructor(private dataService: DataService) {
    this.personalInfo$ = this.dataService.getPersonalInfo();
  }
}
