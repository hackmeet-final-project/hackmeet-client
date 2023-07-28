import React, { useState } from "react";
import Editor from "@monaco-editor/react";

const Battle = () => {
  const [answer, setAnswer] = useState(`function main(a, b) {
        // your code here 
      }`);

  const [passedTest, setPassedTest] = useState(0);
  const [testCases] = useState([
    {
      arguments: [4, 2],
      answer: 8,
    },
    {
      arguments: [10, 2],
      answer: 20,
    },
  ]);
  function handleEditorChange(value, event) {
    console.log("here is the current model value:", value);
    setAnswer(value);
  }
  function handleSubmit() {
    const firstBracketIndex = answer.indexOf("{");
    const lastBracketIndex = answer.lastIndexOf("}");
    const functionBody = answer.slice(firstBracketIndex + 1, lastBracketIndex);
    const answerFunction = Function("a", "b", functionBody);

    let totalTestPassed = 0;

    testCases.forEach((test) => {
      const result = answerFunction(...test.arguments);
      console.log(test, test.answer, "---", result);
      if (test.answer === result) {
        totalTestPassed++;
      }
    });

    console.log(answerFunction, "<");
    setPassedTest(totalTestPassed);
  }

  return (
    <>
      <h1>
        Buatlah sebuah function yang menerima 2 param a,b dan mengembalikan
        hasil perkalian dari fn tersebut
      </h1>
      <Editor
        width={"100vh"}
        height="20vh"
        value={answer}
        defaultLanguage="javascript"
        defaultValue="// some comment"
        onChange={handleEditorChange}
      />
      <button onClick={handleSubmit}>Submit</button>
      <h2>TEST PASSED: {passedTest}</h2>
    </>
  );
};

export default Battle;
