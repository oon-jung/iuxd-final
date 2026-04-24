// ===== Part 1: Pages 1-6 (도입 · 논리 구축) =====
const { useState: useState1, useEffect: useEffect1, useRef: useRef1 } = React;

// ---------- Page 1 — Intro ----------
function Page1Intro({ next }) {
  const [phase, setPhase] = useState1(0); // 0: posterA, 1: secondary
  useEffect1(() => {
    const t1 = setTimeout(() => setPhase(1), 2000);
    return () => clearTimeout(t1);
  }, []);
  return (
    <div className="center-col" style={{ background: '#0a0a0c', cursor: 'pointer' }}
    onClick={next}>
      <div style={{ position: 'absolute', inset: 0 }}>
        <img src="assets/posterA.png" alt=""
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
          opacity: phase === 0 ? 1 : 0, transition: 'opacity 2.2s ease' }} />
        <img src="assets/page1.png" alt=""
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
          opacity: phase === 1 ? 1 : 0, transition: 'opacity 2.2s ease' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)' }} />
      </div>
      <div style={{ position: 'relative', textAlign: 'center', color: '#f5ead0' }}>
        <div style={{
          fontFamily: 'var(--display)', fontSize: 18, letterSpacing: '0.28em',
          opacity: 0.78, marginBottom: 56, animation: 'fadeIn 1.8s ease forwards'
        }}>냥과 사는 남자 · THE CAT'S WARDEN</div>
        <img src="assets/intro_title.png" alt="당신의 단종은 누구인가요?"
        style={{
          display: 'block', margin: '0 auto',
          maxWidth: '78vw', width: 'min(1040px, 78vw)',
          height: 'auto',
          filter: 'drop-shadow(0 6px 28px rgba(0,0,0,0.55))',
          animation: 'fadeUp 2s ease 0.4s forwards', opacity: 0,
          transform: 'translateY(20px)'
        }} />
        <div style={{
          marginTop: 56, fontFamily: 'var(--display)', fontSize: 16, letterSpacing: '0.3em',
          opacity: 0, animation: 'fadeIn 1.2s ease 2.6s forwards'
        }}>— 제 9조 · 2026 —</div>
      </div>
    </div>);

}

// ---------- Page 2 — Historical record ----------
function Page2Historical({ next }) {
  const lines = [
  "단종은 열일곱의 나이에",
  "홀로 영월에 유배되었다.",
  "조정은 그의 시신조차 거두지 말라 명했다.",
  "그러나 한 이름 없는 사내가",
  "죽음을 무릅쓰고 그를 거두었다 — 엄흥도(嚴興道).",
  "",
  "그가 왕을 향한 마음은 충성이었으나,",
  "어린 단종을 바라본 시선은 부모의 것이었다."];

  const [revealed, setRevealed] = useState1(0);
  const [seal, setSeal] = useState1(false);
  useEffect1(() => {
    const timers = lines.map((_, i) => setTimeout(() => setRevealed(i + 1), 900 + i * 1100));
    const st = setTimeout(() => setSeal(true), 900 + lines.length * 1100 + 400);
    return () => {timers.forEach(clearTimeout);clearTimeout(st);};
  }, []);
  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: '#1a1208',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden'
    }}
    onClick={revealed >= lines.length ? next : undefined}>
      
      {/* Hanji background */}
      <img src="assets/page2.png" alt=""
      style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%', objectFit: 'cover',
        filter: 'brightness(1.02) contrast(1.05)'
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at center, rgba(0,0,0,0) 40%, rgba(60,40,20,0.25) 100%)',
        pointerEvents: 'none'
      }} />

      <div style={{
        position: 'relative', width: 820, padding: '70px 90px',
        zIndex: 2
      }}>
        <div style={{
          fontFamily: 'var(--wolin)', fontSize: 18, letterSpacing: '0.4em',
          color: 'rgba(60,40,20,0.55)', marginBottom: 48, textAlign: 'center'
        }}>— 史 · 魯 山 君 —</div>
        <div style={{ fontFamily: 'var(--wolin)', fontSize: 26, lineHeight: 2.2, color: '#2a1d10', textAlign: 'center', letterSpacing: '0.02em' }}>
          {lines.map((line, i) =>
          <div key={i} style={{
            opacity: i < revealed ? 1 : 0,
            transform: i < revealed ? 'translateY(0)' : 'translateY(8px)',
            transition: 'opacity 1.1s ease, transform 1.1s ease',
            fontWeight: i === lines.length - 1 || i === lines.length - 2 ? 500 : 400,
            color: i === lines.length - 1 ? '#5a1810' : '#2a1d10',
            letterSpacing: '0.04em',
            minHeight: '1.6em'
          }}>{line || '\u00A0'}</div>
          )}
        </div>
        <div style={{
          position: 'absolute', bottom: 40, right: 80,

          display: 'flex',
          background: seal ? '#8a2419' : 'transparent',
          color: '#efe6d1',
          fontFamily: 'var(--yet)', fontSize: 38, fontWeight: 600,

          transform: seal ? 'rotate(-6deg) scale(1)' : 'rotate(-6deg) scale(0.5)',
          opacity: seal ? 1 : 0,
          transition: 'all 0.9s cubic-bezier(.2,.9,.3,1.3)',
          boxShadow: seal ? '0 2px 0 rgba(0,0,0,0.1)' : 'none', borderStyle: "solid", borderColor: "rgb(138, 36, 25)", borderImage: "initial", borderWidth: "3px 2px 2px", width: "50px", height: "50px", alignItems: "center", justifyContent: "center", border: "25.1172px solid rgb(138, 36, 25)"
        }}>嚴</div>
      </div>
      {revealed >= lines.length &&
      <div style={{
        position: 'absolute', bottom: 42, left: 0, right: 0, textAlign: 'center',
        fontFamily: 'var(--wolin)', fontSize: 20, letterSpacing: '0.35em',
        color: 'rgba(60,40,20,0.55)', zIndex: 2,
        animation: 'hintPulse 2.4s ease-in-out infinite'
      }}>
          — 클릭하여 계속 —
        </div>
      }
    </div>);

}

