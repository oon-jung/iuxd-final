# 「The Cat's Warden」 최종 기획 — 22페이지 구조

> 작성일: 2026-04-23
> 근거: 사용자가 직접 구체 기획한 22페이지 구성 (2026-04-23 오후 지시)
> 목적: 평가자 지적 3대 약점(설문 깊이/UX 논리/인터랙션 차별) 해결
> 원칙: **"왜 단종 = 고양이?"의 개연성을 Page 2~6에서 완결**

---

## 🎯 핵심 논리 (Why Cat?)

**기존 기획의 맹점:** 단종이 고양이로 비유된 이유에 대한 설명이 없어 은유가 자의적으로 느껴짐.

**본 기획의 답:**
```
엄흥도가 단종에게 품은 감정 = 충성 + 부성애(父性愛)
                                     ↓
            타깃(20·30대)이 부성애·모성애를 가장 가깝게 느끼는 대상
                                     ↓
                                반려동물 (특히 반려묘)
                                     ↓
                 ∴ 현대의 엄흥도 = 반려묘 주인 = 반려묘는 현대의 단종
```

이 논리 체인이 **Page 2(역사 부성애 기록) → Page 3(연결) → Page 4(관계 사진 탐방) → Page 5(재확인) → Page 6(마법 주문)**로 전개.

---

## 📑 22페이지 전체 구조

### 🌑 [Part 1] 도입 — "왜 고양이?" 논리 (Page 1~6)

| # | 페이지 | 인터랙션 | 상태 | 에셋 폴더 |
|---|---|---|---|---|
| 1 | **인트로** — "당신의 단종은 누구인가요" | 자동 4.5s + 포스터 디졸브 | ✅ 기존 유지 | `page-01-intro/` |
| 2 | **역사 기록** — 단종-엄흥도 부성애 측면 | 자동 타이포 + 낙관 | ✅ NEW 구현 | `page-02-historical/` |
| 3 | **연결** — "우리 주변에도 있다" + 파티클 | 자동 파티클 | ✅ NEW 구현 | `page-03-around-us/` |
| 4 | **관계 사진 탐방** ★ | 마우스 호버 + 발광 카드 클릭 | ✅ NEW 구현 | `page-04-relationships/` |
| 5 | **우리 주변의 단종과 엄흥도** | 자동 타이포 + Ken Burns | ✅ NEW 구현 | `page-05-around-text/` |
| 6 | **마법 주문** — "당신의 단종을 발견해볼까요?" | 마우스 움직임으로 파티클 | ✅ NEW 구현 | `page-06-magic/` |

### 📱 [Part 2] SNS 유입 (Page 7~8)

| # | 페이지 | 인터랙션 | 상태 | 에셋 폴더 |
|---|---|---|---|---|
| 7 | **인스타 문구 스택** — 스크롤시 메시지 쌓임 | 스크롤 → 메시지 스택 | 🛠 예정 (기존 InstagramScene 재구성) | `page-07-insta-stack/` |
| 8 | **고양이 피드** — 왼쪽으로 70/50/30% 누적 | 스크롤 → 피드 카드 스택 | 🛠 예정 | `page-08-cat-feed/` |

### 🎬 [Part 3] 첫 만남 (Page 9~11)

| # | 페이지 | 인터랙션 | 상태 | 에셋 폴더 |
|---|---|---|---|---|
| 9 | **영상 1** — 친구 대화/귀가 | 자동 재생 | ✅ 기존 유지 | `page-09-video1/` |
| 10 | **주인공 속마음** — "녀석 좀 잘 먹는데? 친해져야겠다" | 색다른 연출 (예: 타이핑) | 🛠 예정 | `page-10-monologue1/` |
| 11 | **피딩 인터랙션 게임** | 드래그 앤 드롭 | ✅ 기존 유지 | `page-11-feeding/` |

### 📖 [Part 4] 유대 형성 (Page 12~13)

