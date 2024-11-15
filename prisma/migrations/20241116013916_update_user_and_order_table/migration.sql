/*
  Warnings:

  - Added the required column `quantity` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `houseNumberAndStreet` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postcode` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `streetAddress` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `townOrCity` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Order` ADD COLUMN `quantity` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `companyName` VARCHAR(191) NULL,
    ADD COLUMN `county` VARCHAR(191) NULL,
    ADD COLUMN `firstName` VARCHAR(191) NOT NULL,
    ADD COLUMN `flatSuiteUnit` VARCHAR(191) NULL,
    ADD COLUMN `houseNumberAndStreet` VARCHAR(191) NOT NULL,
    ADD COLUMN `lastName` VARCHAR(191) NOT NULL,
    ADD COLUMN `phone` VARCHAR(191) NOT NULL,
    ADD COLUMN `postcode` VARCHAR(191) NOT NULL,
    ADD COLUMN `streetAddress` VARCHAR(191) NOT NULL,
    ADD COLUMN `townOrCity` VARCHAR(191) NOT NULL;
