/* Online Safety Mission — bônus Capture the Flag, aberto para quem passou na missão (70%).
   Seis desafios curtos, cada um com uma flag no formato STN{...}. As respostas não ficam escritas aqui:
   o código guarda só um hash (FNV-1a) de cada flag, então ler o JS não entrega a resposta de graça.
   Nada é guardado: fechou a página, o placar volta a zero. */
(function () {
  'use strict';
  const ico = n => ARTE.ico(n);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  function fnv(s) {
    let h = 0x811c9dc5;
    for (const b of new TextEncoder().encode(s)) { h ^= b; h = Math.imul(h, 0x01000193) >>> 0; }
    return h.toString(16).padStart(8, '0');
  }
  // espaços em volta e minúsculas não contam: o que se testa é achar a flag, não digitá-la perfeita
  const normal = s => String(s || '').trim().toUpperCase();

  /* desafio 5: só aparece na barra de status, ao passar o mouse no link falso */
  const LINK_FALSO = 'https://stnicholas-login.net/reset?id=' + atob('U1ROe0hPVkVSX0JFRk9SRV9ZT1VfQ0xJQ0t9');

  const DESAFIOS = [
    {
      id: 'invisivel', nivel: 1, pts: 100, titulo: 'Hidden in plain sight', hash: '9e9f6706',
      intro: 'Some text on this card is written in the same colour as the background. Scammers hide words in emails like this to fool spam filters.',
      corpo: () => '<div class="ctf-papel">Nothing to see here... or is there?<br><span class="ctf-invis">STN{SELECT_ALL_THE_THINGS}</span><br>Keep looking.</div>',
      dica: 'Drag your mouse across the empty space in the card above, as if you were selecting text to copy.',
      licao: 'What you see is not always all that is there. Selecting text can reveal hidden words.'
    },
    {
      id: 'fonte', nivel: 1, pts: 100, titulo: 'Behind the page', hash: '750a5dd4',
      intro: 'Every web page is made of code your browser downloads. Someone left a note in the code of this page, where it does not show on screen.',
      corpo: () => '<div class="ctf-papel">The flag is not in this card. It is in the page itself.</div>',
      dica: 'Right-click an empty part of the page and choose "View page source" (or press Ctrl + U). Look for a comment that starts with &lt;!--',
      licao: 'Anything a website sends to your browser can be read. Never put a password or secret in a web page.'
    },
    {
      id: 'base64', nivel: 2, pts: 200, titulo: 'Not really secret', hash: 'babf92a9',
      intro: 'A message in the group chat looks like gibberish. It is in <b>Base64</b>, a way of writing data that looks scrambled but is not encryption at all.',
      corpo: () => '<div class="ctf-papel mono">U1ROe0JBU0U2NF9JU19OT1RfU0VDUkVUfQ==</div>',
      dica: 'Search for "Base64 decoder" and paste the text in. Or open the browser console (Ctrl + Shift + J) and type atob(\'U1RO...\') with the whole text.',
      licao: 'Scrambled-looking is not the same as secret. Real protection needs real encryption, and a good password.'
    },
    {
      id: 'cesar', nivel: 2, pts: 200, titulo: 'Caesar\'s note', hash: 'f64944c1',
      intro: 'You found a note in code: <span class="mono">VWQ{FDHVDU_VKLIW_WKUHH}</span>. Julius Caesar hid messages by moving every letter a few places along the alphabet.',
      corpo: () => '<div class="ctf-papel"><label class="ctf-lbl">Move each letter back by <b class="ctf-k">0</b> places</label>' +
        '<input class="ctf-slider" type="range" min="0" max="25" value="0" aria-label="Shift">' +
        '<div class="mono ctf-saida">VWQ{FDHVDU_VKLIW_WKUHH}</div></div>',
      montar(card) {
        const cifra = 'VWQ{FDHVDU_VKLIW_WKUHH}';
        const r = card.querySelector('.ctf-slider'), out = card.querySelector('.ctf-saida'), k = card.querySelector('.ctf-k');
        r.addEventListener('input', () => {
          const n = +r.value;
          k.textContent = n;
          out.textContent = cifra.replace(/[A-Z]/g, c => String.fromCharCode((c.charCodeAt(0) - 65 - n + 26) % 26 + 65));
        });
      },
      dica: 'Move the slider until the start reads "STN". The rest will make sense too.',
      licao: 'Old codes like this can be broken in seconds. That is why your passwords need to be long, not just "coded".'
    },
    {
      id: 'link', nivel: 3, pts: 300, titulo: 'Hover before you click', hash: '0ba10ec1',
      intro: 'Three links arrived "from the school". Two are real. The fake one carries the flag in its address.',
      corpo: () => '<div class="ctf-papel ctf-mail"><p><b>Subject:</b> Important: update your account</p>' +
        '<p><a data-href="https://stnicholas.com.br/">Visit the school website</a></p>' +
        '<p><a data-href="' + esc(LINK_FALSO) + '">Reset your school password</a></p>' +
        '<p><a data-href="https://stnicholas.managebac.com/">Open ManageBac</a></p>' +
        '<div class="ctf-status"></div></div>',
      montar(card) {
        const st = card.querySelector('.ctf-status');
        card.querySelectorAll('[data-href]').forEach(a => {
          a.addEventListener('mouseenter', () => { st.textContent = a.dataset.href; st.classList.add('on'); });
          a.addEventListener('mouseleave', () => st.classList.remove('on'));
          a.addEventListener('click', e => {
            e.preventDefault(); st.textContent = a.dataset.href; st.classList.add('on');
            M.toast('In real life you would already be on that page. <b>Hover</b>, do not click.', '', 'alerta');
          });
        });
      },
      dica: 'Move the mouse over each link without clicking, and read the address that appears at the bottom.',
      licao: 'The words on a link can say anything. The address underneath is the truth.'
    },
    {
      id: 'perfil', nivel: 3, pts: 300, titulo: 'Too much information', hash: '5a361e9d',
      intro: 'Leo (not a real student) forgot his password. The "forgot password" page asks a security question. Can you answer it just from his public profile?',
      corpo: () => '<div class="ctf-duas"><div class="ctf-papel ctf-perfil"><b>@leo.plays</b> · public profile' +
        '<p>Back to school! Grade 8, here we go.</p>' +
        '<p>Happy 6th birthday to the best dog in the world, Biscoito!</p>' +
        '<p>Football match on Saturday. Come on, U14s!</p></div>' +
        '<div class="ctf-papel"><b>Forgot password</b><p class="ctf-lbl">Security question: what is the name of your first pet?</p>' +
        '<div class="ctf-linha"><input class="ctf-in ctf-resp" type="text" autocomplete="off" spellcheck="false" aria-label="Answer"><button class="btn peq ctf-tenta" type="button">Reset</button></div>' +
        '<div class="ctf-revela"></div></div></div>',
      montar(card) {
        const inp = card.querySelector('.ctf-resp'), out = card.querySelector('.ctf-revela');
        const tentar = () => {
          if (fnv(normal(inp.value)) === '4fe35dbf') {
            SFX.tocar('ok');
            out.innerHTML = 'Password reset link sent. Your flag: <span class="mono">' + atob('U1ROe09WRVJTSEFSSU5HX0lTX0FfQ0xVRX0=') + '</span>';
          } else { SFX.tocar('erro'); out.textContent = 'Wrong answer. Look at his posts again.'; }
        };
        card.querySelector('.ctf-tenta').addEventListener('click', tentar);
        inp.addEventListener('keydown', e => { if (e.key === 'Enter') tentar(); });
      },
      dica: 'Read his posts. One of them names a pet.',
      licao: 'Security questions are only safe if the answer is not on your profile. Pick answers nobody could look up.'
    }
  ];
  const TOTAL = DESAFIOS.reduce((s, d) => s + d.pts, 0);
  const NIVEIS = { 1: 'Level 1', 2: 'Level 2', 3: 'Level 3' };

  const CTF = {
    abrir(voltar) {
      const feitos = new Set();
      let atual = 0;
      const raiz = M.trocar('<div class="ctf"><header class="ctf-topo"><div><div class="rotulo">Bonus unlocked</div><h2>Capture the Flag</h2></div>' +
        '<div class="ctf-placar"><b class="ctf-pts">0</b><small>/ ' + TOTAL + ' pts</small><span class="ctf-n">0 of ' + DESAFIOS.length + ' flags</span></div>' +
        '<button class="btn claro peq ctf-sair" type="button">' + ico('seta') + 'Back to results</button></header>' +
        '<nav class="ctf-lista"></nav><section class="ctf-card"></section></div>', { cheia: true });
      const lista = raiz.querySelector('.ctf-lista'), card = raiz.querySelector('.ctf-card');
      raiz.querySelector('.ctf-sair').addEventListener('click', () => { SFX.tocar('clique'); voltar(); }, { once: true });

      function pintarLista() {
        lista.innerHTML = '<p class="ctf-regras">Find each flag, written like <span class="mono">STN{...}</span>, and type it in. Hints are free.</p>' +
          DESAFIOS.map((d, k) => '<button class="ctf-item' + (k === atual ? ' sel' : '') + (feitos.has(d.id) ? ' feito' : '') + '" type="button" data-k="' + k + '">' +
            '<span class="ctf-nv">' + NIVEIS[d.nivel] + ' · ' + d.pts + '</span><span class="ctf-tt">' + esc(d.titulo) + '</span>' +
            (feitos.has(d.id) ? '<span class="ctf-ok">' + ico('bandeira') + '</span>' : '') + '</button>').join('');
        lista.querySelectorAll('.ctf-item').forEach(b => b.addEventListener('click', () => { SFX.tocar('clique'); atual = +b.dataset.k; pintar(); }));
        const pts = DESAFIOS.filter(d => feitos.has(d.id)).reduce((s, d) => s + d.pts, 0);
        raiz.querySelector('.ctf-pts').textContent = pts;
        raiz.querySelector('.ctf-n').textContent = feitos.size + ' of ' + DESAFIOS.length + ' flags';
      }

      function pintar() {
        const d = DESAFIOS[atual], feito = feitos.has(d.id);
        pintarLista();
        card.innerHTML = '<div class="rotulo">' + NIVEIS[d.nivel] + ' · ' + d.pts + ' points</div><h3>' + esc(d.titulo) + '</h3>' +
          '<p class="ctf-intro">' + d.intro + '</p>' + d.corpo() +
          '<div class="ctf-linha ctf-envio"><input class="ctf-in ctf-flag" type="text" placeholder="STN{...}" autocomplete="off" spellcheck="false" aria-label="Flag"' + (feito ? ' disabled' : '') + '>' +
          '<button class="btn peq ctf-enviar" type="button"' + (feito ? ' disabled' : '') + '>' + ico('bandeira') + 'Submit flag</button>' +
          '<button class="btn claro peq ctf-dica" type="button">' + ico('lampada') + 'Hint</button></div>' +
          '<div class="ctf-hint" hidden>' + ico('lampada') + '<span>' + d.dica + '</span></div>' +
          '<div class="ctf-msg" aria-live="polite">' + (feito ? '<b>Flag captured.</b> ' + d.licao : '') + '</div>';
        if (d.montar) d.montar(card);
        const inp = card.querySelector('.ctf-flag'), msg = card.querySelector('.ctf-msg');
        const enviar = () => {
          if (feitos.has(d.id)) return;
          if (fnv(normal(inp.value)) === d.hash) {
            feitos.add(d.id);
            M.flutuar('+' + d.pts, card.querySelector('.ctf-enviar'));
            SFX.tocar(feitos.size === DESAFIOS.length ? 'fim' : 'conquista');
            msg.className = 'ctf-msg ok';
            msg.innerHTML = '<b>Flag captured!</b> ' + d.licao;
            inp.disabled = true; card.querySelector('.ctf-enviar').disabled = true;
            pintarLista();
            if (feitos.size === DESAFIOS.length) {
              M.confete(220);
              M.toast('<b>All ' + DESAFIOS.length + ' flags!</b> You are a real Online Safety Ambassador.', 'conq', 'trofeu');
            }
          } else {
            SFX.tocar('erro');
            msg.className = 'ctf-msg no';
            msg.textContent = /^STN\{.*\}$/.test(normal(inp.value)) ? 'Not this one. Keep looking.' : 'Flags look like STN{SOMETHING_LIKE_THIS}.';
          }
        };
        card.querySelector('.ctf-enviar').addEventListener('click', enviar);
        inp.addEventListener('keydown', e => { if (e.key === 'Enter') enviar(); });
        // a dica fica na tela, ao lado do desafio: num aviso que some, ela sumiria antes de ser lida
        card.querySelector('.ctf-dica').addEventListener('click', () => { SFX.tocar('clique'); card.querySelector('.ctf-hint').hidden = false; });
      }
      pintar();
    }
  };

  window.CTF = CTF;
})();