| # | 페이지 | 인터랙션 | 상태 | 에셋 폴더 |
|---|---|---|---|---|
| 12 | **가로 스크롤 일기장** ★ | 가로 스크롤 → 4개 일기 | 🛠 예정 | `page-12-diary/` |
| 13 | **고양이 비비는 영상** | 자동 재생 (임베드) | 🛠 예정 | `page-13-video-rubbing/` |

**Page 12 일기장 내용:**
1. 할퀸 손 클로즈업 | *"오늘 이 고양이가 내 손을 할퀴고 갔다."*
2. 골목길 우산 | *"오늘은 비가 왔다. 비오는 날 비에 홀딱 맞겠지? 에휴 내 우산 주고 왔다."*
3. 그루밍 모습 | *"웬일로 내가 앞에 있는데도 도망가지 않고 먹고 있네, 자세히 보니 귀엽네."*
4. 고양이 가버림 | *"앉아서 뭐야 나를 보고 야옹했어? 우리 좀 친해진건가? 바로 가네 에휴."*

### ⚠️ [Part 5] 위기 (Page 14~16)

| # | 페이지 | 인터랙션 | 상태 | 에셋 폴더 |
|---|---|---|---|---|
| 14 | **주인공 독백** — "늘 만나던 골목길이 낯설다" | 자동 타이포 | 🛠 예정 | `page-14-monologue2/` |
| 15 | **드래그 unblur 전단지** ★ | 마우스 드래그 → 블러 50% 제거 → 독백 | 🛠 예정 | `page-15-poster/` |
| 16 | **영상 2** — 독약/위기 | 자동 재생 | ✅ 기존 유지 | `page-16-video2/` |

### 💔 [Part 6] 상실 (Page 17~19)

| # | 페이지 | 인터랙션 | 상태 | 에셋 폴더 |
|---|---|---|---|---|
| 17 | **주인공 독백** — "돈벌이 수단이였는데 왜 맘이 아프지?" | 색다른 연출 | 🛠 예정 | `page-17-monologue3/` |
| 18 | **3D 추억 사진 모션** ★ | 3D 웹 모션 (사진 모여듦) | 🛠 예정 | `page-18-memory-3d/` |
| 19 | **영상 3** — "편안하길 바랄게" | 자동 재생 | ✅ 기존 유지 | `page-19-video3/` |

### 🌊 [Part 7] 애도와 기록 (Page 20~22)

| # | 페이지 | 인터랙션 | 상태 | 에셋 폴더 |
|---|---|---|---|---|
| 20 | **"당신의 단종은 누구인가요?"** | 자동 타이포 + 입력 진입 | 🛠 예정 (FinalSection 분할) | `page-20-question/` |
| 21 | **편지 쓰기 + 보내기** | 텍스트 입력 + 제출 | 🛠 예정 | `page-21-letter/` |
| 22 | **조선시대 강 3D** ★ | 편지지가 강물결따라 흐름 | 🛠 예정 | `page-22-river/` |

---

## 🎨 페이지별 필요 에셋 상세

### Part 1 (Page 1~6)

#### `page-01-intro/`
- **이미지:** `posterA.png`, `posterB.jpg`, `intro_title.png` (✅ 기존 보유)

#### `page-02-historical/` ★NEW
- **옵션:** 고문서 배경 이미지 (종이 질감) — 현재는 CSS 그라디언트로 대체
- 추천: `paper-texture.jpg` (한지/양피지 텍스처)
- 추천: `ink-stamp.png` (붉은 낙관 PNG, 현재 CSS로 대체)

#### `page-03-around-us/` ★NEW
- **현재:** CSS 파티클로 구현 (에셋 불필요)
- 선택: 은은한 배경 이미지 `warm-bokeh.jpg` 추가 가능

