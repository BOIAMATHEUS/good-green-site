// Pote Good Green 225 g (90 x 90 x 160 mm) com o rotulo da faca de 289 x 85 mm (Figma, pagina Rotulo).
//
// Pote e tampa na mesma cor do fundo do rotulo (#0F2E2F), como na referencia do Alison,
// para o rotulo "sumir" no frasco e so a impressao aparecer.
import * as T from 'three';
import {OrbitControls} from './OrbitControls.js';
import {fundo, luzes, sombraContato} from './estudio.js';

const capture = new URLSearchParams(location.search).has('capture');
if (capture || new URLSearchParams(location.search).has('embed')) document.body.classList.add('capture');
const stage = document.querySelector('#stage');
const W = () => stage.clientWidth, H = () => stage.clientHeight;

const MM = 0.001;
// Pote 90 x 115 mm (proporcao do mockup do Alison, escolhida em 22/10; a medida 9 x 9 x 16 deixava o rotulo pequeno) e rotulo na faca do Alison: 289 x 85 mm, cantos de 3,5 mm (22/10).
// A volta do pote e 282,7 mm, entao a ponta final do rotulo (6,3 mm) passa por baixo do inicio
// na emenda: na textura so aparecem os primeiros 282,7 mm.
const R_CORPO = 44.4 * MM, R_ROT = R_CORPO + .12 * MM;
const ROT_L = 289, ROT_A = 85, VOLTA_MM = 2 * Math.PI * R_ROT / MM, VISIVEL = VOLTA_MM / ROT_L;
const H_CORPO = 98, ROT_BAIXO = (H_CORPO - ROT_A) / 2 * MM;
// a faixa de emenda e o INICIO da arte (0 a 6,3 mm, sem texto): ela fica por baixo do fim do rotulo
const EMENDA = 1 - VISIVEL;
const u = mm => (mm / ROT_L - EMENDA) / VISIVEL;    // posicao na arte (mm) -> volta do pote (0..1)
const FRENTE_U = u(146.75);                         // centro da frente
const PAINEIS = {frente: FRENTE_U, ingredientes: u(87.75), tabela: u(38), verso: u(238.5)};

const PRODUTOS = [
  {id: 'gg-01', nome: 'GG-01 · Abacaxi com Hortelã', tex: 'rotulo-faca-gg-01.png'},
  {id: 'gg-02', nome: 'GG-02 · Frutas Vermelhas (exemplo)', tex: 'rotulo-faca-gg-02.png'},
  {id: 'gg-03', nome: 'GG-03 · Laranja e Gengibre (exemplo)', tex: 'rotulo-faca-gg-03.png'},
  {id: 'gg-04', nome: 'GG-04 · Maracujá e Camomila (exemplo)', tex: 'rotulo-faca-gg-04.png'},
];

const scene = new T.Scene(), camera = new T.PerspectiveCamera(24, W() / H(), .005, 6);
// ?giro=gg-01 grava uma volta de 360° com fundo transparente (vídeo dos cards da home, como na Seed)
const GIRO = new URLSearchParams(location.search).get('giro');
const renderer = new T.WebGLRenderer({antialias: true, alpha: !!GIRO, preserveDrawingBuffer: !!GIRO, powerPreference: 'high-performance'});
renderer.setPixelRatio(2); renderer.setSize(W(), H());
renderer.outputColorSpace = T.SRGBColorSpace; renderer.toneMapping = T.NeutralToneMapping; renderer.toneMappingExposure = 1;
stage.append(renderer.domElement);

if (!GIRO) fundo(scene);
luzes(scene);
// ambiente de softboxes para o brilho acetinado do plastico e do rotulo
const room = new T.Scene(); room.background = new T.Color(.3, .29, .27);
function softbox(w, h, x, y, z, i) {
  const m = new T.Mesh(new T.PlaneGeometry(w, h), new T.MeshBasicMaterial({color: new T.Color(i, i, i), side: T.DoubleSide}));
  m.position.set(x, y, z); m.lookAt(0, 0, 0); room.add(m);
}
// faixa alta e estreita na frente-esquerda: e ela que desenha o reflexo vertical do pote, como na foto do Alison
softbox(2.5, 4, -3, 2, 3, 3.2); softbox(.7, 5, -1.6, 1.2, 2.6, 5.5); softbox(1.6, 3.5, 3, 1, 1.5, 1.8); softbox(3, 2, 0, 4, -1, 2.6);
const pmrem = new T.PMREMGenerator(renderer);
scene.environment = pmrem.fromScene(room, .04).texture; pmrem.dispose();
scene.environmentIntensity = .85;

const controls = new OrbitControls(camera, renderer.domElement);
const ALTURA = 122 * MM;
controls.target.set(0, ALTURA * .48, 0);
controls.minDistance = .22; controls.maxDistance = 1.4; controls.maxPolarAngle = Math.PI * .53;
controls.enablePan = false; controls.enableDamping = true; controls.dampingFactor = .085; controls.autoRotateSpeed = .7;
if (new URLSearchParams(location.search).has("embed")) { document.body.classList.add("capture"); controls.autoRotate = true; }
camera.position.set(0, ALTURA * .62, .42);

