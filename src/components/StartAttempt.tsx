import React, { useState } from "react";
import { Button } from "react-bootstrap";

/*
✓ You will need two pieces of state: the number of attempts and whether the quiz is in progress.
✓ The initial number of attempts is 4
✓ The quiz is initially NOT in progress
✓ There is a button labelled Start Quiz that puts the Quiz in progress and decreases the number of attempts by one.
✓ There is a button labelled Stop Quiz that stops the Quiz from being in progress.
✓ There is a button labelled Mulligan that increase the attempts by one.
When the quiz is in progress, the Start Quiz and Mulligan buttons are disabled.
When the quiz is not in progress, the Stop Quiz button is disabled.
When the attempts are zero, the Start Quiz button is disabled.
✓ The number of attempts should be visible in the interface.

*/

export function StartAttempt(): React.JSX.Element {
    // state for # of attempts (number)
    const [attempts, setAttempts] = useState<number>(4);
    // state for whether quiz is in progress (boolean)
    const [progress, setProgress] = useState<boolean>(false);

    return (
        <div>
            <Button
                onClick={() => {
                    setProgress(true);
                    setAttempts(attempts - 1);
                }}
                // disabled if quiz is in progress
                disabled={progress || attempts === 0}
            >
                Start Quiz
            </Button>

            <Button
                onClick={() => {
                    setProgress(false);
                }}
                disabled={!progress}
            >
                Stop Quiz
            </Button>

            <Button
                onClick={() => {
                    setAttempts(attempts + 1);
                }}
                disabled={progress}
            >
                Mulligan
            </Button>
            <p>Attempts: {attempts}</p>
        </div>
    );
}