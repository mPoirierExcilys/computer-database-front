import { ComputerService } from './../../../service/computer.service';
import { Computer } from './../../../Models/computer.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-computer-add-form',
  templateUrl: './computer-add-form.component.html',
  styleUrls: ['./computer-add-form.component.scss']
})
export class ComputerAddFormComponent implements OnInit {


  computer: Computer = new Computer();

  constructor(private computerservice: ComputerService) { }


  ngOnInit(): void {
  }

}
