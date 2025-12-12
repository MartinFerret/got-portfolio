import { Routes } from '@angular/router';
import {Home} from './components/home/home';

export const routes: Routes = [
  { path: '', component: Home }, // Eager loading - Pour les pages présentes directement, comme une homepage.
  { path: 'home', redirectTo: '', pathMatch: 'full'}, // Redirection.
  { path: 'countries',
    loadComponent: () => import('./components/countries/countries') // Lazy-loading - Charger dynamiquement le composant. Si la route n'est pas activée, le composant n'est pas chargé.
      .then((component) => component.Countries),
    title: 'Countries',
    data: {
    countries: [
      {id: 1, name: 'France'},
      {id: 2, name: 'USA'},
      {id: 3, name: 'Germany'},
      {id: 4, name: 'Spain'}
    ]
    }
  }
];
