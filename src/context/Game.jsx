import React from "react";

export const GameContext = React.createContext(null);

const initializerArg = {
	history: [
		{
			squares: Array(9).fill(null),
			turn: true,
			step: 0
		}
	],
	steps: 0,
	winner: null
};

const initializer = () => {
	return initializerArg;
};

const calculateWinner = (squares) => {
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6]
	];

	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return lines[i];
		}
	}

	return null;
};

const reducer = (state, action) => {
	switch (action.type) {
		case "winner":
			return {
				...state,
				winner: calculateWinner(state.history[state.steps].squares)
			};

		case "mark":
			const idx = action.row * 3 + action.col;
			const history = state.history.slice(0, state.steps + 1);
			const current = history[history.length - 1];
			const squares = current.squares.slice();
			const player = current.turn ? "X" : "O";

			if (!state.winner && squares[idx] === null) {
				squares[idx] = player;

				return {
					...state,
					history: history.concat([
						{
							squares: squares,
							position: [action.row, action.col],
							turn: !current.turn,
							step: state.steps + 1
						}
					]),
					steps: state.steps + 1
				};
			}
			return state;

		case "step":
			return {
				...state,
				steps: action.id
			};

		case "reset":
			return initializer();

		default:
			return state;
	}
};

const Game = (props) => {
	const [state, dispatch] = React.useReducer(
		reducer,
		initializerArg,
		initializer
	);

	React.useEffect(() => {
		dispatch({ type: "winner" });
	}, [state.history]);

	const updateBox = (row, col) => {
		dispatch({ type: "mark", row: row, col: col });
	};

	const goToStep = (idx) => {
		dispatch({ type: "step", id: idx });
	};

	const gameReset = () => {
		dispatch({ type: "reset" });
	};

	const history = state.history;
	const current = history[state.steps];
	const squares = current.squares.slice();
	let turn = current.turn;
	let draw = false;

	if (state.winner) {
		turn = !turn;
	} else if (squares.filter((square) => square === null).length === 0) {
		draw = true;
	}

	const player = turn ? "X" : "O";

	return (
		<GameContext.Provider
			value={{
				state: state,
				squares: squares,
				player: player,
				updateBox: updateBox,
				goToStep: goToStep,
				gameReset: gameReset,
				draw: draw
			}}
		>
			{props.children}
		</GameContext.Provider>
	);
};

export default Game;
