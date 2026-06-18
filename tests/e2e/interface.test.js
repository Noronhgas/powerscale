const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const app = require("../../src/app");

let server;
let driver;

describe("Teste de interface com Selenium", () => {
  beforeAll(async () => {
    server = app.listen(3001);

    const options = new chrome.Options();

    options.addArguments("--headless=new");
    options.addArguments("--no-sandbox");
    options.addArguments("--disable-dev-shm-usage");

    driver = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(options)
      .build();
  });

  afterAll(async () => {
    await driver.quit();
    server.close();
  });

  test("deve calcular nivel de personagem pela interface", async () => {
    await driver.get("http://localhost:3001");

    await driver.findElement(By.id("nome")).sendKeys("Nicolas");
    await driver.findElement(By.id("nivelPoder")).sendKeys("500");
    await driver.findElement(By.id("idade")).sendKeys("20");

    await driver.findElement(By.css("#raca option[value='anjo']")).click();

    await driver.findElement(By.id("calcular")).click();

    const resultado = await driver.wait(
      until.elementLocated(By.id("resultado")),
      5000
    );

    await driver.wait(async () => {
      const texto = await resultado.getText();
      return texto.includes("Nível do personagem: 1200");
    }, 5000);

    const textoFinal = await resultado.getText();

    expect(textoFinal).toContain("Nicolas");
    expect(textoFinal).toContain("Raça: anjo");
    expect(textoFinal).toContain("Nível do personagem: 1200");
  });
});
