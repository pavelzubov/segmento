import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ModalComponent} from './modal/modal.component';
import {MatDialogModule, MatDialog} from '@angular/material/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [MatDialog],
  bootstrap: [AppComponent],
  entryComponents: [ModalComponent]
})
export class AppModule {
}
