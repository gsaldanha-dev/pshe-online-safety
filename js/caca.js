/* Online Safety Mission — mecânica de "encontre os riscos" (fases 1 e 8).
   A cena tem elementos [data-alvo]: os que estão em `riscos` valem pontos, os que estão em `iscas` custam 2 pontos
   (para não valer a pena clicar em tudo). Tudo o que é clicável ganha o mesmo contorno no hover, então a fase testa
   o julgamento, não a pontaria. */
(function () {
  'use strict';
  const NS = 'http://www.w3.org/2000/svg';
  // 3 pontos por isca e dica só depois de 40 s: com 2 e 20 s, clicar em tudo e esperar a dica ainda compensava
  const PTS = 10, PEN = 3, DICA_MS = 40000;

  M.caca = function (api, o) {
    return new Promise(res => {
      const achados = new Set(), iscasVistas = new Set();
      let ativo = true, timerDica = null, balao = null;
      const total = o.riscos.length;
      const porId = {};
      o.riscos.forEach(r => { porId[r.id] = r; });

      o.painel.innerHTML =
        '<h3>' + o.tituloPainel + '<span class="cont"><span>0</span><small>/' + total + '</small></span></h3>' +
        '<p class="instr">' + o.instrucao + '</p>' +
        '<ol class="achados">' + o.riscos.map((r, k) => '<li><span class="num">' + (k + 1) + '</span><span>Not found yet</span></li>').join('') + '</ol>' +
        '<button class="btn escuro peq" type="button">' + o.botaoFim + '</button>';
      const slots = Array.from(o.painel.querySelectorAll('.achados li'));
      const cont = o.painel.querySelector('.cont span');
      const btnFim = o.painel.querySelector('button');

      function preencher(r, perdido) {
        const li = slots.find(s => !s.classList.contains('ok') && !s.classList.contains('perdido'));
        li.className = perdido ? 'perdido' : 'ok';
        li.querySelector('span:last-child').innerHTML = '<b>' + r.titulo + '</b>' + r.dica;
        return slots.indexOf(li) + 1;
      }
      function marcar(r, alvo, perdido, num) {
        if (alvo instanceof SVGElement) {
          const c = document.createElementNS(NS, 'circle');
          c.setAttribute('cx', r.cx); c.setAttribute('cy', r.cy); c.setAttribute('r', r.r);
          c.setAttribute('class', 'anel' + (perdido ? ' perdido' : ''));
          o.aneis.appendChild(c);
          if (!perdido) {
            const g = document.createElementNS(NS, 'g');
            g.setAttribute('class', 'marca-ok');
            const x = r.cx + r.r * 0.7, y = r.cy - r.r * 0.7;
            g.innerHTML = '<circle cx="' + x + '" cy="' + y + '" r="13" fill="#3e9b2f" stroke="#fff" stroke-width="3"/>' +
              '<path d="M' + (x - 6) + ' ' + y + 'l4 4 8-8" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>';
            o.aneis.appendChild(g);
          } else {
            // número do painel ao lado do anel amarelo: quem não achou vê na cena onde estava cada risco
            const g = document.createElementNS(NS, 'g');
            g.setAttribute('class', 'marca-ok');
            const x = r.cx + r.r * 0.7, y = r.cy - r.r * 0.7;
            g.innerHTML = '<circle cx="' + x + '" cy="' + y + '" r="14" fill="#e9a21b" stroke="#fff" stroke-width="3"/>' +
              '<text x="' + x + '" y="' + (y + 5) + '" text-anchor="middle" font-family="Metropolis, sans-serif" font-weight="900" font-size="15" fill="#fff">' + num + '</text>';
            o.aneis.appendChild(g);
          }
        } else {
          alvo.classList.add(perdido ? 'perdido' : 'marcado');
          if (perdido) alvo.setAttribute('data-n', num);
        }
      }
      function alvoDe(id) { return o.cena.querySelector('[data-alvo="' + id + '"]'); }

      function rearmarDica() {
        clearTimeout(timerDica);
        timerDica = setTimeout(() => {
          if (!ativo) return;
          const falta = o.riscos.filter(r => !achados.has(r.id));
          if (!falta.length) return;
          const r = falta[Math.floor(Math.random() * falta.length)], a = alvoDe(r.id);
          a.classList.remove('brilho-dica'); void a.getBoundingClientRect(); a.classList.add('brilho-dica');
          api.toast(o.dicaOnde && o.dicaOnde(r, a) || 'Hint: look at what is glowing.', '', 'lampada');
          rearmarDica();
        }, DICA_MS);
      }

      function mostrarBalao(txt, p) {
        if (balao) balao.remove();
        balao = document.createElement('div');
        balao.className = 'balao-isca';
        balao.textContent = txt;
        balao.style.left = p.x + 'px'; balao.style.top = p.y + 'px';
        document.getElementById('palco').appendChild(balao);
        const b = balao;
        setTimeout(() => { if (b.parentNode) b.remove(); }, 2200);
      }

      function clicar(alvo, ev) {
        if (!ativo) return;
        const id = alvo.getAttribute('data-alvo');
        const p = ev && ev.clientX !== undefined && ev.clientX !== 0 ? api.ponto(ev.clientX, ev.clientY) : api.centroDe(alvo);
        if (porId[id]) {
          if (achados.has(id)) return;
          achados.add(id);
          const r = porId[id];
          marcar(r, alvo, false);
          preencher(r, false);
          cont.textContent = achados.size;
          api.acerto(PTS, p);
          rearmarDica();
          if (achados.size === total) terminar(true);
        } else if (o.iscas[id]) {
          if (!iscasVistas.has(id)) { iscasVistas.add(id); api.erro(p, PEN); } else api.som('leve');
          mostrarBalao(o.iscas[id], p);
        }
      }

      o.cena.addEventListener('click', e => {
        const a = e.target.closest('[data-alvo]');
        if (a && o.cena.contains(a)) clicar(a, e);
      });
      o.cena.addEventListener('keydown', e => {
        if ((e.key === 'Enter' || e.key === ' ') && e.target.closest && e.target.closest('[data-alvo]')) {
          e.preventDefault(); clicar(e.target.closest('[data-alvo]'), null);
        }
      });
      btnFim.addEventListener('click', () => { api.som('clique'); terminar(false); });

      async function terminar(todos) {
        if (!ativo) return;
        ativo = false;
        clearTimeout(timerDica);
        btnFim.disabled = true;
        const falta = o.riscos.filter(r => !achados.has(r.id));
        o.riscos.forEach(r => api.registrar(r.id, achados.has(r.id) ? 'encontrou' : 'nao_encontrou', achados.has(r.id), r.titulo));
        if (iscasVistas.size) api.registrar('iscas', Array.from(iscasVistas).join(','), false, 'Clicked safe items');
        for (const r of falta) {
          const n = preencher(r, true);
          marcar(r, alvoDe(r.id), true, n);
          await api.espera(220);
        }
        if (o.antesDoFeedback) await o.antesDoFeedback(achados);
        // o resumo fica no painel, sem cobrir a cena: a pessoa continua vendo onde estava cada risco que faltou
        btnFim.remove();
        o.painel.classList.add('fim');
        const resumo = document.createElement('div');
        resumo.className = 'resumo-caca ' + (todos ? 'ok' : 'info');
        resumo.innerHTML = '<b>' + (todos ? o.textoTodos.titulo : 'You found ' + achados.size + ' of ' + total) + '</b>' +
          '<span>' + (todos ? o.textoTodos.texto : o.textoParcial) + '</span>';
        o.painel.appendChild(resumo);
        const b = document.createElement('button');
        b.className = 'btn peq'; b.type = 'button';
        b.innerHTML = 'See your result' + ARTE.ico('seta');
        o.painel.appendChild(b);
        api.som(todos ? 'ok' : 'leve');
        setTimeout(() => b.focus(), 100);
        b.addEventListener('click', () => { api.som('clique'); res({ achados: achados.size, iscas: iscasVistas.size }); }, { once: true });
      }

      rearmarDica();
    });
  };
})();
