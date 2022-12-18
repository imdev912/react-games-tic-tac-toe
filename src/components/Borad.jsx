import { Box } from "./Box";
import { nanoid } from "nanoid";

export const Board = () => {
	return (
		<div className="board">
			{[0, 1, 2].map((row) => {
				return [0, 1, 2].map((column) => {
					return <Box key={nanoid()} row={row} col={column} />;
				});
			})}
		</div>
	);
};
