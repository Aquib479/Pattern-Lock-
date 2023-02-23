import React, { useState } from "react";
import PatternLock from "react-pattern-lock";

export default function ConfirmPattern() {
  const SetPatternValue = localStorage.getItem("pattern");
  const [state, setState] = useState({
    loading: false,
    done: false,
    selectedPattern: []
  });
  const [message, setMessage] = useState("Confirm Pattern");
  const [IsPattern, setIsPattern] = useState(0);

  // confirm recorded pattern !!
  const checkPattern = (pattern) => {
    setIsPattern(pattern.length);
    return new Promise((resolve, reject) => {
      if (pattern.length < 4) {
        reject();
      } else {
        setState({ selectedPattern: pattern });
      }
    });
  };

  const VerifyPattern = () => {
    if (SetPatternValue === state.selectedPattern.join("-")) {
      setMessage("Pattern successfully set");
      setTimeout(() => {
        window.location = "/drawpattern";
      }, 50);
    } else {
      setMessage("Pattern is Incorrect");
      setTimeout(() => {
        localStorage.removeItem("pattern");
        window.location = "/";
      }, 10);
    }
  };

  return (
    <>
      {state.done ? (
        <>
          {/* <small className="pt-14 text-xl font-medium">{message}</small> */}
        </>
      ) : (
        <>
          <h1
            className={`pt-14 text-xl font-medium ${message === "Pattern successfully set"
                ? "text-green-400"
                : "text-red-400"
              }`}
          >
            {message}
          </h1>
          <PatternLock
            width={300}
            pointSize={10}
            pointActiveSize={40}
            size={3}
            onChange={checkPattern.bind()}
            className="mt-10 mb-14"
          />
          {IsPattern <= 0 ? (
            <button
              className="w-36 h-8 bg-gray-400 text-sm rounded-md border-none cursor-pointer"
              onClick={VerifyPattern}
              disabled
            >
              Verify
            </button>
          ) : (
            <button
              className="w-36 h-8 bg-green-400 text-sm text-black hover:text-white rounded-md border-none cursor-pointer hover:bg-green-600"
              onClick={VerifyPattern}
            >
              Verify
            </button>
          )}
        </>
      )}
    </>
  );
}
