import { CompanyService } from './../../../service/company.service';
import { CustomMaterialModule } from './../../../custom-material/custom-material.module';
import { Company } from './../../../Models/company.model';
import { ComputerService } from './../../../service/computer.service';
import { Computer } from './../../../Models/computer.model';
import { Component, OnInit} from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import {MatDialogRef} from '@angular/material/dialog';
import {
  dateValidatorDiscontinuedNotSetToNull,
  dateValidatorIntroducedNotSetToNull
} from '../computer-edit-form/computer-edit-form.component';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-computer-add-form',
  templateUrl: './computer-add-form.component.html',
  styleUrls: ['./computer-add-form.component.scss']
})

export class ComputerAddFormComponent implements OnInit {

  computer: Computer = new Computer();
  companies: Company[];
  editForm: FormGroup;
  submitted = false;

  constructor(private computerService: ComputerService,
              private companyService: CompanyService,
              private location: Location,
              private router: Router,
              private formBuilder: FormBuilder,
              private dialogRef: MatDialogRef<ComputerAddFormComponent>){}

  ngOnInit(): void {
    this.getCompanies();
    this.createForm();
  }

  createForm(): void{
    this.editForm = this.formBuilder.group({
      name: [''],
      introduced: [''],
      discontinued: [''],
      companyDto: ['']
    }, {validator: [this.dateValidatorDiscontinued, this.dateValidatorIntroduced, this.nameValidator]});
  }

  nameValidator(form: FormGroup): object{
    const name = form.get('name').value;
    if (name === ''){
      return {
        nameRequired: 'Name is required'
      };
    }
    return null;
  }

  dateValidatorDiscontinued(form: FormGroup): object{
    const condition = Date.parse(form.get('introduced').value) > Date.parse(form.get('discontinued').value);
    if (condition){
      return {
        dateDiscontinued: 'Must be after introduced date'
      };
    }
    return null;
  }

  dateValidatorIntroduced(form: FormGroup): object{
    const condition = Date.parse(form.get('introduced').value) > Date.parse(form.get('discontinued').value);
    if (condition){
      return {
        dateIntroduced: 'Must be before discontinued date'
      };
    }
    return null;
  }

  onSubmit(): void{
    console.log(this.submitted);
    this.submitted = true;
    if (this.editForm.invalid){
      return;
    }
  }

  getCompanies(): void{
    this.companyService.getCompanies().subscribe(
      (result: Company[]) => {
        this.companies = result;
      },
      (error) => {
        console.log("can't retrive company list")
      }
    );
  }
}
