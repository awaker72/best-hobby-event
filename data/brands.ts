export type Brand = {
  id: string;
  name: string;
  description: string;
};

export const brands: Brand[] = [
  {
    id: "goodsmile",
    name: "굿스마일컴퍼니",
    description: "넨도로이드와 다양한 캐릭터 상품 이벤트",
  },
  {
    id: "kotobukiya",
    name: "코토부키야",
    description: "프라모델과 캐릭터 상품 예약/행사 소식",
  },
  {
    id: "megahouse",
    name: "메가하우스",
    description: "피규어, 라이브, SNS 이벤트 소식",
  },
  {
    id: "tspark",
    name: "T-SPARK",
    description: "콜라보 상품과 신작 출시 이벤트",
  },
];
