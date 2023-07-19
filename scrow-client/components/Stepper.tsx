import React, { useEffect, useMemo, useState } from "react";
import { Button } from "../@/components/ui/button";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { useStepper } from "../hooks/useStepper";
import { Input } from "../@/components/ui/input";
import Escrow from "../artifacts/contracts/Escrow.sol/Scrow.json";
import { useChainId, useWaitForTransaction, useWalletClient } from "wagmi";
import { Hex, TransactionReceipt, parseEther } from "viem";
import { BiLoaderCircle } from "react-icons/bi";

const steps = ["beneficer", "Price", "arbiter", "deploy"];
type EscrowArgs = {
  beneficiary: string;
  arbiter: string;
  price: bigint;
};

const Stepper = () => {
  const chainId = useChainId();

  const { currentStep, onNextStep, onPrevStep } = useStepper(steps);
  const { data: walletClient } = useWalletClient();
  const [transactionHash, setTransactionHash] = useState<
    `0x${string}` | undefined
  >();
  const [transactionReceipt, setTransactionReceipt] = useState<
    TransactionReceipt | undefined
  >();
  const [contractAddress, setContractAddress] = useState<string | null>();
  const [escrowArgs, setEscrowArgs] = useState<EscrowArgs>({
    arbiter: "",
    beneficiary: "",
    price: BigInt(0),
  });

  const { isLoading, isSuccess, isError } = useWaitForTransaction({
    chainId,
    hash: transactionHash,
    onReplaced: ({ transactionReceipt }) => {
      setTransactionReceipt(transactionReceipt);
      const escrowAddres = transactionReceipt.contractAddress;
      setContractAddress(escrowAddres);
    },
  });

  const deployNewEscrowContract = async () => {
    const abi = Escrow.abi;
    const bytecode = Escrow.bytecode as Hex;
    if (!walletClient) return;
    if (!escrowArgsConfirmed()) return false;

    const hash = await walletClient.deployContract({
      abi,
      bytecode,
      args: [escrowArgs.beneficiary, escrowArgs.arbiter],
      value: escrowArgs.price,
    });
    setTransactionHash(hash);
  };

  const escrowArgsConfirmed = () => {
    if (!isHash(escrowArgs.beneficiary)) return false;
    if (!(escrowArgs.price > 0)) return false;
    if (!isHash(escrowArgs.arbiter)) return false;

    return true;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEscrowArgs((prevArgs) => ({
      ...prevArgs,
      [name]: name === "price" ? parseEther(value) : value,
    }));
  };

  const isHash = (str: string) => {
    if (!str.startsWith("0x") || str.length !== 42) return false;
    return true;
  };

  const nextStepEnable = useMemo(() => {
    if (currentStep === 1 && !isHash(escrowArgs.beneficiary)) return false;
    if (currentStep === 2 && !(escrowArgs.price > 0)) return false;
    if (currentStep === 3 && !isHash(escrowArgs.arbiter)) return false;

    return true;
  }, [
    currentStep,
    escrowArgs.arbiter,
    escrowArgs.beneficiary,
    escrowArgs.price,
  ]);

  return (
    <>
      <div className="flex justify-between">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className={`step-item ${currentStep === idx + 1 && "active"} ${
              idx + 1 < currentStep && "complete"
            }`}
          >
            <div className="step">{idx + 1}</div>
            <p className="text-gray-300 capitalize">{step}</p>
          </div>
        ))}
      </div>
      {currentStep === 1 && (
        <div className="">
          <label htmlFor="beneficiary-address">Address</label>
          <Input
            onChange={handleChange}
            id="beneficiary-address"
            name="beneficiary"
            className=" focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-neutral-600 bg-neutral-800"
            type="text"
            placeholder="Beneficiary Address"
            value={escrowArgs.beneficiary}
          />
        </div>
      )}
      {currentStep === 2 && (
        <div className="">
          <label htmlFor="price-address">Good or Service value</label>
          <Input
            id="price-address"
            name="price"
            className=" focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-neutral-500 bg-neutral-800"
            type="number"
            placeholder="ETH"
            onChange={handleChange}
          />
        </div>
      )}

      {currentStep === 3 && (
        <div className="">
          <label htmlFor="arbiter-address">Arbiter Address</label>
          <Input
            id="arbiter-address"
            name="arbiter"
            className="focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-neutral-500 bg-neutral-800"
            type="text"
            placeholder="Arbiter Address"
            value={escrowArgs.arbiter}
            onChange={handleChange}
          />
        </div>
      )}

      {currentStep === steps.length && (
        <div className="flex justify-center">
          <Button className="w-max" onClick={deployNewEscrowContract}>
            Deploy Contract
          </Button>
          {isLoading && <BiLoaderCircle size={42} className="animate-spin" />}
          {isError && (
            <p className="font-semibold text-red-400 text-center ">
              Error deploying this contract
            </p>
          )}
          {isSuccess && (
            <p className="font-semibold text-green-400 text-center">
              Your Contract has been deployed successfully
            </p>
          )}
        </div>
      )}

      <div className="flex justify-center gap-2 items-center">
        <Button
          disabled={currentStep === 1}
          className="rounded-full p-0 w-8 h-8"
          onClick={onPrevStep}
        >
          <GrFormPrevious size={21} />
        </Button>
        <Button
          disabled={currentStep === steps.length || !nextStepEnable}
          className="rounded-full p-0 w-8 h-8"
          onClick={onNextStep}
        >
          <GrFormNext size={21} />
        </Button>
      </div>
    </>
  );
};

export default Stepper;
