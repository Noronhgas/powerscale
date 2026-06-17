const form = document.getElementById("form-personagem");
const resultadoDiv = document.getElementById("resultado");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const nome = document.getElementById("nome").value;
  const nivelPoder = document.getElementById("nivelPoder").value;
  const idade = document.getElementById("idade").value;
  const raca = document.getElementById("raca").value;

  resultadoDiv.style.display = "block";

  resultadoDiv.innerHTML = `
    <strong>Dados recebidos:</strong><br>
    Nome: ${nome}<br>
    Nível de poder: ${nivelPoder}<br>
    Idade: ${idade}<br>
    Raça: ${raca}<br><br>
    O cálculo final será feito pelo backend na próxima fase.
  `;
});