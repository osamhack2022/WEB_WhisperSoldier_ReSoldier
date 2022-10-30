export default function calTimeToString(timeStamp) {
  if (!timeStamp) {
    return "방금전";
  }
  const value = new Date() - timeStamp.toDate();
  if (Math.floor(value / (1000 * 60)) < 5) {
    return "방금전";
  } else if (Math.floor(value / (1000 * 60 * 60)) < 1) {
    const returnValue = Math.floor(value / (1000 * 60));
    return `${returnValue}분전`;
  } else if (Math.floor(value / (1000 * 60 * 60)) < 24) {
    const returnValue = Math.floor(value / (1000 * 60 * 60));
    return `${returnValue}시간 전`;
  } else if (Math.floor(value / (1000 * 60 * 60)) < 720) {
    const returnValue = Math.floor(value / (1000 * 60 * 60 * 24));
    return `${returnValue}일 전`;
  } else if (Math.floor(value / (1000 * 60 * 60)) < 8440) {
    const returnValue = Math.floor(value / (1000 * 60 * 60 * 24 * 30));
    return `${returnValue}달 전`;
  } else {
    return "오래 전";
  }
}

export function calTimeToDateString(timeStamp) {
  const value = new Date() - timeStamp;

  return Math.floor(value / (1000 * 60 * 60 * 24));
}
