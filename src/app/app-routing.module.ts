import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RealEstateComponent } from './modules/real-estate/real-estate.component';
import { RealEstateDetailsComponent } from './modules/real-estate-details/real-estate-details.component';

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
    path: 'real-estates/:id',
    component: RealEstateDetailsComponent
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
