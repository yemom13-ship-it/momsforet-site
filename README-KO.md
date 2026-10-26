# 맘스포레 정적 홈페이지 템플릿 (GitHub Pages용)

WordPress/PHP 없이 HTML + CSS + JavaScript만으로 동작하는 홈페이지입니다. GitHub에 파일을 업로드한 뒤 **GitHub Pages**로 공개할 수 있습니다. 빌드 서버나 데이터베이스가 필요하지 않습니다.

## 포함된 페이지

- `index.html`: 메인 페이지
- `preview.html`: 메인 디자인을 확인하는 미리보기용 페이지 (실제 홈은 index.html)
- `about.html`: 맘스포레 소개
- `care.html`: 케어 프로그램
- `rooms.html`: 객실 안내
- `pricing.html`: 이용 요금
- `guide.html`: 입실 준비 가이드
- `faq.html`: 자주 묻는 질문 + FAQ 구조화 데이터 예시
- `reservation.html`: 방문상담 예약 폼 UI
- `privacy.html`: 개인정보 처리 안내 작성 템플릿
- `404.html`: 찾을 수 없는 페이지 화면

## 1. GitHub에 업로드하고 공개하기

1. GitHub 계정으로 로그인합니다.
2. 오른쪽 위 `+` → **New repository**를 선택합니다.
3. Repository name에 `momsforet-site`를 입력합니다. Public으로 만들면 설정이 간단합니다.
4. 이 ZIP을 컴퓨터에 압축 해제합니다.
5. 새 저장소 화면에서 **Add file → Upload files**를 선택하고, 압축 해제한 폴더 안의 파일과 폴더를 업로드합니다. ZIP 파일 자체를 올리는 것이 아니라 **ZIP 안의 파일들을 업로드**해야 합니다.
6. `Commit changes`를 눌러 저장합니다.
7. 저장소에서 **Settings → Pages**로 이동합니다.
8. Build and deployment에서 `Deploy from a branch`를 선택합니다.
9. Branch는 `main`, folder는 `/(root)`로 선택하고 `Save`를 누릅니다.
10. Pages 화면에 표시되는 주소(일반적으로 `https://YOUR-USERNAME.github.io/momsforet-site/`)로 접속합니다. 배포가 완료되기까지 몇 분 걸릴 수 있습니다.

## 2. 우선 수정할 파일

### 연락처·주소·카카오톡·사이트 주소 설정

`assets/js/site-config.js`를 열고 아래 값을 수정하세요.

```js
window.MOMS_FORET_CONFIG = {
  siteName: "맘스포레 산후조리원",
  siteUrl: "https://YOUR-USERNAME.github.io/momsforet-site/",
  phoneDisplay: "실제 전화번호",
  phoneLink: "0311234567",
  kakaoUrl: "https://pf.kakao.com/실제채널주소",
  address: "실제 도로명 주소",
  streetAddress: "실제 도로명 주소",
  addressLocality: "시·군·구",
  addressRegion: "시·도",
  postalCode: "우편번호",
  addressCountry: "KR",
  hours: "실제 상담 가능 시간",
  formEndpoint: ""
};
```

- `siteUrl`: GitHub Pages 주소를 복사해 입력합니다. 실제 도메인을 연결하면 그 도메인으로 변경하세요.
- `phoneDisplay`: 화면에 표시할 전화번호.
- `phoneLink`: `tel:` 링크용 숫자와 선택적 `+`만 입력.
- `kakaoUrl`: 실제 카카오톡 상담 채널 URL.
- `address`, `hours`: 실제 운영 정보. `streetAddress`, `addressLocality`, `addressRegion`, `postalCode`는 구조화 데이터용으로 확인된 주소 요소를 입력합니다.
- `formEndpoint`: 폼 수신 서비스에서 발급받은 실제 endpoint. 비워두면 폼 신청을 전송하지 않으며, 화면에서 연결 필요 안내가 표시됩니다.

## 3. 사진 추가하기

1. `assets/images/` 폴더에 사진 파일을 업로드합니다.
2. HTML에 등록된 경로/파일명과 일치하면 사진이 자동 표시됩니다.
3. 이미지를 교체하려면 같은 이름으로 덮어쓰거나 HTML 파일의 `data-photo` 값을 변경합니다.

### 기본 사진 파일명

- `hero.jpg`: 메인 히어로
- `nursery.jpg`: 신생아실
- `mother-care.jpg`: 산모 케어
- `room-main.jpg`: 메인 객실
- `care-detail.jpg`: 케어 현장
- `room-type-a.jpg`, `room-type-b.jpg`: 객실 유형
- `about-hero.jpg`, `about-space.jpg`: 소개 페이지
- `facility-01.jpg`, `facility-02.jpg`, `facility-03.jpg`: 시설 갤러리
- `care-hero.jpg`, `care-newborn.jpg`, `care-mother.jpg`: 케어 페이지
- `rooms-hero.jpg`, `facility-lounge.jpg`, `facility-nursery.jpg`, `facility-wellness.jpg`: 객실/시설 페이지
- `pricing-hero.jpg`: 요금 페이지
- `guide-hero.jpg`: 입실 준비 페이지
- `faq-hero.jpg`: FAQ 페이지
- `reservation-hero.jpg`: 예약 페이지
- `privacy-hero.jpg`: 개인정보 안내 페이지

