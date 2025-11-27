/*
  Warnings:

  - You are about to drop the column `type` on the `user` table. All the data in the column will be lost.
  - Added the required column `role` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `type`,
    ADD COLUMN `role` ENUM('ADMIN', 'CUSTOMER') NOT NULL;
