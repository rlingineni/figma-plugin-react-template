import { FigmaEvents, FigmaMessageCommands } from "../types/commands";

interface FigmaCommandDetails {
  command: FigmaMessageCommands | FigmaEvents;
  requestId?: string;
}

export interface FigmaUIMessage {
  commandDetails: FigmaCommandDetails;
  args: any;
  customCommand?: boolean;
}

const PREVIEW_ENV = process.env.PREVIEW_ENV;

figma.showUI(__html__);

if (PREVIEW_ENV === "figma") {
  figma.ui.resize(300, 200);
} else {
  figma.ui.resize(320, 390);
}

// generate a message with the data for the UI
function sendResponse(commandDetails: FigmaCommandDetails, data: any) {
  const msg = {
    command: commandDetails.command,
    data,
    requestId: commandDetails.requestId,
  };

  figma.ui.postMessage(msg);
}

figma.on("selectionchange", () => {
  sendResponse({ command: "selectionchange" }, "");
});

figma.ui.onmessage = async (msg: FigmaUIMessage) => {
  const { commandDetails, args } = msg;
  if (!commandDetails.command) return;
  try {
    switch (commandDetails.command) {
      case "get-selected-text":
        {
          const selectedTextNodes = figma.currentPage.selection
            .filter((node) => node.type === "TEXT")
            .map((node: TextNode) => ({
              id: node.id,
              text: node.characters,
            }));

          sendResponse(msg.commandDetails, selectedTextNodes);
        }
        break;
      case "update-text":
        {
          const { id, text } = args;
          const textNode = <TextNode>figma.getNodeById(id);

          await Promise.all(
            textNode
              .getRangeAllFontNames(0, textNode.characters.length)
              .map(figma.loadFontAsync)
          );

          textNode.characters = text;
          sendResponse(msg.commandDetails, true);
        }
        break;
      case "get-current-user":
        {
          sendResponse(msg.commandDetails, {
            ...figma.currentUser,
            fileKey: figma.fileKey,
          });
        }
        break;
    }
  } catch (ex) {
    console.log(ex);
  }
};
