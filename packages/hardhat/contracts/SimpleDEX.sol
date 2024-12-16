// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
//según la recomendación en el feedback del TP3, se agregó la librería Ownable
import "@openzeppelin/contracts/access/Ownable.sol";


contract SimpleDEX is Ownable {

    //variables de estado
    IERC20 public tokenA;
    IERC20 public tokenB;

    //eventos
    event LiquidityAdded(uint256 amountA, uint256 amountB);
    event LiquidityRemoved(uint256 amountA, uint256 amountB);
    event TokenSwapped(address indexed user, uint256 amountIn, uint256 amountOut);

    //constructor
    constructor(address _tokenA, address _tokenB) Ownable(msg.sender) {
        tokenA = IERC20(_tokenA);
        tokenB = IERC20(_tokenB);
        
    }

    // funcion para añadir liquidez al pool
    function addLiquidity(uint256 amountA, uint256 amountB) external onlyOwner {
        require(amountA > 0 && amountB > 0, "Amounts must be > 0");
        tokenA.transferFrom(msg.sender, address(this), amountA);
        tokenB.transferFrom(msg.sender, address(this), amountB);

        emit LiquidityAdded(amountA, amountB);
    }

    // funcion para retirar liquidez del pool
    function removeLiquidity(uint256 amountA, uint256 amountB) external onlyOwner {
        require(amountA <= tokenA.balanceOf(address(this)) && amountB <= tokenB.balanceOf(address(this)), "Low liquidity");

        tokenA.transfer(msg.sender, amountA);
        tokenB.transfer(msg.sender, amountB);

        emit LiquidityRemoved(amountA, amountB);
    }

    // funcion para intercambiar TokenA por TokenB
    function swapAforB(uint256 amountAIn) external {
        require(amountAIn > 0, "Amount must be > 0");

        uint256 amountBOut = getAmountOut(amountAIn, tokenA.balanceOf(address(this)), tokenB.balanceOf(address(this)));

        tokenA.transferFrom(msg.sender, address(this), amountAIn);
        tokenB.transfer(msg.sender, amountBOut);

        emit TokenSwapped(msg.sender, amountAIn, amountBOut);
    }

    // funcion para intercambiar TokenB por TokenA
    function swapBforA(uint256 amountBIn) external {
        require(amountBIn > 0, "Amount must be > 0");

        uint256 amountAOut = getAmountOut(amountBIn, tokenB.balanceOf(address(this)), tokenA.balanceOf(address(this)));

        tokenB.transferFrom(msg.sender, address(this), amountBIn);
        tokenA.transfer(msg.sender, amountAOut);

        emit TokenSwapped(msg.sender, amountBIn, amountAOut);
    }

    // funcion para obtener el precio actual de un token en relacion con el otro
    function getPrice(address _token) external view returns (uint256) {
        require(_token == address(tokenA) || _token == address(tokenB), "Invalid token");

        return _token == address(tokenA)
            ? (tokenB.balanceOf(address(this)) * 1e18) / tokenA.balanceOf(address(this))
            : (tokenA.balanceOf(address(this)) * 1e18) / tokenB.balanceOf(address(this));
    }

    //calcular el intercambio (basado en la formula del producto constante vista en clase)
    function getAmountOut(uint256 amountIn, uint256 reserveIn, uint256 reserveOut) private pure returns (uint256) {
        return (amountIn * reserveOut) / (reserveIn + amountIn);
    }
}