const request = require("supertest");
const app = require("../../src/app");

describe("API PowerScale", () => {
  test("GET /api/health deve retornar status online", async () => {
    const resposta = await request(app).get("/api/health");

    expect(resposta.status).toBe(200);
    expect(resposta.body.status).toBe("online");
    expect(resposta.body.message).toBe("API da PowerScale funcionando e aprovado");
  });

  test("POST /api/personagem/calcular deve calcular personagem corretamente", async () => {
    const resposta = await request(app)
      .post("/api/personagem/calcular")
      .send({
        nome: "Nicolas",
        nivelPoder: 500,
        idade: 20,
        raca: "anjo",
      });

    expect(resposta.status).toBe(200);
    expect(resposta.body.sucesso).toBe(true);
    expect(resposta.body.resultado.nome).toBe("Nicolas");
    expect(resposta.body.resultado.nivelPersonagem).toBe(1200);
    expect(resposta.body.resultado.multiplicador).toBe(1.8);
  });

  test("POST /api/personagem/calcular deve retornar erro com nome vazio", async () => {
    const resposta = await request(app)
      .post("/api/personagem/calcular")
      .send({
        nome: "",
        nivelPoder: 500,
        idade: 20,
        raca: "anjo",
      });

    expect(resposta.status).toBe(400);
    expect(resposta.body.sucesso).toBe(false);
    expect(resposta.body.erro).toBe("Nome é obrigatório");
  });

  test("POST /api/personagem/calcular deve retornar erro com raca invalida", async () => {
    const resposta = await request(app)
      .post("/api/personagem/calcular")
      .send({
        nome: "Nicolas",
        nivelPoder: 500,
        idade: 20,
        raca: "orc",
      });

    expect(resposta.status).toBe(400);
    expect(resposta.body.sucesso).toBe(false);
    expect(resposta.body.erro).toBe("Raça inválida");
  });
});