"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Events } from "@prisma/client";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { ParseDate } from "@/lib/dates";

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
    cell: ({ row }) => <p>{ParseDate(row.original.startingDate)}</p>,
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
