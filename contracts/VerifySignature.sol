// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol";

contract VerifySignature is EIP712 {
    constructor(string memory name, string memory version) EIP712(name, version) {}

    function recoverV4(
        address from,
        address to,
        uint256 value,
        bytes memory signature
    ) public view returns (address) {
        bytes32 digest = _hashTypedDataV4(
            keccak256(
                abi.encode(
                    keccak256("VerifyClaim(address from,address to,uint256 value)"),
                    from,
                    to,
                    value
                )
            )
        );
        return ECDSA.recover(digest, signature);
    }
}
