// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

//según la recomendación en el feedback del TP3, se agregó la librería Ownable
import "@openzeppelin/contracts/access/Ownable.sol";

contract TokenB is ERC20, Ownable {
 constructor()
        ERC20("TokenB", "TKB")
        Ownable(msg.sender)
        {_mint(msg.sender, 1000 * 10 ** decimals());}

    function mint(address to, uint256 amount) public
    {_mint(to, amount);}
}