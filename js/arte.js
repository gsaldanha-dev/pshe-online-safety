/* Online Safety Mission — ícones e ilustrações em SVG (desenhados à mão, na paleta do treinamento) */
(function () {
  'use strict';

  const P = {
    check: '<path d="M20 6 9 17l-5-5"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
    seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    relogio: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    email: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    chat: '<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.4A8 8 0 1 1 21 12z"/><path d="M8.5 12h.01M12 12h.01M15.5 12h.01"/>',
    pasta: '<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
    robo: '<rect x="5" y="8" width="14" height="11" rx="3"/><path d="M12 4v4M2 13v3M22 13v3"/><circle cx="12" cy="3.5" r="1"/><circle cx="9.5" cy="13" r="1.2"/><circle cx="14.5" cy="13" r="1.2"/>',
    chave: '<circle cx="7.5" cy="15.5" r="4.5"/><path d="M10.7 12.3 20 3M16 7l3 3M14 9l2 2"/>',
    globo: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18"/>',
    camera: '<rect x="3" y="7" width="18" height="13" rx="2"/><circle cx="12" cy="13.5" r="3.5"/><path d="m8 7 1.5-3h5L16 7"/>',
    alerta: '<path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/>',
    som: '<path d="M11 5 6 9H2v6h4l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14"/>',
    mudo: '<path d="M11 5 6 9H2v6h4l5 4z"/><path d="m22 9-6 6M16 9l6 6"/>',
    escudo: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="m9 12 2 2 4-4"/>',
    reportar: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M12 8v4M12 16h.01"/>',
    lupa: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
    clique: '<path d="m5 3 6 16 2.5-6.5L20 10z"/>',
    arrastar: '<path d="M8 12V5.5a1.5 1.5 0 0 1 3 0V11M11 10.5V4a1.5 1.5 0 0 1 3 0v7M14 10V5.5a1.5 1.5 0 0 1 3 0V13c0 4-2.5 8-7 8-3 0-4.5-1.5-6-4l-2-3.5a1.5 1.5 0 0 1 2.6-1.5L8 14"/>',
    teclado: '<rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M7 14h10"/>',
    lampada: '<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.5 1 2.5h6c0-1 .3-1.8 1-2.5A6 6 0 0 0 12 3z"/>',
    cadeado: '<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
    usuario: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    telefone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>',
    desligar: '<path d="M10.7 13.3a16 16 0 0 0 3.4 2.6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2v3a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7"/><path d="m22 2-20 20"/>',
    bandeira: '<path d="M4 22V4M4 4h13l-2 4 2 4H4"/>',
    documento: '<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M8 13h8M8 17h5"/>',
    olho: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    bloqueio: '<circle cx="12" cy="12" r="9"/><path d="m5.6 5.6 12.8 12.8"/>',
    replay: '<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/>',
    sair: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>',
    trofeu: '<path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3"/>',
    predio: '<path d="M4 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16M16 9h2a2 2 0 0 1 2 2v10M2 21h20M8 7h4M8 11h4M8 15h4"/>',
    megafone: '<path d="M3 11v2a1 1 0 0 0 1 1h2l5 4V6L6 10H4a1 1 0 0 0-1 1z"/><path d="M15 8a5 5 0 0 1 0 8M18 5a9 9 0 0 1 0 14"/>',
    monitor: '<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>',
    grafico: '<path d="M3 3v18h18"/><path d="m7 15 4-4 3 3 6-6"/>',
    celular: '<rect x="6" y="2" width="12" height="20" rx="2"/><path d="M11 18h2"/>',
    pessoas: '<circle cx="9" cy="8" r="4"/><path d="M2 21a7 7 0 0 1 14 0M16 3.5a4 4 0 0 1 0 8M22 21a7 7 0 0 0-4-6.3"/>',
    calendario: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
    regra: '<path d="M3 5h18l-7 8v6l-4 2v-8z"/>',
    programa: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M7 6.5h.01M10 6.5h.01"/>',
    enviar: '<path d="M22 2 11 13M22 2l-7 20-4-9-9-4z"/>',
    pare: '<circle cx="12" cy="12" r="9"/><rect x="9" y="9" width="6" height="6" rx="1"/>',
    nota: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/>',
    dinheiro: '<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="3"/><path d="M6 12h.01M18 12h.01"/>',
    idioma: '<path d="m5 8 6 6M4 14l6-6 2-3M2 5h12M7 2h1M22 22l-5-10-5 10M14 18h6"/>',
    usb: '<rect x="8" y="9" width="8" height="12" rx="2"/><path d="M10 9V4h4v5M11 6h.01M13 6h.01"/>',
    impressora: '<path d="M6 9V3h12v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M6 14h12v7H6z"/>',
    raio: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
    sinal: '<path d="M2 20h.01M7 20v-4M12 20v-8M17 20V8M22 4v16"/>',
    estrela: '<path fill="currentColor" stroke="none" d="m12 2.5 2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9z"/>',
    chama: '<path fill="currentColor" stroke="none" d="M12 2c1 4 5 5.5 5 11a5 5 0 0 1-10 0c0-2.5 1.2-4 2.5-5 .2 2 1 3 2 3.5C11 9 11 5 12 2z"/>',
    play: '<path fill="currentColor" stroke="none" d="M7 4v16l13-8z"/>',
    gamepad: '<path d="M6 9h12a4 4 0 0 1 4 4v1a3 3 0 0 1-5.5 1.7L15 14H9l-1.5 1.7A3 3 0 0 1 2 14v-1a4 4 0 0 1 4-4z"/><path d="M7 11v3M5.5 12.5h3M16 12h.01M18 13.5h.01"/>',
    casa: '<path d="M3 11 12 4l9 7"/><path d="M5 10v10h14V10M10 20v-6h4v6"/>'
  };

  function ico(nome, cls) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"' +
      (cls ? ' class="' + cls + '"' : '') + '>' + (P[nome] || P.alerta) + '</svg>';
  }

  /* onda do topo dos slides (mesmo desenho do img0.svg do treinamento) */
  function onda(cls) {
    return '<svg class="' + (cls || 'onda') + '" viewBox="0 0 807.96 176.11" aria-hidden="true">' +
      '<path d="M339.82 78.32S545.13 151.33 807.96 176.11V61.95S590.26 107.08 339.82 78.32Z" fill="#5CB947"/>' +
      '<path d="M0 0s381.42 144.42 807.96 77.96V0Z" fill="#002664"/></svg>';
  }

  const CORES_MEDALHA = {
    ouro: ['#f8d36a', '#e0a01c', '#a86f0a'],
    prata: ['#eef1f3', '#b9c1c7', '#7f8a92'],
    bronze: ['#f0b47c', '#c27a3c', '#8a4f1f'],
    cinza: ['#dfe5dd', '#a6b0a9', '#6d7770']
  };
  function medalha(tipo, icone, cls) {
    const c = CORES_MEDALHA[tipo] || CORES_MEDALHA.cinza;
    const id = 'g' + Math.random().toString(36).slice(2, 8);
    return '<svg viewBox="0 0 120 120" class="' + (cls || '') + '" aria-hidden="true">' +
      '<defs><linearGradient id="' + id + '" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="' + c[0] + '"/><stop offset="1" stop-color="' + c[1] + '"/></linearGradient></defs>' +
      '<path d="M38 6h18l10 34H48z" fill="#3e9b2f"/><path d="M82 6H64L54 40h18z" fill="#002664"/>' +
      '<circle cx="60" cy="72" r="40" fill="' + c[2] + '"/><circle cx="60" cy="70" r="40" fill="url(#' + id + ')"/>' +
      '<circle cx="60" cy="70" r="31" fill="none" stroke="' + c[2] + '" stroke-opacity=".35" stroke-width="3"/>' +
      '<g transform="translate(40 50) scale(1.666)" color="' + c[2] + '">' + ico(icone || 'estrela').replace('<svg ', '<svg width="24" height="24" ') + '</g></svg>';
  }

  /* ------------------------------------------------------------------ cena da fase 1: uma mesa da biblioteca às 08:05 */
  function texto(x, y, t, tam, cor, peso, extra) {
    return '<text x="' + x + '" y="' + y + '" font-family="Metropolis, Segoe UI, sans-serif" font-size="' + tam + '" font-weight="' + (peso || 500) +
      '" fill="' + cor + '"' + (extra || '') + '>' + t + '</text>';
  }
  function contorno(x, y, w, h, r) {
    return '<rect class="contorno" x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="' + (r || 12) + '"/>';
  }

  function mesa() {
    const s = [];
    s.push('<svg viewBox="0 0 920 624" role="img" aria-label="A desk in the library at 08:05">');
    // parede, piso, rodapé
    s.push('<rect width="920" height="460" fill="#eef2f8"/><rect y="460" width="920" height="164" fill="#dfe5ee"/><rect y="456" width="920" height="8" fill="#c8d2e2"/>');
    s.push('<path d="M0 560 L920 520 L920 624 L0 624Z" fill="#d3dbe8" opacity=".6"/>');
    // janela com a cidade
    s.push('<rect x="452" y="34" width="260" height="122" rx="6" fill="#c8d2e2"/><rect x="460" y="42" width="244" height="106" rx="3" fill="#d8ecf5"/>');
    s.push('<path d="M460 148V112h22V96h18v20h16V84h24v64zM560 148v-46h20V88h22v24h18v36zM640 148V100h26v-8h16v56z" fill="#a9c7d6"/>');
    s.push('<rect x="580" y="42" width="4" height="106" fill="#c8d2e2"/>');
    // relógio (isca)
    s.push('<g data-alvo="relogio" tabindex="0" role="button" aria-label="Wall clock">' + contorno(84, 34, 92, 92, 46) +
      '<circle cx="130" cy="80" r="38" fill="#fff" stroke="#002664" stroke-width="6"/><path d="M130 80V54M130 80l20 0" stroke="#002664" stroke-width="5" stroke-linecap="round" transform="rotate(-105 130 80)"/>' +
      '<path d="M130 80 V58" stroke="#3e9b2f" stroke-width="4" stroke-linecap="round" transform="rotate(180 130 80)"/><circle cx="130" cy="80" r="4" fill="#002664"/></g>');
    // quadro da carta mensal (isca: informação pública)
    s.push('<g data-alvo="quadro" tabindex="0" role="button" aria-label="Lunch menu poster">' + contorno(252, 36, 150, 150) +
      '<rect x="260" y="44" width="134" height="134" rx="4" fill="#002664"/><rect x="270" y="54" width="114" height="114" fill="#fff"/>' +
      texto(280, 78, 'LUNCH', 13, '#002664', 900) + texto(280, 93, 'MENU', 13, '#002664', 900) +
      '<rect x="280" y="102" width="90" height="4" rx="2" fill="#a6dd98"/><rect x="280" y="112" width="80" height="4" rx="2" fill="#dfe5dd"/><rect x="280" y="121" width="86" height="4" rx="2" fill="#dfe5dd"/><rect x="280" y="130" width="60" height="4" rx="2" fill="#dfe5dd"/>' +
      '<rect x="280" y="143" width="70" height="16" rx="8" fill="#3e9b2f"/>' + texto(286, 155, 'on portal', 9.5, '#fff', 900) + '</g>');
    // porta e placa
    s.push('<rect x="744" y="110" width="150" height="350" fill="#c8d2e2"/><rect x="754" y="120" width="130" height="340" fill="#f7faf6"/>');
    s.push('<rect x="772" y="150" width="94" height="30" rx="4" fill="#002664"/>' + texto(780, 163, 'LIBRARY', 10, '#fff', 900) + texto(780, 175, 'Quiet zone', 8.5, '#a6dd98', 500));
    // armário e impressora (risco: documento esquecido)
    s.push('<rect x="26" y="306" width="190" height="152" rx="6" fill="#c8d2e2"/><rect x="36" y="320" width="170" height="58" rx="4" fill="#dbe2ec"/><rect x="36" y="388" width="170" height="58" rx="4" fill="#dbe2ec"/><rect x="104" y="345" width="34" height="6" rx="3" fill="#8a948e"/><rect x="104" y="413" width="34" height="6" rx="3" fill="#8a948e"/>');
    s.push('<g data-alvo="impressora" tabindex="0" role="button" aria-label="Printer">' + contorno(34, 168, 176, 140) +
      '<path d="M76 236 L84 176 H172 L176 236z" fill="#fff" stroke="#dfe5dd" stroke-width="2"/>' +
      '<rect x="92" y="186" width="70" height="5" rx="2" fill="#c9d1cb"/><rect x="92" y="196" width="60" height="5" rx="2" fill="#c9d1cb"/>' +
      '<rect x="98" y="206" width="66" height="18" rx="2" fill="none" stroke="#cf4a3c" stroke-width="2.5" transform="rotate(-6 131 215)"/>' +
      texto(104, 219, 'TRIP FORM', 9.5, '#cf4a3c', 900, ' transform="rotate(-6 131 215)"') +
      '<rect x="46" y="232" width="152" height="70" rx="10" fill="#f4f6f3" stroke="#c9d1cb" stroke-width="2"/><rect x="64" y="244" width="116" height="10" rx="5" fill="#2b2f2d"/>' +
      '<circle cx="178" cy="282" r="5" fill="#3e9b2f"/><rect x="60" y="276" width="70" height="6" rx="3" fill="#dfe5dd"/></g>');
    // mesa
    s.push('<path d="M236 380 H756 L786 440 H206Z" fill="#cba77f"/><rect x="206" y="440" width="580" height="16" fill="#a9845d"/>');
    s.push('<rect x="226" y="456" width="16" height="140" fill="#8f6f4e"/><rect x="750" y="456" width="16" height="140" fill="#8f6f4e"/><rect x="620" y="456" width="130" height="110" fill="#b8936a"/><rect x="632" y="470" width="106" height="36" rx="3" fill="#c7a47c"/><rect x="632" y="516" width="106" height="36" rx="3" fill="#c7a47c"/><rect x="672" y="485" width="26" height="5" rx="2" fill="#8f6f4e"/><rect x="672" y="531" width="26" height="5" rx="2" fill="#8f6f4e"/>');
    // planta (isca)
    s.push('<g data-alvo="planta" tabindex="0" role="button" aria-label="Plant">' + contorno(690, 282, 72, 112) +
      '<path d="M726 350c-30-10-34-40-24-58 14 12 22 30 24 58zM726 350c26-14 34-42 24-62-14 14-22 34-24 62zM726 350c-4-30 2-52 2-62 8 14 8 40-2 62z" fill="#3e9b2f"/>' +
      '<path d="M708 346h36l-5 40h-26z" fill="#002664"/></g>');
    // porta-retrato (isca)
    s.push('<g data-alvo="foto" tabindex="0" role="button" aria-label="Photo frame">' + contorno(612, 330, 60, 62) +
      '<rect x="620" y="338" width="44" height="46" rx="3" fill="#002664"/><rect x="625" y="343" width="34" height="34" fill="#f1d9b5"/><circle cx="636" cy="354" r="5" fill="#8a5a3c"/><circle cx="649" cy="356" r="4" fill="#5b3a28"/><path d="M627 377c2-10 7-14 9-14s7 4 9 14zM642 377c2-8 5-11 7-11s6 3 8 11z" fill="#3e9b2f"/></g>');
    // monitor com a planilha confidencial aberta (risco: tela desbloqueada)
    s.push('<g data-alvo="tela" tabindex="0" role="button" aria-label="Laptop screen">' + contorno(322, 170, 300, 236) +
      '<path d="M446 340h40l8 50h-56z" fill="#5b6660"/><ellipse cx="466" cy="392" rx="54" ry="8" fill="#4a524d"/>' +
      '<rect x="330" y="178" width="284" height="172" rx="10" fill="#2b2f2d"/><rect x="341" y="189" width="262" height="146" fill="#fff"/>' +
      '<rect x="341" y="189" width="262" height="18" fill="#2e75c7"/>' + texto(348, 202, 'School Mail · signed in', 9.5, '#fff', 500) +
      '<rect x="526" y="192" width="72" height="12" rx="2" fill="#cf4a3c"/>' + texto(535, 201.5, 'SIGNED IN', 7.5, '#fff', 900));
    for (let r = 0; r < 7; r++) {
      s.push('<rect x="345" y="' + (213 + r * 15) + '" width="150" height="11" fill="' + (r === 0 ? '#e2efdd' : (r % 2 ? '#f6f8f5' : '#fff')) + '" stroke="#e1e6e0" stroke-width=".8"/>');
      if (r) s.push('<rect x="350" y="' + (216 + r * 15) + '" width="' + (36 + (r * 17) % 30) + '" height="5" rx="1" fill="#9aa59d"/><rect x="420" y="' + (216 + r * 15) + '" width="' + (22 + (r * 11) % 20) + '" height="5" rx="1" fill="#3e9b2f"/><rect x="460" y="' + (216 + r * 15) + '" width="26" height="5" rx="1" fill="#c9d1cb"/>');
    }
    s.push('<path d="M506 326V250M506 326h90" stroke="#c9d1cb" stroke-width="1.5"/><rect x="514" y="288" width="12" height="38" fill="#3e9b2f"/><rect x="532" y="270" width="12" height="56" fill="#002664"/><rect x="550" y="300" width="12" height="26" fill="#a6dd98"/><rect x="568" y="256" width="12" height="70" fill="#3e9b2f"/>');
    s.push('</g>');
    // post-it com a senha (risco)
    s.push('<g data-alvo="postit" tabindex="0" role="button" aria-label="Sticky note on the screen">' + contorno(568, 152, 78, 78) +
      '<g transform="rotate(7 607 190)"><rect x="576" y="158" width="62" height="62" fill="#ffe066"/><path d="M576 158h62v10h-62z" fill="#f5d34d"/>' +
      '<text x="582" y="186" font-family="Segoe Print, Comic Sans MS, cursive" font-size="10.5" fill="#1d1d1b">password:</text>' +
      '<text x="580" y="203" font-family="Segoe Print, Comic Sans MS, cursive" font-size="10" fill="#1d1d1b" font-weight="700">Nicholas26</text></g></g>');
    // teclado e mouse
    s.push('<path d="M384 400H556L566 428H374Z" fill="#e4e8e3" stroke="#c9d1cb" stroke-width="1.5"/>');
    for (let i = 0; i < 3; i++) s.push('<path d="M' + (390 - i * 3) + ' ' + (406 + i * 7) + 'H' + (552 + i * 3) + '" stroke="#c9d1cb" stroke-width="3" stroke-dasharray="9 3"/>');
    s.push('<ellipse cx="584" cy="416" rx="11" ry="8" fill="#e4e8e3" stroke="#c9d1cb" stroke-width="1.5"/>');
    // celular desbloqueado com o chat aberto (risco)
    s.push('<g data-alvo="celular" tabindex="0" role="button" aria-label="Phone lying on the desk">' + contorno(226, 380, 140, 70) +
      '<g transform="rotate(-78 300 414)"><rect x="272" y="364" width="56" height="100" rx="9" fill="#1d1d1b"/><rect x="276" y="370" width="48" height="88" rx="5" fill="#fff"/>' +
      '<rect x="276" y="370" width="48" height="12" rx="3" fill="#3e9b2f"/><rect x="280" y="388" width="30" height="7" rx="3" fill="#e2e8f0"/>' +
      '<rect x="290" y="399" width="30" height="7" rx="3" fill="#c9f0c0"/><rect x="280" y="410" width="34" height="7" rx="3" fill="#e2e8f0"/>' +
      '<rect x="288" y="421" width="32" height="7" rx="3" fill="#c9f0c0"/><rect x="280" y="432" width="26" height="7" rx="3" fill="#e2e8f0"/></g>' +
      texto(240, 446, 'unlocked', 9, '#cf4a3c', 900) + '</g>');
    // garrafa de água (isca)
    s.push('<g data-alvo="garrafa" tabindex="0" role="button" aria-label="Water bottle">' + contorno(272, 318, 70, 78) +
      '<rect x="296" y="322" width="18" height="10" rx="3" fill="#002664"/><path d="M292 334h26v50a6 6 0 0 1-6 6h-14a6 6 0 0 1-6-6z" fill="#7fb6e8"/>' +
      '<rect x="292" y="350" width="26" height="14" fill="#5cb947"/></g>');
    // pendrive desconhecido com etiqueta "PENDRIVE BRINDE" (risco)
    s.push('<g data-alvo="pendrive" tabindex="0" role="button" aria-label="USB stick on the desk">' + contorno(594, 378, 98, 66) +
      '<path d="M610 426 C 600 420 600 412 608 408" stroke="#9aa59d" stroke-width="1.5" fill="none"/><circle cx="611" cy="426" r="4" fill="none" stroke="#9aa59d" stroke-width="2"/>' +
      '<rect x="614" y="418" width="48" height="16" rx="5" fill="#3c6ea8"/><rect x="618" y="421" width="20" height="4" rx="2" fill="#6f97c8"/>' +
      '<rect x="662" y="421" width="18" height="10" fill="#c9d1cb"/><rect x="667" y="424" width="3" height="3" fill="#8a948e"/><rect x="673" y="424" width="3" height="3" fill="#8a948e"/>' +
      '<g transform="rotate(-5 645 397)"><rect x="604" y="383" width="82" height="27" rx="3" fill="#fff" stroke="#cf4a3c" stroke-width="1.5"/>' +
      texto(610, 394, 'FREE GAMES', 9, '#cf4a3c', 900) + texto(610, 406, 'TAKE ME :)', 10, '#cf4a3c', 900) + '</g></g>');
    // cartão de estudante esquecido sobre a mesa (risco)
    s.push('<g data-alvo="cracha" tabindex="0" role="button" aria-label="ID card on the desk">' + contorno(694, 372, 82, 74) +
      '<path d="M716 400 C 698 378 768 372 756 400" stroke="#cf4a3c" stroke-width="3" fill="none"/>' +
      '<g transform="rotate(-6 734 416)"><rect x="702" y="398" width="64" height="38" rx="4" fill="#fff" stroke="#c9d1cb" stroke-width="2"/>' +
      '<rect x="702" y="398" width="64" height="12" rx="4" fill="#002664"/>' + texto(707, 407.5, 'STUDENT ID', 7.5, '#fff', 900) +
      '<rect x="707" y="414" width="14" height="17" rx="2" fill="#d9a77f"/><rect x="725" y="416" width="34" height="4" rx="2" fill="#9aa59d"/><rect x="725" y="424" width="26" height="4" rx="2" fill="#c9d1cb"/></g></g>');
    // cadeira vazia
    s.push('<rect x="418" y="466" width="128" height="92" rx="22" fill="#0b357a"/><rect x="428" y="476" width="108" height="72" rx="16" fill="#123f8a"/>');
    s.push('<rect x="404" y="552" width="156" height="24" rx="12" fill="#002664"/><rect x="474" y="576" width="16" height="26" fill="#3d4a43"/><path d="M430 612h104" stroke="#3d4a43" stroke-width="8" stroke-linecap="round"/><circle cx="432" cy="616" r="6" fill="#1d1d1b"/><circle cx="532" cy="616" r="6" fill="#1d1d1b"/>');
    s.push('<g id="aneis"></g></svg>');
    return s.join('');
  }

  /* ------------------------------------------------------------------ foto do post da fase 8 */
  function fotoPost() {
    const s = [];
    s.push('<svg viewBox="0 0 880 400" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Photo in the post">');
    s.push('<rect width="880" height="400" fill="#e7eee4"/><rect y="330" width="880" height="70" fill="#dbe2ec"/>');
    // janela (isca)
    s.push('<g data-alvo="janela" tabindex="0" role="button" aria-label="Window with the city">' + contorno(792, 28, 82, 214) +
      '<rect x="800" y="36" width="70" height="200" fill="#d8ecf5"/><path d="M800 236v-60h18v-24h16v40h14v-56h22v100z" fill="#a9c7d6"/></g>');
    // mural com o horário da semana (risco)
    s.push('<g data-alvo="quadro" tabindex="0" role="button" aria-label="Timetable on the wall">' + contorno(28, 26, 262, 200) +
      '<rect x="36" y="34" width="246" height="184" rx="6" fill="#fff" stroke="#c9d1cb" stroke-width="5"/>' +
      '<text x="52" y="66" font-family="Segoe Print, Comic Sans MS, cursive" font-size="17" font-weight="700" fill="#002664">MY WEEK · 8B</text>' +
      '<text x="52" y="98" font-family="Segoe Print, Comic Sans MS, cursive" font-size="14" fill="#0f6cbd">Mon 16:00 swimming</text>' +
      '<text x="52" y="124" font-family="Segoe Print, Comic Sans MS, cursive" font-size="14" fill="#0f6cbd">Wed 17:30 guitar</text>' +
      '<text x="52" y="150" font-family="Segoe Print, Comic Sans MS, cursive" font-size="14" fill="#cf4a3c">bus home 15:45</text>' +
      '<path d="M200 90c30 10 40 40 30 70" stroke="#3e9b2f" stroke-width="3" fill="none"/><path d="M226 150l4 12 9-9" stroke="#3e9b2f" stroke-width="3" fill="none"/>' +
      '<rect x="60" y="216" width="200" height="8" fill="#c9d1cb"/></g>');
    // tela com o chat da turma (risco)
    s.push('<g data-alvo="tela" tabindex="0" role="button" aria-label="Screen in the background">' + contorno(556, 74, 232, 196) +
      '<rect x="652" y="236" width="40" height="36" fill="#5b6660"/><rect x="564" y="82" width="216" height="156" rx="8" fill="#2b2f2d"/><rect x="573" y="91" width="198" height="136" fill="#fff"/>' +
      texto(582, 110, 'Group chat · 8B', 12, '#002664', 900) + texto(582, 124, '24 members · phone numbers', 9, '#5b6660', 500) +
      '<rect x="584" y="134" width="110" height="14" rx="7" fill="#eef2f8"/><rect x="640" y="156" width="120" height="14" rx="7" fill="#c9f0c0"/>' +
      '<rect x="584" y="178" width="130" height="14" rx="7" fill="#eef2f8"/><rect x="660" y="200" width="100" height="14" rx="7" fill="#c9f0c0"/></g>');
    // planta (isca)
    s.push('<g data-alvo="planta" tabindex="0" role="button" aria-label="Plant">' + contorno(18, 238, 92, 140) +
      '<path d="M64 330c-36-14-42-50-30-72 18 16 28 38 30 72zM64 330c32-18 42-52 30-76-18 18-28 42-30 76z" fill="#3e9b2f"/><path d="M42 326h44l-6 46H48z" fill="#002664"/></g>');
    // pessoa (selfie)
    s.push('<path d="M300 400c0-90 40-140 136-140s138 50 138 140z" fill="#002664"/>');
    s.push('<path d="M404 262l32 46 32-46z" fill="#fff"/><path d="M420 262l16 30 16-30" fill="#e2efdd"/>');
    s.push('<rect x="420" y="214" width="32" height="44" fill="#c99a76"/>');
    s.push('<ellipse cx="436" cy="178" rx="54" ry="62" fill="#d9a77f"/>');
    s.push('<path d="M380 176c-6-60 30-84 60-84s66 20 58 84c-6-26-20-40-44-46-22 10-46 18-74 46z" fill="#2f2a26"/>');
    s.push('<circle cx="414" cy="182" r="5" fill="#2f2a26"/><circle cx="458" cy="182" r="5" fill="#2f2a26"/><path d="M414 208c12 14 34 14 46 0" stroke="#7a3b2a" stroke-width="4" stroke-linecap="round" fill="none"/>');
    // cartão de estudante (risco)
    s.push('<g data-alvo="cracha" tabindex="0" role="button" aria-label="Student ID card">' + contorno(396, 262, 86, 120) +
      '<path d="M410 262l18 52M462 262l-18 52" stroke="#3e9b2f" stroke-width="5"/>' +
      '<rect x="406" y="306" width="62" height="70" rx="6" fill="#fff" stroke="#c9d1cb" stroke-width="2"/><rect x="406" y="306" width="62" height="14" rx="6" fill="#3e9b2f"/>' +
      '<rect x="414" y="326" width="18" height="22" rx="2" fill="#d9a77f"/>' + texto(436, 334, 'BEATRIZ M.', 7, '#002664', 900) + texto(436, 345, 'Grade 8', 7, '#5b6660', 500) +
      '<path d="M414 356v14M417 356v14M421 356v14M423 356v14M427 356v14M431 356v14M433 356v14M437 356v14M441 356v14M444 356v14M448 356v14M452 356v14M455 356v14M459 356v14" stroke="#1d1d1b" stroke-width="1.5"/></g>');
    // braço segurando o cartão de embarque (risco)
    s.push('<path d="M552 330c30-10 50-30 64-56" stroke="#002664" stroke-width="34" stroke-linecap="round" fill="none"/>');
    s.push('<g data-alvo="embarque" tabindex="0" role="button" aria-label="Boarding pass">' + contorno(588, 196, 168, 124) +
      '<g transform="rotate(-10 670 258)"><rect x="600" y="210" width="150" height="88" rx="8" fill="#fff" stroke="#c9d1cb" stroke-width="2"/>' +
      '<rect x="600" y="210" width="150" height="20" rx="8" fill="#0f6cbd"/>' + texto(610, 224, 'BOARDING PASS', 8.5, '#fff', 900) +
      texto(610, 252, 'GRU → EZE', 17, '#1d1d1b', 900) + texto(610, 268, '16 OCT · SEAT 14C', 8.5, '#5b6660', 500) +
      '<path d="M610 278v12M613 278v12M617 278v12M619 278v12M623 278v12M627 278v12M629 278v12M633 278v12M637 278v12M640 278v12M644 278v12M648 278v12M651 278v12M655 278v12M659 278v12M662 278v12M666 278v12M670 278v12M673 278v12M677 278v12M681 278v12M684 278v12M688 278v12M692 278v12M695 278v12M699 278v12" stroke="#1d1d1b" stroke-width="1.6"/></g>' +
      '<ellipse cx="604" cy="268" rx="18" ry="14" fill="#d9a77f"/></g>');
    // café (isca)
    s.push('<g data-alvo="cafe" tabindex="0" role="button" aria-label="Glass of juice">' + contorno(206, 290, 70, 100) +
      '<path d="M218 304h46l-6 80h-34z" fill="#fff" stroke="#c9d1cb" stroke-width="2"/><rect x="214" y="296" width="54" height="12" rx="4" fill="#002664"/><rect x="222" y="330" width="38" height="22" fill="#3e9b2f"/></g>');
    s.push('<g id="aneis"></g></svg>');
    return s.join('');
  }

  /* rosto da videochamada "deepfake" do falso amigo (fase 3) */
  function videoFalso() {
    return '<svg viewBox="0 0 520 292" aria-hidden="true">' +
      '<defs><linearGradient id="vf" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a4964"/><stop offset="1" stop-color="#26253a"/></linearGradient></defs>' +
      '<rect width="520" height="292" fill="url(#vf)"/><rect x="40" y="40" width="120" height="160" fill="#34334a"/><rect x="380" y="20" width="100" height="180" fill="#34334a"/>' +
      '<path d="M150 292c0-70 46-100 110-100s110 30 110 100z" fill="#2e75c7"/><path d="M232 196q28 26 56 0" stroke="#1c4a8f" stroke-width="6" fill="none"/>' +
      '<rect x="244" y="160" width="32" height="40" fill="#b88a6a"/><ellipse cx="260" cy="128" rx="50" ry="58" fill="#c99a76"/>' +
      '<path d="M210 120c0-50 28-66 52-66s52 18 48 66c-8-22-26-32-50-30-22 0-38 10-50 30z" fill="#3b2a20"/>' +
      '<ellipse cx="240" cy="128" rx="6" ry="4" fill="#2f2a26"/><ellipse cx="282" cy="126" rx="6" ry="4" fill="#2f2a26"/>' +
      '<path d="M242 158c10 6 26 6 36 -2" stroke="#7a3b2a" stroke-width="4" stroke-linecap="round" fill="none" transform="translate(4 2) skewX(-8)"/>' +
      '<rect x="0" y="118" width="520" height="5" fill="#ffffff" opacity=".07"/><rect x="0" y="182" width="520" height="2" fill="#ffffff" opacity=".1"/>' +
      '<rect x="206" y="146" width="108" height="8" fill="#c99a76" opacity=".6" transform="translate(6 0)"/></svg>';
  }

  /* ilustração da tela inicial: notebook, escudo e cadeado nas cores da escola */
  function ilustracao(cls) {
    return '<svg class="' + (cls || '') + '" viewBox="0 0 470 400" aria-hidden="true">' +
      '<circle cx="250" cy="200" r="170" fill="#eef1f9"/><circle cx="420" cy="70" r="14" fill="#ffc72c"/><circle cx="445" cy="108" r="9" fill="#ffc72c"/><circle cx="60" cy="320" r="11" fill="#5cb947"/>' +
      '<rect x="90" y="110" width="300" height="190" rx="14" fill="#002664"/><rect x="104" y="124" width="272" height="160" rx="6" fill="#fff"/>' +
      '<rect x="104" y="124" width="272" height="22" rx="6" fill="#eef2f8"/><circle cx="118" cy="135" r="4" fill="#cf4a3c"/><circle cx="131" cy="135" r="4" fill="#ffc72c"/><circle cx="144" cy="135" r="4" fill="#5cb947"/>' +
      '<rect x="160" y="200" width="160" height="30" rx="15" fill="#eef2f8"/>' +
      '<text x="240" y="221" text-anchor="middle" font-family="Metropolis, sans-serif" font-weight="900" font-size="16" fill="#002664" letter-spacing="4">• • • • • •</text>' +
      '<path d="M60 300h360l-24 26H84z" fill="#c8d2e2"/><rect x="214" y="300" width="52" height="6" rx="3" fill="#a9b6cc"/>' +
      '<path d="M330 150l52 20v38c0 32-22 52-52 60-30-8-52-28-52-60v-38z" fill="#5cb947" stroke="#fff" stroke-width="6"/>' +
      '<path d="M310 206l14 14 28-28" stroke="#fff" stroke-width="9" fill="none" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<rect x="128" y="236" width="56" height="44" rx="8" fill="#ffc72c"/><path d="M140 236v-12a16 16 0 0 1 32 0v12" stroke="#ffc72c" stroke-width="8" fill="none"/>' +
      '<circle cx="156" cy="256" r="6" fill="#002664"/><rect x="153" y="258" width="6" height="12" rx="2" fill="#002664"/></svg>';
  }

  window.ARTE = { ico, onda, medalha, mesa, fotoPost, videoFalso, ilustracao };
})();
