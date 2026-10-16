/* Fase 5 — 13:15 · IA: pode ou não pode? (IA na escola: privacidade, honestidade, deepfakes e checagem) */
(function () {
  'use strict';
  const ico = (n) => ARTE.ico(n);

  const CARTAS = [
    { tag: 'Explain', ic: 'robo', t: 'Ask an AI to explain photosynthesis more simply, then check it in your textbook', pode: true,
      ex: 'Using AI to understand, then checking the source: a good use.' },
    { tag: 'Privacy', ic: 'usuario', t: 'Paste a classmate\'s full name, photo and address into an AI to write a funny story', pode: false,
      ex: 'That is someone else\'s personal information. What you paste into an AI can be stored and seen by others.' },
    { tag: 'New app', ic: 'email', t: 'Sign up to a new AI app with your school email because an ad promised free coins', pode: false,
      ex: 'Ads that promise prizes are a common trap. Ask an adult before signing up to anything new.' },
    { tag: 'Ideas', ic: 'lampada', t: 'Ask AI for poster ideas when your teacher says AI is allowed, then make your own', pode: true,
      ex: 'Allowed by the teacher, and the final work is yours: fine.' },
    { tag: 'Homework', ic: 'nota', t: 'Hand in an essay the AI wrote for you as if it were your own work', pode: false,
      ex: 'Handing in someone else\'s work as yours is cheating, and that includes work by an AI. Follow your teacher\'s rules on AI.' },
    { tag: 'Images', ic: 'camera', t: 'Make an AI picture of a classmate doing something embarrassing and share it in the group chat', pode: false,
      ex: 'A fake image of a real person is bullying, even "as a joke", and it can be against the law. Never make or share one.' },
    { tag: 'Checking', ic: 'lupa', t: 'Check a fact the AI gave you in a reliable source before using it in a project', pode: true,
      ex: 'Exactly: AI can be wrong while sounding very sure.' },
    { tag: 'Secrets', ic: 'chave', t: 'Tell a friendly chatbot your password so it can "remember it for you"', pode: false,
      ex: 'Never give a password to a chatbot, however friendly it seems.' }
  ];

  M.registrar({
    ordem: 5, id: 'ia', hora: '13:15', titulo: 'AI: OK or not OK?', tema: 'Using AI safely', icone: 'robo', max: 80,
    missao: 'After lunch, your group wants to use AI for a project. <strong>Decide quickly</strong> what is OK and what is not.',
    como: [
      ['arrastar', 'Drag the card <b>right</b> (OK) or <b>left</b> (not OK).'],
      ['teclado', 'Or use the <b>←</b> and <b>→</b> arrow keys, or the buttons.'],
      ['lampada', 'The explanation appears below while you decide the next one.']
    ],
    licoes: [
      '<b>OK</b>: using AI to understand or get ideas, when your teacher allows it, and always checking what it says.',
      '<b>Not OK</b>: pasting anyone\'s personal information or passwords, handing in AI work as yours, or making fake images of real people.',
      '<b>If in doubt</b>: ask your teacher before using AI for schoolwork. And check: AI is often wrong while sounding sure.'
    ],
    conquista: { id: 'iaconsciente', nome: 'AI aware', desc: 'Got all 8 AI cards right', icone: 'robo' },

    iniciar(api) {
      let i = 0, ocupado = false;
      api.raiz.innerHTML =
        '<div class="f5"><div class="zona nao">' + ico('bloqueio') + 'NOT OK<small>drag here</small></div>' +
        '<div class="zona sim">' + ico('check') + 'OK<small>drag here</small></div>' +
        '<div class="baralho"></div>' +
        '<div class="botoes-ia"><button class="btn-redondo nao" type="button" aria-label="Not OK">' + ico('x') + '</button><button class="btn-redondo sim" type="button" aria-label="OK">' + ico('check') + '</button></div>' +
        '<div class="dica-teclas"><kbd>←</kbd> not OK · OK <kbd>→</kbd></div>' +
        '<div class="explica-ia"></div></div>';
      const baralho = api.raiz.querySelector('.baralho');
      const zNao = api.raiz.querySelector('.zona.nao'), zSim = api.raiz.querySelector('.zona.sim');
      const explica = api.raiz.querySelector('.explica-ia');

      function montar() {
        baralho.innerHTML = '';
        for (let k = Math.min(CARTAS.length - 1, i + 1); k >= i; k--) {
          const c = CARTAS[k];
          const d = document.createElement('div');
          d.className = 'cartao-ia' + (k > i ? ' atras' : '');
          d.innerHTML = '<span class="tag">' + c.tag + '</span><span class="n">' + (k + 1) + ' / ' + CARTAS.length + '</span><div class="ic">' + ico(c.ic) + '</div><div class="t">' + c.t + '</div>' +
            '<div class="carimbo sim">OK</div><div class="carimbo nao">NOT OK</div>';
          baralho.appendChild(d);
          if (k === i) preparar(d);
        }
      }
      function preparar(d) {
        const sim = d.querySelector('.carimbo.sim'), nao = d.querySelector('.carimbo.nao');
        api.arrastavel(d, {
          pode: () => !ocupado,
          inicio: () => d.classList.add('arrastando'),
          mover: dx => {
            d.style.transform = 'translateX(' + dx + 'px) rotate(' + (dx / 18) + 'deg)';
            sim.style.opacity = Math.max(0, Math.min(1, dx / 120));
            nao.style.opacity = Math.max(0, Math.min(1, -dx / 120));
            zSim.classList.toggle('quente', dx > 110); zNao.classList.toggle('quente', dx < -110);
          },
          soltar: (dx, dy, p, moveu) => {
            d.classList.remove('arrastando');
            zSim.classList.remove('quente'); zNao.classList.remove('quente');
            if (moveu && Math.abs(dx) > 120) decidir(dx > 0, dx);
            else { d.style.transform = ''; sim.style.opacity = 0; nao.style.opacity = 0; }
          }
        });
      }

      async function decidir(pode, dx) {
        if (ocupado || i >= CARTAS.length) return;
        ocupado = true;
        const c = CARTAS[i];
        const d = baralho.querySelector('.cartao-ia:last-child');
        d.querySelector('.carimbo.' + (pode ? 'sim' : 'nao')).style.opacity = 1;
        d.style.transition = 'transform .45s cubic-bezier(.4,0,.6,1), opacity .45s';
        d.style.transform = 'translateX(' + (pode ? 900 : -900) + 'px) rotate(' + (pode ? 30 : -30) + 'deg)';
        d.style.opacity = '0';
        const ok = pode === c.pode;
        const btn = api.raiz.querySelector('.btn-redondo.' + (pode ? 'sim' : 'nao'));
        if (ok) api.acerto(10, btn); else api.erro(btn);
        api.registrar('item' + (i + 1), pode ? 'pode' : 'nao_pode', ok, c.t);
        explica.className = 'explica-ia on ' + (ok ? 'ok' : 'no');
        explica.innerHTML = '<span class="selo">' + ico(ok ? 'check' : 'x') + '</span><span><b>' + (ok ? 'Right' : 'Not quite') + ': ' + (c.pode ? 'OK' : 'not OK') + '.</b> ' + c.ex + '</span>';
        i++;
        await api.espera(380);
        if (i >= CARTAS.length) {
          await api.espera(1800);
          const certas = Math.round(api.st.p / 10);
          await api.feedback({
            tipo: certas === CARTAS.length ? 'ok' : 'info',
            titulo: certas === CARTAS.length ? 'AI on your side!' : certas + ' of ' + CARTAS.length + ' right',
            texto: '<p>A simple rule: what you type into an AI is like posting it to a stranger. Keep personal information out, follow your teacher\'s rules, and always check the answer.</p>',
            botao: 'See your result'
          });
          return api.fim();
        }
        montar();
        ocupado = false;
      }

      api.raiz.querySelector('.btn-redondo.sim').addEventListener('click', () => decidir(true));
      api.raiz.querySelector('.btn-redondo.nao').addEventListener('click', () => decidir(false));
      api.teclas(e => { if (e.key === 'ArrowRight') decidir(true); if (e.key === 'ArrowLeft') decidir(false); });
      montar();
    }
  });
})();
