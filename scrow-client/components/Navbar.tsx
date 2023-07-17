import { useAuthRequestChallengeEvm } from "@moralisweb3/next";
import { signIn, useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { useAccount, useConnect, useSignMessage } from "wagmi";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { PiPlugsConnectedBold } from "react-icons/pi";
import { RxReload } from "react-icons/rx";
import { Button } from "../@/components/ui/button";

export const Navbar = () => {
  const { connectAsync, isLoading, connect } = useConnect();
  const { address, isConnected } = useAccount();
  const { requestChallengeAsync } = useAuthRequestChallengeEvm();
  const { signMessageAsync } = useSignMessage();
  const { status } = useSession();

  const connectWallet = async () => {
    const { account, chain } = await connectAsync({
      connector: new MetaMaskConnector(),
    });
    const { message } = (await requestChallengeAsync({
      address: account,
      chainId: chain.id,
    }))!;

    const signature = await signMessageAsync({ message });
    await signIn("moralis-auth", { message, signature, redirect: false });
  };

  useEffect(() => {
    if (status === "authenticated") {
      connect({ connector: new MetaMaskConnector() });
    }
  }, [status]);

  return (
    <nav className="flex justify-around sticky top-0 py-2 text-gray-300 backdrop-blur-[2px]">
      <span className="text-xl font-semibold">ScrowApp</span>
      <>
        {isConnected && address ? (
          <div className="flex items-center justify-between gap-2 px-2 rounded-full text-sm">
            <span>{`${address.slice(0, 10)}...${address.slice(-6)}`}</span>
            <PiPlugsConnectedBold size={24} className="text-green-500" />
          </div>
        ) : (
          <Button
            className="flex gap-2 items-center bg-green-400 px-2 rounded-md text-gray-900"
            onClick={connectWallet}
            disabled={isLoading}
          >
            {isLoading && <RxReload className="animate-spin" />}
            Connect
          </Button>
        )}
      </>
    </nav>
  );
};