사진이 없다면 영역에 사진을 넣을 위치와 파일명이 표시됩니다. 권장 크기는 히어로 가로 1800px 이상, 카드 가로 1000px 이상입니다. JPG로 저장하는 것을 권장하며 가능하면 WebP로 최적화 후 HTML 경로도 `.webp`로 변경할 수 있습니다.

## 4. 문구 수정

HTML 파일을 메모장, Visual Studio Code 또는 GitHub 웹 편집기에서 열어 텍스트를 직접 수정하세요. 각 페이지 `<title>`과 `meta description`도 페이지별로 작성되어 있습니다. 본문 변경 시 제목·설명·구조화 데이터 내용도 함께 확인합니다.

요금, 주소, 운영시간, 신생아 케어 및 감염관리 절차는 확인된 실제 운영 정보만 기재하세요. 현재 요금과 서비스 정책이 이 템플릿에 자동으로 채워져 있지 않습니다.

## 5. 상담 폼 연결 (중요)

이 프로젝트는 정적 사이트이므로 폼 데이터를 자체 저장하거나 이메일로 전달하는 백엔드가 없습니다. `reservation.html`의 폼 화면만으로는 예약 접수가 완료되지 않습니다.

- Formspree 등 폼 수신 서비스 계정을 만든 뒤 endpoint를 발급받습니다.
- `assets/js/site-config.js`의 `formEndpoint`에 그 endpoint를 입력합니다.
- 테스트 신청을 제출하고 수신 여부를 확인합니다.
- 개인정보 처리 안내(`privacy.html`)에 서비스 제공자, 이용 목적, 수집 항목, 보유 기간 등을 실제 구성에 맞게 기재합니다.
- 실제 고객 개인정보를 수집하기 전 동의 문구와 개인정보 처리 절차를 검토하세요.

예약 내용을 자체 DB나 관리자 화면에 저장하려면 별도의 백엔드 또는 예약 서비스가 필요합니다.

## 6. SEO / AEO / GEO 설정

- 각 페이지에 고유 `<title>`, `meta description`, H1이 있습니다.
- `faq.html`에는 화면에 보이는 FAQ와 동일한 JSON-LD FAQPage 예시가 있습니다. 검색 결과에서 FAQ 리치 결과가 보장되지는 않습니다.
- 메인 페이지에는 WebSite 구조화 데이터 예시가 있습니다. 업체 정보가 확인되면 올바른 `Organization`/`LocalBusiness` 계열 스키마를 추가하세요.
- `sitemap.xml`과 `robots.txt` 안의 `YOUR-USERNAME.github.io/momsforet-site`를 실제 공개 주소로 바꿉니다.
- GitHub Pages는 기본적으로 `username.github.io/repository` 경로를 사용합니다. `site-config.js`의 `siteUrl`에도 마지막 슬래시까지 실제 주소를 넣습니다.
- 네이버 서치어드바이저와 Google Search Console에 사이트를 등록하고 사이트맵을 제출합니다.
- GEO는 AI 노출을 보장하는 기술이 아닙니다. 브랜드, 주소, 전화번호, 가격, 서비스의 정확성과 외부 공식 정보의 일관성을 유지하세요.

## 7. 커스텀 도메인 사용 시

GitHub 저장소의 **Settings → Pages → Custom domain**에서 연결할 도메인을 입력하고 DNS 설정을 진행합니다. 도메인 운영업체의 DNS 값은 현재 제공되는 GitHub Pages 지침을 확인한 후 설정하세요. 도메인을 연결하고 HTTPS가 적용된 뒤 `site-config.js`, `robots.txt`, `sitemap.xml`, 각 페이지 canonical 주소가 실제 도메인과 일치하는지 확인합니다.

## 8. 오픈 전 점검

- [ ] 실제 연락처·주소·운영시간을 입력함
- [ ] 실제 요금과 서비스 내용을 입력함
- [ ] 실제 시설 사진을 교체함
- [ ] 카카오톡 상담 URL을 입력함
- [ ] 폼 수신 endpoint를 연결하고 실제 테스트함
- [ ] 개인정보 처리 안내를 실제 절차에 맞게 검토함
- [ ] 사이트 URL·canonical·sitemap·robots를 수정함
- [ ] 휴대폰에서 메뉴, 버튼, 폼을 테스트함
- [ ] Search Console / 네이버 서치어드바이저 등록 및 사이트맵 제출
- [ ] 기존 사이트가 있다면 이전 URL의 리디렉션과 검색 유입 손실을 별도로 계획함

---

**기술 스택:** HTML5, CSS3, Vanilla JavaScript. 빌드 명령어 없음. Node.js, PHP 또는 데이터베이스 불필요. GitHub Pages 호환.
