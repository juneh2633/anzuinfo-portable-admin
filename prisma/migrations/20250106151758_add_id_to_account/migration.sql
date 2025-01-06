/*
  Warnings:

  - You are about to drop the column `created_at` on the `playdata` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `account` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id` to the `account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdAt` to the `playdata` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "account" ADD COLUMN     "id" VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE "playdata" DROP COLUMN "created_at",
ADD COLUMN     "createdAt" TIMESTAMPTZ(6) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "account_id_key" ON "account"("id");
