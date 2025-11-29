"use server";

import { Client } from "dwolla-v2";

const getEnvironment = (): "production" | "sandbox" => {
  const environment = process.env.DWOLLA_ENV as string;

  switch (environment) {
    case "sandbox":
      return "sandbox";
    case "production":
      return "production";
    default:
      throw new Error(
        "Dwolla environment should either be set to `sandbox` or `production`"
      );
  }
};

console.log("Dwolla Config Check:", {
  env: process.env.DWOLLA_ENV,
  keyExists: !!process.env.DWOLLA_KEY,
  secretExists: !!process.env.DWOLLA_SECRET,
  keyPrefix: process.env.DWOLLA_KEY?.substring(0, 8) + "...",
});

const dwollaClient = new Client({
  environment: getEnvironment(),
  key: process.env.DWOLLA_KEY as string,
  secret: process.env.DWOLLA_SECRET as string,
});

// Create a Dwolla Funding Source using a Plaid Processor Token
export const createFundingSource = async (
  options: CreateFundingSourceOptions
) => {
  try {
    return await dwollaClient
      .post(`customers/${options.customerId}/funding-sources`, {
        name: options.fundingSourceName,
        plaidToken: options.plaidToken,
      })
      .then((res) => res.headers.get("location"));
  } catch (err) {
    console.error("Creating a Funding Source Failed: ", err);
  }
};

export const createOnDemandAuthorization = async () => {
  try {
    const onDemandAuthorization = await dwollaClient.post(
      "on-demand-authorizations"
    );
    const authLink = onDemandAuthorization.body._links;
    return authLink;
  } catch (err) {
    console.error("Creating an On Demand Authorization Failed: ", err);
  }
};

export const createDwollaCustomer = async (
  newCustomer: NewDwollaCustomerParams
) => {
  try {
    return await dwollaClient
      .post("customers", newCustomer)
      .then((res) => res.headers.get("location"));
  } catch (err) {
    console.error("Creating a Dwolla Customer Failed: ", err);
  }
};

export const createTransfer = async ({
  sourceFundingSourceUrl,
  destinationFundingSourceUrl,
  amount,
}: TransferParams) => {
  try {
    const requestBody = {
      _links: {
        source: {
          href: sourceFundingSourceUrl,
        },
        destination: {
          href: destinationFundingSourceUrl,
        },
      },
      amount: {
        currency: "USD",
        value: amount,
      },
    };

    const response = await dwollaClient.post("transfers", requestBody);
    return response.headers.get("location");
  } catch (err: any) {
    console.error("Transfer failed:", err.message);
    throw err;
  }
};

export const addFundingSource = async ({
  dwollaCustomerId,
  processorToken,
  bankName,
}: AddFundingSourceParams) => {
  try {
    // create dwolla auth link
    const dwollaAuthLinks = await createOnDemandAuthorization();

    // add funding source to the dwolla customer & get the funding source url
    const fundingSourceOptions = {
      customerId: dwollaCustomerId,
      fundingSourceName: bankName,
      plaidToken: processorToken,
      _links: dwollaAuthLinks,
    };
    return await createFundingSource(fundingSourceOptions);
  } catch (err) {
    console.error("Transfer fund failed: ", err);
  }
};
export const testDwollaConnection = async () => {
  try {
    const root = await dwollaClient.get("/");
    console.log("Dwolla connection successful:", root.body);
    return { success: true };
  } catch (err: any) {
    console.error("Dwolla connection failed:", err);
    return { success: false, error: err.message };
  }
};
export const verifyFundingSource = async (fundingSourceUrl: string) => {
  try {
    const fundingSource = await dwollaClient.get(fundingSourceUrl);
    console.log("Funding Source:", {
      url: fundingSourceUrl,
      status: fundingSource.body.status,
      type: fundingSource.body.type,
      name: fundingSource.body.name,
    });
    return fundingSource.body;
  } catch (err: any) {
    console.error("Invalid funding source:", fundingSourceUrl);
    console.error("Error:", err.message);
    return null;
  }
};
