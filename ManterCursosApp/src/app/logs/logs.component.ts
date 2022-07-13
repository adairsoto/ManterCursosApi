import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CursosapiService } from '../cursosapi.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {

  logList$!: Observable<any[]>;
  searchText: string = '';

  inicio = new Date('January 01, 2020 13:30:00');
  termino =  new Date('December 31, 2024 13:30:00');

  constructor(private service: CursosapiService) { }

  ngOnInit(): void {
    this.logList$ = this.service.getLogs();
  }

  limparFiltros (){
    this.searchText= '';
    this.inicio = new Date('January 01, 2020 13:30:00');
    this.termino =  new Date('December 31, 2024 13:30:00');
  }

}
