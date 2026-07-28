-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('PENDING_VERIFICATION', 'ACTIVE', 'SUSPENDED', 'BLOCKED', 'DELETED');

-- CreateEnum
CREATE TYPE "WalletStatus" AS ENUM ('ACTIVE', 'FROZEN', 'CLOSED');

-- CreateEnum
CREATE TYPE "VirtualAccountStatus" AS ENUM ('PENDING', 'ACTIVE', 'INACTIVE', 'CLOSED');

-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('NGN', 'USD');

-- CreateEnum
CREATE TYPE "VirtualAccountProvider" AS ENUM ('PAYSTACK', 'MONNIFY', 'FLUTTERWAVE', 'SAFE_HAVEN');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "phoneVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "pin" TEXT,
ADD COLUMN     "status" "UserStatus" NOT NULL DEFAULT 'PENDING_VERIFICATION';

-- CreateTable
CREATE TABLE "Wallet" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "balance" DECIMAL(18,2) NOT NULL,
    "currency" "Currency" NOT NULL DEFAULT 'NGN',
    "status" "WalletStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Wallet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VirtualAccount" (
    "id" TEXT NOT NULL,
    "walletId" TEXT NOT NULL,
    "provider" "VirtualAccountProvider" NOT NULL,
    "bankName" TEXT NOT NULL,
    "accountNumber" TEXT NOT NULL,
    "accountName" TEXT NOT NULL,
    "status" "VirtualAccountStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VirtualAccount_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Wallet_userId_key" ON "Wallet"("userId");

-- CreateIndex
CREATE INDEX "Wallet_userId_idx" ON "Wallet"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "VirtualAccount_walletId_key" ON "VirtualAccount"("walletId");

-- CreateIndex
CREATE UNIQUE INDEX "VirtualAccount_accountNumber_key" ON "VirtualAccount"("accountNumber");

-- CreateIndex
CREATE INDEX "VirtualAccount_walletId_idx" ON "VirtualAccount"("walletId");

-- CreateIndex
CREATE INDEX "VirtualAccount_provider_idx" ON "VirtualAccount"("provider");

-- CreateIndex
CREATE INDEX "VirtualAccount_accountNumber_idx" ON "VirtualAccount"("accountNumber");

-- AddForeignKey
ALTER TABLE "Wallet" ADD CONSTRAINT "Wallet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VirtualAccount" ADD CONSTRAINT "VirtualAccount_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "Wallet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
