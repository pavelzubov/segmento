import {Component, ViewChild} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ModalComponent} from './modal/modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  private modalComponent: MatDialogRef<ModalComponent>;

  constructor(public dialog: MatDialog) {
  }

  openModal(): void {
    this.modalComponent = this.dialog.open(ModalComponent);

    /*    const dialogRef = this.dialog.open(this.modalComponent, {
          width: '250px',
          // data: {name: this.name, animal: this.animal}
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log(result);
          // this.animal = result;
        });*/
  }

  title = 'app';
}
