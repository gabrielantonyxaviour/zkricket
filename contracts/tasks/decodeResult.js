const { decodeResult, ReturnType } = require("@chainlink/functions-toolkit");

task("decode-result", "Decodes hex string to string").setAction(
  async (taskArgs) => {
    const hexString =
      "0x45786563204572726F723A2073796E746178206572726F722C2052414D2065786365656465642C206F72206F74686572206572726F72";
    const decodedResponse = decodeResult(hexString, ReturnType.string);
    console.log(decodedResponse);
  }
);
