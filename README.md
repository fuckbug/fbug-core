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
  })
]

const fbug = new FBugSDK(plugins, {
  logReports: {
    log: false,
    warn: true,
    error: true,
  }
});

fbug.reportInfo('Info message', { message: 'All good' })
fbug.reportDebug('Debug message', { message: 'All fine' })
fbug.reportWarn('Warn message', { message: 'So so' })
fbug.reportError('Error message', { message: 'Ay, Caramba!' })
```

### Create own plugin
```ts
class TelegramPlugin extends Plugin {
  log(...args: any[]): void {
    //send to telegram log
  }
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
