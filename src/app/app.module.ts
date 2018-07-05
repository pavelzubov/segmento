import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {InvalidAlertComponent, InvalidPopoverComponent, ModalComponent} from './list/modal/modal.component';
import {MatDialogModule, MatDialog} from '@angular/material/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {ListComponent, SortArrowsComponent} from './list/list.component';

const routes: Routes = [
  {path: '**', component: ListComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    ModalComponent,
    InvalidPopoverComponent,
    InvalidAlertComponent,
    ListComponent,
    SortArrowsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [MatDialog],
  bootstrap: [AppComponent],
  entryComponents: [ModalComponent]
})
export class AppModule {
}
