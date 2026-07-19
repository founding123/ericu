/* ============================================================
   사이트 설정 — 강의 정보의 단일 출처

   ▣ 구조 요약 (정보는 한 곳에만 적는다)
       TOC_ENC        번호 → [강의 제목, 교수 이름]   ← 강의 목록의 전부
       PROF_NOTE_ENC  교수 이름 → 한 줄 평
       SITE_ENC       사이트 문구 (제목·강조어·라벨·태그라인·과목명)

     예전의 PAGE_NUMBERS 배열은 없어졌다. 페이지 번호 목록은
     TOC_ENC의 키에서 자동으로 나온다. PROF_ENC도 필요 없다 —
     교수 이름이 TOC_ENC 안에 함께 있기 때문이다.

   ▣ 새 페이지 추가하는 법 (이제 두 단계뿐)
     1) 파일을 ericuNNNN.html 이름으로 올린다.
        예) ericu0100.html, ericu3050.html
     2) 아래 TOC_ENC에 한 줄을 추가한다.
        예) "3050": ["새 강의 제목", "홍길동"],
     끝. 목차·이전/다음 페이저·문항 페이지 h1·교수별 묶기가
     전부 이 한 줄을 읽는다.

   ▣ TOC_ENC 항목 형식
       "번호": ["강의 제목", "교수 이름"]

     · 교수 칸("")을 비워 두면: 예전 방식대로 그 페이지의
       pageMetaPayload subtitle("22: 이름;")을 내려받아 읽는다.
       (기존에 배포한 파일들은 그대로 동작한다는 뜻)
     · 교수 칸을 채우면: 파일을 하나도 내려받지 않고 즉시
       교수별 묶기가 된다. 채우는 쪽을 권장.
     · 옛 형식 "번호": "강의 제목" (문자열만)도 계속 읽힌다.
     · 교수 이름 뒤에 부가 정보를 붙이려면 구분자를 하나 둔다.
       구분자부터 뒤는 이름에서 잘려 나간다.
         쓸 수 있는 구분자 :  (   [   ·   ,   /   |   그리고 전각 형태
         "홍길동 (신규 강의)"  → 홍길동
       ('-'와 '.'은 구분자가 아니다. 'Kim Sung-ho', 'Prof. Kim'이 잘리므로.)

   ▣ 암호화하는 법 (모든 *_ENC 공통)
     평문 JSON을 파일로 저장한 뒤 동일한 비밀번호로 암호화해
     아래 해당 자리에 붙여 넣는다.
          python tools/encrypt_fragment.py toc.json --password <비밀번호>
     아직 암호화하지 않은 평문 JSON도 그대로 읽히므로(개발용),
     로컬에서 먼저 확인하고 배포 전에 암호화하면 된다.
   ============================================================ */

/* ▣ 사이트 문구
     title/highlight/eyebrow/tagline : 목차(index) 화면의 문구
     subject : 문항 페이지 상단의 작은 라벨(eyebrow) 기본값.
               예전엔 모든 ericu 파일마다 "근골격학"을 반복해 적었지만,
               이제 여기 한 곳만 적으면 된다.
               (특정 페이지만 다르게 하려면 그 페이지 pageMetaPayload에
                "eyebrow"를 적으면 그 값이 우선한다) */

window.SITE_ENC =
{
  "kdf": "PBKDF2",
  "hash": "SHA-256",
  "iterations": 600000,
  "cipher": "AES-GCM",
  "salt": "oktkMsdJHMjvarmKkoMkBQ==",
  "iv": "Nyz1EO1wmaxC8ci/",
  "data": "5IekwilgP0tpBZJgw1RB1UchChUiUR7a/pXE/o7dTnR6+fFXGJmJvJYigYbvIOuV0zG2/SFHeJKT1S60snU6dgcx4OHetk00U8PzPgFYDHp3Vqv1bW20NBCSsFOix59DCpLCtQs1OvBVm/EBgwz12iD5TVXyYSpT2vva6eIdHIgNx0v+GAzcm2SBEJTv6ln+XMr0a7XlaD40cz0+QfeqIOhu9AQkleBqQ7OFB6vgaZOUi/mb5Nw6tueLD+Izo0yrruRgb+dkbM6iluYp6aBUbgL65DHdIpP2x+oMk2t5X2UaA1EncRSyNKp4d+Vvi6mp1vWEQpyi5+tzHwBnUoEVLpfiutGluuKnG2tWSMCLmmoE1v6GtDCADJ0Mc9o4MPRn"
}
;

