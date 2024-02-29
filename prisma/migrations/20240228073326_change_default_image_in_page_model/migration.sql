-- AlterTable
ALTER TABLE "page" ALTER COLUMN "images" SET DEFAULT ARRAY['https://ethereal-menu.s3.us-east-2.amazonaws.com/page/60e939e4-530e-4c7a-9226-c874aadac0a7.avif', 'https://ethereal-menu.s3.us-east-2.amazonaws.com/page/f84d78fc-21b8-44e0-8081-ac1785c77a69.jpeg']::TEXT[];