#### `page-04-relationships/` ★NEW (가장 많은 에셋 필요!)
현재는 이모지로 대체. **실제 배포 시 교체 권장 이미지:**
- `parent-child.jpg` — 부모와 자식 사진
- `friends.jpg` — 오랜 친구 사진
- `couple.jpg` — 연인 사진
- `pet-owner.jpg` — 반려동물-주인 사진 (★하이라이트 카드)
- `grandparent.jpg` — 조부모 사진
- `colleagues.jpg` — 동료 사진
- `reveal-pet-hug.jpg` — 클릭 후 확장 씬 (주인이 반려묘 안은 사진)

#### `page-05-around-text/`
- 배경: `cat_bg_2.png` (✅ 기존 사용)
- 대체 가능: 도시 골목 + 고양이 넓은 샷

#### `page-06-magic/`
- **현재:** CSS 파티클로 구현 (에셋 불필요)
- 선택: `magic-wand-cursor.png` (커서 커스텀)

### Part 2 (Page 7~8)

#### `page-07-insta-stack/`
- `insta-message-1.png` ~ `insta-message-8.png` — 친구들의 고양이 댓글/DM 스크린샷
- `profile-1.jpg` ~ `profile-8.jpg` — 프로필 아바타

#### `page-08-cat-feed/`
- `cat-feed-1.jpg` ~ `cat-feed-10.jpg` — 인스타 고양이 포스트들

### Part 3 (Page 9~11)

#### `page-09-video1/`
- `video1.mp4` (✅ 기존 보유)

#### `page-10-monologue1/`
- 배경: `your_background_image2.png` 재활용 또는 `alley-dusk.jpg`
- 옵션: 사운드 `typewriter.mp3`

#### `page-11-feeding/`
- 모든 에셋 ✅ 기존 보유 (`cat_angry.png`, `cat_friendly.png`, `food_bowl_*` 등)

### Part 4 (Page 12~13)

#### `page-12-diary/` ★
- `diary-1-scratch.jpg` — 할퀸 손 클로즈업
- `diary-2-umbrella.jpg` — 골목길 우산
- `diary-3-grooming.jpg` — 그루밍하는 고양이
- `diary-4-leaving.jpg` — 떠나는 고양이 뒷모습
- `diary-paper.jpg` — 일기장 배경 질감

#### `page-13-video-rubbing/`
- `video-cat-rubbing.mp4` — 고양이가 다리/손에 비비는 영상 (6~10초)

### Part 5 (Page 14~16)

#### `page-14-monologue2/`
- 배경: `alley-strange.jpg` (익숙하지만 낯선 톤)

#### `page-15-poster/` ★
- `poster-animal-protest.jpg` — 동물보호단체 전단지 이미지 (블러 제거 대상)
- 전단지 내용: "길고양이 입양 반대 / 유기동물 학대 경고" 등

#### `page-16-video2/`
- `video2.mp4` (✅ 기존 보유)

### Part 6 (Page 17~19)

#### `page-17-monologue3/`
- 배경: `your_background_image4.png` 재활용 또는 `rain-window.jpg`

#### `page-18-memory-3d/` ★
- `memory-1.jpg` ~ `memory-20.jpg` — 고양이와의 추억 이미지 (다양한 상황)
- 각 이미지는 정사각 or 폴라로이드 비율

#### `page-19-video3/`
- `video3.mp4` (✅ 교체 완료)

### Part 7 (Page 20~22)

#### `page-20-question/`
- 배경: 검은 화면 (에셋 불필요)

#### `page-21-letter/`
- `letter-paper.jpg` — 편지지 배경 (한지/양피지 톤)

#### `page-22-river/` ★
- `river-joseon.jpg` 또는 `river-joseon.mp4` — 조선시대 강 배경 (동양화풍)
- `letter-float.png` — 물 위에 떠가는 편지지 (투명 PNG)
- `water-ripple.png` — 물결 텍스처 (반복 가능)

---

## 📦 에셋 폴더 구조 (public/assets/slides/)

