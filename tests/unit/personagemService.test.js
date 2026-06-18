const {
  calcularNivelPersonagem,
  gerarMensagemNivel,
} = require("../../src/services/personagemService");

describe("calcularNivelPersonagem", () => {
  test("deve calcular nivel de personagem corretamente para anjo", () => {
    const resultado = calcularNivelPersonagem({
      nome: "Nicolas",
      nivelPoder: 500,
      idade: 20,
      raca: "anjo",
    });

    expect(resultado.nivelPersonagem).toBe(1200);
    expect(resultado.multiplicador).toBe(1.8);
    expect(resultado.nome).toBe("Nicolas");
  });

  test("deve calcular nivel de personagem corretamente para humano", () => {
    const resultado = calcularNivelPersonagem({
      nome: "Carlos",
      nivelPoder: 100,
      idade: 30,
      raca: "humano",
    });

    expect(resultado.nivelPersonagem).toBe(240);
    expect(resultado.multiplicador).toBe(1.2);
  });

  test("deve calcular nivel de personagem corretamente para espirito", () => {
    const resultado = calcularNivelPersonagem({
      nome: "Luna",
      nivelPoder: 300,
      idade: 10,
      raca: "espirito",
    });

    expect(resultado.nivelPersonagem).toBe(400);
    expect(resultado.multiplicador).toBe(2.0);
  });

  test("deve retornar erro quando nome estiver vazio", () => {
    expect(() => {
      calcularNivelPersonagem({
        nome: "",
        nivelPoder: 100,
        idade: 20,
        raca: "elfo",
      });
    }).toThrow("Nome é obrigatório");
  });

  test("deve retornar erro quando nivel de poder for invalido", () => {
    expect(() => {
      calcularNivelPersonagem({
        nome: "Teste",
        nivelPoder: 0,
        idade: 20,
        raca: "elfo",
      });
    }).toThrow("Nível de poder deve ser um número inteiro maior que zero");
  });

  test("deve retornar erro quando idade for invalida", () => {
    expect(() => {
      calcularNivelPersonagem({
        nome: "Teste",
        nivelPoder: 100,
        idade: 0,
        raca: "elfo",
      });
    }).toThrow("Idade deve ser um número inteiro maior que zero");
  });

  test("deve retornar erro quando raca for invalida", () => {
    expect(() => {
      calcularNivelPersonagem({
        nome: "Teste",
        nivelPoder: 100,
        idade: 20,
        raca: "orc",
      });
    }).toThrow("Raça inválida");
  });

  test("deve retornar mensagem de nivel lendario", () => {
    const mensagem = gerarMensagemNivel(1000);

    expect(mensagem).toBe("Seu personagem atingiu um nível lendário de poder.");
  });
});