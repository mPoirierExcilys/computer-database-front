import { Component, OnInit } from '@angular/core';
import { Computer } from '../../../Models/computer.model';
import { ActivatedRoute } from '@angular/router';
import { ComputerService } from 'src/app/service/computer.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-computer-list',
  templateUrl: './computer-list.component.html',
  styleUrls: ['./computer-list.component.scss']
})
export class ComputerListComponent implements OnInit {
  private route : ActivatedRoute;
  computersList : Computer[];
  computerService : ComputerService;

  constructor(private routeParam: ActivatedRoute, computerService: ComputerService) {
    this.route = routeParam;
    this.computerService = computerService;
   }

  ngOnInit(): void {
    this.getList
  }

  getList(){
    this.computerService.getComputers().suscribe()(
      (result: Computer[]) => {
        this.computersList = result;
      },
      (error: any) => {
        console.log("Erreur avec l'observable lors du getComputersList.");
      }
    );
  }

  remove(id : number): void{
    this.computerService.deleteComputer(id).subscribe(
      (result: HttpResponse<string>) => {
        const message = result.body;
        const index = this.computersList.findIndex(x => x.id == id);
        if(index != -1){
          this.computersList.splice(index, 1);
        }
      },
      (error : HttpResponse<String>) => {
        console.log("Erreur avec l'observable lors du getComputersList." + error.status);
      }
    );
  }
}
