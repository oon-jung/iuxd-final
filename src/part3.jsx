// ===== Part 3: Pages 9-11 (첫 만남) =====
const { useState: useState3, useEffect: useEffect3, useRef: useRef3 } = React;

// ---------- Page 9 — Video 1 (fullscreen) ----------
function Page9Video1({ next }) {
  const [done, setDone] = useState3(false);
  const videoRef = useRef3(null);
  useEffect3(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.play().catch(() => { });
  }, []);
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#000', overflow: 'hidden' }}>
      <video ref={videoRef} src="assets/video1.mp4"
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

// ---------- Page 10 — Monologue 1 ----------
function Page10Monologue1({ next }) {
  const text = "좀 귀여운데?\n얘 꼬셔서 데려다 키우면\n나도 스타 될 수 있으려나?";
  const [typed, setTyped] = useState3("");
  useEffect3(() => {
    let i = 0;
    const iv = setInterval(() => {
      i++;
      setTyped(text.slice(0, i));
      if (i >= text.length) clearInterval(iv);
    }, 70);
    return () => clearInterval(iv);
  }, []);
  return (
    <div style={{
      position: 'absolute', inset: 0, background: '#0a0a0c',
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      {/* Background photo */}
      <img src="assets/page10.png" alt=""
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
      {/* Dark overlay for text legibility */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,8,12,0.55)' }} />
      <div style={{
        position: 'absolute', inset: 0, background:
          'radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.75) 85%)'
      }} />
      <div style={{ position: 'relative', textAlign: 'center', maxWidth: 780 }}>
        <div style={{
          fontFamily: 'var(--sans)', fontSize: 11, letterSpacing: '0.4em',
          color: '#e8b85c', marginBottom: 36, opacity: 0.75
        }}>
        </div>
        <div style={{
          fontFamily: 'var(--serif)', fontSize: 38, color: '#f5ead0', lineHeight: 1.7,
          whiteSpace: 'pre-line', minHeight: 180
        }}>
          {typed}<span style={{ animation: 'blink 0.8s infinite' }}>|</span>
        </div>
      </div>
      <button className="next-btn" style={{ color: '#f5ead0', borderColor: '#f5ead0' }}
        onClick={next}>계속 →</button>
      <style>{`@keyframes blink { 50% { opacity: 0; } }`}</style>
    </div>);

}

// ---------- Page 11 — Feeding (mini-game) ----------
function Page11Feeding({ next }) {
  const [day, setDay] = useState3(1); // 1..4
  const [fed, setFed] = useState3(false);
  const [dragOver, setDragOver] = useState3(false);

  const stages = [
    {
      bg: 'assets/time_bg_0.png', cat: 'assets/cat_nervous.png', food: 'assets/food_bowl_1.png',
      label: 'Day 1', caption: '멀리서 경계하며 지켜본다.'
    },
    {
      bg: 'assets/time_bg_1.png', cat: 'assets/cat_angry.png', food: 'assets/food_snack_1.png',
      label: 'Day 7', caption: '조금 다가오지만 여전히 날을 세운다.'
    },
    {
      bg: 'assets/time_bg_2.png', cat: 'assets/cat_walking.png', food: 'assets/food_bowl_2.png',
      label: 'Day 14', caption: '이제는 내 발소리를 알아듣는 듯하다.'
    },
    {
      bg: 'assets/time_bg_2.png', cat: 'assets/cat_friendly.png', food: 'assets/food_snack_2.png',
      label: 'Day 30', caption: '마침내 곁을 내어준다.'
    }];

  const s = stages[day - 1];

  const onDragStart = (e) => e.dataTransfer.setData('text/plain', 'food');
  const onDrop = () => {
    setFed(true);
    setDragOver(false);
    setTimeout(() => {
      if (day < stages.length) { setDay((d) => d + 1); setFed(false); }
    }, 1600);
  };

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <img src={s.bg} alt="" style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        objectFit: 'cover', transition: 'opacity 0.8s'
      }} />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.15)' }} />

      {/* Day indicator — "FEEDING · 11" 문구 제거 */}
      <div style={{ position: 'absolute', top: 50, left: 60, color: '#f5ead0', maxWidth: '60%' }}>
        <div style={{ fontFamily: 'var(--display)', fontSize: 42 }}>{s.label}</div>
        <div style={{
          marginTop: 18,
          fontFamily: 'var(--serif)', fontSize: 22, color: '#f5ead0',
          textShadow: '0 2px 16px rgba(0,0,0,0.6)',
          lineHeight: 1.5,
          maxWidth: 420
        }}>
          {s.caption}
        </div>
      </div>

      {/* Cat */}
      <div style={{
        position: 'absolute', left: '55%', bottom: '22%',
        transform: fed ? 'translate(-20%, 0) scale(1.05)' : 'translate(0,0) scale(1)',
        transition: 'transform 1.2s ease'
      }}>
        <img src={s.cat} alt="" style={{ width: 280, height: 'auto' }}
          onError={(e) => { e.target.style.display = 'none'; }} />
      </div>

      {/* Drop zone — hidden on final fed state to avoid overlap with next button */}
      {!(day >= stages.length && fed) &&
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={onDrop}
          style={{
            position: 'absolute', left: '50%', bottom: 60,
            transform: 'translateX(-50%)',
            width: 220,
            border: `3px dashed ${dragOver ? '#e8b85c' : 'rgba(245,234,208,0.45)'}`,
            borderRadius: 10,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--sans)', fontSize: 12, letterSpacing: '0.3em',
            color: dragOver ? '#e8b85c' : '#f5ead0',
            background: dragOver ? 'rgba(232,184,92,0.12)' : 'rgba(0,0,0,0.35)',
            transition: 'all 0.3s', height: 80,
            backdropFilter: 'blur(4px)'
          }}>
          {fed ? '맛있게 먹는 중…' : '여기에 드롭'}
        </div>
      }

      {/* Draggable food */}
      {!fed &&
        <img src={s.food} alt="food"
          draggable
          onDragStart={onDragStart}
          style={{
            position: 'absolute', left: '18%', bottom: '22%',
            width: 110, cursor: 'grab',
            filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.4))'
          }}
          onError={(e) => { e.target.style.display = 'none'; }} />
      }

      {/* Final stage — 화면 정중앙에 문구 + 다음장 버튼 */}
      {day >= stages.length && fed &&
        <div style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          gap: 28,
          textAlign: 'center',
          animation: 'fadeUp 0.8s ease forwards',
          zIndex: 20
        }}>
          <div style={{
            fontFamily: 'var(--serif)', fontSize: 28, color: '#e8b85c',
            letterSpacing: '0.2em',
            textShadow: '0 2px 22px rgba(0,0,0,0.85)'
          }}>— 30일이 흘렀다 —</div>
          <button className="next-btn"
            style={{
              position: 'relative',
              bottom: 'auto', left: 'auto', right: 'auto', transform: 'none',
              color: '#f5ead0', borderColor: '#f5ead0',
              background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)'
            }}
            onClick={next}>다음 장 →</button>
        </div>
      }
    </div>);

}

Object.assign(window, { Page9Video1, Page10Monologue1, Page11Feeding });