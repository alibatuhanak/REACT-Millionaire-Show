import React, { useEffect, useState } from "react";
import useSound from "use-sound";
import play from "../assets/play.mp3";
import correct from "../assets/correct.mp3";
import wrong from "../assets/wrong.mp3";
import { MainContext, useContext } from "../QuizContext";

const Trivia = () => {
	const { data, setStop, questionNumber, setQuestionNumber, selectedAnswer, setSelectedAnswer, setGameState } = useContext(MainContext);

	const [question, setQuestion] = useState(null);
	const [disabled, setDisabled] = useState("answer");
	const [className, setClassName] = useState("answer");
	const [letsPlay] = useSound(play, {
		volume: 0.15,
		interrupt: true,
	});
	const [correctAnswer] = useSound(correct);
	const [wrongAnswer] = useSound(wrong);

	useEffect(() => {
		letsPlay();
	}, [letsPlay]);

	useEffect(() => {
		setQuestion(data[questionNumber - 1]);
	}, [data, questionNumber]);

	const delay = (duration, callback) => {
		setTimeout(() => {
			callback();
		}, duration);
	};

	const handleClick = a => {
		setSelectedAnswer(a);
		setClassName("answer active disabled");
		setDisabled("answer disabled");
		delay(3000, () => setClassName(a.correct ? "answer correct disabled" : "answer wrong disabled"));
		delay(5000, () => {
			if (a.correct === true) {
				correctAnswer();
				delay(3000, () => {
					if (questionNumber === 15) {
						setGameState("won");
					} else {
						setQuestionNumber(prev => prev + 1);
						setSelectedAnswer(null);
						setDisabled("answer");
					}
				});
			} else {
				wrongAnswer();
				delay(3000, () => {
					setStop(true);
					setSelectedAnswer(null);
				});
			}
		});
	};

	return (
		<div className="trivia">
			<div className="question">{question?.question}</div>
			<div className="answers">
				{question?.answers.map(a => (
					<div className={selectedAnswer === a ? className : disabled} onClick={() => handleClick(a)}>
						{a.text}
					</div>
				))}
			</div>
		</div>
	);
};

export default Trivia;
