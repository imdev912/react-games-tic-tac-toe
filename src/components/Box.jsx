import React from "react";
import { GameContext } from "../context/Game";

export const Box = (props) => {
	const { row, col } = props;
	const context = React.useContext(GameContext);
	const { winner } = context.state;
	const idx = row * 3 + col;
	const squares = context.squares;

	return (
		<div
			className={winner ? (winner.includes(idx) ? "streak" : "square") : "box"}
			onClick={() => context.updateBox(row, col)}
		>
			{squares[idx]}
		</div>
	);
};
