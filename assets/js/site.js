/* Good Green · site (protótipo navegável). Cabeçalho, rodapé e camadas são montados aqui para todas as páginas. */
(function () {
  const A = 'assets/';
  const IMG = n => A + 'img/' + n;
  const ic = (n, cls = '') => `<svg class="ic ${cls}" aria-hidden="true"><use href="#i-${n}"/></svg>`;
  const store = {
    get(k, d) { try { const v = localStorage.getItem('gg-' + k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem('gg-' + k, JSON.stringify(v)); } catch (e) {} },
    sget(k) { try { return sessionStorage.getItem('gg-' + k); } catch (e) { return null; } },
    sset(k) { try { sessionStorage.setItem('gg-' + k, '1'); } catch (e) {} }
  };

  /* ---------- dados ---------- */
  const INGR = {
    couve: ['Couve', 'desktop-1440-ingrediente-couve.jpg', 'couve em pó'],
    abacaxi: ['Abacaxi e hortelã', 'ingrediente-abacaxi-hortela-v2.jpg', 'hortelã em pó e aroma de abacaxi com hortelã'],
    guarana: ['Guaraná', 'desktop-1440-ingrediente-guarana.jpg', 'guaraná em pó (Paullinia cupana)'],
    gengibre: ['Gengibre', 'desktop-1440-ingrediente-gengibre.jpg', 'gengibre em pó'],
    maca: ['Maçã', 'desktop-1440-ingrediente-maca.jpg', 'maçã em pó'],
    limao: ['Limão', 'menu-explorar-aberto-miniatura-2066.jpg', 'polpa de limão'],
    laranja: ['Laranja moro', 'ingredientes-ingrediente-laranja-moro.jpg', 'extrato de laranja moro'],
    espirulina: ['Espirulina', 'ingrediente-espirulina.jpg', 'espirulina (Arthrospira platensis)'],
    salsa: ['Salsa', 'ingrediente-salsa.jpg', 'salsa em pó'],
    beterraba: ['Beterraba', 'ingrediente-beterraba.jpg', 'beterraba em pó'],
    curcuma: ['Cúrcuma', 'ingrediente-curcuma.jpg', 'cúrcuma em pó'],
    coco: ['Água de coco', 'ingrediente-agua-de-coco.jpg', 'água de coco em pó']
  };
  const BUSCA = [
    ['Good Green GG-01', 'Produto', 'produto.html', 'pote-estudio-claro.jpg'],
    ['Assinatura', 'Loja', 'assinatura.html', 'pote-cafe-da-manha.jpg'],
    ['Loja', 'Loja', 'loja.html', 'pote-aberto-po.jpg'],
    ['Ingredientes', 'Ciência', 'ingredientes.html', 'desktop-1440-rectangle.jpg'],
    ['Intestino e microbioma', 'Ciência', 'intestino.html', 'ciencia-cloroplasto.jpg'],
    ['Feito no Brasil', 'Ciência', 'feito-no-brasil.html', 'mapa-brasil-satelite.jpg'],
    ['Qualidade', 'Ciência', 'qualidade.html', 'banner-estudio-verde.jpg'],
    ['Como ler a tabela nutricional', 'Ciência', 'ingredientes.html#vitaminas', 'ciencia-clorofila.jpg'],
    ['Como montar uma rotina de verdes', 'Artigo', 'artigo.html', 'banner-pedra-folhas.jpg'],
    ['Receitas com Good Green', 'Explorar', 'receitas.html', 'menu-explorar-aberto-miniatura-2066.jpg'],
    ['Explorar', 'Artigos', 'explorar.html', 'menu-explorar-aberto-miniatura.jpg'],
    ...Object.entries(INGR).map(([k, v]) => [v[0], 'Ingrediente', 'ingredientes.html', v[1]])
  ];
  const PRODUTOS = {
    gg: { nome: 'Good Green GG-01', sub: 'Abacaxi com hortelã · 225 g', img: 'pote-recorte.webp', recorte: true },
    garrafa: { nome: 'Garrafa de vidro', sub: 'Vidro e inox', img: 'garrafa-vidro.jpg' }
  };

  /* ---------- cabeçalho ---------- */
  const AVISO = ['Apresentamos Good Green', 'Rico em vitamina C', 'Zero lactose', 'Não contém glúten', 'Uma medida. 300 ml. Todo dia.'];
  const avisoHTML = `<div class="aviso"><div class="aviso-trilho">${[...AVISO, ...AVISO, ...AVISO, ...AVISO].map(t => `<span>${t}</span>`).join('')}</div></div>`;
  const linha = (img, t, s, href, novo) => `<a class="m-linha" href="${href}"><img src="${IMG(img)}" alt=""><span><b>${t}</b><small>${s}</small></span>${novo ? '<i class="ponto-novo"></i>' : ''}${ic('seta-direita')}</a>`;
  const MEGA = {
    loja: `<span class="tag">Good Green</span>
      ${linha('pote-estudio-claro.jpg', 'GG-01 · Daily Functional Drink', 'Sabor abacaxi com hortelã · 30 doses', 'produto.html', 1)}
      ${linha('desktop-1440-tile-textura.jpg', 'Assinatura', 'Receba todo mês e pause quando quiser', 'assinatura.html')}
      ${linha('pote-aberto-po.jpg', 'Kit de boas-vindas', 'Pote + garrafa de vidro', 'loja.html')}
      <div class="m-sep"></div>
      <div class="m-rodape"><div><span class="tag" style="padding-left:0">Em breve</span><p style="font-size:16px;margin-bottom:6px">Novos sabores da linha</p><button data-abre="lista" style="font-weight:500;font-size:15px">Avise-me quando lançar  →</button><br><a class="btn btn-neon" href="loja.html" style="margin-top:22px;height:50px">Ver a loja <span class="seta">→</span></a></div><img src="${IMG('menu-loja-aberto-destaque.jpg')}" alt=""></div>`,
    ciencia: `${linha('desktop-1440-rectangle.jpg', 'Ingredientes', 'O que vai em cada dose, com a quantidade', 'ingredientes.html')}
      ${linha('menu-ciencia-aberto-miniatura.jpg', 'Intestino e microbioma', 'Fibras e ingredientes vegetais na rotina', 'intestino.html')}
      ${linha('menu-ciencia-aberto-miniatura-d34f.jpg', 'Feito no Brasil', 'Fabricação, origem e qualidade', 'feito-no-brasil.html')}
      ${linha('menu-ciencia-aberto-miniatura-27f7.jpg', 'Qualidade', 'Fabricação, lote e conservação', 'qualidade.html')}
      <div class="m-sep"></div><span class="tag">Referência</span>
      <a class="m-ref" href="ingredientes.html#vitaminas">Vitaminas do complexo B</a><a class="m-ref" href="ingredientes.html#vitaminas">Vitamina C e zinco</a><a class="m-ref" href="ingredientes.html#vitaminas">Cafeína do guaraná</a><a class="m-ref" href="intestino.html">Fibras e polidextrose</a><a class="m-ref" href="ingredientes.html#vitaminas">Tabela nutricional</a>`,
    explorar: `${linha('menu-explorar-aberto-miniatura.jpg', 'Rotina verde', 'Guias para encaixar seus verdes no dia', 'explorar.html')}
      ${linha('menu-explorar-aberto-miniatura-2066.jpg', 'Receitas', 'Drinks e smoothies com Good Green', 'receitas.html')}
      <div class="m-sep"></div><span class="tag">Artigos em destaque</span>
      ${linha('menu-loja-aberto-destaque.jpg', 'Como montar uma rotina de verdes', '6 min de leitura', 'artigo.html')}
      ${linha('menu-ciencia-aberto-miniatura.jpg', 'O que é o microbioma intestinal', '8 min de leitura', 'intestino.html')}
      ${linha('menu-ciencia-aberto-miniatura-27f7.jpg', 'Como ler a tabela nutricional', '5 min de leitura', 'ingredientes.html#vitaminas')}
      <a class="m-ref" href="explorar.html" style="font-weight:500;margin-top:8px">Todos os artigos  →</a>`
  };
  const topo = `<header class="topo" id="topo">
    <nav class="nav" aria-label="Principal">
      <a class="logo" href="index.html" aria-label="Good Green, início"><img class="l-cla" src="${IMG('logo-brancoNeon.svg')}" alt="Good Green"><img class="l-esc" src="${IMG('logo-petroNeon.svg')}" alt="Good Green"></a>
      <div class="nav-links">
        <button data-mega="loja" aria-expanded="false">Loja</button>
        <button data-mega="ciencia" aria-expanded="false">Ciência</button>
        <button data-mega="explorar" aria-expanded="false">Explorar</button>
      </div>
      <div class="nav-dir">
        <button class="nav-ic" data-abre="busca" aria-label="Buscar">${ic('busca')}</button>
        <button class="nav-txt" data-abre="entrar">Entrar</button>
        <button class="nav-ic" data-abre="carrinho" aria-label="Carrinho">${ic('sacola')}<span class="bolinha" id="bolinha"></span></button>
        <button class="nav-ic so-mobile" data-abre="menu" aria-label="Menu">${ic('menu')}</button>
        <a class="btn btn-neon" href="produto.html">Comprar</a>
      </div>
    </nav>
    ${Object.entries(MEGA).map(([k, h]) => `<div class="mega vidro-escuro" data-painel="${k}">${h}</div>`).join('')}
  </header>`;

  /* ---------- rodapé e CTA ---------- */
  const rodape = `<footer class="rodape"><div class="wrap">
    <div class="rodape-topo">
      <div><h4>Receba novidades do lançamento.</h4><form class="form-linha" data-form><input type="email" placeholder="Seu e-mail" aria-label="Seu e-mail" required><button class="btn btn-neon">Quero saber</button></form><p class="ok-msg" style="background:var(--verde2);margin-top:12px">Pronto, você está na lista.</p></div>
      <div><span class="tag">Loja</span><ul><li><a href="produto.html">Good Green GG-01</a></li><li><a href="assinatura.html">Assinatura</a></li><li><a href="loja.html">Kits</a></li></ul></div>
      <div><span class="tag">Ciência</span><ul><li><a href="ingredientes.html">Ingredientes</a></li><li><a href="intestino.html">Intestino</a></li><li><a href="ingredientes.html#vitaminas">Como ler o rótulo</a></li></ul></div>
      <div><span class="tag">Ajuda</span><ul><li><a href="index.html#faq">Perguntas frequentes</a></li><li><a href="#" data-abre="lista">Contato</a></li><li><a href="#" data-abre="lista">Trocas e devoluções</a></li></ul></div>
    </div>
    <p class="legal">Este produto não é um medicamento. Não exceder a recomendação diária de consumo indicada na embalagem.</p>
    <img class="marca" src="${IMG('logo-brancoNeon.svg')}" alt="Good Green">
  </div></footer>`;
  const cta = (t) => `<section class="cta-vidro"><img class="fundo" src="${IMG('desktop-1440-tile-textura.jpg')}" alt=""><div class="wrap"><div class="faixa vidro">
    <img src="${IMG('pote-recorte.webp')}" alt="Pote Good Green GG-01">
    <div><span class="tag neon">Good Green GG-01</span><h2 class="h3">${t}</h2><p>Abacaxi com hortelã · 225 g · 30 doses · R$ —</p>
    <div class="acoes"><a class="btn btn-neon" href="produto.html">Ver o produto <span class="seta">→</span></a><button class="btn btn-escuro" data-add="gg">Adicionar ao carrinho</button></div></div>
  </div></div></section>`;

  /* ---------- camadas ---------- */
  const campos3 = `<div class="campos"><input class="campo" placeholder="Seu nome" required><input class="campo" placeholder="WhatsApp" inputmode="tel" required><input class="campo" type="email" placeholder="E-mail" required></div>`;
  const camadas = `
  <div class="escurece" id="escurece"></div>
  <aside class="gaveta" id="carrinho" aria-label="Carrinho"></aside>
  <aside class="gaveta" id="entrar" aria-label="Entrar">
    <div class="gaveta-cab"><h2>Entrar</h2><button class="fechar" data-fecha aria-label="Fechar">${ic('fechar')}</button></div>
    <p style="font-size:15px;margin-bottom:24px">Acompanhe pedidos e gerencie a sua assinatura.</p>
    <form data-form><div class="campos"><input class="campo" type="email" placeholder="E-mail" required><input class="campo" type="password" placeholder="Senha" required></div>
    <a href="#" style="display:block;font-size:14px;font-weight:500;margin:16px 0 24px">Esqueci a senha</a>
    <button class="btn btn-escuro btn-bloco">Entrar <span class="seta">→</span></button><p class="ok-msg">Protótipo: a área de conta entra depois do lançamento.</p></form>
    <div style="border-top:1px solid var(--linha);margin-top:32px;padding-top:22px"><p style="font-size:15px;margin-bottom:14px">Ainda não tem conta?</p><button class="btn btn-linha btn-bloco" data-abre="lista">Criar conta</button></div>
  </aside>
  <div class="busca" id="busca" role="dialog" aria-label="Buscar"><div class="dentro">
    <label class="busca-campo">${ic('busca')}<input id="busca-in" placeholder="Busque ingredientes, artigos, produto" autocomplete="off"><button data-fecha aria-label="Fechar busca">${ic('fechar')}</button></label>
    <span class="tag">Sugestões</span><div id="busca-res"></div>
  </div></div>
  <div class="modal" id="boas-vindas" role="dialog" aria-label="Boas-vindas"><div class="modal-caixa">
    <div class="foto"><img src="${IMG('desktop-1440-tile-foto.jpg')}" alt=""></div>
    <button class="fechar" data-fecha aria-label="Fechar">${ic('fechar')}</button>
    <div class="modal-corpo"><span class="tag">Bem-vindo à Good Green</span><h2>Seu primeiro pedido<br>vem com o kit.</h2>
      <p class="so-desk">Cadastre-se e ganhe o kit de boas-vindas na primeira compra:</p>
      <div class="brinde-card"><img src="${IMG('garrafa-vidro.jpg')}" alt=""><div><b>Garrafa de vidro<br>Good Green</b><span class="tag" style="color:var(--verde)">Brinde</span></div></div>
      <form data-form>${campos3}<button class="btn btn-escuro btn-bloco" style="margin-top:14px">Quero meu kit</button><p class="ok-msg">Pronto! O kit fica guardado para o seu primeiro pedido.</p></form>
      <p class="letra-miuda">Válido para o 1º pedido. Ao enviar, você aceita receber comunicações da Good Green.</p></div>
  </div></div>
  <div class="modal modal-lista" id="lista" role="dialog" aria-label="Lista de lançamento"><div class="modal-caixa">
    <div class="foto"><img src="${IMG('menu-loja-aberto-destaque.jpg')}" alt=""></div>
    <button class="fechar" data-fecha aria-label="Fechar">${ic('fechar')}</button>
    <div class="modal-corpo"><span class="tag">Lançamento</span><h2>Entre na lista e<br>receba primeiro.</h2>
      <p>Avisamos você quando o lote chegar, com condição especial para quem está na lista.</p>
      <form data-form>${campos3}<button class="btn btn-escuro btn-bloco" style="margin-top:14px">Quero entrar na lista</button><p class="ok-msg">Pronto, você está na lista.</p></form>
      <p class="letra-miuda">Ao enviar, você aceita receber comunicações da Good Green.</p></div>
  </div></div>
  <div class="modal modal-ingr" id="ingrediente" role="dialog" aria-label="Ingrediente"><div class="modal-caixa">
    <div class="foto"><img id="ingr-img" src="${IMG('desktop-1440-ingrediente-couve.jpg')}" alt=""></div>
    <button class="fechar" data-fecha aria-label="Fechar">${ic('fechar')}</button>
    <div class="modal-corpo"><span class="tag">Ingrediente vegetal</span><h2 id="ingr-nome"></h2>
      <p>Um dos ingredientes vegetais da fórmula, junto com espirulina, salsa, hortelã, gengibre e outros. Entra numa medida de 7,5 g que você mistura em 300 ml de água.</p>
      <div class="ficha"><div><span>No rótulo</span><b id="ingr-forma"></b></div><div><span>Na fórmula</span><b>junto de outros ingredientes vegetais</b></div><div><span>Porção</span><b>7,5 g de Good Green</b></div></div>
      <a class="btn btn-linha btn-bloco" href="ingredientes.html">Ver todos os ingredientes <span class="seta">→</span></a></div>
  </div></div>
  <div class="menu-mob vidro-escuro" id="menu" role="dialog" aria-label="Menu">
    <div class="cab"><a class="logo" href="index.html"><img src="${IMG('logo-brancoNeon.svg')}" alt="Good Green"></a><button class="fechar" data-fecha aria-label="Fechar" style="color:#fff">${ic('fechar')}</button></div>
    ${[['Loja', 'GG-01, assinatura, kits', [['Good Green GG-01', 'produto.html'], ['Assinatura', 'assinatura.html'], ['Kits e acessórios', 'loja.html']]],
       ['Ciência', 'Ingredientes, intestino, rótulo', [['Ingredientes', 'ingredientes.html'], ['Intestino e microbioma', 'intestino.html'], ['Feito no Brasil', 'feito-no-brasil.html'], ['Qualidade', 'qualidade.html']]],
       ['Explorar', 'Rotina verde, receitas, artigos', [['Rotina verde', 'explorar.html'], ['Receitas', 'receitas.html'], ['Como montar uma rotina de verdes', 'artigo.html']]]]
      .map(([t, s, sub]) => `<div><button class="mm-link" style="width:100%;text-align:left" data-sub><span><b>${t}</b><small>${s}</small></span>${ic('seta-direita')}</button><div class="mm-sub" hidden>${sub.map(([a, h]) => `<a href="${h}">${a}</a>`).join('')}</div></div>`).join('')}
    <button class="entrar" data-abre="entrar">Entrar</button>
    <a class="btn btn-neon btn-bloco" href="produto.html">Comprar Good Green</a>
  </div>`;

  /* ---------- montagem ---------- */
  document.body.insertAdjacentHTML('afterbegin', `<div id="sprite-host"></div>${avisoHTML}${topo}`);
  document.querySelectorAll('[data-cta]').forEach(el => { el.outerHTML = cta(el.dataset.cta); });
  document.body.insertAdjacentHTML('beforeend', rodape + camadas);
  document.getElementById('sprite-host').innerHTML = window.GG_SPRITE || '';
  document.querySelectorAll('[data-ic]').forEach(el => { el.outerHTML = ic(el.dataset.ic, el.className); });

  const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
  const esc = $('#escurece');

  /* cabeçalho fixo ao rolar */
  const T = $('#topo');
  let ultimo = 0;
  addEventListener('scroll', () => {
    const y = scrollY;
    T.classList.toggle('fixo', y > 140);
    ultimo = y;
  }, { passive: true });

  /* mega-menus */
  let megaTimer;
  const fechaMega = () => { $$('.mega').forEach(m => m.classList.remove('aberto')); $$('[data-mega]').forEach(b => b.setAttribute('aria-expanded', 'false')); };
  const abreMega = b => {
    clearTimeout(megaTimer); fechaMega();
    const p = $(`[data-painel="${b.dataset.mega}"]`), r = b.getBoundingClientRect(), tr = T.getBoundingClientRect();
    p.style.left = Math.min(r.left - tr.left - 8, innerWidth - 580) + 'px';
    p.classList.add('aberto'); b.setAttribute('aria-expanded', 'true');
  };
  $$('[data-mega]').forEach(b => {
    b.addEventListener('mouseenter', () => abreMega(b));
    b.addEventListener('click', () => b.getAttribute('aria-expanded') === 'true' ? fechaMega() : abreMega(b));
  });
  $$('.mega').forEach(m => m.addEventListener('mouseenter', () => clearTimeout(megaTimer)));
  T.addEventListener('mouseleave', () => { megaTimer = setTimeout(fechaMega, 220); });

  /* abrir e fechar camadas */
  let aberta = null;
  function abre(id) {
    fecha(true); fechaMega();
    const el = document.getElementById(id); if (!el) return;
    aberta = el; el.classList.add('on');
    if (!['menu', 'busca'].includes(id) || true) esc.classList.add('on');
    document.body.classList.add('travado');
    if (id === 'carrinho') renderCarrinho();
    if (id === 'busca') { renderBusca(''); setTimeout(() => $('#busca-in').focus(), 300); }
  }
  function fecha(silencioso) {
    if (aberta) aberta.classList.remove('on');
    aberta = null; esc.classList.remove('on'); document.body.classList.remove('travado');
  }
  document.addEventListener('click', e => {
    const a = e.target.closest('[data-abre]'); if (a) { e.preventDefault(); abre(a.dataset.abre); return; }
    if (e.target.closest('[data-fecha]')) { fecha(); return; }
    if (e.target.classList && e.target.classList.contains('modal')) fecha();
    const add = e.target.closest('[data-add]'); if (add) { adiciona(add.dataset.add); return; }
    const ig = e.target.closest('[data-ingr]'); if (ig) { abreIngr(ig.dataset.ingr); return; }
    const sub = e.target.closest('[data-sub]'); if (sub) { const s = sub.nextElementSibling; s.hidden = !s.hidden; sub.querySelector('.ic').style.transform = s.hidden ? '' : 'rotate(90deg)'; return; }
    const v = e.target.closest('.v-card'); if (v) { toast('Depoimento ilustrativo: os vídeos entram depois do lançamento.'); }
  });
  esc.addEventListener('click', () => fecha());
  addEventListener('keydown', e => { if (e.key === 'Escape') { fecha(); fechaMega(); } });

  /* ingrediente */
  function abreIngr(k) {
    const d = INGR[k]; if (!d) return;
    $('#ingr-img').src = IMG(d[1]); $('#ingr-nome').textContent = d[0]; $('#ingr-forma').textContent = d[2];
    abre('ingrediente');
  }

  /* busca */
  function renderBusca(q) {
    const n = q.trim().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
    const lista = (n ? BUSCA.filter(b => (b[0] + ' ' + b[1]).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').includes(n)) : BUSCA.slice(3, 4).concat(BUSCA.slice(4, 5), BUSCA.slice(0, 1), BUSCA.slice(8, 9))).slice(0, 6);
    $('#busca-res').innerHTML = lista.length ? lista.map(b => `<a class="sugestao" href="${b[2]}"><img src="${IMG(b[3])}" alt=""><span><b>${b[0]}</b><small>${b[1]}</small></span></a>`).join('') : '<p class="sem-result">Nada encontrado. Tente "intestino", "couve" ou "assinatura".</p>';
  }
  $('#busca-in').addEventListener('input', e => renderBusca(e.target.value));

  /* carrinho */
  let carr = store.get('carrinho', {});
  let plano = store.get('plano', 'assinatura');
  const salva = () => { store.set('carrinho', carr); store.set('plano', plano); conta(); };
  const conta = () => { const n = Object.values(carr).reduce((a, b) => a + b, 0); const b = $('#bolinha'); b.textContent = n; b.classList.toggle('on', n > 0); };
  function adiciona(k, q = 1) { carr[k] = (carr[k] || 0) + q; salva(); abre('carrinho'); }
  window.GG = { adiciona, abre, setPlano: p => { plano = p; salva(); } };
  function renderCarrinho() {
    const g = $('#carrinho'), itens = Object.entries(carr).filter(([, q]) => q > 0);
    const cab = `<div class="gaveta-cab"><h2>Seu carrinho</h2><button class="fechar" data-fecha aria-label="Fechar">${ic('fechar')}</button></div>`;
    if (!itens.length) { g.innerHTML = cab + `<div class="vazio">${ic('sacola')}<b>Seu carrinho está vazio</b><p>Comece pela sua dose diária de verdes.</p><a class="btn btn-escuro" href="produto.html">Conhecer Good Green <span class="seta">→</span></a></div>`; return; }
    const pct = Math.min(100, 30 + itens.length * 25);
    g.innerHTML = cab + `<div class="frete">Faltam R$ — para o frete grátis<div class="barra"><i style="width:${pct}%"></i></div></div>
      <div class="carr-corpo">
        ${itens.map(([k, q]) => { const p = PRODUTOS[k]; return `<div class="item"><div class="img ${p.recorte ? '' : 'foto'}"><img src="${IMG(p.img)}" alt=""></div><div class="info"><b>${p.nome}</b><small>${p.sub}</small><button class="rem" data-rem="${k}">Remover</button><div class="pe"><b style="font-size:16px">R$ —</b><div class="qtd sm"><button data-q="${k}" data-d="-1" aria-label="Menos">${ic('menos')}</button><span>${q}</span><button data-q="${k}" data-d="1" aria-label="Mais">${ic('mais')}</button></div></div></div></div>`; }).join('')}
        ${carr.gg ? `<button class="assina-box ${plano === 'assinatura' ? 'on' : ''}" data-plano><span class="radio"></span><span><b>Assinar e economizar</b><small>Entrega todo mês · pause ou cancele quando quiser</small></span></button>` : ''}
        ${!carr.garrafa ? `<span class="tag" style="display:block;margin:24px 0 2px">Complete seu ritual</span><div class="upsell"><img src="${IMG('garrafa-vidro.jpg')}" alt=""><span><b>Garrafa de vidro</b><small>Vidro e inox · R$ —</small></span><button class="btn btn-linha btn-sm" data-up="garrafa">+ Adicionar</button></div>` : ''}
        <div class="brinde">${ic('presente')}1º pedido: kit de boas-vindas de brinde</div>
      </div>
      <div class="carr-pe"><div class="lin"><span>Subtotal</span><b>R$ —</b></div><small>Frete e cupom no próximo passo.</small><button class="btn btn-escuro btn-bloco" data-checkout>Finalizar compra <span class="seta">→</span></button></div>`;
  }
  $('#carrinho').addEventListener('click', e => {
    const q = e.target.closest('[data-q]'); if (q) { carr[q.dataset.q] = Math.max(0, (carr[q.dataset.q] || 0) + +q.dataset.d); if (!carr[q.dataset.q]) delete carr[q.dataset.q]; salva(); renderCarrinho(); }
    const r = e.target.closest('[data-rem]'); if (r) { delete carr[r.dataset.rem]; salva(); renderCarrinho(); }
    const u = e.target.closest('[data-up]'); if (u) { carr[u.dataset.up] = 1; salva(); renderCarrinho(); }
    if (e.target.closest('[data-plano]')) { plano = plano === 'assinatura' ? 'unica' : 'assinatura'; salva(); renderCarrinho(); }
    if (e.target.closest('[data-checkout]')) toast('Protótipo: aqui o checkout segue para a Yampi.');
  });
  conta();

  /* formulários (sem envio real) */
  document.addEventListener('submit', e => {
    if (!e.target.matches('[data-form]')) return;
    e.preventDefault(); e.target.classList.add('enviado');
    const ok = e.target.nextElementSibling; if (ok && ok.classList.contains('ok-msg') && !e.target.querySelector('.ok-msg')) ok.style.display = 'block';
  });

  /* acordeões */
  $$('.acc-item>button').forEach(b => b.addEventListener('click', () => b.parentElement.classList.toggle('aberto')));

  /* aviso rápido */
  function toast(t) {
    let el = $('#toast');
    if (!el) { el = document.createElement('div'); el.id = 'toast'; el.style.cssText = 'position:fixed;left:50%;bottom:28px;transform:translateX(-50%) translateY(20px);background:var(--petroleo);color:#fff;padding:14px 22px;border-radius:30px;font-size:14px;z-index:90;opacity:0;transition:.3s;max-width:calc(100% - 40px);text-align:center'; document.body.appendChild(el); }
    el.textContent = t; el.style.opacity = 1; el.style.transform = 'translateX(-50%)';
    clearTimeout(el._t); el._t = setTimeout(() => { el.style.opacity = 0; el.style.transform = 'translateX(-50%) translateY(20px)'; }, 2600);
  }

  /* pop-up de boas-vindas: home, 1 vez por sessão */
  if (document.body.dataset.page === 'home' && !store.sget('bv')) {
    let foi = false;
    const mostra = () => { if (foi || aberta) return; foi = true; store.sset('bv'); abre('boas-vindas'); };
    // a home abre limpa: o convite só aparece depois de a pessoa rolar metade da página ou passar 20 s nela
    setTimeout(mostra, 20000);
    addEventListener('scroll', () => { if (scrollY > (document.body.scrollHeight - innerHeight) * .5) mostra(); }, { passive: true });
  }

  /* entrada suave ao rolar */
  const alvos = $$('.cabeca, .tile, .card, .vantagem, .receita, .acessorio, .painel-vidro, .tabela, .s-faq .acc, .faixa, .faixa-benef, .avaliacoes, .artigo p, .nutri tr');
  alvos.forEach(el => {
    el.classList.add('surge');
    const irmaos = [...el.parentElement.children].filter(c => alvos.includes(c));
    el.style.transitionDelay = Math.min(irmaos.indexOf(el), 5) * 70 + 'ms';
  });
  const io = new IntersectionObserver(es => es.forEach(x => { if (x.isIntersecting) { x.target.classList.add('visto'); io.unobserve(x.target); } }), { rootMargin: '0px 0px -8% 0px' });
  alvos.forEach(el => io.observe(el));

  /* página: seleção de plano e quantidade */
  $$('[data-opcoes]').forEach(g => g.addEventListener('click', e => {
    const o = e.target.closest('[data-op]'); if (!o) return;
    g.querySelectorAll('[data-op]').forEach(x => x.classList.toggle('on', x === o)); plano = o.dataset.op; salva();
  }));
  $$('[data-qtd]').forEach(q => {
    const s = q.querySelector('span');
    q.addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; s.textContent = Math.max(1, +s.textContent + +b.dataset.d); });
  });
  $$('[data-add-qtd]').forEach(b => b.addEventListener('click', () => { const q = +document.querySelector('[data-qtd] span').textContent; adiciona('gg', q); }));


  /* o 3D embutido não percebe sozinho quando o mouse sai rápido: a página avisa */
  const g3d = $('.g3d');
  if (g3d) ['mouseenter', 'mouseleave'].forEach(ev => $('#g-principal').addEventListener(ev, () => { if (g3d.contentWindow) g3d.contentWindow.postMessage(ev === 'mouseenter' ? 'giro:on' : 'giro:off', '*'); }));

  /* galeria da PDP */
  $$('[data-thumb]').forEach(t => t.addEventListener('click', () => {
    $$('[data-thumb]').forEach(x => x.classList.toggle('on', x === t));
    const alvo = $('#g-principal'), src = t.dataset.thumb, foto = !['360', '3d'].includes(src);
    alvo.querySelector('.giro').hidden = src !== '360';
    const f = alvo.querySelector('img.foto'); f.hidden = !foto; if (foto) f.src = IMG(src);
    const fr = alvo.querySelector('.g3d'); fr.hidden = src !== '3d'; if (src === '3d' && !fr.src) fr.src = fr.dataset.src;
    $('.selo-360').hidden = src !== '360'; $('.selo-3d').hidden = src !== '3d';
  }));

  /* filtros do Explorar */
  $$('[data-filtro]').forEach(b => b.addEventListener('click', () => {
    $$('[data-filtro]').forEach(x => x.classList.toggle('on', x === b));
    $$('[data-cat]').forEach(a => a.classList.toggle('some', b.dataset.filtro !== 'todos' && a.dataset.cat !== b.dataset.filtro));
  }));
})();
