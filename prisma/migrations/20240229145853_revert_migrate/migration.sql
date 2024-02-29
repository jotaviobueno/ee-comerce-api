/*
  Warnings:

  - You are about to drop the column `name` on the `page` table. All the data in the column will be lost.
  - You are about to drop the `section` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `section_type` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `title` to the `page` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `page` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "section" DROP CONSTRAINT "section_page_id_fkey";

-- DropForeignKey
ALTER TABLE "section" DROP CONSTRAINT "section_section_type_id_fkey";

-- AlterTable
ALTER TABLE "page" DROP COLUMN "name",
ADD COLUMN     "title" TEXT NOT NULL,
ALTER COLUMN "description" SET NOT NULL;

-- DropTable
DROP TABLE "section";

-- DropTable
DROP TABLE "section_type";