// ---- materiais ----
const PETROLEO = new T.Color('#1d4535');            // verde do pote real (foto do fornecedor, 22/10)
// plastico de alto brilho: reflexos nitidos, como na foto
const plastico = new T.MeshPhysicalMaterial({color: PETROLEO, roughness: .18, metalness: 0, clearcoat: 1, clearcoatRoughness: .04, envMapIntensity: 1.1});
const tampaMat = new T.MeshPhysicalMaterial({color: PETROLEO, roughness: .18, metalness: 0, clearcoat: 1, clearcoatRoughness: .04, envMapIntensity: 1.1});
// rotulo acetinado; so o Good Green da marca d'agua leva verniz localizado (mesma cor do fundo, so brilho).
// Os mapas vem das "Chapas de verniz" do Figma, uma por produto, com tudo que e impresso por cima vazado: rugosidade .55 fora e .12 no verniz, clearcoat so no verniz.
const rotuloMat = new T.MeshPhysicalMaterial({roughness: 1, metalness: 0, clearcoat: 1, clearcoatRoughness: .03, envMapIntensity: 1.05});
// letra pequena nitida de longe: leve vies de mipmap (receita dos visualizadores NHV)
rotuloMat.onBeforeCompile = s => {
  s.fragmentShader = s.fragmentShader.replace('sampledDiffuseColor = texture2D( map, vMapUv )', 'sampledDiffuseColor = texture2D( map, vMapUv, -.8 )');
};

// ---- geometria ----
// perfil com cantos arredondados: cada canto vira um arco de quarto de circulo amostrado
function perfil(pontos) {
  const out = [];
  for (const p of pontos) {
    if (p.r == null) { out.push(new T.Vector2(p[0] * MM, p[1] * MM)); continue; }
    const {cx, cy, r, a0, a1} = p;
    for (let i = 0; i <= 10; i++) { const a = a0 + (a1 - a0) * i / 10; out.push(new T.Vector2((cx + r * Math.cos(a)) * MM, (cy + r * Math.sin(a)) * MM)); }
  }
  return out;
}
// cilindro reto como o pote real (foto de 22/10): quinas quase vivas, tampa da mesma largura do corpo
const RC = R_CORPO / MM, R_GARGALO = RC - 1.2;
const corpo = perfil([
  [0, 0], [RC - 1.5, 0],
  {cx: RC - 1.5, cy: 1.5, r: 1.5, a0: -Math.PI / 2, a1: 0},
  [RC, H_CORPO - 1],
  {cx: RC - 1, cy: H_CORPO - 1, r: 1, a0: 0, a1: Math.PI / 2},
  [R_GARGALO, H_CORPO], [R_GARGALO, H_CORPO + 3], [0, H_CORPO + 3],
]);
const RT = RC + .2, T0 = H_CORPO + 1.2, T1 = H_CORPO + 1.2 + 23;   // tampa alta e reta, como na foto do pote
const tampa = perfil([
  [0, T0 + .3], [RT - .6, T0],
  {cx: RT - .6, cy: T0 + .6, r: .6, a0: -Math.PI / 2, a1: 0},
  [RT, T1 - 1.2],
  {cx: RT - 1.2, cy: T1 - 1.2, r: 1.2, a0: 0, a1: Math.PI / 2},
  [0, T1],
]);
const produto = new T.Group(); scene.add(produto);
produto.add(new T.Mesh(new T.LatheGeometry(corpo, 192), plastico));
produto.add(new T.Mesh(new T.LatheGeometry(tampa, 192), tampaMat));
// filete fino entre a tampa e o corpo, para a junta ler como peca separada
const junta = new T.Mesh(new T.CylinderGeometry(R_GARGALO * 1.0, R_GARGALO * 1.0, 1.6 * MM, 128, 1, true), new T.MeshBasicMaterial({color: 0x061615}));
junta.position.y = (H_CORPO + .8) * MM; produto.add(junta);

const rotGeo = new T.CylinderGeometry(R_ROT, R_ROT, ROT_A * MM, 384, 1, true, -FRENTE_U * Math.PI * 2, Math.PI * 2);
const rotulo = new T.Mesh(rotGeo, rotuloMat); rotulo.position.y = ROT_BAIXO + ROT_A * MM / 2; produto.add(rotulo);

const sombra = sombraContato(renderer, scene, {largura: .26, profundidade: .26, altura: .08, opacidade: .6});
sombra.atualiza();

