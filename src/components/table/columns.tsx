"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Events } from "@prisma/client";

export const columns: ColumnDef<Events>[] = [
  {
    accessorKey: "eventName",
    header: "Nombre del evento",
  },
  {
    accessorKey: "creator",
    header: "Organizador",
  },
  {
    accessorKey: "startingDate",
    header: "Fecha",
  },
  {
    accessorKey: "startingHour",
    header: "Hora",
  },
  {
    accessorKey: "place",
    header: "Lugar",
  },
];
