/* Fase 8 — 16:30 · Antes de postar, na tela de "novo post" no estilo Instagram.
   Sete riscos espalhados pela legenda, pela localização e pela foto, e sete coisas inofensivas que parecem risco
   (texto alternativo, ocultar curtidas, a janela...): quem clica em tudo perde pontos, então a fase testa o julgamento. */
M.registrar({
  ordem: 8, id: 'post', hora: '16:30', titulo: 'Before you post', tema: 'Social media', icone: 'camera', max: 70,
  missao: 'After school, your friend Bia is about to post a photo before the half-term trip and asks you to check it first. <strong>Find the 7 things</strong> in the caption, the settings and the photo that give too much away.',
  como: [
    ['clique', 'Click the parts of the <b>caption</b> and <b>settings</b> (underlined) and the objects in the <b>photo</b> that should not go online.'],
    ['alerta', 'Clicking something that is fine costs <b>3 points</b>. Not everything that looks technical is a risk.'],
    ['enviar', 'When you are done, click "Checked: share it".']
  ],
  licoes: [
    'Posting where you will be and when (trips, timetables, the bus home) tells strangers where to find you, and when your home is empty.',
    'A location tag on a post from home is your address. Phone numbers and ID cards never go in a public post either.',
    'Your friends\' information is theirs: do not post a group chat or photo without their OK.',
    'Before you share, ask: "Could someone I don\'t know use this to find me or pretend to be me?"'
  ],
  conquista: { id: 'perfil', nome: 'Private profile', desc: 'Found all 7 things in the post without a mistake', icone: 'camera' },

  iniciar(api) {
    const alvo = (id, txt) => '<span data-alvo="' + id + '" tabindex="0" role="button">' + txt + '</span>';
    const ico = n => ARTE.ico(n);
    api.raiz.innerHTML =
      '<div class="post ig"><div class="ig-topo"><span class="ig-volta">' + ico('seta') + '</span><b>Create new post</b><span class="ig-share">Share</span></div>' +
      '<div class="ig-corpo"><div class="foto">' + ARTE.fotoPost() + '</div>' +
      '<div class="ig-lado"><div class="ig-user"><span class="av">BM</span><b>bia.m_08</b></div>' +
      '<div class="legenda ig-legenda">Last day before half-term! ' + alvo('viagem', 'Off to Buenos Aires tomorrow for the whole week') + '. ' +
      alvo('telefone', 'New number, text me: (11) 90000-1234') + '. ' + alvo('agradece', 'Best first term ever!') + ' ' + alvo('hashtag', '#halfterm #grade8') + '</div>' +
      '<div class="ig-conta">142/2,200</div>' +
      '<div class="ig-campo legenda"><span>Add location</span>' + alvo('local', 'Rua das Acácias, 45 · Pinheiros') + '</div>' +
      '<div class="ig-campo legenda"><span>Accessibility</span>' + alvo('alt', 'Alt text: girl smiling in her bedroom') + '</div>' +
      '<div class="ig-campo legenda"><span>Advanced settings</span>' + alvo('curtidas', 'Hide like count: on') + '</div>' +
      '<div class="ig-campo"><span>Audience</span><span class="ig-aud">' + ico('globo') + ' Public account</span></div>' +
      '</div></div></div>' +
      '<aside class="painel"></aside>';
    const post = api.raiz.querySelector('.post');
    const svg = post.querySelector('.foto svg');

    const RISCOS = [
      { id: 'viagem', titulo: 'Trip dates and destination', dica: 'Tells everyone the family will be away all week, and that the house will be empty.' },
      { id: 'telefone', titulo: 'Phone number', dica: 'Anyone who sees the post can now message or call her. Share your number in person.' },
      { id: 'local', titulo: 'Home location tag', dica: 'A location tag on a photo taken at home is a home address, on a public post.' },
      { id: 'cracha', titulo: 'Student ID card', dica: 'Full name, photo and school: enough to find her or to pretend to be her.', cx: 437, cy: 340, r: 52 },
      { id: 'tela', titulo: 'Group chat on the screen', dica: 'Classmates\' names and numbers are their information, not hers to share.', cx: 672, cy: 164, r: 106 },
      { id: 'quadro', titulo: 'Weekly timetable', dica: 'Where she will be, and when, every week. Keep routines off public posts.', cx: 159, cy: 126, r: 118 },
      { id: 'embarque', titulo: 'Boarding pass', dica: 'The code on it can open the booking, and it confirms when the family is away.', cx: 668, cy: 258, r: 84 }
    ];
    M.caca(api, {
      cena: post, painel: api.raiz.querySelector('.painel'), aneis: svg.querySelector('#aneis'),
      tituloPainel: 'Things to remove', instrucao: 'Look in the <b>caption</b>, the <b>settings</b> and the <b>photo</b>: the underlined parts can be clicked too.', botaoFim: 'Checked: share it',
      riscos: RISCOS,
      iscas: {
        agradece: 'Being happy about the term gives nothing away.',
        hashtag: 'General hashtags: no risk. (#grade8 is fine; the name of the school with the trip dates would not be.)',
        alt: 'Alt text helps people who use screen readers. It describes the photo without personal details: fine.',
        curtidas: 'Hiding the like count changes nothing about privacy. It is fine either way.',
        janela: 'The view from the window does not show which building it is.',
        planta: 'The plant can be in the photo.',
        cafe: 'The juice tells no secrets.'
      },
      dicaOnde: (r, a) => a instanceof SVGElement ? 'Hint: there is still something in the photo.' : 'Hint: there is still something in the <b>caption</b> or the <b>settings</b>.',
      antesDoFeedback: async () => {
        const pub = post.querySelector('.ig-share');
        pub.textContent = 'Checked';
      },
      textoTodos: { titulo: 'Safe post!', texto: 'You found all 7. Bia can still celebrate, without giving away the trip, her address, her number, her timetable or her ID.' },
      textoParcial: 'The ones you missed are marked in yellow, with the same number as the list. For a stranger, every detail is a piece of the puzzle.'
    }).then(r => api.fim({ perfeito: r.iscas === 0 }));
  }
});
