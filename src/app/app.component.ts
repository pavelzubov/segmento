import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ModalComponent} from './modal/modal.component';
import {Item} from './item';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  private modalComponent: MatDialogRef<ModalComponent>;
  public sorting = {
    id: 0,
    resources: 0,
    comment: 0
  };
  public list: Item[] = [
    {id: 1, resources: 235, comment: 'На 235'},
    {id: 2, resources: 250, comment: 'На 15 больше'},
    {id: 3, resources: 200, comment: 'На 35 меньше'},
    {id: 4, resources: 100, comment: 'На сотку'},
    {id: 5, resources: 100, comment: 'На тыщу'},
  ];

  constructor(public dialog: MatDialog) {
  }

  ngOnInit() {
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

  add() {
    this.list.push({id: 5, resources: 100, comment: 'На тыщу'});
    console.log(this.list);
  }

  sort(name: string) {
    for (const field in this.sorting) {
      if (this.sorting.hasOwnProperty(field) && field !== name) {
        this.sorting[field] = 0;
      }
    }
    // Ставим число от -1 до 1
    this.sorting[name] = this.nextSort(this.sorting[name]);
    this.list.sort((a, b) => {
      if (a[name] > b[name]) {
        return 1 * this.sorting[name];
      }
      if (a[name] < b[name]) {
        return -1 * this.sorting[name];
      }
    });
  }

  nextSort(value: number): number {
    return ++value > 1 ? -1 : value;
  }
}
