/*
  Warnings:

  - Added the required column `place` to the `Events` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Events" ADD COLUMN     "place" TEXT NOT NULL;
