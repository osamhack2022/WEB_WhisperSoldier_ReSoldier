export default function CalTagCount(tag_count) {
  if (tag_count >= 10000) {
    return "10000+";
  } else if (tag_count >= 5000) {
    return "5000+";
  } else if (tag_count >= 1000) {
    return "1000+";
  } else if (tag_count >= 500) {
    return "500+";
  } else if (tag_count >= 100) {
    return "100+";
  } else if (tag_count >= 50) {
    return "50+";
  } else if (tag_count >= 10) {
    return "10+";
  } else {
    return "1+";
  }
}
