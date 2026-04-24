// ===== Part 5: Pages 14-16 (위기) =====
const { useState: useState5, useEffect: useEffect5, useRef: useRef5 } = React;

// ---------- Page 14 — Monologue 2 (낯선 골목) ----------
// 검은 화면 → 이미지 천천히 emergence → 긴 딜레이 후 문구 한 줄씩 fade-in (무게감/긴장감 연출)
function Page14Monologue2({ next }) {
  const [phase, setPhase] = useState5(0);
  // 0: pure black
  // 1: 이미지 fade-in 시작
  // 2: 이미지 완전 노출 (호흡 구간)
  // 3~5: 3줄 순차 등장
  // 6: 버튼

  const lines = [
    "여느 때와 같이 고양이를 보러 가는 길,",
    "늘 만나던 골목길이",
    "웬지 낯설게 느껴진다.",
  ];

  useEffect5(() => {
    const timers = [
      setTimeout(() => setPhase(1), 600),     // 검은 화면에서 0.6s 머무른 뒤 이미지 등장
      setTimeout(() => setPhase(2), 4400),    // 이미지 완전히 드러남 (등장 3.8s)
      setTimeout(() => setPhase(3), 6200),    // 문구 1
      setTimeout(() => setPhase(4), 9000),    // 문구 2
      setTimeout(() => setPhase(5), 12200),   // 문구 3
      setTimeout(() => setPhase(6), 15500),   // 버튼
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: '#000' }}>
      {/* 배경 이미지 — phase 1 부터 천천히 등장 */}
      <img src="assets/page14.png" alt=""
        style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
          opacity: phase >= 1 ? 1 : 0,
          transform: phase >= 1 ? 'scale(1.08)' : 'scale(1.02)',
          transition: 'opacity 3.8s cubic-bezier(.4,.0,.4,1), transform 14s ease-out',
          filter: 'saturate(0.55) brightness(0.7)',
          willChange: 'opacity, transform'
        }} />

      {/* 어두운 비네트 — 처음에는 거의 완전 검정, 이미지 드러나면서 완화 */}
      <div style={{
        position: 'absolute', inset: 0,
        background: phase >= 2
          ? 'radial-gradient(ellipse, rgba(0,0,0,0.30) 0%, rgba(0,0,0,0.88) 100%)'
          : 'radial-gradient(ellipse, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.95) 100%)',
        transition: 'background 3s ease',
        pointerEvents: 'none'
      }} />

      {/* 문구 영역 */}
      <div style={{
        position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)',
        textAlign: 'center', width: 900
      }}>
        {lines.map((l, i) => {
          const parts = l.split('낯설게');
          const shown = phase >= (3 + i);
          return (
            <div key={i} style={{
              opacity: shown ? 1 : 0,
              transform: shown ? 'translateY(0)' : 'translateY(18px)',
              filter: shown ? 'blur(0)' : 'blur(4px)',
              transition: 'opacity 2.4s cubic-bezier(.35,.1,.25,1), transform 2.4s cubic-bezier(.35,.1,.25,1), filter 2.4s ease',
              fontFamily: 'var(--serif)', fontSize: 32, color: '#f5ead0',
              lineHeight: 2.1,
              textShadow: '0 2px 22px rgba(0,0,0,0.95)',
              letterSpacing: '0.02em'
            }}>
              {parts.length > 1 ? (
                <>{parts[0]}<span style={{ paddingBottom: 2 }}>낯설게</span>{parts[1]}</>
              ) : l}
            </div>
          );
        })}
      </div>

      {phase >= 6 && (
        <button className="next-btn" style={{ color: '#f5ead0', borderColor: '#f5ead0' }}
          onClick={next}>계속 →</button>
      )}
    </div>
  );
}

