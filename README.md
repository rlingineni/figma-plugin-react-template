# figma-plugin-react-template

This builds on the work of a live reloading Figma plugin from the [Ditto](https://github.com/dittowords/figma-plugin-react-template) team (which is pure genius) to add a few more enhancements with:

- Support for Tailwind CSS w/ incremental CSS
- Plugin Helper to send commands synchronously without onMessage stuff
- Type Support for Plugin Commands that work across the UI and Controller Code
- React Router support for multiple pages
- Zustand based state management

### Getting Started

1. `yarn preview`
   Open Figma and run the plugin, and the browser should automatically open. Make sure to open the plugin in Figma as well. It'll be a smaller window

2. `yarn watch`
   This is the plugin that you'll publish to figma

3. `yarn compare`
   You can open the web view and the actual plugin in Figma. However the web version won't be updated with live data

### Communicating from UI to Code

There's a convenient `FigmaHelper` class that makes life easy. Otherwise you'll be using `plugin.onMessage` and trying to handle responses in an async manner.

In your React Code:

In `app/home.tsx`

```javascript
const figmaHelper = new FigmaHelper([]);
const currentUser = await figmaHelper.run("get-current-user");
```

In `plugin/Controller.ts`

```javascript
// add your command to the switch statement
figma.ui.onmessage = async (msg: FigmaUIMessage) => {
    const {commandDetails, args} = msg;
      switch (commandDetails.command) {
      case 'get-current-user':
        {
           sendResponse(msg.commandDetails, {...figma.currentUser, fileKey: figma.fileKey});
        }
      break;
      }
   })
```

In `typings/commands.ts`

```typescript
export type FigmaMessageCommands = "get-current-user" | "another-command";
```

### Live reload Demo

![Screen Recording 2021-05-05 at 03 46 11 PM](https://user-images.githubusercontent.com/7476817/117219079-5c0f6580-adb9-11eb-9cfd-6e803d93e3ca.gif)
![Screen Recording 2021-05-05 at 03 45 16 PM](https://user-images.githubusercontent.com/7476817/117219001-32563e80-adb9-11eb-839d-d8cde22e5dd1.gif)

## Troubleshooting

- Ensure that only a _single_ instance of the 'Preview App' is running in your browser and Figma. Multiple instances, can cause an infite feedback loop of messaages to occur.
- The indicator light on the 'Preview App' will turn red if the connection to the websocket server goes down. It will turn green once it reconnects
- If you wish to make changes to the 'preview-server.js' you will need to stop and rerun `yarn preview:browser`
