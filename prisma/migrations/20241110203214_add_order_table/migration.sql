/*
  Warnings:

  - Added the required column `artWork` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cableTies` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currency` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eyelets` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hemming` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `packaging` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `polePockets` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productName` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Order` ADD COLUMN `artWork` VARCHAR(191) NOT NULL,
    ADD COLUMN `cableTies` VARCHAR(191) NOT NULL,
    ADD COLUMN `currency` VARCHAR(191) NOT NULL,
    ADD COLUMN `eyelets` VARCHAR(191) NOT NULL,
    ADD COLUMN `hemming` VARCHAR(191) NOT NULL,
    ADD COLUMN `packaging` VARCHAR(191) NOT NULL,
    ADD COLUMN `polePockets` VARCHAR(191) NOT NULL,
    ADD COLUMN `productName` VARCHAR(191) NOT NULL,
    ADD COLUMN `size` VARCHAR(191) NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    MODIFY `status` VARCHAR(191) NOT NULL DEFAULT 'pending';
