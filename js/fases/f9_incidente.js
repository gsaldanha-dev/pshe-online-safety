/* Fase 9 — 17:30 · Algo deu errado (sinais de conta invadida + o que fazer + pedir ajuda a um adulto) */
(function () {
  'use strict';
  const ico = (n) => ARTE.ico(n);

  const SINAIS = [
    { t: 'Friends got messages from your account that you never sent.', s: true, ic: 'email' },
    { t: 'Your game updated itself, as the app said it would.', s: false, ic: 'gamepad' },
    { t: 'A sign-in code arrived by SMS, but you did not try to sign in.', s: true, ic: 'celular' },
    { t: 'Your password suddenly stopped working.', s: true, ic: 'chave' },
    { t: 'A reminder popped up for homework you put in your Tracker.', s: false, ic: 'calendario' },
    { t: 'An app you do not remember installing appeared on your phone.', s: true, ic: 'alerta' }
  ];
  const PASSOS = [
    { id: 'reportar', b: 'Tell a trusted adult', t: 'Family, your form tutor or the school counsellor. Today, not next week.', ic: 'pessoas', pos: 3 },
    { id: 'apagar', b: 'Delete everything', t: 'Delete the messages and the app so no one finds out.', ic: 'x', pos: 0 },
    { id: 'interromper', b: 'Stop', t: 'Do not reply, do not click anything else, and do not pay anything.', ic: 'pare', pos: 1 },
    { id: 'reunir', b: 'Keep the evidence', t: 'Take screenshots and note the time of what happened.', ic: 'camera', pos: 2 }
  ];

  M.registrar({
    ordem: 9, id: 'incidente', hora: '17:30', titulo: 'Something is wrong', tema: 'Getting help', icone: 'alerta', max: 45,
    missao: 'At home, a few strange things have happened today. <strong>Sort the warning signs from the normal stuff</strong>, then show you know what to do.',
    como: [
      ['clique', 'Tick the cards that are signs someone else may be in your account or device.'],
      ['arrastar', 'Then put the right steps in order: drag or click them.'],
      ['celular', 'Finally, ask a trusted adult for help.']
    ],
    licoes: [
      'Warning signs: messages you did not send, codes you did not ask for, a password that stops working, apps you did not install.',
      'The right order: <b>stop</b> (no replies, no clicks, no payments), <b>keep the evidence</b> (screenshots, times) and <b>tell a trusted adult</b>.',
      'You are never in trouble for asking for help. The sooner an adult knows, the easier it is to fix, and deleting everything makes it harder.'
    ],
    conquista: { id: 'resposta', nome: 'First responder', desc: 'Spotted every sign and got the steps in order', icone: 'raio' },

    iniciar(api) {
      const sel = new Set();
      api.raiz.innerHTML = '<div class="f9"><div class="topo"><h3>Which of these are warning signs?</h3><p>Tick every one that suggests someone else may be in your account or device.</p></div>' +
        '<div class="sinais">' + SINAIS.map((s, k) => '<button class="sinal" type="button" data-k="' + k + '" style="animation-delay:' + k * 0.06 + 's"><span class="chk">' + ico('check') + '</span>' +
          '<span class="ic">' + ico(s.ic) + '</span><span class="t">' + s.t + '</span><span class="res"></span></button>').join('') + '</div>' +
        '<button class="btn conferir" type="button">' + ico('lupa') + 'Check</button></div>';
      const f9 = api.raiz.querySelector('.f9');
      const cards = Array.from(f9.querySelectorAll('.sinal'));
      const btn = f9.querySelector('.conferir');
      cards.forEach(c => c.addEventListener('click', () => {
        const k = +c.dataset.k;
        api.som('clique');
        if (sel.has(k)) sel.delete(k); else sel.add(k);
        c.classList.toggle('sel', sel.has(k));
      }));
      btn.addEventListener('click', async () => {
        if (btn.dataset.feito) return;
        btn.dataset.feito = '1'; btn.disabled = true;
        for (let k = 0; k < SINAIS.length; k++) {
          const s = SINAIS[k], c = cards[k], ok = sel.has(k) === s.s;
          c.disabled = true;
          c.classList.add(ok ? 'res-ok' : 'res-no');
          c.querySelector('.res').textContent = (s.s ? 'Warning sign' : 'Normal') + (ok ? '' : sel.has(k) ? ': no need to tick this' : ': you missed this one');
          if (ok) api.acerto(5, c); else api.erro(c);
          api.registrar('sinal' + (k + 1), sel.has(k) ? 'marcou' : 'nao_marcou', ok, s.t);
          await api.espera(300);
        }
        btn.innerHTML = 'Continue' + ico('seta'); btn.disabled = false;
        btn.onclick = () => { btn.onclick = null; api.som('clique'); parte2(); };
        btn.focus();
      });

      function parte2() {
        const vagas = [null, null, null];
        api.raiz.innerHTML = '<div class="f9"><div class="topo"><h3>Something happened that you did not do. What now?</h3><p>Put the steps in order: drag or click them into 1, 2 and 3. One of them should not be done at all.</p></div>' +
          '<div class="ordem"><div><h4>Steps</h4><div class="lista-passos">' +
          PASSOS.map(p => '<div class="passo-card" data-id="' + p.id + '" tabindex="0" role="button"><span class="ic">' + ico(p.ic) + '</span><span><b>' + p.b + '</b>' + p.t + '</span></div>').join('') + '</div></div>' +
          '<div><h4>Your plan</h4>' + [1, 2, 3].map(n => '<div class="vaga" data-v="' + (n - 1) + '"><span class="num">' + n + '</span><span class="conteudo-vaga"><span class="vazio">Drop a step here</span></span></div>').join('') + '</div></div>' +
          '<button class="btn conferir" type="button" disabled>' + ico('check') + 'Check the order</button></div>';
        const f = api.raiz.querySelector('.f9');
        const vagasEl = Array.from(f.querySelectorAll('.vaga'));
        const conferir = f.querySelector('.conferir');
        let travado = false;

        function render() {
          vagasEl.forEach((v, k) => {
            const p = PASSOS.find(x => x.id === vagas[k]);
            v.classList.toggle('cheia', !!p);
            v.querySelector('.conteudo-vaga').innerHTML = p ? '<b>' + p.b + '</b>' + p.t : '<span class="vazio">Drop a step here</span>';
            const old = v.querySelector('.tirar'); if (old) old.remove();
            if (p && !travado) {
              const x = document.createElement('button');
              x.className = 'tirar'; x.type = 'button'; x.setAttribute('aria-label', 'Remove this step'); x.textContent = '×';
              x.addEventListener('click', () => { vagas[k] = null; api.som('clique'); render(); });
              v.appendChild(x);
            }
          });
          f.querySelectorAll('.passo-card').forEach(c => c.classList.toggle('usado', vagas.indexOf(c.dataset.id) >= 0));
          conferir.disabled = vagas.some(v => !v) || travado;
        }
        function encaixar(id, k) {
          if (travado) return;
          const ja = vagas.indexOf(id); if (ja >= 0) vagas[ja] = null;
          if (k === undefined || k < 0) k = vagas.indexOf(null);
          if (k < 0) return;
          vagas[k] = id;
          api.som('clique');
          render();
        }
        function vagaSob(p) {
          return vagasEl.findIndex(v => { const r = v.getBoundingClientRect(), a = api.ponto(r.left, r.top), b = api.ponto(r.right, r.bottom); return p.x >= a.x && p.x <= b.x && p.y >= a.y && p.y <= b.y; });
        }
        f.querySelectorAll('.passo-card').forEach(c => {
          api.arrastavel(c, {
            pode: () => !travado && !c.classList.contains('usado'),
            inicio: () => c.classList.add('arrastando'),
            mover: (dx, dy, p) => {
              c.style.transform = 'translate(' + dx + 'px,' + dy + 'px)';
              const k = vagaSob(p);
              vagasEl.forEach((v, n) => v.classList.toggle('alvo', n === k));
            },
            soltar: (dx, dy, p, moveu) => {
              c.classList.remove('arrastando'); c.style.transform = '';
              vagasEl.forEach(v => v.classList.remove('alvo'));
              if (!moveu) return encaixar(c.dataset.id);
              const k = vagaSob(p);
              if (k >= 0) encaixar(c.dataset.id, k);
            }
          });
          c.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); encaixar(c.dataset.id); } });
        });

        conferir.addEventListener('click', async () => {
          if (travado) return;
          travado = true; conferir.disabled = true;
          render();
          let todas = true;
          for (let k = 0; k < 3; k++) {
            const p = PASSOS.find(x => x.id === vagas[k]), ok = p.pos === k + 1;
            if (!ok) todas = false;
            vagasEl[k].classList.add(ok ? 'ok' : 'no');
            if (ok) api.acerto(5, vagasEl[k]); else api.erro(vagasEl[k]);
            api.registrar('ordem' + (k + 1), p.id, ok, 'Passo ' + (k + 1) + ' da resposta a incidente');
            await api.espera(350);
          }
          if (!todas) {
            await api.espera(500);
            ['interromper', 'reunir', 'reportar'].forEach((id, k) => { vagas[k] = id; });
            render();
            vagasEl.forEach(v => { v.classList.remove('no'); v.classList.add('ok'); });
            api.toast('The right order is: stop, keep the evidence, tell a trusted adult.', '', 'lampada');
          }
          await api.espera(todas ? 600 : 1800);
          parte3();
        });
        render();
      }

      async function parte3() {
        // a conta pode estar invadida: o pedido de ajuda vai para a família, num chat que o aluno já conhece
        api.raiz.innerHTML = '<div class="f9"><div class="topo"><h3>Time to ask for help</h3><p>Message someone you trust. Here it is your family\'s chat; tomorrow it could be your form tutor.</p></div>' +
          '<div class="cel-teams"><div class="ilha"></div><div class="tela-tm">' +
          '<div class="cab-tm"><span class="volta">‹</span><span class="av">FA</span><span><b>Family</b><small>Online</small></span></div>' +
          '<div class="msgs-tm"><div class="dia-tm">Today</div></div>' +
          '<div class="comp-tm"><div class="campo-tm"><span class="dig"></span><span class="cursor"></span></div>' +
          '<button class="env-tm" type="button" disabled aria-label="Send message">' + ico('enviar') + '</button></div></div></div></div>';
        const f = api.raiz.querySelector('.f9');
        const dig = f.querySelector('.dig'), b = f.querySelector('.env-tm'), msgs = f.querySelector('.msgs-tm');
        const TXT = 'Hi, can you help me? Around 17:30 my friends got messages from my account that I never sent, and a code arrived that I did not ask for. ' +
          'I have not replied or clicked anything, and I took screenshots. Can we sort it out together?';
        let i = 0;
        await api.espera(700);
        await new Promise(res => {
          const passo = () => {
            if (!api.st.ativo) return res();
            i += 3;
            dig.textContent = TXT.slice(0, i);
            if (i % 9 === 0) api.som('digita');
            if (i < TXT.length) setTimeout(passo, 16); else res();
          };
          passo();
        });
        b.disabled = false; b.classList.add('pronto'); b.focus();
        const bolha = (txt, quem) => {
          const d = document.createElement('div');
          d.className = 'bolha-tm ' + quem;
          d.innerHTML = (quem === 'ti' ? '<span class="q">Family</span>' : '') + txt + '<span class="h">17:36</span>';
          msgs.appendChild(d);
          msgs.scrollTop = msgs.scrollHeight;
        };
        b.addEventListener('click', async () => {
          b.disabled = true; b.classList.remove('pronto');
          api.som('whoosh');
          f.querySelector('.campo-tm').innerHTML = '<span class="ph">Type a message</span>';
          bolha(TXT, 'eu');
          await api.espera(700);
          const d = document.createElement('div');
          d.className = 'digitando-tm'; d.innerHTML = '<i></i><i></i><i></i>';
          msgs.appendChild(d); msgs.scrollTop = msgs.scrollHeight;
          await api.espera(1300);
          d.remove();
          api.som('notif');
          bolha('Thank you for telling me, you did the right thing. Don\'t delete anything. I\'m coming to help you change the password, and tomorrow we can let your form tutor know.', 'ti');
          await api.espera(1500);
          const p = api.st.p;
          await api.feedback({
            tipo: p >= 40 ? 'ok' : 'info', titulo: 'Help is on the way',
            texto: '<p>Telling an adult is not getting into trouble: it is how problems get fixed. If anything online ever worries you, talk to your <b>family</b>, your <b>form tutor</b> or the <b>school counsellor</b>.</p>',
            botao: 'See your result'
          });
          api.fim();
        }, { once: true });
      }
    }
  });
})();
