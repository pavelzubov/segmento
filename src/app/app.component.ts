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
  public Arr = Array;
  private modalComponent: MatDialogRef<ModalComponent>;
  public sizePage = 10;
  public currentPage: number = 1;
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
    {id: 5, resources: 1000, comment: 'На тыщу'},
    {id: 6, resources: 1000, comment: 'Для шестого большой комментарий, чтобы было видно как отображаются большие комментарии в таблице'},
    {id: 7, resources: 456, comment: 'Такой'},
    {id: 8, resources: 1, comment: 'Комментарий'},
    {id: 9, resources: 1, comment: 'Средство'},
    {id: 1, resources: 235, comment: 'На 235'},
    {id: 2, resources: 250, comment: 'На 15 больше'},
    {id: 3, resources: 200, comment: 'На 35 меньше'},
    {id: 4, resources: 100, comment: 'На сотку'},
    {id: 5, resources: 1000, comment: 'На тыщу'},
    {id: 6, resources: 1000, comment: 'Для шестого большой комментарий, чтобы было видно как отображаются большие комментарии в таблице'},
    {id: 7, resources: 456, comment: 'Такой'},
    {id: 8, resources: 1, comment: 'Комментарий'},
    {id: 9, resources: 1, comment: 'Средство'},
    {id: 1, resources: 235, comment: 'На 235'},
    {id: 2, resources: 250, comment: 'На 15 больше'},
    {id: 3, resources: 200, comment: 'На 35 меньше'},
    {id: 4, resources: 100, comment: 'На сотку'},
    {id: 5, resources: 1000, comment: 'На тыщу'},
    {id: 6, resources: 1000, comment: 'Для шестого большой комментарий, чтобы было видно как отображаются большие комментарии в таблице'},
    {id: 7, resources: 456, comment: 'Такой'},
    {id: 8, resources: 1, comment: 'Комментарий'},
    {id: 9, resources: 1, comment: 'Средство'},
    {id: 1, resources: 235, comment: 'На 235'},
    {id: 2, resources: 250, comment: 'На 15 больше'},
    {id: 3, resources: 200, comment: 'На 35 меньше'},
    {id: 4, resources: 100, comment: 'На сотку'},
    {id: 5, resources: 1000, comment: 'На тыщу'},
    {id: 6, resources: 1000, comment: 'Для шестого большой комментарий, чтобы было видно как отображаются большие комментарии в таблице'},
    {id: 7, resources: 456, comment: 'Такой'},
    {id: 8, resources: 1, comment: 'Комментарий'},
    {id: 9, resources: 1, comment: 'Средство'},
    {id: 1, resources: 235, comment: 'На 235'},
    {id: 2, resources: 250, comment: 'На 15 больше'},
    {id: 3, resources: 200, comment: 'На 35 меньше'},
    {id: 4, resources: 100, comment: 'На сотку'},
    {id: 5, resources: 1000, comment: 'На тыщу'},
    {id: 6, resources: 1000, comment: 'Для шестого большой комментарий, чтобы было видно как отображаются большие комментарии в таблице'},
    {id: 7, resources: 456, comment: 'Такой'},
    {id: 8, resources: 1, comment: 'Комментарий'},
    {id: 9, resources: 1, comment: 'Средство'},
    {id: 1, resources: 235, comment: 'На 235'},
    {id: 2, resources: 250, comment: 'На 15 больше'},
    {id: 3, resources: 200, comment: 'На 35 меньше'},
    {id: 4, resources: 100, comment: 'На сотку'},
    {id: 5, resources: 1000, comment: 'На тыщу'},
    {id: 6, resources: 1000, comment: 'Для шестого большой комментарий, чтобы было видно как отображаются большие комментарии в таблице'},
    {id: 7, resources: 456, comment: 'Такой'},
    {id: 8, resources: 1, comment: 'Комментарий'},
    {id: 9, resources: 1, comment: 'Средство'},
  ];
  public showList: Item[];

  constructor(public dialog: MatDialog) {
  }

  ngOnInit() {
    this.showPage();
  }

  openModal(item?: Item | number): void {
    this.modalComponent = this.dialog.open(ModalComponent, {
      data: item
    });
    this.modalComponent.afterClosed().subscribe(result => {
      console.log(result);
      if (!result) {
        return;
      }
      const itemId = this.list.findIndex(itm => itm.id === result.id);
      if (itemId !== -1) {
        this.list[itemId] = result;
      } else {
        this.list.push(result);
      }
      this.showPage();
    });
  }

  add() {
    this.openModal(this.list.sort((a, b) => a.id - b.id)[this.list.length - 1].id + 1);
  }

  edit(item: Item) {
    this.openModal(item);
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
    this.showPage();
  }

  nextSort(value: number): number {
    return ++value > 1 ? -1 : value;
  }

  showPage(page: number = this.currentPage) {
    this.currentPage = page;
    this.showList = this.list.slice(this.sizePage * (page - 1), this.sizePage * page);
  }

  getCountPages(): any[] {
    return Array(Math.ceil(this.list.length / this.sizePage)).fill('');
  }
}
