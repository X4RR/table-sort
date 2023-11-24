let now = new Date()
const oneDay = 1000 * 60 * 60 * 24;

export function formatDate(dates) {
    now = new Date()
    // TODO Какую из вложенных пар дат использовать?
    let start = Date.parse(dates[0].start_date);
    if (start > now) {
      let days = getDaysStarts(start)
      return [formatStart(days), start]
    }
    let end = Date.parse(dates[0].end_date);
    let days = getDaysEnds(end)
    return [formatEnd(days), end]
  }
  
  function getDaysStarts(timestamp) {
    let startsInMS = timestamp - now;
    let startsInDays = Math.round(startsInMS / oneDay) + 1;
    return startsInDays;
  }
  
  function formatStart(days) {
    switch (days) {
      case 0:
        return 'Начнётся сегодня';
      case 1:
        return 'Начнётся завтра';
      default:
        // TODO Просклонять дни
        return `Начнётся через ${days} дней`;
    }
  }
  
  function getDaysEnds(timestamp) {
    let endsInMS = timestamp - now;
    console.log(endsInMS)
    let endsInDays = Math.round(endsInMS / oneDay) + 1;
    console.log(endsInDays)
    return endsInDays;
  }
  
  function formatEnd(days) {
    // TODO Просклонять дни
    if (days < 0) {
      return `Закончилось ${-days} дней назад`;
    }
    if (days > 1) {
      return `Заканчивается через ${days} дней`;
    }
    if (days == 0) {
      return `Заканчивается сегодня`;
    }
    return `Закончится завтра`;
  }