import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/authconfig.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator'

import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListeEntreeComponent } from './components/liste-entree/liste-entree.component';
import { RouterModule } from '@angular/router';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { CurrencyPipe, DatePipe, registerLocaleData, } from '@angular/common';
import localeFr from '@angular/common/locales/fr-MG';
import localeFrExtra from '@angular/common/locales/extra/fr-MG';
import { getFrenchPaginatorIntl } from './providers/mat-paginator-fr';

registerLocaleData(localeFr,'fr-MG', localeFrExtra)

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListeEntreeComponent,
  ],
  imports: [
    MatPaginatorModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot([]),
    DragDropModule
  ],
  providers: [
    DatePipe,
    CurrencyPipe,
    { provide: MatPaginatorIntl, useValue: getFrenchPaginatorIntl() },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    { provide: LOCALE_ID, useValue: 'fr-MG' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
