import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
//import 'zone.js';

import { loadSlim } from '@tsparticles/slim';
import { tsParticles } from '@tsparticles/engine';

loadSlim(tsParticles).then(() => {
  bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
});
