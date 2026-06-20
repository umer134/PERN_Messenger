type DateFormat =
  | "time"
  | "date"
  | "datetime"
  | "dateMonth"
  | "full"
  | "smart";

type FormatDateOptions = {
  locale?: string;
  format?: DateFormat;
  showYear?: boolean;
};

const DEFAULT_LOCALE = "ru-RU";

export function formatDate(
  input: string | number | Date,
  options: FormatDateOptions = {}
) {
  const {
    locale = DEFAULT_LOCALE,
    format = "datetime",
    showYear = true,
  } = options;

  const date = new Date(input);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const now = new Date();

  const isToday =
    date.toDateString() === now.toDateString();

  const isYesterday =
    new Date(now.getTime() - 86400000).toDateString() ===
    date.toDateString();

  const timeFormatter = new Intl.DateTimeFormat(locale, {
    hour: "2-digit",
    minute: "2-digit",
  });

  const dateFormatter = new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "2-digit",
    year: showYear ? "numeric" : undefined,
  });

  const monthNameFormatter = new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "long",
    year: showYear ? "numeric" : undefined,
  });

  const dateTimeFormatter = new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "2-digit",
    year: showYear ? "numeric" : undefined,
    hour: "2-digit",
    minute: "2-digit",
  });

  switch (format) {
    case "time":
      return timeFormatter.format(date);

    case "date":
      return dateFormatter.format(date);

    case "dateMonth":
      return monthNameFormatter.format(date);

    case "datetime":
      return dateTimeFormatter.format(date);

    case "smart":
      if (isToday) {
        return `Сегодня ${timeFormatter.format(date)}`;
      }

      if (isYesterday) {
        return `Вчера ${timeFormatter.format(date)}`;
      }

      return dateFormatter.format(date);

    default:
      return dateTimeFormatter.format(date);
  }
}