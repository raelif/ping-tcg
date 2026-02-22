/*
  Warnings:

  - The primary key for the `Deck` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `content` on the `Deck` table. All the data in the column will be lost.
  - You are about to drop the column `published` on the `Deck` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Deck` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Deck" DROP CONSTRAINT "Deck_pkey",
DROP COLUMN "content",
DROP COLUMN "published",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Deck_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Deck_id_seq";

-- CreateTable
CREATE TABLE "DeckCard" (
    "id" TEXT NOT NULL,
    "deckId" TEXT NOT NULL,
    "cardId" TEXT NOT NULL,
    "cardName" TEXT NOT NULL,
    "cardImage" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DeckCard_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DeckCard" ADD CONSTRAINT "DeckCard_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "Deck"("id") ON DELETE CASCADE ON UPDATE CASCADE;
