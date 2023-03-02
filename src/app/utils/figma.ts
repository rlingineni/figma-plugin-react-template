import { FigmaEvents, FigmaMessageCommands } from "../../types/commands";
import * as EventEmitter from "events";

export interface FigmaCommand {
  command: FigmaEvents | FigmaMessageCommands;
  onResponse?: (data: any) => void;
}

const figmaResponses = new EventEmitter();

// all messages are handled on an event emitter bus and we append a hidden request ID to avoid race conditions
window.addEventListener("message", (event) => {
  const resp = event.data.pluginMessage;

  if (resp) {
    const { command, requestId, data } = resp;
    let channelId = command;

    if (requestId) {
      channelId += "-" + requestId;
    }
    figmaResponses.emit(channelId, { data, requestId });
  }
});

//
// initialize the message handler
// blah.emit('message', run the command)

// in the Figma Helper script, listen for the message event

export class FigmaHelper {
  constructor(private hookCommands: FigmaCommand[]) {
    this.routeCallHandlers();
  }

  run(command: FigmaMessageCommands, args?: any): Promise<any> {
    // random number to identify the request
    const generatedRequestId = Math.floor(Math.random() * 1000);

    parent.postMessage(
      {
        pluginMessage: {
          commandDetails: { command, requestId: generatedRequestId },
          args,
        },
      },
      "*"
    );

    // to-do: add no resp timeout
    return new Promise((resolve) => {
      // resolve the promise with the data if the request ID matches
      figmaResponses.once(
        command + "-" + generatedRequestId,
        ({ data, requestId }) => {
          resolve(data);
        }
      );
    });
  }

  private routeCallHandlers() {
    for (const cmd of this.hookCommands) {
      figmaResponses.on(cmd.command, ({ data }) => {
        // callback the command handler
        if (cmd.onResponse) cmd.onResponse(data);
      });
    }
  }
}
