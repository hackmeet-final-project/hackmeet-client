import Editor from "@monaco-editor/react";
import Swal from "sweetalert2";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useContext } from "react";
import { useToast } from "@chakra-ui/react";
import ShakeContext from "../context/ShakeContext";

export default function CodeEditor({ getWinner }) {
  const toast = useToast();
  const { animationName, animationCount } = useContext(ShakeContext);
  const [passed, setPassed] = useState([]);
  const [showError, setShowError] = useState({
    argsTest: false,
    initialCase: [],
    argsError: false,
    message: "",
  });
  const [answer, setAnswer] = useState("");
  const isLoading = useSelector((state) => {
    return state.soal.isLoading;
  });

  const defaultAnswer = useSelector((state) => {
    return state.soal.defaultAnswer;
  });

  const testCases = useSelector((state) => {
    return state.soal.testcases;
  });

  function handleEditorChange(value) {
    setAnswer(value);
  }

  function handleSubmit() {
    setPassed([]);
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
      try {
        result = answerFunction(...test.arguments);
        setShowError({ argsError: false });
      } catch (error) {
        console.log(error);
        setShowError({ argsError: true, message: String(error) });
      }
      if (test.answer === result) {
        totalTestPassed++;
        setPassed((prev) => {
          return (prev = [...prev, [true, test.arguments, test.answer]]);
        });
      } else {
        setPassed((prev) => {
          return (prev = [...prev, [false, test.arguments, test.answer]]);
        });
      }
    });

    const msg = `Total Test Passed : ${totalTestPassed}\n
    Total Test Failed : ${totalTestFailed}`;
    if (totalTestPassed === totalTest) {
      toast({
        position: "bottom",
        title: "You Won",
        description: "See you again!",
        status: "success",
        duration: 2000,
        isClosable: true,
      });

      getWinner();
    } else {
      // Swal.fire("testing...", msg, "question")
    }
  }

  let showPassed = passed.map((e, index) => {
    let i = index;
    if (e[0]) {
      return (
        <span key={i + 1}>
          test_{i + 1} Passed
          <i className="bi bi-check-square-fill text-success"></i>: function
          main[{String(e[1])}] should be {String(e[2])}
        </span>
      );
    } else {
      return (
        <span key={i + 1}>
          test_{i + 1} Failed<i className="bi bi-x-square-fill text-danger"></i>
          : function main[{String(e[1])}] should be {String(e[2])}
        </span>
      );
    }
  });

  if (isLoading) {
    return <h3 className="m-3">Loading....fetching data</h3>;
  }

  return (
    <div
      className="w-100 h-100 d-flex flex-column p-1"
      style={{
        animation: animationName,
        animationIterationCount: animationCount,
      }}
    >
      <Editor
        width="100%"
        height="70%"
        value={answer}
        theme="vs-light"
        defaultLanguage="javascript"
        defaultValue={defaultAnswer}
        onChange={handleEditorChange}
      />
      <div
        id="consolelog"
        className="w-100 position-relative px-3 py-2 rounded-bottom-4 d-flex flex-column overflow-scroll"
        style={{
          height: "30%",
          boxShadow: "rgba(0, 0, 0, 0.45) 0px -1px 25px -10px",
        }}
      >
        {showError.argsError ? showError.message : ""}
        {showPassed}
        <button
          className="btn shadow-main text-white button-hover position-absolute"
          style={{ right: 5, bottom: 0, backgroundColor: "var(--third-color)" }}
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
