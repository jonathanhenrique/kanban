/*
  Warnings:

  - Added the required column `order` to the `SubTask` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Task_order_key";

-- AlterTable
ALTER TABLE "SubTask" ADD COLUMN     "order" INTEGER NOT NULL;
