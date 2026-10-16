/* Fase 5 — 13:15 · IA: pode ou não pode? (IA na escola: privacidade, honestidade, deepfakes e checagem) */
(function () {
  'use strict';
  const ico = (n) => ARTE.ico(n);

  const CARTAS = [
    { tag: 'Checking', ic: 'nota', t: 'Ask AI to point out grammar mistakes in your own essay, when your teacher allows it, and say you used it', pode: true,
      ex: 'Your work, your teacher\'s rules, and you are honest about it: fine.' },
    { tag: 'Photos', ic: 'pessoas', t: 'Upload a photo of your whole class to an AI app that "makes everyone look older"', pode: false,
      ex: 'Your classmates did not agree to their faces going into an app, and the app may keep the photos.' },
    { tag: 'Games', ic: 'gamepad', t: 'A friendly AI character in a game asks your age and school "to make the game better for you"', pode: false,
      ex: 'Personal details do not become safe because a chatbot asks nicely. Skip the question.' },
    { tag: 'Help', ic: 'reportar', t: 'Ask AI how to report a fake account that is pretending to be you', pode: true,
      ex: 'Using AI to find out how to get help is a good use. Then tell an adult too.' },
    { tag: 'Voices', ic: 'som', t: 'Use an AI voice of a teacher to send a "funny" audio message to the class', pode: false,
      ex: 'Copying a real person\'s voice is impersonation. It can hurt them and get you into serious trouble.' },
    { tag: 'Facts', ic: 'lupa', t: 'Use a statistic the AI gave you in your project because it sounded very precise', pode: false,
      ex: 'AI can invent numbers that sound exact. Check them in a reliable source before you use them.' },
    { tag: 'Ideas', ic: 'lampada', t: 'Ask AI for poster ideas when your teacher says AI is allowed, then make your own', pode: true,
      ex: 'Allowed by the teacher, and the final work is yours: fine.' },
    { tag: 'Feelings', ic: 'chat', t: 'Tell only an AI chatbot about something online that is really worrying you, and nobody else', pode: false,
      ex: 'A chatbot cannot keep you safe or act for you. Something worrying needs a trusted adult: family, your form tutor or the counsellor.' },
    { tag: 'Privacy', ic: 'usuario', t: 'Paste a friend\'s private messages into an AI to ask what they "really meant"', pode: false,
      ex: 'Those messages were written for you, not for an app. Ask your friend instead.' },
    { tag: 'Learning', ic: 'robo', t: 'Ask AI to quiz you on your History notes before a test', pode: true,
      ex: 'Using AI to practise what you learned is a smart way to revise.' }
  ];

  M.registrar({
    ordem: 5, id: 'ia', hora: '13:15', titulo: 'AI: OK or not OK?', tema: 'Using AI safely', icone: 'robo', max: 100,
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
    conquista: { id: 'iaconsciente', nome: 'AI aware', desc: 'Got all 10 AI cards right', icone: 'robo' },

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
