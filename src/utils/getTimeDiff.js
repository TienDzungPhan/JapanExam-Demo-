export function getTimeDiff (targetTime) {
  const timeDiff = (new Date()).getTime() - targetTime
  if (timeDiff < 60*1000) {
    return 'Vừa xong'
  } else if (timeDiff > 60*1000 && timeDiff < 60*60*1000) {
    return `${Math.round(timeDiff / (60*1000))} phút trước`
  } else if (timeDiff > 60*60*1000 && timeDiff < 24*60*60*1000) {
    return `${Math.round(timeDiff / (60*60*1000))} giờ trước`
  } else {
    return `${Math.round(timeDiff / (24*60*60*1000))} ngày trước`
  }
}