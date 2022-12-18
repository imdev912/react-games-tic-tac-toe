export const Reset = (props) => {
	const { gameReset } = props;

	return (
		<button className="reset" onClick={() => gameReset()}>
			{props.children}
		</button>
	);
};
