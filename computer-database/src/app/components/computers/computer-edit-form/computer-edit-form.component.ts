import {Component, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {Computer} from '../../../Models/computer.model';
import {Company} from '../../../Models/company.model';
import {ComputerService} from '../../../service/computer.service';
import {CompanyService} from '../../../service/company.service';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ComputerData} from '../computer-details/computer-details.component';
import {ValidateFn} from 'codelyzer/walkerFactory/walkerFn';

@Component({
  selector: 'app-computer-edit-form',
  templateUrl: './computer-edit-form.component.html',
  styleUrls: ['./computer-edit-form.component.scss']
})
export class ComputerEditFormComponent implements OnInit {
  editForm: FormGroup;
  computer: Computer;
  computerOld: Computer;
  companies: Company[];

  constructor(private formBuilder: FormBuilder,
              private computerService: ComputerService,
              private companyService: CompanyService,
              @Inject(MAT_DIALOG_DATA) public data: ComputerData) {
  }

  ngOnInit(): void {
    this.retriveCompanyList();
    this.computer = new Computer(this.data.idComputer, this.data.name, this.data.introduced, this.data.discontinued, this.data.companyDto);
    this.computerOld = new Computer(this.data.idComputer,
      this.data.name, this.data.introduced, this.data.discontinued, this.data.companyDto);
    this.createForm();
  }

  createForm(): void{
    this.editForm = this.formBuilder.group({
      name: [''],
      introduced: [''],
      discontinued: [''],
      companyDto: ['']
    }, {validator: [this.dateValidatorDiscontinued, this.dateValidatorIntroduced, this.nameValidator,
        dateValidatorIntroducedNotSetToNull(this.computerOld),
        dateValidatorDiscontinuedNotSetToNull(this.computerOld)]});
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
    if (this.editForm.invalid){
      return;
    }
  }

  byCompany(company1: Company, company2: Company): boolean {
    return company1?.idCompany === company2?.idCompany;
  }

  retriveCompanyList(): void{
    this.companyService.getCompanies().subscribe(
      (result: Company[]) => {
        this.companies = result;
      },
      (error) => {
        console.log('can\'t retrive company list');
      }
    );
  }
}
export function dateValidatorIntroducedNotSetToNull(computerOld: Computer): ValidatorFn{
  return (form: FormGroup): ValidationErrors => {
    const newIntroduced = form.get('introduced').value;
    if (computerOld.introduced){
      if (newIntroduced === '' && computerOld.introduced !== ''){
        return{
          introducedSetNull: 'Cannot set to null'
        };
      }
    }
    return null;
  };
}

export function dateValidatorDiscontinuedNotSetToNull(computerOld: Computer): ValidatorFn{
  return (form: FormGroup): ValidationErrors => {
    const newDiscontinued = form.get('discontinued').value;
    if (computerOld.discontinued){
      if (newDiscontinued === '' && computerOld.discontinued !== ''){
        return{
          discontinuedSetNull: 'Cannot set to null'
        };
      }
    }
    return null;
  };
}


