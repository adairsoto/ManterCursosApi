import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CursosapiService } from '../cursosapi.service';
import { Curso, CursoCategoria, Status } from '../interfaces';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {

  form: any;
  formTitulo: string;
  cursos: Curso[];
  cursoCategorias: CursoCategoria[];
  status: Status[];
  cursoCategoriaMap:Map<number, string> = new Map()

  formAtivo: boolean = false;

  constructor(private service: CursosapiService) { }

  ngOnInit(): void {
    this.service.getCursoList().subscribe(res => this.cursos = res);
    this.service.getStatusList().subscribe(res => this.status = res);
    this.refreshCursoCategoriasMap();
    this.exibirFormCadastro();
  }

  refreshCursoCategoriasMap() {
    this.service.getCursoCategoriaList().subscribe(res => {
      this.cursoCategorias = res;

      for (let i = 0; i < res.length; i++) 
      {
        this.cursoCategoriaMap.set(this.cursoCategorias[i].id, this.cursoCategorias[i].categoriaNome);
      }
    })
  }

  exibirFormCadastro() {

    this.formTitulo = "Cadastrar Curso";
    this.formAtivo = true;

    this.form = new FormGroup({
      nome: new FormControl(),
      descricao: new FormControl(),
      dataInicio: new FormControl(),
      dataTermino: new FormControl(),
      quantidadeAlunos: new FormControl(),
      status: new FormControl(),
      cursoCategoriaId: new FormControl()
    });
  } 

  exibirFormAtualizacao(id) {

    this.formTitulo = "Atualizar Curso";
    this.formAtivo = true;
  
    this.service.getCursoById(id).subscribe(res => {
      this.form= new FormGroup({
        id: new FormControl(res.id),
        nome: new FormControl(res.nome),
        descricao: new FormControl(res.descricao),
        dataInicio: new FormControl(res.dataInicio),
        dataTermino: new FormControl(res.dataTermino),
        quantidadeAlunos: new FormControl(res.quantidadeAlunos),
        status: new FormControl(res.status),
        cursoCategoriaId: new FormControl(res.cursoCategoriaId)
      });
      console.log(this.form.value);
    });  
  }

  enviarForm(): void{
    //criar as variaveis para ter os dados do form
    const curso: Curso = this.form.value;
    if (curso.id> 0 ) {
      var id = curso.id;
      this.service.updateCurso(id, curso).subscribe(resultado=> {
        this.formAtivo=false;
        // this.visibilidadeTabela=true;
        // alert('Pessoa Atualizada com sucesso');
        // this.toastr.warning('Atualizando!', 'Atualizado com Sucesso!');
        this.service.getCursoList().subscribe((reg) => {
          this.cursos = reg;
        });
      });
    }
    else {

    this.service.addCurso(curso).subscribe((resultado) =>{
      this.formAtivo=false;
      // this.visibilidadeTabela=true;
      //alert('pessoa inserida com sucesso');
      // this.toastr.success('Gravando!', 'Inserido com Sucesso!');
      this.service.getCursoList().subscribe((reg) => {
        this.cursos = reg;
      });
    });
    }
  }

  excluirCurso(id) {
    this.service.deleteCurso(id).subscribe((resultado)=> {
      this.formAtivo=false;
      // this.visibilidadeTabela=true;
      // this.toastr.error("Registro será deletado", "Deletando!");
      this.service.getCursoList().subscribe(reg => {
        this.cursos = reg;
      });
    });
  }

  

}
