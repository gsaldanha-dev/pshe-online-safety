/* Fase 2 — 09:00 · Caixa de entrada no estilo do e-mail da escola (que é Gmail): oito e-mails, quatro golpes.
   Os pares são de propósito parecidos — alerta do Google verdadeiro x falso, aviso do ManageBac verdadeiro x
   compartilhamento falso do Drive — para que o aluno decida pelo domínio e pelo pedido, não pela aparência. */
(function () {
  'use strict';
  const ico = (n) => ARTE.ico(n);

  // golpe: true = phishing. sEnd: número do sinal que marca o endereço. Os <span data-s="n"> do corpo casam com sinais[n-1].
  const EMAILS = [
    {
      id: 'alerta-falso', golpe: true, de: 'Google', end: 'no-reply@accounts-google-security.com', sEnd: 1, cor: '#1a73e8', hora: '09:41',
      assunto: 'Security alert: new sign-in on Windows', previa: 'Your school account was just used to sign in on a new Windows device...',
      corpo: '<div class="gm-cartao"><p class="gm-cartao-t">A new sign-in on Windows</p><p>you@stnicholas.com.br</p>' +
        '<p>We noticed a new sign-in to your school account on a Windows device. <span data-s="3">If this wasn\'t you, someone might be using your account. Check and secure it now.</span></p>' +
        '<p><a class="gm-botao" data-s="2" data-href="https://accounts.google.com-review.help/activity">Check activity</a></p></div>',
      sinais: ['The sender looks like Google, but the domain is <b>accounts-google-security.com</b>, not google.com.',
        'Hover over the button: it goes to <b>google.com-review.help</b>. The real domain is the part just before the first "/".',
        'It tries to scare you so you click before you check.'],
      licao: 'Got a scary alert? Do not use its button. Open your account the way you always do and check from there.'
    },
    {
      id: 'alerta-real', golpe: false, de: 'Google', end: 'no-reply@accounts.google.com', sEnd: 1, cor: '#1a73e8', hora: '09:33',
      assunto: 'New sign-in on Chromebook', previa: 'You signed in on a new Chromebook. If this was you, you don\'t need to do anything...',
      corpo: '<div class="gm-cartao"><p class="gm-cartao-t">A new sign-in on Chromebook</p><p>you@stnicholas.com.br</p>' +
        '<p>Your school account was used to sign in on a Chromebook (Library, São Paulo) at 08:07. <span data-s="2">If this was you, you don\'t need to do anything.</span></p>' +
        '<p><span data-s="3">If it wasn\'t you, go to your account settings yourself and change your password.</span></p></div>',
      sinais: ['The real Google domain, letter by letter: <b>accounts.google.com</b>.',
        'You did sign in on a library Chromebook just after 08:00: it matches what you did.',
        'It does not push you to click a button. It tells you to go to your settings yourself.'],
      licao: 'Real alerts exist. The difference: they match something you did, and you can check without their link.'
    },
    {
      id: 'professor', golpe: true, de: 'Head of Grade 8', end: 'head.grade8@stnicho1as.com.br',
      endHtml: 'head.grade8@<span data-s="1">stnicho1as</span>.com.br', cor: '#5b3a28', hora: '09:20',
      assunto: 'Could you help me with something this morning?', previa: 'Are you at school already? I need a hand with the class surprise...',
      corpo: '<p>Good morning,</p><p>Are you at school already? I\'m organising a surprise for the end of term and I\'d like your help, <span data-s="2">but please don\'t mention it in class so it stays a surprise.</span></p>' +
        '<p><span data-s="3">I\'m in meetings until lunch, so email is best.</span> Could you buy two R$ 100 game gift cards on the way home and <span data-s="4">send me a photo of the codes on the back</span>? I\'ll pay you back tomorrow.</p><p>Many thanks,<br>Head of Grade 8</p>',
      sinais: ['A number instead of a letter: stnicho<b>1</b>as, with "1" instead of "l". Easy to miss on a small screen.',
        'Asking you to keep it quiet stops you checking with anyone.',
        '"Email is best" means you cannot just ask them in person or by phone.',
        'Gift card codes are like cash. No teacher will ever ask you to buy them or send the codes.'],
      licao: 'An odd request from a teacher? Ask them face to face. A real teacher will never mind.'
    },
    {
      id: 'biblioteca', golpe: false, de: 'Library', end: 'library@stnicholas.com.br', sEnd: 1, cor: '#002664', hora: '09:02',
      assunto: 'Your book is overdue', previa: 'The book you borrowed was due back yesterday. Please return it...',
      corpo: '<p>Hello,</p><p>The book you borrowed was due back yesterday. Please return it to the library desk this week.</p>' +
        '<p><span data-s="2">There is no fine and nothing to pay.</span> <span data-s="3">If you think this is a mistake, come and see us at break.</span></p><p>The Library Team</p>',
      sinais: ['The school\'s own address, spelled correctly: <b>stnicholas.com.br</b>.',
        'It does not ask for money, a password or a click.',
        'For questions, it sends you to a real place you already know.'],
      licao: 'A message can sound strict and still be real: it asks for nothing risky.'
    },
    {
      id: 'drive', golpe: true, de: 'Science Department (via Docs)', end: 'drive-shares-noreply@docs-share-google.com', sEnd: 1, cor: '#188038', hora: '08:52',
      assunto: 'Shared with you: "Grade 8 Science test results.xlsx"', previa: 'Science Department shared a spreadsheet with you...',
      corpo: '<div class="gm-cartao"><p><b>Science Department</b> shared a spreadsheet with you</p>' +
        '<div class="gm-arquivo">' + '<span class="gm-xls">XLS</span>Grade 8 Science test results.xlsx</div>' +
        '<p><span data-s="3">Results are visible until 17:00 today.</span></p>' +
        '<p><a class="gm-botao" data-s="2" data-href="https://docs.google.com.file-viewer.app/d/8sci-results">Open</a></p>' +
        '<p class="gm-mini"><span data-s="4">You will need to sign in again with your school password to view this file.</span></p></div>',
      sinais: ['Real share emails come from <b>google.com</b>. This one comes from <b>docs-share-google.com</b>.',
        'Hover over Open: the domain is <b>file-viewer.app</b>, not docs.google.com.',
        '"Until 17:00 today": a deadline so you hurry.',
        'Asking you to type your password again to "view" a file is how passwords get stolen.'],
      licao: 'Something you really want to see, like marks, is the perfect bait. Grades live in ManageBac: open it yourself.'
    },
    {
      id: 'managebac', golpe: false, de: 'ManageBac', end: 'notifications@managebac.com', sEnd: 1, cor: '#e8710a', hora: '08:40',
      assunto: 'Your ManageBac password was changed', previa: 'The password for your account was changed today at 08:31...',
      corpo: '<p>Hi,</p><p>The password for your ManageBac account was changed today at 08:31.</p>' +
        '<p><span data-s="2">If you made this change, you can ignore this email.</span></p>' +
        '<p><span data-s="3">If you did not, tell your form tutor or the IT team at school straight away.</span></p><p>ManageBac</p>',
      sinais: ['From ManageBac\'s own domain: <b>managebac.com</b>.',
        'You changed your ManageBac password in tutor time, at 08:30: it matches what you did.',
        'If something is wrong, it sends you to real people at school, not to a link.'],
      licao: 'A real "your password changed" email only tells you. It never asks you to type the password into it.'
    },
    {
      id: 'conselho', golpe: false, de: 'Student Council', end: 'studentcouncil@stnicholas.com.br', sEnd: 1, cor: '#3e9b2f', hora: '08:31',
      assunto: 'Election results are on the Student Portal', previa: 'The results of the Student Council election are now on the portal...',
      corpo: '<p>Hi everyone!</p><p>The results of the Student Council election are now on the Student Portal. Thank you to everyone who voted!</p>' +
        '<p><span data-s="2">No need to sign in anywhere new: open the portal the way you always do.</span></p><p><span data-s="3">See you at assembly,</span><br>Student Council</p>',
      sinais: ['From the school, with the right domain.',
        'It sends you to a place you already use, not to a new link.',
        'No password, code or payment, and no rush.'],
      licao: 'Checked and all fine? Carry on with your day.'
    },
    {
      id: 'rifa', golpe: true, de: 'St. Nicholas Events', end: 'events@stnicholas.org.br', sEnd: 1, cor: '#3c6ea8', hora: '08:15',
      assunto: 'Winter Fair raffle: confirm your entry', previa: 'Thank you for entering the Winter Fair raffle! Please confirm your entry...',
      corpo: '<p>Dear student,</p><p>Thank you for entering the Winter Fair raffle! <span data-s="2">To keep your ticket, please confirm your entry with your school account.</span></p>' +
        '<p><a data-s="3" data-href="https://stnicholas.org.br/raffle/confirm">stnicholas.org.br/raffle/confirm</a></p>' +
        '<p><span data-s="4">Unconfirmed tickets are cancelled on Friday.</span></p><p>Events Team</p>',
      sinais: ['The school is <b>stnicholas.com.br</b>. This is <b>.org.br</b>: one small change, a different owner.',
        'You never entered a raffle. Something you "already did" makes it feel familiar.',
        'The link looks like the school\'s name, but it is the same fake .org.br domain.',
        'A deadline to make you act before you think.'],
      licao: 'Check the whole domain, ending included: .com.br and .org.br are different places.'
    }
  ];

  const TOTAL_GOLPES = EMAILS.filter(e => e.golpe).length;
  function iniciais(n) { return n.replace(/\(.*\)/, '').replace(/[^A-Za-zÀ-ú ]/g, '').split(' ').filter(Boolean).slice(0, 2).map(p => p[0]).join('').toUpperCase(); }

  M.registrar({
    ordem: 2, id: 'caixa', hora: '09:00', titulo: 'Your inbox', tema: 'Phishing in the age of AI', icone: 'email', max: 80,
    missao: 'This morning you signed in on a library Chromebook, and in tutor time you changed your ManageBac password. Now eight emails are waiting. Some are scams written by AI: <strong>no spelling mistakes, real names</strong>. Open each one and decide: <strong>Report phishing</strong> or <strong>Looks safe</strong>.',
    como: [
      ['lupa', 'Open each email and check the full address, letter by letter, ending included.'],
      ['clique', 'Hover over links and buttons: the real address appears at the bottom.'],
      ['reportar', 'If in doubt, report it. Reporting a real email still gets half the points; letting a scam through gets nothing.']
    ],
    licoes: [
      'Scams copy real emails almost perfectly. Check the <b>domain</b>: a "1" for an "l", an extra word, .org.br for .com.br.',
      'Hover before you click: what counts is the domain just before the first "/".',
      'Nobody real asks for your password, a code or gift cards by email, not even to "view a file".',
      'A scary alert? Never use its button. Open the site yourself, the way you always do.'
    ],
    conquista: { id: 'cacador', nome: 'Phishing hunter', desc: 'Got all 8 emails right', icone: 'email' },

    iniciar(api) {
      const decid = {};
      let atual = null;
      api.raiz.innerHTML =
        '<div class="gm"><div class="gm-topo"><span class="gm-menu">' + ico('menu') + '</span><div class="gm-marca">' + ico('email') + 'School Mail</div>' +
        '<div class="gm-busca">' + ico('lupa') + 'Search mail</div><div class="prog">Sorted: <b>0</b> of ' + EMAILS.length + '</div></div>' +
        '<div class="gm-corpo"><nav class="gm-pastas"><div class="gm-escrever">' + ico('nota') + 'Compose</div>' +
        '<div class="sel">' + ico('email') + 'Inbox <span class="nl">' + EMAILS.length + '</span></div><div>' + ico('estrela') + 'Starred</div><div>' + ico('relogio') + 'Snoozed</div>' +
        '<div>' + ico('enviar') + 'Sent</div><div>' + ico('alerta') + 'Spam</div></nav>' +
        '<div class="gm-lista">' +
        EMAILS.map(e => '<div class="gm-item nlido" data-id="' + e.id + '" tabindex="0" role="button"><span class="gm-chk"></span>' +
          '<span class="gm-de">' + e.de + '</span><span class="gm-ass"><b>' + e.assunto + '</b> - ' + e.previa + '</span><span class="gm-hora">' + e.hora + '</span></div>').join('') +
        '</div><section class="gm-ler"></section></div></div>';
      const gm = api.raiz.querySelector('.gm');
      const ler = gm.querySelector('.gm-ler');
      const lista = gm.querySelector('.gm-lista');
      api.toast('Open each email and check the full sender address before you decide.', '', 'lupa');

      lista.addEventListener('click', e => { const it = e.target.closest('.gm-item'); if (it) abrir(it.dataset.id); });
      lista.addEventListener('keydown', e => { if (e.key === 'Enter') { const it = e.target.closest('.gm-item'); if (it) abrir(it.dataset.id); } });

      function voltar() { atual = null; gm.classList.remove('lendo'); }

      function abrir(id) {
        const e = EMAILS.find(x => x.id === id);
        atual = e;
        api.som('clique');
        lista.querySelector('[data-id="' + id + '"]').classList.remove('nlido');
        gm.querySelector('.gm-pastas .nl').textContent = lista.querySelectorAll('.gm-item.nlido').length || '';
        gm.classList.add('lendo');
        const feito = decid[id];
        ler.innerHTML =
          '<div class="gm-barra"><button class="gm-volta" type="button" aria-label="Back to inbox">' + ico('seta') + '</button><span class="lbl">This email is:</span>' +
          '<button class="btn-ol rep" data-d="1" type="button"' + (feito ? ' disabled' : '') + '>' + ico('reportar') + 'Report phishing</button>' +
          '<button class="btn-ol leg" data-d="0" type="button"' + (feito ? ' disabled' : '') + '>' + ico('check') + 'Looks safe</button></div>' +
          '<div class="vered-slot"></div>' +
          '<div class="gm-msg' + (feito ? ' mostra-sinais' + (e.golpe ? '' : ' legit') : '') + '"><h2>' + e.assunto + '<span class="gm-tag">Inbox</span></h2>' +
          '<div class="gm-rem"><span class="av" style="background:' + e.cor + '">' + iniciais(e.de) + '</span><div><div class="nome"><b>' + e.de + '</b> ' +
          '<span class="end">&lt;' + (e.endHtml || (e.sEnd ? '<span data-s="' + e.sEnd + '">' + e.end + '</span>' : e.end)) + '&gt;</span></div><div class="para">to me</div></div>' +
          '<div class="hora">' + e.hora + ' (0 minutes ago)</div></div>' +
          '<div class="gm-corpo-msg">' + e.corpo + '</div></div><div class="ol-status"></div>';
        if (feito) mostrarVeredito(e, feito);
        ler.querySelector('.gm-volta').addEventListener('click', () => { api.som('clique'); voltar(); });
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
      }

      function decidir(e, reportou) {
        if (decid[e.id]) return;
        const certo = e.golpe === reportou;
        const pts = certo ? 10 : (!e.golpe && reportou ? 5 : 0);
        const res = certo ? 'certo' : (pts ? 'meio' : 'errado');
        decid[e.id] = res;
        const btn = ler.querySelector('[data-d="' + (reportou ? 1 : 0) + '"]');
        if (certo) api.acerto(pts, btn); else if (pts) api.parcial(pts, btn); else api.erro(btn);
        ler.querySelectorAll('[data-d]').forEach(b => { b.disabled = true; });
        const msg = ler.querySelector('.gm-msg');
        msg.classList.add('mostra-sinais'); if (!e.golpe) msg.classList.add('legit');
        lista.querySelector('[data-id="' + e.id + '"]').insertAdjacentHTML('beforeend', '<span class="status ' + res + '">' + ico(certo ? 'check' : (pts ? 'reportar' : 'x')) + '</span>');
        gm.querySelector('.gm-topo .prog b').textContent = Object.keys(decid).length;
        mostrarVeredito(e, res);
      }
      function todosDecididos() { return Object.keys(decid).length === EMAILS.length; }

      function mostrarVeredito(e, res) {
        const tit = res === 'certo' ? (e.golpe ? 'Scam spotted!' : 'That\'s right: it is safe.')
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
        setTimeout(() => b.focus(), 80);
        b.addEventListener('click', () => {
          if (todosDecididos()) return concluir();
          const prox = EMAILS.find(x => !decid[x.id]);
          if (prox) abrir(prox.id);
        });
      }

      let concluindo = false;
      async function concluir() {
        if (concluindo) return;
        concluindo = true;
        const certos = Object.values(decid).filter(v => v === 'certo').length;
        await api.feedback({
          tipo: certos === EMAILS.length ? 'ok' : 'info', titulo: certos === EMAILS.length ? 'Inbox protected!' : 'You got ' + certos + ' of ' + EMAILS.length,
          texto: '<p>' + TOTAL_GOLPES + ' of these emails were scams, and none had a spelling mistake. With AI, a scam can look exactly like a real email. What gives it away is the <b>domain</b>, the <b>request</b> (password, code, gift cards) and the <b>rush</b>.</p>',
          botao: 'See your result'
        });
        api.fim();
      }

      api.teclas(e => {
        if (!atual || decid[atual.id] || e.target.closest && e.target.closest('button')) return;
        if (e.key === 'r' || e.key === 'R') decidir(atual, true);
        if (e.key === 's' || e.key === 'S') decidir(atual, false);
        if (e.key === 'Escape') voltar();
      });
    }
  });
})();
