/* Fase 4 — 11:30 · O que compartilhar e com quem (três níveis: todos, pessoas de confiança, nunca) */
(function () {
  'use strict';
  const ico = (n) => ARTE.ico(n);

  const NIVEIS = {
    pub: { nome: 'Anyone', icone: 'megafone', def: 'Fine for anyone to see, even people you will never meet.' },
    int: { nome: 'People I trust', icone: 'casa', def: 'Only family and friends you know in real life, never a public post.' },
    conf: { nome: 'Never share', icone: 'cadeado', def: 'Not online, not even with your best friend.' }
  };
  const CARTAS = [
    { t: 'Your school account password', n: 'conf', ic: 'chave', ex: 'A password shared is a password lost. Not even best friends need it.' },
    { t: 'Your favourite football team', n: 'pub', ic: 'estrela', ex: 'A harmless fact about you: fine to share.' },
    { t: 'Your home address', n: 'int', ic: 'casa', ex: 'Family and close friends can know it. Never in a public post or profile.' },
    { t: 'A drawing you made for Art (no name or face)', n: 'pub', ic: 'camera', ex: 'Your work, with nothing that identifies you: fine to share.' },
    { t: 'The 6-digit code sent to your phone', n: 'conf', ic: 'celular', ex: 'Codes unlock your accounts. Whoever asks for one is trying to get in.' },
    { t: 'Your phone number', n: 'int', ic: 'telefone', ex: 'Give it to people you know in real life, not to followers or strangers in a game.' },
    { t: 'Your live location', n: 'int', ic: 'globo', ex: 'Share it only with family. Switch it off for everyone else.' },
    { t: 'Your parents\' bank card numbers', n: 'conf', ic: 'dinheiro', ex: 'Never type or send these. Ask an adult to make any payment.' },
    { t: 'Photos from a sleepover', n: 'int', ic: 'pessoas', ex: 'Only with the people who were there, and only if everyone in the photo says yes.' }
  ];

  M.registrar({
    ordem: 4, id: 'classificar', hora: '11:30', titulo: 'Who can see it?', tema: 'Personal information', icone: 'pasta', max: 90,
    missao: 'In PSHE, your class is making a poster about privacy. <strong>Sort each piece of information</strong>: Anyone, People I trust or Never share.',
    como: [
      ['arrastar', 'Drag the card to the right box.'],
      ['teclado', 'Or click the box, or press <b>1</b>, <b>2</b> or <b>3</b>.'],
      ['lampada', 'The explanation for each card appears just below it.']
    ],
    licoes: [
      '<b>Anyone</b>: things that cannot be used to find you or get into your accounts, like your favourite team or your artwork.',
      '<b>People I trust</b>: your address, phone number, location and private photos, only with family and friends you know in real life.',
      '<b>Never share</b>: passwords, codes and bank details. If in doubt, choose the safer box and ask an adult.'
    ],
    conquista: { id: 'guardiao', nome: 'Privacy keeper', desc: 'Sorted all 9 cards without a mistake', icone: 'pasta' },

    iniciar(api) {
      let i = 0, ocupado = false;
      api.raiz.innerHTML =
        '<div class="f4"><div class="topo"><h3>Who can see each one?</h3><p>Drag, click a box or press 1, 2 or 3.</p></div>' +
        '<div class="pilha"></div><div class="explica"></div>' +
        '<div class="caixas">' + ['pub', 'int', 'conf'].map((k, n) =>
          '<div class="caixa ' + k + '" data-n="' + k + '" role="button" tabindex="0" aria-label="' + NIVEIS[k].nome + '"><div class="cab-cx"><i>' + ico(NIVEIS[k].icone) + '</i><h4>' + NIVEIS[k].nome + '</h4><span class="k">' + (n + 1) + '</span></div>' +
          '<div class="def">' + NIVEIS[k].def + '</div><div class="dentro"></div></div>').join('') + '</div></div>';
      const pilha = api.raiz.querySelector('.pilha');
      const explica = api.raiz.querySelector('.explica');
      const caixas = Array.from(api.raiz.querySelectorAll('.caixa'));

      function montarPilha() {
        pilha.innerHTML = '';
        for (let k = Math.min(CARTAS.length - 1, i + 2); k >= i; k--) {
          const c = CARTAS[k];
          const d = document.createElement('div');
          d.className = 'carta' + (k === i + 1 ? ' atras' : k === i + 2 ? ' atras2' : '');
          d.innerHTML = '<span class="n">' + (k + 1) + ' / ' + CARTAS.length + '</span><div class="ic">' + ico(c.ic) + '</div><div class="t">' + c.t + '</div>';
          pilha.appendChild(d);
          if (k === i) prepararTopo(d);
        }
      }
      function caixaSob(p) {
        return caixas.find(cx => { const r = cx.getBoundingClientRect(), a = api.ponto(r.left, r.top), b = api.ponto(r.right, r.bottom); return p.x >= a.x && p.x <= b.x && p.y >= a.y && p.y <= b.y; });
      }
      function prepararTopo(d) {
        api.arrastavel(d, {
          pode: () => !ocupado,
          inicio: () => d.classList.add('arrastando'),
          mover: (dx, dy, p) => {
            d.style.transform = 'translate(' + dx + 'px,' + dy + 'px) rotate(' + (dx * 0.03) + 'deg)';
            const alvo = caixaSob(p);
            caixas.forEach(cx => cx.classList.toggle('alvo', cx === alvo));
          },
          soltar: (dx, dy, p, moveu) => {
            d.classList.remove('arrastando');
            caixas.forEach(cx => cx.classList.remove('alvo'));
            const alvo = moveu ? caixaSob(p) : null;
            if (alvo) decidir(alvo.dataset.n, d, { dx, dy });
            else d.style.transform = '';
          }
        });
      }
      function voarPara(d, cx, de) {
        const rc = d.getBoundingClientRect(), rb = cx.getBoundingClientRect();
        const a = api.ponto(rc.left + rc.width / 2, rc.top + rc.height / 2), b = api.ponto(rb.left + rb.width / 2, rb.top + rb.height / 2);
        const bx = (de ? de.dx : 0) + (b.x - a.x), by = (de ? de.dy : 0) + (b.y - a.y);
        d.style.transition = 'transform .45s cubic-bezier(.5,0,.3,1), opacity .45s';
        d.style.transform = 'translate(' + bx + 'px,' + by + 'px) scale(.25)';
        d.style.opacity = '0';
      }
      function chip(cx, txt) {
        const s = document.createElement('span');
        s.textContent = txt;
        cx.querySelector('.dentro').appendChild(s);
      }

      async function decidir(n, d, de) {
        if (ocupado || i >= CARTAS.length) return;
        ocupado = true;
        d = d || pilha.querySelector('.carta:last-child');
        const c = CARTAS[i];
        const cx = caixas.find(x => x.dataset.n === n), certa = caixas.find(x => x.dataset.n === c.n);
        const ok = n === c.n;
        api.registrar('item' + (i + 1), NIVEIS[n].nome, ok, c.t);
        explica.className = 'explica on ' + (ok ? 'ok' : 'no');
        explica.innerHTML = '<b>' + c.t + ' → ' + NIVEIS[c.n].nome + '.</b> ' + c.ex;
        if (ok) {
          api.acerto(10, cx);
          cx.classList.add('certa'); setTimeout(() => cx.classList.remove('certa'), 600);
          voarPara(d, cx, de);
          await api.espera(430);
        } else {
          api.erro(cx);
          cx.classList.add('errada'); setTimeout(() => cx.classList.remove('errada'), 450);
          d.style.transform = de ? 'translate(' + de.dx + 'px,' + de.dy + 'px)' : '';
          await api.espera(500);
          certa.classList.add('alvo');
          voarPara(d, certa, de);
          await api.espera(700);
          certa.classList.remove('alvo');
        }
        chip(certa, c.t.length > 28 ? c.t.slice(0, 26) + '…' : c.t);
        i++;
        if (i >= CARTAS.length) {
          await api.espera(900);
          const certas = Math.round(api.st.p / 10);
          await api.feedback({
            tipo: certas === CARTAS.length ? 'ok' : 'info',
            titulo: certas === CARTAS.length ? 'All in the right place!' : certas + ' of ' + CARTAS.length + ' in the right place',
            texto: '<p>Before you post or send anything, ask: who could see this, and what could they do with it? If you are not sure, choose the safer box and ask a trusted adult.</p>',
            botao: 'See your result'
          });
          return api.fim();
        }
        montarPilha();
        ocupado = false;
      }

      caixas.forEach(cx => {
        cx.addEventListener('click', () => decidir(cx.dataset.n));
        cx.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); decidir(cx.dataset.n); } });
      });
      api.teclas(e => { const m = { 1: 'pub', 2: 'int', 3: 'conf' }[e.key]; if (m) decidir(m); });
      montarPilha();
    }
  });
})();
