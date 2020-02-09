# fastbin

Painless, self-hosted, modern alternative to [Hastebin](https://hastebin.com/).

## How to Use

Just paste your code or text, click save, and you're ready to go! You can also select
a programming language from the dropdown. You can click on the "Raw" button to view
only the contents, without any UI stuff.

fastbin uses [Monaco](https://microsoft.github.io/monaco-editor/) as its editor, which
is the editor used by Visual Studio Code. This offers great functionality and syntax
highlighting support.

You can also clone a document using the Clone button.

When viewing documents, the syntax highlighter works based on the ending of the URL.
For example, if I have a JavaScript file with the key "foobar", I can append ".js"
to the end of the URL and it will highlight it as JavaScript. Appending .js to the
raw URL will obviously not work, it expects only the key to be provided.

## Compatibility with Haste clients

fastbin was designed to be compatible with most Hastebin clients. If your client
support specifying a custom server, you can specify your self-hosted fastbin URL and
it should work just fine.

## Duration

Currently, files are stored for an indefinite amout of time. This might change in the
future (possibly as a custom config option).

## Privacy

Please do NOT post any of your secret keys or passwords to a fastbin server. Every URL
is unlisted, but again, available for the public.

## Todo

* S3 storage support
* Optimizations (especially for frontend builds)
* Unit tests
* Private snippet hosting
* PWA
* Create Dockerized version

## Self Hosting

**1. Clone the repository**

```
git clone git@github.com:jozsefsallai/fastbin.git
cd fastbin
```

**2. Install the dependencies**

```
npm install
```

**3. Configure your fastbin server**

```
cp config.development.json config.production.json
nano config.production.json
```

**4. Build for production**

```
npm run prod
```

*Note: currently, production builds are very slow due to how big Monaco's codebase is.*
*I'm looking into optimizing build times in the future.*

**5. Start the server**

```
node index.js
```

For production environments, I recommend that you use a tool such as PM2 to keep your
fastbin server running 24/7.

## Contribution

Contribution is more than welcome and appreciated! If you want to contribute, you can
[file a bug report](https://github.com/jozsefsallai/fastbin/issues/new) or
[submit a pull request](https://github.com/jozsefsallai/fastbin/pulls).

## License

MIT.
