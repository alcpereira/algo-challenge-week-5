import type { MetaFunction } from "@remix-run/node";
import { ClipboardEvent, useMemo, useState } from "react";
import Background from "~/components/Background";
import useMousePosition from "~/hooks/useMousePosition";
import Cursor from "~/components/Cursor";
import Footer from "~/components/Footer";
import { Highlight, themes } from "prism-react-renderer";
import type { Payload } from "utils/converter";
import "~/styles/main.css";

export const meta: MetaFunction = () => {
  return [
    { title: "Copy Pasta Challenge" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

/** Box containing code displayed on the page (absolute positionning) */
type Box = {
  /** X positioning on the page */
  x: number;
  /** Y positioning on the page */
  y: number;
} & Payload;

export default function Index() {
  const mousePosition = useMousePosition();
  const [boxes, setBoxes] = useState<Box[]>([]);
  const [currentPayload, setCurrentPayload] = useState<Payload>({} as Payload);

  const renderBackground = useMemo(() => <Background />, []);
  const renderBoxes = useMemo(() => {
    return boxes.map((b, index) => (
      <div
        key={index}
        className="box"
        style={{ position: "absolute", top: b.y, left: b.x }}
      >
        <Highlight
          theme={themes.shadesOfPurple}
          code={b.string}
          language={b.currentDataFormat.replace("text/", "")}
        >
          {({ style, tokens, getLineProps, getTokenProps }) => (
            <pre style={style}>
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </div>
    ));
  }, [boxes]);

  const handlePaste = async (e: ClipboardEvent) => {
    if (!currentPayload.currentDataFormat || !currentPayload.string) return;
    const data = await fetch("/convert", {
      method: "POST",
      body: JSON.stringify(currentPayload),
    });
    const payload: Payload = await data.json();

    // To be investigated later
    // const item = new ClipboardItem({
    //   [payload.currentDataFormat]: new Blob(payload.string.split(" "), {
    //     type: payload.currentDataFormat,
    //   }),
    // });
    // await navigator.clipboard.write([item]);

    e.clipboardData.setData(payload.currentDataFormat, payload.string);
    setCurrentPayload(payload);
    setBoxes([
      ...boxes,
      {
        string: payload.string,
        currentDataFormat: payload.currentDataFormat,
        x: mousePosition.x,
        y: mousePosition.y,
      },
    ]);
  };

  const handleCopy = (e: ClipboardEvent) => {
    if (
      (!currentPayload.string && !currentPayload.currentDataFormat) ||
      e.currentTarget.tagName === "textarea"
    ) {
      const dataSelected = window.getSelection()?.toString();
      // This works for text only?!
      e.clipboardData.setData("text/plain", dataSelected || "");
      setCurrentPayload({
        string: dataSelected || "",
        currentDataFormat: "text/plain",
      });
    } else {
      e.clipboardData.setData(
        currentPayload.currentDataFormat,
        currentPayload.string,
      );
    }
  };

  return (
    <>
      {renderBackground}
      <div className="container" onPaste={handlePaste} onCopy={handleCopy}>
        <div className="overlay">{renderBoxes}</div>
        <Cursor
          mousePosition={mousePosition}
          dataFormat={currentPayload.currentDataFormat}
        />
        <div className="ui">
          <textarea defaultValue={"Copy and paste me 👀"} />
        </div>
      </div>
      <Footer />
    </>
  );
}
