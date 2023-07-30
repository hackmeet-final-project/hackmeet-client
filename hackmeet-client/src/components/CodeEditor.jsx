import Editor from "@monaco-editor/react";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function CodeEditor() {
  const [errorText, setErrorText] = useState();
  const [answer, setAnswer] = useState("");
  const [passedTest, setPassedTest] = useState(0);
  const isLoading = useSelector((state) => {
    return state.soal.isLoading;
  });

  const defaultAnswer = useSelector(state => {
    return state.soal.defaultAnswer
  })

  const testCases = useSelector(state => {
    return state.soal.testcases
  })

  function handleEditorChange(value) {
    console.log("here is the current model value:", value);
    setAnswer(value);
  }

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

    console.log(defaultAnswer)

    let totalTest = testCases.length;
    let totalTestPassed = 0;
    let totalTestFailed = Math.abs(totalTest - totalTestPassed);

    testCases.forEach((test) => {
      let result;
      try {
        result = answerFunction(...test.arguments);
        setErrorText();
      } catch (error) {
        setErrorText(error.message);
      }
      console.log(test, test.answer, "---", result);
      if (test.answer === result) {
        totalTestPassed++;
      }
    });

    setPassedTest(totalTestPassed);

    const msg = `Total Test Passed : ${totalTestPassed}\n
    Total Test Failed : ${totalTestFailed}`;
    if (totalTestPassed === totalTest) {
      Swal.fire("testing...", msg, "success");
    } else Swal.fire("testing...", msg, "question");
  }

  if (isLoading) {
    return <h1>loading....fetching data</h1>;
  }
  
  return (
    <>
        <Editor
          width="100%"
          height="70%"
          value={defaultAnswer}
          theme="vs-dark"
          defaultLanguage="javascript"
          defaultValue="// some comment"
          onChange={handleEditorChange}
        />
        <button onClick={handleSubmit}>Submit</button>
        <h2 className="text-danger">{errorText}</h2>
    </>
  );
}
