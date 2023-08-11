## typescript + react + 페이저3 공부

### 구현한 기능들 - 나중에 이거 참고하면서 개발
- scene 추가
    - gameover
    - gameclear
    - playing
    - boot(여기서 모든 에셋들 로드)
    - statscene(시작 화면)
- scene 이동
- camera 이동
- sprite 생성
- sprite 삭제
- sprite 이동
    - player 이동
    - monster 이동
- 애니메이션 (player, 무기, 몬스터, effect)
- 소리 추가
- 투사체 무기
- 근접 무기
    - 근접 타격 이후 몬스터 또한 무적 시간이 존재(매커니즘이 근접 타격 애니메이션 시간동안 데미지가 들어가 버리기 때문), 투사체는 무적 시간 없음
- 플레이어 체력, 몬스터 체력
- 타이머
- 플레이어 체력바
- 점수 및 레벨, 경험치 표시 상단바
- 아이템 획득, 경험치 획득
- 게임 일시 정지
- 게임 재귀

### [배포](https://64d5f35454f36840b8ce54c1--chic-lollipop-496dd1.netlify.app/)
- 7 레벨되면 보스가 나오고 보스잡으면 게임 클리어됩니다.