export type SupportedTypes = "text/html" | "text/plain" | "text/xml";

const convertionMapping: Record<
  SupportedTypes,
  { target: SupportedTypes; convert: (_: string) => Payload }
> = {
  "text/plain": { target: "text/html", convert: textToHtml },
  "text/html": { target: "text/xml", convert: htmlToXml },
  "text/xml": { target: "text/plain", convert: xmlToText },
};

export type Payload = {
  string: string;
  currentDataFormat: string;
};

function textToHtml(text: string): Payload {
  return {
    currentDataFormat: "text/html",
    string: `<html><body>${text.replace(/\n/g, "<br>")}</body></html>`,
  };
}

function htmlToXml(html: string): Payload {
  return {
    currentDataFormat: "text/xml",
    string: html
      .replace("<html><body>", "<xml>")
      .replace("</body></html>", "</xml>"),
  };
}

function xmlToText(xml: string): Payload {
  return {
    currentDataFormat: "text/plain",
    string: xml.replace("<xml>", "").replace("</xml>", ""),
  };
}

export function convert(payload: Payload): Payload {
  const { string, currentDataFormat } = payload;
  if (!currentDataFormat || !(currentDataFormat in convertionMapping)) {
    throw new Error("Unsupported type");
  }
  const { convert } = convertionMapping[currentDataFormat];
  return convert(string);
}
