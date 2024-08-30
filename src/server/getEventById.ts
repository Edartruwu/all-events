"use server";

import { prisma } from "@/lib/prisma";

export async function GetEventById(id: string) {
  try {
    const events = await prisma.events.findUnique({
      where: { id: id },
    });
    return events;
  } catch (error) {
    throw new Error(`${error}`);
  } finally {
    await prisma.$disconnect();
  }
}
