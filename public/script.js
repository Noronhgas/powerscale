const form = document.getElementById("form-personagem");
const resultadoDiv = document.getElementById("resultado");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const nome = document.getElementById("nome").value;
  const nivelPoder = document.getElementById("nivelPoder").value;
  const idade = document.getElementById("idade").value;
  const raca = document.getElementById("raca").value;

  resultadoDiv.style.display = "block";
  resultadoDiv.innerHTML = "Calculando nível do personagem...";

  try {
  const resposta = await fetch("/api/personagem/calcular", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nome,
      nivelPoder,
      idade,
      raca,
    }),
  });

  const dados = await resposta.json();

  if (!dados.sucesso) {
    resultadoDiv.innerHTML = `<strong>Erro:</strong> ${dados.erro}`;
    return;
  }

  resultadoDiv.innerHTML = `
    <strong>${dados.resultado.nome}</strong><br>
    Raça: ${dados.resultado.raca}<br>
    Nível de poder informado: ${dados.resultado.nivelPoder}<br>
    Idade: ${dados.resultado.idade}<br>
    Multiplicador da raça: ${dados.resultado.multiplicador}<br>
    Nível do personagem: ${dados.resultado.nivelPersonagem}<br><br>
    ${dados.resultado.mensagem}
  `;
} catch (error) {
  console.error("Erro ao conectar com o backend:", error);

  resultadoDiv.innerHTML = `
    <strong>Erro:</strong> Não foi possível conectar com o backend.
  `;
}})