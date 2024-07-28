var tela = 0;
var personagem;
var img = [];
var fonte;
var xP = 250;
var yP = 80;
var xR = 80, xR1 = 200, xR2 = 320;
var yR = 140, yR1 = 140, yR2 = 140;
var r = 20, r1 = 20, r2 = 20;
var rP = 10;
var som;
var pontos = 0;
var nivel = 1;
var vidas = 5; // Contador de vidas
var barreiraPontos = 300;
var perguntas = [];
var respostas = [];
var mudarFase = 0;

//tela 0-menu
//tela 1-jogar
//tela 2-instruções
//tela 3-créditos
//tela 4-lembre-se
//tela 6 - tela de erro

function preload() {
  personagem = loadImage("Dino.png");
  img[1] = loadImage("ilop.jpeg");
  img[2] = loadImage("plop1.jpg");
  img[3] = loadImage("quadro.jpg");
  fonte = loadFont("Jersey20-Regular.ttf");
  som = loadSound("som menu.mp3");
}

function setup() {
  createCanvas(400, 300);
  som.play();
  
  perguntas[0] = "1- Construir uma imagem mental do objeto descrito. \nApresentar características individuais e qualificar algo. \nDe qual sequência textual se trata?";
  perguntas[1] = "2- Descreva uma sequência narrativa onde os eventos são contados.";
  perguntas[2] = "3- Explique um conceito ou fenômeno de maneira detalhada.";
  
  respostas[0] = ["Descritiva", "Narrativa", "Explicativa"];
  respostas[1] = ["Narrativa", "Descritiva", "Argumentativa"];
  respostas[2] = ["Explicativa", "Injuntiva", "Narrativa"];
}

function draw() {
  background(img[3]);
  
  if (tela == 0) {
    fill(160, 82, 45);
    rect(150, 90, 100, 30, 15);
    textSize(25);
    fill(250, 250, 250);
    textFont(fonte);
    text("Jogar", 172, 110);

    fill(160, 82, 45);
    rect(150, 130, 100, 30, 15);
    textSize(20);
    fill(250, 250, 250);
    text("Lembre-se", 160, 150);

    fill(160, 82, 45);
    rect(150, 170, 100, 30, 15);
    textSize(20);
    fill(250, 250, 250);
    text("Instruções", 160, 189);
    
    fill(160, 82, 45);
    rect(150, 210, 100, 30, 15);
    textSize(25);
    fill(250, 250, 250);
    text("Créditos", 160, 232);
  } else if (tela == 1) {
    fill(250, 250, 250);
    textSize(15);
    text(perguntas[nivel - 1], 30, 60);
    
    // Adicionando alternativas de resposta
    for (let i = 0; i < respostas[nivel - 1].length; i++) {
      fill(160, 82, 45);
      rect(50 + (i * 120), 140, 100, 30, 15);
      textSize(15);
      fill(250, 250, 250);
      text(respostas[nivel - 1][i], 50 + (i * 120) + 15, 160);
    }

    fill(160, 82, 45);
    rect(285, 250, 80, 25, 15);
    textSize(20);
    fill(250, 250, 250);
    text("Voltar", 302, 267);
    
    textSize(20);
    fill(250, 250, 250);
    text("Nível: " + nivel, 25, 40);
    text("Pontos: " + pontos, 290, 40);
    text("Vidas: " + vidas, 150, 40); // Exibindo o contador de vidas
    
    if (keyIsDown(LEFT_ARROW)) {
      xP -= 10;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      xP += 10;
    }
    if (keyIsDown(UP_ARROW)) {
      yP -= 10;
    }
    if (keyIsDown(DOWN_ARROW)) {
      yP += 10;
    }
    
    image(personagem, xP, yP, 30, 30);
    
    circle(xR, yR, 20);
    circle(xR1, yR1, 20);
    circle(xR2, yR2, 20);
    
    // Colisão
    checkCollision(); // Chamada da função que verifica colisões
  } else if (tela == 2) {
    textSize(18);
    fill(250, 250, 250);
    text("As sequências textuais são classificadas de \nacordo com sua estrutura, objetivo e finalidade. \nSão classificadas em: dialogal(piada,debate,\nconversa informal), narrativa(conto,fábula), \ndescritiva(biografia), argumentativa\n(resenha, artigo), explicativa(contrato, atestado) \ne injuntiva(receita, manual de instrução).", 30, 50);
    fill(160, 82, 45);
    rect(285, 250, 80, 25, 15);
    textSize(20);
    fill(250, 250, 250);
    text("Voltar", 302, 267);
  } else if (tela == 3) {
    fill(250, 250, 250);
    textSize(18);
    text("De início vá até a opção Lembre-se e veja os tipos \ntextuais que existem, após isso irá em jogar \nde início terá 5 perguntas com características \npara que possas responder a qual tipo textual aquela \ncaracterística pertence, após isso as demais fases \nse dará com pequenos textos para que possas inter-\npretar e dizer o seu tipo ou gênero textual, ao final \nterás uma pontuação. Para responder corretamente, \nleve o Dino até a resposta correta", 20, 60);
    fill(160, 82, 45);
    rect(285, 250, 80, 25, 15);
    textSize(20);
    fill(250, 250, 250);
    text("Voltar", 302, 267);
  } else if (tela == 4) {
    fill(250, 250, 250);
    text("Vanessa M.", 60, 90);
    text("Programadora", 46, 110);
    text("Aquiles B.", 265, 90);
    text("Docente", 270, 110);
    fill(160, 82, 45);
    rect(285, 250, 80, 25, 15);
    textSize(20);
    fill(250, 250, 250);
    text("Voltar", 302, 267);

    image(img[1], 50, 120, 100, 100);
    image(img[2], 250, 120, 100, 100);
  } else if (tela == 6) {
    fill(250, 250, 250);
    text("Você errou \nMenos uma vida", 65, 100);
    textSize(100);
    fill(160, 82, 45);
    rect(285, 250, 80, 25, 15);
    textSize(20);
    fill(250, 250, 250);
    text("Continue", 293, 267);
  }
  text(mouseX + " " + mouseY, 20, 20);
}

