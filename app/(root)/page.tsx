import HeaderBox from "@/components/HeaderBox";
import RightSideBar from "@/components/RightSideBar";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import React from "react";

const Home = () => {
  const loggedIn = {firstName: "Aman", lastName:"", email:"aman@gmail.com"}
  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user="Aman"
            subtext="Access and manage your account and transactions efficiently."
          />
        </header>
        <TotalBalanceBox 
        accounts={[]}
        totalBanks={1}
        totalCurrentBalance={1293.2}
        />

        RECENT TRANSACTIONS
      </div>
      <RightSideBar 
      user={loggedIn}
      transactions={[]}
      banks={[{currentBalance:1234}, {currentBalance:1221}]}
      />
    </section>
  );
};

export default Home;
