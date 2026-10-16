/* Fase 8 — 16:30 · Antes de postar (uso seguro de redes sociais: viagem, telefone, horário, cartão, chat da turma) */
M.registrar({
  ordem: 8, id: 'post', hora: '16:30', titulo: 'Before you post', tema: 'Social media', icone: 'camera', max: 60,
  missao: 'After school, your friend Bia wants to post a photo before the half-term trip and asks you to check it first. <strong>Find the 6 things</strong> in the text and the photo that give too much away.',
  como: [
    ['clique', 'Click the parts of the <b>text</b> (underlined) and the objects in the <b>photo</b> that should not go online.'],
    ['alerta', 'Clicking something that is fine costs <b>2 points</b>.'],
    ['enviar', 'When you are done, click "Checked: post it".']
  ],
  licoes: [
    'Posting where you will be and when (trips, timetables, the bus home) tells strangers where to find you, and when your home is empty.',
    'Phone numbers, ID cards and screens with other people\'s details never go in a public post.',
    'Your friends\' information is theirs: do not post a group chat or photo without their OK.',
    'Before you post, ask: "Could someone I don\'t know use this to find me or pretend to be me?"'
  ],
  conquista: { id: 'perfil', nome: 'Private profile', desc: 'Found all 6 things in the post without a mistake', icone: 'camera' },

  iniciar(api) {
    const alvo = (id, txt) => '<span data-alvo="' + id + '" tabindex="0" role="button">' + txt + '</span>';
    api.raiz.innerHTML =
      '<div class="post"><div class="cab"><span class="av">BM</span><div><b>Bia M.</b><small>Share with: Everyone</small></div><span class="x">New post</span></div>' +
      '<div class="legenda">Last day before half-term! ' + alvo('viagem', 'Tomorrow we fly to Buenos Aires for the whole week') + '. ' +
      alvo('telefone', 'New phone, text me: (11) 90000-1234') + '. ' +
      alvo('agradece', 'Best first term ever!') + ' ' + alvo('hashtag', '#halfterm') + '</div>' +
      '<div class="foto">' + ARTE.fotoPost() + '</div>' +
      '<div class="rodape-post"><span class="sp">' + ARTE.ico('globo').replace('<svg ', '<svg width="16" height="16" style="vertical-align:-3px" ') + ' Anyone can see this</span><span class="btn peq" style="pointer-events:none;opacity:.5">Post</span></div></div>' +
      '<aside class="painel"></aside>';
    const post = api.raiz.querySelector('.post');
    const svg = post.querySelector('.foto svg');

    const RISCOS = [
      { id: 'viagem', titulo: 'Trip dates and destination', dica: 'Tells everyone the family will be away all week, and that the house will be empty.' },
      { id: 'telefone', titulo: 'Phone number', dica: 'Anyone who sees the post can now message or call her. Share your number in person.' },
      { id: 'cracha', titulo: 'Student ID card', dica: 'Full name, photo and school: enough to find her or to pretend to be her.', cx: 437, cy: 340, r: 52 },
      { id: 'tela', titulo: 'Group chat on the screen', dica: 'Classmates\' names and numbers are their information, not hers to share.', cx: 672, cy: 164, r: 106 },
      { id: 'quadro', titulo: 'Weekly timetable', dica: 'Where she will be, and when, every week. Keep routines off public posts.', cx: 159, cy: 126, r: 118 },
      { id: 'embarque', titulo: 'Boarding pass', dica: 'The code on it can open the booking, and it confirms when the family is away.', cx: 668, cy: 258, r: 84 }
    ];
    M.caca(api, {
      cena: post, painel: api.raiz.querySelector('.painel'), aneis: svg.querySelector('#aneis'),
      tituloPainel: 'Things to remove', instrucao: 'Look in the <b>text</b> and in the <b>photo</b>: the underlined parts can be clicked too.', botaoFim: 'Checked: post it',
      riscos: RISCOS,
      iscas: {
        agradece: 'Being happy about the term gives nothing away.',
        hashtag: 'A general hashtag: no risk.',
        janela: 'The view from the window does not show where she lives.',
        planta: 'The plant can be in the photo.',
        cafe: 'The juice tells no secrets.'
      },
      dicaOnde: (r, a) => a instanceof SVGElement ? 'Hint: there is still something in the photo. Look at what is glowing.' : 'Hint: there is still something in the <b>text</b> of the post.',
      antesDoFeedback: async () => {
        const pub = post.querySelector('.rodape-post .btn');
        pub.style.opacity = '1'; pub.textContent = 'Checked';
      },
      textoTodos: { titulo: 'Safe post!', texto: 'You found all 6. Bia can still celebrate, without giving away the trip, her number, her timetable or her ID.' },
      textoParcial: 'The ones you missed are marked in yellow in the text and the photo, with the same number as the list. For a stranger, every detail is a piece of the puzzle.'
    }).then(r => api.fim({ perfeito: r.iscas === 0 }));
  }
});
