// ===== App shell =====
const { useState, useEffect, useRef, useCallback, useMemo } = React;

const PAGES = [
  // Part 1 — 도입 · 논리
  { id: 1,  part: 1, label: "01 Intro",          auto: 5000,  tone: "tone-paper-warm" },
  { id: 2,  part: 1, label: "02 Historical",      manual: true, tone: "tone-paper" },
  { id: 3,  part: 1, label: "03 AroundUs",        manual: true, tone: "tone-dark" },
  { id: 4,  part: 1, label: "04 Gallery",         manual: true, tone: "tone-paper" },
  { id: 5,  part: 1, label: "05 AroundText",      manual: true, tone: "tone-paper" },
  { id: 6,  part: 1, label: "06 Discover",        manual: true, tone: "tone-dark" },
  // Part 2 — SNS
  { id: 7,  part: 2, label: "07 InstaStack",      scroll: true, tone: "tone-insta" },
  { id: 8,  part: 2, label: "08 CatFeed",         scroll: true, tone: "tone-insta" },
  { id: 8.5, part: 2, label: "08.5 Interest",     manual: true, tone: "tone-dark" },
  // Part 3 — 첫 만남
  { id: 9,  part: 3, label: "09 Video1",          video: true,  tone: "tone-dark" },
  { id: 10, part: 3, label: "10 Monologue1",      manual: true, tone: "tone-dark" },
  { id: 11, part: 3, label: "11 Feeding",         manual: true, tone: "tone-paper-warm" },
  // Part 4 — 유대
  { id: 12, part: 4, label: "12 Diary",           manual: true, tone: "tone-paper" },
  { id: 13, part: 4, label: "13 Rubbing",         manual: true, tone: "tone-dark" },
  // Part 5 — 위기
  { id: 14, part: 5, label: "14 Monologue2",      manual: true, tone: "tone-dark" },
  { id: 15, part: 5, label: "15 Poster",          manual: true, tone: "tone-dark" },
  { id: 16, part: 5, label: "16 Video2",          video: true,  tone: "tone-dark" },
  // Part 6 — 상실
  { id: 17, part: 6, label: "17 Monologue3",      manual: true, tone: "tone-dark" },
  { id: 18, part: 6, label: "18 Memory3D",        manual: true, tone: "tone-dark" },
  { id: 19, part: 6, label: "19 Video3",          video: true,  tone: "tone-dark" },
  // Part 7 — 승화
  { id: 20, part: 7, label: "20 Question",        manual: true, tone: "tone-dark" },
  { id: 21, part: 7, label: "21 Letter",          manual: true, tone: "tone-river" },
  { id: 22, part: 7, label: "22 River",           manual: true, tone: "tone-river" },
];

function App() {
  const [idx, setIdx] = useState(0);
  const [letters, setLetters] = useState(() => {
    try { return JSON.parse(localStorage.getItem('cw_letters') || '[]'); }
    catch { return []; }
  });

  const page = PAGES[idx];
  const go = useCallback((n) => {
    const clamped = Math.max(0, Math.min(PAGES.length - 1, n));
    setIdx(clamped);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);
  const next = useCallback(() => go(idx + 1), [idx, go]);
  const prev = useCallback(() => go(idx - 1), [idx, go]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.target.tagName === 'TEXTAREA' || e.target.tagName === 'INPUT') return;
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') { e.preventDefault(); next(); }
      if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); prev(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev]);

  // Auto-advance
  useEffect(() => {
    if (page.auto) {
      const t = setTimeout(next, page.auto);
      return () => clearTimeout(t);
    }
  }, [idx, page, next]);

  const addLetter = (text) => {
    const entry = { text, ts: Date.now() };
    const updated = [entry, ...letters].slice(0, 60);
    setLetters(updated);
    try { localStorage.setItem('cw_letters', JSON.stringify(updated)); } catch {}
  };

  const shared = { idx, next, prev, go, page, addLetter, letters };

  return (
    <>
      <div className={`page ${page.tone}`} key={page.id}>
        {renderPage(page, shared)}
      </div>
      <div className="page-counter">{String(page.id).padStart(2, '0')} / {PAGES.length} · PART {page.part}</div>
      <nav className="nav-dots" aria-label="pages">
        {PAGES.map((p, i) => (
          <button
            key={p.id}
            className={'nav-dot' + (i === idx ? ' active' : '')}
            onClick={() => go(i)}
            title={p.label}
          />
        ))}
      </nav>
    </>
  );
}

function renderPage(p, shared) {
  const map = {
    1: window.Page1Intro, 2: window.Page2Historical, 3: window.Page3AroundUs,
    4: window.Page4Gallery, 5: window.Page5AroundText, 6: window.Page6Discover,
    7: window.Page7InstaStack, 8: window.Page8CatFeed, 8.5: window.Page85Interest,
    9: window.Page9Video1, 10: window.Page10Monologue1, 11: window.Page11Feeding,
    12: window.Page12Diary, 13: window.Page13Rubbing,
    14: window.Page14Monologue2, 15: window.Page15Poster, 16: window.Page16Video2,
    17: window.Page17Monologue3, 18: window.Page18Memory3D, 19: window.Page19Video3,
    20: window.Page20Question, 21: window.Page21Letter, 22: window.Page22River,
  };
  const C = map[p.id];
  return C ? <C {...shared} /> : <div className="center-col">Page {p.id} — loading…</div>;
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