// ---------- Page 3 — "우리 주변에도 있다" (먹빛 글자 번짐 · 한지 페이드) ----------
function Page3AroundUs({ next }) {
  const [progress, setProgress] = useState1(0); // chars revealed
  const lines = [
  "단종과 엄흥도의",
  "애틋한 관계,",
  "",
  "우리 주변에도 있다는",
  "사실을 아시나요?"];

  const totalChars = lines.reduce((s, l) => s + l.length, 0);

  useEffect1(() => {
    let acc = 0;
    let advanced = false;
    const overScrollLimit = 500; // after all chars revealed, scroll this much more to advance
    const onWheel = (e) => {
      e.preventDefault();
      acc += e.deltaY;
      const step = Math.max(0, Math.min(totalChars, Math.floor(acc / 28)));
      setProgress(step);
      // Once all text is revealed, additional scroll naturally moves to next page
      if (!advanced && step >= totalChars && acc > totalChars * 28 + overScrollLimit) {
        advanced = true;
        next();
      }
    };
    window.addEventListener('wheel', onWheel, { passive: false });
    return () => window.removeEventListener('wheel', onWheel);
  }, [totalChars, next]);

  // Global index per character
  let charIdx = 0;

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <img src="assets/page3.png" alt=""
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
        filter: 'saturate(0.8) contrast(1.02)' }} />

      {/* Hanji fade overlay on right */}
      <div style={{
        position: 'absolute', right: 0, top: 0, bottom: 0, width: '50%',
        background: 'linear-gradient(270deg, rgba(240,228,200,0.96) 0%, rgba(236,222,190,0.88) 40%, rgba(232,218,180,0.55) 70%, rgba(232,218,180,0) 100%)'
      }} />
      {/* Hanji paper texture */}
      <div style={{
        position: 'absolute', right: 0, top: 0, bottom: 0, width: '48%',
        backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.35 0 0 0 0 0.28 0 0 0 0 0.18 0 0 0 0.3 0'/></filter><rect width='300' height='300' filter='url(%23n)'/></svg>")`,
        mixBlendMode: 'multiply',
        opacity: 0.45,
        pointerEvents: 'none'
      }} />
      {/* Faint vertical hanji lines */}
      <div style={{
        position: 'absolute', right: 0, top: 0, bottom: 0, width: '48%',
        background: 'repeating-linear-gradient(90deg, transparent 0, transparent 28px, rgba(90,60,30,0.04) 28px, rgba(90,60,30,0.04) 29px)',
        pointerEvents: 'none'
      }} />

      {/* Typography panel — 오른쪽으로 조금 이동 (left padding 확대) */}
      <div style={{
        position: 'absolute', right: 0, top: 0, bottom: 0,
        padding: '0 60px 0 110px',
        display: 'flex', flexDirection: 'column', justifyContent: 'center', width: "44%"
      }}>
        <div style={{ fontFamily: 'var(--wolin)', fontSize: 16, letterSpacing: '0.3em',
          color: 'rgba(90,36,25,0.55)', marginBottom: 44 }}>
          — 世 · 間 · 之 · 情 —
        </div>
        <div style={{
          fontFamily: 'var(--wolin)',
          fontSize: 38,
          lineHeight: 2.2,
          letterSpacing: '0.06em',
          color: '#1a0e06',
          whiteSpace: 'nowrap'
        }}>
          {lines.map((l, i) =>
          <div key={i} style={{ minHeight: '2em', fontWeight: "400" }}>
              {l.length === 0 ? '\u00A0' : l.split('').map((ch, j) => {
              const myIdx = charIdx++;
              const isVisible = myIdx < progress;
              const isNewest = myIdx === progress - 1;
              return (
                <span key={j} style={{
                  display: 'inline-block',
                  opacity: isVisible ? 1 : 0,
                  filter: isVisible ?
                  isNewest ? 'blur(2.5px)' : 'blur(0.4px)' :
                  'blur(10px)',
                  transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(6px) scale(0.92)',
                  color: '#1a0e06',
                  textShadow: isVisible ?
                  '0 0 1px rgba(26,14,6,0.6), 0 0 2px rgba(26,14,6,0.25)' :
                  'none',
                  transition: 'opacity 1.1s ease, filter 1.4s ease, transform 0.9s ease',
                  transitionDelay: isNewest ? '0s' : '0.2s'
                }}>{ch}</span>);

            })}
            </div>
          )}
        </div>
      </div>

      {/* Scroll hint */}
      <div style={{
        position: 'absolute', bottom: 32, left: 60,
        fontSize: 16,
        letterSpacing: '0.1em', color: 'rgba(245,234,208,0.85)',
        opacity: progress < totalChars ? 1 : 0,
        transition: 'opacity 0.8s',
        textShadow: '0 2px 12px rgba(0,0,0,0.7)', fontFamily: "Wolin"
      }}>
        ↓ 휠을 굴려 먹을 풀어보세요
      </div>

      {/* After fully revealed — subtle "scroll for next" hint */}
      {progress >= totalChars &&
      <div style={{
        position: 'absolute', bottom: 32, right: 60,
        fontFamily: 'var(--sans)', fontSize: 12, letterSpacing: '0.3em',
        color: 'rgba(60,40,20,0.55)',
        animation: 'hintPulse 2.4s ease-in-out infinite'
      }}>
        계속 스크롤 ↓
      </div>
      }
    </div>);

}

