import { Component, OnInit } from '@angular/core';
import {Computer} from '../../../Models/computer.model';
import {ActivatedRoute} from '@angular/router';
import {ComputerService} from '../../../service/computer.service';

@Component({
  selector: 'app-computer-details',
  templateUrl: './computer-details.component.html',
  styleUrls: ['./computer-details.component.scss']
})
export class ComputerDetailsComponent implements OnInit {

  computer: Computer;

  constructor(private route: ActivatedRoute, private computerService: ComputerService) { }

  ngOnInit(): void {

  }
}
