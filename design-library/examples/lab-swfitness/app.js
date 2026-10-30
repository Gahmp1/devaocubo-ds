/* Troca de produto: muda os tokens no <html> e avisa os módulos. Carrega por último. */
(function () {
  const root = document.documentElement, sw = document.getElementById('switch');
  if (window.LAB_ONLY) LAB.order = [window.LAB_ONLY]; // versão de um produto só: sem troca, sem storage
  LAB.order.forEach((id) => {
    const b = document.createElement('button'); b.textContent = LAB.names[id]; b.dataset.p = id; b.setAttribute('aria-pressed', 'false');
    b.addEventListener('click', () => set(id)); sw.appendChild(b);
  });
  function set(id) {
    root.dataset.product = id;
    [...sw.children].forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.p === id)));
    try { localStorage.setItem('lab-product', id); } catch (e) { /* sem storage: segue */ }
    document.dispatchEvent(new Event('lab:product'));
  }
  let start = window.LAB_ONLY || 'somma';
  if (!window.LAB_ONLY) try { const s = localStorage.getItem('lab-product'); if (s && LAB.order.indexOf(s) >= 0) start = s; } catch (e) { /* ignora */ }
  set(start);
})();
