/* Good Green · LPs de anúncio: barra da oferta no topo, escolha de plano ligada ao carrinho do site, entrada suave ao rolar, barra fixa de compra no celular e quiz de captação. */
(function () {
  const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
  const ic = (n, cls = '') => `<svg class="ic ${cls}" aria-hidden="true"><use href="#i-${n}"/></svg>`;

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

  /* entrada suave ao rolar, igual ao site: os blocos da LP entram na mesma régua (.surge → .visto) */
  const alvos = $$('.lp-hero > *, .lp-aval article, .lp-split > *, .lp-numeros > div, .lp-ingr article, .lp-temnao > div, .lp-kit, .lp-videos figure, .lp-fecho-3 > div, .lp-motivo, .lp-momentos figure, .lp-oferta-caixa, .lp-antes-depois > div, .lp-passos figure, .lp-grade-pessoas img, .lp-kit-card, .rk-hero, .rk-card, .rk-meses > div, .rk-kits article, .lp-selos, .lp-compra > *');
  if (alvos.length) {
    alvos.forEach(el => {
      if (el.classList.contains('surge')) return;
      el.classList.add('surge');
      const irmaos = [...el.parentElement.children].filter(c => alvos.includes(c));
      el.style.transitionDelay = Math.min(irmaos.indexOf(el), 5) * 70 + 'ms';
    });
    const io = new IntersectionObserver(es => es.forEach(x => { if (x.isIntersecting) { x.target.classList.add('visto'); io.unobserve(x.target); } }), { rootMargin: '0px 0px -8% 0px' });
    alvos.forEach(el => io.observe(el));
  }

  /* barra fixa de compra no celular (mesma do site): nas LPs sem bloco de compra, aparece depois do primeiro CTA sair da tela */
  const primeiroCta = $('[data-lp-add]');
  if (primeiroCta && !$('#barra-fixa') && !$('[data-add-qtd]')) {
    const qtd = +(primeiroCta.dataset.lpAdd || 1);
    const nome = qtd > 1 ? `${qtd} potes · assinatura trimestral` : 'Assinatura mensal';
    document.body.insertAdjacentHTML('beforeend', `<div class="barra-fixa so-mobile" id="barra-fixa"><div class="faixa-benef-mini"><div class="trilho">${['Garrafa de vidro de brinde', 'Frete grátis no trimestral', 'Cancele quando quiser', 'Garrafa de vidro de brinde', 'Frete grátis no trimestral', 'Cancele quando quiser'].map((t, i) => `<span>${ic(['presente', 'frete', 'check'][i % 3])}${t}</span>`).join('')}</div></div><div class="linha-compra"><img src="assets/img/pote-abacaxi-hortela.jpg" alt=""><div><b>Good Green GG-01</b><small>${nome}</small><em>R$ —</em></div><button class="btn btn-neon" data-lp-add="${qtd}">${primeiroCta.textContent.trim().replace(/\s*→\s*$/, '')} <span class="seta">→</span></button></div></div>`);
    const b = $('#barra-fixa');
    b.querySelector('[data-lp-add]').addEventListener('click', () => { if (window.GG) { window.GG.setPlano('assinatura'); window.GG.adiciona('gg', qtd); } });
    new IntersectionObserver(es => es.forEach(x => b.classList.toggle('on', !x.isIntersecting && x.boundingClientRect.top < 0)), { threshold: 0 }).observe(primeiroCta);
  }

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
      const perfil = $('[data-qz-perfil]'), det = $('[data-qz-detalhe]');
      const dor = resp.dor || [], banheiro = (resp.banheiro || [''])[0], verdes = (resp.verdes || [''])[0], tenta = (resp.tenta || [''])[0];
      let t = 'Você quer começar sem complicar.', d = 'Uma medida de Good Green em 300 ml de água, uma vez ao dia, no horário que sobrar.';
      if (dor.some(x => /estufada|intestino|tetinha/i.test(x)) || /semana ou menos|Dia sim/.test(banheiro)) { t = 'Seu foco: fibras e verdes todo dia, sem depender de disciplina.'; d = 'Couve, espirulina, maçã, água de coco e beterraba numa medida. Em 30 segundos, sem liquidificador, com a garrafa de vidro para levar.'; }
      else if (dor.some(x => /Resfriados|imunidade/i.test(x))) { t = 'Seu foco: vitamina C e zinco todo dia, sem abrir vários potes.'; d = 'Por porção: 45 mg de vitamina C (45% do VD) e zinco (64% do VD), junto com couve, espirulina e as vitaminas B, numa bebida só, uma vez ao dia.'; }
      else if (dor.some(x => /Cansaço/i.test(x))) { t = 'Seu foco: uma rotina verde com a cafeína natural do guaraná.'; d = 'Uma medida antes do café ou no meio da tarde: vitaminas C, B2, B6 e B12 e 75 mg de cafeína do guaraná por porção.'; }
      else if (/Vários potes/i.test(tenta)) { t = 'Seu foco: um pote no lugar de vários.'; d = 'Vitaminas C, B2, B6 e B12, cromo e zinco numa bebida só, uma vez ao dia.'; }
      else if (/liquidificador/i.test(tenta) || /Nenhuma|Não faço/i.test(verdes)) { t = 'Seu foco: tirar o liquidificador do caminho.'; d = 'O verde que você adia entra em 30 segundos: uma medida em 300 ml de água, gelada fica melhor.'; }
      if (perfil) perfil.textContent = t; if (det) det.textContent = d;
      mostra(i + 1);
    }, true);
    mostra(0);
  }
})();
