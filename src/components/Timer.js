import React, { useEffect, useState } from "react";
import { MainContext, useContext } from "../QuizContext";

const Timer = () => {
	const { setStop, questionNumber, selectedAnswer } = useContext(MainContext);

	const [timer, setTimer] = useState(30);

	useEffect(() => {
		let interval;
		if (timer === 0) return setStop(true);
		else if (selectedAnswer === null) {
			interval = setInterval(() => {
				setTimer(prev => prev - 1);
			}, 1000);
		} else {
			clearInterval(interval);
		}

		return () => clearInterval(interval); //memory leak
	}, [selectedAnswer, setStop, timer]);

	useEffect(() => {
		setTimer(30);
	}, [questionNumber]);

	return <div>{timer}</div>;
};

export default Timer;
