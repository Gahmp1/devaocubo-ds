// Monta as quatro colunas a partir do <template> e lê do tema (themes.css) as escolhas discretas de cada produto.
const products = ['devaocubo', 'swfitness', 'somma', 'trippo']
// Espelha theme.provisional de @gahmp1/ds-theme (o CSS não carrega esse dado).
const provisional = { swfitness: { light: true }, somma: { light: true, dark: true }, trippo: { light: true, dark: true } }
const discrete = ['ai-orb', 'ai-steps', 'press-kind', 'card-type', 'tab-bar', 'header']
const attr = { 'ai-orb': 'orb', 'ai-steps': 'steps', 'press-kind': 'press', 'card-type': 'card', 'tab-bar': 'tab-bar', header: 'header' }

const grid = document.getElementById('grid')
const tpl = document.getElementById('screen')
const cols = products.map((name) => {
  const col = tpl.content.firstElementChild.cloneNode(true)
  col.dataset.product = name
  col.querySelector('.cap-name').textContent = name
  grid.appendChild(col)
  const css = getComputedStyle(col)
  for (const k of discrete) col.setAttribute(`data-${attr[k]}`, css.getPropertyValue(`--ds-${k}`).trim())
  return col
})

const dark = matchMedia('(prefers-color-scheme: dark)')
let scheme = 'system'
function apply() {
  const effective = scheme === 'system' ? (dark.matches ? 'dark' : 'light') : scheme
  for (const el of [document.body, ...cols]) {
    if (scheme === 'system') delete el.dataset.theme
    else el.dataset.theme = scheme
  }
  for (const col of cols) col.toggleAttribute('data-provisional', !!provisional[col.dataset.product]?.[effective])
  for (const b of document.querySelectorAll('[data-scheme]')) b.setAttribute('aria-checked', String(b.dataset.scheme === scheme))
}
for (const b of document.querySelectorAll('[data-scheme]')) b.addEventListener('click', () => { scheme = b.dataset.scheme; apply() })
dark.addEventListener('change', apply)
document.getElementById('hide-names').addEventListener('change', (e) => document.body.classList.toggle('hide-names', e.target.checked))
grid.addEventListener('click', (e) => {
  const tab = e.target.closest('.tab')
  if (!tab) return
  for (const t of tab.parentElement.children) t.classList.toggle('on', t === tab)
})
apply()
