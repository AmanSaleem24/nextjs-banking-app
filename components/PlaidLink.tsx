import React, { useCallback, useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  PlaidLinkOnSuccess,
  PlaidLinkOptions,
  usePlaidLink,
} from "react-plaid-link";
import { StyledString } from "next/dist/build/swc/types";
import { useRouter } from "next/navigation";
import {
  createLinkToken,
  exchangePublicToken,
} from "@/lib/actions/user.actions";
import Image from "next/image";

const PlaidLink = ({ user, variant }: PlaidLinkProps) => {
  const router = useRouter();
  const [token, setToken] = useState("");

  const onSuccess = useCallback<PlaidLinkOnSuccess>(
    async (public_token: string) => {
      await exchangePublicToken({
        publicToken: public_token,
        user,
      });
      router.push("/");
    },
    [user]
  );

  useEffect(() => {
    const getLinkToken = async () => {
      const data = await createLinkToken(user);
      setToken(data?.linkToken);
    };
    getLinkToken();
  }, [user]);

  const config: PlaidLinkOptions = {
    token,
    onSuccess,
  };

  const { open, ready } = usePlaidLink(config);
  return (
    <>
      {variant === "primary" ? (
        <Button
          className="plaidlink-primary"
          onClick={() => open()}
          disabled={!ready}
        >
          Connect bank
        </Button>
      ) : variant === "ghost" ? (
        <Button className="plaidlink-ghost">
          <Image
            src="/icons/connect-bank.svg"
            alt="connect bank"
            height={24}
            width={24}
          />
          <p className="hidden text-16 font-semibold text-black-2 xl:block">Connect Bank</p>
        </Button>
      ) : (
        <Button onClick={() => open()} className="pl-[11px] plaidlink-default">
          <Image
            src="/icons/connect-bank.svg"
            alt="connect bank"
            height={24}
            width={24}
          />
          <p className="text-16 font-semibold text-black-2">Connect Bank</p>
        </Button>
      )}
    </>
  );
};

export default PlaidLink;
