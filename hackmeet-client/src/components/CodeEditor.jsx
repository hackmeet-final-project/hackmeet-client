import Editor from "@monaco-editor/react";
import Swal from "sweetalert2";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useContext } from "react";
import ShakeContext from "../context/ShakeContext";

export default function CodeEditor({getWinner}) {
  const { animationName, animationCount } = useContext(ShakeContext)
  const [passed, setPassed] = useState([])
  const [answer, setAnswer] = useState("");
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
    setAnswer(value);
  }

  function handleSubmit() {
    setPassed([])
    const firstParameterIndex = answer.indexOf("(");
    const lastParameterIndex = answer.indexOf(")");
    const firstBracketIndex = answer.indexOf("{");
    const lastBracketIndex = answer.lastIndexOf("}");
    const functionParam = answer
      .slice(firstParameterIndex + 1, lastParameterIndex)
      .split(", ");
    const functionBody = answer.slice(firstBracketIndex + 1, lastBracketIndex);
    let answerFunction = Function(...functionParam, functionBody);

    let totalTest = testCases.length;
    let totalTestPassed = 0;
    let totalTestFailed = Math.abs(totalTest - totalTestPassed);

    testCases.forEach((test) => {
      let result;
      result = answerFunction(...test.arguments);
      if (test.answer === result) {
        totalTestPassed++;
        setPassed(prev => {
          return prev = [...prev, true]
        })
      } else {
        setPassed(prev => {
          return prev = [...prev, false]
        })
      }
    });

    const msg = `Total Test Passed : ${totalTestPassed}\n
    Total Test Failed : ${totalTestFailed}`;
    if (totalTestPassed === totalTest) {
      Swal.fire("You won!");
      getWinner()
    } else {
      // Swal.fire("testing...", msg, "question")
    };
  }

  const showPassed = passed.map((pass, index) => {
    if(pass) {
      return <span key={index + 1}>test_{index + 1} <i className="bi bi-check-square-fill text-success"></i> Passed</span>
    } else {
      return <span key={index + 1}>test_{index + 1} <i className="bi bi-x-square-fill text-danger"></i> Failed</span>
    }
  })

  if (isLoading) {
    return <h3 className="m-3">Loading....fetching data</h3>;
  }
  
  return (
    <div className="w-100 h-100 d-flex flex-column p-1" style={{animation: animationName, animationIterationCount: animationCount}}>
        <Editor
          width="100%"
          height="70%"
          value={answer}
          theme="vs-light"
          defaultLanguage="javascript"
          defaultValue={defaultAnswer}
          onChange={handleEditorChange}
        />
        <div className="w-100 position-relative px-3 py-2 rounded-bottom-4 d-flex flex-column " style={{height: "30%", boxShadow: "rgba(0, 0, 0, 0.45) 0px -1px 25px -10px"}}>
          {showPassed}
          <button className="btn shadow-main text-white button-hover position-absolute" style={{right: 5, bottom: 0, backgroundColor: "var(--third-color)"}} onClick={handleSubmit}>Submit</button>
        </div>
    </div>
  );
}
