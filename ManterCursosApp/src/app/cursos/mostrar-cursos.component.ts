import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { CursosapiService } from '../cursosapi.service';
import { Curso } from '../interfaces';


@Component({
  selector: 'app-mostrar-cursos',
  templateUrl: './mostrar-cursos.component.html',
  styleUrls: ['./mostrar-cursos.component.css']
})
export class MostrarCursosComponent implements OnInit {
  
  cursoList$!:Observable<any[]>;
  cursoCategoriaList$!:Observable<any[]>;
  cursoCategoriaList:any[];

  inicio = new Date('January 01, 2020 13:30:00');
  termino =  new Date('December 31, 2024 13:30:00');
  searchText: string = '';

  cursoCategoriaMap:Map<number, string> = new Map()
  modalTitle:string = '';
  formON:boolean = false;
  curso:any; 
  currentDate = new Date();
  cursoList: Curso[];
  cursoListFormatted: Curso[];
  
  constructor(private service: CursosapiService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.service.getCursoList().subscribe((data: any) => {
    this.cursoList = data; });
    this.cursoList$ = this.service.getCursoList();
    this.refreshCursoCategoriaMap();
  }
  ver() {
    console.log('inicio:', Date.parse(formatDate(this.inicio, 'yyyy-MM-dd', 'en-US')));
    console.log('termino:', Date.parse(formatDate(this.termino, 'yyyy-MM-dd', 'en-US')));
    // const dataInicioFormated = Date.parse(formatDate(this.cursoTest[i].dataInicio, 'yyyy-MM-dd', 'en-US'));
    // console.log('datainicioCursoFormated:', dataInicioFormated);
  }

  refreshCursoCategoriaMap() {
    this.service.getCursoCategoriaList().subscribe(data => {
      this.cursoCategoriaList = data;

      for (let i = 0; i < data.length; i++) {
        this.cursoCategoriaMap.set(this.cursoCategoriaList[i].id, this.cursoCategoriaList[i].categoriaNome);
      }
    })
  }

  addModal() {
    this.curso = {
      id: 0,
      nome:null,
      descricao:null,
      dataInicio:null,     
      dataTermino:null,     
      quantidadeAlunos:null,
      status:null,
      cursoCategoriaId:null
    }

    this.modalTitle = 'Adicionar Curso';
    this.formON = true;
  }

  closeModal() {
    this.formON = false;
    this.cursoList$ = this.service.getCursoList();
  }

  editModal(item:any) {
    this.curso = item;
    this.modalTitle = "Atualizar Curso";
    this.formON = true;
  }

  removerCurso(item:any) {
    if (item.status == 'Encerrado') 
    {
      this.toastr.warning('','Não é possível remover um curso encerrado!');
    }
    else
    {
      if(confirm(`Deseja realmente remover o curso ${item.nome}?`)) {
        this.service.deleteCurso(item.id).subscribe(res => {
          var closeModalBtn = document.getElementById('add-edit-modal-close');
        if(closeModalBtn) {
          closeModalBtn.click();
        }
        this.toastr.success('','Curso removido com sucesso!');
        });
        var log = {
          responsavel: 'Diogo',
          curso: item.nome,
          logTipo: 'Exclusão',
          timestamp: this.currentDate     
        }
        this.service.createLog(log).subscribe(res => { });
      }
    }
  }

  
  
  onSearchTextEntered(searchValue: string) {
    this.searchText = searchValue;
  }

  limparFiltros() {
    this.inicio = new Date('January 01, 2020 13:30:00');
    this.termino =  new Date('December 31, 2024 13:30:00');
    this.searchText= '';
  }
}
