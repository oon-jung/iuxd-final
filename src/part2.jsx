// ===== Part 2: Pages 7-8 (SNS 유입) =====
const { useState: useState2, useEffect: useEffect2, useRef: useRef2 } = React;

// ---------- Page 7 — Instagram DM Stack (IX2) ----------
function Page7InstaStack({ next }) {
  const [progress, setProgress] = useState2(0); // 0..1
  const scrollRef = useRef2(null);

  useEffect2(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const max = el.scrollHeight - el.clientHeight;
      setProgress(Math.max(0, Math.min(1, el.scrollTop / max)));
    };
    el.addEventListener('scroll', onScroll);
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  const msgVisible = (threshold) => progress > threshold;

  return (
    <div ref={scrollRef} style={{
      position: 'absolute', inset: 0, overflowY: 'auto', overflowX: 'hidden',
      background: '#000'
    }} className="no-scrollbar">
      {/* Spacer for scroll length */}
      <div style={{ height: '250vh', position: 'relative' }}>
        {/* Sticky fullscreen stage */}
        <div style={{
          position: 'sticky', top: 0, height: '100vh', width: '100%',
          overflow: 'hidden'
        }}>
          {/* Fullscreen 16:9 background */}
          <img src="assets/page7_background.png" alt=""
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%', objectFit: 'cover',
            objectPosition: 'center'
          }} />

          {/* Messages — 원본 이미지가 투명 배경 + 메시지 제자리 포함.
              배경과 같은 크기/좌표로 겹쳐 배치하여 이미지 내부 메시지 위치 보존.
              스크롤에 따라 1 → 2 → 3 순차 등장. */}
          {[
            { src: "assets/page7_message1.png", threshold: 0.10, delay: 0 },
            { src: "assets/page7_message2.png", threshold: 0.35, delay: 0.05 },
            { src: "assets/page7_message3.png", threshold: 0.60, delay: 0.10 }
          ].map((m, i) =>
          <img key={i} src={m.src} alt=""
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              pointerEvents: 'none',
              opacity: msgVisible(m.threshold) ? 1 : 0,
              transform: msgVisible(m.threshold) ? 'translateY(0)' : 'translateY(14px)',
              transition: `opacity 0.6s ease ${m.delay}s, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${m.delay}s`
            }} />
          )}

          {/* Progress + hint */}
          <div style={{
            position: 'absolute', right: 32, top: '50%', transform: 'translateY(-50%)',
            width: 2, height: 240, background: 'rgba(255,255,255,0.12)'
          }}>
            <div style={{ width: '100%', background: '#e4405f', height: `${progress * 100}%`,
              transition: 'height 0.2s ease' }} />
          </div>
          <div style={{
            position: 'absolute', left: 32, top: '50%', transform: 'translateY(-50%)',
            fontFamily: 'var(--sans)', fontSize: 11, letterSpacing: '0.3em',
            color: 'rgba(255,255,255,0.5)', writingMode: 'vertical-rl'
          }}>

          </div>
          {progress > 0.85 &&
          <button className="next-btn" onClick={next}
          style={{ bottom: 40, color: '#f5f5f5', borderColor: '#f5f5f5' }}>
              다음 →
            </button>
          }
        </div>
      </div>
    </div>);

}

