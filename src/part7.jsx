// ===== Part 7: Pages 20-22 (승화) =====
const { useState: useState7, useEffect: useEffect7, useRef: useRef7 } = React;

// ---------- Page 20 — Question Re-emergence ----------
function Page20Question({ next }) {
  const [rev, setRev] = useState7(0);
  useEffect7(() => {
    const timers = [
      setTimeout(() => setRev(1), 900),
      setTimeout(() => setRev(2), 2600),
      setTimeout(() => setRev(3), 4400),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);
  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: 'radial-gradient(circle at center, #f7ecd0 0%, #dfcf9d 58%, #b99f67 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden'
    }}>
      {/* paper texture — page 4 와 동일 */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='320' height='320'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.35 0 0 0 0 0.28 0 0 0 0 0.18 0 0 0 0.28 0'/></filter><rect width='320' height='320' filter='url(%23n)'/></svg>")`,
        mixBlendMode: 'multiply', opacity: 0.38, pointerEvents: 'none'
      }} />
      {/* vignette — page 4 와 동일 */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(circle at center, rgba(0,0,0,0) 48%, rgba(65,42,20,0.34) 100%)',
        zIndex: 1
      }} />
      <div style={{ textAlign: 'center', position: 'relative' }}>
        {/* page20_title 이미지로 문구 대체 */}
        <img src="assets/page20_title.png" alt=""
          style={{
            display: 'block', margin: '0 auto',
            maxWidth: '72vw', width: 'min(920px, 72vw)', height: 'auto',
            opacity: rev >= 2 ? 1 : 0,
            transform: rev >= 2 ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.98)',
            transition: 'opacity 2s ease, transform 2s ease',
            mixBlendMode: 'multiply',
            pointerEvents: 'none', userSelect: 'none'
          }}
          draggable="false" />
        <div style={{
          marginTop: 60,
          fontFamily: 'var(--sans)', fontSize: 12, letterSpacing: '0.3em',
          color: '#5a4520', opacity: rev >= 3 ? 0.85 : 0,
          transition: 'opacity 1.8s ease',
        }}>
          — 소중한 존재에게 한 마디 건네 보세요 —
        </div>
      </div>
      {rev >= 3 && (
        <button className="next-btn" style={{ color: '#2a1810', borderColor: '#2a1810' }}
          onClick={next}>편지 쓰기 →</button>
      )}
    </div>
  );
}

