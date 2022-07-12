export interface CursoCategoria {
    id: number;
    categoriaNome: string;
}

export interface Curso {
    id: number;
    nome: string;
    descricao: string;
    dataInicio: string;
    dataTermino: string;
    quantidadeAlunos: number;
    status: string;
    cursoCategoriaId: number;
}

export interface Status {
    id: number;
    statusOpcao: string;
}