// ---------- Page 8 — Cat feed algorithm (Instagram Explore grid filling up) ----------
// 한 타일: 이미지 슬롯 + 색상 폴백 (이미지 없으면 placeholder 그대로)
function Page8FeedTile({ t, revealed }) {
  const [hasImg, setHasImg] = useState2(false);
  const num = String(t.i + 1).padStart(2, '0');
  return (
    <div style={{
      position: 'relative',
      background: revealed ?
      `linear-gradient(${t.i * 45 % 360}deg, hsl(${t.hue}, 22%, ${60 + t.i % 10}%) 0%, hsl(${(t.hue + 30) % 360}, 18%, ${45 + t.i % 15}%) 100%)` :
      '#ececec',
      overflow: 'hidden',
      opacity: revealed ? 1 : 0.25,
      transform: revealed ? 'scale(1)' : 'scale(0.92)',
      transition: 'opacity 0.5s ease, transform 0.5s ease, background 0.6s ease'
    }}>
      {/* 실 이미지 슬롯 — assets/slides/page8/01.png ~ 20.png */}
      <img
        src={`assets/slides/page8/${num}.png`}
        alt=""
        onLoad={() => setHasImg(true)}
        onError={(e) => { e.currentTarget.style.display = 'none'; setHasImg(false); }}
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%', objectFit: 'cover',
          opacity: revealed ? 1 : 0,
          transition: 'opacity 0.6s ease',
          zIndex: 1
        }}
      />
      {/* Placeholder diagonal stripes — 이미지 없을 때만 */}
      {!hasImg && <div style={{
        position: 'absolute', inset: 0, zIndex: 2,
        background: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.06) 0 8px, transparent 8px 16px)'
      }} />}
      {/* Label — 이미지 없을 때만 */}
      {!hasImg && <div style={{
        position: 'absolute', inset: 0, zIndex: 2,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'ui-monospace, monospace', fontSize: 10,
        letterSpacing: '0.2em',
        color: 'rgba(255,255,255,0.75)',
        textShadow: '0 1px 2px rgba(0,0,0,0.2)'
      }}>
        🐾 #{num}
      </div>}
      {/* Like count corner — 항상 표시 */}
      {revealed &&
      <div style={{
        position: 'absolute', bottom: 6, right: 8, zIndex: 3,
        fontFamily: 'var(--sans)', fontSize: 9, fontWeight: 600,
        color: 'rgba(255,255,255,0.92)',
        letterSpacing: '0.05em',
        textShadow: '0 1px 3px rgba(0,0,0,0.5)'
      }}>
        ♡ {((t.i + 1) * 243).toLocaleString()}
      </div>
      }
    </div>
  );
}

