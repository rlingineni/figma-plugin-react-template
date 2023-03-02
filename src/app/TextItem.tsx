import * as React from "react";
import { useEffect, useRef, useState } from "react";

const TextItem = ({ node, handleUpdateText }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(node.text);
  const inputRef: any = useRef();

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  return (
    <div className="textItem">
      {!isEditing ? (
        <div onClick={() => setIsEditing(true)}>{node.text}</div>
      ) : (
        <div
          contentEditable
          suppressContentEditableWarning
          ref={inputRef}
          onBlur={(e) => {
            handleUpdateText(node.id, e.currentTarget.innerText);
          }}
        >
          {text}
        </div>
      )}
    </div>
  );
};

export default TextItem;