// ---------- Page 15 — Drag to Unblur (IX4) ----------
// page15.png 를 전체 배경으로 깔고, 그 위에 blur 처리된 동일 이미지를 canvas로 그림.
// 드래그 시 canvas의 해당 영역을 destination-out 으로 지워서 선명한 원본이 드러남.
function Page15Poster({ next }) {
  const canvasRef = useRef5(null);
  const [cleared, setCleared] = useState5(0);
  const [showMono, setShowMono] = useState5(false);
  const drawingRef = useRef5(false);

  useEffect5(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // 이미지를 object-fit:cover 스타일로 canvas에 그리는 함수
    const img = new Image();
    img.crossOrigin = 'anonymous';
    const drawBlurred = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      canvas.width = vw;
      canvas.height = vh;

      // cover 배율 계산
      const ir = img.width / img.height;
      const vr = vw / vh;
      let dw, dh, dx, dy;
      if (ir > vr) { // 이미지가 더 가로로 길다 → height 기준
        dh = vh; dw = dh * ir; dx = (vw - dw) / 2; dy = 0;
      } else {
        dw = vw; dh = dw / ir; dx = 0; dy = (vh - dh) / 2;
      }
      ctx.save();
      ctx.filter = 'blur(18px)';
      // blur 외곽이 뚫리지 않도록 패딩 추가
      const pad = 40;
      ctx.drawImage(img, dx - pad, dy - pad, dw + pad * 2, dh + pad * 2);
      ctx.restore();
    };

    img.onload = drawBlurred;
    img.onerror = () => console.warn('[Page15] page15.png 로드 실패');
    img.src = 'assets/page15.png';

    const onResize = () => { if (img.complete) drawBlurred(); };
    window.addEventListener('resize', onResize);

    // 드래그 좌표
    const pos = (e) => {
      const t = e.touches ? e.touches[0] : e;
      return { x: t.clientX, y: t.clientY };
    };
    const erase = (x, y) => {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 75, 0, Math.PI * 2);
      ctx.fill();
    };
    const onDown = (e) => {
      drawingRef.current = true;
      const { x, y } = pos(e);
      erase(x, y);
    };
    const onMove = (e) => {
      if (!drawingRef.current) return;
      const { x, y } = pos(e);
      erase(x, y);
    };
    const onUp = () => {
      drawingRef.current = false;
      // 지워진 비율 계산 (샘플링)
      try {
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        let transparent = 0;
        const step = 4 * 100; // 샘플링 간격
        let samples = 0;
        for (let i = 3; i < imgData.data.length; i += step) {
          samples++;
          if (imgData.data[i] < 50) transparent++;
        }
        const r = transparent / samples;
        setCleared(r);
        if (r > 0.35 && !showMono) setShowMono(true);
      } catch (err) { /* cross-origin 이슈 시 무시 */ }
    };

    canvas.addEventListener('mousedown', onDown);
    canvas.addEventListener('touchstart', onDown, { passive: true });
    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onMove, { passive: true });
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchend', onUp);

    return () => {
      window.removeEventListener('resize', onResize);
      canvas.removeEventListener('mousedown', onDown);
      canvas.removeEventListener('touchstart', onDown);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchend', onUp);
    };
  }, [showMono]);

  return (
    <div style={{ position: 'absolute', inset: 0, background: '#000', overflow: 'hidden' }}>
      {/* 선명한 원본 이미지 — 전체 배경 */}
      <img src="assets/page15.png" alt=""
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'center',
          pointerEvents: 'none', userSelect: 'none'
        }}
        draggable="false" />

      {/* 블러 canvas — 이 위에 드래그하면 블러가 지워지고 원본이 드러남 */}
      <canvas ref={canvasRef}
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          cursor: 'grab',
          touchAction: 'none'
        }} />

      {/* 상단 안내 */}
      <div style={{
        position: 'absolute', top: 40, left: 0, right: 0, textAlign: 'center',
        fontFamily: 'var(--sans)', fontSize: 11, letterSpacing: '0.4em',
        color: '#ffffff', opacity: 0.85,
        textShadow: '0 2px 14px rgba(0,0,0,0.8)',
        zIndex: 5, pointerEvents: 'none'
      }}>
        DRAG TO REVEAL · 화면을 드래그하세요 ({Math.round(cleared * 100)}%)
      </div>

      {/* 50% 이상 지워지면 독백 오버레이 */}
      {showMono &&
        <div style={{
          position: 'absolute', inset: 0,
          background: 'rgba(0,0,0,0.55)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          animation: 'fadeIn 1.8s ease forwards',
          pointerEvents: 'none',
          zIndex: 10
        }}>
          <div style={{
            textAlign: 'center', opacity: 0,
            animation: 'fadeUp 2s ease 0.6s forwards',
            transform: 'translateY(14px)'
          }}>
            <div style={{ fontFamily: 'var(--serif)', fontSize: 40, color: '#f5ead0', lineHeight: 1.5 }}>
              늘 같이 있던 <em style={{ fontStyle: 'normal', color: '#e8b85c' }}>고양이</em>잖아.
            </div>
          </div>
        </div>
      }
      {showMono &&
        <button className="next-btn"
          style={{ color: '#f5ead0', borderColor: '#f5ead0', zIndex: 20 }}
          onClick={next}>계속 →</button>
      }
    </div>);

}

// ---------- Page 16 — Video 2 (fullscreen) ----------
function Page16Video2({ next }) {
  const [done, setDone] = useState5(false);
  const videoRef = useRef5(null);
  useEffect5(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.play().catch(() => { });
  }, []);
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#000', overflow: 'hidden' }}>
      <video ref={videoRef} src="assets/video2.mp4"
        autoPlay muted playsInline controls
        onEnded={() => setDone(true)}
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%', objectFit: 'cover',
          background: '#000'
        }} />
      {done && (
        <button className="next-btn" style={{
          color: '#d9c896', borderColor: '#d9c896',
          background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', zIndex: 10
        }}
          onClick={next}>계속 →</button>
      )}
    </div>
  );
}

Object.assign(window, { Page14Monologue2, Page15Poster, Page16Video2 });