function Page8CatFeed({ next }) {
  const scrollRef = useRef2(null);
  const [progress, setProgress] = useState2(0);
  useEffect2(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const max = el.scrollHeight - el.clientHeight;
      setProgress(Math.max(0, Math.min(1, el.scrollTop / max)));
    };
    el.addEventListener('scroll', onScroll);
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  // Auto-advance when scrolled to the bottom
  useEffect2(() => {
    if (progress >= 0.98) {
      const t = setTimeout(() => next(), 800);
      return () => clearTimeout(t);
    }
  }, [progress, next]);

  // 5 cols x 4 rows Explore grid — each tile a cat placeholder
  const cols = 5,rows = 4;
  const total = cols * rows;
  const tiles = Array.from({ length: total }, (_, i) => ({
    i,
    hue: i * 37 % 360,
    // Randomize a bit but deterministic
    tall: i % 7 === 0
  }));

  // Each tile appears in sequence as scroll progresses
  // Title sits on the left, grid on the right
  return (
    <div ref={scrollRef} style={{
      position: 'absolute', inset: 0, overflowY: 'auto', overflowX: 'hidden',
      background: '#fafafa'
    }} className="no-scrollbar">
      <div style={{ height: '320vh', position: 'relative' }}>
        <div style={{
          position: 'sticky', top: 0, height: '100vh', overflow: 'hidden',
          display: 'flex', flexDirection: 'row'
        }}>
          {/* Left column — title anchored, stays visible */}
          <div style={{
            width: '38%', height: '100%',
            display: 'flex', flexDirection: 'column', justifyContent: 'center',
            padding: '0 72px',
            position: 'relative', zIndex: 2,
            background: 'linear-gradient(90deg, #fafafa 85%, rgba(250,250,250,0) 100%)'
          }}>
            <div style={{ fontFamily: 'var(--sans)', fontSize: 11, letterSpacing: '0.4em',
              color: '#888', marginBottom: 18 }}>
</div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: 44, color: '#1a1a1a', lineHeight: 1.35, letterSpacing: '-0.01em' }}>
              피드가 온통<br />
              <span style={{ color: '#e4405f', letterSpacing: "-1px" }}>고양이</span>로<br />
              도배된다.
            </div>
            <div style={{ marginTop: 36, fontFamily: 'var(--sans)', fontSize: 13,
              color: '#888', letterSpacing: '0.05em', lineHeight: 1.7, maxWidth: 320 }}>
              알고리즘은 나의 하루를,<br />
              그리고 나의 시선을<br />
              천천히 고양이로 물들여 간다.
            </div>
            <div style={{ marginTop: 60, fontFamily: 'var(--sans)', fontSize: 11,
              letterSpacing: '0.3em', color: '#888' }}>
              SCROLL ↓ · {Math.round(progress * 100)}% 빠져드는 중
            </div>
          </div>

          {/* Right column — Explore grid filling up. 5×4 = 20 tiles, each 2:3 portrait */}
          <div style={{
            flex: 1, height: '100%', position: 'relative',
            padding: '24px 24px 24px 0',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <div style={{
              /* 5/6 aspect 컨테이너 → 안쪽 셀이 (5/5):(6/4) = 2:3 portrait 가 됨 */
              aspectRatio: '5 / 6',
              height: '100%', maxWidth: '100%',
              display: 'grid',
              gridTemplateColumns: `repeat(${cols}, 1fr)`,
              gridTemplateRows: `repeat(${rows}, 1fr)`,
              gap: 4
            }}>
              {tiles.map((t) => {
                const threshold = t.i / (total + 2);
                const revealed = progress > threshold;
                return <Page8FeedTile key={t.i} t={t} revealed={revealed} />;
              })}
            </div>

            {/* Vignette overlay that fades as grid fills */}
            <div style={{
              position: 'absolute', inset: 0, pointerEvents: 'none',
              background: 'radial-gradient(ellipse at center, rgba(250,250,250,0) 20%, rgba(250,250,250,0.85) 100%)',
              opacity: Math.max(0, 1 - progress * 1.8),
              transition: 'opacity 0.3s ease'
            }} />
          </div>

          {progress > 0.9 &&
          <div style={{
            position: 'absolute', bottom: 24, left: 0, right: 0, textAlign: 'center',
            fontFamily: 'var(--sans)', fontSize: 11, letterSpacing: '0.3em',
            color: '#888',
            animation: 'hintPulse 1.6s ease-in-out infinite'
          }}>다음으로 넘어가는 중...</div>
          }
        </div>
      </div>
    </div>);

}

