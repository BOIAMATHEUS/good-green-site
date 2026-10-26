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
    couve: ['Couve', 'ing-couve.jpg', 'couve em pó'],
    abacaxi: ['Abacaxi e hortelã', 'ing-abacaxi-hortela.jpg', 'hortelã em pó e aroma de abacaxi com hortelã'],
    guarana: ['Guaraná', 'ing-guarana.jpg', 'guaraná em pó (Paullinia cupana)'],
    gengibre: ['Gengibre', 'ing-gengibre.jpg', 'gengibre em pó'],
    maca: ['Maçã', 'ing-maca.jpg', 'maçã em pó'],
    limao: ['Limão', 'ing-limao.jpg', 'polpa de limão'],
    laranja: ['Laranja moro', 'ing-laranja-moro.jpg', 'extrato de laranja moro'],
    espirulina: ['Espirulina', 'ing-espirulina.jpg', 'espirulina (Arthrospira platensis)'],
    salsa: ['Salsa', 'ing-salsa.jpg', 'salsa em pó'],
    beterraba: ['Beterraba', 'ing-beterraba.jpg', 'beterraba em pó'],
    curcuma: ['Cúrcuma', 'ing-curcuma.jpg', 'cúrcuma em pó'],
    coco: ['Água de coco', 'ing-agua-de-coco.jpg', 'água de coco em pó']
  };
  const BUSCA = [
    ['Good Green GG-01', 'Produto', 'produto.html', 'pote-estudio-claro.jpg'],
    ['Assinatura', 'Loja', 'assinatura.html', 'pote-cafe-da-manha.jpg'],
    ['Loja', 'Loja', 'loja.html', 'pote-aberto-po.jpg'],
    ['Ingredientes', 'Ciência', 'ingredientes.html', 'desktop-1440-rectangle.jpg'],
    ['Intestino e microbioma', 'Ciência', 'intestino.html', 'ciencia-cloroplasto.jpg'],
    ['Origem e qualidade', 'Ciência', 'feito-no-brasil.html', 'mapa-brasil-satelite.jpg'],
    ['Como ler a tabela nutricional', 'Ciência', 'como-ler-tabela.html', 'ciencia-clorofila.jpg'],
    ['Como montar uma rotina de verdes', 'Artigo', 'artigo.html', 'banner-pedra-folhas.jpg'],
    ['Receitas com Good Green', 'Explorar', 'receitas.html', 'menu-explorar-aberto-miniatura-2066.jpg'],
    ['Explorar', 'Artigos', 'explorar.html', 'menu-explorar-aberto-miniatura.jpg'],
    ...Object.entries(INGR).map(([k, v]) => [v[0], 'Ingrediente', 'ingredientes.html', v[1]])
  ];
  const PRODUTOS = {
    gg: { nome: 'Good Green GG-01', sub: 'Abacaxi com hortelã · 225 g', img: 'pote-recorte.webp', recorte: true },
    garrafa: { nome: 'Garrafa de vidro', sub: 'Vidro e inox', img: 'garrafa-vidro-vazia.jpg' }
  };

  /* ---------- cabeçalho ---------- */
  const AVISO = ['Apresentamos Good Green', 'Rico em vitamina C', 'Zero lactose', 'Não contém glúten', 'Uma medida. 300 ml. Todo dia.'];
  const avisoHTML = `<div class="aviso"><div class="aviso-trilho">${[...AVISO, ...AVISO, ...AVISO, ...AVISO].map(t => `<span>${t}</span>`).join('')}</div></div>`;
  const linha = (img, t, s, href, novo) => `<a class="m-linha" href="${href}"><img src="${IMG(img)}" alt=""><span><b>${t}</b><small>${s}</small></span>${novo ? '<i class="ponto-novo"></i>' : ''}${ic('seta-direita')}</a>`;
  const MEGA = {
    loja: `<span class="tag">Good Green</span>
      ${linha('pote-estudio-claro.jpg', 'GG-01 · Daily Functional Drink', 'Sabor abacaxi com hortelã · 30 doses', 'produto.html', 1)}
      ${linha('desktop-1440-tile-textura.jpg', 'Assinatura', 'Receba todo mês e pause quando quiser', 'assinatura.html')}
      ${linha('kit-pote-garrafa.jpg', 'Kit de boas-vindas', 'Pote + garrafa de vidro', 'loja.html')}
      <div class="m-sep"></div>
      <div class="m-rodape"><div><span class="tag" style="padding-left:0">Em breve</span><p style="font-size:16px;margin-bottom:6px">Novos sabores da linha</p><button data-abre="lista" style="font-weight:500;font-size:15px">Avise-me quando lançar  →</button><br><a class="btn btn-neon" href="loja.html" style="margin-top:22px;height:50px">Ver a loja <span class="seta">→</span></a></div><img src="${IMG('menu-loja-aberto-destaque.jpg')}" alt=""></div>`,
    ciencia: `${linha('desktop-1440-rectangle.jpg', 'Ingredientes', 'O que vai em cada dose, com a quantidade', 'ingredientes.html')}
      ${linha('menu-ciencia-aberto-miniatura.jpg', 'Intestino e microbioma', 'Fibras e ingredientes vegetais na rotina', 'intestino.html')}
      ${linha('menu-ciencia-aberto-miniatura-d34f.jpg', 'Origem e qualidade', 'Feito no Brasil: fabricação, lote e conservação', 'feito-no-brasil.html')}
      <div class="m-sep"></div><span class="tag">Referência</span>
      <a class="m-ref" href="como-ler-tabela.html">Vitaminas do complexo B</a><a class="m-ref" href="como-ler-tabela.html">Vitamina C e zinco</a><a class="m-ref" href="como-ler-tabela.html">Cafeína do guaraná</a><a class="m-ref" href="intestino.html">Fibras e polidextrose</a><a class="m-ref" href="como-ler-tabela.html">Tabela nutricional</a>`,
    explorar: `${linha('menu-explorar-aberto-miniatura.jpg', 'Rotina verde', 'Guias para encaixar seus verdes no dia', 'explorar.html')}
      ${linha('menu-explorar-aberto-miniatura-2066.jpg', 'Receitas', 'Drinks e smoothies com Good Green', 'receitas.html')}
      <div class="m-sep"></div><span class="tag">Artigos em destaque</span>
      ${linha('menu-loja-aberto-destaque.jpg', 'Como montar uma rotina de verdes', '6 min de leitura', 'artigo.html')}
      ${linha('menu-ciencia-aberto-miniatura.jpg', 'O que é o microbioma intestinal', '8 min de leitura', 'intestino.html')}
      ${linha('menu-ciencia-aberto-miniatura-27f7.jpg', 'Como ler a tabela nutricional', '5 min de leitura', 'como-ler-tabela.html')}
      <a class="m-ref" href="explorar.html" style="font-weight:500;margin-top:8px">Todos os artigos  →</a>`
  };
  const topo = `<header class="topo" id="topo">
    <nav class="nav" aria-label="Principal">
      <a class="logo" href="index.html" aria-label="Good Green, início"><span class="l-cla">${(window.GG_LOGO||{}).brancoNeon||''}</span><span class="l-esc">${(window.GG_LOGO||{}).petroNeon||''}</span></a>
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
      <div><span class="tag">Ciência</span><ul><li><a href="ingredientes.html">Ingredientes</a></li><li><a href="intestino.html">Intestino</a></li><li><a href="como-ler-tabela.html">Como ler o rótulo</a></li></ul></div>
      <div><span class="tag">Ajuda</span><ul><li><a href="index.html#faq">Perguntas frequentes</a></li><li><a href="#" data-abre="lista">Contato</a></li><li><a href="#" data-abre="lista">Trocas e devoluções</a></li></ul></div>
    </div>
    <p class="legal">Este produto não é um medicamento. Não exceder a recomendação diária de consumo indicada na embalagem.</p>
    <img class="marca" src="${IMG('logo-brancoNeon.svg')}" alt="Good Green">
  </div></footer>`;
  const cta = (t) => `<section class="cta-vidro"><img class="fundo" src="${IMG('desktop-1440-tile-textura.jpg')}" alt=""><div class="wrap"><div class="faixa vidro">
    <img src="${IMG('pote-recorte.webp')}" alt="Pote Good Green GG-01">
    <div><span class="tag gg">Good Green GG-01</span><h2 class="h3">${t}</h2><p>Abacaxi com hortelã · 225 g · 30 doses · R$ —</p>
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
  <div class="modal modal-bv" id="boas-vindas" role="dialog" aria-label="Boas-vindas"><div class="modal-caixa">
    <div class="foto"><img id="bv-foto" src="${IMG('desktop-1440-tile-foto.jpg')}" alt=""><span class="selo-oferta vidro"><i></i>BRINDE NO 1º PEDIDO</span></div>
    <button class="fechar" data-fecha aria-label="Fechar">${ic('fechar')}</button>
    <div class="modal-corpo">
      <form data-bv novalidate>
        <div class="etapa on" data-etapa="1">
          <h2>Ganhe a garrafa de vidro no seu primeiro pedido.</h2>
          <p class="so-desk" style="font-size:15px;margin-bottom:16px;color:var(--mut)">Entre para a lista do lançamento e receba o kit de boas-vindas com a sua primeira compra.</p>
          <div class="brinde-card"><img src="${IMG('garrafa-vidro-vazia.jpg')}" alt=""><div><b>Garrafa de vidro Good Green</b><small>Vidro e tampa de inox · grátis no 1º pedido</small></div></div>
          <div class="campos"><input class="campo" name="nome" placeholder="Seu nome" required autocomplete="name"><input class="campo" name="whats" placeholder="WhatsApp (com DDD)" inputmode="tel" required autocomplete="tel"></div>
          <button class="btn btn-escuro btn-bloco" style="margin-top:12px">Quero minha garrafa</button>
          <p class="letra-miuda">Você recebe só o aviso do lançamento e as ofertas da marca.</p>
        </div>
        <div class="etapa sucesso" data-etapa="ok">
          <span class="c">${ic('check')}</span>
          <h2>Pronto, a sua garrafa<br>está reservada.</h2>
          <p style="font-size:15px;margin-bottom:20px;color:var(--mut)">Ela vai junto com o seu primeiro pedido. Enviamos o lembrete no seu WhatsApp.</p>
          <a class="btn btn-escuro btn-bloco" href="produto.html">Conhecer o Good Green <span class="seta">→</span></a>
          <p class="letra-miuda">O brinde fica guardado por 30 dias.</p>
        </div>
      </form>
    </div>
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
    <div class="foto"><img id="ingr-img" src="${IMG('ing-couve.jpg')}" alt=""></div>
    <button class="fechar" data-fecha aria-label="Fechar">${ic('fechar')}</button>
    <div class="modal-corpo"><span class="tag">Ingrediente vegetal</span><h2 id="ingr-nome"></h2>
      <p>Um dos ingredientes vegetais da fórmula, junto com espirulina, salsa, hortelã, gengibre e outros. Entra numa medida de 7,5 g que você mistura em 300 ml de água.</p>
      <div class="ficha"><div><span>No rótulo</span><b id="ingr-forma"></b></div><div><span>Na fórmula</span><b>junto de outros ingredientes vegetais</b></div><div><span>Porção</span><b>7,5 g de Good Green</b></div></div>
      <a class="btn btn-linha btn-bloco" href="ingredientes.html">Ver todos os ingredientes <span class="seta">→</span></a></div>
  </div></div>
  <div class="menu-mob vidro-escuro" id="menu" role="dialog" aria-label="Menu">
    <div class="cab"><a class="logo" href="index.html" aria-label="Good Green, início">${(window.GG_LOGO||{}).brancoNeon||''}</a><button class="fechar" data-fecha aria-label="Fechar" style="color:#fff">${ic('fechar')}</button></div>
    ${[['Loja', 'GG-01, assinatura, kits', [['Good Green GG-01', 'produto.html'], ['Assinatura', 'assinatura.html'], ['Kits e acessórios', 'loja.html']]],
       ['Ciência', 'Ingredientes, intestino, rótulo', [['Ingredientes', 'ingredientes.html'], ['Intestino e microbioma', 'intestino.html'], ['Origem e qualidade', 'feito-no-brasil.html']]],
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
  const calmo = matchMedia('(prefers-reduced-motion: reduce)');
  let ultimoToque = null, ultimoT = 0;
  document.addEventListener('pointerdown', e => { const b = e.target.closest('button, a'); if (b) { ultimoToque = b; ultimoT = Date.now(); } }, true);
  function confirma(b) {
    if (!b || !b.classList.contains('btn') || b.classList.contains('feito')) return;
    const antes = b.innerHTML, w = b.offsetWidth;
    b.style.minWidth = w + 'px'; b.classList.add('feito');
    b.innerHTML = 'Adicionado <span class="marca-ok" aria-hidden="true">✓</span>';
    setTimeout(() => { b.classList.remove('feito'); b.innerHTML = antes; b.style.minWidth = ''; }, 1600);
  }
  function voa(origem, fim) {
    const alvo = $('.nav-ic[data-abre="carrinho"]');
    if (calmo.matches || !origem || !alvo) { fim(); return; }
    const a = origem.getBoundingClientRect(), z = alvo.getBoundingClientRect();
    if (!a.width || z.bottom < 0) { fim(); return; }
    const img = document.createElement('img'); img.src = 'assets/img/pote-recorte.webp'; img.alt = ''; img.className = 'voo';
    const L = 64; img.style.cssText = `width:${L}px;height:${L}px;left:${a.left + a.width / 2 - L / 2}px;top:${a.top + a.height / 2 - L / 2}px`;
    document.body.appendChild(img);
    const dx = z.left + z.width / 2 - (a.left + a.width / 2), dy = z.top + z.height / 2 - (a.top + a.height / 2);
    const voo = img.animate([
      { transform: 'translate(0,0) scale(.6)', opacity: 0 },
      { transform: 'translate(0,-24px) scale(1)', opacity: 1, offset: .15 },
      { transform: `translate(${dx * .55}px,${dy * .55 - 90}px) scale(.8)`, opacity: 1, offset: .55 },
      { transform: `translate(${dx}px,${dy}px) scale(.3)`, opacity: .4 }
    ], { duration: 620, easing: 'cubic-bezier(.45,0,.2,1)' });
    let foi = false; const acaba = () => { if (foi) return; foi = true; img.remove(); fim(); };
    voo.onfinish = acaba; setTimeout(acaba, 700);
  }
  function adiciona(k, q = 1) {
    const b = Date.now() - ultimoT < 1500 ? ultimoToque : null;
    carr[k] = (carr[k] || 0) + q; confirma(b);
    voa(b, () => { salva(); const bo = $('#bolinha'); bo.classList.remove('pulsa'); void bo.offsetWidth; bo.classList.add('pulsa'); setTimeout(() => { abre('carrinho'); const ks = Object.keys(carr).filter(x => carr[x] > 0), it = $$('#carrinho .carr-corpo .item')[ks.indexOf(k)]; if (it) it.classList.add('novo'); }, calmo.matches ? 0 : 260); });
  }
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
        ${!carr.garrafa ? `<span class="tag" style="display:block;margin:24px 0 2px">Complete seu ritual</span><div class="upsell"><img src="${IMG('garrafa-vidro-vazia.jpg')}" alt=""><span><b>Garrafa de vidro</b><small>Vidro e inox · R$ —</small></span><button class="btn btn-linha btn-sm" data-up="garrafa">+ Adicionar</button></div>` : ''}
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
  const MSG = { email: 'Confira o e-mail: falta o @ ou o final, como .com', tel: 'Confira o WhatsApp: coloque o DDD e o número, como 11 99999 9999', text: 'Escreva o seu nome' };
  const marca = (c, ruim) => {
    c.classList.toggle('erro', ruim); c.classList.toggle('valido', !ruim && !!c.value.trim());
    let m = c.nextElementSibling && c.nextElementSibling.classList.contains('campo-msg') ? c.nextElementSibling : null;
    if (ruim && !m) { m = document.createElement('span'); m.className = 'campo-msg'; m.textContent = MSG[c.type] || 'Confira este campo'; c.after(m); }
    if (!ruim && m) m.remove();
  };
  document.addEventListener('invalid', e => { const c = e.target; if (!c.matches || !c.matches('.qz-campos input')) return; marca(c, true); c.classList.remove('treme'); void c.offsetWidth; c.classList.add('treme'); }, true);
  document.addEventListener('blur', e => { const c = e.target; if (c.matches && c.matches('.qz-campos input') && c.value.trim()) marca(c, !c.checkValidity()); }, true);
  document.addEventListener('input', e => { const c = e.target; if (c.matches && c.matches('.qz-campos input') && c.classList.contains('erro') && c.checkValidity()) marca(c, false); }, true);
  document.addEventListener('submit', e => { const f = e.target; if (!f.querySelector || !f.querySelector('.qz-campos')) return; const ruins = [...f.querySelectorAll('.qz-campos input')].filter(c => !c.checkValidity()); ruins.forEach(c => { marca(c, true); c.classList.remove('treme'); void c.offsetWidth; c.classList.add('treme'); }); }, true);
  document.addEventListener('click', e => {
    const cp = e.target.closest('.qz-cupom'); if (!cp) return;
    const cod = cp.querySelector('b'); if (!cod) return;
    try { navigator.clipboard.writeText(cod.textContent.trim()); } catch (_) {}
    let ok = cp.querySelector('.copiado'); if (!ok) { ok = document.createElement('span'); ok.className = 'copiado'; cod.parentElement.appendChild(ok); }
    ok.textContent = 'Copiado ✓'; clearTimeout(cp._t); cp._t = setTimeout(() => ok.remove(), 1600);
  });

  function toast(t) {
    let el = $('#toast');
    if (!el) { el = document.createElement('div'); el.id = 'toast'; el.style.cssText = 'position:fixed;left:50%;bottom:28px;transform:translateX(-50%) translateY(20px);background:var(--petroleo);color:#fff;padding:14px 22px;border-radius:30px;font-size:14px;z-index:90;opacity:0;transition:.3s;max-width:calc(100% - 40px);text-align:center'; document.body.appendChild(el); }
    el.textContent = t; el.style.opacity = 1; el.style.transform = 'translateX(-50%)';
    clearTimeout(el._t); el._t = setTimeout(() => { el.style.opacity = 0; el.style.transform = 'translateX(-50%) translateY(20px)'; }, 2600);
  }

  const PAGINAS_ROLETA = ['home', 'produto', 'explorar', 'artigo', 'receitas', 'intestino', 'ingredientes', 'tabela', 'origem'];
  if (PAGINAS_ROLETA.includes(document.body.dataset.page) && !store.get('roleta-feita', false)) {
    const S = 520, R = 260, RI = 171.6, N = 8, A = 360 / N;
    const pol = (r, g) => [R + r * Math.sin(g * Math.PI / 180), R - r * Math.cos(g * Math.PI / 180)];
    const fatia = (r0, r1, g0, g1) => { const [a, b] = pol(r1, g0), [c, d] = pol(r1, g1), [e, f] = pol(r0, g1), [h, i] = pol(r0, g0); return `M${a} ${b}A${r1} ${r1} 0 0 1 ${c} ${d}L${e} ${f}A${r0} ${r0} 0 0 0 ${h} ${i}Z`; };
    let marcas = '', rotulos = '', divisas = '';
    for (let k = 0; k < 120; k++) { const g = k * 3, grande = k % 15 === 0, [x1, y1] = pol(R - 4, g), [x2, y2] = pol(R - (grande ? 17 : 11), g); marcas += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="${grande ? 'g' : ''}"/>`; }
    for (let i = 0; i < N; i++) { const g = i * A + A / 2, [x1, y1] = pol(RI, g), [x2, y2] = pol(R, g); divisas += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>`;
      rotulos += `<g transform="rotate(${i * A} ${R} ${R})" class="${i % 2 ? '' : 'p'}"><text x="${R}" y="${R - R * 0.85 + 16}">GARRAFA DE VIDRO</text><text x="${R}" y="${R - R * 0.85 + 33}" class="s">${i % 2 ? 'NO 1º PEDIDO' : 'GRÁTIS'}</text></g>`; }
    const svg = `<svg viewBox="0 0 ${S} ${S}" aria-hidden="true"><path class="rol-acesa" d="${fatia(RI, R - 1, -A / 2, A / 2)}"/><g class="rol-disco"><g class="rol-marcas">${marcas}</g><g class="rol-divisas">${divisas}</g><g class="rol-rotulos">${rotulos}</g></g><circle class="rol-miolo" cx="${R}" cy="${R}" r="${RI}"/><circle class="rol-anel" cx="${R}" cy="${R}" r="${RI * 0.78}"/><image href="assets/img/logo-brancoNeon.svg" x="${R - 76}" y="${R - RI + 32}" width="152" height="20"/></svg>`;
    let conf = ''; for (let i = 0; i < 42; i++) { const ang = (i / 42) * Math.PI * 2 + (i % 5) * .3, d = 90 + (i * 47 % 140); conf += `<i style="--x:${Math.round(Math.cos(ang) * d)}px;--y:${Math.round(Math.sin(ang) * d * .75 - 40)}px;--r:${(i * 53) % 360 - 180}deg;--d:${(i % 6) * 25}ms" class="c${i % 3}"></i>`; }
    const el = document.createElement('div'); el.className = 'rol'; el.hidden = true;
    el.innerHTML = `<div class="rol-veu" data-rol-fecha></div>
      <div class="rol-caixa" role="dialog" aria-modal="true" aria-labelledby="rol-tit" tabindex="-1">
        <span class="rol-alca" aria-hidden="true"></span>
        <button class="rol-x" type="button" data-rol-fecha aria-label="Fechar">×</button>
        <div class="rol-foto">
          <img class="rol-img" src="assets/img/garrafa-casal.jpg" alt="">
          <div class="rol-dial"><div class="rol-vidro"></div>${svg}<span class="rol-agulha" aria-hidden="true"></span></div>
          <div class="rol-premio" aria-hidden="true"><div class="rol-confete">${conf}</div><span class="k">Você ganhou</span><b>Garrafa de vidro</b><img src="assets/img/garrafa-recorte.webp" alt=""></div>
        </div>
        <div class="rol-txt">
          <div class="rol-etapa on" data-e="girar">
            <span class="tag neon">Presente do 1º pedido</span>
            <h3 id="rol-tit">Gire a roleta e ganhe um presente.</h3>
            <p>Toda volta tem prêmio. Deixe seu contato, gire e use no seu primeiro pedido.</p>
            <form data-rol-form novalidate><div class="qz-campos">
              <input type="text" name="nome" placeholder="Seu nome" autocomplete="given-name" required>
              <input type="tel" name="whatsapp" placeholder="WhatsApp com DDD" inputmode="tel" autocomplete="tel" pattern="[0-9()\\s+-]{10,}" required>
              <input type="email" name="email" placeholder="Seu e-mail" autocomplete="email" required>
            </div><button class="btn btn-neon btn-bloco" type="submit">Girar a roleta <span class="seta">→</span></button></form>
            <small class="rol-nota">1 giro por pessoa</small>
          </div>
          <div class="rol-etapa" data-e="girando" aria-live="polite">
            <span class="tag neon">Girando</span>
            <h3 data-rol-ola>Boa sorte.</h3>
            <p>A agulha para em alguns segundos.</p>
            <span class="btn btn-bloco rol-espera">Girando...</span>
          </div>
          <div class="rol-etapa" data-e="premio" aria-live="polite">
            <span class="tag neon">Você ganhou</span>
            <h3>Garrafa de vidro grátis no seu 1º pedido.</h3>
            <p>O presente já está guardado para você. O código também chegou no seu WhatsApp.</p>
            <div class="qz-cupom"><div><small>Seu código</small><b>GARRAFA</b></div></div>
            <a class="btn btn-neon btn-bloco" href="produto.html">Escolher meu plano <span class="seta">→</span></a>
          </div>
        </div>
      </div>`;
    document.body.appendChild(el);
    const aba = document.createElement('button'); aba.type = 'button'; aba.className = 'rol-aba'; aba.hidden = true;
    aba.innerHTML = `<img src="assets/img/garrafa-recorte.webp" alt=""><span><b>Garrafa grátis</b><small>no seu 1º pedido</small></span><span class="seta">→</span>`;
    document.body.appendChild(aba);
    const caixa = el.querySelector('.rol-caixa'), disco = el.querySelector('.rol-disco'), form = el.querySelector('[data-rol-form]');
    const etapa = n => el.querySelectorAll('.rol-etapa').forEach(e => e.classList.toggle('on', e.dataset.e === n));
    let aberto = false, girou = false, auto = false;
    const abreRol = () => {
      if (aberto || aberta) return; aberto = true; aba.hidden = true;
      el.hidden = false; void el.offsetWidth; setTimeout(() => el.classList.add('on'), 20);
      document.documentElement.style.overflow = 'hidden'; caixa.focus({ preventScroll: true });
    };
    const fechaRol = () => {
      if (!aberto) return; aberto = false; el.classList.remove('on'); document.documentElement.style.overflow = '';
      setTimeout(() => { el.hidden = true; }, 320);
      if (!girou) { store.set('roleta-fechou', Date.now()); aba.hidden = false; }
    };
    el.addEventListener('click', e => { if (e.target.closest('[data-rol-fecha]')) fechaRol(); });
    aba.addEventListener('click', abreRol);
    addEventListener('keydown', e => { if (e.key === 'Escape' && aberto) fechaRol(); });
    form.addEventListener('submit', e => {
      e.preventDefault();
      if ([...form.querySelectorAll('input')].some(c => !c.checkValidity())) return;
      const nome = (form.nome.value || '').trim().split(/\s+/)[0];
      el.querySelector('[data-rol-ola]').textContent = nome ? 'Boa sorte, ' + nome.charAt(0).toUpperCase() + nome.slice(1).toLowerCase() + '.' : 'Boa sorte.';
      etapa('girando'); girou = true; store.set('roleta-feita', true);
      try { localStorage.setItem('gg_cupom', 'GARRAFA'); } catch (_) {}
      const calmo = matchMedia('(prefers-reduced-motion: reduce)').matches;
      const volta = 360 * 6 + (360 - Math.floor(Math.random() * N) * A);
      disco.style.transitionDuration = calmo ? '0s' : '';
      requestAnimationFrame(() => { disco.style.transform = `rotate(${volta}deg)`; });
      let feito = false; const fim = () => { if (feito) return; feito = true; el.classList.add('ganhou'); etapa('premio'); };
      disco.addEventListener('transitionend', fim, { once: true }); setTimeout(fim, calmo ? 300 : 4800);
    });
    const fechouEm = store.get('roleta-fechou', 0), recente = Date.now() - fechouEm < 3 * 864e5;
    if (recente) aba.hidden = false;
    else if (!store.sget('roleta-vista')) {
      const dispara = () => { if (auto) return; auto = true; store.sset('roleta-vista'); abreRol(); };
      let tempo = false, rolou = false;
      const confere = () => { if (tempo && rolou) dispara(); };
      setTimeout(() => { tempo = true; confere(); }, 10000);
      let ultimo = scrollY;
      addEventListener('scroll', () => {
        const alt = document.documentElement.scrollHeight - innerHeight;
        if (alt > 0 && scrollY / alt >= .25) { rolou = true; confere(); }
        if (ultimo - scrollY > 120 && scrollY / Math.max(alt, 1) > .4 && innerWidth < 900) dispara();
        ultimo = scrollY;
      }, { passive: true });
      document.addEventListener('mouseout', e => { if (!e.relatedTarget && e.clientY <= 0) dispara(); });
    }
  }

  /* pop-up de boas-vindas em 2 passos */
  const bv = $('[data-bv]');
  if (bv) {
    const vai = n => { bv.querySelectorAll('.etapa').forEach(p => p.classList.toggle('on', p.dataset.etapa === n)); if (n === 'ok') $('#bv-foto').src = IMG('garrafa-bebendo-rua.jpg'); };
    bv.addEventListener('submit', e => {
      e.preventDefault(); e.stopPropagation();
      const passo = bv.querySelector('.etapa.on'), atual = passo.dataset.etapa;
      const campos = [...passo.querySelectorAll('input')];
      const ruim = campos.find(c => !c.checkValidity()); if (ruim) { ruim.reportValidity(); return; }
      vai('ok');
      const prox = bv.querySelector('.etapa.on input'); if (prox) setTimeout(() => prox.focus(), 300);
    }, true);
  }

  /* galeria da PDP: bolinhas do carrossel no celular */
  $$('[data-carrossel]').forEach(c => {
    const slides = [...c.children], dots = c.parentElement.querySelector('.bolinhas'); if (!dots) return;
    dots.innerHTML = slides.map((_, i) => `<i class="${i ? '' : 'on'}"></i>`).join('');
    const dica = c.querySelector('.dica-deslize');
    c.addEventListener('scroll', () => { if (dica && c.scrollLeft > 20) dica.classList.add('some'); const i = Math.round(c.scrollLeft / (slides[1] ? slides[1].offsetLeft - slides[0].offsetLeft : 1)); [...dots.children].forEach((d, k) => d.classList.toggle('on', k === i)); }, { passive: true });
  });

  /* linha do tempo da rotina: avança sozinha e responde ao mouse */
  $$('[data-tempo]').forEach(ol => {
    const itens = [...ol.children]; let i = 0, t;
    const marca = k => { i = k; itens.forEach((li, n) => li.classList.toggle('on', n === k)); };
    const roda = () => { clearInterval(t); t = setInterval(() => marca((i + 1) % itens.length), 3200); };
    itens.forEach((li, k) => { li.addEventListener('mouseenter', () => { marca(k); clearInterval(t); }); li.addEventListener('click', () => marca(k)); });
    ol.addEventListener('mouseleave', roda); roda();
  });

  /* cards de benefício: no toque (sem mouse) vira o card */
  if (!matchMedia('(hover: hover)').matches) $$('.t-benef').forEach(c => c.addEventListener('click', e => { if (e.target.closest('a')) return; c.classList.toggle('virado'); }));
  $$('.t-benef').forEach(c => c.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); c.classList.toggle('virado'); } }));

  /* brilho atravessando o vidro no hover */
  $$('.cartao-sabor, .card-produto, .legenda-vidro').forEach(el => el.classList.add('brilhante'));


  /* artigo: índice acompanha a leitura; copiar e compartilhar */
  const indice = $$('.indice a');
  if (indice.length) {
    const io2 = new IntersectionObserver(es => es.forEach(x => { if (x.isIntersecting) indice.forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + x.target.id)); }), { rootMargin: '-30% 0px -60% 0px' });
    indice.forEach(a => { const h = document.querySelector(a.getAttribute('href')); if (h) io2.observe(h); });
  }
  const cop = $('[data-copiar]'); if (cop) cop.addEventListener('click', () => { try { navigator.clipboard.writeText(location.href); } catch (e) {} toast('Link copiado.'); });
  const comp = $('[data-compartilhar]'); if (comp) comp.addEventListener('click', () => { if (navigator.share) navigator.share({ title: document.title, url: location.href }).catch(() => {}); else { try { navigator.clipboard.writeText(location.href); } catch (e) {} toast('Link copiado.'); } });


  /* "Assinar" no card leva para a compra já com a assinatura marcada */
  $$('[data-assinar]').forEach(a => a.addEventListener('click', () => { const op = $('[data-op="assinatura"]'); if (op) op.click(); }));


  /* Safari (iPhone/Mac) não toca vídeo transparente em webm: mostra a foto do pote de frente, sem girar */
  const semAlfa = /^((?!chrome|android|crios|fxios).)*safari/i.test(navigator.userAgent) || /iP(hone|ad|od)/.test(navigator.userAgent);
  if (semAlfa) $$('.giro video').forEach(v => { const img = document.createElement('img'); img.src = (v.getAttribute('poster') || ''); img.alt = 'Pote Good Green'; img.className = 'giro-estatico'; v.replaceWith(img); });

  /* card do pote: parado de frente; no hover gira e cresce (como na Seed). Sem mouse: toque ativa e gira devagar */
  $$('.card-seed').forEach(card => {
    const v = card.querySelector('video');
    const liga = () => { card.classList.add('ativo'); if (v) { const p = v.play(); if (p && p.catch) p.catch(() => {}); } };
    const desliga = () => { card.classList.remove('ativo'); if (v) { v.pause(); v.currentTime = 0; } };
    if (matchMedia('(hover: hover)').matches) { card.addEventListener('mouseenter', liga); card.addEventListener('mouseleave', desliga); }
    else new IntersectionObserver(es => es.forEach(x => x.isIntersecting ? liga() : desliga()), { threshold: .5 }).observe(card);
  });

  /* vídeos que tocam uma vez ao entrar na tela e param no último quadro */
  $$('video[data-toca-uma-vez]').forEach(v => {
    let foi = false;
    new IntersectionObserver(es => es.forEach(x => { if (x.isIntersecting && !foi) { foi = true; v.preload = 'auto'; const p = v.play(); if (p && p.catch) p.catch(() => {}); } }), { threshold: .45 }).observe(v);
  });

  /* vídeos em loop: tocam só enquanto estão na tela */
  $$('video[data-loop-na-tela]').forEach(v => {
    new IntersectionObserver(es => es.forEach(x => { if (x.isIntersecting) { v.preload = 'auto'; const p = v.play(); if (p && p.catch) p.catch(() => {}); } else v.pause(); }), { threshold: .25 }).observe(v);
  });

  /* "como usar": no celular, o passo no centro da tela fica ativo */
  if (!matchMedia('(hover: hover) and (pointer: fine)').matches || matchMedia('(max-width: 900px)').matches) {
    const ioPasso = new IntersectionObserver(es => es.forEach(x => x.target.classList.toggle('ativo', x.isIntersecting)), { rootMargin: '-38% 0px -38% 0px' });
    $$('.uso-hover').forEach(p => ioPasso.observe(p));
  }

  /* parallax leve: só desktop e sem "reduzir movimento" */
  const parallaxEls = $$('[data-parallax]');
  if (parallaxEls.length && matchMedia('(min-width: 901px) and (hover: hover)').matches && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let pedido = false;
    const roda = () => {
      pedido = false; const vh = innerHeight;
      parallaxEls.forEach(el => {
        const sec = el.closest('section') || el.parentElement, r = sec.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return;
        const f = parseFloat(el.dataset.parallax), meio = r.top + r.height / 2 - vh / 2, lim = el.classList.contains('fundo') ? r.height * .09 : 1e4, d = Math.max(-lim, Math.min(lim, meio * (1 - f)));
        let t = `translate3d(0, ${d.toFixed(1)}px, 0)`;
        if (el.hasAttribute('data-zoom')) { const k = Math.max(0, Math.min(1, 1 - r.top / vh)); t += ` scale(${(1.1 - .1 * k).toFixed(3)})`; }
        if (f > 1 && el.classList.contains('video-card')) t += ` rotate(${(d / 40).toFixed(2)}deg)`;
        el.style.transform = t;
      });
      $$('.cta-vidro').forEach(c => { const r = c.getBoundingClientRect(), img = c.querySelector('.faixa img'); if (!img) return; const k = Math.max(0, Math.min(1, (vh - r.top) / (vh * .8))); img.style.transform = `translateY(${(24 - 24 * k).toFixed(1)}px)`; });
    };
    addEventListener('scroll', () => { if (!pedido) { pedido = true; requestAnimationFrame(roda); } }, { passive: true }); roda();
  }

  /* barra fixa de compra da PDP no celular: aparece quando o botão de compra sai da tela */
  const botaoCompra = $('[data-add-qtd]');
  if (botaoCompra) {
    document.body.insertAdjacentHTML('beforeend', `<div class="barra-fixa so-mobile" id="barra-fixa"><div class="faixa-benef-mini"><div class="trilho">${['Garrafa de vidro de brinde', 'Frete grátis acima de R$ —', 'Cancele quando quiser', 'Garrafa de vidro de brinde', 'Frete grátis acima de R$ —', 'Cancele quando quiser'].map((t, i) => `<span>${ic(['presente', 'frete', 'check'][i % 3])}${t}</span>`).join('')}</div></div><div class="linha-compra"><img src="${IMG('pote-abacaxi-hortela.jpg')}" alt=""><div><b>Good Green GG-01</b><small>Assinatura</small><em>R$ — / mês</em></div><button class="btn btn-neon" data-assinar-barra>Assinar <span class="seta">→</span></button></div></div>`);
    const barra = $('#barra-fixa');
    new IntersectionObserver(es => es.forEach(x => barra.classList.toggle('on', !x.isIntersecting && x.boundingClientRect.top < 0)), { threshold: 0 }).observe(botaoCompra);
    barra.querySelector('[data-assinar-barra]').addEventListener('click', () => { const op = $('[data-op="assinatura"]'); if (op) op.click(); const q = +($('[data-qtd] span') || { textContent: 1 }).textContent; adiciona('gg', q); });
  }

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
