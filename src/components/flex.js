import { convertUnit, unit } from "../helpers";
import { PLACE_ATTRS } from "../attrs";
import NuBlock from "./block";

export const FLEX_MAP = {
  row: "margin-right",
  column: "margin-bottom",
  "row-reverse": "margin-left",
  "column-reverse": "margin-top"
};

class NuFlex extends NuBlock {
  static get nuTag() {
    return "nu-flex";
  }

  static get nuDisplay() {
    return "flex";
  }

  static get nuDefaultFlow() {
    return "row";
  }

  static get nuAttrs() {
    return {
      ...PLACE_ATTRS,
      flow(val) {
        if (!val) return;

        const dirStyle = FLEX_MAP[val];

        return [
          { "flex-flow": `${val} nowrap` },
          {
            $suffix: ">:not(:last-child)",
            [dirStyle]: "var(--nu-flex-gap)"
          }
        ];
      },
      gap(val) {
        val = val || "0rem";

        return { $suffix: ">*", "--nu-flex-gap": convertUnit(val) };
      },
      order: "order",
      "items-basis": unit("flex-basis", "basis"),
      "items-grow"(val) {
        return {
          $suffix: ":not([grow])",
          "flex-grow": val
        };
      },
      "items-shrink"(val) {
        return {
          $suffix: ":not([shrink])",
          "flex-shrink": val
        };
      }
    };
  }

  static nuCSS({ nuTag, nuDefaultFlow }) {
    const dirStyle = FLEX_MAP[nuDefaultFlow];

    return `
      ${nuTag}:not([flow]){flex-flow: ${nuDefaultFlow} nowrap;}
      ${nuTag}:not([gap])>*{--nu-flex-gap:0rem;}
      ${nuTag}>:not(:last-child){${dirStyle}:var(--nu-flex-gap);}
    `;
  }

  nuGenerate(name, value) {
    let styles = super.nuGenerate(name, value) || [];

    return styles;
  }
}

export default NuFlex;
