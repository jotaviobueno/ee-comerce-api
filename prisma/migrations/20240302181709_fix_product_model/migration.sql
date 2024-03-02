/*
  Warnings:

  - You are about to drop the column `sku_id` on the `order_item` table. All the data in the column will be lost.
  - You are about to drop the `sku` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `color_id` to the `product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cost` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "order_item" DROP CONSTRAINT "order_item_sku_id_fkey";

-- DropForeignKey
ALTER TABLE "sku" DROP CONSTRAINT "sku_color_id_fkey";

-- DropForeignKey
ALTER TABLE "sku" DROP CONSTRAINT "sku_product_id_fkey";

-- AlterTable
ALTER TABLE "order_item" DROP COLUMN "sku_id";

-- AlterTable
ALTER TABLE "product" ADD COLUMN     "color_id" TEXT NOT NULL,
ADD COLUMN     "cost" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "ean" TEXT,
ADD COLUMN     "height" TEXT,
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "length" TEXT,
ADD COLUMN     "parent_id" TEXT,
ADD COLUMN     "size" TEXT,
ADD COLUMN     "stock" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "upc" TEXT,
ADD COLUMN     "weight" TEXT,
ADD COLUMN     "width" TEXT;

-- DropTable
DROP TABLE "sku";

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_color_id_fkey" FOREIGN KEY ("color_id") REFERENCES "color"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
