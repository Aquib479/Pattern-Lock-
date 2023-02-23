import React, { useState } from "react";
import PatternLock from "react-pattern-lock";
import { AiFillLock } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function SetPattern() {
  const [state, setState] = useState({
    loading: false,
    done: false,
    selectedPattern: []
  });
  const [IsPattern, setIsPattern] = useState(0);

  // record pattern
  const recordPattern = (pattern) => {
    setIsPattern(pattern.length);
    return new Promise((resolve, reject) => {
      if (pattern.length < 4) {
        reject();
      } else {
        setState({ selectedPattern: pattern });
        localStorage.setItem("pattern", pattern.join("-"));
      }
    });
  };

  return (
    <>
      <div className="text-center">
        <div className="pt-14 flex justify-center items-center">
          <p className="text-xl font-medium mx-2">Set Pattern</p>
          <span>
            <AiFillLock className="text-2xl" />
          </span>
        </div>
        <PatternLock
          width={300}
          pointSize={10}
          pointActiveSize={40}
          size={3}
          onChange={recordPattern.bind()}
          className="mt-10 mb-14"
        />
        <Link to="/confirmpattern">
          {IsPattern <= 0 ? (
            <button
              className="w-36 h-8 bg-gray-400 text-sm rounded-md border-none cursor-pointer"
              disabled
            >
              Confirm Pattern
            </button>
          ) : (
            <button className="border-none w-36 h-8 bg-green-400 text-sm text-black hover:text-white rounded-md cursor-pointer hover:bg-green-600">
              Confirm Pattern
            </button>
          )}
        </Link>
      </div>
    </>
  );
}
