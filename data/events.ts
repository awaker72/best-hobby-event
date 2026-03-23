export type EventType =
  | "sns"
  | "reservation"
  | "deadline"
  | "offline"
  | "live"
  | "announcement";

export type EventItem = {
  id: string;
  brand: string;
  title: string;
  type: EventType;
  startDate: string;
  endDate: string;
  summary: string;
  description: string;
  howToJoin: string;
  sourceUrl: string;
};

export const events: EventItem[] = [
  {
    id: "evt-001",
    brand: "megahouse",
    title: "메가하우스 공식몰 유튜브 라이브 쇼핑",
    type: "live",
    startDate: "2026-03-20",
    endDate: "2026-03-20",
    summary: "신규 상품과 추천 상품을 소개하는 라이브 쇼핑 이벤트",
    description: "메가하우스 공식몰에서 진행한 유튜브 라이브 쇼핑 이벤트입니다.",
    howToJoin: "원문 링크에서 라이브 공지를 확인하세요.",
    sourceUrl: "http://besthobby.kr/coding/sub1/sub2.asp?aseq=2052",
  },
  {
    id: "evt-002",
    brand: "goodsmile",
    title: "굿스마일스토어BH 미쿠위크 SNS 이벤트",
    type: "sns",
    startDate: "2026-03-04",
    endDate: "2026-03-10",
    summary: "미쿠위크 기념 SNS 참여 이벤트",
    description: "미쿠위크를 맞아 진행된 SNS 참여형 이벤트입니다.",
    howToJoin: "공식 SNS 안내에 따라 참여합니다.",
    sourceUrl: "http://besthobby.kr/coding/sub1/sub2.asp?aseq=2035",
  },
  {
    id: "evt-003",
    brand: "megahouse",
    title: "메가캣 프로젝트 SNS 팔로우 이벤트",
    type: "sns",
    startDate: "2026-03-16",
    endDate: "2026-03-24",
    summary: "SNS 팔로우 기반 참여 이벤트",
    description: "메가캣 프로젝트 관련 팔로우 참여 이벤트입니다.",
    howToJoin: "공식 SNS 계정을 팔로우하고 안내를 확인합니다.",
    sourceUrl: "http://besthobby.kr/coding/sub1/sub2.asp?aseq=2049",
  },
  {
    id: "evt-004",
    brand: "megahouse",
    title: "사이버 포뮬러 친구 태그 이벤트",
    type: "sns",
    startDate: "2026-03-13",
    endDate: "2026-03-21",
    summary: "친구 태그로 참여하는 SNS 이벤트",
    description: "사이버 포뮬러 관련 친구 태그 참여형 이벤트입니다.",
    howToJoin: "SNS 게시물에서 친구를 태그해 참여합니다.",
    sourceUrl: "http://besthobby.kr/coding/sub1/sub2.asp?aseq=2047",
  },
  {
    id: "evt-005",
    brand: "kotobukiya",
    title: "코토부키야 주문 마감 D-1 안내",
    type: "deadline",
    startDate: "2026-03-16",
    endDate: "2026-03-17",
    summary: "특정 상품 주문 마감 임박 안내",
    description: "코토부키야 상품 주문 마감을 알리는 안내 이벤트입니다.",
    howToJoin: "원문 링크에서 상품과 마감 시간을 확인하세요.",
    sourceUrl: "http://besthobby.kr/coding/sub1/sub2.asp?aseq=2048",
  },
  {
    id: "evt-006",
    brand: "goodsmile",
    title: "굿스마일컴퍼니 by BH X 키덜트쇼",
    type: "offline",
    startDate: "2026-03-11",
    endDate: "2026-03-11",
    summary: "오프라인 행사 연계 이벤트",
    description: "굿스마일컴퍼니와 BH가 함께한 키덜트쇼 관련 이벤트입니다.",
    howToJoin: "행사 일정과 참여 방법은 원문 공지에서 확인합니다.",
    sourceUrl: "http://besthobby.kr/coding/sub1/sub2.asp?aseq=2046",
  },
  {
    id: "evt-007",
    brand: "tspark",
    title: "T-SPARK by BH X 키덜트쇼",
    type: "offline",
    startDate: "2026-03-06",
    endDate: "2026-03-06",
    summary: "T-SPARK 브랜드 오프라인 연계 이벤트",
    description: "T-SPARK 브랜드와 BH가 함께한 키덜트쇼 이벤트입니다.",
    howToJoin: "행사 안내를 확인하고 현장에서 참여합니다.",
    sourceUrl: "http://besthobby.kr/coding/sub1/sub2.asp?aseq=2043",
  },
  {
    id: "evt-008",
    brand: "tspark",
    title: "T-SPARK BH 3월 예약 오픈 & 팔로우 이벤트",
    type: "reservation",
    startDate: "2026-03-06",
    endDate: "2026-03-31",
    summary: "3월 예약 오픈과 함께 진행되는 팔로우 이벤트",
    description: "T-SPARK 3월 예약 상품 안내와 SNS 팔로우 이벤트입니다.",
    howToJoin: "예약 공지를 확인하고 이벤트 참여 조건을 따릅니다.",
    sourceUrl: "http://besthobby.kr/coding/sub1/sub2.asp?aseq=2039",
  },
  {
    id: "evt-009",
    brand: "megahouse",
    title: "메가하우스 3월 신규 예약 상품 안내",
    type: "reservation",
    startDate: "2026-03-05",
    endDate: "2026-03-31",
    summary: "3월 신규 예약 상품 공개",
    description: "메가하우스 3월 신규 예약 상품에 대한 안내입니다.",
    howToJoin: "공식몰 예약 페이지와 공지사항을 확인합니다.",
    sourceUrl: "http://besthobby.kr/coding/sub1/sub2.asp?aseq=2036",
  },
  {
    id: "evt-010",
    brand: "kotobukiya",
    title: "코토부키야 유튜브 라이브 이벤트 당첨자 발표",
    type: "announcement",
    startDate: "2026-03-03",
    endDate: "2026-03-03",
    summary: "라이브 이벤트 당첨자 발표 공지",
    description: "코토부키야 공식몰 유튜브 라이브 이벤트 당첨자 발표입니다.",
    howToJoin: "당첨 여부는 원문 링크에서 확인합니다.",
    sourceUrl: "http://besthobby.kr/coding/sub1/sub2.asp?aseq=2032",
  },
  {
    id: "evt-011",
    brand: "goodsmile",
    title: "미쿠위크 당첨자 발표",
    type: "announcement",
    startDate: "2026-03-19",
    endDate: "2026-03-19",
    summary: "SNS 이벤트 당첨자 발표",
    description: "굿스마일스토어BH 미쿠위크 이벤트 당첨자 발표 공지입니다.",
    howToJoin: "원문 링크에서 당첨자 발표 내용을 확인합니다.",
    sourceUrl: "http://besthobby.kr/coding/sub1/sub2.asp?aseq=2051",
  },
  {
    id: "evt-012",
    brand: "goodsmile",
    title: "Best Hobby 서머 페스타 2025",
    type: "offline",
    startDate: "2025-08-22",
    endDate: "2025-08-24",
    summary: "베스트하비 브랜드 통합 오프라인 행사",
    description: "굿스마일컴퍼니, 코토부키야, 메가하우스, T-SPARK 신작 샘플 전시와 현장 판매가 함께하는 서머 페스타입니다.",
    howToJoin: "행사 일정과 장소를 확인한 뒤 현장에서 참여합니다.",
    sourceUrl: "http://besthobby.kr/coding/sub1/sub2.asp?aseq=1840",
  },
];
