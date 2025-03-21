let personagens = [];
let indice = 0;

function iniciarJogo() {
  const qtd = parseInt(document.getElementById('inputPessoas').value);
  if (qtd < 5) {
    alert('O número mínimo de jogadores é 5.');
    return;
  }

  personagens = gerarPersonagens(qtd);
  indice = 0;
  document.querySelector('.setup-screen').style.display = 'none';
  document.getElementById('telaJogo').style.display = 'block';
  document.getElementById('resultado').innerText = '';
  document.getElementById('reiniciarBtn').style.display = 'none';
  resetarCard();
  console.log('Ordem sorteada:', personagens);
}

function gerarPersonagens(qtd) {
  let lista = ['Assassino', 'Médico', 'Delegado'];
  for (let i = 0; i < qtd - 3; i++) {
    lista.push('Vítima');
  }
  return embaralhar(lista);
}

function embaralhar(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function revelarPersonagem() {
  if (indice < personagens.length) {
    const card = document.querySelector('.card');
    const cardBack = document.querySelector('.card-back');
    const resultado = document.getElementById('resultado');
    
    if (!card.classList.contains('flipped')) {
      resultado.innerText = personagens[indice];
      cardBack.className = 'card-back ' + personagens[indice];
      card.classList.add('flipped');
      document.getElementById('fecharBtn').style.display = 'inline-block';
    }
  }
}

function fecharRevelacao() {
  indice++;
  if (indice < personagens.length) {
    resetarCard();
  } else {
    finalizarJogo();
  }
}

function resetarCard() {
  const card = document.querySelector('.card');
  card.classList.remove('flipped');
  document.getElementById('fecharBtn').style.display = 'none';
}

function finalizarJogo() {
  document.querySelector('.card').style.display = 'none';
  document.getElementById('fecharBtn').style.display = 'none';
  document.getElementById('resultado').innerText = 'Jogo Finalizado!';
  document.getElementById('reiniciarBtn').style.display = 'inline-block';
}

function reiniciar() {
  document.querySelector('.setup-screen').style.display = 'block';
  document.getElementById('telaJogo').style.display = 'none';
  document.querySelector('.card').style.display = 'block';
  resetarCard();
}