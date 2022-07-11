export interface CursoCategoria {
    id: number;
    categoriaNome: string;
}

export interface Curso {
    id: number;
    nome: string;
    descricao: string;
    dataInicio: number;
    dataTermino: number;
    quantidadeAlunos: number;
    status: string;
    cursoCategoriaId: number;
}

export interface Status {
    id: number;
    statusOpcao: string;
}