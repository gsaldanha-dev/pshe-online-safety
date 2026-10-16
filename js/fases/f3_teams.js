/* Fase 3 — 10:30 · Amigo com número novo, num chat no estilo WhatsApp (tema claro) (golpe do código: rouba a conta e pede dinheiro aos contatos; deepfake na chamada) */
(function () {
  'use strict';
  const ico = (n) => ARTE.ico(n);
  const NOME = 'Leo';
  // número de mentira, de propósito: nunca um número que possa existir de verdade
  const NUM = '+55 21 90000-4417';
  // a ordem das opções muda a cada vez: a resposta certa não pode ser sempre a última
  function embaralhar(a) { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; }

  /* Grafo da conversa. Toda rota bem jogada soma 40 pontos (máximo da fase).
     op: { t: texto, ir: nó seguinte, pts, ok: true|false|null (null = não pontua nem registra), coach: explicação curta, eu: fala do jogador } */
  const NOS = {
    pedido: {
      pergunta: 'A number you don\'t have saved is messaging you as "Leo". What do you do?',
      ops: [
        { t: 'Reply: Leo said last week his phone was broken', ir: 'aceitou', pts: 0, ok: false, coach: 'Risky. A story that fits what you know is exactly what makes this scam work. The number is still not Leo\'s.' },
        { t: 'Look at the profile before deciding', ir: 'perfil', pts: 0, ok: null },
        { t: 'Ask a question only the real Leo could answer', ir: 'aceitou', pts: 0, ok: false, coach: 'Better than nothing, but answers are often on social media, and now you are chatting with the scammer.' },
        { t: 'Message Leo on the number I already have to ask if this is him', ir: 'confirma', pts: 20, ok: true, coach: 'Spot on! Checking through a contact you already know breaks the scam straight away.' }
      ]
    },
    perfil: {
      pergunta: 'You looked at the profile. Now what?',
      ops: [
        { t: 'Accept: same photo as Leo\'s, so it must be him', ir: 'aceitou', pts: 0, ok: false, coach: 'Photos are easy to copy from a public profile. The number is what matters, and it is not the one you have.' },
        { t: 'Block and report the number', ir: 'bloqueou', pts: 20, ok: true, coach: 'Yes! A copied photo on a number you do not know: scam.' },
        { t: 'Add it to my contacts as "Leo (new)"', ir: 'aceitou', pts: 0, ok: false, coach: 'Saving it makes the scammer look even more like Leo, to you and to your phone.' }
      ]
    },
    conversa: {
      pergunta: 'How do you reply?',
      ops: [
        { t: 'Sure, what\'s up?', eu: 'Sure, what\'s up?', ir: 'pedidoCodigo', pts: 0, ok: null },
        { t: 'What happened to your old number?', eu: 'What happened to your old number?', ir: 'pedidoCodigo', pts: 0, ok: null },
        { t: 'I\'ll check with you on your old number first.', eu: 'Hold on, I\'ll check with you on your old number first.', ir: 'confirma', pts: 20, ok: true, coach: 'Perfect: checking through a contact you already know breaks the scam.' }
      ]
    },
    pedidoCodigo: {
      pergunta: '"Leo" wants the 6-digit code that just arrived on your phone. What do you do?',
      ops: [
        { t: 'Send it: he says it was a mistake', eu: 'Ok, it\'s 482 913', ir: 'falha', pts: 0, ok: false, coach: 'That code was the key to <b>your</b> account. Whoever has it can sign in as you.' },
        { t: 'Ask him to send a photo to prove it\'s him', eu: 'Send me a selfie first lol', ir: 'falha', pts: 0, ok: false, coach: 'Photos can be copied or made with AI. And the code still ends up with the scammer.' },
        { t: 'Send only the first 3 numbers, to be safe', eu: '482... that\'s all I\'m sending', ir: 'falha', pts: 0, ok: false, coach: 'Any part of the code helps them, and they will just keep asking for the rest. A code is never shared, not even half.' },
        { t: 'Don\'t send it, and check with Leo another way', eu: 'I don\'t share codes. I\'ll check with you another way.', ir: 'chamada', pts: 10, ok: true, coach: 'Great! A code sent to <b>your</b> phone is only ever for you.' }
      ]
    },
    chamada: {
      pergunta: '"Leo" is video calling you from the new number.',
      ops: [
        { t: 'Answer: I\'ll see if it\'s really him', ir: 'video', pts: 0, ok: false, coach: 'Faces and voices can be faked by AI from a few seconds of public video. Seeing is not proof.' },
        { t: 'Decline, and call the number I already have for Leo', ir: 'confirma', pts: 10, ok: true, coach: 'Exactly: never check through the channel the request came from.' }
      ]
    },
    video: {
      pergunta: 'It looks and sounds like Leo. Now what?',
      ops: [
        { t: 'Send the code: I can see it\'s him', ir: 'falha', pts: 0, ok: false, coach: 'It was a deepfake. AI tools can copy a face and a voice from videos people post online.' },
        { t: 'Hang up and call the number I already have', ir: 'confirma', pts: 5, ok: true, coach: 'Good recovery! A face on a screen proves nothing: the number you already know does.' }
      ]
    },
    reportar: {
      pergunta: 'Last step: what do you do now?',
      ops: [
        { t: 'Tell a trusted adult, report the account in the app, and keep screenshots', ir: 'fim', pts: 20, ok: true, coach: 'Yes! The same scammer may be messaging your friends right now. An adult can help warn them.' },
        { t: 'Just block it and forget about it', ir: 'fim', pts: 0, ok: false, coach: 'Blocking is good, but an adult and the app need to know: these scams target a whole class at once.' },
        { t: 'Send the scammer a message saying I found out', ir: 'fim', pts: 0, ok: false, coach: 'Do not engage: block and report. Talking only helps them change their story.' }
      ]
    }
  };

  M.registrar({
    ordem: 3, id: 'teams', hora: '10:30', titulo: 'A friend on a new number', tema: 'Account takeover scams', icone: 'chat', max: 40,
    missao: 'At break, a new number with your classmate Leo\'s name and photo messages you asking for a "quick favour". <strong>Every reply changes where the chat goes.</strong>',
    como: [
      ['chat', 'Pick your replies from the options under the chat (or press 1, 2, 3).'],
      ['olho', 'Look at the contact\'s details. Names and photos are easy to copy.'],
      ['lampada', 'You can recover from a bad choice, but the shortest safe path scores most.']
    ],
    licoes: [
      'A friend\'s name and photo on an <b>unknown number</b>: check with them on the number you already have.',
      'A code that arrives on <b>your</b> phone is for you only. Never share it, not even with a friend, a teacher or "support".',
      'Faces and voices can be faked with AI. Agree a secret question with close friends and family.',
      'After blocking, report the account in the app and tell a trusted adult: these scams target many people at once.'
    ],
    conquista: { id: 'inabalavel', nome: 'Unshakeable', desc: 'Did not fall for any of the fake friend\'s tricks', icone: 'escudo' },

    iniciar(api) {
      let caiu = false, rotaPerfeita = true;
      api.raiz.innerHTML =
        '<div class="tm wa"><div class="tm-trilho"><div class="sel">' + ico('chat') + 'Chats</div><div>' + ico('camera') + 'Updates</div><div>' + ico('pessoas') + 'Communities</div><div>' + ico('telefone') + 'Calls</div></div>' +
        '<div class="tm-chats"><div class="cab">Chats</div><div class="wa-busca">' + ico('lupa') + 'Search</div>' +
        '<div class="tm-chat-item sel novo"><span class="av" style="background:#8b6f5c">LE</span><span><b>' + NUM + '</b><small>~' + NOME + ': hey are you there?</small></span><i class="wa-h">10:31</i></div>' +
        '<div class="tm-chat-item"><span class="av" style="background:#3e9b2f">8B</span><span><b>8B Science project</b><small>Mia: I uploaded the slides</small></span><i class="wa-h">10:12</i></div>' +
        '<div class="tm-chat-item"><span class="av" style="background:#002664">FA</span><span><b>Family</b><small>Pick you up at 15:45</small></span><i class="wa-h">07:40</i></div>' +
        '<div class="tm-chat-item"><span class="av" style="background:#3c6ea8">LE</span><span><b>' + NOME + '</b><small>see you at football</small></span><i class="wa-h">Yesterday</i></div></div>' +
        '<div class="tm-principal"><div class="tm-cab"><span class="av">LE</span><span class="nome">' + NUM + '<small>~' + NOME + '</small></span><span class="acoes-cab">' + ico('camera') + ico('telefone') + ico('lupa') + '</span></div>' +
        '<div class="tm-msgs"></div><div class="tm-opcoes"><div class="pergunta">' + ico('lampada') + '<span></span></div><div class="opcoes"></div></div></div></div>';
      const tm = api.raiz.querySelector('.tm');
      const msgs = tm.querySelector('.tm-msgs');
      const opArea = tm.querySelector('.tm-opcoes');
      opArea.style.visibility = 'hidden';

      const rolar = () => { msgs.scrollTop = msgs.scrollHeight; };
      function bolha(html, quem) {
        const b = document.createElement('div');
        b.className = 'bolha ' + quem;
        b.innerHTML = html;
        msgs.appendChild(b); rolar();
        return b;
      }
      async function ele(txt, pausa) {
        const d = document.createElement('div');
        d.className = 'digitando'; d.innerHTML = '<i></i><i></i><i></i>';
        msgs.appendChild(d); rolar();
        await api.espera(pausa || 1100);
        d.remove();
        api.som('notif');
        bolha(txt + '<span class="wa-hb">10:31</span>', 'ele');
        await api.espera(350);
      }
      function coach(op) {
        if (!op.coach) return;
        const cor = op.ok ? '#e9f5e5' : '#fdecea', borda = op.ok ? '#3e9b2f' : '#cf4a3c';
        const b = bolha('<span style="display:flex;gap:8px;align-items:flex-start;text-align:left">' +
          '<span style="color:' + borda + ';flex:none;width:18px">' + ico(op.ok ? 'check' : 'alerta') + '</span><span>' + op.coach + (op.pts ? ' <b>+' + op.pts + '</b>' : '') + '</span></span>', 'sistema');
        b.style.cssText = 'background:' + cor + ';border:1px solid ' + borda + ';color:#2c2c2c;border-radius:10px;padding:10px 14px;font-size:13.5px;max-width:80%';
      }

      function perguntar(no, contexto) {
        return new Promise(res => {
          const n = NOS[no], ops = embaralhar(n.ops);
          opArea.style.visibility = 'visible';
          opArea.querySelector('.pergunta span').textContent = n.pergunta;
          const box = opArea.querySelector('.opcoes');
          box.innerHTML = ops.map((o, k) => '<button class="opcao" type="button" style="animation-delay:' + k * 0.07 + 's"><span class="tecla">' + (k + 1) + '</span><span>' + o.t + '</span></button>').join('');
          const bts = Array.from(box.querySelectorAll('button'));
          const escolher = k => {
            const o = ops[k];
            bts.forEach(b => { b.disabled = true; });
            api.teclas(null);
            api.som('clique');
            if (o.ok === true) { if (o.pts) api.acerto(o.pts, bts[k]); }
            else if (o.ok === false) { api.erro(bts[k]); rotaPerfeita = false; }
            if (o.ok !== null) api.registrar(no, o.t, o.ok, n.pergunta);
            setTimeout(() => { opArea.style.visibility = 'hidden'; res(o); }, 380);
          };
          bts.forEach((b, k) => b.addEventListener('click', () => escolher(k)));
          api.teclas(e => { const k = parseInt(e.key, 10) - 1; if (k >= 0 && k < bts.length) escolher(k); });
          if (contexto) contexto();
          // as opções encolhem a área do chat: sem isto, a última mensagem ficava escondida atrás delas
          rolar();
        });
      }

      function telaChamada(html) {
        const c = document.createElement('div');
        c.className = 'chamada';
        c.innerHTML = html;
        tm.appendChild(c);
        return c;
      }
      function opcoesNaChamada(c, no) {
        return new Promise(res => {
          const n = NOS[no], ops = embaralhar(n.ops);
          const box = document.createElement('div');
          box.className = 'opcoes';
          box.innerHTML = ops.map((o, k) => '<button class="opcao" type="button" style="animation-delay:' + (0.4 + k * 0.08) + 's"><span class="tecla">' + (k + 1) + '</span><span>' + o.t + '</span></button>').join('');
          c.appendChild(box);
          const bts = Array.from(box.querySelectorAll('button'));
          const escolher = k => {
            const o = ops[k];
            bts.forEach(b => { b.disabled = true; });
            api.teclas(null);
            api.som('clique');
            if (o.ok === true) { if (o.pts) api.acerto(o.pts, bts[k]); } else if (o.ok === false) { api.erro(bts[k]); rotaPerfeita = false; }
            api.registrar(no, o.t, o.ok, n.pergunta);
            setTimeout(() => res(o), 450);
          };
          bts.forEach((b, k) => b.addEventListener('click', () => escolher(k)));
          api.teclas(e => { const k = parseInt(e.key, 10) - 1; if (k >= 0 && k < bts.length) escolher(k); });
        });
      }

      async function rodar(no) {
        if (no === 'pedido' || no === 'perfil') {
          if (no === 'pedido') {
            const card = document.createElement('div');
            card.className = 'tm-pedido';
            card.innerHTML = '<div class="av">LE</div><div class="nome">' + NUM + '</div><div class="wa-push">~' + NOME + '</div>' +
              '<p>Not a contact · No groups in common</p>' +
              '<div class="prev">hey its leo, i lost my phone, this is my new number. can you do me a quick favour?</div>';
            msgs.appendChild(card);
          } else {
            const card = msgs.querySelector('.tm-pedido');
            card.insertAdjacentHTML('beforeend', '<div class="tm-perfil"><div><span>Name</span><span><b>' + NOME + '</b></span></div>' +
              '<div><span>Number</span><span>' + NUM + '</span></div><div><span>Leo in your contacts</span><span>+55 11 90000-2380</span></div>' +
              '<div class="alerta">' + ico('alerta').replace('<svg ', '<svg width="16" height="16" ') + 'This number is not in your contacts.</div></div>');
            rolar();
          }
          const o = await perguntar(no);
          coach(o);
          await api.espera(o.coach ? 900 : 200);
          return rodar(o.ir);
        }
        if (no === 'aceitou') {
          const card = msgs.querySelector('.tm-pedido');
          if (card) { card.style.transition = 'opacity .3s'; card.style.opacity = '0'; await api.espera(300); card.remove(); }
          bolha('You accepted the chat with ' + NUM + '.', 'sistema');
          await ele('hey its leo, i lost my phone, this is my new number. can you do me a quick favour?', 700);
          const o = await perguntar('conversa');
          if (o.eu) bolha(o.eu, 'eu');
          coach(o);
          await api.espera(o.coach ? 900 : 300);
          if (o.ir === 'pedidoCodigo') {
            await ele('i sent a code to your phone by mistake, its for my new account');
            await ele('can you send me the 6 numbers? quick pls', 1300);
            await ele('my mum is going to kill me if i lose all my chats, please', 1300);
            api.som('notif');
            api.toast('SMS: <b>482 913</b> is your verification code. Do not share it with anyone.', '', 'celular');
            const o2 = await perguntar('pedidoCodigo');
            bolha(o2.eu, 'eu');
            coach(o2);
            await api.espera(1000);
            return rodar(o2.ir);
          }
          return rodar(o.ir);
        }
        if (no === 'bloqueou') {
          const card = msgs.querySelector('.tm-pedido');
          if (card) { card.style.transition = 'opacity .3s'; card.style.opacity = '0'; await api.espera(300); card.remove(); }
          bolha('You blocked ' + NUM + '. They cannot message you any more.', 'sistema');
          await api.espera(600);
          return rodar('reportar');
        }
        if (no === 'chamada') {
          await ele('ok calling you now, its really me', 900);
          api.som('toque');
          const c = telaChamada('<div class="av">LE</div><div class="nome">' + NUM + '</div><div class="sub">Incoming video call…</div>');
          const o = await opcoesNaChamada(c, 'chamada');
          coachOverlay(c, o);
          await api.espera(1400);
          c.remove();
          if (o.ir === 'video') return rodar('video');
          return rodar(o.ir);
        }
        if (no === 'video') {
          const c = telaChamada('<div class="video-falso">' + ARTE.videoFalso() + '<div class="legenda-video">"It\'s me! Just send the code, quick."</div></div><div class="sub" style="margin-top:14px">' + NUM + ' · 00:07</div>');
          const o = await opcoesNaChamada(c, 'video');
          coachOverlay(c, o);
          await api.espera(1700);
          c.remove();
          return rodar(o.ir);
        }
        if (no === 'confirma') {
          const c = telaChamada('<div class="av" style="background:#3e9b2f">' + ico('telefone').replace('<svg ', '<svg width="54" height="54" ') + '</div><div class="nome">Calling ' + NOME + '</div><div class="sub">the number saved in your contacts</div>');
          await api.espera(1500);
          c.querySelector('.av').style.animation = 'none';
          c.querySelector('.sub').textContent = 'On call · 00:04';
          api.som('notif');
          const fala = document.createElement('div');
          fala.className = 'legenda-video'; fala.style.cssText = 'position:static;transform:none;margin-top:26px;white-space:normal;max-width:620px;text-align:center;font-size:16px;padding:12px 18px';
          fala.textContent = '"What? My phone is right here! That is not me. Block it and tell someone, please."';
          c.appendChild(fala);
          await api.espera(2600);
          c.remove();
          bolha('You blocked ' + NUM + '.', 'sistema');
          await api.espera(400);
          return rodar('reportar');
        }
        if (no === 'falha') {
          caiu = true;
          await api.feedback({ tipo: 'erro', titulo: 'Your account was taken over.', centro: true,
            texto: '<p>The code let the scammer sign in as <b>you</b>. Now they are messaging your family and friends from your account, asking them to send money urgently.</p><p>You can still act: the sooner a trusted adult knows, the sooner the account can be recovered and people warned.</p>',
            botao: 'Act now' });
          return rodar('reportar');
        }
        if (no === 'reportar') {
          const o = await perguntar('reportar');
          coach(o);
          await api.espera(1100);
          return rodar('fim');
        }
        if (no === 'fim') {
          const s = api.st.p;
          await api.feedback({
            tipo: s >= 40 ? 'ok' : 'info',
            titulo: caiu ? 'The scam got through this time' : s >= 40 ? 'Scam stopped!' : 'Scam avoided, with a few scares',
            texto: '<p>' + (caiu ? 'Rush, secrecy and a familiar face did the scammer\'s work.' : 'You did not share the code.') +
              ' The simplest sign was on screen the whole time: <b>a number that was not Leo\'s</b>.</p>',
            caso: '<b>How this scam works.</b> Messaging apps send a code by SMS when someone sets up your account on a new phone. Whoever types that code gets your account, with your name and photo, and uses it to ask your contacts for money. That is why no one ever needs your code.',
            botao: 'See your result'
          });
          api.fim({ perfeito: !caiu && rotaPerfeita });
        }
      }

      function coachOverlay(c, o) {
        if (!o.coach) return;
        const d = document.createElement('div');
        d.style.cssText = 'margin-top:18px;max-width:620px;border-radius:12px;padding:12px 16px;font-size:14.5px;line-height:1.45;animation:sobe .35s both;background:' + (o.ok ? 'rgba(98,162,85,.9)' : 'rgba(207,74,60,.92)');
        d.innerHTML = o.coach + (o.pts ? ' <b>+' + o.pts + '</b>' : '');
        c.appendChild(d);
      }

      // a notificação chega e o pedido aparece
      api.depois(500, () => {
        api.som('notif');
        const t = document.createElement('div');
        t.className = 'toast-teams';
        t.innerHTML = '<span class="av">LE</span><span><b>' + NUM + '</b><br>~' + NOME + ': hey are you there?</span>';
        tm.appendChild(t);
        setTimeout(() => { t.style.transition = 'opacity .4s'; t.style.opacity = '0'; setTimeout(() => t.remove(), 400); }, 2600);
      });
      api.depois(1300, () => rodar('pedido'));
    }
  });
})();
