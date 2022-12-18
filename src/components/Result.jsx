import { Winner } from "./Winner";
import { Draw } from "./Draw";
import { Reset } from "./Reset";

export const Result = (props) => {
	const { winner, player, gameReset, draw } = props;

	return (
		<>
			{winner && <Winner player={player} gameReset={gameReset} />}

			{draw && <Draw gameReset={gameReset} />}

			<Reset gameReset={gameReset}>Play Again</Reset>
		</>
	);
};
