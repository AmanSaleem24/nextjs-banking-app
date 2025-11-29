"use server";

import {
  ACHClass,
  CountryCode,
  TransferAuthorizationCreateRequest,
  TransferCreateRequest,
  TransferNetwork,
  TransferType,
} from "plaid";

import { plaidClient } from "../plaid";
import { parseStringify } from "../utils";

// Your updated Appwrite-table-based methods
import { getBanks, getBank } from "./user.actions";
import { getTransactionsByBankId } from "./transaction.actions";

// -------------------------------
// GET MULTIPLE ACCOUNTS
// -------------------------------

export const getAccounts = async ({ userId }: getAccountsProps) => {
  try {
    const banks = await getBanks({ userId }); // ← Already updated for Tables API

    const accounts = await Promise.all(
      banks?.map(async (bank: Bank) => {
        // Get account info from Plaid
        const accountsResponse = await plaidClient.accountsGet({
          access_token: bank.accessToken,
        });
        const accountData = accountsResponse.data.accounts[0];

        // Get institution metadata
        const institution = await getInstitution({
          institutionId: accountsResponse.data.item.institution_id!,
        });

        return {
          id: accountData.account_id,
          availableBalance: accountData.balances.available!,
          currentBalance: accountData.balances.current!,
          institutionId: institution.institution_id,
          name: accountData.name,
          officialName: accountData.official_name,
          mask: accountData.mask!,
          type: accountData.type as string,
          subtype: accountData.subtype! as string,
          appwriteItemId: bank.$id, // TABLE ROW ID
          shareableId: bank.shareableId,
        };
      })
    );

    const totalBanks = accounts.length;
    const totalCurrentBalance = accounts.reduce(
      (total, account) => total + account.currentBalance,
      0
    );

    return parseStringify({
      data: accounts,
      totalBanks,
      totalCurrentBalance,
    });
  } catch (error: any) {
    console.log("PLAID ERROR:", error.response?.data || error);
    throw error;
  }
};

// -------------------------------
// GET ONE ACCOUNT
// -------------------------------

export const getAccount = async ({ appwriteItemId }: getAccountProps) => {
  try {
    // Get bank row from Appwrite (updated)
    const bank = await getBank({ rowId: appwriteItemId });

    if (!bank) throw new Error("Bank not found");

    // Get Plaid account info
    const accountsResponse = await plaidClient.accountsGet({
      access_token: bank.accessToken,
    });

    const accountData = accountsResponse.data.accounts[0];

    // -------------------------------------
    // *COMMENTED CODE UPDATED FOR TABLES API*
    // -------------------------------------
  
    const transferTransactionsData = await getTransactionsByBankId({
      bankId: bank.$id,   // ← correct (table row id)
    });

    const transferTransactions = transferTransactionsData.rows.map(
      (transferData: Transaction) => ({
        id: transferData.$id,
        name: transferData.name!,
        amount: transferData.amount!,
        date: transferData.$createdAt,
        paymentChannel: transferData.channel,
        category: transferData.category,
        type:
          transferData.senderBankId === bank.$id ? "debit" : "credit",
      })
    );
 

    // Institution metadata
    const institution = await getInstitution({
      institutionId: accountsResponse.data.item.institution_id!,
    });

    // Normal Plaid transactions
    const transactions = await getTransactions({
      accessToken: bank.accessToken,
    });

    const account = {
      id: accountData.account_id,
      availableBalance: accountData.balances.available!,
      currentBalance: accountData.balances.current!,
      institutionId: institution.institution_id,
      name: accountData.name,
      officialName: accountData.official_name,
      mask: accountData.mask!,
      type: accountData.type as string,
      subtype: accountData.subtype! as string,
      appwriteItemId: bank.$id,
      shareableId: bank.shareableId,
    };

    // -------------------------------------
    // *COMMENTED: MERGE TRANSFERS + PLAID*
    // -------------------------------------
    
    const allTransactions = [...transactions, ...transferTransactions].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    

    return parseStringify({
      data: account,
      allTransactions, // change to allTransactions when enabling
    });
  } catch (error: any) {
    console.log("PLAID ERROR IN getAccount:");
    console.log(JSON.stringify(error.response?.data, null, 2));
    throw error;
  }
};

// -------------------------------
// GET BANK INSTITUTION
// -------------------------------

export const getInstitution = async ({
  institutionId,
}: getInstitutionProps) => {
  try {
    const institutionResponse = await plaidClient.institutionsGetById({
      institution_id: institutionId,
      country_codes: ["US"] as CountryCode[],
    });

    return parseStringify(institutionResponse.data.institution);
  } catch (error: any) {
    console.log("PLAID ERROR IN getAccount:");

    if (error.response) {
      console.log("STATUS:", error.response.status);
      console.log("DATA:", error.response.data);
    } else {
      console.log(error);
    }

    throw error;
  }
};

// -------------------------------
// GET TRANSACTIONS (PLAID SYNC)
// -------------------------------

export const getTransactions = async ({
  accessToken,
}: getTransactionsProps) => {
  let cursor: string | null = null;
  let hasMore = true;

  const allTransactions: any[] = [];

  try {
    while (hasMore) {
      const response = await plaidClient.transactionsSync({
        access_token: accessToken,
        cursor: cursor || undefined,
      });

      const { added, next_cursor, has_more } = response.data;

      added.forEach((t) => {
        allTransactions.push({
          id: t.transaction_id,
          name: t.name,
          paymentChannel: t.payment_channel,
          type: t.payment_channel,
          accountId: t.account_id,
          amount: t.amount,
          pending: t.pending,
          category: t.personal_finance_category?.primary || "Uncategorized",
          date: t.date,
          image: t.logo_url,
        });
      });

      cursor = next_cursor;
      hasMore = has_more;
    }

    return parseStringify(allTransactions);
  } catch (error: any) {
    console.log("PLAID ERROR IN getTransactions:");

    if (error.response) {
      console.log("STATUS:", error.response.status);
      console.log("DATA:", error.response.data); // <-- THIS prints the real Plaid error
    } else {
      console.log(error);
    }

    throw error;
  }
};
