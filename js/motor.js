/* Online Safety Mission (PSHE · Grade 8) — motor: palco, HUD, fluxo entre telas, pontuação e conquistas.
   Cada fase fica em js/fases/*.js e se registra com M.registrar({...}); ver o comentário de M.registrar.

   Nada sai da página e nada fica guardado: sem nome, sem nota, sem progresso no navegador. O portal ainda não
   tem servidor que guarde dados de aluno com segurança (ver "No new place that collects personal data" no
   CLAUDE.md), então o jogo recomeça do zero a cada visita, de propósito. */
(function () {
  'use strict';

  const W = 1280, H = 720;
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  function el(html) { const t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstElementChild; }
  const ico = (n, c) => ARTE.ico(n, c);

  const APROVACAO = 0.7;
  const CONQ_GLOBAIS = [
    { id: 'ouro', nome: 'Gold Ambassador', desc: '90% or more on the mission', icone: 'trofeu' },
    { id: 'chamas', nome: 'On fire', desc: '10 right answers in a row', icone: 'chama' }
  ];

  /* Aberto pelo Resources do portal (?from=portal), o fim leva de volta para lá. Pelo link público, não há portal. */
  const DO_PORTAL = /[?&]from=portal\b/.test(location.search);

  const M = {
    fases: [],
    E: null,             // estado da tentativa
    escala: 1,
    _teclas: null,

    /* Uma fase é um objeto:
       { ordem, id, hora, titulo, tema, icone, missao (html), como: [[icone, texto]...], max,
         licoes: [texto...], conquista: {id, nome, desc, icone}, iniciar(api) }
       iniciar() monta a fase em api.raiz e chama api.fim() quando termina. */
    registrar(f) { this.fases.push(f); this.fases.sort((a, b) => a.ordem - b.ordem); },
    get maxTotal() { return this.fases.reduce((s, f) => s + f.max, 0); },

    /* ------------------------------------------------------------ palco */
    ajustarEscala() {
      const p = $('#palco'), w = window.innerWidth, h = window.innerHeight;
      const s = Math.min(w / W, h / H);
      this.escala = s;
      p.style.transform = 'translate(' + Math.round((w - W * s) / 2) + 'px,' + Math.round((h - H * s) / 2) + 'px) scale(' + s + ')';
    },
    /* converte um ponto da janela (clientX/Y) para coordenadas do palco */
    ponto(cx, cy) {
      const r = $('#palco').getBoundingClientRect();
      return { x: (cx - r.left) / this.escala, y: (cy - r.top) / this.escala };
    },
    centroDe(alvo) {
      if (!alvo) return { x: W / 2, y: H / 2 };
      if (alvo.x !== undefined && alvo.getBoundingClientRect === undefined) return alvo;
      const r = alvo.getBoundingClientRect();
      return this.ponto(r.left + r.width / 2, r.top + r.height / 2);
    },

    trocar(no, op) {
      op = op || {};
      const cena = $('#cena');
      $$('.tela', cena).forEach(v => {
        if (v.classList.contains('saindo')) return;
        v.classList.add('saindo');
        setTimeout(() => v.remove(), 300);
      });
      $$('.veu', $('#palco')).forEach(v => v.remove());
      cena.classList.toggle('cheia', !!op.cheia);
      $('#hud').classList.toggle('oculto', !!op.cheia);
      const t = typeof no === 'string' ? el(no) : no;
      t.classList.add('tela', 'entrando');
      cena.appendChild(t);
      t.addEventListener('animationend', e => { if (e.target === t) t.classList.remove('entrando'); });
      this._teclas = null;
      return t;
    },

    /* ------------------------------------------------------------ HUD */
    montarHud() {
      const hud = $('#hud');
      hud.innerHTML =
        '<img class="logo" src="img/logo.png" alt="St. Nicholas School">' +
        '<div class="titulo-hud">ONLINE SAFETY MISSION</div>' +
        '<div class="linha-dia">' + this.fases.map(f => '<div class="no"><i></i><span>' + f.hora + '</span></div>').join('') + '</div>' +
        '<div class="placar"><div class="sequencia" title="Right answers in a row">' + ico('chama') + '<span>x0</span></div>' +
        '<div class="pontos-hud" aria-live="polite"><span>0</span><small>PTS</small></div></div>' +
        '<button class="btn-icone" id="btn-som" type="button"></button>';
      const bs = $('#btn-som');
      const pinta = () => { bs.innerHTML = ico(SFX.ligado ? 'som' : 'mudo'); bs.setAttribute('aria-label', SFX.ligado ? 'Sound off' : 'Sound on'); bs.title = bs.getAttribute('aria-label'); };
      pinta();
      bs.addEventListener('click', () => { SFX.alternar(); pinta(); });
    },
    hudFase(i) {
      $$('.linha-dia .no').forEach((n, k) => {
        n.classList.toggle('feito', k < i);
        n.classList.toggle('atual', k === i);
      });
    },
    _pontosVis: 0,
    hudPontos(v) {
      const alvo = Math.max(0, Math.round(v)), ini = this._pontosVis, t0 = performance.now();
      const span = $('.pontos-hud span'), caixa = $('.pontos-hud');
      if (!span || alvo === ini) return;
      this._pontosVis = alvo;
      caixa.classList.add('pulo'); setTimeout(() => caixa.classList.remove('pulo'), 200);
      const passo = now => {
        const k = Math.min(1, (now - t0) / 450);
        span.textContent = Math.round(ini + (alvo - ini) * (1 - Math.pow(1 - k, 3)));
        if (k < 1) requestAnimationFrame(passo);
      };
      requestAnimationFrame(passo);
    },
    hudSequencia(n) {
      const s = $('.sequencia');
      if (!s) return;
      s.classList.toggle('on', n >= 3);
      $('span', s).textContent = 'x' + n;
    },

    /* ------------------------------------------------------------ efeitos */
    flutuar(txt, onde, neg) {
      const p = this.centroDe(onde);
      const f = el('<div class="flutua' + (neg ? ' neg' : '') + '">' + esc(txt) + '</div>');
      f.style.left = p.x + 'px'; f.style.top = p.y + 'px';
      $('#palco').appendChild(f);
      setTimeout(() => f.remove(), 1200);
    },
    toast(html, tipo, icone) {
      const t = el('<div class="toast ' + (tipo || '') + '">' + ico(icone || 'lampada') + '<span>' + html + '</span></div>');
      $('#toasts').appendChild(t);
      setTimeout(() => { t.classList.add('sai'); setTimeout(() => t.remove(), 320); }, tipo === 'conq' ? 3400 : 2800);
    },
    conquistar(c) {
      if (!c || this.E.conq.indexOf(c.id) >= 0) return false;
      this.E.conq.push(c.id);
      setTimeout(() => {
        SFX.tocar('conquista');
        this.toast('<b>Badge unlocked:</b> ' + esc(c.nome), 'conq', 'trofeu');
      }, 400);
      return true;
    },
    confete(qtd) {
      const cv = $('#confete'), c = cv.getContext('2d');
      cv.width = W; cv.height = H;
      const cores = ['#5cb947', '#a6dd98', '#002664', '#ffc72c', '#ffffff', '#2e75c7'];
      const ps = [];
      for (let i = 0; i < (qtd || 170); i++) {
        ps.push({ x: W / 2 + (Math.random() - .5) * 300, y: H * .35, vx: (Math.random() - .5) * 16, vy: -Math.random() * 15 - 4,
          r: Math.random() * 6.28, vr: (Math.random() - .5) * .3, w: 6 + Math.random() * 8, h: 4 + Math.random() * 6, cor: cores[i % cores.length] });
      }
      const t0 = performance.now();
      const quadro = now => {
        const t = now - t0;
        c.clearRect(0, 0, W, H);
        ps.forEach(p => {
          p.vy += .38; p.vx *= .99; p.x += p.vx; p.y += p.vy; p.r += p.vr;
          c.save(); c.translate(p.x, p.y); c.rotate(p.r); c.globalAlpha = Math.max(0, 1 - t / 3800);
          c.fillStyle = p.cor; c.fillRect(-p.w / 2, -p.h / 2, p.w, p.h); c.restore();
        });
        if (t < 3800) requestAnimationFrame(quadro); else c.clearRect(0, 0, W, H);
      };
      requestAnimationFrame(quadro);
    },

    /* folha de feedback que sobe sobre a cena. Devolve uma Promise resolvida no clique do botão. */
    feedback(o) {
      return new Promise(res => {
        const tipo = o.tipo || 'ok';
        const icone = tipo === 'ok' ? 'check' : tipo === 'erro' ? 'x' : 'lampada';
        const v = el('<div class="veu' + (o.centro ? ' centro' : '') + '" role="dialog" aria-modal="true">' +
          '<div class="folha ' + tipo + '"><div class="cab"><div class="selo">' + ico(icone) + '</div><h3>' + o.titulo + '</h3>' +
          (o.pts ? '<span class="pts-chip">' + esc(o.pts) + '</span>' : '') + '</div>' +
          '<div class="txt">' + (o.texto || '') + '</div>' + (o.caso ? '<div class="caso">' + o.caso + '</div>' : '') +
          '<div class="acoes"><button class="btn' + (tipo === 'erro' ? ' escuro' : '') + '" type="button">' + esc(o.botao || 'Continue') + ico('seta') + '</button></div></div></div>');
        $('#cena').appendChild(v);
        const b = $('button', v);
        setTimeout(() => b.focus(), 50);
        b.addEventListener('click', () => {
          SFX.tocar('clique');
          v.style.transition = 'opacity .2s'; v.style.opacity = '0';
          setTimeout(() => { v.remove(); res(); }, 200);
        }, { once: true });
      });
    },

    /* arrastar com o ponteiro (mouse, toque ou caneta), em coordenadas do palco.
       op.mover(dx, dy, p) e op.soltar(dx, dy, p, moveu) */
    arrastavel(no, op) {
      let ini = null, id = null, moveu = false;
      no.addEventListener('pointerdown', e => {
        if (op.pode && !op.pode()) return;
        if (e.button !== undefined && e.button !== 0) return;
        ini = this.ponto(e.clientX, e.clientY); id = e.pointerId; moveu = false;
        try { no.setPointerCapture(id); } catch (x) { /* ignora */ }
        if (op.inicio) op.inicio(ini);
      });
      no.addEventListener('pointermove', e => {
        if (!ini || e.pointerId !== id) return;
        const p = this.ponto(e.clientX, e.clientY), dx = p.x - ini.x, dy = p.y - ini.y;
        if (!moveu && Math.hypot(dx, dy) > 6) moveu = true;
        if (moveu && op.mover) op.mover(dx, dy, p);
      });
      const fim = e => {
        if (!ini || e.pointerId !== id) return;
        const p = this.ponto(e.clientX, e.clientY), dx = p.x - ini.x, dy = p.y - ini.y;
        ini = null;
        if (op.soltar) op.soltar(dx, dy, p, moveu);
      };
      no.addEventListener('pointerup', fim);
      no.addEventListener('pointercancel', fim);
    },

    /* ------------------------------------------------------------ estado (só em memória) */
    novoEstado(anterior) {
      return { r: {}, conq: anterior ? anterior.conq : [], mp: anterior ? anterior.mp : 0, fin: false };
    },
    pontosAte() { return Object.keys(this.E.r).reduce((s, k) => s + this.E.r[k], 0); },

    /* ------------------------------------------------------------ telas */
    inicio() {
      SFX.tocar('whoosh');
      const t = this.trocar(
        '<div class="inicio">' + ARTE.onda('onda') +
        '<div class="conteudo"><div class="rotulo">PSHE · Grade 8 · Online safety</div>' +
        '<h1>Online<br><em>Safety</em><br>Mission</h1>' +
        '<div class="sub">ONE SCHOOL DAY · NINE CHALLENGES</div>' +
        '<p class="convite">Scams written by AI, fake friends and copycat websites. Live one school day and decide every situation as your class\'s Online Safety Ambassador.</p>' +
        '<div class="acoes"><button class="btn" id="comecar" type="button">' + ico('play') + 'Start the mission</button></div></div>' +
        ARTE.ilustracao('ilus') +
        '<img class="logo-ini" src="img/logo.png" alt="St. Nicholas School">' +
        '<div class="meta"><span>' + ico('relogio') + 'About 15 minutes</span><span>' + ico('som') + 'Sound (optional)</span><span>' + ico('trofeu') + 'Pass with 70%</span></div></div>',
        { cheia: true });
      const b = $('#comecar', t);
      setTimeout(() => b.focus(), 400);
      b.addEventListener('click', () => { SFX.tocar('clique'); this.briefing(); }, { once: true });
    },

    briefing() {
      this.E.r = {}; this.E.fin = false;
      this._pontosVis = 0; $('.pontos-hud span').textContent = '0';
      this.seq = 0; this.hudSequencia(0); this.hudFase(-1);
      const t = this.trocar(
        '<div class="briefing"><div class="esq"><div class="rotulo">Mission briefing</div>' +
        '<h2>Good morning! Today you are your class\'s Online Safety Ambassador.</h2>' +
        '<p>Over one school day, nine situations will test how sharp you are. They are <strong>based on real scams that target students</strong>.</p>' +
        '<div class="regras">' +
        '<div class="regra"><i>' + ico('estrela') + '</i><span>Every right decision earns points. Get several in a row to light up your streak.</span></div>' +
        '<div class="regra"><i>' + ico('lampada') + '</i><span>Got one wrong? You see why straight away, and carry on.</span></div>' +
        '<div class="regra"><i>' + ico('trofeu') + '</i><span>Score 70% to complete the mission and unlock a bonus challenge.</span></div></div>' +
        '<button class="btn" id="bater" type="button">' + ico('relogio') + 'Start the day: 08:00</button></div>' +
        '<div class="agenda">' + this.fases.map((f, k) =>
          '<div class="item" style="animation-delay:' + (0.15 + k * 0.07) + 's"><span class="hora">' + f.hora + '</span><span class="ico">' + ico(f.icone) + '</span>' +
          '<span><div class="nome">' + esc(f.titulo) + '</div><div class="tema">' + esc(f.tema) + '</div></span></div>').join('') + '</div></div>');
      const b = $('#bater', t);
      setTimeout(() => b.focus(), 500);
      b.addEventListener('click', () => { SFX.tocar('clique'); this.introFase(0); }, { once: true });
    },

    introFase(i) {
      const f = this.fases[i];
      this.hudFase(i);
      SFX.tocar('whoosh');
      const t = this.trocar(
        '<div class="intro-fase"><div class="faixa"><div class="relogio"><div class="n">' + f.hora + '</div><div class="f">Challenge ' + (i + 1) + ' of ' + this.fases.length + '</div></div>' +
        '<div class="grande-ico">' + ico(f.icone) + '</div></div>' +
        '<div class="dir"><div class="rotulo">' + esc(f.tema) + '</div><h2>' + esc(f.titulo) + '</h2><p class="missao">' + f.missao + '</p>' +
        '<div class="como"><h4>How to play</h4>' + f.como.map(c => '<div>' + ico(c[0]) + '<span>' + c[1] + '</span></div>').join('') + '</div>' +
        '<button class="btn" id="ir" type="button">' + ico('play') + 'Start</button></div></div>');
      const b = $('#ir', t);
      setTimeout(() => b.focus(), 450);
      b.addEventListener('click', () => { SFX.tocar('clique'); this.jogarFase(i); }, { once: true });
    },

    seq: 0,
    jogarFase(i) {
      const f = this.fases[i], self = this;
      if (this._st && this._st.ativo) { this._st.ativo = false; this._st.timers.forEach(clearTimeout); }
      const raiz = this.trocar('<div class="jogo jogo-' + f.id + '"></div>');
      const st = { p: 0, acertos: 0, erros: 0, ativo: true, timers: [] };
      this._st = st;
      const base = this.pontosAte();
      const atualiza = () => self.hudPontos(base + Math.max(0, Math.min(f.max, st.p)));
      const api = {
        raiz, fase: f, st,
        acerto(pts, onde, rotulo) {
          st.p += pts; st.acertos++;
          self.seq++; self.hudSequencia(self.seq);
          if (self.seq === 5) self.toast('5 in a row!', '', 'chama');
          if (self.seq === 10) self.conquistar(CONQ_GLOBAIS[1]);
          SFX.tocar('ok');
          if (pts) self.flutuar(rotulo || ('+' + pts), onde);
          atualiza();
        },
        parcial(pts, onde) {
          st.p += pts; self.seq = 0; self.hudSequencia(0);
          SFX.tocar('leve');
          if (pts) self.flutuar('+' + pts, onde);
          atualiza();
        },
        erro(onde, pen) {
          st.erros++; self.seq = 0; self.hudSequencia(0);
          SFX.tocar('erro');
          if (pen) { st.p -= pen; self.flutuar('−' + pen, onde, true); atualiza(); }
        },
        // o original mandava cada decisão para o LMS; aqui nada sai da página
        registrar() {},
        feedback: o => self.feedback(o),
        toast: (h, t, i2) => self.toast(h, t, i2),
        som: n => SFX.tocar(n),
        teclas(fn) { self._teclas = fn; },
        depois(ms, fn) { const id = setTimeout(() => { if (st.ativo) fn(); }, ms); st.timers.push(id); return id; },
        espera: ms => new Promise(r => { const id = setTimeout(r, ms); st.timers.push(id); }),
        flutuar: (t, o, n) => self.flutuar(t, o, n),
        arrastavel: (n, o) => self.arrastavel(n, o),
        ponto: (x, y) => self.ponto(x, y),
        centroDe: n => self.centroDe(n),
        fim(extra) {
          if (!st.ativo) return;
          st.ativo = false; st.timers.forEach(clearTimeout); self._teclas = null;
          self.resultadoFase(i, st, extra || {});
        }
      };
      f.iniciar(api);
    },

    resultadoFase(i, st, extra) {
      const f = this.fases[i];
      const p = Math.max(0, Math.min(f.max, Math.round(st.p)));
      this.E.r[f.id] = p;
      const ult = i === this.fases.length - 1;
      this.hudPontos(this.pontosAte());
      const k = p / f.max, est = k >= 0.9 ? 3 : k >= 0.6 ? 2 : 1;
      const perfeito = p === f.max && extra.perfeito !== false;
      const ganhou = perfeito && f.conquista ? this.conquistar(f.conquista) : false;
      const titulos = ['Challenge complete', 'Good work!', 'Excellent!'];
      const prox = ult ? null : this.fases[i + 1];
      const t = this.trocar(
        '<div class="resultado"><div class="cartao-res"><div class="topo"><div class="estrelas">' +
        [0, 1, 2].map(n => ico('estrela', n < est ? 'on' : '')).join('') + '</div>' +
        '<div><h2>' + (perfeito ? 'Perfect!' : titulos[est - 1]) + '</h2><div class="pts"><b>' + p + '</b> of ' + f.max + ' points in <i>' + esc(f.titulo) + '</i></div></div></div>' +
        '<div class="licoes"><h4>What to take away</h4>' + f.licoes.map(l => '<div>' + ico('check') + '<span>' + l + '</span></div>').join('') + '</div>' +
        '<div class="rodape">' + (ganhou ? '<div class="selo-conq">' + ARTE.medalha('ouro', f.conquista.icone, 'medalha-mini') + '<span><b>' + esc(f.conquista.nome) + '</b>' + esc(f.conquista.desc) + '</span></div>' : '<span></span>') +
        '<button class="btn" id="prox" type="button">' + (prox ? 'Next: ' + prox.hora + ' · ' + esc(prox.titulo) : 'See your mission result') + ico('seta') + '</button></div></div></div>');
      $$('.estrelas svg', t).forEach((s, n) => setTimeout(() => { s.classList.add('mostra'); if (n < est) SFX.tocar('estrela'); }, 350 + n * 260));
      if (ganhou) setTimeout(() => { const s = $('.selo-conq', t); if (s) s.classList.add('mostra'); }, 50);
      if (perfeito) setTimeout(() => this.confete(90), 500);
      const b = $('#prox', t);
      setTimeout(() => b.focus(), 600);
      b.addEventListener('click', () => { SFX.tocar('clique'); ult ? this.final() : this.introFase(i + 1); }, { once: true });
    },

    final() {
      const total = this.pontosAte(), max = this.maxTotal, pct = total / max;
      const E = this.E;
      E.fin = true;
      E.mp = Math.max(E.mp || 0, total);
      // o bônus abre com a melhor tentativa: quem passou e jogou de novo para melhorar não o perde
      const aprovado = E.mp / max >= APROVACAO;
      if (pct >= 0.9) this.conquistar(CONQ_GLOBAIS[0]);
      this.hudFase(this.fases.length);
      const nivel = pct >= 0.9 ? ['ouro', 'Gold Ambassador'] : pct >= 0.8 ? ['prata', 'Silver Ambassador'] : pct >= APROVACAO ? ['bronze', 'Bronze Ambassador'] : ['cinza', 'Ambassador in training'];
      const passou = pct >= APROVACAO;
      const todas = this.fases.filter(f => f.conquista).map(f => f.conquista).concat(CONQ_GLOBAIS);
      const t = this.trocar(
        '<div class="final">' +
        '<div class="esq"><div class="rotulo">End of the day · 18:00</div>' +
        '<h1>' + (passou ? 'Mission complete!' : pct >= 0.55 ? 'Nearly there!' : 'Try again?') + '</h1>' +
        '<div class="nome">' + (passou ? 'You kept yourself and your friends safe all day.' : pct >= 0.55 ? 'So close: play again to reach 70%.' : 'Now you know today\'s scams. Play again: you pass with 70%.') + '</div>' +
        ARTE.medalha(nivel[0], passou ? 'escudo' : 'replay', 'medalha') +
        '<div class="pct"><span id="pct-n">0</span>%<small>' + total + ' of ' + max + ' points</small></div>' +
        '<div class="status ' + (passou ? 'ok' : 'no') + '">' + ico(passou ? 'check' : 'replay') + nivel[1].toUpperCase() + '</div></div>' +
        '<div class="dir"><div class="painel-final"><h4><span>Badges</span><span>' + todas.filter(c => E.conq.indexOf(c.id) >= 0).length + ' of ' + todas.length + '</span></h4><div class="conquistas">' +
        todas.map(c => '<div class="conq' + (E.conq.indexOf(c.id) >= 0 ? '' : ' off') + '" title="' + esc(c.desc) + '">' + ARTE.medalha('ouro', c.icone) + esc(c.nome) + '</div>').join('') + '</div></div>' +
        '<div class="painel-final"><h4><span>Your day</span><span>points per challenge</span></h4><div class="fases-res">' +
        this.fases.map(f => { const p = E.r[f.id] || 0, k = p / f.max; return '<div class="fase-res"><span class="h">' + f.hora + '</span><span>' + esc(f.titulo) + '</span><span class="barra"><i class="' + (k < 0.7 ? 'medio' : '') + '" data-w="' + Math.round(k * 100) + '"></i></span><span class="p">' + p + '/' + f.max + '</span></div>'; }).join('') +
        '</div></div></div>' +
        '<div class="acoes">' +
        (aprovado ? '<button class="btn bonus" id="ctf" type="button">' + ico('bandeira') + 'Bonus: Capture the Flag</button>' : '') +
        '<button class="btn' + (aprovado ? ' claro' : '') + '" id="denovo" type="button">' + ico('replay') + (passou ? 'Play again' : 'Try again') + '</button>' +
        '<button class="btn claro" id="sair" type="button">' + ico('sair') + 'Finish</button>' +
        '</div></div>', { cheia: true });
      SFX.tocar(passou ? 'fim' : 'leve');
      if (passou) { this.confete(220); setTimeout(() => this.confete(140), 900); }
      const pn = $('#pct-n', t), alvo = Math.round(pct * 100), t0 = performance.now();
      const conta = now => { const k = Math.min(1, (now - t0) / 1400); pn.textContent = Math.round(alvo * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(conta); };
      requestAnimationFrame(conta);
      setTimeout(() => $$('.fase-res .barra i', t).forEach(i => { i.style.width = i.dataset.w + '%'; }), 500);
      const ctf = $('#ctf', t);
      if (ctf) {
        setTimeout(() => ctf.focus(), 700);
        ctf.addEventListener('click', () => { SFX.tocar('clique'); CTF.abrir(() => this.final()); }, { once: true });
      }
      $('#denovo', t).addEventListener('click', () => {
        SFX.tocar('clique');
        this.E = this.novoEstado(E);
        this.briefing();
      }, { once: true });
      $('#sair', t).addEventListener('click', () => { SFX.tocar('clique'); this.encerrar(); }, { once: true });
    },

    encerrar() {
      if (DO_PORTAL) { location.href = '../../#resources'; return; }
      this.trocar('<div class="encerrado"><div><h2>Thank you for taking part!</h2>' +
        '<p>If anything online ever worries you, talk to a trusted adult: your family, your form tutor or the school counsellor.</p>' +
        '<p style="margin-top:10px">You can close this window now.</p></div></div>', { cheia: true });
    },

    /* ------------------------------------------------------------ partida */
    iniciar() {
      this.ajustarEscala();
      window.addEventListener('resize', () => this.ajustarEscala());
      document.addEventListener('keydown', e => { if (this._teclas) this._teclas(e); });
      this.montarHud();
      this.E = this.novoEstado(null);
      // atalho de teste: index.html?fase=N abre direto a fase N (1 a 9); ?fase=fim, a tela final aprovada
      const q = /[?&]fase=(\d+|fim)/.exec(location.search);
      if (q && q[1] === 'fim') { this.fases.forEach(f => { this.E.r[f.id] = f.max; }); this.final(); return; }
      if (q) { const n = Math.min(this.fases.length, Math.max(1, +q[1])) - 1; this.introFase(n); return; }
      this.inicio();
    }
  };

  window.M = M;
  window.addEventListener('DOMContentLoaded', () => M.iniciar());
})();
