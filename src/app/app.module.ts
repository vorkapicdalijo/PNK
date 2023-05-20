import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RealEstateComponent } from './modules/real-estate/real-estate.component';
import { RealEstateDetailsComponent } from './modules/real-estate-details/real-estate-details.component';
import { HttpClientModule } from '@angular/common/http';
import { RealEstateHeaderComponent } from './real-estate-header/real-estate-header.component';
import { RealEstateFooterComponent } from './real-estate-footer/real-estate-footer.component';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatTableModule } from '@angular/material/table'
import { MatButtonModule } from '@angular/material/button'
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRippleModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteRealEstateDialogComponent } from './modules/dialogs/delete-real-estate-dialog/delete-real-estate-dialog.component';
import { EditRealEstateDialogComponent } from './modules/dialogs/edit-real-estate-dialog/edit-real-estate-dialog.component';
import { AddRealEstateDialogComponent } from './modules/dialogs/add-real-estate-dialog/add-real-estate-dialog.component';
import {MatTabsModule} from '@angular/material/tabs';
import { RealEstateCategoriesComponent } from './modules/real-estate-categories/real-estate-categories.component';
import { MatSelectModule } from '@angular/material/select';
import { RrrComponent } from './testovi/rrr/rrr.component';

@NgModule({
  declarations: [
    AppComponent,
    RealEstateComponent,
    RealEstateDetailsComponent,
    RealEstateHeaderComponent,
    RealEstateFooterComponent,
    DeleteRealEstateDialogComponent,
    EditRealEstateDialogComponent,
    AddRealEstateDialogComponent,
    RealEstateCategoriesComponent,
    RrrComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatToolbarModule,
    MatTableModule,
    MatButtonModule,
    MatTooltipModule,
    MatRippleModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatTabsModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
