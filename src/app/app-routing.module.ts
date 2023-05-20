import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RealEstateComponent } from './modules/real-estate/real-estate.component';
import { RealEstateDetailsComponent } from './modules/real-estate-details/real-estate-details.component';
import { RealEstateCategoriesComponent } from './modules/real-estate-categories/real-estate-categories.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'real-estates',
    pathMatch: 'full'
  },
  {
    path: 'real-estates',
    component: RealEstateComponent,
  },
  {
    path: 'real-estates/details/:id',
    component: RealEstateDetailsComponent
  },
  {
    path: 'real-estates/categories',
    component: RealEstateCategoriesComponent
  },
  {
    path: '**',
    redirectTo: 'real-estates'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
