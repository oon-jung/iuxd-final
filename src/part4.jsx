// ===== Part 4: Pages 12-13 (유대) =====
const { useState: useState4, useEffect: useEffect4, useRef: useRef4 } = React;

// ---------- Page 12 — Horizontal Diary (IX3) ----------
// Photo card 한 장 — 16:9 landscape 사진 슬롯 + 텍스트 라벨 폴백
function Page12PhotoCard({ entry, idx }) {
  const [hasImg, setHasImg] = useState4(false);
  const num = String(idx + 1).padStart(2, '0');
  return (
    <div style={{
      width: 540, height: 400,
      background: '#ffffff',
      padding: 14,
      boxShadow: '0 24px 60px rgba(60,40,20,0.25)',
      transform: `rotate(${idx % 2 === 0 ? -2 : 2}deg)`,
      flexShrink: 0
    }}>
      <div style={{
        position: 'relative',
        width: '100%', height: '82%',
        background: '#f0e8d8',
        overflow: 'hidden'
      }}>
        {/* 실 이미지 슬롯 — assets/slides/page12/01.png ~ 04.png (16:9 landscape) */}
        <img
          src={`assets/slides/page12/${num}.png`}
          alt=""
          onLoad={() => setHasImg(true)}
          onError={(e) => { e.currentTarget.style.display = 'none'; setHasImg(false); }}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%', objectFit: 'cover'
          }}
        />
        {/* 라벨 폴백 — 이미지 없을 때만 */}
        {!hasImg && <div className="ph" style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'rgba(60,40,20,0.45)'
        }}>
          {entry.image}
        </div>}
      </div>
      <div style={{
        textAlign: 'center', marginTop: 12,
        fontFamily: 'var(--yet)', fontSize: 16, color: '#5a4520'
      }}>
        {entry.date}
      </div>
    </div>
  );
}

