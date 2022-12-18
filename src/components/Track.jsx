import React from "react";
import { GameContext } from "../context/Game";
import { Steps } from "./Steps";
import { nanoid } from "nanoid";
import { Player } from "./Player";
import { Result } from "./Result";

export const Track = () => {
	const context = React.useContext(GameContext);
	const { player, gameReset, draw, goToStep } = context;
	const { winner, history, steps } = context.state;
	const [order, setOrder] = React.useState(true);

	const sortMe = () => {
		history.reverse();
		return setOrder((prev) => !prev);
	};

	return (
		<div className="track">
			{winner || draw ? (
				<Result
					winner={winner}
					player={player}
					gameReset={gameReset}
					draw={draw}
				/>
			) : (
				<>
					<div className="next-sort">
						<Player player={player} />

						{history.length > 2 && (
							<button className="sort" onClick={sortMe}>
								Sort ({order ? "dsc" : "asc"})
							</button>
						)}
					</div>

					{history.map((track, idx) => {
						return (
							<Steps
								key={nanoid()}
								idx={idx}
								track={track}
								steps={steps}
								goToStep={goToStep}
							/>
						);
					})}
				</>
			)}
		</div>
	);
};
