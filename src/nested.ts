import { Answer } from "./interfaces/answer";
import { Question, QuestionType } from "./interfaces/question";
import {
    duplicateQuestion,
    makeBlankQuestion,
    renameQuestion,
} from "./objects";

/**
 * Consumes an array of questions and returns a new array with only the questions
 * that are `published`.
 */
export function getPublishedQuestions(questions: Question[]): Question[] {
    let onlyPublished: Question[] = [
        ...questions.filter((q: Question): boolean => q.published),
    ];
    return onlyPublished;
}

/**
 * Consumes an array of questions and returns a new array of only the questions that are
 * considered "non-empty". An empty question has an empty string for its `body` and
 * `expected`, and an empty array for its `options`.
 */
export function getNonEmptyQuestions(questions: Question[]): Question[] {
    let nonEmpty: Question[] = [
        ...questions.filter(
            (question: Question): boolean =>
                question.body != "" ||
                question.options.length != 0 ||
                question.expected != "",
        ),
    ];
    return nonEmpty;
}

/***
 * Consumes an array of questions and returns the question with the given `id`. If the
 * question is not found, return `null` instead.
 */
export function findQuestion(
    questions: Question[],
    id: number,
): Question | null {
    let found = questions.find(
        (question: Question): boolean => question.id === id,
    );
    return found ? found : null;
}

/**
 * Consumes an array of questions and returns a new array that does not contain the question
 * with the given `id`.
 */
export function removeQuestion(questions: Question[], id: number): Question[] {
    return [
        ...questions.filter((question: Question): boolean => question.id != id),
    ];
}

/***
 * Consumes an array of questions and returns a new array containing just the names of the
 * questions, as an array.
 */
export function getNames(questions: Question[]): string[] {
    let names: string[] = questions.map(
        (question: Question): string => question.name,
    );
    return names;
}

/***
 * Consumes an array of questions and returns the sum total of all their points added together.
 */
export function sumPoints(questions: Question[]): number {
    let sum: number = questions.reduce(
        (sum: number, question: Question) => sum + question.points,
        0,
    );
    return sum;
}

/***
 * Consumes an array of questions and returns the sum total of the PUBLISHED questions.
 */
export function sumPublishedPoints(questions: Question[]): number {
    let published: Question[] = questions.filter(
        (question: Question): boolean => question.published,
    );
    let sum: number = published.reduce(
        (sum: number, question: Question) => sum + question.points,
        0,
    );
    return sum;
}

/***
 * Consumes an array of questions, and produces a Comma-Separated Value (CSV) string representation.
 * A CSV is a type of file frequently used to share tabular data; we will use a single string
 * to represent the entire file. The first line of the file is the headers "id", "name", "options",
 * "points", and "published". The following line contains the value for each question, separated by
 * commas. For the `options` field, use the NUMBER of options.
 *
 * Here is an example of what this will look like (do not include the border).
 *`
id,name,options,points,published
1,Addition,0,1,true
2,Letters,0,1,false
5,Colors,3,1,true
9,Shapes,3,2,false
` *
 * Check the unit tests for more examples!
 */
export function toCSV(questions: Question[]): string {
    let csv: string = questions
        .map(
            (question: Question): string =>
                `${question.id},${question.name},${question.options.length},${question.points},${question.published}`,
        )
        .join("\n");
    return `id,name,options,points,published\n` + csv;
}

/**
 * Consumes an array of Questions and produces a corresponding array of
 * Answers. Each Question gets its own Answer, copying over the `id` as the `questionId`,
 * making the `text` an empty string, and using false for both `submitted` and `correct`.
 */
export function makeAnswers(questions: Question[]): Answer[] {
    let answers: Answer[] = [
        ...questions.map(
            (q: Question): Answer => ({
                questionId: q.id,
                text: "",
                submitted: false,
                correct: false,
            }),
        ),
    ];
    return answers;
}

/***
 * Consumes an array of Questions and produces a new array of questions, where
 * each question is now published, regardless of its previous published status.
 */