// ---------- Page 4 — 3D Relationship Gallery Cinematic ----------
// RAF 기반 부드러운 스크롤 이징 + 카드별 blur/opacity/scale DoF + cinematic 엔딩
function Page4Gallery({ next }) {
  const [mouse, setMouse] = useState1({ x: 0, y: 0 });
  const [currentDepth, setCurrentDepth] = useState1(0);
  const [focused, setFocused] = useState1(false);
  const [zoomIn, setZoomIn] = useState1(false);

  const depthRef = useRef1(0);
  const targetRef = useRef1(0);

  // 9장 — 공간감 있는 깊이 배치, pet 카드가 가장 안쪽 몰입 목적지
  const cards = React.useMemo(() => ([
    { id: 'grand',  x: 18, y: 30, z:  180, w: 230, h: 280, rx: -4, ry:  8 },
    { id: 'couple', x: 82, y: 40, z:   80, w: 210, h: 260, rx:  4, ry: -8 },
    { id: 'army',   x: 22, y: 78, z: -180, w: 190, h: 230, rx: -5, ry:  5 },
    { id: 'parent', x: 35, y: 18, z: -420, w: 185, h: 225, rx:  3, ry: -4 },
    { id: 'friend', x: 70, y: 22, z: -520, w: 175, h: 210, rx: -4, ry:  5 },
    { id: 'team',   x: 88, y: 62, z: -700, w: 170, h: 200, rx:  5, ry: -4 },
    { id: 'mentor', x: 14, y: 52, z: -950, w: 150, h: 180, rx:  3, ry:  8 },
    { id: 'class',  x: 66, y: 78, z:-1120, w: 150, h: 180, rx:  5, ry:  4 },
    { id: 'pet',    x: 50, y: 50, z:-1550, w: 340, h: 430, rx:  0, ry:  0, main: true }
  ]), []);

  // 이벤트 리스너 — focused/zoomIn ref 로 읽어 리스너 재바인딩 최소화
  const focusedRef = useRef1(focused);
  const zoomInRef  = useRef1(zoomIn);
  focusedRef.current = focused;
  zoomInRef.current  = zoomIn;

  useEffect1(() => {
    const onMouseMove = (e) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      setMouse({ x: nx, y: ny });
    };
    const onWheel = (e) => {
      if (focusedRef.current) return;
      e.preventDefault();
      targetRef.current = Math.max(-100, Math.min(1450, targetRef.current + e.deltaY * 1.15));
      if (targetRef.current >= 1380 && !zoomInRef.current) {
        setZoomIn(true);
        setTimeout(() => setFocused(true), 950);
      }
    };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('wheel', onWheel);
    };
  }, []);

  // RAF 이징 — 델타가 0.15 이하일 땐 setState 스킵해서 idle 시 재렌더 방지
  useEffect1(() => {
    let frame;
    const animate = () => {
      const diff = targetRef.current - depthRef.current;
      depthRef.current += diff * 0.075;
      if (Math.abs(diff) > 0.15) {
        setCurrentDepth(depthRef.current);
      }
      frame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frame);
  }, []);

  const parX = mouse.x * 32;
  const parY = mouse.y * 24;

  return (
    <div style={{
      position: 'absolute', inset: 0, overflow: 'hidden',
      background: 'radial-gradient(circle at center, #f7ecd0 0%, #dfcf9d 58%, #b99f67 100%)',
      perspective: 1500, perspectiveOrigin: '50% 50%',
      cursor: focused ? 'default' : 'grab'
    }}>
      {/* paper texture */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='320' height='320'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.35 0 0 0 0 0.28 0 0 0 0 0.18 0 0 0 0.28 0'/></filter><rect width='320' height='320' filter='url(%23n)'/></svg>")`,
        mixBlendMode: 'multiply', opacity: 0.38, pointerEvents: 'none'
      }} />

      {/* vignette */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(circle at center, rgba(0,0,0,0) 48%, rgba(65,42,20,0.34) 100%)',
        zIndex: 3
      }} />

      {/* center question */}
      <div style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: `translate(-50%, -50%) scale(${1 - Math.min(currentDepth / 1800, 0.18)})`,
        textAlign: 'center', zIndex: 8,
        opacity: focused ? 0 : Math.max(0, 1 - currentDepth / 620),
        transition: 'opacity 0.3s ease',
        pointerEvents: 'none'
      }}>
        <div style={{
          fontFamily: 'var(--wolin)', fontSize: 36, color: '#2a1d10',
          letterSpacing: '0.04em', lineHeight: 1.65,
          textShadow: '0 1px 0 rgba(245,234,208,0.55)'
        }}>
          당신에게<br/>끝까지 지키고 싶은 관계는<br/>무엇인가요?
        </div>
      </div>

      {/* 3D camera */}
      <div style={{
        position: 'absolute', inset: 0,
        transformStyle: 'preserve-3d',
        transform: `
          translateZ(${currentDepth}px)
          rotateY(${-parX * 0.12}deg)
          rotateX(${parY * 0.09}deg)
          translate(${-parX * 0.6}px, ${-parY * 0.6}px)
          scale(${zoomIn ? 1.18 : 1})
        `,
        transition: zoomIn
          ? 'transform 1.1s cubic-bezier(.16,.84,.24,1)'
          : 'transform 0.16s ease-out'
      }}>
        {cards.map((c) => {
          const sceneZ = c.z + currentDepth;
          const distance = Math.abs(sceneZ);
          const isMain = c.main;

          // DoF — 거리에 따른 blur
          const blur = isMain
            ? Math.max(0, Math.min(5, distance * 0.002))
            : Math.max(0.2, Math.min(7, distance * 0.0035));

          // pet 카드는 depth 550~ 에서 서서히 등장, 일반 카드는 깊이 들어갈수록 감쇠
          const opacity = isMain
            ? Math.max(0, Math.min(1, (currentDepth - 550) / 520))
            : Math.max(0.2, 1 - currentDepth / 1600);

          // pet 카드 근접시 확대, 일반 카드는 sceneZ에 비례 미세 확대
          const scale = isMain
            ? 1 + Math.max(0, currentDepth - 900) * 0.00035
            : 1 + sceneZ * 0.00018;

          const shadowPower = isMain ? 0.38 : 0.2;
          const shadowY = isMain ? 36 : 22;

          // 세피아 톤 변주 (image asset 없이 자연스러운 사진 톤)
          const sepiaHue = 24 + (c.x * 0.7 + c.y * 0.3) % 18;
          const sepiaTop = `hsl(${sepiaHue}, 34%, 74%)`;
          const sepiaBot = `hsl(${sepiaHue - 4}, 30%, 54%)`;

          return (
            <div key={c.id}
              onClick={() => {
                if (isMain && !zoomIn) {
                  setZoomIn(true);
                  setTimeout(() => setFocused(true), 850);
                }
              }}
              style={{
                position: 'absolute',
                left: `${c.x}%`, top: `${c.y}%`,
                width: c.w, height: c.h,
                transform: `
                  translate(-50%, -50%)
                  translateZ(${c.z}px)
                  rotateY(${c.ry || 0}deg)
                  rotateX(${c.rx || 0}deg)
                  scale(${scale})
                `,
                transformStyle: 'preserve-3d',
                opacity,
                filter: `blur(${blur}px)`,
                zIndex: isMain ? 20 : 'auto',
                cursor: isMain ? 'pointer' : 'default',
                transition: 'opacity 0.45s ease, filter 0.45s ease',
                willChange: 'transform, opacity, filter'
              }}>
              <div style={{
                width: '100%', height: '100%',
                background: isMain
                  ? 'linear-gradient(135deg, #5a1810 0%, #8a2419 60%, #3a1008 100%)'
                  : `linear-gradient(135deg, ${sepiaTop} 0%, ${sepiaBot} 100%)`,
                borderRadius: isMain ? 18 : 10,
                overflow: 'hidden',
                boxShadow: `
                  0 ${shadowY}px ${shadowY * 2}px rgba(40,25,10,${shadowPower}),
                  0 4px 10px rgba(40,25,10,0.18)
                `,
                outline: isMain
                  ? '1px solid rgba(245,234,208,0.45)'
                  : '1px solid rgba(255,255,255,0.18)',
                position: 'relative'
              }}>
                {/* 톤 오버레이 */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: isMain
                    ? 'radial-gradient(circle at center, rgba(255,255,255,0.05) 0%, rgba(80,20,10,0.28) 100%)'
                    : 'radial-gradient(circle at center, rgba(255,255,255,0.08) 0%, rgba(80,50,20,0.24) 100%)',
                  pointerEvents: 'none'
                }} />
                {/* 내부 비네트 (non-main) */}
                {!isMain && <div style={{
                  position: 'absolute', inset: 0, pointerEvents: 'none',
                  background: 'radial-gradient(ellipse at center, transparent 55%, rgba(80,50,20,0.25) 100%)'
                }} />}
              </div>
            </div>
          );
        })}
      </div>

      {/* cinematic focus reveal */}
      {focused && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 100,
          background: 'radial-gradient(circle at center, rgba(246,236,208,0.72) 0%, rgba(50,24,12,0.78) 100%)',
          backdropFilter: 'blur(14px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexDirection: 'column',
          animation: 'cinemaFade 1.2s ease forwards'
        }}>
          <div style={{
            fontFamily: 'var(--wolin)', fontSize: 48, lineHeight: 1.65,
            color: '#f5ead0', textAlign: 'center', letterSpacing: '0.03em',
            textShadow: '0 4px 24px rgba(0,0,0,0.55)',
            animation: 'cinemaTextUp 1.4s cubic-bezier(.16,.84,.24,1) forwards',
            padding: '0 60px'
          }}>
            엄흥도와 단종의 관계는,<br/>
            시대를 넘어 <span style={{ color: '#e8b85c' }}>여전히 반복</span>되고 있습니다.
          </div>
          <button onClick={next} style={{
            marginTop: 56, padding: '13px 34px',
            border: '1px solid rgba(245,234,208,0.75)',
            background: 'rgba(245,234,208,0.08)',
            color: '#f5ead0', fontFamily: 'var(--sans)', fontSize: 12,
            letterSpacing: '0.28em', cursor: 'pointer',
            backdropFilter: 'blur(8px)',
            animation: 'fadeIn 1s ease 0.9s forwards', opacity: 0
          }}>계속 →</button>
        </div>
      )}

      {!focused && (
        <div style={{
          position: 'absolute', bottom: 32, left: 0, right: 0, textAlign: 'center',
          fontSize: 10, letterSpacing: '0.3em',
          color: 'rgba(60,40,20,0.55)', zIndex: 20, fontFamily: 'NanumMyeongjo'
        }}>
          MOVE MOUSE · SCROLL TO FLY FORWARD · 안쪽으로 진입하세요
        </div>
      )}

      <style>{`
        @keyframes cinemaFade {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes cinemaTextUp {
          from { opacity: 0; transform: translateY(26px) scale(0.96); filter: blur(6px); }
          to   { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
        }
      `}</style>
    </div>
  );
}

