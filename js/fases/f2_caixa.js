/* Fase 2 — 09:00 · Caixa de entrada (phishing escrito por IA, para alunos: prêmio, falso professor, conta encerrada) */
(function () {
  'use strict';
  const ico = (n) => ARTE.ico(n);

  // golpe: true = phishing. sEnd: número do sinal que marca o endereço. Os <span data-s="n"> do corpo casam com sinais[n-1].
  const EMAILS = [
    {
      id: 'robux', golpe: true, de: 'Game Rewards', end: 'rewards@free-game-gifts.net', sEnd: 4, cor: '#8a948e', hora: '09:34',
      assunto: 'You won 10,000 free coins! Claim today', previa: 'Congratulations! Your account was chosen for 10,000 free coins...',
      corpo: '<p>Congratulations, player!</p><p>Your account was chosen for <b>10,000 free coins</b>. <span data-s="2">The offer ends at midnight today.</span></p>' +
        '<p><span data-s="3">Just sign in with your game username and password</span> on the button below and the coins are yours.</p>' +
        '<p><a class="botao-email" data-s="1" data-href="https://free-game-gifts.net/claim/login">Claim my coins</a></p><p>The Rewards Team</p>',
      sinais: ['Hover over the button: it leads to <b>free-game-gifts.net</b>, not to the game.',
        'A deadline of "today" so you do not stop to think.',
        'It asks for your username and password. Real games never ask for your password by email.',
        'A sender you have never heard of, from a domain that belongs to no game.'],
      licao: 'Free coins that need your password are the price of your account.'
    },
    {
      id: 'biblioteca', golpe: false, de: 'Library', end: 'library@stnicholas.com.br', sEnd: 1, cor: '#002664', hora: '09:20',
      assunto: 'Reminder: your book is due on Friday', previa: 'Just a reminder that the book you borrowed is due back on Friday...',
      corpo: '<p>Hello!</p><p>Just a reminder that the book you borrowed is due back on Friday. You can return it at the library desk.</p>' +
        '<p><span data-s="2">There is nothing to click and nothing to pay.</span> <span data-s="3">Questions? Come and see us in the library.</span></p><p>The Library Team</p>',
      sinais: ['The school\'s own address, spelled correctly: stnicholas.com.br.',
        'It only informs you: no password, code, link or payment.',
        'For questions, it sends you to a place you already know.'],
      licao: 'Real emails exist: the difference is that they do not ask for anything risky.'
    },
    {
      id: 'senha', golpe: true, de: 'Account Security', end: 'no-reply@account-security-alerts.com', sEnd: 1, cor: '#0f6cbd', hora: '09:10',
      assunto: 'Your school account will be closed today', previa: 'We noticed unusual activity. Your account will be closed in 2 hours...',
      corpo: '<p><b>Security alert</b></p>' +
        '<p><span data-s="3">We noticed unusual activity. Your school account will be closed in 2 hours.</span></p>' +
        '<p>To keep your email and Classroom, <span data-s="4">confirm your current password</span> using the button below.</p>' +
        '<p><a class="botao-email" data-s="2" data-href="https://accounts.google.com.secure-login.net/keep">Keep my account</a></p>' +
        '<p style="color:#777;font-size:12px">Account Security Team</p>',
      sinais: ['The sender is not the school or Google: account-security-alerts.com could be anyone.',
        'Hover over the button: the address ends in <b>secure-login.net</b>. What counts is the domain just before the first "/".',
        'Pressure: "closed in 2 hours".',
        'It asks for your password. No real service asks for your password by email.'],
      licao: 'Be suspicious of any email that asks you to "confirm" your password.'
    },
    {
      id: 'professor', golpe: true, de: 'Head of Grade 8', end: 'head.grade8@stnicho1as.com.br',
      endHtml: 'head.grade8@<span data-s="1">stnicho1as</span>.com.br', cor: '#5b3a28', hora: '09:02',
      assunto: 'Quick favour, please keep it secret', previa: 'I need your help with a surprise for the class today...',
      corpo: '<p>Hi,</p><p>I need your help with a surprise prize for the class <span data-s="2">today</span>. <span data-s="2">Please don\'t tell anyone, it\'s a secret.</span></p>' +
        '<p><span data-s="3">I\'m in meetings all day, so just reply here.</span></p>' +
        '<p><span data-s="4">Can you buy 3 gift cards of R$ 100 at the shop and send me the codes?</span> I\'ll pay you back tomorrow.</p><p>Thanks!</p>',
      sinais: ['A swapped letter: stnicho<b>1</b>as, with the number "1" instead of the letter "l".',
        'Rush and secrecy: the favourite pair of every impersonation scam.',
        '"Just reply here" stops you checking with the real teacher.',
        'Gift card codes are like cash. No teacher will ever ask you to buy them.'],
      licao: 'A strange request from a teacher? Ask them in person.'
    },
    {
      id: 'conselho', golpe: false, de: 'Student Council', end: 'studentcouncil@stnicholas.com.br', sEnd: 1, cor: '#3e9b2f', hora: '08:55',
      assunto: 'Election results are on the Student Portal', previa: 'The results of the Student Council election are now on the portal...',
      corpo: '<p>Hi everyone!</p><p>The results of the Student Council election are now on the Student Portal. Thank you to everyone who voted!</p>' +
        '<p><span data-s="2">No need to sign in anywhere new: open the portal the way you always do.</span></p><p><span data-s="3">See you at assembly,</span><br>Student Council</p>',
      sinais: ['From the school, with the right domain.',
        'It sends you to a place you already use, not to a new link.',
        'No password, code or payment, and no rush.'],
      licao: 'Checked and all fine? Carry on with your day.'
    },
    {
      id: 'sorteio', golpe: true, de: 'Prize Draw', end: 'prizes@stnicholas-giveaway.com', sEnd: 1, cor: '#3c6ea8', hora: '08:41',
      assunto: 'St. Nicholas students: win new headphones', previa: 'Every St. Nicholas student can enter our prize draw for free headphones...',
      corpo: '<p>Hi!</p><p><span data-s="2">Every St. Nicholas student can enter our draw for free wireless headphones.</span></p>' +
        '<p>To enter:</p><ol><li>Open the form below</li><li><span data-s="3">Type your school email, password and date of birth</span></li><li>Share this email with 5 friends</li></ol>' +
        '<p><a data-href="https://stnicholas-giveaway.com/enter">stnicholas-giveaway.com/enter</a></p>' +
        '<p><span data-s="4">Only the first 50 students get a chance!</span></p>',
      sinais: ['It uses the school\'s name, but the domain is <b>stnicholas-giveaway.com</b>, not the school\'s.',
        'A prize you never entered.',
        'It asks for your password and date of birth: that is enough to take over your account.',
        '"First 50 only" is there to make you hurry.'],
      licao: 'The school\'s name in an email does not make it the school. Check the domain.'
    }
  ];

  function iniciais(n) { return n.replace(/[^A-Za-zÀ-ú ]/g, '').split(' ').filter(Boolean).slice(0, 2).map(p => p[0]).join('').toUpperCase(); }

  M.registrar({
    ordem: 2, id: 'caixa', hora: '09:00', titulo: 'Your inbox', tema: 'Phishing in the age of AI', icone: 'email', max: 60,
    missao: 'Six emails arrived this morning. Some are scams written by AI, <strong>with no spelling mistakes at all</strong>. Open each one and decide: <strong>Report</strong> or <strong>It is real</strong>.',
    como: [
      ['lupa', 'Check the sender\'s address, letter by letter.'],
      ['clique', 'Hover over links and buttons: the real address appears at the bottom.'],
      ['reportar', 'If in doubt, report it. Reporting a real email still gets half the points; letting a scam through gets nothing.']
    ],
    licoes: [
      'Today\'s scams are well written and use names you know: check the sender\'s <b>domain</b> letter by letter.',
      'Hover before you click: what counts is the domain just before the first "/".',
      'Nobody real asks for your password, a code or gift cards by email.',
      'Not sure? Do not click. Report it, and show a teacher or a parent.'
    ],
    conquista: { id: 'cacador', nome: 'Phishing hunter', desc: 'Got all 6 emails right', icone: 'email' },

    iniciar(api) {
      const decid = {};
      let atual = null;
      api.raiz.innerHTML =
        '<div class="ol"><div class="ol-topo"><div class="app">' + ico('email') + 'School Mail</div><div class="busca">' + ico('lupa') + 'Search</div><div class="prog">Sorted: <b>0</b> of 6</div></div>' +
        '<div class="ol-corpo"><nav class="ol-pastas"><div class="sel">Inbox <span class="nl">6</span></div><div>Spam</div><div>Drafts</div><div>Sent</div><div>Bin</div><div>Archive</div></nav>' +
        '<div class="ol-lista"><div class="cab">Inbox <span>Newest</span></div>' +
        EMAILS.map(e => '<div class="ol-item nlido" data-id="' + e.id + '" tabindex="0" role="button"><span class="av" style="background:' + e.cor + '">' + iniciais(e.de) + '</span>' +
          '<div class="meio"><div class="de"><b>' + e.de + '</b><small>' + e.hora + '</small></div><div class="ass">' + e.assunto + '</div><div class="prev">' + e.previa + '</div></div></div>').join('') +
        '</div><section class="ol-ler"><div class="ol-vazio"><div>' + ARTE.ico('email') + '<div>Open an email from the list to start.</div></div></div></section></div></div>';
      const ler = api.raiz.querySelector('.ol-ler');
      const lista = api.raiz.querySelector('.ol-lista');
      api.toast('Check the sender and hover over the links before you decide.', '', 'lupa');

      lista.addEventListener('click', e => { const it = e.target.closest('.ol-item'); if (it) abrir(it.dataset.id); });
      lista.addEventListener('keydown', e => { if (e.key === 'Enter') { const it = e.target.closest('.ol-item'); if (it) abrir(it.dataset.id); } });

      function abrir(id) {
        const e = EMAILS.find(x => x.id === id);
        atual = e;
        api.som('clique');
        lista.querySelectorAll('.ol-item').forEach(it => it.classList.toggle('sel', it.dataset.id === id));
        const item = lista.querySelector('[data-id="' + id + '"]');
        item.classList.remove('nlido');
        const nl = api.raiz.querySelector('.ol-pastas .nl');
        nl.textContent = lista.querySelectorAll('.ol-item.nlido').length || '';
        const feito = decid[id];
        ler.innerHTML =
          '<div class="ol-barra"><span class="lbl">This email is:</span>' +
          '<button class="btn-ol rep" data-d="1" type="button"' + (feito ? ' disabled' : '') + '>' + ico('reportar') + 'Report</button>' +
          '<button class="btn-ol leg" data-d="0" type="button"' + (feito ? ' disabled' : '') + '>' + ico('check') + 'It is real</button></div>' +
          '<div class="vered-slot"></div>' +
          '<div class="ol-msg' + (feito ? ' mostra-sinais' + (e.golpe ? '' : ' legit') : '') + '"><h2>' + e.assunto + '</h2>' +
          '<div class="ol-rem"><span class="av" style="background:' + e.cor + '">' + iniciais(e.de) + '</span><div><div class="nome">' + e.de + '</div>' +
          '<div class="end">&lt;' + (e.endHtml || (e.sEnd ? '<span data-s="' + e.sEnd + '">' + e.end + '</span>' : e.end)) + '&gt;</div><div class="para">To: you</div></div>' +
          '<div class="hora">Today, ' + e.hora + '</div></div>' +
          (e.anexos ? '<div>' + e.anexos.map(a => '<span class="anexo"' + (a.s ? ' data-s="' + a.s + '"' : '') + '><span class="tp" style="background:' + a.cor + '">' + a.tipo + '</span><span>' + a.nome + '<small>' + a.tam + '</small></span></span>').join('') + '</div>' : '') +
          '<div class="ol-corpo-msg">' + e.corpo + '</div></div><div class="ol-status"></div>';
        if (feito) mostrarVeredito(e, feito);
        ler.querySelectorAll('[data-d]').forEach(b => b.addEventListener('click', () => decidir(e, b.dataset.d === '1')));
        const status = ler.querySelector('.ol-status');
        ler.querySelectorAll('[data-href]').forEach(a => {
          a.addEventListener('mouseenter', () => { status.textContent = a.dataset.href; status.classList.add('on'); });
          a.addEventListener('mouseleave', () => status.classList.remove('on'));
          a.addEventListener('click', ev => {
            ev.preventDefault();
            status.textContent = a.dataset.href; status.classList.add('on');
            api.toast('In real life, that click would already have opened the page. Hover to check the address <b>without clicking</b>.', '', 'alerta');
          });
        });
        ler.querySelectorAll('.anexo').forEach(a => a.addEventListener('click', () => api.toast('Opening an unexpected attachment is how scams start. Decide before you open it.', '', 'alerta')));
      }

      function decidir(e, reportou) {
        if (decid[e.id]) return;
        const certo = e.golpe === reportou;
        const pts = certo ? 10 : (!e.golpe && reportou ? 5 : 0);
        const res = certo ? 'certo' : (pts ? 'meio' : 'errado');
        decid[e.id] = res;
        const btn = ler.querySelector('[data-d="' + (reportou ? 1 : 0) + '"]');
        if (certo) api.acerto(pts, btn); else if (pts) api.parcial(pts, btn); else api.erro(btn);
        api.registrar(e.id, reportou ? 'report' : 'real', certo, e.assunto);
        ler.querySelectorAll('[data-d]').forEach(b => { b.disabled = true; });
        const msg = ler.querySelector('.ol-msg');
        msg.classList.add('mostra-sinais'); if (!e.golpe) msg.classList.add('legit');
        const item = lista.querySelector('[data-id="' + e.id + '"]');
        item.insertAdjacentHTML('beforeend', '<span class="status ' + res + '">' + ico(certo ? 'check' : (pts ? 'reportar' : 'x')) + '</span>');
        api.raiz.querySelector('.ol-topo .prog b').textContent = Object.keys(decid).length;
        mostrarVeredito(e, res);
        if (todosDecididos()) {
          // atalho extra no topo, para quem não usar o botão do veredito
          const prog = api.raiz.querySelector('.ol-topo .prog');
          prog.innerHTML = '<button class="btn peq" type="button" style="padding:6px 14px;font-size:13px">Finish sorting' + ico('seta') + '</button>';
          prog.style.background = 'none'; prog.style.padding = '0';
          prog.querySelector('button').addEventListener('click', concluir);
        }
      }
      function todosDecididos() { return Object.keys(decid).length === EMAILS.length; }

      function mostrarVeredito(e, res) {
        const tit = res === 'certo' ? (e.golpe ? 'Scam spotted!' : 'That\'s right: it is real.')
          : res === 'meio' ? 'It was real, but reporting when in doubt is not a big mistake.' : 'That was a scam!';
        const pts = res === 'certo' ? '+10' : res === 'meio' ? '+5' : '+0';
        const fim = todosDecididos();
        const slot = ler.querySelector('.vered-slot');
        slot.innerHTML = '<div class="veredito ' + res + '"><div class="selo">' + ico(res === 'errado' ? 'x' : res === 'meio' ? 'lampada' : 'check') + '</div>' +
          '<div><h4>' + tit + ' <span style="font-weight:500;opacity:.7">' + pts + '</span></h4>' +
          '<div>' + (e.golpe ? 'Scam signs marked in the email:' : 'Why you can trust it:') + '</div><ol>' + e.sinais.map(s => '<li>' + s + '</li>').join('') + '</ol>' +
          '<div class="licao">' + e.licao + '</div></div>' +
          '<button class="btn peq" type="button">' + (fim ? 'Finish' : 'Next email') + ico('seta') + '</button></div>';
        const b = slot.querySelector('button');
        if (b) {
          setTimeout(() => b.focus(), 80);
          b.addEventListener('click', () => {
            if (todosDecididos()) return concluir();
            const prox = EMAILS.find(x => !decid[x.id]);
            if (prox) abrir(prox.id);
          });
        }
      }

      let concluindo = false;
      async function concluir() {
        if (concluindo) return;
        concluindo = true;
        const certos = Object.values(decid).filter(v => v === 'certo').length;
        await api.feedback({
          tipo: certos === 6 ? 'ok' : 'info', titulo: certos === 6 ? 'Inbox protected!' : 'You got ' + certos + ' of 6',
          texto: '<p>Four of these emails were scams, and none had a spelling mistake. With AI, scams look like everyday messages. What gives them away is the <b>domain</b>, the <b>request</b> (password, code, gift cards, a prize) and the <b>rush</b>.</p>',
          botao: 'See your result'
        });
        api.fim();
      }

      api.teclas(e => {
        if (!atual || decid[atual.id] || e.target.closest && e.target.closest('button')) return;
        if (e.key === 'r' || e.key === 'R') decidir(atual, true);
        if (e.key === 'l' || e.key === 'L') decidir(atual, false);
      });
    }
  });
})();
