"use server";
import { ID, Query } from "node-appwrite";
import { createAdminClient } from "../server/appwrite";
import { parseStringify } from "../utils";

export const createTransaction = async (
  transaction: CreateTransactionProps
) => {
  try {
    const { tables } = await createAdminClient();

    const newTransaction = await tables.createRow({
      databaseId: process.env.APPWRITE_DATABASE_ID!,
      tableId: process.env.APPWRITE_TRANSACTION_COLLECTION_ID!,
      rowId: ID.unique(),
      data: {
        channel: "online",
        category: "transfer",
        ...transaction,
      },
    });

    return parseStringify(newTransaction);
  } catch (error) {
    console.log(error);
  }
};

export const getTransactionsByBankId = async ({ bankId }: getTransactionsByBankIdProps) => {
  try {
    const { tables } = await createAdminClient();

    const senderTransactions = await tables.listRows({
      databaseId: process.env.APPWRITE_DATABASE_ID!,
      tableId: process.env.APPWRITE_TRANSACTION_COLLECTION_ID!,
      queries: [Query.equal("senderBankId", bankId)],
    });

    const receiverTransactions = await tables.listRows({
      databaseId: process.env.APPWRITE_DATABASE_ID!,
      tableId: process.env.APPWRITE_TRANSACTION_COLLECTION_ID!,
      queries: [Query.equal("receiverBankId", bankId)],
    });

    const transactions = {
      total: senderTransactions.total + receiverTransactions.total,
      rows: [
        ...senderTransactions.rows,
        ...receiverTransactions.rows,
      ],
    };

    return parseStringify(transactions);
  } catch (error) {
    console.log(error);
  }
};