// ---------- Page 5 — Around Text (center card deck, wheel-driven) ----------
function Page5AroundText({ next }) {
  // 상단 인트로 — 두 줄로 나누고 두 번째 줄 들여쓰기
  const headlineLine1 = "우연한 만남이 애정으로, 그 애정이 곁에 머무는 순간들 —";
  const headlineLine2 = "화면 너머 우리 일상에도 있습니다.";

  // Each card = relationship snapshot. img 경로에 실제 이미지 넣으면 전체를 덮음.
  // (page5_01.png ~ page5_06.png 기대. 없으면 bg 색 placeholder 로 대체)
  const cards = [
  { label: '골목길의 첫 눈 맞춤', num: '001', bg: '#c9b89a', fg: '#3a2a14', img: 'assets/slides/page5/01.png' },
  { label: '처음 건넨 사료 한 줌', num: '002', bg: '#8aa6b8', fg: '#0e1e2a', img: 'assets/slides/page5/02.png' },
  { label: '창가에서 보낸 오후', num: '003', bg: '#a8b89a', fg: '#1a2a12', img: 'assets/slides/page5/03.png' },
  { label: '함께한 조용한 밤',   num: '004', bg: '#3a3a4a', fg: '#e8e8f0', img: 'assets/slides/page5/04.png' },
  { label: '병원 가는 긴 길',     num: '005', bg: '#c9a0a0', fg: '#3a1414', img: 'assets/slides/page5/05.png' },
  { label: '오늘의 당신',         num: '006', bg: '#d9b35a', fg: '#2a1a06', hi: true, img: 'assets/slides/page5/06.png' }];

  const total = cards.length;
  // progress: float 0 .. total.  i < progress → card i has passed; int part = currently-centered card
  const [progress, setProgress] = useState1(0);
  const accRef = useRef1(0);

  useEffect1(() => {
    const onWheel = (e) => {
      e.preventDefault();
      accRef.current += e.deltaY;
      // slow reveal — 240px per card
      const p = Math.max(0, Math.min(total, accRef.current / 240));
      setProgress(p);
    };
    window.addEventListener('wheel', onWheel, { passive: false });
    return () => window.removeEventListener('wheel', onWheel);
  }, [total]);

  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: '#f4efe6',
      overflow: 'hidden',
      fontFamily: 'var(--serif)'
    }}>
      {/* Paper grain */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.2 0 0 0 0 0.15 0 0 0 0 0.08 0 0 0 0.15 0'/></filter><rect width='240' height='240' filter='url(%23n)'/></svg>")`,
        mixBlendMode: 'multiply', opacity: 0.4
      }} />

      {/* Top headline — "AROUND US · 05" 라벨 제거, 두 줄 + 두 번째 줄 들여쓰기 */}
      <div style={{
        position: 'absolute', top: 72, left: 0, right: 0, textAlign: 'center',
        padding: '0 80px'
      }}>
        <div style={{
          fontFamily: 'var(--serif)', fontSize: 26, lineHeight: 1.7,
          color: '#2a1d10', letterSpacing: '0.01em',
          fontWeight: 400,
          maxWidth: 960, margin: '0 auto',
          textAlign: 'left', display: 'inline-block'
        }}>
          <div>{headlineLine1}</div>
          {/* 두 번째 줄 — "순간들 —" 뒤로 들여쓰기 */}
          <div style={{ paddingLeft: '7em' }}>{headlineLine2}</div>
        </div>
      </div>

      {/* Center card deck — 3D 공간감 강화 (perspective ↑ + rotateX 기울기 + Z 축 분산) */}
      <div style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)',
        width: 360, height: 480,
        perspective: 1100,
        perspectiveOrigin: '50% 40%',
        transformStyle: 'preserve-3d'
      }}>
        {cards.map((c, i) => {
          // d=0 현재 중심, d<0 지나간 카드, d>0 뒤에서 기다리는 카드
          const d = i - progress;

          // Y 이동: 아래에서 위로 흐름
          const y = d * 200;

          // Z 축: 중앙 카드가 앞, 양쪽 멀수록 뒤로 (3D 깊이감)
          const zDepth = -Math.abs(d) * 180;

          // X 축: 카드가 흐를수록 살짝 좌우 흩어짐 (holo card 느낌)
          const xOffset = d * 20;

          // 크기: 중앙에서 멀수록 작게
          const scale = Math.max(0.68, 1 - Math.abs(d) * 0.1);

          // 회전: Y축 (좌우 기울기) + X축 (앞뒤 기울기)
          const rotY = d * -8;     // 지나간 카드는 왼쪽으로, 앞 카드는 오른쪽으로
          const rotX = d * 6;      // 위쪽으로 갈수록 뒤로 기울임

          // opacity: 양끝에서 서서히 사라짐
          const opacity = Math.max(0, 1 - Math.abs(d) * 0.3);

          const isFocus = Math.abs(d) < 0.5;
          const zIndex = Math.round(100 - Math.abs(d) * 10);

          return (
            <div key={i} style={{
              position: 'absolute',
              left: '50%', top: '50%',
              width: 300, height: 400,
              borderRadius: 22,
              transform: `
                translate(-50%, calc(-50% + ${y}px))
                translate3d(${xOffset}px, 0, ${zDepth}px)
                rotateY(${rotY}deg)
                rotateX(${rotX}deg)
                scale(${scale})
              `,
              transformStyle: 'preserve-3d',
              opacity,
              background: c.bg,
              /* 글래스 두께감 — 외부 드롭섀도우(깊이) + 내부 섀도우(굴절 테두리) 스택 */
              boxShadow: isFocus
                ? `
                  0 44px 84px rgba(20,25,40,0.42),
                  0 20px 38px rgba(20,25,40,0.28),
                  0 8px 18px rgba(20,25,40,0.18),
                  0 0 0 1px rgba(255,255,255,0.08)
                `
                : `
                  0 24px 48px rgba(20,25,40,0.32),
                  0 10px 20px rgba(20,25,40,0.18),
                  0 0 0 1px rgba(255,255,255,0.06)
                `,
              border: '1px solid rgba(255,255,255,0.14)',
              zIndex,
              transition: 'box-shadow 0.25s ease',
              overflow: 'hidden'
            }}>
              {/* 실제 이미지 — 카드 전체 커버. 로드 실패 시 bg 색 placeholder */}
              <img src={c.img} alt=""
                onError={(e) => { e.target.style.display = 'none'; }}
                style={{
                  position: 'absolute', inset: 0,
                  width: '100%', height: '100%',
                  objectFit: 'cover', objectPosition: 'center',
                  display: 'block'
                }} />

              {/* 글래스 상단 하이라이트 — 위에서 비친 듯한 반사광 */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '48%',
                background: 'linear-gradient(180deg, rgba(255,255,255,0.32) 0%, rgba(255,255,255,0.08) 40%, transparent 100%)',
                pointerEvents: 'none',
                borderRadius: '22px 22px 0 0'
              }} />

              {/* 하단 미묘한 그림자 — 두께의 하단면 느낌 */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, height: '30%',
                background: 'linear-gradient(0deg, rgba(0,0,0,0.22) 0%, transparent 100%)',
                pointerEvents: 'none'
              }} />

              {/* 내부 굴절 테두리 — 유리 가장자리의 빛 번짐 */}
              <div style={{
                position: 'absolute', inset: 0, borderRadius: 22, pointerEvents: 'none',
                boxShadow: `
                  inset 0 2px 0 rgba(255,255,255,0.55),
                  inset 0 -3px 10px rgba(0,0,0,0.22),
                  inset 2px 0 6px rgba(255,255,255,0.14),
                  inset -2px 0 6px rgba(0,0,0,0.12)
                `
              }} />

              {/* 대각선 미세 스펙큘러 — 유리의 반사 질감 */}
              <div style={{
                position: 'absolute', top: '-40%', left: '-10%',
                width: '60%', height: '180%',
                background: 'linear-gradient(115deg, transparent 45%, rgba(255,255,255,0.12) 50%, transparent 56%)',
                pointerEvents: 'none',
                transform: 'rotate(-8deg)'
              }} />
            </div>);

        })}
      </div>

      {/* Progress indicator (right side) */}
      <div style={{
        position: 'absolute', right: 48, top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex', flexDirection: 'column', gap: 10
      }}>
        {cards.map((_, i) => {
          const active = Math.abs(i - progress) < 0.5;
          const passed = i < progress;
          return (
            <div key={i} style={{
              width: active ? 8 : 4, height: active ? 8 : 4,
              borderRadius: '50%',
              background: passed || active ? '#8a6a2a' : 'rgba(60,40,20,0.25)',
              transition: 'all 0.3s ease'
            }} />);

        })}
      </div>

      {/* Scroll hint */}
      <div style={{
        position: 'absolute', bottom: 42, left: 0, right: 0, textAlign: 'center',
        fontFamily: 'var(--sans)', fontSize: 11, letterSpacing: '0.3em',
        color: 'rgba(60,40,20,0.55)',
        opacity: progress < total - 0.5 ? 1 : 0,
        transition: 'opacity 0.5s'
      }}>
        ↓ 휠을 천천히 굴려보세요
      </div>

      {progress >= total - 0.5 &&
      <button className="next-btn"
        style={{ color: '#2a1d10', borderColor: 'rgba(60,40,20,0.5)' }}
        onClick={next}>계속 →</button>
      }
    </div>);

}

