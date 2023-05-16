import React from "react";
import won from "../assets/won.jpg";

const Won = () => {
	const exit = () => {
		window.close();
	};

	return (
		<div className="won">
			<img className="won__img" src={won} alt="" />
			<h1 className="won__text">
				Congratulations! You Won{" "}
				<strong className="strng">$ 1000000!</strong>
			</h1>
			<button onClick={exit} className="button btn">
				Exit
			</button>
		</div>
	);
};

export default Won;
