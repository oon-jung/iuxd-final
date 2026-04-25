// ===== Part 6: Pages 17-19 (상실) =====
const { useState: useState6, useEffect: useEffect6, useRef: useRef6 } = React;

// ---------- Page 17 — Monologue 3 ----------
// 배경: assets/page17.jpg / 문구: 처음에는 / 돈벌이 수단이였는데 / ... / 왜 맘이 이렇게 아프지?
function Page17Monologue3({ next }) {
  const [rev, setRev] = useState6(0);
  const lines = [
    "처음에는",
    "돈벌이 수단이였는데",
    "…",
    "왜 이렇게 맘이 아프지?"
  ];
  useEffect6(() => {
    const t = lines.map((_, i) => setTimeout(() => setRev(i + 1), 900 + i * 1300));
    return () => t.forEach(clearTimeout);
  }, []);
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#000', overflow: 'hidden' }}>
      <img src="assets/page17.jpg" alt=""
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%',
                 objectFit: 'cover', objectPosition: 'center',
                 pointerEvents: 'none', userSelect: 'none' }}
        draggable="false" />
      <div style={{ position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.75) 100%)',
        pointerEvents: 'none' }} />
      <div style={{
        position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)',
        textAlign: 'center', width: 'min(880px, 90vw)', zIndex: 2,
      }}>
        {lines.map((l, i) => {
          const parts = l.split('아프지');
          return (
            <div key={i} style={{
              opacity: i < rev ? 1 : 0,
              transform: i < rev ? 'translateY(0)' : 'translateY(14px)',
              transition: 'opacity 1.6s ease, transform 1.6s ease',
              fontFamily: 'var(--serif)', fontSize: 38, color: '#f5ead0',
              lineHeight: 1.9, minHeight: '1.6em',
              textShadow: '0 3px 24px rgba(0,0,0,0.9)',
              letterSpacing: '0.02em',
            }}>
              {parts.length > 1 ? (
                <>{parts[0]}<span style={{ color: '#e8b85c' }}>아프지</span>{parts[1]}</>
              ) : (l || ' ')}
            </div>
          );
        })}
      </div>
      {rev >= lines.length && (
        <button className="next-btn" style={{ color: '#f5ead0', borderColor: '#f5ead0', zIndex: 10 }}
                onClick={next}>계속 →</button>
      )}
    </div>
  );
}

// ---------- Page 18 — 3D Memory Corridor (IX5) ----------
// 사진 액자 한 장 — 이미지 슬롯 + placeholder 폴백
function Page18MemoryFrame({ p, op }) {
  const [hasImg, setHasImg] = useState6(false);
  const num = String(p.i + 1).padStart(2, '0');
  return (
    <div style={{
      position: 'absolute',
      left: '50%', top: '50%',
      width: 420, height: 540,
      transform: `
        translate(-50%, -50%)
        translateX(${p.side === 'L' ? -720 : 720}px)
        translateY(${-20 + p.lift - 30}px)
        translateZ(${-p.depth}px)
        rotateY(${p.side === 'L' ? 35 : -35}deg)
      `,
      background: '#fbf7ea',
      padding: 14,
      boxShadow: '0 28px 70px rgba(0,0,0,0.65), 0 0 60px rgba(232,184,92,0.1)',
      opacity: op,
      transition: 'opacity 0.3s ease'
    }}>
      <div style={{
        position: 'relative',
        width: '100%', height: '82%',
        background: 'linear-gradient(135deg, #2a2520 0%, #1a1512 100%)',
        overflow: 'hidden'
      }}>
        {/* 실 이미지 슬롯 — assets/slides/page18/01.png ~ 10.png */}
        <img
          src={`assets/slides/page18/${num}.png`}
          alt=""
          onLoad={() => setHasImg(true)}
          onError={(e) => { e.currentTarget.style.display = 'none'; setHasImg(false); }}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%', objectFit: 'cover'
          }}
        />
        {/* MEMORY 텍스트 — 이미지 없을 때만 */}
        {!hasImg && <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'rgba(232,184,92,0.35)',
          fontSize: 16, letterSpacing: '0.2em',
          fontFamily: 'var(--serif)'
        }}>
          MEMORY {num}
        </div>}
      </div>
      <div style={{ textAlign: 'center', marginTop: 10,
                    fontFamily: 'var(--yet)', fontSize: 16, color: '#5a4520' }}>
        · {p.i + 1} ·
      </div>
    </div>
  );
}

