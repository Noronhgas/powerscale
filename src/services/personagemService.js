const multiplicadoresRaca = {
  humano: 1.2,
  elfo: 1.5,
  anjo: 1.8,
  alien: 1.6,
  espirito: 2.0,
};

function gerarMensagemNivel(nivelPersonagem) {
  if (nivelPersonagem < 100) {
    return "Seu personagem ainda está em fase inicial, mas possui potencial para evoluir.";
  }

  if (nivelPersonagem < 300) {
    return "Seu personagem possui um bom nível de poder e já consegue enfrentar desafios maiores.";
  }

  if (nivelPersonagem < 700) {
    return "Seu personagem é muito forte e está acima da maioria dos guerreiros comuns.";
  }

  if (nivelPersonagem < 1500) {
    return "Seu personagem atingiu um nível lendário de poder.";
  }

  return "Seu personagem possui um poder absurdo, digno de uma entidade cósmica.";
}

function calcularNivelPersonagem({ nome, nivelPoder, idade, raca }) {
  if (!nome || nome.trim() === "") {
    throw new Error("Nome é obrigatório");
  }

  const nivelPoderNumber = Number(nivelPoder);
  const idadeNumber = Number(idade);

  if (!Number.isInteger(nivelPoderNumber) || nivelPoderNumber <= 0) {
    throw new Error("Nível de poder deve ser um número inteiro maior que zero");
  }

  if (!Number.isInteger(idadeNumber) || idadeNumber <= 0) {
    throw new Error("Idade deve ser um número inteiro maior que zero");
  }

  if (!multiplicadoresRaca[raca]) {
    throw new Error("Raça inválida");
  }

  const multiplicador = multiplicadoresRaca[raca];

  const nivelPersonagem =
    (nivelPoderNumber * idadeNumber * multiplicador) / 15;

  return {
    nome: nome.trim(),
    nivelPoder: nivelPoderNumber,
    idade: idadeNumber,
    raca,
    multiplicador,
    nivelPersonagem: Number(nivelPersonagem.toFixed(2)),
    mensagem: gerarMensagemNivel(nivelPersonagem),
  };
}

module.exports = {
  calcularNivelPersonagem,
  gerarMensagemNivel,
  multiplicadoresRaca,
};