import React from "react";

const specialSymbols = ["∑", "√", "∞", "≈", "≠", "≤", "≥", "∫", "π", "θ", "Δ"];

const SymbolPicker = ({ onSelect }) => {
    return (
        <div className="symbol-picker">
            {specialSymbols.map((symbol) => (
                <button key={symbol} onClick={() => onSelect(symbol)}>
                    {symbol}
                </button>
            ))}
        </div>
    );
};

export default SymbolPicker;