# The Cat's Warden · 냥과 사는 남자

UX/UI Design Final Project · 9조
22-page interactive exhibition — 현대의 엄흥도(반려인)와 단종(길고양이) 이야기.

## Stack

- Static HTML + React 18 UMD + Babel Standalone (no build step)
- Fonts: Pretendard + NanumMyeongjo-YetHangul + Kanibuk + Wolin
- Assets: 한지 배경, 사진, 비디오 (video1/2/3.mp4), 고양이 GIF/MP4

## Local Dev

```bash
python3 -m http.server 3017
# open http://localhost:3017
```

## Deployment

GitHub Pages (from `main` branch root).

### 비디오 이슈

`assets/video*.mp4` 중 `video3.mp4` 가 479 MB 로 GitHub 100 MB 파일 제한 초과.
현재 `.gitignore` 에 video1/2/3 제외 중. 3가지 선택지:

1. **압축 (권장)**: ffmpeg 로 각 영상을 < 50 MB 로 재인코딩 후 `.gitignore` 에서 제외 해제
2. **Git LFS**: `git lfs track "assets/video*.mp4"` — 대용량 유지 가능하나 무료 플랜 대역폭 제한 (월 1 GB)
3. **외부 호스팅**: Cloudflare Stream / Vimeo 등에 업로드 후 `<video src="...">` URL 교체

## Folder Map

```
index.html          진입점
styles.css          전역 스타일
src/
  app.jsx           23-page shell + 네비게이션
  part1.jsx         Pages 1–6 (도입 · 논리)
  part2.jsx         Pages 7–8.5 (SNS 유입)
  part3.jsx         Pages 9–11 (첫 만남)
  part4.jsx         Pages 12–13 (유대)
  part5.jsx         Pages 14–16 (위기)
  part6.jsx         Pages 17–19 (상실)
  part7.jsx         Pages 20–22 (승화)
assets/
  slides/page4/     Page 4 관계 카드 (9장, optional)
  slides/page5/     Page 5 장면 카드 (6장)
  fonts/            웹폰트
  page*.png / .mp4  기타 이미지/영상
```
