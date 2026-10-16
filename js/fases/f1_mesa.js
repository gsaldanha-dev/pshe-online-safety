/* Fase 1 — 08:05 · Riscos na biblioteca (cuidados do dia a dia: tela, senha, papéis, celular, pendrive e cartão) */
M.registrar({
  ordem: 1, id: 'mesa', hora: '08:05', titulo: 'Risks in the library', tema: 'Everyday habits', icone: 'monitor', max: 60,
  missao: 'You arrive early and pass a classmate\'s desk. They have gone to get a book. <strong>Find the 6 risks</strong> on show before someone else does.',
  como: [
    ['clique', 'Click the things in the scene that put someone\'s information at risk.'],
    ['alerta', 'Careful: clicking something that is not a risk costs <b>2 points</b>.'],
    ['lampada', 'Stuck? After a few seconds, a hint lights up.']
  ],
  licoes: [
    'Leaving your laptop? Lock the screen first: <b>Windows + L</b>, <b>Ctrl + Cmd + Q</b> on a Mac, or <b>Search + L</b> on a Chromebook.',
    'Passwords never go on sticky notes. Learn a long passphrase, or ask a parent to help you use a password manager.',
    'Forms with your address or phone number come out of the printer straight away, and your phone stays locked and with you.',
    'Never plug in a USB stick you found. Hand it to a teacher. And keep your student ID card with you.'
  ],
  conquista: { id: 'lince', nome: 'Eagle eye', desc: 'Found all 6 risks without a mistake', icone: 'olho' },

  iniciar(api) {
    api.raiz.innerHTML = '<div class="f1-cena">' + ARTE.mesa() + '<div class="dica-flutuante">' + ARTE.ico('lupa') +
      'Move the mouse over the scene: everything you can click gets an outline.</div></div><aside class="painel"></aside>';
    const cena = api.raiz.querySelector('.f1-cena');
    setTimeout(() => { const d = cena.querySelector('.dica-flutuante'); if (d) { d.style.transition = 'opacity .5s'; d.style.opacity = '0'; } }, 6000);
    M.caca(api, {
      cena, painel: api.raiz.querySelector('.painel'), aneis: cena.querySelector('#aneis'),
      tituloPainel: 'Risks', instrucao: 'Each risk you find appears here with the right habit.', botaoFim: 'I have checked the desk',
      riscos: [
        { id: 'tela', titulo: 'Laptop left signed in', dica: 'Anyone passing can read their school email or send messages as them. Lock the screen before you walk away.', cx: 472, cy: 262, r: 104 },
        { id: 'postit', titulo: 'Password on a sticky note', dica: 'A password on paper is a password for everyone. Learn it, or keep it somewhere only you can open.', cx: 607, cy: 190, r: 44 },
        { id: 'impressora', titulo: 'Form left in the printer', dica: 'A trip form has a home address and a parent\'s phone number. Collect what you print straight away.', cx: 122, cy: 238, r: 86 },
        { id: 'celular', titulo: 'Phone unlocked on the desk', dica: 'An unlocked phone opens chats, photos and accounts. Use a screen lock and keep it with you.', cx: 302, cy: 414, r: 62 },
        { id: 'pendrive', titulo: '"Free games" USB stick', dica: 'A USB stick you did not expect can carry a virus. Do not plug it in: hand it to a teacher.', cx: 643, cy: 411, r: 50 },
        { id: 'cracha', titulo: 'Student ID left behind', dica: 'Your ID card shows your name, photo and school. Keep it with you, and tell the office if you lose it.', cx: 735, cy: 410, r: 46 }
      ],
      iscas: {
        relogio: 'The clock only says there is still time to tidy the desk.',
        quadro: 'The lunch menu is already public on the portal. No risk.',
        planta: 'The plant keeps no secrets.',
        foto: 'A family photo in a frame does not give away any account.',
        garrafa: 'The water bottle is only a risk to the keyboard.'
      },
      textoTodos: { titulo: 'Safe desk!', texto: 'You found all 6 risks. Where there is personal information, every detail on show is an open door.' },
      textoParcial: 'The ones you missed are marked in yellow in the scene, with the same number as the list. In real life, one is enough.'
    }).then(r => api.fim({ perfeito: r.iscas === 0 }));
  }
});
