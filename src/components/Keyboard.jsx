import React, { useState } from "react";
import Keyboard from "react-simple-keyboard";
import "simple-keyboard/build/css/index.css";
import "./Keyboard.css"; // Updated CSS

export default function CyberKeyboard() {
  const [input, setInput] = useState("");

  const handleKeyPress = (button) => {
    if (button === "{shift}" || button === "{lock}") {
      return;
    }
    setInput((prev) => prev + button);
  };

  return (
    <div className="neon-keyboard">
      <Keyboard
        onKeyPress={handleKeyPress}
        layout={{
          default: [
            "ESC 1 2 3 4 5 6 7 8 9 0 - BACK",
            "TAB Q W E R T Y U I O P [ ]",
            "CAPS A S D F G H J K L ; ' ENTER",
            "SHIFT Z X C V B N M , . / SHIFT",
            "CTRL FN ALTGR SPACE ALTGR CTRL",
            "{arrowleft} {arrowup} {arrowdown} {arrowright}"
          ]
        }}
        display={{
          "{arrowup}": "↑",
          "{arrowdown}": "↓",
          "{arrowleft}": "←",
          "{arrowright}": "→",
          "BACK": "⌫",
          "CAPS": "⇪",
          "SHIFT": "⇧",
          "ENTER": "⏎",
          "SPACE": "␣"
        }}
        theme="hg-theme-default neon-keyboard"
        buttonTheme={[
          { class: "smaller-key", buttons: "ESC TAB CAPS SHIFT CTRL FN ALTGR BACK ENTER SPACE" },
        ]}
      />
    </div>
  );
}
