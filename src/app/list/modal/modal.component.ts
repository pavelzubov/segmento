import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Item} from '../../item';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-invalid-alert',
  template: `
    <div *ngIf="invalid">
      !
    </div>
  `,
  styleUrls: ['./modal.component.sass']
})
export class InvalidAlertComponent {
  @Input() invalid: boolean;
}

@Component({
  selector: 'app-invalid-popover',
  template: `
    <div class="popover" *ngIf="invalid">
      Неверное значение
    </div>
  `,
  styleUrls: ['./modal.component.sass']
})
export class InvalidPopoverComponent {
  @Input() invalid: boolean;
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.sass']
})
export class ModalComponent implements OnInit {
  public modalForm: FormGroup;
  public isNew = false;

  constructor(
    private dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Item) {
  }

  ngOnInit() {
    this.isNew = this.new(this.data);
    this.modalForm = new FormGroup({
      'resources': new FormControl(this.data.resources || '', [Validators.required, this.resourcesValidator]),
      'comment': new FormControl(this.data.comment || '', [Validators.required, Validators.maxLength(512)]),
    });
  }

  resourcesValidator(control: FormControl) {
    // Кастомный валидатор, фильтрует значения больше 1000, меньше -1000 и 0
    const value = control.value;
    if (value > 1000 || value < -1000 || value === 0) {
      return {resourcesValidator: true};
    }
    return null;
  }

  submit() {
    // Берем id.
    // Он может быть в виде строки (из адреса), поэтому приводим её  к числу
    const id = this.data.id || +this.data;
    const newItem: Item = {
      id: id,
      resources: this.modalForm.controls['resources'].value,
      comment: this.modalForm.controls['comment'].value,
    };
    this.dialogRef.close(newItem);
  }

  new(val: any) {
    // Функция для проверки новый ли элемент
    // Проверяет на число, потому что может передаваться или число или объект
    // Числом обозначается наибольший индекс в массиве
    return typeof val === 'number';
  }
}
