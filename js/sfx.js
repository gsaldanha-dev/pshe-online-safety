/* Online Safety Mission — efeitos sonoros sintetizados (Web Audio, sem arquivos de áudio).
   Volume baixo de propósito: o jogo roda em sala de aula. O botão de som do topo liga/desliga.
   A escolha não fica salva: no portal, só o store.js grava no navegador, e este jogo não guarda nada. */
(function () {
  'use strict';
  let ctx = null, mestre = null;
  let ligado = true;

  function audio() {
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
      mestre = ctx.createGain();
      mestre.gain.value = 0.16;
      mestre.connect(ctx.destination);
    }
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }

  function nota(freq, ini, dur, tipo, vol, ate) {
    const c = ctx, o = c.createOscillator(), g = c.createGain();
    o.type = tipo || 'sine';
    o.frequency.setValueAtTime(freq, c.currentTime + ini);
    if (ate) o.frequency.exponentialRampToValueAtTime(ate, c.currentTime + ini + dur);
    g.gain.setValueAtTime(0.0001, c.currentTime + ini);
    g.gain.exponentialRampToValueAtTime(vol || 0.6, c.currentTime + ini + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + ini + dur);
    o.connect(g); g.connect(mestre);
    o.start(c.currentTime + ini); o.stop(c.currentTime + ini + dur + 0.05);
  }

  function ruido(ini, dur, de, ate, vol) {
    const c = ctx, n = Math.floor(c.sampleRate * dur), buf = c.createBuffer(1, n, c.sampleRate), d = buf.getChannelData(0);
    for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
    const s = c.createBufferSource(); s.buffer = buf;
    const f = c.createBiquadFilter(); f.type = 'bandpass'; f.Q.value = 1.2;
    f.frequency.setValueAtTime(de, c.currentTime + ini);
    f.frequency.exponentialRampToValueAtTime(ate, c.currentTime + ini + dur);
    const g = c.createGain();
    g.gain.setValueAtTime(0.0001, c.currentTime + ini);
    g.gain.exponentialRampToValueAtTime(vol || 0.5, c.currentTime + ini + dur * 0.3);
    g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + ini + dur);
    s.connect(f); f.connect(g); g.connect(mestre);
    s.start(c.currentTime + ini);
  }

  const SONS = {
    clique() { nota(820, 0, 0.05, 'sine', 0.35); },
    ok() { nota(660, 0, 0.12, 'triangle', 0.6); nota(990, 0.08, 0.22, 'triangle', 0.6); },
    erro() { nota(210, 0, 0.22, 'square', 0.18, 150); nota(160, 0.1, 0.25, 'square', 0.15, 120); },
    leve() { nota(330, 0, 0.12, 'triangle', 0.35, 280); },
    whoosh() { ruido(0, 0.35, 400, 3200, 0.35); },
    notif() { nota(1046, 0, 0.1, 'sine', 0.5); nota(1318, 0.1, 0.18, 'sine', 0.5); },
    vibra() { for (let i = 0; i < 4; i++) nota(110, i * 0.18, 0.12, 'sawtooth', 0.12); },
    toque() { for (let i = 0; i < 2; i++) { nota(880, i * 0.5, 0.18, 'sine', 0.4); nota(698, i * 0.5 + 0.2, 0.2, 'sine', 0.4); } },
    estrela() { nota(1318, 0, 0.18, 'triangle', 0.4); nota(1760, 0.06, 0.25, 'sine', 0.25); },
    conquista() { [523, 659, 784, 1046].forEach((f, i) => nota(f, i * 0.09, 0.3, 'triangle', 0.5)); },
    fim() { [392, 523, 659, 784, 659, 784, 1046].forEach((f, i) => nota(f, i * 0.12, i === 6 ? 0.7 : 0.18, 'triangle', 0.5)); },
    digita() { nota(1600 + Math.random() * 400, 0, 0.025, 'square', 0.06); }
  };

  window.SFX = {
    get ligado() { return ligado; },
    alternar() {
      ligado = !ligado;
      if (ligado) this.tocar('clique');
      return ligado;
    },
    tocar(nome) {
      if (!ligado || !SONS[nome]) return;
      try { if (audio()) SONS[nome](); } catch (e) { /* áudio indisponível */ }
    }
  };
})();
