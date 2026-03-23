# Best Hobby Event

베스트하비 고객이 이벤트, 예약, 마감 정보를 한곳에서 확인할 수 있도록 만든 모바일 우선 웹앱 MVP입니다.

## MVP 기능
- 전체 이벤트 허브 홈
- 브랜드별 필터
- 이벤트 상세 보기
- 마감 임박 / 진행 중 / 오늘 시작 상태 표시
- 관심 브랜드 저장

## 브랜드
- 굿스마일컴퍼니
- 코토부키야
- 메가하우스
- T-SPARK

## 실행 방법
```bash
npm install
npm run dev
```

브라우저에서 아래 주소로 접속합니다.

```bash
http://localhost:3000
```

## 빌드
```bash
npm run build
```

## 이미지 생성 파이프라인 (1차)
이미지 API 키가 있으면 이벤트용 포스터 시안을 프로젝트 안에 바로 저장할 수 있습니다.

### 준비
`.env.local` 또는 실행 환경에 아래 값을 넣습니다.

```bash
GEMINI_API_KEY=your_api_key_here
```

### 프롬프트 파일
예시 파일:

```bash
prompts/tspark-follow-event-poster.json
```

### 실행
```bash
npm run image:generate -- prompts/tspark-follow-event-poster.json
```

- `GEMINI_API_KEY`가 없으면 dry-run으로 프롬프트만 출력합니다.
- 키가 있으면 결과 이미지를 `public/generated/posters/` 아래에 저장합니다.
