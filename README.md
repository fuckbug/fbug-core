# Rsbuild project

## Setup

Install the dependencies:

```bash
yarn install
```

Build lib:

```bash
yarn compile
```


##  Example

### Basic usage
```ts
const plugins = [
  new FBugPlugin({
    dsn: "123456",
    apiKey: "",
    reportUrl: "",
  })
]

new FBugSDK(plugins);
```

### Create own plugin
```ts
class TelegramPlugin extends Plugin {
  warn(...args: any[]): void {
    //send to telegram warn
  }
  error(...args: any[]): void {
    //send to telegram error
  }
}

const plugins = [
  new FBugPlugin({
    dsn: "123456",
    apiKey: "",
    reportUrl: "",
  }),

  new TelegramPlugin()
]

new FBugSDK(plugins);
```
