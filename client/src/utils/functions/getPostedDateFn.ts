import { DAY_IN_MS } from "@consts/time-units";

export const getPostedDate = (createdAt: Date) => {
  const date = new Date(createdAt);
  const dateNow = Date.now() - date.getTime();
  if (dateNow / DAY_IN_MS > 1) {
    let day: string | number = date.getDate();
    let month: string | number = date.getMonth();
    day = day < 10 ? "0" + day : day;
    month = month < 10 ? "0" + month : month;
    return day + "/" + month;
  } else {
    return date.getHours() + ":" + date.getMinutes();
  }
};