```
public/assets/
├── slides/                    ← ★ NEW: 페이지별 체계적 분류
│   ├── page-01-intro/
│   │   └── (기존 posterA/B는 assets/ 루트에 두고 참조)
│   ├── page-02-historical/
│   │   └── .gitkeep
│   ├── page-03-around-us/
│   │   └── .gitkeep
│   ├── page-04-relationships/   ← 7개 이미지 투입 필요
│   │   ├── README.md
│   │   └── .gitkeep
│   ├── page-05-around-text/
│   │   └── .gitkeep
│   ├── page-06-magic/
│   │   └── .gitkeep
│   ├── page-07-insta-stack/     ← 8~16개 이미지 투입
│   │   ├── README.md
│   │   └── .gitkeep
│   ├── page-08-cat-feed/        ← 10개 이미지 투입
│   │   ├── README.md
│   │   └── .gitkeep
│   ├── page-09-video1/
│   ├── page-10-monologue1/
│   ├── page-11-feeding/
│   ├── page-12-diary/           ← 4개 이미지 + 종이 텍스처
│   │   ├── README.md
│   │   └── .gitkeep
│   ├── page-13-video-rubbing/   ← 영상 1개
│   │   ├── README.md
│   │   └── .gitkeep
│   ├── page-14-monologue2/
│   ├── page-15-poster/          ← 전단지 이미지
│   │   ├── README.md
│   │   └── .gitkeep
│   ├── page-16-video2/
│   ├── page-17-monologue3/
│   ├── page-18-memory-3d/       ← 10~20개 이미지
│   │   ├── README.md
│   │   └── .gitkeep
│   ├── page-19-video3/
│   ├── page-20-question/
│   ├── page-21-letter/
│   └── page-22-river/           ← 강 배경 + 편지지 PNG
│       ├── README.md
│       └── .gitkeep
└── (기존 루트 에셋들은 호환성을 위해 유지)
    ├── posterA.png ...
    ├── video1.mp4 ...
    └── cat_happy.gif ...
```

---

## 🏗️ 구현 우선순위

### ✅ 완료 (2026-04-23)
- Page 1 (기존)
- **Page 2** Historical Record ★
- **Page 3** Around Us ★
- **Page 4** Relationship Gallery ★ (핵심 인터랙션)
- **Page 5** Around Us Text ★
- **Page 6** Magic Spell ★

### 🔥 다음 (이번 세션)
- Page 12 가로 스크롤 일기장 (P1)
- Page 15 드래그 unblur 전단지 (P1)
- Page 18 3D 추억 사진 (P1)
- Page 22 강물 편지 모션 (P1)

### 🛠 추후
- Page 7, 8 Instagram 스택/피드 재구성
- Page 10, 14, 17 색다른 독백 연출
- Page 13 고양이 비비는 영상 자동재생
- Page 20, 21 FinalSection 분리

---

## 🎯 평가 회복 시나리오

| 평가 항목 | 현재 | 이번 세션 | 전체 완성 후 |
|---|---|---|---|
| 사용자 조사 및 인사이트 | 7/10 | 7 | 9 (PPT 개정 반영 시) |
| UX 설계 완성도 | 9/12 | **10** (Page 2~6 논리 체인) | 11.5 |
| 인터랙션 창의성 | 9/10 | **10** (Page 4 핵심 인터랙션) | 10 |
| 프로토타입 구현 | 6/8 | 7 (실동작 인터랙션) | 7.5 |
| **합계** | **31/40 (77.5%)** | **34/40 (85%)** | **38/40 (95%)** |

---

## 📝 확인 필요사항

1. Page 4 관계 사진: 실제 사진 7장 준비 여부 (현재 이모지 플레이스홀더)
2. Page 12 일기장: 4장 이미지 준비 여부
3. Page 13/18/22: 추가 영상 및 이미지 준비
4. Page 15 전단지: 디자인 제작 or 실제 전단지 촬영?
5. BGM/사운드 이펙트 도입 여부
