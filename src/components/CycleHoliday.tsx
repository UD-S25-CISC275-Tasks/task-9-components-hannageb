import React, { useState } from "react";
import { Button } from "react-bootstrap";

/**
 * You will need one state, either a string or an enumeration of 5 strings like QuestionType (perhaps named Holiday).
 * You will need to define two functions (or two Records) that can take in an existing holiday and produce the next holiday - one function should produce the next holiday alphabetically, and the other produces the next holiday in the year.
 * The view should render the current holiday with the text Holiday: followed by the emoji (e.g., Holiday: 🎃).
 * The first button should include the text Alphabet somewhere (e.g., Advance by Alphabet) and changes the current holiday to the next one alphabetically.
 * The second button should include the text Year somewhere (e.g., Advance by Year) and changes the current holiday to the next one in the year.
 */

export type Holiday = "🧧" | "🐑" | "🎄" | "🌙" | "💌";

export function alphabetical(holiday: Holiday): Holiday {
    let arrSorted: Holiday[] = ["🎄", "🐑", "🧧", "🌙", "💌"];
    return arrSorted[(arrSorted.indexOf(holiday) + 1) % 5];
}

export function nextHoliday(holiday: Holiday): Holiday {
    let arrSorted: Holiday[] = ["💌", "🧧", "🌙", "🐑", "🎄"];
    return arrSorted[(arrSorted.indexOf(holiday) + 1) % 5];
}
export function CycleHoliday(): React.JSX.Element {
    const [holiday, setHoliday] = useState<Holiday>("🌙");
    return (
        <div>
            Cycle Holiday
            <p>Holiday: {holiday}</p>
            <Button
                onClick={() => {
                    setHoliday(alphabetical(holiday));
                }}
            >
                Advance by Alphabet
            </Button>
            <Button
                onClick={() => {
                    setHoliday(nextHoliday(holiday));
                }}
            >
                Advance by Year
            </Button>
            <p></p>
        </div>
    );
}