export function publishAll(questions: Question[]): Question[] {
    return questions.map(
        (question: Question): Question => ({ ...question, published: true }),
    );
}

/***
 * Consumes an array of Questions and produces whether or not all the questions
 * are the same type. They can be any type, as long as they are all the SAME type.
 */
export function sameType(questions: Question[]): boolean {
    return (
        questions.every(
            (q: Question): boolean => q.type === "multiple_choice_question",
        ) ||
        questions.every(
            (q: Question): boolean => q.type === "short_answer_question",
        )
    );
}

/***
 * Consumes an array of Questions and produces a new array of the same Questions,
 * except that a blank question has been added onto the end. Reuse the `makeBlankQuestion`
 * you defined in the `objects.ts` file.
 */
export function addNewQuestion(
    questions: Question[],
    id: number,
    name: string,
    type: QuestionType,
): Question[] {
    return [...questions, makeBlankQuestion(id, name, type)];
}

/***
 * Consumes an array of Questions and produces a new array of Questions, where all
 * the Questions are the same EXCEPT for the one with the given `targetId`. That
 * Question should be the same EXCEPT that its name should now be `newName`.
 */
export function renameQuestionById(
    questions: Question[],
    targetId: number,
    newName: string,
): Question[] {
    let renamed = questions.map((q: Question): Question => {
        if (q.id === targetId) {
            return renameQuestion(q, newName);
        } else {
            return q;
        }
    });
    return renamed;
}

/***
 * Consumes an array of Questions and produces a new array of Questions, where all
 * the Questions are the same EXCEPT for the one with the given `targetId`. That
 * Question should be the same EXCEPT that its `type` should now be the `newQuestionType`
 * AND if the `newQuestionType` is no longer "multiple_choice_question" than the `options`
 * must be set to an empty list.
 */
export function changeQuestionTypeById(
    questions: Question[],
    targetId: number,
    newQuestionType: QuestionType,
): Question[] {
    let changed = questions.map((q: Question) => {
        if (q.id === targetId) {
            if (newQuestionType === "multiple_choice_question") {
                return { ...q, type: newQuestionType };
            } else {
                return { ...q, type: newQuestionType, options: [] };
            }
        } else {
            return q;
        }
    });
    return changed;
}

/**
 * Consumes an array of Questions and produces a new array of Questions, where all
 * the Questions are the same EXCEPT for the one with the given `targetId`. That
 * Question should be the same EXCEPT that its `option` array should have a new element.
 * If the `targetOptionIndex` is -1, the `newOption` should be added to the end of the list.
 * Otherwise, it should *replace* the existing element at the `targetOptionIndex`.
 *
 * Remember, if a function starts getting too complicated, think about how a helper function
 * can make it simpler! Break down complicated tasks into little pieces.
 */
export function editOption(
    questions: Question[],
    targetId: number,
    targetOptionIndex: number,
    newOption: string,
): Question[] {
    return questions.map((q: Question): Question => {
        if (q.id === targetId) {
            let newOptions: string[] = q.options;
            if (targetOptionIndex === -1) {
                newOptions = [...newOptions, newOption];
                return { ...q, options: newOptions };
            } else {
                newOptions = [
                    ...newOptions.slice(0, targetOptionIndex),
                    newOption,
                    ...newOptions.slice(targetOptionIndex + 1),
                ];
                return { ...q, options: newOptions };
            }
        } else {
            return q;
        }
    });
}

/***
 * Consumes an array of questions, and produces a new array based on the original array.
 * The only difference is that the question with id `targetId` should now be duplicated, with
 * the duplicate inserted directly after the original question. Use the `duplicateQuestion`
 * function you defined previously; the `newId` is the parameter to use for the duplicate's ID.
 */
export function duplicateQuestionInArray(
    questions: Question[],
    targetId: number,
    newId: number,
): Question[] {
    let index = questions.findIndex(
        (q: Question): boolean => q.id === targetId,
    );
    let question = questions[index];
    let duplicate = duplicateQuestion(newId, question);
    return [
        ...questions.slice(0, index + 1),
        duplicate,
        ...questions.slice(index + 1),
    ];
}
