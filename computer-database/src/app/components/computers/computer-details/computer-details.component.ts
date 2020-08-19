import { Component, OnInit } from '@angular/core';
import { Computer } from '../../../Models/computer.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ComputerService } from '../../../service/computer.service';

@Component({
  selector: 'app-computer-details',
  templateUrl: './computer-details.component.html',
  styleUrls: ['./computer-details.component.scss']
})
export class ComputerDetailsComponent implements OnInit {

  computer: Computer;

  constructor(private routeParam: ActivatedRoute, private router: Router, private computerService: ComputerService) {}

  ngOnInit(): void {
    this.getComputer();
  }

  getComputer(){
    this.computerService.getComputer(Number(this.routeParam.snapshot.paramMap.get('id'))).subscribe(
      (result: Computer) => {
          this.computer = result;
          if(this.computer.idComputer === null){
            this.router.navigate(['404']);
          }
      },
      (error : any) => {
        console.log("Erreur avec l'observable lors du getComputer.");
        console.log(error);
        this.router.navigate(['404']);
      }
    )
  }

  goBackHome(){
    this.router.navigate(['/computers']);
  }

}
