import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Company } from '../../../Models/company.model';
import { ActivatedRoute } from '@angular/router';
import { CompanyService } from 'src/app/service/company.service';
import { MatSelectChange } from '@angular/material/select';
import { Page } from 'src/app/Models/page.model';
import { ThemePalette } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { ComputerValidDeleteComponent } from '../../computers/computer-valid-delete/computer-valid-delete.component';

interface Order {
  label : string;
  value : string;
}

interface Ascending {
  label : string;
  value : string;
}

export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
  hidden: boolean;
}

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss'],
  template: `<mat-checkbox #cbA></mat-checkbox>
             <checkbox #cb></checkbox>
             <input #cbM></input>
             <button #pageButtonFirst></button>
             <button #pageButtonBegin></button>
             <button #pageButton1></button>
             <button #pageButton2></button>
             <button #pageButton3></button>
             <button #pageButtonNext></button>
             <button #pageButtonEnd></button>`,
})
export class CompanyListComponent implements OnInit {
  private route : ActivatedRoute;

  companiesList : Company[] = [];
  companyService : CompanyService;

  nbCompanies : number;
  page : Page;
  motSearch : string = "";
  orderSelect = 'company.id';
  ascendingSelect = 'ASC';
  orders : Order[] = [
    {label: "id", value: "company.id"},
    {label: "name", value: "cp.name"},
  ]

  ascendings : Ascending[] = [
    {label: "ASC", value: "ASC"},
    {label: "DESC", value: "DESC"}
  ]

  displayedColumns: string[] = ['name'];

  task: Task = {
    name: 'Indeterminate',
    completed: false,
    color: 'primary',
    subtasks: [],
    hidden: true
  };

  allComplete: boolean = false;

  @ViewChild("pageButtonFirst", {read: ElementRef}) pageButtonFirst: ElementRef;
  @ViewChild("pageButtonBegin", {read: ElementRef}) pageButtonBegin: ElementRef;
  @ViewChild("pageButton1", {read: ElementRef}) pageButton1: ElementRef;
  @ViewChild("pageButton2", {read: ElementRef}) pageButton2: ElementRef;
  @ViewChild("pageButton3", {read: ElementRef}) pageButton3: ElementRef;
  @ViewChild("pageButtonNext", {read: ElementRef}) pageButtonNext: ElementRef;
  @ViewChild("pageButtonEnd", {read: ElementRef}) pageButtonEnd: ElementRef;
  @ViewChild("cbM", {read: ElementRef}) checkBoxAll: ElementRef;
  @ViewChild("cbA", {read: ElementRef}) colloneHeader: ElementRef;
  @ViewChild("cb", {read: ElementRef}) colloneFirst: ElementRef;

  constructor(private routeParam: ActivatedRoute, companyService: CompanyService, public dialog: MatDialog) {
    this.route = routeParam;
    this.companyService = companyService;
   }

  ngOnInit(): void {
    this.setPage();
    this.getList();
  }


  setPage(){
    this.page = new Page();
    this.page.setItemsByPage(10);
    this.page.setAscending("ASC");
    this.page.setOrder("company.id");
    this.page.setCurrentPage(1);
    this.getNombreCompanies();
    this.getNombrePages();
  }

  getList() : void {
    this.companyService.getCompaniesByPage(this.page, this.motSearch).subscribe(
      (result: Company[]) => {
        this.companiesList = [];
        result.forEach(company => {
          this.companiesList.push(company);
        });
        this.setSubTask();
      },
      (error: any) => {
        console.log("Erreur avec l'observable lors du getCompaniesList." + error);
        console.log(error);
      }
    );
  }

  getNombreCompanies(){
    this.companyService.getNbCompanies(this.motSearch).subscribe(
      (result: number) => {
        this.nbCompanies = result;
        this.getNombrePages();
      },
      (error: any) => {
        console.log("Erreur avec l'observable lors du getNombreCompanies.");
      }
    )
  }

  getNombrePages() {
    if(!this.page.itemsByPage){
      this.page.setItemsByPage(25);
    }
    this.companyService.getNbPages(this.page, this.motSearch).subscribe(
      (result: number) => {
        this.page.setNbPage(result);
        this.listOfButtonPage();
        this.MAJCurrentPage();
      },
      (error: any) => {
        console.log("Erreur avec l'observable lors du getNombrePages.");
      }
    )
  }

  MAJCurrentPage(): void{
    if(this.page.currentPage <= 0){
      this.page.currentPage = 1;
    }
    if(this.page.currentPage > this.page.nbPage){
      this.page.currentPage = this.page.nbPage;
    }
    this.getList();
  }

  remove(id : number): void{
    this.companyService.deleteCompany(id).subscribe(
      () => {
        this.getList();
      },
      (error: any) => {
        console.log("Erreur avec l'observable lors du removeComputer.");
      }
    );
  }

