# AlgoChallenge 5

## Concept
Convert MIME types from: `text/plain` > `text/html` > `text/xml` then loop back.
Using a very simple converter in `utils/converter.ts`

## Original idea
Using stegonography for `image/png` and fulfill a lossless loop with `text/plain` and `text/html`.

## Known bugs
This is not 100% working, I realized too late that `ClipboardEvent.clipboardData` methods for example `setData` does not correspond to `Clipboard.write` + not [fully supported by browsers](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard#browser_compatibility).

Not fulfilling completely the objective, but at least the backend is working (very very simply). Again, I should start sooner 😅

## Key Learnings
- Clipboard events and API
- New library discovered: Prism for formatting

## To go further
- Finish the original loop of data as you can send `Blob` and `ReadableStream` to the clipboard (client) and also to the backend (without parsing the `req.body` through `.json()` method provided by Express)
- Play around with steganography as a producer and not a consumer (CTF participant)
- Make a better converter using AST