// ---------- Page 6 — Discover (hanji paper, title.png reuse, friend DM popup) ----------
function Page6Discover({ next }) {
  const [phase, setPhase] = useState1(0); // 0: brand lockup, 1: title shown, 2: DM popup
  useEffect1(() => {
    const t1 = setTimeout(() => setPhase(1), 1400);
    const t2 = setTimeout(() => setPhase(2), 3200);
    return () => {clearTimeout(t1);clearTimeout(t2);};
  }, []);

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden',
      background: '#f2e7c8', cursor: phase >= 2 ? 'pointer' : 'default' }}
      onClick={phase >= 2 ? next : undefined}>

      {/* Hanji paper base */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 50% 50%, #f6ecd0 0%, #e9dcb6 70%, #d8c89a 100%)'
      }} />
      {/* Hanji grain */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='320' height='320'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.35 0 0 0 0 0.28 0 0 0 0 0.18 0 0 0 0.35 0'/></filter><rect width='320' height='320' filter='url(%23n)'/></svg>")`,
        mixBlendMode: 'multiply', opacity: 0.55, pointerEvents: 'none'
      }} />
      {/* Long fibers */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='600' height='600'><filter id='f'><feTurbulence type='fractalNoise' baseFrequency='0.015 0.3' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.3 0 0 0 0 0.22 0 0 0 0 0.12 0 0 0 0.25 0'/></filter><rect width='600' height='600' filter='url(%23f)'/></svg>")`,
        mixBlendMode: 'multiply', opacity: 0.4, pointerEvents: 'none'
      }} />
      {/* Soft vignette */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at center, rgba(0,0,0,0) 55%, rgba(90,60,30,0.22) 100%)',
        pointerEvents: 'none'
      }} />

      {/* Brand lockup — small, centered. Moves to top in phase 1 */}
      <div style={{
        position: 'absolute',
        left: '50%',
        top: phase === 0 ? '50%' : '40px',
        transform: phase === 0 ?
        'translate(-50%, -50%) scale(1)' :
        'translate(-50%, 0) scale(0.58)',
        transformOrigin: 'center top',
        transition: 'top 1.2s cubic-bezier(.7,0,.3,1), transform 1.2s cubic-bezier(.7,0,.3,1)',
        fontFamily: 'var(--display)',
        fontSize: 28,
        letterSpacing: '-0.01em',
        color: '#1a0e06',
        zIndex: phase === 0 ? 10 : 5,
        whiteSpace: 'nowrap'
      }}>
        {"Cat's Warden.".split('').map((ch, i) =>
        <span key={i} style={{
          display: 'inline-block',
          opacity: 1,
          animation: phase === 0 ? `brandIn 0.5s ease ${i * 0.06}s backwards` : 'none'
        }}>{ch === ' ' ? '\u00A0' : ch}</span>
        )}
      </div>

      {/* Reused title.png — centered */}
      <div style={{
        position: 'absolute',
        left: 0, right: 0,
        top: '50%',
        transform: 'translateY(-50%)',
        textAlign: 'center',
        pointerEvents: 'none',
        padding: '0 10vw'
      }}>
        <img src="assets/page6_title.png" alt="Page 6 Title"
          style={{
            display: 'block', margin: '0 auto',
            maxWidth: '74vw', width: 'min(980px, 74vw)',
            height: 'auto',
            opacity: phase >= 1 ? 1 : 0,
            transform: phase >= 1 ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.98)',
            filter: phase >= 1 ? 'blur(0)' : 'blur(6px)',
            transition: 'opacity 1.4s ease, transform 1.4s cubic-bezier(.2,.85,.25,1), filter 1.2s ease',
            mixBlendMode: 'multiply'
          }} />
      </div>

      {/* DM popup sliding from bottom */}
      <div style={{
        position: 'absolute', left: '50%', bottom: 80,
        transform: phase >= 2 ? 'translate(-50%, 0)' : 'translate(-50%, 180%)',
        opacity: phase >= 2 ? 1 : 0,
        transition: 'transform 1.1s cubic-bezier(.2,.85,.3,1), opacity 0.6s ease',
        width: 360,
        background: 'rgba(38,38,38,0.95)',
        backdropFilter: 'blur(10px)',
        borderRadius: 14,
        padding: '14px 16px',
        display: 'flex', alignItems: 'center', gap: 12,
        color: '#fff',
        fontFamily: 'var(--sans)',
        boxShadow: '0 16px 48px rgba(0,0,0,0.35)',
        border: '1px solid rgba(255,255,255,0.06)'
      }}>
        <div style={{ width: 42, height: 42, borderRadius: '50%',
          overflow: 'hidden', flexShrink: 0,
          background: '#e0d4c8',
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
          <img src="assets/friend_dm.png" alt="yaho_friend"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 600 }}>yaho_friend</div>
          <div style={{ fontSize: 12, opacity: 0.7, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            야, 나 얼마 전에 고양이 데려와서…
          </div>
        </div>
        <div style={{ fontSize: 11, opacity: 0.6 }}>now</div>
      </div>

      <style>{`
        @keyframes brandIn {
          from { opacity: 0; transform: translateY(8px); filter: blur(4px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
      `}</style>
    </div>);

}

Object.assign(window, {
  Page1Intro, Page2Historical, Page3AroundUs,
  Page4Gallery, Page5AroundText, Page6Discover
});