import { deployments, ethers, network } from "hardhat";
import { developmentChains } from "../hardhat-helper";
import { Scrow } from "../typechain-types";
import { assert, expect } from "chai";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { int } from "hardhat/internal/core/params/argumentTypes";

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("Scrow Contract", () => {
          let scrow: Scrow;
          let depositer: HardhatEthersSigner,
              arbiter: HardhatEthersSigner,
              beneficiary: HardhatEthersSigner;
          beforeEach(async () => {
              const [_depositer, _arbiter, _beneficiary] = await ethers.getSigners();
              depositer = _depositer;
              arbiter = _arbiter;
              beneficiary = _beneficiary;
              await deployments.fixture(["all"]);
              scrow = await ethers.getContract("Scrow");
          });
          it("Sets correctly the depositor, arbiter and beneficiary", async () => {
              const deployer = await scrow.s_depositor();
              const _arbiter = await scrow.s_arbiter();
              const _beneficiary = await scrow.s_beneficiary();
              assert.equal(deployer, depositer.address);
              assert.equal(arbiter.address, _arbiter);
              assert.equal(beneficiary.address, _beneficiary);
          });
          it("Receives 0 or more ether", async () => {
              const scrowAddress = await scrow.getAddress();
              const balance = await ethers.provider.getBalance(scrowAddress);
              assert.isAtLeast(parseInt(balance.toString()), 0);
          });

          it("Allows only the arbiter to approve the contract", async () => {
              await expect(scrow.connect(depositer).approve()).to.be.revertedWithCustomError(
                  scrow,
                  "Escrow__OnlyArbiter",
              );
              expect(await scrow.connect(arbiter).approve());
          });
          it("Lets the arbiter to approve only if not approved before", async () => {
              await scrow.connect(arbiter).approve();
              await expect(scrow.connect(arbiter).approve()).to.be.revertedWithCustomError(
                  scrow,
                  "Escrow__AlreadyApproved",
              );
          });
      });
