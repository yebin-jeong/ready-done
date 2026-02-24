<br/>

## 🚀 Ready

> **Ready, Done.** > 기술 블로그 작성의 막막함을 해소하고, 키워드 입력만으로 구조화된 마크다운 초안을 생성하는 프론트엔드 개발자 맞춤형 AI 포스팅 툴입니다.

<br/>

### 🎯 Project Purpose

* **첫 문장의 막막함 해소**: AI를 통해 제목, 본문, 해시태그가 포함된 마크다운 초안을 즉시 생성하여 포스팅 효율을 극대화합니다.
* **학습 기록의 습관화**: TIL(Today I Learned)이나 에러 로그를 남기고 싶지만 글재주가 고민인 학습자들을 위해 구조화된 템플릿을 제공합니다.
* **심리스한 편집 경험**: 대시보드 형태의 단일 화면 UI에서 생성부터 수정, 코드 하이라이팅 확인까지 한 번에 수행합니다.

<br/>
   
### 📁 프로젝트 구조 (Project Structure)

`src` 디렉토리를 중심으로 한 프로젝트의 주요 구조입니다.

```text
ready-done
├── .github/             # GitHub 설정 (PR 템플릿 등)
├── public/              # 정적 자원 (이미지, 폰트 등)
└── src/
    ├── app/             # App Router (페이지 및 API 라우트)
    │   ├── api/         # Backend API 엔드포인트
    │   ├── globals.css  # 글로벌 스타일
    │   ├── layout.tsx   # 메인 레이아웃
    │   └── page.tsx     # 메인 페이지
    ├── components/      # 재사용 가능한 UI 컴포넌트
    │   ├── common/      # 공통 컴포넌트 (Logo, Button, Sidebar 등)
    │   ├── providers/   # Context Providers (ThemeProvider 등)
    │   ├── viewer/      # 포스트 뷰어 및 에디터 관련 컴포넌트
    │   ├── InputSection.tsx
    │   └── LayoutShell.tsx
    ├── constants/       # 상수 관리 (templates 등)
    ├── lib/             # 유틸리티 및 라이브러리 설정 (openai, utils 등)
    └── types/           # 전역 타입 정의
```

<br/>

### 🔑 핵심 기능 (Key Features)

* **자동화된 콘텐츠 생성**: OpenAI API 기반의 마크다운 초안 및 SEO 메타 데이터 생성
* **지속적인 기록 관리**: 로컬 스토리지를 활용한 별도 로그인 없는 생성 내역 관리
* **개발자 맞춤형 에디터**: Prism.js 적용으로 실시간 코드 가독성 확인 및 자유로운 수정
* **효율적인 내보내기**: 클립보드 복사 및 파일 다운로드 기능 지원
* **최적화된 UX**: 개발자 친화적인 다크모드 및 반응형 UI 제공
  
<br/>

### 🛠 기술 스택 (Tech Stack)

| Category | stack |
| :--- | :--- |
| **Framework** | ![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white) |
| **Language** | ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white) |
| **Styling** | ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white) ![PostCSS](https://img.shields.io/badge/PostCSS-DD3A0A?style=for-the-badge&logo=postcss&logoColor=white) |
| **AI Integration** | ![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white) |
| **Linting** | ![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white) |

<br/>

### 🌊 사용자 흐름 (UX Flow)

1. **입력**: 주제와 키워드를 입력하고 원하는 스타일 선택 후 생성 클릭
2. **생성**: 비동기 상태 관리를 통한 로딩 애니메이션과 함께 AI 글 생성
3. **편집**: 실시간 상태 동기화로 에디터 수정 사항을 프리뷰에서 즉시 확인
4. **완료**: 결과물을 클립보드에 복사하거나 파일로 저장하여 블로그에 게시
5. **관리**: 생성 내역 아이콘을 통해 이전 작업물을 로컬 스토리지에서 호출

<br/>

### 🚀 시작하기 (Getting Started)

**1. 환경 변수 설정**
`.env.local` 파일을 루트 폴더에 생성하고 필요한 API 키를 설정하세요.

```text
OPENAI_API_KEY=your_api_key_here
```

**2. 패키지 설치**
```text
npm install
```

**3. 로컬 서버 실행**
```text
npm run dev
```

<br/>

### 🔗 Deployment

[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://ready-done-kappa.vercel.app/)
