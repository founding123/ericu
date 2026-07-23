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
  "iv": "1lfBSDBC4FL91UnT",
  "data": "dcvHt+BNd0/uK6ZA6NlsfGIxXgKUW7WUPmlZhmkaHdhBC4Cm/lJoc7PSCNsKY48WIjfxq4CDJZqlHm40TKwCaaVm603ee5ocMCIlhVNuJywv7rL9fUUu7QDvO3YGwqzAOZ1eOVLoXNuc2iSiY4F2WtnJZvAYXVS6hLh8luDeJq+fimn+aRhR2Cu56zEHvZlA3V2cVBN6DsFNCtwxY3KpWJxgwLcm8Z8y92shWVn20tW6BsOqDe3zoD6IJaRdkBMIiIKARcgWAkYX9efnOnuNqLOoEQyaa/IcaP8o3Xs+Ut3bhx9TYrjWvUgYskhlX/udBL9JiuaPWHS2oxHZFUBHr5QhDMFxKaUfd8HALkmLnxtMSL7gOtlID/1kqVYPNhtmtYxCVs2CH3mcapaYrJSsCH6UOzc77/3hfLgU+lmOWWMv3swUh/1OyJ+95CRNVlwS18HrtxkmPbiiVxUByyM0T8jgTtYKp3pYuiwlWvb7MKMekk/BUTJihZPQVlQuZhvYJttoD4weWOGM8UEo6W+wzbX30mMuEzj25qMrFxY3+NT9GGbyA9iGaxeyi8tE+D/c5Icuc0DNeiZ7hpmsdWixZ2K5LUGbo3dvzyGnFg3h+92/RgzQahfpBFSnYF4IYeJnBidYEcCAxGBgGiX7HkqZRuyEcViT87xOBXleC9ohKNvtntrspHTGswHoR9nUGgJZdiGxtYbwEug+4xkj2Lt6uJFYK+5jBAnL4cVbZ6NmX7VMAO2HJhQbFk08FRtwzEuRcdROuCygW13hpWFlrpNCbeYWb2avFIl7ZTJ7fLh9+2Rjfb30qwCbdiwfGssIvjv1RqUuL2vVKMJ/4djkDDiYraT+BkFd5K01ociAZgnnJPT1PCkAD3OO+EpF9DvD4JSIuAMGiqEBzo6ejw1fDU346RyFgLpFeyTLruMDhDdjB+94trJ7boPy817CZAf0VQVFre5kP0RBwP2mxX1BMZp4s7VNyPzWy4F0OrNoAHObKay07+BSr3rLCEfZ74z3ZiK4TKyUYqnD+Mt6PaKbAdsOzXbxaeOuOsKc51Ava6hQJFWMX0h/bJu0YB5tFW5HTzgYf2vt4LCgrdKdMHM1FAS+EK1T0XtffcUU6RjndKgbIJwlKIkPqrIsrOXJMYa7N0v9lUHYRo/hTNN4SxFWi3zZtR9kdpAMASG3XbgDaW+JC0CuhRfq9XhHJMnYZSGWHSrfeVLerTDyG2q7mSUM4LFmGx7mfzPfZcyHmyPlnjeL5qxC8Uko+joCVieiioYAxUJspK2yhBUaiaxUJ9GAQQnYp2nATFu5gbLrUSSqLijGLcQmRSLnHgUfIDgT/u4AGozho2zXWFm3tCwrZ4cHwVMJkaukw4Btd5EAcbB8+eBDE2pzsLZWHTJcZu87zJbpjmXxtAYmFTTI8DX5PANeHU6jfwkAfQWeqx/UBOnhFqdWtDJlLaBAHjjcw44s21IGrfJxtLHPtPbjkz0aK02HiLolnuFjLMmCyI5buwhre3H9wMBjN06FbioqhOxCh4r1XqVBLPwEihx2ASbYfdiCZaoIitjsbXB0mOL0c7JN7st5IUd7YsfsCpRnShqlGv+4wrRm1zMcIaHg7/IQQsVMwLMYHLhe9cMIfz8js/uMGBhLyagI8R6rCw5yKih5w2DUkcRYxCoBOeEtZhOI1sb1qpSnX0t8bYNoXJCc6LzNnUXlJBRIDPK3l8fYNtXRyVUIZ4jIkcCFPKxNgB8xd38UjFcH8bFy2biiKSOWt9GMeMFWJMQZW62Wuw8KFsb9ZuFXfAD6UDCLYxlvbW9ppXESxuMsLYAEWhacTLPwsCU8iFdB3ue/w48SoQExovDK5aLtSPJ03hm9VwaYU57tx6Fb20751uYmtAzW6Rrq8BGtlXcBvLmfQC6vNqVniYph6yweT310xnv+igo80yxbMYD/5MaGu//6YIV5qebI2x9gm/gCBfwekAeCQ256uHYSfGK7gbCR5ovGKs/9IFB5OLFpXbDXCKEXZHnCAFxqjAaAWtHgpU6A+jaWzebyaLdPX6Q3hvjAISFEVulVatuk2EiBMpNZnfHJ3RjSqbZSW1tWwFOaHTh9gkxih9lIRo19Q8vY+Gyi0x3Y7j2luVHzl3wZudayapb983k/1crVgj5ulDs8aVhOBmnlll7ZGKwuFZ6qVc8ssw28nlMB1Eg9lkCcZjKcbJV4clPUBWhRXxmC4bAep1FgKi8XrnkwJsRT062a7HN5yHySTFUHXHm5HriGf1ClAe7QiDoONsVWrAGQigrqm1/Yr/b6o9EsGRe5B3USNRxt+2yLxnTvm5hAvAa5KAfEEJ0MXK2V2vE4OcAZdK5KbF2jPLFwFiH3/c+r4JPm2flgVEmwuyzIHJw0Y56TkVZm06kdUOcLUnEgp5CSxUtSSwhYb/C24bIgGbbdD5X+wlxbOwjfwBQb32m/v4unV2Sv+zoxFmS7qvfdtJxfC5yd71Fvmag7/lVV4n4rGQH0/Q/KMK3/MAJ4H4JdgKGc7eYAgn9st1u072jmjeSWIvsbg9LqZ9V9HdbtscQfh0p5jCgBU/Dlk4dYLnfuZG8w2Levr4CP88BsPqR1jezD3SpLRMhSJ7+8SQfXbVRYBqetAnbU2Qu3UQ4msdthv2r7GPvV584i18EJ0z9VEcsqkcGlqa1o6YVcYIkjD2HbjbmmiSaUOtkPWGg2JznwkkqontkskJ+XDRzyDlE+TBxdGudKqIij0Q/NFx6C9b6pgzoOpD/bv6lzKHLVeKDzsgnfmG2aliKq8I1FDJU88u+i/FhRzc4XsJdPIiM7u5YxZaAIhT0qXMaOLhBhhJ1YS0yUEUsQdb/BuoPMFK1DpNqb7eN6y1IawUxTGxgKDwu4G2TiGfuhmDqe8pzSVN/suJL9kv2zBTfHcTwafWNOHbPulM0QPsUbo4wXivGAyGiPF0f/9opfGAaQyeLrbT0zDTjIXnpd2rMJ2uc/caojY0rasvaWM4zGc/iM0Yr2rTAwS1lc8WY8asKTrIcBUluG592SnQF51Pz+D7Yeql5G59zctiFvyipi5P9TkK3tFRi3EhDM4gjN+BDlMYv+1wqLjn1nM22VSQmuMf03/VLbZs9gQ0QjsPmxLeCAugdHf1+uwaXKmDArRHs7fhwluk9QJQ/0vw/ruCmPwJKkVSfh1IG4GzHdAXfeZ1+ViWN+cKPg/k6hQvwaGC2gF1FNyVCvMFHwnne4cn7g9MNqFwLfvsjiIbxiaZK4lpJtu8BQDl4BxLu0f/thjErEy0P5YYDgRT8bE31kJgcBXuaLbPmwYuMoaSqhzqcFA0yzLFFoJn4FWmQUg94n7CzIPZe2rf9X5EzOvqyVtWhTHTgfBuiH/GuKUtOMGr+TJsh8TFMUTuuZM67gFFB0dLcQ35NtySIxU7dwz8mxPuqxqO+n/CS1cNGc5lTmJ8Tt9gNnsAWwFzKZyY70kcyyPSrlz6kwbGbu7BLtXs5la4mcCo+7F2QVz2oECHZ6nQx37u14yDL8XkLnPXMDTEICcv7OJ4BAe8h+4Sxu0rcVu9x9dWa+6TPN/OJSaP7C1Djcf8B1++/Yy6r2FGdHrvmzlyMw6suMqn7dLklQlgRgvP+QRQ2bOV3UowM1hH4XWOFelvX/05PQmtQchlIv9cRaSoJK+4hYU1PG6scz6D29TDgqGkO4CmGE03cuL/qPM3X3U09PGHxKcby1cjzVQG/9kAqPkZJemBlSBN2QRNb3w9VIYLPhQxWM44Rg4SEN+2sUDJi13QwMoTUltwGCU4ph/pLqLwb8IvsqSNHpe9gzy9x5S89yDRUbWAbAH8u5Rkk3Bc9JowUMVdOEm/kYiNtqUHrcBm21KKso1ubb6NcmqUyVUM2dkc+OrwtlfQzj/LftS0fy8CPBkd+PmqrbMc1+pcu43Ilg"
}
;

// 파일명 접두어 — index.html과 assets/question_set.js가 이 값을 읽는다.
// 파일명 규칙이 바뀌면 여기 한 곳만 고친다.

window.FILE_PREFIX = 'ericu';
