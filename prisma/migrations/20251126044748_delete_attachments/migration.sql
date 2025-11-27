/*
  Warnings:

  - You are about to drop the column `addressText` on the `point` table. All the data in the column will be lost.
  - You are about to drop the `attachment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `attachment` DROP FOREIGN KEY `Attachment_ratingId_fkey`;

-- AlterTable
ALTER TABLE `point` DROP COLUMN `addressText`,
    ADD COLUMN `type` ENUM('POSITIVE', 'NEGATIVE') NULL;

-- AlterTable
ALTER TABLE `rating` ADD COLUMN `fileUrl` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `attachment`;
