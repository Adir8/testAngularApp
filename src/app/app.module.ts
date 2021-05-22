import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChartsComponent } from './charts/charts.component';
import {HttpClientModule} from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { updateDataReducer } from './data.reducer';


@NgModule({
  declarations: [
    AppComponent,
    ChartsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({ dataArrays: updateDataReducer })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