/* ▣ 강의 목록 — 번호 → [제목, 교수]  (단일 출처)
     교수 칸은 지금 비워 두었다. 채워 넣는 즉시 '교수별' 묶기가
     파일 스캔 없이 바로 동작한다. */

window.TOC_ENC =
{
  "kdf": "PBKDF2",
  "hash": "SHA-256",
  "iterations": 600000,
  "cipher": "AES-GCM",
  "salt": "oktkMsdJHMjvarmKkoMkBQ==",
  "iv": "FYF1tRGDzFf8Edx/",
  "data": "kQdt9c2FyKFU80tDW6jcOiGCbB87DCxRCMcxM5PG2SiIdxA2SoIIyX/knnIWNQqBUi1/RX0YBnvpUy99hGNs98SqJaHLGe3BxXu/qRSZr/3ENLQ6ASJG1gN/WE/60im9pKLGRtxDJUz7UiKtj9+8mogJLgU/VEt28mIZCy9ZkTvZFwlMXxpCbOysXnwNQGA895QHzyng5VXFZb/2XwesWlBos+lTxDqJkwRI6CvzStA4zCCQiSV3UR6Gg4Gp1EipEW8Reaos+WW/TOW6G+eL9ao72pajeOEbfyBhwxF9RRdwKcBN23JfKZtyYPhlSmviUL+pTMsFfZ0Fydo/jcSZrp/ftmtESTjFIlCxPAaaUQ8+gqfUIZ0dSJMGKZalyZ1eMtlCUcO/kqqYBkTNAza1u4EkHS3tBCBI0+r5meTmLP9iJm9cj2dKsZir72x7lYGRoScQdJKpjFCKkgfgzrQmY9UqMr7/2bofahLBmhYTCOBc33O77Bqo3w0ybL5fPsCCbCbloFjy3u4WAW0A7U41Vu5UAM97RJ+lm8sBEJVHliWN3acw+e642zRwvnZxDOL8gAjhALfO30uxzN3NrzHTeC6gDbR6oiQFsmWsJ++0WDQltRLdyB1BM8dFUcgyPrl2yYzFbsRIcoGESS6nkmEV8vlVKcjctkgPShvEA1V66xvZBOYBdxP+oQEmryFTJax004vLb05REXxusVrcsnldQ27awemYG8LvVgIDDHCQQZtoPrrLdqXcL0iMuCzk4opEed2O3Fc1lTGDauE8eS/jGGpu339jx/A3xSErGE2kk7J1+lY/zoCFOQUt"
}
;

/* ▣ 교수 한 줄 평 — 교수 이름 → 한 줄
     목차를 교수별로 묶으면 머리글에 이름과 함께 이 한 줄이 뜬다.

     · 한 줄 평은 '강의'가 아니라 '교수'에 붙는다. 강의가 5개여도 한 번만.
     · 키 = TOC_ENC에 적은 교수 이름(또는 subtitle에서 뽑힌 이름).
       '홍길동.'처럼 마침표가 붙어도 같은 규칙으로 맞춰 준다.
     · 안 적은 교수는 이름만 뜬다. 통째로 지워도 동작한다. */

window.PROF_NOTE_ENC =
{
  "kdf": "PBKDF2",
  "hash": "SHA-256",
  "iterations": 600000,
  "cipher": "AES-GCM",
  "salt": "oktkMsdJHMjvarmKkoMkBQ==",
  "iv": "FRJoo6poUdpCXhSu",
  "data": "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"
}
;

// 파일명 접두어 — index.html과 assets/question_set.js가 이 값을 읽는다.
// 파일명 규칙이 바뀌면 여기 한 곳만 고친다.

window.FILE_PREFIX = 'ericu';
