// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.18;

contract Scrow {
    address public s_beneficiary;
    address public s_depositor;
    address public s_arbiter;
    bool public s_approved;

    event EscrowApproved(uint256 amount);
    error Escrow__OnlyArbiter();
    error Escrow__TransferFundsFailed();
    error Escrow__AlreadyApproved();

    modifier onlyArbiter() {
        if (msg.sender != s_arbiter) revert Escrow__OnlyArbiter();
        _;
    }

    modifier notApproved() {
        if (s_approved) revert Escrow__AlreadyApproved();
        _;
    }

    constructor(address _beneficiary, address _arbiter) payable {
        s_depositor = msg.sender;
        s_beneficiary = _beneficiary;
        s_arbiter = _arbiter;
    }

    function approve() external onlyArbiter notApproved {
        uint256 balance = address(this).balance;
        (bool success, ) = s_beneficiary.call{value: balance}("");
        if (!success) revert Escrow__TransferFundsFailed();

        s_approved = true;
    }
}
