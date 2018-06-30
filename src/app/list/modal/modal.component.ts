import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Item} from '../../item';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class ModalComponent implements OnInit {
  public modalForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Item) {
  }

  ngOnInit() {
    this.modalForm = new FormGroup({
      'resources': new FormControl(this.data.resources || '', [Validators.required, this.resourcesValidator]),
      'comment': new FormControl(this.data.comment || '', [Validators.required, Validators.maxLength(512)]),
    });
  }

  resourcesValidator(control: FormControl) {
    const value = control.value;
    if (value > 1000 || value < -1000 || value === 0) {
      return {resourcesValidator: true};
    }
    return null;

  }

  submit() {
    const id = +(this.data.id || this.data);
    const newItem: Item = {
      id: id,
      // id: this.new(this.data) ? this.data : this.data.id,
      // id: this.data.id || this.data,
      resources: this.modalForm.controls['resources'].value,
      comment: this.modalForm.controls['comment'].value,
    };
    this.dialogRef.close(newItem);
  }

  abort() {

  }

  new(val: any) {
    return typeof val === 'number';
  }
}
