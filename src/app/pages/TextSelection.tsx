import * as React from "react";
import { useEffect, useState } from "react";
import { FigmaEvents } from "../../types/commands";
import TextItem from "../components/TextItem";
import { FigmaHelper } from "../utils/figma";

function TextSelection() {
  const [selectedTextNodes, setSelectedTextNodes] = useState<
    { id: string; text: string }[]
  >([]);

  // putting the helper on the state variable because we don't want to re-create on every render
  const [figmaHelper, setFigmaHelper] = React.useState(new FigmaHelper([]));

  // since in this UI we care about events, defining the handlers on initial render
  useEffect(() => {
    const figmaCommands = [
      {
        command: "selectionchange" as FigmaEvents,
        onResponse: () => {
          // do some work here
          console.log("change selection...");
          getSelectedText();
        },
      },
    ];

    setFigmaHelper(new FigmaHelper(figmaCommands));
  }, []);

  const getSelectedText = async () => {
    const selectedNodes = await figmaHelper.run("get-selected-text");

    setSelectedTextNodes(selectedNodes);
  };

  const handleUpdateText = async (figmaNodeID, updatedText) => {
    await figmaHelper.run("update-text", {
      id: figmaNodeID,
      text: updatedText,
    });
    getSelectedText();
  };

  return (
    <div className="container">
      <div className="flex flex-col items-center mb-6 bg-red-200 p-6">
        <img src={require("../assets/logo.svg").default} />
        <h2 className="text-center text-xl font-bold">Update Text App</h2>
      </div>

      <div>
        {selectedTextNodes.length === 0 && (
          <div className="text-center text-sm">
            Select some text in Figma that you wish to edit.
          </div>
        )}
        <div className="textList">
          {selectedTextNodes.map((node, index) => (
            <TextItem
              key={index}
              node={node}
              handleUpdateText={handleUpdateText}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default TextSelection;
