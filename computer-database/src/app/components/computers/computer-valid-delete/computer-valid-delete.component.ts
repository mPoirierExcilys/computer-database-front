import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../computer-list/computer-list.component';

@Component({
  selector: 'app-computer-valid-delete',
  templateUrl: './computer-valid-delete.component.html',
  styleUrls: ['./computer-valid-delete.component.scss']
})
export class ComputerValidDeleteComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ComputerValidDeleteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
