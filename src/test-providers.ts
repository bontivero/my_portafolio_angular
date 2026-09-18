import { provideZonelessChangeDetection } from '@angular/core';

/**
 * Providers globales para todos los tests.
 * Se cargan automáticamente vía la opción `providersFile` en angular.json.
 */
export default [provideZonelessChangeDetection()];