  modifOrder(orderSelect : string) : void {
    if(this.orderSelect === orderSelect){
      if(this.ascendingSelect === 'ASC'){
        this.ascendingSelect = 'DESC';
      }
      else{
        this.ascendingSelect = 'ASC';
      }
      this.modifAscending(this.ascendingSelect);
    }
    else{
      this.ascendingSelect = 'ASC';
      this.orderSelect = orderSelect;
      this.page.setOrder(orderSelect);
    }
    this.getList();
  }

  modifAscending(ascendingSelectEvent : string) : void {
    this.page.setAscending(ascendingSelectEvent);
    this.getList();
  }

  modifSearch(motSearch: string): void{
    this.motSearch = motSearch;
    this.getNombreCompanies();
    this.getNombrePages();
    this.getList();
  }

  modifItemsByPage(nombreItems : number) : void {
    this.page.setItemsByPage(nombreItems);
    this.getNombrePages();
  }

  nextPage() : void {
    if(this.page.currentPage < this.page.nbPage){
      this.page.currentPage = this.page.currentPage + 1;
      this.getList();
      this.listOfButtonPage();
    }
  }

  setCurrentPage(currentPage : number) : void {
    this.page.currentPage = currentPage;
    this.getList();
    this.listOfButtonPage();
  }

  previousPage() : void {
    if(this.page.currentPage > 1){
      this.page.currentPage = this.page.currentPage - 1;
      this.getList();
      this.listOfButtonPage();
    }
  }

  toggleEditMode(): void {
    if(this.task.hidden){
      this.task.hidden = false;
      this.task.subtasks.forEach(t => t.hidden = false);
    }
    else{
      this.task.hidden = true;
      this.task.subtasks.forEach(t => t.hidden = true);
    }
  }

  setSubTask() {
    let newSubTask;
    this.task.subtasks = [];
    this.task.hidden = true;
    this.allComplete = false;
    for(let i = 0; i < this.companiesList.length; i++){
      newSubTask = {name: this.companiesList[i].idCompany, completed: false, color: 'primary', hidden: true};
      this.task.subtasks.push(newSubTask);
    }
  }

  setAll() {
    this.allComplete = !this.allComplete;
    if (this.task.subtasks == null) {
      return;
    }
    this.task.subtasks.forEach(t => t.completed =  this.allComplete);
  }

  updateAllComplete() {
    this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
  }

  someComplete(): boolean {
    if (this.task.subtasks == null) {
      return false;
    }
    return this.task.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  deleteSelected(): void {
    for(let i = 0; i < this.task.subtasks.length; i++){
      if(this.task.subtasks[i].completed){
        console.log("true");
        console.log(this.task.subtasks[i].name);
        this.companyService.deleteCompany(Number(this.task.subtasks[i].name)).subscribe(
          (result) => {
            console.log("Supression réussi");
            this.ngOnInit();
            this.allComplete = false;
          },
          (error: any) => {
            console.log("Erreur lors de la supression");
          }
        );
      }
    }
  }

  openDialog(): void{
    const dialogRef = this.dialog.open(ComputerValidDeleteComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result){
        console.log("true");
        this.deleteSelected();
      }
      else{
        console.log("false");
      }
    });
  }

  hideAllButton(): void {
    this.pageButtonFirst.nativeElement.hidden = true;
    this.pageButtonBegin.nativeElement.hidden = true;
    this.pageButton1.nativeElement.hidden = true;
    this.pageButton2.nativeElement.hidden = true;
    this.pageButton3.nativeElement.hidden = true;
    this.pageButtonNext.nativeElement.hidden = true;
    this.pageButtonEnd.nativeElement.hidden = true;

  }

  listOfButtonPage(): void {
    var currentPage = this.page.currentPage;
    var maxPage = this.page.nbPage;

    this.hideAllButton();

    if(currentPage > 1){
      this.pageButtonFirst.nativeElement.hidden = false;
      this.pageButtonBegin.nativeElement.hidden = false;
    }

    for(let i = 0; i < 3; i++){
      if((currentPage + i) == currentPage){
        this.pageButton2.nativeElement.style.color = "#6d4e4e";
      }

      if(i == 0){
        if(!(currentPage - 1 < 1)){
          this.pageButton1.nativeElement.hidden = false;
        }
      }
      else if(i == 1){
        if(this.page.nbPage == 1){
          this.pageButton1.nativeElement.hidden = true;
          this.pageButtonFirst.nativeElement.hidden = true;
          this.pageButtonBegin.nativeElement.hidden = true;
          this.pageButtonNext.nativeElement.hidden = true;
          this.pageButtonEnd.nativeElement.hidden = true;
        }
        this.pageButton2.nativeElement.hidden = false;
      }
      else if(i == 2){
        if(!(currentPage + 1 > maxPage)){
          this.pageButton3.nativeElement.hidden = false;
        }
      }
    }

    if(currentPage < maxPage){
      this.pageButtonNext.nativeElement.hidden = false;
      this.pageButtonEnd.nativeElement.hidden = false;
    }
  }

  @Output() removeToParent = new EventEmitter<number>();
}
