import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ModalComponent} from './list/modal/modal.component';
import {MatDialogModule, MatDialog} from '@angular/material/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ListComponent} from './list/list.component';

const routes: Routes = [
  {path: ':sort', component: ListComponent},
  {path: '**', component: ListComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    ModalComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [MatDialog, {provide: LocationStrategy, useClass: PathLocationStrategy}],
  // bootstrap: [AppComponent],
  bootstrap: [AppComponent],
  entryComponents: [ModalComponent]
})
export class AppModule {
}