function Page18Memory3D({ next }) {
  const [z, setZ] = useState6(0);
  const maxZ = 2400;

  useEffect6(() => {
    const onWheel = (e) => {
      e.preventDefault();
      setZ(prev => Math.max(0, Math.min(maxZ, prev + e.deltaY * 0.9)));
    };
    window.addEventListener('wheel', onWheel, { passive: false });
    return () => window.removeEventListener('wheel', onWheel);
  }, []);

  // 먼 깊이의 사진이 원근 소실점에 모여 "중앙 박스"처럼 보이는 문제 해결
  // — 10개로 축소하고 최대 depth 도 단축
  const photos = Array.from({ length: 10 }, (_, i) => ({
    i,
    side: i % 2 === 0 ? 'L' : 'R',
    depth: (Math.floor(i / 2) + 1) * 380,
    lift: (i % 4) * 50,
  }));

  return (
    <div style={{ position: 'absolute', inset: 0, background: '#030303', overflow: 'hidden',
                  perspective: 1000, perspectiveOrigin: '50% 50%' }}>
      {/* Floor + ceiling light streak */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 50% 50%, rgba(232,184,92,0.08) 0%, transparent 50%)',
      }}/>

      {/* Scene */}
      <div style={{
        position: 'absolute', inset: 0,
        transformStyle: 'preserve-3d',
        transform: `translateZ(${z}px)`,
        transition: 'transform 0.5s cubic-bezier(.2,.9,.3,1)',
      }}>
        {photos.map((p) => {
          // 현재 카메라 z 기준 거리에 따른 opacity — 너무 멀거나 지나간 사진은 숨김
          const dist = p.depth - z;
          let op;
          if (dist < -120) op = 0;
          else if (dist > 700) op = 0;
          else if (dist > 500) op = (700 - dist) / 200;
          else if (dist < 40) op = Math.max(0, (dist + 120) / 160);
          else op = 1;
          return <Page18MemoryFrame key={p.i} p={p} op={op} />;
        })}
      </div>

      {/* 중앙 소실점 fog — 원근 깊은 요소 자연스럽게 어둠에 잠기게 */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 50% 50%, rgba(3,3,3,0.92) 0%, rgba(3,3,3,0.6) 20%, transparent 45%)',
        zIndex: 1
      }} />

      {/* UI */}
      <div style={{
        position: 'absolute', top: 72, left: 0, right: 0, textAlign: 'center',
        fontFamily: 'var(--serif)', fontSize: 22, color: '#f5ead0', opacity: 0.9,
        letterSpacing: '0.08em',
        textShadow: '0 2px 18px rgba(0,0,0,0.8)',
        transition: 'opacity 0.6s',
        zIndex: 3
      }}>
        {z < maxZ * 0.4 && '— 스크롤하여 걸어 들어가세요 —'}
        {z >= maxZ * 0.4 && z < maxZ * 0.85 && '함께한 날들이 지나간다.'}
        {z >= maxZ * 0.85 && '잘 가…'}
      </div>
      <div style={{
        position: 'absolute', bottom: 54, left: 80, right: 80, height: 1,
        background: 'rgba(232,184,92,0.15)',
      }}>
        <div style={{ width: `${(z / maxZ) * 100}%`, height: '100%', background: '#e8b85c',
                      transition: 'width 0.3s' }}/>
      </div>
      {z >= maxZ * 0.95 && (
        <button className="next-btn" style={{ color: '#f5ead0', borderColor: '#f5ead0',
                  bottom: 90, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }}
                onClick={next}>계속 →</button>
      )}
    </div>
  );
}

// ---------- Page 19 — Video 3 (text preroll → fullscreen video) ----------
function Page19Video3({ next }) {
  const [phase, setPhase] = useState6(0); // 0: text, 1: video, 2: done
  const videoRef = useRef6(null);
  useEffect6(() => {
    const t1 = setTimeout(() => setPhase(1), 3000);
    return () => clearTimeout(t1);
  }, []);
  useEffect6(() => {
    if (phase === 1 && videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
    }
  }, [phase]);
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#000',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      {phase === 0 && (
        <div style={{ textAlign: 'center', animation: 'fadeIn 1.8s ease forwards' }}>
          <div style={{ fontFamily: 'var(--serif)', fontSize: 36, color: '#f5ead0',
            lineHeight: 1.6, letterSpacing: '0.02em' }}>
            그곳에서 편안하길 바랄게.
          </div>
        </div>
      )}
      {phase >= 1 && (
        <video ref={videoRef} src="assets/video3.mp4"
          autoPlay muted playsInline controls
          onEnded={() => setPhase(2)}
          style={{ position: 'absolute', inset: 0,
                   width: '100%', height: '100%', objectFit: 'cover',
                   background: '#000', animation: 'fadeIn 1.4s ease forwards' }} />
      )}
      {phase >= 2 && (
        <button className="next-btn" style={{ color: '#f5ead0', borderColor: '#f5ead0',
                 background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)', zIndex: 10 }}
                onClick={next}>계속 →</button>
      )}
    </div>
  );
}

Object.assign(window, { Page17Monologue3, Page18Memory3D, Page19Video3 });
