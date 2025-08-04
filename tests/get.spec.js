//GET - lista todas as postagens ou lista a postagem por id específico
const { test, expect } = require("@playwright/test")
const fs = require("fs").promises // Precisa usar essa função para ler um arquivo .json de maneira paralela.

test.describe("Testando GET para api JsonPlaceHolder", () => {
  test("Listar todas as postagens - Validação da Estrutura", async ({
    request,
  }) => {
    const response = await request.get("http://localhost:3000/posts")

    // Para ler o json de forma assíncrona
    const data = await fs.readFile("db.json", "utf8")
    const posts = JSON.parse(data).posts

    // Validando o status e corpo da resposta
    expect(response.status()).toBe(200)

    expect(Array.isArray(posts)).toBe(true) // Se o retorno do json é um array
    expect(posts.length).toBeGreaterThan(0) // Valida se alista tem pelo menos 1 item dentro dela

    posts.forEach((postagem) => {
      // Tem as chaves certas?
      expect(postagem).toHaveProperty("id")
      expect(postagem).toHaveProperty("title")
      expect(postagem).toHaveProperty("views")

      // Os tipos são corretos?
      expect(typeof postagem.id).toBe("string")
      expect(typeof postagem.title).toBe("string")
      expect(typeof postagem.views).toBe("number")
    })
      console.log("Estrutura das postagens validada com sucesso.")
      const responseData = await response.json()
      console.log("Resposta retornada", responseData)
  })

    test("Listar comentários para uma postagem específica - Validação da Estrutura", async ({request}) => {

    })

})
