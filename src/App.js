import React, { useEffect, useState } from "react";
import "./app.css";
import Timer from "./components/Timer";
import Trivia from "./components/Trivia";
import Menu from "./components/Menu";
import Won from "./components/Won";
import { moneyPyramid } from "./MoneyPyramid";
import { data } from "./Question";

import { MainContext } from "./QuizContext";

function App() {
	const [questionNumber, setQuestionNumber] = useState(1);
	const [stop, setStop] = useState(false);
	const [earned, setEarned] = useState("$ 0");
	const [selectedAnswer, setSelectedAnswer] = useState(null);
	const [gameState, setGameState] = useState("menu");

	// const dbTrivia = async () => {
	// 	try {
	// 		const res = await fetch("https://opentdb.com/api.php?amount=10");
	// 		const data = await res.json();
	// 		setDataT(data.results);
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };

	// useEffect(() => {
	//  dbTrivia();
	// }, []);

	useEffect(() => {
		questionNumber > 1 && setEarned(moneyPyramid.find(m => m.id === questionNumber - 1).amount);
	}, [questionNumber]);

	const click = () => {
		setQuestionNumber(1);
		setGameState("game");
		setStop(false);
	};

	const dataContext = {
		data,
		questionNumber,
		setQuestionNumber,
		stop,
		setStop,
		earned,
		setEarned,
		selectedAnswer,
		setSelectedAnswer,
		gameState,
		setGameState,
	};

	return (
		<MainContext.Provider value={dataContext}>
			<div className="app">
				{gameState === "won" && <Won />}
				{gameState === "menu" && <Menu setGameState={setGameState} />}
				{gameState === "game" && (
					<>
						<div className="main">
							{stop ? (
								<div className="stop_stop">
									<h1 className="endText">You earned: {earned}</h1>
									<button onClick={click} className="button marg">
										Again
									</button>
								</div>
							) : (
								<>
									{" "}
									<div className="top">
										<div className="timer">
											<Timer />
										</div>
									</div>
									<div className="bottom">
										<Trivia />
									</div>
								</>
							)}
						</div>
						<div className="pyramid">
							<ul className="moneyList">
								{moneyPyramid
									.map(item => {
										return (
											<li className={questionNumber === item.id ? "moneyListItem active" : "moneyListItem"}>
												<span className="moneyListItemNumber">{item.id}</span>
												<span className="moneyListItemAmount">{item.amount}</span>
											</li>
										);
									})
									.reverse()}
							</ul>
						</div>
					</>
				)}
			</div>
		</MainContext.Provider>
	);
}

export default App;
