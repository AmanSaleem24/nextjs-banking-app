// import Dwolla from "dwolla-v2";

// console.log("DWOLLA IMPORT:", Dwolla);

// const getEnvironment = (): "production" | "sandbox" => {
//   const environment = process.env.DWOLLA_ENV as string;

//   switch (environment) {
//     case "sandbox":
//       return "sandbox";
//     case "production":
//       return "production";
//     default:
//       throw new Error(
//         "Dwolla environment should either be set to `sandbox` or `production`"
//       );
//   }
// };

// export const dwollaClient = new Dwolla.Client({
//   environment: getEnvironment(),
//   key: process.env.DWOLLA_KEY!,
//   secret: process.env.DWOLLA_SECRET!,
// });
// import { Dwolla } from "dwolla";

// export const dwollaClient = new Dwolla({
//   key: process.env.DWOLLA_KEY!,
//   secret: process.env.DWOLLA_SECRET!,
//   environment: process.env.DWOLLA_ENV === "production" ? "production" : "sandbox",
// });
