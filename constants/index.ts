export const sidebarLinks = [
  {
    imgURL: "/icons/home.svg",
    route: "/",
    label: "Home",
  },
  {
    imgURL: "/icons/dollar-circle.svg",
    route: "/my-banks",
    label: "My Banks",
  },
  {
    imgURL: "/icons/transaction.svg",
    route: "/transaction-history",
    label: "Transaction History",
  },
  {
    imgURL: "/icons/money-send.svg",
    route: "/payment-transfer",
    label: "Transfer Funds",
  },
];

// good_user / good_password - Bank of America
export const TEST_USER_ID = "6627ed3d00267aa6fa3e";

// custom_user -> Chase Bank
// export const TEST_ACCESS_TOKEN =
//   "access-sandbox-da44dac8-7d31-4f66-ab36-2238d63a3017";

// custom_user -> Chase Bank
export const TEST_ACCESS_TOKEN =
  "access-sandbox-229476cf-25bc-46d2-9ed5-fba9df7a5d63";

export const ITEMS = [
  {
    id: "6624c02e00367128945e", // appwrite item Id
    accessToken: "access-sandbox-83fd9200-0165-4ef8-afde-65744b9d1548",
    itemId: "VPMQJKG5vASvpX8B6JK3HmXkZlAyplhW3r9xm",
    userId: "6627ed3d00267aa6fa3e",
    accountId: "X7LMJkE5vnskJBxwPeXaUWDBxAyZXwi9DNEWJ",
  },
  {
    id: "6627f07b00348f242ea9", // appwrite item Id
    accessToken: "access-sandbox-74d49e15-fc3b-4d10-a5e7-be4ddae05b30",
    itemId: "Wv7P6vNXRXiMkoKWPzeZS9Zm5JGWdXulLRNBq",
    userId: "6627ed3d00267aa6fa3e",
    accountId: "x1GQb1lDrDHWX4BwkqQbI4qpQP1lL6tJ3VVo9",
  },
];

export const topCategoryStyles = {
  FOOD_AND_DRINK: {
    bg: "bg-blue-25",
    circleBg: "bg-blue-100",
    text: {
      main: "text-blue-900",
      count: "text-blue-700",
    },
    progress: {
      bg: "bg-blue-100",
      indicator: "bg-blue-700",
    },
    icon: "/icons/monitor.svg",
  },
  TRAVEL: {
    bg: "bg-success-25",
    circleBg: "bg-success-100",
    text: {
      main: "text-success-900",
      count: "text-success-700",
    },
    progress: {
      bg: "bg-success-100",
      indicator: "bg-success-700",
    },
    icon: "/icons/coins.svg",
  },
  default: {
    bg: "bg-pink-25",
    circleBg: "bg-pink-100",
    text: {
      main: "text-pink-900",
      count: "text-pink-700",
    },
    progress: {
      bg: "bg-pink-100",
      indicator: "bg-pink-700",
    },
    icon: "/icons/shopping-bag.svg",
  },
};

export const transactionCategoryStyles = {
  TRANSPORTATION: {
    borderColor: "border-blue-600",
    backgroundColor: "bg-blue-600",
    textColor: "text-blue-700",
    chipBackgroundColor: "bg-blue-100",
  },

  FOOD_AND_DRINK: {
    borderColor: "border-pink-600",
    backgroundColor: "bg-pink-600",
    textColor: "text-pink-700",
    chipBackgroundColor: "bg-pink-100",
  },

  TRAVEL: {
    borderColor: "border-indigo-600",
    backgroundColor: "bg-indigo-600",
    textColor: "text-indigo-700",
    chipBackgroundColor: "bg-indigo-100",
  },

  ENTERTAINMENT: {
    borderColor: "border-purple-600",
    backgroundColor: "bg-purple-600",
    textColor: "text-purple-700",
    chipBackgroundColor: "bg-purple-100",
  },

  TRANSFER_OUT: {
    borderColor: "border-orange-600",
    backgroundColor: "bg-orange-600",
    textColor: "text-orange-700",
    chipBackgroundColor: "bg-orange-100",
  },

  TRANSFER_IN: {
    borderColor: "border-orange-600",
    backgroundColor: "bg-orange-600",
    textColor: "text-orange-700",
    chipBackgroundColor: "bg-orange-100",
  },

  INCOME: {
    borderColor: "border-green-600",
    backgroundColor: "bg-green-600",
    textColor: "text-green-700",
    chipBackgroundColor: "bg-green-100",
  },

  LOAN_PAYMENT: {
    borderColor: "border-red-600",
    backgroundColor: "bg-red-600",
    textColor: "text-red-700",
    chipBackgroundColor: "bg-red-100",
  },

  BANK_FEES: {
    borderColor: "border-gray-600",
    backgroundColor: "bg-gray-600",
    textColor: "text-gray-700",
    chipBackgroundColor: "bg-gray-100",
  },

  SHOPPING: {
    borderColor: "border-yellow-600",
    backgroundColor: "bg-yellow-600",
    textColor: "text-yellow-700",
    chipBackgroundColor: "bg-yellow-100",
  },

  GROCERIES: {
    borderColor: "border-lime-600",
    backgroundColor: "bg-lime-600",
    textColor: "text-lime-700",
    chipBackgroundColor: "bg-lime-100",
  },

  HEALTHCARE: {
    borderColor: "border-rose-600",
    backgroundColor: "bg-rose-600",
    textColor: "text-rose-700",
    chipBackgroundColor: "bg-rose-100",
  },

  PERSONAL_CARE: {
    borderColor: "border-teal-600",
    backgroundColor: "bg-teal-600",
    textColor: "text-teal-700",
    chipBackgroundColor: "bg-teal-100",
  },

  EDUCATION: {
    borderColor: "border-violet-600",
    backgroundColor: "bg-violet-600",
    textColor: "text-violet-700",
    chipBackgroundColor: "bg-violet-100",
  },

  UTILITIES: {
    borderColor: "border-cyan-600",
    backgroundColor: "bg-cyan-600",
    textColor: "text-cyan-700",
    chipBackgroundColor: "bg-cyan-100",
  },
  Transfer: {
    borderColor: "border-red-700",
    backgroundColor: "bg-red-700",
    textColor: "text-red-700",
    chipBackgroundColor: "bg-inherit",
  },
  Processing: {
    borderColor: "border-[#F2F4F7]",
    backgroundColor: "bg-gray-500",
    textColor: "text-[#344054]",
    chipBackgroundColor: "bg-[#F2F4F7]",
  },
  Success: {
    borderColor: "border-[#12B76A]",
    backgroundColor: "bg-[#12B76A]",
    textColor: "text-[#027A48]",
    chipBackgroundColor: "bg-[#ECFDF3]",
  },

  OTHER: {
    borderColor: "border-gray-500",
    backgroundColor: "bg-gray-500",
    textColor: "text-gray-700",
    chipBackgroundColor: "bg-gray-100",
  },

  // Fallback
  default: {
    borderColor: "border-gray-400",
    backgroundColor: "bg-gray-300",
    textColor: "text-gray-700",
    chipBackgroundColor: "bg-gray-100",
  },
};