// ---- texturas ----
const loader = new T.TextureLoader(), cache = {};
const aniso = renderer.capabilities.getMaxAnisotropy();
function textura(p) {
  if (!cache[p.id]) cache[p.id] = new Promise(ok => loader.load(p.tex, t => { t.colorSpace = T.SRGBColorSpace; t.anisotropy = aniso; t.repeat.set(VISIVEL, 1); t.offset.set(EMENDA, 0); ok(t); }));
  return cache[p.id];
}
function mapa(arq) {
  const t = loader.load(arq, () => { dirty = true; });
  t.colorSpace = T.NoColorSpace; t.anisotropy = aniso; t.repeat.set(VISIVEL, 1); t.offset.set(EMENDA, 0); return t;
}
const mapas = {};
function mapasDo(p) { return mapas[p.id] ||= {rug: mapa('verniz-rugosidade-' + p.id + '.png'), cc: mapa('verniz-mascara-' + p.id + '.png')}; }
let atual = PRODUTOS[0];
async function mostra(p) {
  atual = p;
  rotuloMat.map = await textura(p); const m = mapasDo(p); rotuloMat.roughnessMap = m.rug; rotuloMat.clearcoatMap = m.cc; rotuloMat.needsUpdate = true; dirty = true;
  document.querySelectorAll('[data-produto]').forEach(b => b.setAttribute('aria-pressed', b.dataset.produto === p.id));
  document.querySelector('#nome').textContent = p.nome;
}

// ---- desenho sob demanda, 1x girando e 2x parado ----
let dirty = true, tween = null, parado = null;
controls.addEventListener('start', () => { clearTimeout(parado); renderer.setPixelRatio(1); renderer.setSize(W(), H()); });
controls.addEventListener('end', () => { parado = setTimeout(() => { renderer.setPixelRatio(2); renderer.setSize(W(), H()); dirty = true; }, 200); });
function vista(u) {
  const az0 = controls.getAzimuthalAngle(), alvo = (u - FRENTE_U) * Math.PI * 2;
  let d = alvo - az0; d = Math.atan2(Math.sin(d), Math.cos(d));
  tween = {t0: performance.now(), az0, d, dist: camera.position.distanceTo(controls.target)};
}
function loop(now) {
  requestAnimationFrame(loop);
  if (tween) {
    const k = Math.min(1, (now - tween.t0) / 700), e = k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
    const az = tween.az0 + tween.d * e, y = camera.position.y - controls.target.y;
    const hor = Math.sqrt(Math.max(tween.dist ** 2 - y * y, 1e-6));
    camera.position.set(controls.target.x + hor * Math.sin(az), camera.position.y, controls.target.z + hor * Math.cos(az));
    dirty = true; if (k >= 1) tween = null;
  }
  if (controls.update() || dirty || controls.autoRotate) { renderer.render(scene, camera); dirty = false; }
}

addEventListener('resize', () => { camera.aspect = W() / H(); camera.updateProjectionMatrix(); renderer.setSize(W(), H()); dirty = true; });

// ---- interface ----
const lista = document.querySelector('#produtos');
for (const p of PRODUTOS) {
  const b = document.createElement('button'); b.dataset.produto = p.id; b.textContent = p.nome.split(' · ')[0];
  b.title = p.nome; b.onclick = () => mostra(p); lista.append(b);
}
for (const [id, u] of Object.entries(PAINEIS)) document.querySelector('#v-' + id).onclick = () => vista(u);
document.querySelector('#rotate').onclick = e => { controls.autoRotate = !controls.autoRotate; e.currentTarget.setAttribute('aria-pressed', controls.autoRotate); dirty = true; };
document.querySelector('#exposure').oninput = e => { renderer.toneMappingExposure = +e.target.value; dirty = true; };
document.querySelector('#save').onclick = () => {
  const pr = renderer.getPixelRatio(); renderer.setPixelRatio(2400 / W()); renderer.setSize(W(), H()); renderer.render(scene, camera);
  const a = document.createElement('a'); a.download = 'good-green-' + atual.id + '.png'; a.href = renderer.domElement.toDataURL('image/png'); a.click();
  renderer.setPixelRatio(pr); renderer.setSize(W(), H()); dirty = true;
};

if (GIRO) {
  document.body.classList.add('capture'); renderer.setClearColor(0x000000, 0); document.documentElement.style.background = document.body.style.background = 'transparent';
  await mostra(PRODUTOS.find(p => p.id === GIRO) || PRODUTOS[0]);
  camera.position.set(0, ALTURA * .55, .36); controls.target.set(0, ALTURA * .5, 0); controls.update();
  window.giroQuadro = i => {                       // i = 0..N-1 gira o PRODUTO (a luz fica parada, como num estúdio)
    produto.rotation.y = -i / window.giroN * Math.PI * 2; renderer.render(scene, camera); return true; };
  window.giroN = 192; document.querySelector('#status').hidden = true; window.giroPronto = true;
} else {
await mostra(PRODUTOS[0]);
for (const p of PRODUTOS.slice(1)) textura(p);
document.querySelector('#status').hidden = true;
requestAnimationFrame(loop);
}
