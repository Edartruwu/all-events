"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface EventData {
  eventName: string;
  description: string;
  eventHref: string;
  creator: string;
  startingDate: Date;
  startingHour: string;
  CTA?: string;
  videoId?: string;
  place: string;
}

export async function CreateNewEvent(data: EventData) {
  try {
    await prisma.events.create({
      data: {
        place: data.place,
        eventName: data.eventName,
        description: data.description,
        eventHref: data.eventHref,
        creator: data.creator,
        startingDate: new Date(data.startingDate),
        startingHour: data.startingHour,
        CTA: data.CTA,
        videoId: data.videoId,
        createdAt: new Date(),
      },
    });
  } catch (error) {
    throw new Error(`${error}`);
  } finally {
    await revalidatePath("/", "layout");
    await prisma.$disconnect();
  }
}
