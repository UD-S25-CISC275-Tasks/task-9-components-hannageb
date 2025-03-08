import React, { useState } from "react";
import { Button } from "react-bootstrap";

/**
 * You will need one state, either a string or an enumeration of 5 strings like QuestionType (perhaps named Holiday).
 * You will need to define two functions (or two Records) that can take in an existing holiday and produce the next holiday - one function should produce the next holiday alphabetically, and the other produces the next holiday in the year.
 * The view should render the current holiday with the text Holiday: followed by the emoji (e.g., Holiday: 🎃).
 * The first button should include the text Alphabet somewhere (e.g., Advance by Alphabet) and changes the current holiday to the next one alphabetically.
 * The second button should include the text Year somewhere (e.g., Advance by Year) and changes the current holiday to the next one in the year.
 */

export type Holiday =
    | "Lunar New Year"
    | "Eid al-Adha"
    | "Christmas"
    | "Ramadan"
    | "Valentine's Day";

export function CycleHoliday(): React.JSX.Element {
    const [holiday, setHoliday] = useState<Holiday>();
    return <div>Cycle Holiday</div>;
}
