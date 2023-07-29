import React, { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

export default function BattleUI() {
  const soal = useSelector((state) => {
    return state.soal.data;
  });
  const [indexSoal, setIndexSoal] = useState(5);
  const [errorText, setErrorText] = useState();
  const [answer, setAnswer] = useState("");

  const [testCases, setTestCase] = useState([]);

  const [passedTest, setPassedTest] = useState(0);

  function handleEditorChange(value, event) {
    console.log("here is the current model value:", value);
    setAnswer(value);
  }
  useEffect(() => {
    setAnswer(soal[indexSoal].defaultAnswer);
    setTestCase(soal[indexSoal].testcases);
  }, [indexSoal]);

  //   console.log(soal);

  function handleSubmit() {
    const firstParameterIndex = answer.indexOf("(");
    const lastParameterIndex = answer.indexOf(")");
    const firstBracketIndex = answer.indexOf("{");
    const lastBracketIndex = answer.lastIndexOf("}");
    const functionParam = answer
      .slice(firstParameterIndex + 1, lastParameterIndex)
      .split(", ");
    const functionBody = answer.slice(firstBracketIndex + 1, lastBracketIndex);
    let answerFunction = Function(...functionParam, functionBody);

    console.log(answerFunction);

    let totalTest = testCases.length;
    let totalTestPassed = 0;
    let totalTestFailed = Math.abs(totalTest - totalTestPassed);

    testCases.forEach((test) => {
      let result;
      try {
        result = answerFunction(...test.arguments);
        setErrorText();
      } catch (error) {
        console.log({ msg: error });
        setErrorText(error.message);
      }
      console.log(test, test.answer, "---", result);
      if (test.answer === result) {
        totalTestPassed++;
      }
    });

    console.log(answerFunction, "<");
    setPassedTest(totalTestPassed);

    const msg = `Total Test Passed : ${totalTestPassed}\n
    Total Test Failed : ${totalTestFailed}`;
    if (totalTestPassed === totalTest) {
      Swal.fire("testing...", msg, "success");
    } else Swal.fire("testing...", msg, "question");
  }

  return (
    <>
      <div className="container-fluid w-75 mt-5">
        <h1>{soal[indexSoal].question}</h1>
        <hr />
        <Editor
          width={"100vh"}
          height="40vh"
          value={soal[indexSoal].defaultAnswer}
          theme="vs-dark"
          defaultLanguage="javascript"
          defaultValue="// some comment"
          onChange={handleEditorChange}
        />
        <hr />
        <button onClick={handleSubmit}>Submit</button>
        <h2 className="text-danger">{errorText}</h2>
      </div>
    </>
  );
}