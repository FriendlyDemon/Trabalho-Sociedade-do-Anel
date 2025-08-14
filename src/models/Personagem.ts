export class Personagem {
  id: number;
  nome: string;
  tipo: string;
  raca: string;
  arma: string;
  status: string;
  constructor(
    id: number,
    nome: string,
    tipo: string,
    raca: string,
    arma: string,
    status: string
  ) {
    this.id = id;
    this.nome = nome;
    this.tipo = tipo;
    this.raca = raca;
    this.arma = arma;
    this.status = status;
  }
}
