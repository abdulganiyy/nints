/*
  Warnings:

  - You are about to alter the column `balance` on the `Account` table. The data in that column could be lost. The data in that column will be cast from `Decimal(19,4)` to `Decimal(18,2)`.
  - You are about to alter the column `amount` on the `LedgerEntry` table. The data in that column could be lost. The data in that column will be cast from `Decimal(19,4)` to `Decimal(18,2)`.
  - You are about to alter the column `balanceBefore` on the `LedgerEntry` table. The data in that column could be lost. The data in that column will be cast from `Decimal(19,4)` to `Decimal(18,2)`.
  - You are about to alter the column `balanceAfter` on the `LedgerEntry` table. The data in that column could be lost. The data in that column will be cast from `Decimal(19,4)` to `Decimal(18,2)`.
  - You are about to alter the column `amount` on the `Transaction` table. The data in that column could be lost. The data in that column will be cast from `Decimal(19,4)` to `Decimal(18,2)`.

*/
-- AlterTable
ALTER TABLE "Account" ALTER COLUMN "balance" SET DATA TYPE DECIMAL(18,2);

-- AlterTable
ALTER TABLE "LedgerEntry" ALTER COLUMN "amount" SET DATA TYPE DECIMAL(18,2),
ALTER COLUMN "balanceBefore" SET DATA TYPE DECIMAL(18,2),
ALTER COLUMN "balanceAfter" SET DATA TYPE DECIMAL(18,2);

-- AlterTable
ALTER TABLE "Transaction" ALTER COLUMN "amount" SET DATA TYPE DECIMAL(18,2);

-- AlterTable
ALTER TABLE "Wallet" ALTER COLUMN "balance" SET DEFAULT 0;
