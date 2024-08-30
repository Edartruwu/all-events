-- CreateTable
CREATE TABLE "Events" (
    "id" TEXT NOT NULL,
    "eventName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "eventHref" TEXT NOT NULL,
    "creator" TEXT NOT NULL,
    "startingDate" TIMESTAMP(3) NOT NULL,
    "startingHour" TEXT NOT NULL,
    "CTA" TEXT,
    "videoId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Events_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Events_id_key" ON "Events"("id");
