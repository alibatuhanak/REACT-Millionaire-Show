import React from "react";

const Menu = ({ setGameState }) => {
	return (
		<div className="menu">
			<div className="menu_screen">
				<button className="button" onClick={() => setGameState("game")}>
					Play
				</button>
			</div>
		</div>
	);
};

export default Menu;