// ---------- Page 21 — Letter writing ----------
function Page21Letter({ next, addLetter }) {
  const [text, setText] = useState7("");
  const [sent, setSent] = useState7(false);
  const submit = () => {
    if (!text.trim()) return;
    addLetter(text.trim());
    setSent(true);
    setTimeout(next, 2000);
  };
  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: 'linear-gradient(180deg, #0f2438 0%, #1a3a54 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      {/* Hanji paper — image with letter-writing area on top */}
      <div style={{
        position: 'relative', width: 680, height: 680,
        transform: sent ? 'translateY(30px) rotate(1deg) scale(0.98)' : 'none',
        opacity: sent ? 0.8 : 1,
        transition: 'all 1.4s ease',
        filter: 'drop-shadow(0 30px 80px rgba(0,0,0,0.55))',
      }}>
        {/* Hanji background image */}
        <img src="assets/page21_hanji.png" alt=""
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover', pointerEvents: 'none', userSelect: 'none'
          }} />

        {/* Writing area — POST CARD·書信 라벨 제거 */}
        <div style={{
          position: 'absolute', inset: '22% 13% 16% 13%',
          display: 'flex', flexDirection: 'column'
        }}>
          <div style={{
            fontFamily: 'var(--serif)', fontSize: 22,
            color: '#2a1d10', marginBottom: 24,
            letterSpacing: '-0.01em'
          }}>
            소중한 존재에게 전하고 싶은 말
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="이 곳에 한 마디를 남기세요…"
            disabled={sent}
            style={{
              width: '100%', flex: 1,
              background: 'transparent',
              border: 'none', outline: 'none',
              fontFamily: 'var(--serif)', fontSize: 20,
              lineHeight: 1.9,
              color: '#2a1d10',
              resize: 'none'
            }} />

        </div>

        {/* Stamp(書 한자 + 네모칸) 제거됨 */}

        {/* Send button — 크기 축소 + 배경 이미지와 겹치지 않게 위로 이동 */}
        <div style={{ position: 'absolute', bottom: '15%', right: '17%' }}>
          <button onClick={submit}
            disabled={sent || !text.trim()}
            style={{
              padding: '8px 20px',
              fontFamily: 'var(--sans)', fontSize: 10, letterSpacing: '0.28em',
              background: sent ? 'transparent' : '#8a2419',
              color: sent ? '#8a2419' : '#f5ead0',
              border: '1px solid #8a2419',
              cursor: sent ? 'default' : 'pointer',
              opacity: !text.trim() ? 0.3 : 1
            }}>
            {sent ? '흘려보냄 ·' : '강에 보내기 →'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------- Page 22 — River + Community (IX6) ----------
function Page22River({ prev, letters }) {
  const [selectedIdx, setSelectedIdx] = useState7(null);

  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: 'linear-gradient(180deg, #050f1a 0%, #0c2238 45%, #15344c 100%)',
      overflow: 'hidden',
      fontFamily: 'var(--serif)'
    }}>
      {/* 먼 산 실루엣 — 얇은 선으로 자연스럽게 */}
      <svg viewBox="0 0 1920 420" preserveAspectRatio="none"
        style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '40%',
          opacity: 0.55, pointerEvents: 'none'
        }}>
        <path d="M0,320 L180,140 L320,240 L520,90 L760,260 L980,120 L1240,220 L1480,80 L1720,200 L1920,150 L1920,420 L0,420 Z"
          fill="#081624" />
        <path d="M0,360 L140,240 L320,300 L540,200 L820,320 L1080,220 L1320,300 L1580,200 L1820,280 L1920,260 L1920,420 L0,420 Z"
          fill="#112a40" />
        <path d="M0,400 L320,340 L680,380 L1080,330 L1520,370 L1920,350 L1920,420 L0,420 Z"
          fill="#1a3a54" opacity="0.6" />
      </svg>

      {/* 달빛 — 오른쪽 상단에 은은한 원 */}
      <div style={{
        position: 'absolute', top: '12%', right: '18%',
        width: 140, height: 140, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(245,234,208,0.28) 0%, rgba(245,234,208,0) 70%)',
        filter: 'blur(2px)',
        pointerEvents: 'none'
      }} />

      {/* 별 — 아주 드물게 */}
      {[{ t: '8%', l: '38%' }, { t: '5%', l: '52%' }, { t: '14%', l: '66%' }, { t: '18%', l: '82%' }, { t: '6%', l: '26%' }].map((p, i) => (
        <div key={i} style={{
          position: 'absolute', top: p.t, left: p.l,
          width: 2, height: 2, borderRadius: '50%',
          background: 'rgba(245,234,208,0.6)',
          boxShadow: '0 0 4px rgba(245,234,208,0.8)',
          animation: `twinkle ${3 + i}s ease-in-out infinite`,
          animationDelay: `${i * 0.4}s`
        }} />
      ))}

      {/* 강물 — 하단 */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '55%',
        background: 'linear-gradient(180deg, #1a3a54 0%, #0a1a28 100%)'
      }}>
        {/* 물결 레이어 */}
        {[0, 1, 2, 3].map(i => (
          <div key={i} style={{
            position: 'absolute', left: '-50%', right: '-50%',
            top: `${8 + i * 18}%`, height: 2,
            background: `linear-gradient(90deg, transparent 0%, rgba(232,184,92,${0.2 - i * 0.04}) 50%, transparent 100%)`,
            animation: `river${i} ${12 + i * 4}s linear infinite`,
          }} />
        ))}

        {/* 방금 쓴 편지 (첫 번째) */}
        {letters.length > 0 && (
          <div style={{
            position: 'absolute', top: '22%', left: 0,
            animation: 'floatLetter 24s linear infinite'
          }}>
            <div style={{
              width: 130, height: 88,
              background: '#f6ead0',
              boxShadow: '0 8px 20px rgba(0,0,0,0.5)',
              padding: 10,
              fontFamily: 'var(--serif)', fontSize: 9, color: '#2a1d10',
              lineHeight: 1.35,
              transform: 'rotate(-5deg)',
              overflow: 'hidden'
            }}>
              {letters[0].text.slice(0, 60)}
            </div>
          </div>
        )}

        {/* 이전 편지들 */}
        {letters.slice(1, 6).map((l, i) => (
          <div key={i} style={{
            position: 'absolute', top: `${38 + i * 9}%`, left: 0,
            animation: `floatLetter ${26 + i * 4}s linear infinite`,
            animationDelay: `${-i * 6}s`
          }}>
            <div style={{
              width: 95, height: 64,
              background: '#ede2c3',
              boxShadow: '0 4px 10px rgba(0,0,0,0.4)',
              padding: 7,
              fontFamily: 'var(--serif)', fontSize: 7, color: '#2a1d10',
              transform: `rotate(${i % 2 === 0 ? -4 : 3}deg)`,
              opacity: 0.78,
              overflow: 'hidden'
            }}>
              {l.text.slice(0, 40)}
            </div>
          </div>
        ))}
      </div>

      {/* ========== 좌측 커뮤니티 사이드바 ========== */}
      {/* 금색 테두리 · 경계선 전부 제거. 은은한 그라디언트 + 여백으로 분리 */}
      <aside style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: 360,
        background: 'linear-gradient(180deg, rgba(5,12,22,0.88) 0%, rgba(8,20,32,0.72) 100%)',
        padding: '72px 36px 40px',
        overflowY: 'auto',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)'
      }} className="no-scrollbar">

        {/* 섹션 라벨 */}
        <div style={{
          fontFamily: 'var(--serif)', fontSize: 13,
          color: 'rgba(245,234,208,0.45)',
          letterSpacing: '0.12em',
          marginBottom: 8
        }}>
          先 · 먼저 다녀간 이들
        </div>

        {/* 편지 개수 — 작은 메타 정보 */}
        <div style={{
          fontFamily: 'var(--serif)', fontSize: 11,
          color: 'rgba(245,234,208,0.3)',
          marginBottom: 36
        }}>
          {letters.length > 0 ? `${letters.length}통의 편지` : ' '}
        </div>

        {letters.length === 0 ? (
          <div style={{
            fontFamily: 'var(--serif)', fontSize: 15,
            color: 'rgba(245,234,208,0.42)',
            lineHeight: 1.9,
            fontStyle: 'italic'
          }}>
            아직 흘러간 편지가 없습니다.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {letters.map((l, i) => {
              const isOpen = selectedIdx === i;
              return (
                <button key={i}
                  onClick={() => setSelectedIdx(isOpen ? null : i)}
                  style={{
                    background: isOpen ? 'rgba(245,234,208,0.06)' : 'transparent',
                    border: 'none',
                    padding: '18px 4px 18px 0',
                    cursor: 'pointer',
                    fontFamily: 'var(--serif)',
                    color: '#f5ead0',
                    fontSize: 15, lineHeight: 1.65,
                    textAlign: 'left',
                    transition: 'background 0.4s ease, padding 0.3s ease',
                    position: 'relative',
                    paddingLeft: isOpen ? 14 : 4
                  }}>
                  {/* 상단 구분선 (첫 번째 제외) — 매우 얇고 어두움 */}
                  {i > 0 && (
                    <div style={{
                      position: 'absolute', top: 0, left: 0, right: 0,
                      height: 1,
                      background: 'linear-gradient(90deg, rgba(245,234,208,0.08) 0%, transparent 100%)'
                    }} />
                  )}
                  {/* 날짜 + 번호 */}
                  <div style={{
                    fontFamily: 'var(--serif)', fontSize: 11,
                    color: 'rgba(245,234,208,0.4)',
                    marginBottom: 8,
                    letterSpacing: '0.04em'
                  }}>
                    {String(i + 1).padStart(2, '0')} · {new Date(l.ts).toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' })}
                  </div>
                  {/* 본문 */}
                  <div style={{
                    whiteSpace: isOpen ? 'pre-wrap' : 'nowrap',
                    overflow: 'hidden', textOverflow: 'ellipsis',
                    color: isOpen ? '#f5ead0' : 'rgba(245,234,208,0.82)',
                    fontSize: isOpen ? 16 : 14.5,
                    transition: 'color 0.3s, font-size 0.3s'
                  }}>
                    {l.text}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </aside>

      {/* ========== 제목 ========== */}
      <div style={{
        position: 'absolute', top: 96, left: 420, right: 64,
        maxWidth: 760
      }}>
        <div style={{
          fontFamily: 'var(--serif)', fontSize: 42,
          color: '#f5ead0', lineHeight: 1.45,
          fontWeight: 400
        }}>
          당신의 편지가 강물 위로 흐릅니다.
        </div>
        <div style={{
          marginTop: 32,
          fontFamily: 'var(--serif)', fontSize: 17,
          color: 'rgba(245,234,208,0.62)',
          lineHeight: 2,
          maxWidth: 520
        }}>
          단종을 향한 엄흥도의 마음처럼,<br />
          당신의 말도 소중한 이에게 닿습니다.
        </div>
      </div>

      {/* ========== 하단 서명 ========== */}
      <div style={{
        position: 'absolute', bottom: 36, right: 48,
        fontFamily: 'var(--serif)',
        color: 'rgba(245,234,208,0.45)',
        textAlign: 'right', lineHeight: 1.6
      }}>
        <div style={{ fontSize: 13, letterSpacing: '0.18em' }}>終 · THE END</div>
        <div style={{ fontSize: 10, marginTop: 4, opacity: 0.75, letterSpacing: '0.12em' }}>
          THE CAT&rsquo;S WARDEN
        </div>
      </div>

      <style>{`
        @keyframes river0 { to { transform: translateX(50%); } }
        @keyframes river1 { to { transform: translateX(-50%); } }
        @keyframes river2 { to { transform: translateX(50%); } }
        @keyframes river3 { to { transform: translateX(-50%); } }
        @keyframes floatLetter {
          from { transform: translateX(-220px); }
          to   { transform: translateX(calc(100vw + 220px)); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.4; }
          50%      { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

Object.assign(window, { Page20Question, Page21Letter, Page22River });
