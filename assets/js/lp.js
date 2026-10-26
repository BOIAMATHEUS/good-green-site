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
  if (primeiroCta && !$('#barra-fixa') && !$('[data-add-qtd]') && !$('.qz')) {
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
    const contaveis = passos.filter(p => !p.matches('.qz-carrega'));
    const mostra = n => {
      const antes = i;
      i = Math.max(0, Math.min(passos.length - 1, n));
      const volta = i < antes;
      passos.forEach((p, k) => { p.classList.toggle('on', k === i); p.classList.toggle('de-volta', k === i && volta); });
      const pos = contaveis.indexOf(passos[i]), q = pos < 0 ? contaveis.indexOf(passos[i + 1]) : pos;
      prog.style.width = ((q + 1) / contaveis.length * 100) + '%';
      num.textContent = (q + 1) + ' / ' + contaveis.length;
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
      /* nota de 0 a 10 pela rotina de hoje */
      let nota = 10;
      nota -= Math.min(3, dor.filter(x => !/Nada disso/i.test(x)).length) * 1.2;
      if (/Dia sim/.test(banheiro)) nota -= 1; else if (/semana ou menos/.test(banheiro)) nota -= 2; else if (/Varia/.test(banheiro)) nota -= 1;
      if (/Nenhuma/.test(verdes)) nota -= 2; else if (/^Uma/.test(verdes)) nota -= 1; else if (/Não faço/.test(verdes)) nota -= 1;
      if (/Nada ainda/.test(tenta)) nota -= 0.5;
      nota = Math.max(3, Math.min(9.5, Math.round(nota * 2) / 2));
      const nEl = $('[data-qz-nota]'), bEl = $('[data-qz-barra]'), ntEl = $('[data-qz-nota-texto]');
      if (nEl) nEl.textContent = nota.toFixed(1).replace('.', ',');
      if (bEl) bEl.style.width = (nota * 10) + '%';
      if (ntEl) ntEl.textContent = nota >= 8 ? 'Base boa. O que falta é constância, e isso o plano resolve.' : nota >= 6 ? 'Tem base, mas os verdes entram pouco no seu dia.' : 'Hoje os verdes quase não entram na sua rotina. Dá para virar em 30 dias.';
      /* plano de 30 dias */
      let p1 = 'Uma medida de Good Green em 300 ml de água, uma vez ao dia, no horário que você já tem.';
      if (dor.some(x => /estufada|intestino/i.test(x))) p1 = 'Uma medida de Good Green em 300 ml de água logo depois do café da manhã, todo dia, e mais dois copos de água até o almoço.';
      else if (dor.some(x => /tetinha/i.test(x))) p1 = 'Uma medida de Good Green depois do café da manhã, todo dia, e troque o lanche da tarde por uma fruta.';
      else if (dor.some(x => /Cansaço/i.test(x))) p1 = 'Uma medida de Good Green antes do café ou no meio da tarde, no lugar do segundo café: cafeína do guaraná e vitaminas B.';
      else if (dor.some(x => /Resfriados|imunidade/i.test(x))) p1 = 'Uma medida de Good Green de manhã, todo dia: vitamina C e zinco na primeira hora, sem abrir vários potes.';
      let p2 = 'Deixe o pote ao lado do copo e prepare na garrafa de vidro nos dias de sair cedo.';
      if (/Dia sim|semana ou menos|Varia/.test(banheiro) || /Nenhuma|Não faço/.test(verdes)) p2 = 'Some fibras de comida de verdade: feijão, fruta com casca e uma salada por dia, com água ao longo do dia. A medida continua a mesma.';
      const p3 = 'Mantenha a dose no mesmo horário e anote como foi a semana. Na assinatura, o próximo pote chega antes do seu acabar, e a rotina não para.';
      const e1 = $('[data-qz-p1]'), e2 = $('[data-qz-p2]'), e3 = $('[data-qz-p3]');
      if (e1) e1.textContent = p1; if (e2) e2.textContent = p2; if (e3) e3.textContent = p3;
      /* diagnóstico: dor, o que está por trás, solução e benefícios, com a imagem da resposta */
      const D = {
        estufada: ['qz-estufada', 'Barriga estufada depois das refeições', 'Refeição rápida, pouca fibra e pouca água ao longo do dia deixam a digestão pesada, e o inchaço aparece depois de comer.', 'Uma medida por dia traz fibras e ingredientes vegetais, como maçã, couve e gengibre, com 300 ml de água. Somado à água do dia, cria a rotina que faltava.', ['Fibras e ingredientes vegetais', '300 ml de água a mais', 'Baixo em calorias']],
        intestino: ['qz-intestino', 'Intestino preso', 'Quando falta fibra e falta água, o intestino perde o ritmo e ir ao banheiro vira esforço.', 'Good Green junta fibras e ingredientes vegetais numa medida diária. Com comida de verdade e água, o seu plano de 30 dias foca no ritmo do intestino.', ['Fibras todo dia', 'Couve, maçã e beterraba', 'Zero lactose']],
        banheiro: ['qz-intestino', 'Banheiro sem horário certo', 'Ir ao banheiro dia sim, dia não, ou só quando dá, costuma ser sinal de pouca fibra e pouca água na rotina.', 'A mesma medida, todo dia no mesmo horário, ajuda a criar o hábito. Fibras e ingredientes vegetais com 300 ml de água, sem pensar.', ['Mesmo horário todo dia', 'Fibras e vegetais', '300 ml de água']],
        tetinha: ['qz-tetinha', 'Peito e barriga inchados', 'O inchaço costuma vir de refeições pesadas, sal em excesso, pouca água e pouca fibra no dia a dia.', 'Um copo verde, leve e baixo em calorias, entra no lugar do lanche pesado, com mais água na rotina e couve e espirulina na medida.', ['Baixo em calorias', 'Couve e espirulina', 'Mais água no dia']],
        cansaco: ['qz-cansaco', 'Cansaço e sono depois do almoço', 'Almoço pesado, pouca água e vitaminas que faltam na rotina pesam na energia da tarde.', 'As vitaminas B2, B6 e B12 auxiliam no metabolismo energético, e a cafeína natural do guaraná auxilia no estado de alerta e na concentração.', ['Vitaminas B2, B6 e B12', '75 mg de cafeína do guaraná', 'Uma dose no meio da tarde']],
        imunidade: ['qz-imunidade', 'Resfriados frequentes', 'Correria, sono curto e pouca fruta e verdura no prato deixam de fora vitaminas importantes.', 'Por porção, 45 mg de vitamina C e zinco, que auxiliam no funcionamento do sistema imune, numa bebida só, todo dia.', ['45 mg de vitamina C', 'Zinco', 'Uma medida de manhã']],
        verdes: ['qz-verde', 'Pouco verde no prato', 'Couve, espinafre e outras folhas são o que menos entra na rotina de quem corre o dia inteiro.', 'Uma medida junta couve, espirulina, salsa, hortelã e outros ingredientes vegetais, pronta em 30 segundos.', ['Couve e espirulina', 'Pronto em 30 segundos', 'Sem liquidificador']],
        pratico: ['qz-verde', 'Falta de tempo para o verde', 'A rotina corrida empurra o suco verde e a salada para depois, e o depois não chega.', 'Uma medida em 300 ml de água, em 30 segundos, com vitaminas, minerais e ingredientes vegetais numa bebida só.', ['Pronto em 30 segundos', 'Um pote no lugar de vários', 'Sabor abacaxi com hortelã']]
      };
      const lista = [];
      if (dor.some(x => /estufada/i.test(x))) lista.push('estufada');
      if (dor.some(x => /Intestino/i.test(x))) lista.push('intestino');
      else if (/Dia sim|semana ou menos|Varia/.test(banheiro)) lista.push('banheiro');
      if (dor.some(x => /tetinha/i.test(x))) lista.push('tetinha');
      if (dor.some(x => /Cansaço/i.test(x))) lista.push('cansaco');
      if (dor.some(x => /Resfriados|imunidade/i.test(x))) lista.push('imunidade');
      if (/Nenhuma|^Uma|Não faço/.test(verdes)) lista.push('verdes');
      if (!lista.length) lista.push('pratico');
      const DADO = {
        estufada: ['18 a 43%', 'mais risco de infarto, AVC, diabetes tipo 2 e câncer de intestino em quem come pouca fibra, comparado com quem come mais. O ideal é de 25 a 29 g por dia.', 'Revisão de 185 estudos encomendada pela OMS. The Lancet, 2019.'],
        intestino: ['36,8%', 'das mulheres adultas têm intestino preso, 2,5 vezes mais que os homens.', 'Estudo populacional em Pelotas (RS). Cadernos de Saúde Pública, 2010.'],
        banheiro: ['36,8%', 'das mulheres adultas têm intestino preso, 2,5 vezes mais que os homens.', 'Estudo populacional em Pelotas (RS). Cadernos de Saúde Pública, 2010.'],
        tetinha: ['1 em 5', 'adultos nas capitais brasileiras come frutas e hortaliças na quantidade recomendada.', 'Vigitel, Ministério da Saúde, 2008 a 2023.'],
        cansaco: ['10 a 19%', 'dos adultos acima de 60 anos têm deficiência de vitamina B12, e a carência é mais comum em mulheres.', 'Revisão internacional. International Journal of Molecular Sciences, 2022.'],
        imunidade: ['17%', 'da população mundial corre risco de ingerir zinco de menos, mineral essencial para a imunidade.', 'Wessells e Brown. PLOS One, 2012.'],
        verdes: ['49%', 'mais risco de AVC e 32% mais de infarto em quem quase não come frutas e verduras, comparado com quem come 800 g por dia.', 'Meta-análise de 95 estudos. International Journal of Epidemiology, 2017.'],
        pratico: ['1 em 5', 'adultos nas capitais brasileiras come frutas e hortaliças na quantidade recomendada.', 'Vigitel, Ministério da Saúde, 2008 a 2023.']
      };
      const alvo = $('[data-qz-dores]'), alvoS = $('[data-qz-solucao]');
      if (alvo) alvo.innerHTML = ''; if (alvoS) alvoS.innerHTML = '';
      const PARA = { estufada: 'Para a barriga estufada', intestino: 'Para o intestino preso', banheiro: 'Para o banheiro sem horário', tetinha: 'Para o inchaço no peito e na barriga', cansaco: 'Para o cansaço da tarde', imunidade: 'Para os resfriados', verdes: 'Para o verde que falta no prato', pratico: 'Para a falta de tempo' };
      lista.slice(0, 4).forEach(k => {
        const [img, tit, porque, sol, ben] = D[k];
        if (alvo) {
          const c = document.createElement('article'); c.className = 'qz-dor';
          c.innerHTML = '<img src="assets/img/lp/' + img + '.jpg?v=2" alt="" loading="lazy"><div><h4></h4><p class="porque"></p><div class="dado"><strong></strong><span></span><small></small></div></div>';
          c.querySelector('h4').textContent = tit; c.querySelector('.porque').textContent = porque;
          const [dn, dt, df] = DADO[k]; c.querySelector('.dado strong').textContent = dn; c.querySelector('.dado span').textContent = dt; c.querySelector('.dado small').textContent = df;
          alvo.appendChild(c);
        }
        if (alvoS) {
          const c = document.createElement('article'); c.className = 'qz-sol';
          c.innerHTML = '<h4></h4><p></p><ul></ul>';
          c.querySelector('h4').textContent = PARA[k]; c.querySelector('p').textContent = sol;
          ben.forEach(x => { const li = document.createElement('li'); li.textContent = x; c.querySelector('ul').appendChild(li); });
          alvoS.appendChild(c);
        }
      });
      /* tela de carregamento com o primeiro nome, depois o resultado */
      const nome = ((form.nome && form.nome.value) || '').trim().split(/\s+/)[0];
      const Nome = nome ? nome.charAt(0).toUpperCase() + nome.slice(1).toLowerCase() : '';
      const ola = $('[data-qz-ola]'), ct = $('[data-qz-carrega-titulo]'), mt = $('[data-qz-modal-titulo]');
      if (Nome) {
        if (ola) ola.textContent = Nome + ', seu resultado está pronto.';
        if (ct) ct.textContent = Nome + ', estamos montando o seu diagnóstico.';
        if (mt) mt.textContent = Nome + ', você ganhou 10% OFF para começar sua rotina mais saudável.';
      }
      const carr = $('[data-qz-carrega]');
      const vaiResultado = () => { mostra(passos.indexOf($('.qz-resultado'))); ligaModal(); };
      if (!carr || matchMedia('(prefers-reduced-motion: reduce)').matches) { vaiResultado(); return; }
      mostra(passos.indexOf(carr));
      const anel = $('[data-qz-anel]'), pct = $('[data-qz-pct]'), etapas = carr.querySelectorAll('.qz-etapas li');
      etapas.forEach(li => li.className = '');
      const DUR = 4200, t0 = Date.now();
      const tique = setInterval(() => {
        const k = Math.min(1, (Date.now() - t0) / DUR), e = 1 - Math.pow(1 - k, 2.2);
        if (anel) anel.style.strokeDashoffset = (364.4 * (1 - e)).toFixed(1);
        if (pct) pct.textContent = Math.round(e * 100) + '%';
        etapas.forEach((li, n) => { const ini = n / etapas.length, fim = (n + 1) / etapas.length; li.className = e >= fim - 0.001 ? 'feito' : e >= ini ? 'agora' : ''; });
        if (k >= 1) { clearInterval(tique); setTimeout(vaiResultado, 450); }
      }, 40);
    }, true);

    /* pop-up do kit com desconto, uma vez, quando a oferta do resultado aparece */
    const modal = $('[data-qz-modal]');
    let modalLigado = false, relogio;
    const abreModal = () => {
      if (!modal || !modal.hidden) return;
      modal.hidden = false; void modal.offsetWidth; setTimeout(() => modal.classList.add('on'), 20);
      document.documentElement.style.overflow = 'hidden';
      let resta = 15 * 60; const tEl = $('[data-qz-tempo]');
      clearInterval(relogio); relogio = setInterval(() => { resta = Math.max(0, resta - 1); if (tEl) tEl.textContent = String(Math.floor(resta / 60)).padStart(2, '0') + ':' + String(resta % 60).padStart(2, '0'); }, 1000);
      const cx = modal.querySelector('.qz-modal-caixa'); if (cx) cx.focus({ preventScroll: true });
    };
    const fechaModal = () => {
      if (!modal || modal.hidden) return;
      modal.classList.remove('on'); document.documentElement.style.overflow = '';
      setTimeout(() => { modal.hidden = true; }, 300); clearInterval(relogio);
    };
    const ligaModal = () => {
      if (!modal || modalLigado) return; modalLigado = true;
      const of = $('.qz-oferta'); let feito = false;
      const vai = () => { if (feito) return; feito = true; abreModal(); };
      if (of) new IntersectionObserver((es, ob) => es.forEach(x => { if (x.isIntersecting) { ob.disconnect(); setTimeout(vai, 600); } }), { threshold: 0.4 }).observe(of);
      setTimeout(vai, 25000);
    };
    if (modal) {
      modal.addEventListener('click', e => {
        if (e.target.closest('[data-qz-fecha]')) fechaModal();
        if (e.target.closest('[data-qz-kit]')) {
          try { localStorage.setItem('gg_cupom', 'ROTINA10'); } catch (_) {}
          fechaModal(); if (window.GG) { window.GG.setPlano('assinatura'); window.GG.adiciona('gg', 3); }
        }
      });
      document.addEventListener('keydown', e => { if (e.key === 'Escape') fechaModal(); });
    }
    mostra(0);
  }

  /* grupo VIP: valida os 3 campos e manda para o grupo do WhatsApp */
  const vip = document.querySelector('[data-vip-form]');
  if (vip) {
    const LINK_GRUPO = vip.dataset.grupo || '#';
    vip.addEventListener('submit', e => {
      e.preventDefault();
      const ruim = [...vip.querySelectorAll('input')].find(c => !c.checkValidity()); if (ruim) { ruim.reportValidity(); return; }
      const nome = (vip.nome.value || '').trim().split(' ')[0];
      const ok = document.querySelector('[data-vip-ok]'), ola = document.querySelector('[data-vip-ola]'), link = document.querySelector('[data-vip-link]');
      if (ola && nome) ola.textContent = 'Pronto, ' + nome + '. Seu lugar está garantido.';
      if (link) link.href = LINK_GRUPO;
      vip.hidden = true; if (ok) ok.hidden = false;
      if (LINK_GRUPO !== '#') setTimeout(() => { location.href = LINK_GRUPO; }, 1500);
    });
  }
})();