function Page12Diary({ next }) {
  const entries = [
    {
      date: '三月 十二日',
      image: '할퀸 손 · SCRATCH',
      text: '아씨 뭐야\n순한줄 알았는데 얘는 왜 이렇게 사납지?\n이건 내가 상상했던 고양이가 아닌데',
    },
    {
      date: '三月 二十日',
      image: '비 오는 골목 · RAIN',
      text: '비가 오네.\n고양이도 비에 홀딱 맞겠지?\n에휴 — 내 우산 주고 왔다.',
    },
    {
      date: '四月 二日',
      image: '그루밍 · GROOMING',
      text: '웬일로 내가 앞에 있는데도 도망가지 않고,\n자세히 보니 귀엽네.',
    },
    {
      date: '四月 十五日',
      image: '야옹 후 떠남 · GOODBYE',
      text: '뭐야 나를 보고 야옹했어?\n우리 좀 친해진 건가?\n바로 가네, 에휴.',
    },
  ];
  const [idx, setIdx] = useState4(0);
  const scrollElRef = useRef4(null);

  /**
   * ref callback — DOM 마운트 시점에 바로 wheel 리스너 등록.
   * scroll-snap 제거하고 JS로 부드럽게 scrollLeft 증가.
   * key 옵션: passive:false 로 preventDefault 가능.
   */
  const setScrollEl = React.useCallback((el) => {
    // cleanup 이전 바인딩
    if (scrollElRef.current && scrollElRef.current.__p12_cleanup) {
      scrollElRef.current.__p12_cleanup();
    }
    scrollElRef.current = el;
    if (!el) return;

    const onWheel = (e) => {
      const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      if (delta === 0) return;
      e.preventDefault();
      el.scrollLeft += delta * 1.8;
    };

    const onScroll = () => {
      const w = el.clientWidth;
      setIdx(Math.round(el.scrollLeft / w));
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    el.addEventListener('scroll', onScroll, { passive: true });

    el.__p12_cleanup = () => {
      el.removeEventListener('wheel', onWheel);
      el.removeEventListener('scroll', onScroll);
    };
  }, []);

  // unmount 시 cleanup
  useEffect4(() => () => {
    if (scrollElRef.current && scrollElRef.current.__p12_cleanup) {
      scrollElRef.current.__p12_cleanup();
    }
  }, []);

  return (
    <div style={{
      position: 'absolute', inset: 0, overflow: 'hidden',
      background: '#e8d9b8' /* 배경 이미지 주변 책상 톤 */
    }}>
      <div ref={setScrollEl}
        className="no-scrollbar"
        style={{
          position: 'absolute', inset: 0,
          overflowX: 'auto', overflowY: 'hidden',
          display: 'flex',
          scrollBehavior: 'auto',
          touchAction: 'pan-x'
        }}>
        {entries.map((e, i) => (
          <div key={i} style={{
            flex: '0 0 100vw', height: '100vh',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '0 10vw', gap: 60,
            /* 각 일기 페이지마다 모눈지 노트 배경 */
            backgroundImage: 'url(assets/page12_background.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}>
            {/* Photo — 16:9 landscape 사진 + 날짜 */}
            <Page12PhotoCard entry={e} idx={i} />
            {/* Diary text — 배경/타이틀/세로선 제거, 우측으로 더 이동, 글자 크기 키움 */}
            <div style={{
              width: 560, position: 'relative',
              padding: '48px 40px 48px 56px',
              marginLeft: 120,
            }}>
              <div style={{
                fontFamily: 'var(--serif)', fontSize: 27, lineHeight: 2.0,
                color: '#2a1d10', whiteSpace: 'pre-line',
                textIndent: '0em',
                letterSpacing: '0.01em'
              }}>
                {e.text}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 상단 인디케이터 (점 + 번호) — pill */}
      <div style={{
        position: 'absolute', top: 48, left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex', gap: 14, alignItems: 'center',
        padding: '10px 20px',
        background: 'rgba(255,250,235,0.55)',
        backdropFilter: 'blur(8px)',
        borderRadius: 999,
        zIndex: 5
      }}>
        {entries.map((_, i) =>
          <div key={i} style={{
            width: i === idx ? 28 : 6, height: 2,
            background: i === idx ? '#5a1810' : 'rgba(60,40,20,0.3)',
            transition: 'width 0.3s'
          }} />
        )}
        <div style={{
          fontFamily: 'var(--sans)', fontSize: 10,
          letterSpacing: '0.25em',
          color: 'rgba(60,40,20,0.6)',
          marginLeft: 8
        }}>{idx + 1} / {entries.length}</div>
      </div>

      {/* 하단 힌트 — 중간 페이지 */}
      {idx < entries.length - 1 &&
        <div style={{
          position: 'absolute', bottom: 48, left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: 'var(--sans)', fontSize: 11, letterSpacing: '0.3em',
          color: 'rgba(60,40,20,0.5)',
          pointerEvents: 'none',
          animation: 'hintPulse 2.4s ease-in-out infinite'
        }}>→  휠 또는 스와이프로 가로 이동</div>
      }

      {idx >= entries.length - 1 &&
        <button className="next-btn" onClick={next}>계속 →</button>
      }
    </div>
  );
}

// ---------- Page 13 — Approaching → Rubbing ----------
// 고양이가 멀리서 점점 다가오는 시퀀스 (3단계) → mp4 재생
// Page 12(아직 거리 있는 일기장) 와 "비비기" 사이의 자연스러운 교량
function Page13Rubbing({ next }) {
  const [phase, setPhase] = useState4(0);
  const videoRef = useRef4(null);
  // 0: 저 멀리 (작게)
  // 1: 조심스레 다가옴 (중간 크기)
  // 2: 바로 눈앞 (크게)
  // 3: mp4 — 몸을 비빔 (캡션: 다가와 비빈다)
  // 4: mp4 계속 — 캡션만 교체 (우리 이제 좀 친해진 것 같다)

  useEffect4(() => {
    const timers = [
      setTimeout(() => setPhase(1), 1600),
      setTimeout(() => setPhase(2), 3200),
      setTimeout(() => setPhase(3), 4800),
      setTimeout(() => setPhase(4), 11000)  // 비디오가 천천히 재생되는 동안 phase 3 캡션 충분히 노출
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  // phase에 따라 고양이 크기/위치 보간
  const catScale = phase === 0 ? 0.22 : phase === 1 ? 0.50 : 0.95;
  const catBottom = phase === 0 ? '62%' : phase === 1 ? '38%' : '10%';
  const catOpacity = phase < 3 ? 1 : 0; // mp4 단계에선 이미지 숨김

  // 2단계부터는 friendly 표정으로 교체
  const catSrc = phase < 2 ? 'assets/cat_walking.png' : 'assets/cat_friendly.png';

  // 캡션
  const captions = [
    '— 저 멀리, 걸어오고 있다 —',
    '— 조심스럽게 다가온다 —',
    '— 바로 눈앞까지 —',
    '— 다가와 몸을 비빈다 —',
    '— 우리 이제 좀 친해진 것 같다 —'
  ];

  return (
    <div style={{ position: 'absolute', inset: 0, background: '#0a0a0c', overflow: 'hidden' }}>

      {/* phase 3 이전 — page13.png 배경 + 어둡게 내리는 오버레이 */}
      {phase < 3 &&
        <>
          <img src="assets/page13.png" alt=""
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: 'center',
              pointerEvents: 'none', userSelect: 'none'
            }}
            draggable="false" />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'rgba(0,0,0,0.4)',
            pointerEvents: 'none'
          }} />
        </>
      }

      {/* 고양이 이미지 — 다가오는 시퀀스 */}
      {phase < 3 &&
        <img src={catSrc} alt=""
          style={{
            position: 'absolute',
            left: '50%',
            bottom: catBottom,
            transform: `translateX(-50%) scale(${catScale})`,
            transformOrigin: 'center bottom',
            height: 'auto', width: 'auto', maxHeight: '80vh',
            transition: 'bottom 1.4s cubic-bezier(.3,.1,.3,1), transform 1.4s cubic-bezier(.3,.1,.3,1), opacity 0.6s ease',
            opacity: catOpacity,
            filter: 'drop-shadow(0 40px 80px rgba(0,0,0,0.8)) brightness(0.95)',
            zIndex: 2
          }} />
      }

      {/* phase 3+ — 비비는 영상 (0.4배 재생, metadata/play 이벤트에서 속도 강제) */}
      {phase >= 3 &&
        <video ref={videoRef} src="assets/cat_happy.mp4"
          autoPlay muted loop playsInline
          onLoadedMetadata={(e) => { e.currentTarget.playbackRate = 0.4; }}
          onPlay={(e) => { e.currentTarget.playbackRate = 0.4; }}
          onRateChange={(e) => {
            if (e.currentTarget.playbackRate !== 0.4) {
              e.currentTarget.playbackRate = 0.4;
            }
          }}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center',
            filter: 'brightness(0.92)',
            display: 'block',
            animation: 'fadeIn 1.4s ease forwards',
            zIndex: 1
          }} />
      }

      {/* Vignette */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.55) 100%)',
        zIndex: 3
      }} />

      {/* 상단 캡션 — phase 바뀔 때마다 자연스럽게 교체 */}
      <div style={{
        position: 'absolute', top: 72, left: 0, right: 0, textAlign: 'center',
        fontFamily: 'var(--serif)', fontSize: 24, color: '#f5ead0',
        letterSpacing: '0.08em',
        textShadow: '0 2px 18px rgba(0,0,0,0.9)',
        zIndex: 5,
        pointerEvents: 'none'
      }}>
        <div key={phase} style={{
          animation: 'fadeIn 1.2s ease forwards',
          opacity: 0
        }}>
          {captions[phase]}
        </div>
      </div>

      {/* phase 4 이후 Next 버튼 — "친해진 것 같다" 캡션까지 읽고 진행 */}
      {phase >= 4 &&
        <button className="next-btn"
          style={{
            color: '#f5ead0', borderColor: '#f5ead0', bottom: 40,
            background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(6px)', zIndex: 10
          }}
          onClick={next}>계속 →</button>
      }
    </div>
  );
}

Object.assign(window, { Page12Diary, Page13Rubbing });
