pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract CustomToken is ERC20 {
    constructor(string memory _symbol) ERC20("CustomToken", _symbol) {
        _mint(msg.sender, 10000 * 1e18);
    }
}
