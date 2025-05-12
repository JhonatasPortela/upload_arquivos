const uploadBtn = document.getElementById("upload-btn");
const inputUpload = document.getElementById("image-upload");

uploadBtn.addEventListener("click", () => {
  inputUpload.click();
});

function lerConteudoDoArquivo(arquivo) {
  return new Promise((resolve, reject) => {
    const leitor = new FileReader();
    leitor.onload = () => {
      resolve({ url: leitor.result, nome: arquivo.name });
    };

    leitor.onerror = () => {
      reject(`Erro ao ler o arquivo ${arquivo.name}`);
    };

    leitor.readAsDataURL(arquivo);
  });
}

const imagemPrincipal = document.querySelector(".main-imagem");
const nomeDaImagem = document.querySelector(".container-imagem-nome p");

inputUpload.addEventListener("change", async (evento) => {
  const arquivo = evento.target.files[0];
  if (arquivo) {
    try {
      const conteudoDoArquivo = await lerConteudoDoArquivo(arquivo);
      imagemPrincipal.src = conteudoDoArquivo.url;
      nomeDaImagem.textContent = conteudoDoArquivo.nome;
    } catch (erro) {
      console.error("Erro na leitura do arquivo");
    }
  }
});

const inputTags = document.getElementById("input-tags");
const listaTags = document.getElementById("lista-tags");

listaTags.addEventListener("click", (evento) => {
  if (evento.target.classList.contains("remove-tag")) {
    const tagParaRemover = evento.target.parentElement;
    listaTags.removeChild(tagParaRemover);
  }
});

const tagsDisponiveis = ["Front-end", "Back-end", "Fullstack", "JavaScript", "HTML", "CSS", "React", "Node.js", "Python", "Java", "Programação"];

async function verificaTag(tagTexto) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(tagsDisponiveis.includes(tagTexto));
    }, 1000);
  });
}

inputTags.addEventListener("keypress", async (evento) => {
  if (evento.key === "Enter") {
    evento.preventDefault();
    const tagTexto = inputTags.value.trim();
    if (tagTexto !== "") {
      try {
        const tagExiste = await verificaTag(tagTexto);
        if (tagExiste) {
          const tagNova = document.createElement("li");
          tagNova.innerHTML = `<p>${tagTexto}</p><img src="img/close-black.svg" class="remove-tag">`;
          listaTags.appendChild(tagNova);
          inputTags.value = "";
        } else {
          alert("Tag não foi encontrada");
        }
      } catch (erro) {
        console.error("Erro ao verificar a existência da tag");
      }
    }
  }
});

const botaoPublicar = document.querySelector(".botao-publicar");

async function publicarProjeto(nomeProjeto, descricaoProjeto, tagsProjeto) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const deuCerto = Math.random() > 0.5;

      if (deuCerto) {
        resolve("Projeto publicado com sucesso!");
      } else {
        reject("Erro ao publicar o projeto.");
      }
    }, 2000);
  });
}

botaoPublicar.addEventListener("click", async (evento) => {
  evento.preventDefault();
  const nomeProjeto = document.getElementById("nome").value;
  const descricaoProjeto = document.getElementById("descricao").value;
  const tagsProjeto = Array.from(listaTags.querySelectorAll("p")).map((tag) => tag.textContent);

  try {
    const resultado = await publicarProjeto(nomeProjeto, descricaoProjeto, tagsProjeto);
    alert("Deu tudo certo!");
  } catch (erro) {
    alert("Deu ruim!", erro);
  }
});

const botaoDescartar = document.querySelector(".botao-descartar");

botaoDescartar.addEventListener("click", (evento) => {
  evento.preventDefault();
  const formulario = document.querySelector("form");
  formulario.reset();

  imagemPrincipal.src = "img/imagem1.png";
  nomeDaImagem.textContent = "image_projeto.png";

  listaTags.innerHTML = "";
});
