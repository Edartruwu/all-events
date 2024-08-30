import { format, isValid, parseISO } from "date-fns";
import { es } from "date-fns/locale/es";

export function ParseDate(initialDate: Date): string {
  const isoDateString = initialDate.toISOString();
  const parsedDate = parseISO(isoDateString);

  if (isValid(parsedDate)) {
    return format(parsedDate, "dd 'de' MMMM 'de' yyyy", { locale: es });
  }

  return ""; // Return an empty string if the date is invalid
}
