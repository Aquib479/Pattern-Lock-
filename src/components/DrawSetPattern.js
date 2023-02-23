import React, { useState, useEffect } from "react";
import PatternLock from "react-pattern-lock";
import { AiFillUnlock } from "react-icons/ai";
import { AiFillLock } from "react-icons/ai";

export default function DrawPattern() {
  const PatternValue = localStorage.getItem("pattern");
  const [state, setState] = useState({
    loading: false,
    done: false,
    selectedPattern: []
  });
  const [counter, setCounter] = useState(0);
  const [Timer, setTimer] = useState(30);

  const checkPattern = (pattern) => {
    setState({ isLoading: true });
    return new Promise((resolve, reject) => {
      if (pattern.join("-") === PatternValue) {
        setState({ done: true });
      } else {
        setCounter(counter + 1);
        reject();
        setState({ error: true });
      }
    });
  };

  const renderText = () => {
    if (state.error)
      return (
        <div
          className="pt-14 text-xl font-medium flex justify-center items-center"
          style={{ color: "red" }}
        >
          <p className="text-lg">Try Again</p>
          <span>
            <AiFillLock className="mx-3 text-lg" />
          </span>
        </div>
      );
    return <div className="pt-14 text-xl font-medium">Draw pattern</div>;
  };

  // reset pattern if user forgots the pattern !!
  const reset = () => {
    setState({ done: false, error: false, selectedPattern: [] });
  };

  // handling the options button
  const handleOptions = (event) => {
    const val = event.target.value;
    if (val === "forgot") {
      let user = prompt('what is "40" + "50" ?');
      if (user === "4050") {
        localStorage.removeItem("pattern");
        reset();
        setTimeout(() => {
          window.location = "/";
        }, 200);
      } else {
        alert("You have entered wrong answer ! Try Again");
      }
    } else {
      window.location = "/oldpattern";
    }
  };

  // count down timer
  useEffect(() => {
    if (counter >= 5) {
      Timer > 0 && setTimeout(() => setTimer(Timer - 1), 1000);
    }
    if (Timer <= 0) {
      setCounter(0);
      window.location.reload();
    }
  }, [Timer, counter]);

  return (
    <>
      {state.done ? (
        <>
          <div className="pt-14 flex justify-center items-center">
            <p className="text-white font-medium text-xl mx-4 text-green-300">
              Unlocked
            </p>
            <span>
              <AiFillUnlock className="text-3xl text-green-300" />
            </span>
          </div>
        </>
      ) : (
        <>
          {counter >= 5 ? (
            <>
              <div className="text-white font-medium text-md pt-14">
                Try after : {Timer}
              </div>
            </>
          ) : (
            <>{renderText()}</>
          )}

          {counter >= 5 ? (
            <PatternLock
              disabled={true}
              width={300}
              pointSize={10}
              pointActiveSize={40}
              size={3}
              onChange={checkPattern.bind()}
              className="mt-10 mb-14"
            />
          ) : (
            <PatternLock
              width={300}
              pointSize={10}
              pointActiveSize={40}
              size={3}
              onChange={checkPattern.bind()}
              className="mt-10 mb-14"
            />
          )}
          <select
            className="bg-gray-600 py-1 pl-2 pr-4 text-white rounded-md cursor-pointer outline-none border border-white"
            onChange={handleOptions}
          >
            <option>Option</option>
            <option value="forgot">Forgot Pattern</option>
            <option value="reset">Reset Pattern</option>
          </select>
        </>
      )}
    </>
  );
}