// ---------- Page 8.5 — 관심의 시작: 속마음 → 친구 피드 좋아요 ----------
// 주인공이 "아 진짜 고양이로 돈 벌 수 있나?" 속마음이 뜬 후,
// 화면(친구 피드)을 클릭해 하트를 누르게 한다.
function Page85Interest({ next }) {
  const [step, setStep] = useState2(0); // 0: 속마음 등장, 1: 클릭 유도, 2: 좋아요 눌림
  const [liked, setLiked] = useState2(false);

  useEffect2(() => {
    const t1 = setTimeout(() => setStep(1), 1800); // 속마음 뜬 후 클릭 유도로
    return () => clearTimeout(t1);
  }, []);

  const handleLike = () => {
    if (liked || step < 1) return;
    setLiked(true);
    setStep(2);
    setTimeout(() => next(), 2200);
  };

  return (
    <div
      onClick={handleLike}
      style={{
        position: 'absolute', inset: 0,
        background: '#000',
        overflow: 'hidden',
        cursor: step >= 1 && !liked ? 'pointer' : 'default'
      }}>

      {/* 배경 — 주인공 손/폰 프레임 */}
      <img src="assets/page8.5_background.png" alt=""
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center',
          pointerEvents: 'none', userSelect: 'none'
        }}
        draggable="false" />

      {/* 친구 피드 — 좋아요 누르기 전 (page8.5_1) */}
      <img src="assets/page8.5_1.png" alt=""
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center',
          opacity: liked ? 0 : 1,
          transition: 'opacity 0.45s ease',
          pointerEvents: 'none', userSelect: 'none'
        }}
        draggable="false" />

      {/* 친구 피드 — 좋아요 누른 후 (page8.5_2) */}
      <img src="assets/page8.5_2.png" alt=""
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center',
          opacity: liked ? 1 : 0,
          transition: 'opacity 0.45s ease',
          pointerEvents: 'none', userSelect: 'none'
        }}
        draggable="false" />

      {/* 상단 속마음 말풍선 — 휴대폰과 수평 중앙 정렬, 좋아요 누르면 사라짐 */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '54%',
        transform: liked
          ? 'translate(-50%, -20px) scale(0.92)'
          : (step >= 0 ? 'translate(-50%, 0)' : 'translate(-50%, -40%)'),
        opacity: liked ? 0 : (step >= 0 ? 1 : 0),
        transition: 'transform 0.6s cubic-bezier(.2,.85,.3,1), opacity 0.55s ease',
        padding: '22px 34px',
        background: 'rgba(255,255,255,0.96)',
        borderRadius: 22,
        boxShadow: '0 18px 46px rgba(0,0,0,0.45), 0 4px 12px rgba(0,0,0,0.25)',
        fontFamily: 'var(--serif)',
        fontSize: 26,
        color: '#1a1a1a',
        letterSpacing: '0.01em',
        whiteSpace: 'nowrap',
        textAlign: 'center',
        zIndex: 10,
        pointerEvents: 'none'
      }}>
        아 진짜 고양이로 돈 벌 수 있나…?
        {/* 말풍선 꼬리 */}
        <div style={{
          position: 'absolute',
          bottom: -10, left: '50%', transform: 'translateX(-50%) rotate(45deg)',
          width: 18, height: 18,
          background: 'rgba(255,255,255,0.96)',
          boxShadow: '4px 4px 10px rgba(0,0,0,0.15)'
        }} />
      </div>

      {/* 클릭 유도 힌트 — step 1 에서 등장 */}
      {step === 1 && !liked && (
        <div style={{
          position: 'absolute', bottom: 60, left: 0, right: 0, textAlign: 'center',
          fontFamily: 'var(--sans)', fontSize: 13, letterSpacing: '0.28em',
          color: '#f5ead0', zIndex: 10,
          animation: 'hintPulse 1.6s ease-in-out infinite',
          textShadow: '0 2px 14px rgba(0,0,0,0.9)'
        }}>
          화면을 눌러 ♡ 좋아요
        </div>
      )}

      {/* 좋아요 순간 팝 애니메이션 — 화면 중앙에 하트 한 번 */}
      {liked && (
        <div style={{
          position: 'absolute', inset: 0, display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          pointerEvents: 'none', zIndex: 20
        }}>
          <div style={{
            fontSize: 160,
            color: '#e4405f',
            animation: 'likePop 0.9s cubic-bezier(.2,.9,.3,1) forwards',
            textShadow: '0 10px 30px rgba(228,64,95,0.45)',
            opacity: 0
          }}>♥</div>
        </div>
      )}

      {/* 좋아요 후 자동 진행 안내 */}
      {liked && (
        <div style={{
          position: 'absolute', bottom: 60, left: 0, right: 0, textAlign: 'center',
          fontFamily: 'var(--sans)', fontSize: 12, letterSpacing: '0.3em',
          color: 'rgba(245,234,208,0.85)', zIndex: 10,
          animation: 'fadeIn 0.8s ease 0.4s both',
          textShadow: '0 2px 14px rgba(0,0,0,0.9)'
        }}>
          관심이 시작된다…
        </div>
      )}

      <style>{`
        @keyframes likePop {
          0%   { opacity: 0; transform: scale(0.4); }
          30%  { opacity: 1; transform: scale(1.25); }
          60%  { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
}

Object.assign(window, { Page7InstaStack, Page8CatFeed, Page85Interest });