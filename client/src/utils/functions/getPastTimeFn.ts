import {
  HOUR_IN_MS,
  DAY_IN_MS,
  MIN_IN_MS,
  SEC_IN_MS,
} from "@consts/time-units";

export const getPastTime = (date: number): string => {
  const dateNow = Date.now() - date;
  if (dateNow / DAY_IN_MS > 1) {
    return Math.trunc(dateNow / DAY_IN_MS) + " days ago";
  } else if (dateNow / HOUR_IN_MS > 1) {
    return Math.trunc(dateNow / HOUR_IN_MS) + " hours ago";
  } else if (dateNow / MIN_IN_MS > 1) {
    return Math.trunc(dateNow / MIN_IN_MS) + " min ago";
  }
  return Math.trunc(dateNow / SEC_IN_MS) + " sec ago";
};
