import { Component, OnInit, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { Computer } from '../../../Models/computer.model';
import { Page } from '../../../Models/page.model';
import { ActivatedRoute } from '@angular/router';
import { ComputerService } from 'src/app/service/computer.service';
import { MatSelectChange } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ThemePalette } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { ComputerValidDeleteComponent } from '../computer-valid-delete/computer-valid-delete.component';

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
  selector: 'app-computer-list',
  templateUrl: './computer-list.component.html',
  styleUrls: ['./computer-list.component.scss'],
  template: `<mat-checkbox #cbA></mat-checkbox>
             <checkbox #cb></checkbox>
             <input #cbM></input>
             <button #pageButtonBegin></button>
             <button #pageButton1></button>
             <button #pageButton2></button>
             <button #pageButton3></button>
             <button #pageButtonEnd></button>`,

})

export class ComputerListComponent implements OnInit {

  private route : ActivatedRoute;
  computersList : Computer[] = [];
  computerService : ComputerService;
  nbComputers : number;
  page : Page;
  motSearch : string = "";
  orderSelect = 'computer.id';
  ascendingSelect = 'ASC';
  orders : Order[] = [
    {label: "id", value: "computer.id"},
    {label: "name", value: "computer.name"},
    {label: "introduced", value: "computer.introduced"},
    {label: "discontinued", value: "computer.discontinued"},
    {label: "company name", value: "cp.name"}
  ]
  ascendings : Ascending[] = [
    {label: "ASC", value: "ASC"},
    {label: "DESC", value: "DESC"}
  ]

  task: Task = {
    name: 'Indeterminate',
    completed: false,
    color: 'primary',
    subtasks: [],
    hidden: true
  };

  animal: string;
  name: string;

  displayedColumns: string[] = ['name', 'introduced', 'discontinued', 'companyDto'];

  allComplete: boolean = false;

  @ViewChild("pageButtonBegin", {read: ElementRef}) pageButtonBegin: ElementRef;
  @ViewChild("pageButton1", {read: ElementRef}) pageButton1: ElementRef;
  @ViewChild("pageButton2", {read: ElementRef}) pageButton2: ElementRef;
  @ViewChild("pageButton3", {read: ElementRef}) pageButton3: ElementRef;
  @ViewChild("pageButtonEnd", {read: ElementRef}) pageButtonEnd: ElementRef;
  @ViewChild("cbM", {read: ElementRef}) checkBoxAll: ElementRef;
  @ViewChild("cbA", {read: ElementRef}) colloneHeader: ElementRef;
  @ViewChild("cb", {read: ElementRef}) colloneFirst: ElementRef;

  constructor(private routeParam: ActivatedRoute, computerService: ComputerService, public dialog: MatDialog) {
    this.route = routeParam;
    this.computerService = computerService;
  }

  ngOnInit(): void {
    this.setPage();
    this.getList();
  }

  setPage(){
    this.page = new Page();
    this.page.setItemsByPage(25);
    this.page.setAscending("ASC");
    this.page.setOrder("computer.id");
    this.page.setCurrentPage(1);
    this.getNombreComputers();
    this.getNombrePages();
  }

  getList() : void {
    this.computerService.getComputers(this.page, this.motSearch).subscribe(
      (result: Computer[]) => {
        this.computersList = [];
        result.forEach(computer => {
          this.computersList.push(computer);
        });
        this.setSubTask();
      },
      (error: any) => {
        console.log("Erreur avec l'observable lors du getComputersList.");
      }
    );
  }

  getNombreComputers(){
    this.computerService.getNbComputer(this.motSearch).subscribe(
      (result: number) => {
        this.nbComputers = result;
        this.getNombrePages();
      },
      (error: any) => {
        console.log("Erreur avec l'observable lors du getNombreComputers.");
      }
    )
  }

  getNombrePages() {
    if(!this.page.itemsByPage){
      this.page.setItemsByPage(25);
    }
    this.computerService.getNbPages(this.page, this.motSearch).subscribe(
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
    this.computerService.deleteComputer(id).subscribe(
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

  modifItemsByPage(nombreItems : number) : void {
    this.page.setItemsByPage(nombreItems);
    this.getNombrePages();
  }

  modifSearch(motSearch: string): void{
    this.motSearch = motSearch;
    this.getNombreComputers();
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
    console.log("ottoot");
    if(this.task.hidden){
      console.log("c'est vrai");
      this.task.hidden = false;
      this.task.subtasks.forEach(t => t.hidden = false);
    }
    else{
      console.log("c'esy faux");
      this.task.hidden = true;
      this.task.subtasks.forEach(t => t.hidden = true);
    }
  }

  setSubTask() {
    let newSubTask;
    this.task.subtasks = [];
    this.task.hidden = true;
    this.allComplete = false;
    for(let i = 0; i < this.computersList.length; i++){
      newSubTask = {name: this.computersList[i].idComputer, completed: false, color: 'primary', hidden: true};
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
    this.openDialog();
    for(let i = 0; i < this.task.subtasks.length; i++){
      if(this.task.subtasks[i].completed){
        console.log("true");
        console.log(this.task.subtasks[i].name);
        this.computerService.deleteComputer(Number(this.task.subtasks[i].name)).subscribe(
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
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
      console.log(this.animal);
    });
  }

  hideAllButton(): void {
    this.pageButtonBegin.nativeElement.hidden = true;
    this.pageButton1.nativeElement.hidden = true;
    this.pageButton2.nativeElement.hidden = true;
    this.pageButton3.nativeElement.hidden = true;
    this.pageButtonEnd.nativeElement.hidden = true;

  }

  listOfButtonPage(): void {
    var currentPage = this.page.currentPage;
    var maxPage = this.page.nbPage;

    this.hideAllButton();

    if(currentPage > 1){
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
        this.pageButton2.nativeElement.hidden = false;
      }
      else if(i == 2){
        if(!(currentPage + 1 > maxPage)){
          this.pageButton3.nativeElement.hidden = false;
        }
      }
    }

    if(currentPage < maxPage){
      this.pageButtonEnd.nativeElement.hidden = false;
    }
  }

  @Output() removeToParent = new EventEmitter<number>();
}
