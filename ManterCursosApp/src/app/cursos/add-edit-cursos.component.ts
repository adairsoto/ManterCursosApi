import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { CursosapiService } from '../cursosapi.service';

@Component({
  selector: 'app-add-edit-cursos',
  templateUrl: './add-edit-cursos.component.html',
  styleUrls: ['./add-edit-cursos.component.css']
})
export class AddEditCursosComponent implements OnInit {

  cursoList$!: Observable<any[]>;
  cursoCategoriaList$!: Observable<any[]>;
  statusList$!: Observable<any[]>;
  currentDate = new Date();
  timestamp = new Date();

  constructor(private service: CursosapiService, private toastr: ToastrService) { }

  @Input() curso: any;
  id: number = 0;
  nome: string = "";
  descricao: string = "";
  dataInicio: Date;
  dataTermino: Date;
  quantidadeAlunos: number;
  status: string = "";
  cursoCategoriaId: number;

  ngOnInit(): void {
    this.id = this.curso.id;
    this.nome = this.curso.nome;
    this.descricao = this.curso.descricao;
    this.dataInicio = this.curso.dataInicio;
    this.dataTermino = this.curso.dataTermino;
    this.quantidadeAlunos = this.curso.quantidadeAlunos;
    this.status = this.curso.status;
    this.cursoCategoriaId = this.curso.cursoCategoriaId;
    this.cursoList$ = this.service.getCursoList();
    this.cursoCategoriaList$ = this.service.getCursoCategoriaList();
    this.statusList$ = this.service.getStatusList();
  }

  adicionarCurso() {

    var curso = {
      nome: this.nome,
      descricao: this.descricao,
      dataInicio: this.dataInicio,
      dataTermino: this.dataTermino,
      quantidadeAlunos: this.quantidadeAlunos,
      status: this.status,
      cursoCategoriaId: this.cursoCategoriaId
    }
    var log = {
      responsavel: 'João',
      curso: this.nome,
      logTipo: 'Inclusão',
      timestamp: this.timestamp
    }

    var cdp = Date.parse(formatDate(this.currentDate, 'yyyy-MM-dd', 'en-US'));
    var dip = Date.parse(formatDate(this.dataInicio, 'yyyy-MM-dd', 'en-US'));
    var dtp = Date.parse(formatDate(this.dataTermino, 'yyyy-MM-dd', 'en-US'));
    var adj = 10800000;

    this.service.getCursoList().subscribe(res => {
      for (let i = 0; i < res.length; i++) {
        if (this.nome == res[i].nome) {
          this.toastr.warning('', 'Este curso já está cadastrado!');
          return
        }
      }

      for (let i = 0; i < res.length; i++) {
        if (((dip + adj) < Date.parse(res[i].dataInicio) && (dtp + adj) < Date.parse(res[i].dataInicio)) ||
          ((dip + adj) > Date.parse(res[i].dataTermino) && (dtp + adj) > Date.parse(res[i].dataTermino))) {
          console.log(cdp, dip, dtp, Date.parse(res[i].dataInicio));

          if (dip < cdp) {
            this.toastr.warning('', 'Data de início não pode ser menor que a data de hoje!');
            return
          }
          else if (this.dataInicio > this.dataTermino) {

            this.toastr.warning('', 'Data de início não pode ser maior que a data de término!');
            return
          }
        }
        else {
          this.toastr.warning('', 'Já existe um curso cadastrado no período indicado!');
          return
        }
        continue
      }
      this.service.addCurso(curso).subscribe(res => {
        var closeModalBtn = document.getElementById('add-edit-modal-close');
        if (closeModalBtn) {
          closeModalBtn.click();
        }
        this.toastr.success('', 'Curso adicionado com sucesso!');
      });
      this.service.createLog(log).subscribe(res => { });

    });
  }

  atualizarCurso() {
    var curso = {
      id: this.id,
      nome: this.nome,
      descricao: this.descricao,
      dataInicio: this.dataInicio,
      dataTermino: this.dataTermino,
      quantidadeAlunos: this.quantidadeAlunos,
      status: this.status,
      cursoCategoriaId: this.cursoCategoriaId
    }

    var log = {
      responsavel: 'Rafael',
      curso: this.nome,
      logTipo: 'Atualização',
      timestamp: this.currentDate
    }

    var cdp = Date.parse(formatDate(this.currentDate, 'yyyy-MM-dd', 'en-US'));
    var dip = Date.parse(formatDate(this.dataInicio, 'yyyy-MM-dd', 'en-US'));
    var dtp = Date.parse(formatDate(this.dataTermino, 'yyyy-MM-dd', 'en-US'));
    var adj = 10800000;

    this.service.getCursoList().subscribe(res => {
      for (let i = 0; i < res.length; i++) {
        if ( res[i].id == this.id)
        {
          continue
        }
        if (this.nome == res[i].nome ) {
          this.toastr.warning('', 'Este curso já está cadastrado!');
          return
        }
      }
      for (let i = 0; i < res.length; i++) {
        if ( res[i].id == this.id)
        {
          continue
        }
        if (((dip + adj) <= Date.parse(res[i].dataInicio) && (dtp + adj) <= Date.parse(res[i].dataInicio)) ||
          ((dip + adj) >= Date.parse(res[i].dataTermino) && (dtp + adj) >= Date.parse(res[i].dataTermino))) 
          {
          console.log(this.dataInicio, res[i].dataInicio);

          if (dip < cdp) {
            this.toastr.warning('', 'Data de início não pode ser menor que a data de hoje!');
            return
          }
          else if (this.dataInicio > this.dataTermino) {

            this.toastr.warning('', 'Data de início não pode ser maior que a data de término!');
            return
          }
        }
        else {
          this.toastr.warning('', 'Já existe um curso cadastrado no período indicado!');
          return
        }
        continue
      }
      var id: number = this.id;
      this.service.updateCurso(id, curso).subscribe(res => {
      var closeModalBtn = document.getElementById('add-edit-modal-close');
      if (closeModalBtn) {
        closeModalBtn.click();
      }
      this.toastr.success('', 'Curso atualizado com sucesso!');
    })
    this.service.createLog(log).subscribe(res => { });
    });
  }
}
