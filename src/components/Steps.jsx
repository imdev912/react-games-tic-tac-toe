import { nanoid } from "nanoid";

export const Steps = (props) => {
	const { idx, steps, goToStep } = props;
	const { squares, position, turn, step } = props.track;

	return (
		<div
			className={`steps ${step === steps ? "selected" : ""}`}
			onClick={() => goToStep(idx)}
		>
			<div>
				<span className="next-turn">[{turn ? "X" : "O"}] </span>

				{step ? <span>Go to move {step}</span> : <span>Play Again</span>}

				{position && (
					<span>
						{" "}
						({position[0]}, {position[1]})
					</span>
				)}
			</div>

			{position && squares && (
				<div className="step">
					{squares.map((step) => {
						return <small key={nanoid()}>{step ? step : "_"}</small>;
					})}
				</div>
			)}
		</div>
	);
};
