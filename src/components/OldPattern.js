import React, { useState } from "react";
import PatternLock from "react-pattern-lock";

export default function DrawPattern() {
  const PatternValue = localStorage.getItem("pattern");
  const [state, setState] = useState({
    loading: false,
    done: false,
    selectedPattern: []
  });

  const checkPattern = (pattern) => {
    setState({ isLoading: true });
    return new Promise((resolve, reject) => {
      if (pattern.join("-") === PatternValue) {
        localStorage.removeItem("pattern");
        reset();
        setState({ done: true });
        setTimeout(() => {
          window.location = "/";
        }, 500);
      } else {
        reject();
        setState({ error: true });
      }
    });
  };

  const renderText = () => {
    if (state.error)
      return <div style={{ color: "red" }}>Pattern didn't matched</div>;
    return <div>Draw Old pattern</div>;
  };

  // reset pattern if user forgots the pattern !!
  const reset = () => {
    setState({ done: false, error: false, selectedPattern: [] });
  };

  return (
    <>
      {renderText()}
      <PatternLock
        width={300}
        pointSize={10}
        pointActiveSize={40}
        size={3}
        onChange={checkPattern.bind()}
      />
    </>
  );
}
