import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/Models/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  @Input()
  user : User;

  constructor() { }

  ngOnInit(): void {
  }

  // remove(): void{
  //   this.removeToParent.emit(this.computer.idComputer);
  // }
  
  // @Output() removeToParent = new EventEmitter<number>();

}