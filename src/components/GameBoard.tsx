import { useState, useCallback } from "react";
import { motion } from "framer-motion";

type CellState = "water" | "ship" | "hit" | "miss";

interface GameBoardProps {
  size?: number;
  isEnemy?: boolean;
  onCellClick?: (row: number, col: number) => void;
  board?: CellState[][];
  label?: string;
}

const LETTERS = "ABCDEFGHIJ";

const GameBoard = ({ size = 10, isEnemy = false, onCellClick, board: externalBoard, label }: GameBoardProps) => {
  const [internalBoard, setInternalBoard] = useState<CellState[][]>(
    Array(size).fill(null).map(() => Array(size).fill("water"))
  );

  const board = externalBoard || internalBoard;

  const handleClick = useCallback((row: number, col: number) => {
    if (onCellClick) {
      onCellClick(row, col);
      return;
    }
    if (isEnemy) {
      setInternalBoard((prev) => {
        const newBoard = prev.map((r) => [...r]);
        if (newBoard[row][col] === "water") {
          newBoard[row][col] = Math.random() > 0.7 ? "hit" : "miss";
        }
        return newBoard;
      });
    }
  }, [onCellClick, isEnemy]);

  const getCellClass = (state: CellState) => {
    switch (state) {
      case "hit": return "cell-hit";
      case "miss": return "cell-miss";
      case "ship": return isEnemy ? "cell-water" : "cell-ship";
      default: return "cell-water";
    }
  };

  return (
    <div className="inline-block">
      {label && (
        <h3 className="font-display text-sm tracking-widest text-primary mb-3 text-center uppercase">
          {label}
        </h3>
      )}
      <div className="relative neon-border border rounded-lg p-2 bg-card/50 backdrop-blur-sm">
        {/* Column headers */}
        <div className="flex gap-0.5 mb-0.5 pl-7">
          {Array.from({ length: size }, (_, i) => (
            <div key={i} className="w-8 h-6 flex items-center justify-center text-xs font-mono text-muted-foreground">
              {i + 1}
            </div>
          ))}
        </div>

        {/* Grid */}
        {board.map((row, rowIdx) => (
          <div key={rowIdx} className="flex gap-0.5 mb-0.5">
            {/* Row header */}
            <div className="w-6 h-8 flex items-center justify-center text-xs font-mono text-muted-foreground">
              {LETTERS[rowIdx]}
            </div>
            {row.map((cell, colIdx) => (
              <motion.button
                key={`${rowIdx}-${colIdx}`}
                whileHover={cell === "water" ? { scale: 1.1 } : {}}
                whileTap={cell === "water" ? { scale: 0.95 } : {}}
                onClick={() => handleClick(rowIdx, colIdx)}
                className={`w-8 h-8 rounded-sm text-xs font-mono flex items-center justify-center cursor-pointer ${getCellClass(cell)}`}
              >
                {cell === "hit" && "💥"}
                {cell === "miss" && "•"}
              </motion.button>
            ))}
          </div>
        ))}

        {/* Radar overlay */}
        <div className="absolute inset-0 pointer-events-none rounded-lg" style={{ background: "var(--gradient-radar)" }} />
      </div>
    </div>
  );
};

export default GameBoard;
