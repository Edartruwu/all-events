"use server";

import { prisma } from "@/lib/prisma";

export async function GetEvents() {
  try {
    const events = await prisma.events.findMany();
    return events;
  } catch (error) {
    throw new Error(`${error}`);
  } finally {
    await prisma.$disconnect();
  }
}
