# OnlyOfficePractice

ONLYOFFICE DocSpace를 React(Vite) 환경에서 연동해 보는 연습용 프로젝트입니다.  
로그인 화면에서 사용자 입력을 받고, DocSpace SDK를 이용해 문서 공간을 임베드합니다.

## 환경 구성

- Node.js 18+
- npm 10+

## 설치 및 실행

```bash
npm install
npm run dev
```

기본 개발 서버 포트는 `5173`입니다.

## 환경 변수

루트에 `.env` 파일을 생성하고 DocSpace 주소를 설정하세요.

```
VITE_DOCSPACE_URL=https://example.onlyoffice.com
```

## 주요 기능

- 로그인 페이지에서 아이디/비밀번호 입력 및 기본 유효성 검사
- 버튼 클릭 시 ONLYOFFICE DocSpace 프레임 로드
- DocSpace 헤더 영역에서 닫기 버튼을 통해 다시 로그인 화면으로 이동

## 빌드

```bash
npm run build
```

생성된 `dist` 폴더를 배포 서버에 업로드하면 됩니다.
