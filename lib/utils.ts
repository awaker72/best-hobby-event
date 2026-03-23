export function formatDate(dateString: string) {
  return new Intl.DateTimeFormat("ko-KR", {
    month: "short",
    day: "numeric",
  }).format(new Date(dateString));
}

export function getEventStatus(startDate: string, endDate: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const start = new Date(startDate);
  start.setHours(0, 0, 0, 0);

  const end = new Date(endDate);
  end.setHours(0, 0, 0, 0);

  const diffDays = Math.floor((end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  if (start.getTime() === today.getTime()) return "today";
  if (today >= start && today <= end && diffDays <= 2) return "ending-soon";
  if (today >= start && today <= end) return "ongoing";
  if (today < start) return "upcoming";
  return "ended";
}

export function getStatusLabel(status: string) {
  switch (status) {
    case "today":
      return "오늘 시작";
    case "ending-soon":
      return "마감 임박";
    case "ongoing":
      return "진행 중";
    case "upcoming":
      return "예정";
    default:
      return "종료";
  }
}
