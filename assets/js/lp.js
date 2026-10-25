/* Good Green · LPs de anúncio: barra da oferta no topo, escolha de plano ligada ao carrinho do site, quiz de captação. */
(function () {
  const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];

  /* a barra da oferta nasce no HTML da página e sobe para antes do cabeçalho montado pelo site.js */
  const barra = $('.lp-barra');
  if (barra) document.body.prepend(barra);

  /* opções de plano da LP: trimestral = 3 potes, mensal = 1 pote; ambas assinatura; avulso vira compra única */
  $$('[data-lp-opcoes]').forEach(g => g.addEventListener('click', e => {
    const o = e.target.closest('[data-lp-op]'); if (!o) return;
    g.querySelectorAll('[data-lp-op]').forEach(x => x.classList.toggle('on', x === o));
    const q = $('[data-qtd] span'); if (q) q.textContent = o.dataset.lpQtd || '1';
    if (window.GG) window.GG.setPlano('assinatura');
  }));
  $$('[data-lp-avulso]').forEach(b => b.addEventListener('click', () => { if (window.GG) { window.GG.setPlano('unica'); window.GG.adiciona('gg', 1); } }));
  $$('[data-lp-add]').forEach(b => b.addEventListener('click', () => { if (window.GG) { window.GG.setPlano('assinatura'); window.GG.adiciona('gg', +(b.dataset.lpAdd || 1)); } }));

  /* quiz */
  const qz = $('.qz');
  if (qz) {
    const passos = $$('.qz-passo'), prog = $('.qz-prog i'), num = $('.qz-num');
    const resp = {};
    let i = 0;
    const mostra = n => {
      i = Math.max(0, Math.min(passos.length - 1, n));
      passos.forEach((p, k) => p.classList.toggle('on', k === i));
      prog.style.width = ((i + 1) / passos.length * 100) + '%';
      num.textContent = (i + 1) + ' / ' + passos.length;
      const p = passos[i], ok = p.querySelector('[data-prox]');
      if (ok && p.dataset.escolha) ok.disabled = !p.querySelector('.qz-opcao.on');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    qz.addEventListener('click', e => {
      const op = e.target.closest('.qz-opcao');
      if (op) {
        const p = op.closest('.qz-passo'), multi = p.dataset.escolha === 'multi';
        if (!multi) p.querySelectorAll('.qz-opcao').forEach(x => x.classList.toggle('on', x === op)); else op.classList.toggle('on');
        resp[p.dataset.chave] = [...p.querySelectorAll('.qz-opcao.on')].map(x => x.textContent.trim());
        const ok = p.querySelector('[data-prox]'); if (ok) ok.disabled = !p.querySelector('.qz-opcao.on');
        return;
      }
      if (e.target.closest('[data-prox]')) { e.preventDefault(); mostra(i + 1); }
      if (e.target.closest('[data-volta]')) { e.preventDefault(); mostra(i - 1); }
    });
    const form = $('[data-qz-form]');
    if (form) form.addEventListener('submit', e => {
      e.preventDefault(); e.stopPropagation();
      const ruim = [...form.querySelectorAll('input')].find(c => !c.checkValidity()); if (ruim) { ruim.reportValidity(); return; }
      const perfil = $('[data-qz-perfil]'), hora = (resp.hora || [''])[0] || 'de manhã';
      const rotina = (resp.rotina || [''])[0];
      if (perfil) perfil.textContent = rotina === 'Faço suco verde em casa' ? 'Você já tem o hábito. Falta tirar o liquidificador do caminho.' : rotina === 'Tomo vários suplementos' ? 'Você quer menos potes no armário e uma rotina só.' : 'Você quer começar sem complicar, ' + hora.toLowerCase() + '.';
      mostra(i + 1);
    }, true);
    mostra(0);
  }
})();
