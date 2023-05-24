pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract CustomToken is ERC20 {
    constructor() ERC20("CustomToken", "CT") {
        _mint(msg.sender, 10000 * 1e18);
    }
}
