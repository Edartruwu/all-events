"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Events } from "@prisma/client";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { format, isValid, parseISO } from "date-fns";
import { es } from "date-fns/locale/es";

export function parseDate(initialDate: Date): string {
  const isoDateString = initialDate.toISOString();
  const parsedDate = parseISO(isoDateString);

  if (isValid(parsedDate)) {
    return format(parsedDate, "dd 'de' MMMM 'de' yyyy", { locale: es });
  }

  return ""; // Return an empty string if the date is invalid
}

export const columns: ColumnDef<Events>[] = [
  {
    accessorKey: "eventName",
    header: "Evento:",
  },
  {
    accessorKey: "creator",
    header: "Organizador:",
  },
  {
    accessorKey: "startingDate",
    header: "Fecha:",
    cell: ({ row }) => <p>{parseDate(row.original.startingDate)}</p>,
  },
  {
    accessorKey: "startingHour",
    header: "Hora:",
  },
  {
    accessorKey: "place",
    header: "Lugar:",
    cell: ({ row }) => (
      <Link
        className={(buttonVariants({ variant: "link" }), "p-0")}
        href={`${row.original.place}`}
      >
        Lugar
      </Link>
    ),
  },
  {
    accessorKey: "id",
    header: "Ver Evento:",
    cell: ({ row }) => (
      <Link
        className={(buttonVariants({ variant: "link" }), "p-0")}
        href={`/events/${row.original.id}`}
      >
        Ver Evento
      </Link>
    ),
  },
];
