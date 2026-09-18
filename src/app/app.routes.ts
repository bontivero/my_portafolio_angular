import { Routes } from '@angular/router';

// Rutas de la aplicación. Todas apuntan a componentes standalone
// cargados de forma perezosa (lazy loading) para minimizar el bundle inicial.
export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then((m) => m.HomeComponent),
    title: 'Inicio | Beatriz Ontivero',
  },
  {
    path: 'about',
    loadComponent: () => import('./features/about/about.component').then((m) => m.AboutComponent),
    title: 'Sobre mí | Beatriz Ontivero',
  },
  {
    path: 'experience',
    loadComponent: () =>
      import('./features/experience/experience.component').then((m) => m.ExperienceComponent),
    title: 'Experiencia | Beatriz Ontivero',
  },
  {
    path: 'projects',
    loadComponent: () =>
      import('./features/projects/projects.component').then((m) => m.ProjectsComponent),
    title: 'Proyectos | Beatriz Ontivero',
  },
  {
    path: 'certifications',
    loadComponent: () =>
      import('./features/certifications/certifications.component').then(
        (m) => m.CertificationsComponent,
      ),
    title: 'Certificaciones | Beatriz Ontivero',
  },
  {
    path: 'skills',
    loadComponent: () =>
      import('./features/skills/skills.component').then((m) => m.SkillsComponent),
    title: 'Habilidades | Beatriz Ontivero',
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./features/contact/contact.component').then((m) => m.ContactComponent),
    title: 'Contacto | Beatriz Ontivero',
  },
  { path: '**', redirectTo: '' },
];
