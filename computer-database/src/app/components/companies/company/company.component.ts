import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Company } from 'src/app/Models/company.model';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {
  @Input()
  company : Company;
  constructor() { }

  ngOnInit(): void {
  }
  remove(): void{
    this.removeToParent.emit(this.company.idCompany);
  }

  @Output() removeToParent = new EventEmitter<number>();
}