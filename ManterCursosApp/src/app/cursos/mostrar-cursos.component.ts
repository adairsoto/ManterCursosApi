import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { CursosapiService } from '../cursosapi.service';


@Component({
  selector: 'app-mostrar-cursos',
  templateUrl: './mostrar-cursos.component.html',
  styleUrls: ['./mostrar-cursos.component.css']
})
export class MostrarCursosComponent implements OnInit {
  
  cursoList$!:Observable<any[]>;
  cursoCategoriaList$!:Observable<any[]>;
  cursoCategoriaList:any[];

  cursoCategoriaMap:Map<number, string> = new Map()
  modalTitle:string = '';
  formON:boolean = false;
  curso:any; 
  currentDate = new Date();

  constructor(private service: CursosapiService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.cursoList$ = this.service.getCursoList();
    this.refreshCursoCategoriaMap();
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

  searchText: string = '';
  
  onSearchTextEntered(searchValue: string) {
    this.searchText = searchValue;
    // console.log(this.searchText);
  }
}
