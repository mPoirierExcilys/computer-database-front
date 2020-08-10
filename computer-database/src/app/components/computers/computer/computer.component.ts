import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Computer } from 'src/app/Models/computer.model';

@Component({
  selector: 'app-computer',
  templateUrl: './computer.component.html',
  styleUrls: ['./computer.component.scss']
})
export class ComputerComponent implements OnInit {
  @Input()
  computer : Computer;

  constructor() { }

  ngOnInit(): void {
  }

  remove(): void{
    this.removeToParent.emit(this.computer.idComputer);
  }

  @Output() removeToParent = new EventEmitter<number>();
}