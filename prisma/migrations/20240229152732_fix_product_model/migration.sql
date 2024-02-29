-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_brand_id_fkey";

-- AlterTable
ALTER TABLE "product" ALTER COLUMN "brand_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "brand"("id") ON DELETE SET NULL ON UPDATE CASCADE;