function mouseClicked() {
  if (tela == 0) {
    if (mouseX > 150 && mouseX < 250 && mouseY > 90 && mouseY < 120) {
      console.log("clicou no jogar");
      tela = 1;
      pontos = 0; // Zera a pontuação ao clicar em "Jogar"
      nivel = 1;  // Reinicia o nível ao clicar em "Jogar"
      vidas = 5;  // Reinicia as vidas ao clicar em "Jogar"
      xP = 250;   // Reinicia a posição do personagem ao clicar em "Jogar"
      yP = 80;    // Reinicia a posição do personagem ao clicar em "Jogar"
    } else if (mouseX > 150 && mouseX < 250 && mouseY > 130 && mouseY < 160) {
      console.log("clicou no lembre-se");
      tela = 2;
    } else if (mouseX > 150 && mouseX < 250 && mouseY > 170 && mouseY < 200) {
      console.log("clicou nas instruções");
      tela = 3;
    } else if (mouseX > 150 && mouseX < 250 && mouseY > 210 && mouseY < 240) {
      console.log("clicou nas instruções");
      tela = 4;
    }
  }
  
  if (tela == 1 || tela == 2 || tela == 3 || tela == 4) {
    if (mouseX > 285 && mouseX < 365 && mouseY > 250 && mouseY < 275) {
      console.log("clicou no voltar");
      tela = 0;
    }
  } else if (tela == 6) {
    if (mouseX > 285 && mouseX < 365 && mouseY > 250 && mouseY < 275) {
      console.log("clicou em continue");
      tela = 1;
      xP = 250; // Reinicia a posição do personagem ao clicar em "Continue"
      yP = 80;  // Reinicia a posição do personagem ao clicar em "Continue"
    }
  }
}

function checkCollision() {
  let alternativas = [
    {x: xR, y: yR, resposta: respostas[nivel - 1][0]},
    {x: xR1, y: yR1, resposta: respostas[nivel - 1][1]},
    {x: xR2, y: yR2, resposta: respostas[nivel - 1][2]}
  ];

  for (let alternativa of alternativas) {
    if (dist(xP, yP, alternativa.x, alternativa.y) < r + rP) {
      if ((alternativa.resposta == "Descritiva" && nivel == 1) ||
          (alternativa.resposta == "Narrativa" && nivel == 2) ||
          (alternativa.resposta == "Explicativa" && nivel == 3)) {
        pontos += 100;
        nivel++;
        if (nivel > 3) {
          nivel = 1;
          tela = 0;
        }
      } else {
        vidas--; // Decrementa uma vida se a resposta estiver errada
        if (vidas <= 0) {
          tela = 6; // Se as vidas acabarem, vai para a tela de fim de jogo
          nivel = 1; // Reinicia o nível
          vidas = 5; // Reinicia as vidas
        } else {
          tela = 6;
        }
      }
      xP = 250; // Reinicia a posição do personagem após colisão
      yP = 80;  // Reinicia a posição do personagem após colisão
    }
  }
}
