/* Fase 6 — 14:20 · Senhas e verificação em duas etapas (duelo de senhas + pedido de login que você não fez + falso suporte pedindo o número) */
(function () {
  'use strict';
  const ico = (n) => ARTE.ico(n);

  // cada rodada: duas opções, a forte é `certa`. f = força (0–100) para o medidor; frase = texto, não senha
  const RODADAS = [
    { a: { s: 'St.Nicholas#2026!', f: 24, v: 'Looks complex, but it is the school\'s name and the year: one of the first guesses.' },
      b: { s: 'fourteen quiet umbrellas', f: 90, v: '24 characters of random words: much harder to guess.' }, certa: 'b' },
    { a: { s: 'x7#Qp!', f: 20, v: 'Random, but only 6 characters: a computer can try every combination very fast.' },
      b: { s: 'pineapple sandwich at midnight', f: 95, v: '30 characters: length beats symbols.' }, certa: 'b' },
    { a: { s: 'ladder-mango-cloud-river', f: 90, v: 'Four unrelated words, nothing personal.' },
      b: { s: 'Tr0ub4dor&3', f: 30, v: 'A real word with letters swapped for numbers. Attackers try these swaps first.' }, certa: 'a' },
    { frase: true, a: { s: 'Change your password every week: Pass1, Pass2, Pass3...', f: 18, v: 'Once someone knows one, they can guess the next.' },
      b: { s: 'Keep one strong password per account and turn on 2-step verification', f: 95, v: 'Even if a password leaks, the second step keeps the account closed.' }, certa: 'b' }
  ];
  // a ordem das opções muda a cada vez: a resposta certa não pode ser sempre a última
  function embaralhar(a) { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; }
  const EXPLICA = [
    'Looking complicated is not the same as being strong. A name and a year are guessed first, symbols or not.',
    '<b>Length beats complexity.</b> Six random characters fall in seconds; a long phrase holds.',
    'Swapping letters for numbers (a → 4, o → 0) fools people, not computers. Use unrelated words instead.',
    '<b>2-step verification</b> is the best upgrade you can make: a stolen password alone is no longer enough.'
  ];

  M.registrar({
    ordem: 6, id: 'senhas', hora: '14:20', titulo: 'Passwords and 2-step', tema: 'Protecting your accounts', icone: 'chave', max: 60,
    missao: 'In ICT, it is time to choose a new password. In <strong>four duels</strong>, pick the safer option. Keep an eye on your phone: it might buzz at any moment.',
    como: [
      ['clique', 'Click the safer card in each duel.'],
      ['celular', 'If the phone buzzes, decide calmly using the panel next to it.'],
      ['lampada', 'The meter shows how strong each option is after you choose.']
    ],
    licoes: [
      'A long passphrase (14+ characters), nothing personal, and a different password for every account.',
      'A sign-in request you did not make means <b>someone already has your password</b>. Say no, tell an adult and change your password.',
      'Real support teams never ask for your code or the number on your screen. Hang up and get help from someone you know.'
    ],
    conquista: { id: 'cofre', nome: 'Strongbox', desc: 'Won the duels and kept your 2-step code safe', icone: 'cadeado' },

    iniciar(api) {
      let r = 0;
      const res = [];
      api.raiz.innerHTML = '<div class="f6"><div class="topo"><h3>Which is safer?</h3><p>Choose one of the cards.</p></div>' +
        '<div class="duelo"></div><div class="slot-exp"></div><div class="rodadas">' + RODADAS.map(() => '<i></i>').join('') + '</div></div>';
      const f6 = api.raiz.querySelector('.f6');
      const duelo = f6.querySelector('.duelo'), slot = f6.querySelector('.slot-exp');
      const barras = Array.from(f6.querySelectorAll('.rodadas i'));

      function cartao(o, lado, frase) {
        return '<button class="senha-card" data-l="' + lado + '" type="button" style="animation-delay:' + (lado === 'b' ? '.08s' : '0s') + '"><span class="lbl">' + (frase ? 'Option ' : 'Password ') + lado.toUpperCase() + '</span>' +
          '<span class="pw' + (frase ? ' frase' : '') + '">' + o.s + '</span><span class="medidor"><i></i></span><span class="veredito-pw"></span></button>';
      }
      function rodada() {
        const R = RODADAS[r];
        barras.forEach((b, k) => { b.className = k < r ? (res[k] ? 'ok' : 'no') : k === r ? 'at' : ''; });
        f6.querySelector('.topo h3').textContent = R.frase ? 'Which habit is safer?' : 'Which password is stronger?';
        f6.querySelector('.topo p').textContent = 'Duel ' + (r + 1) + ' of ' + RODADAS.length + ' · click a card or press A or B';
        duelo.innerHTML = cartao(R.a, 'a', R.frase) + '<div class="vs">VS</div>' + cartao(R.b, 'b', R.frase);
        slot.innerHTML = '';
        const cards = Array.from(duelo.querySelectorAll('.senha-card'));
        let feito = false;
        const escolher = l => {
          if (feito) return; feito = true;
          api.teclas(null);
          const ok = l === R.certa;
          res[r] = ok;
          api.registrar('duelo' + (r + 1), R[l].s, ok, 'Duelo de senhas ' + (r + 1));
          cards.forEach(c => {
            const o = R[c.dataset.l], forte = c.dataset.l === R.certa;
            c.disabled = true;
            c.classList.add('revela', forte ? 'forte' : 'fraca');
            const i = c.querySelector('.medidor i');
            i.style.background = o.f > 70 ? '#3e9b2f' : o.f > 40 ? '#e9a21b' : '#cf4a3c';
            setTimeout(() => { i.style.width = o.f + '%'; }, 30);
            c.querySelector('.veredito-pw').innerHTML = (forte ? '<b style="color:#2b7320">Safer.</b> ' : '<b style="color:#b0453a">Weaker.</b> ') + o.v;
          });
          const esc = cards.find(c => c.dataset.l === l);
          if (ok) api.acerto(10, esc); else api.erro(esc);
          barras[r].className = ok ? 'ok' : 'no';
          slot.innerHTML = '<div class="explica-pw' + (ok ? '' : ' no') + '"><span>' + EXPLICA[r] + '</span><button class="btn claro peq" type="button">' + (r < RODADAS.length - 1 ? 'Next duel' : 'Finish') + ico('seta') + '</button></div>';
          const b = slot.querySelector('button');
          setTimeout(() => b.focus(), 900);
          b.addEventListener('click', async () => {
            if (b.disabled) return;
            b.disabled = true;
            api.som('clique');
            if (r === 1) await celular();
            r++;
            if (r < RODADAS.length) rodada(); else concluir();
          });
        };
        cards.forEach(c => c.addEventListener('click', () => escolher(c.dataset.l)));
        api.teclas(e => { const k = e.key.toLowerCase(); if (k === 'a' || k === 'b') escolher(k); });
      }

      function painel(ctx, opsOrig, no) {
        const ops = embaralhar(opsOrig);
        return new Promise(resolve => {
          const p = document.createElement('div');
          p.className = 'opcoes-cel';
          p.innerHTML = '<div class="ctx">' + ctx + '</div><div class="opcoes">' + ops.map((o, k) => '<button class="opcao" type="button"><span class="tecla">' + (k + 1) + '</span><span>' + o.t + '</span></button>').join('') + '</div>';
          f6.appendChild(p);
          const bts = Array.from(p.querySelectorAll('button'));
          const escolher = async k => {
            const o = ops[k];
            bts.forEach(b => { b.disabled = true; });
            api.teclas(null);
            if (o.ok) api.acerto(o.pts, bts[k]); else if (o.pts) api.parcial(o.pts, bts[k]); else api.erro(bts[k]);
            api.registrar(no, o.t, !!o.ok, ctx.replace(/<[^>]+>/g, ''));
            await api.feedback({ tipo: o.ok ? 'ok' : (o.pts ? 'info' : 'erro'), titulo: o.tit, texto: '<p>' + o.ex + '</p>', caso: o.caso, pts: '+' + (o.pts || 0) + ' pts' });
            p.remove();
            resolve(o);
          };
          bts.forEach((b, k) => b.addEventListener('click', () => escolher(k)));
          setTimeout(() => api.teclas(e => { const k = parseInt(e.key, 10) - 1; if (k >= 0 && k < bts.length) escolher(k); }), 900);
        });
      }

      async function celular() {
        duelo.style.opacity = '.25'; slot.innerHTML = '';
        const cel = document.createElement('div');
        cel.className = 'celular vibra';
        cel.innerHTML = '<div class="ilha"></div><div class="tela-cel"><div class="hora-cel">14:27</div><div class="data-cel">Today</div>' +
          '<div class="notif-cel"><div class="app"><i>' + ico('cadeado') + '</i>Account sign-in · now</div><b>Are you trying to sign in?</b>' +
          '<p>Your school account<br>Device: unknown · Location: unknown</p><div class="numero">47</div><p style="text-align:center">Tap the number shown on the sign-in screen.</p></div></div>';
        f6.appendChild(cel);
        api.som('vibra');
        const mfa = await painel('<b>Your phone buzzed.</b> You are choosing passwords in class. You did not try to sign in anywhere.', [
          { t: 'Approve it: it is probably the system asking again', pts: 0, aprovou: true, tit: 'Account taken over.', ex: 'Whoever asked to sign in already had your password. By approving, you gave them the second step too: they are now in your email. In real life, tell an adult straight away so the password can be changed.' },
          { t: 'Deny it and carry on', pts: 5, tit: 'Denying was right, but one step is missing.', ex: 'If the request arrived, <b>someone already has your password</b>. An adult needs to know and the password needs changing.' },
          { t: 'Deny it ("No, it\'s not me") and tell an adult: someone has my password', pts: 10, ok: true, tit: 'Exactly!', ex: 'A request you did not start means your password has leaked. Deny it, tell an adult and change your password.' }
        ], 'mfa_push');
        if (mfa.aprovou) {
          api.registrar('ligacao_ti', 'nao_ocorreu', false, 'Conta já invadida ao aprovar o MFA');
          cel.style.transition = 'transform .5s ease-in'; cel.style.transform = 'translateX(420px) rotate(8deg)';
          await api.espera(450);
          cel.remove();
          duelo.style.opacity = '';
          return;
        }
        // a ligação da falsa "TI"
        cel.classList.remove('vibra');
        cel.querySelector('.tela-cel').innerHTML = '<div class="ligacao-cel"><div class="av">' + ico('usuario').replace('<svg ', '<svg width="44" height="44" ') + '</div><div class="nm">"Account Support"</div><div class="nr">Unknown number</div>' +
          '<div class="fala">"Hi, this is Account Support. We saw someone trying to get into your account and we need to block them. A number will appear on your phone: can you tell me what it is so I can finish the block?"</div>' +
          '<div class="bts"><i style="background:#cf4a3c">' + ico('desligar') + '</i><i style="background:#3e9b2f">' + ico('telefone') + '</i></div></div>';
        api.som('toque');
        await api.espera(600);
        const caso = '<b>Why the call came straight after.</b> The scammer already had your password and needed the number on your phone to finish signing in. Calling as "support" right after the request makes the story sound true.';
        await painel('<b>Minutes later, the phone rings.</b> The caller knows about the request you just denied.', [
          { t: 'Tell them the number: they are trying to help', pts: 0, tit: 'It was the scammer.', ex: 'They already had your password; they only needed the number. Real support never asks for your code.', caso },
          { t: 'Ask them to send an email to confirm', pts: 0, tit: 'That is still their channel.', ex: 'Someone pretending to be support can send a fake email too. The check has to come from you, through someone you know.', caso },
          { t: 'Hang up and ask a parent or teacher for help', pts: 10, ok: true, tit: 'Scam stopped!', ex: 'You check, through people you know. Real support never asks for your code or the number on your screen.', caso }
        ], 'ligacao_ti');
        cel.style.transition = 'transform .5s ease-in'; cel.style.transform = 'translateX(420px) rotate(8deg)';
        await api.espera(450);
        cel.remove();
        duelo.style.opacity = '';
      }

      async function concluir() {
        await api.feedback({
          tipo: api.st.p >= 50 ? 'ok' : 'info', titulo: api.st.p >= 60 ? 'Accounts protected!' : 'Passwords checked',
          texto: '<p>A strong password is your first lock; 2-step verification is the second. Scammers know this, so they try to talk <b>you</b> into opening the second one.</p>',
          botao: 'See your result'
        });
        api.fim();
      }
      rodada();
    }
  });
})();
