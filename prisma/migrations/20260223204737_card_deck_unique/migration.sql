/*
  Warnings:

  - A unique constraint covering the columns `[deckId,cardId]` on the table `DeckCard` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cardType` to the `DeckCard` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DeckCard" ADD COLUMN     "cardType" TEXT NOT NULL,
ALTER COLUMN "cardImage" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "DeckCard_deckId_cardId_key" ON "DeckCard"("deckId", "cardId");
