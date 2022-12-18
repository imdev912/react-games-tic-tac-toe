import React from "react";
import Game from "./context/Game";
import { Board } from "./components/Borad";
import { Track } from "./components/Track";
import "./styles.css";

export default function App() {
	return (
		<div className="App">
			<Game>
				<Board />
				<Track />
			</Game>
		</div>
	);
}
