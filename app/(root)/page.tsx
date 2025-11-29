import HeaderBox from "@/components/HeaderBox";
import RecentTransactions from "@/components/RecentTransactions";
import RightSideBar from "@/components/RightSideBar";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import { getAccount, getAccounts } from "@/lib/actions/bank.action";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import React from "react";

const Home = async ({ searchParams }: SearchParamProps) => {
  const { id, page } = await searchParams; 

  const currentPage = Number(page as string) || 1

  const loggedIn = await getLoggedInUser();
  const accounts = await getAccounts({ userId: loggedIn.$id });

  if (!accounts || !accounts.data || accounts.data.length === 0) {
    return (
      <section className="home">
        <div className="home-content">
          <p>No accounts found. Please connect a bank.</p>
        </div>
      </section>
    );
  }

  const accountData = accounts.data;

  const appwriteItemId = (id as string) || accountData[0].appwriteItemId;

  const account = await getAccount({ appwriteItemId });
  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedIn?.firstName || "Guest"}
            subtext="Access and manage your account and transactions efficiently."
          />
        </header>
        <TotalBalanceBox
          accounts={accountData}
          totalBanks={accounts?.totalBanks}
          totalCurrentBalance={accounts?.totalCurrentBalance}
        />
        <RecentTransactions 
        accounts={accountData}
        transactions={account?.allTransactions}
        appwriteItemId = {appwriteItemId}
        page = {currentPage}
        />
      </div>
      <RightSideBar
        user={loggedIn}
        transactions={account?.allTransactions}
        banks={accountData.slice(0, 2)}
      />
    </section>
  );
};

export default Home;
