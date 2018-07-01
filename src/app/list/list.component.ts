import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ModalComponent} from './modal/modal.component';
import {Item} from '../item';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent implements OnInit {
  private modalComponent: MatDialogRef<ModalComponent>;
  public sizePage = 10;
  public currentPage = 1;
  // Массив состояния сортировок
  // -1 - сортировка по убыванию
  //  0 - без сортировки
  //  1 - сортировка по возрастанию
  public sorting = {
    id: 0,
    resources: 0,
    comment: 0
  };
  // Массив с данными
  public list: Item[] = [
    {id: 1, resources: 235, comment: 'На 235'},
    {id: 2, resources: 250, comment: 'На 15 больше'},
    {id: 3, resources: 200, comment: 'На 35 меньше'},
    {id: 4, resources: 100, comment: 'На сотку'},
    {id: 5, resources: 1000, comment: 'На тысячу'},
    {id: 6, resources: 1000, comment: 'Для шестого большой комментарий, чтобы было видно как отображаются большие комментарии в таблице'},
    {id: 7, resources: 456, comment: 'Такой'},
    {id: 8, resources: 1, comment: 'Комментарий'},
    {id: 9, resources: 1, comment: 'Средство'},
  ];
  // Массив с данными, которые будут отображаться на странице
  public showList: Item[];

  constructor(public dialog: MatDialog,
              public activateRoute: ActivatedRoute,
              public location: Location) {
    // Смотрим строку адреса
    // Если есть sort, то разделяем по ":". Левая часть это столбец, правая это значение сортировки
    // После сортируем
    const request = this.activateRoute.snapshot.params['sort'] ? this.activateRoute.snapshot.params['sort'].split(':') : null;
    if (request && request.length === 2) {
      // Проверим, валидные ли ключ и значение сортировки
      // Если такой ключ есть в сортировках и значение -1 или 1, то сортируем
      // (Округлим, если пользователь вдруг решил ввести не целое (зачем?..))
      // Если не валидное, то сбрасываем параметр запроса
      request[1] = Math.round(+request[1]);
      if (request[0] in this.sorting && (request[1] === -1 || request[1] === 1)) {
        this.sort(request[0], request[1]);
        this.location.replaceState(request.join(':'));
      } else {
        this.location.replaceState('');
      }
    }
  }

  ngOnInit() {
    this.showPage();
  }

  openModal(item?: Item | number): void {
    // Передаем в модальное окно либо редактируемый объект
    // либо наибольший индекс в массиве
    this.modalComponent = this.dialog.open(ModalComponent, {
      data: item
    });
    this.modalComponent.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      // Если индекс возвращаемого элемента есть
      // То изменяем его
      // Если нет, то это новый элемент и добавлем его
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
    // Смотрим наибольший индекс в списке
    // Для это сортируем по id,берем последний и инрементируем
    this.openModal(this.list.sort((a, b) => a.id - b.id)[this.list.length - 1].id + 1);
  }

  edit(item: Item) {
    this.openModal(item);
  }

  sort(name: string, value?: number) {
    // Ставим все контролы сортировки в нулевое положение (без сортировки)
    for (const field in this.sorting) {
      if (this.sorting.hasOwnProperty(field) && field !== name) {
        this.sorting[field] = 0;
      }
    }
    // Ставим число следующее число от -1 до 1 в нужную колонку и сортируем
    this.sorting[name] = value ? value : this.nextSort(this.sorting[name]);
    this.list.sort((a, b) => {
      if (a[name] > b[name]) {
        return 1 * this.sorting[name];
      }
      if (a[name] < b[name]) {
        return -1 * this.sorting[name];
      }
    });
    // Добавляем сортировку в адресную строку если она не нулевая
    if (this.sorting[name]) {
      this.location.replaceState(name + ':' + this.sorting[name]);
    }
    this.showPage();
  }

  nextSort(value: number): number {
    // Функция нужна, чтобы получать значения от -1 до одного по кругу
    return ++value > 1 ? -1 : value;
  }

  showPage(page: number = this.currentPage) {
    // Берет нужные строки из основного списка и записывает в отображаемый
    // Нужна для пагинации
    this.currentPage = page;
    this.showList = this.list.slice(this.sizePage * (page - 1), this.sizePage * page);
  }

  getCountPages(): any[] {
    // Функция нужна, чтобы можно было использовать *ngFor для составления кнопок пагинации
    // Возращает массив пустых значений, длинна которого равна количеству страниц
    return Array(Math.ceil(this.list.length / this.sizePage)).fill('');
  }

  getSum(): number {
    return this.list.map(item => item.resources).reduce((a, b) => a + b);
  }
}
