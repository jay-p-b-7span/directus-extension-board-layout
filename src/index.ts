import { defineLayout, useSync } from "@directus/extensions-sdk";
import BoardLayout from "./boardLayout.vue";
import OptionSlotItems from "./optionSlotItems.vue";
import ActionSlotItems from "./actionSlotItems.vue";
import { LayoutOptions, LayoutQuery } from "./types";

export default defineLayout<LayoutOptions, LayoutQuery | null>({
  id: "board-layout",
  name: "Board",
  icon: "box",
  component: BoardLayout,
  slots: {
    options: OptionSlotItems,
    sidebar: () => null,
    actions: ActionSlotItems,
  },
  setup(props, { emit }) {
    console.log("🚀 ~ file: index.ts:18 ~ setup ~ props:", props)
    const layoutOptions = useSync(props, "layoutOptions", emit);
    console.log("🚀 ~ file: index.ts:19 ~ setup ~ layoutOptions:", layoutOptions)

    const groupByField = layoutOptions.value?.groupByField;
    const headerTemplate = layoutOptions.value?.headerTemplate;
    const cardContentTemplate = layoutOptions.value?.cardContentTemplate;
    console.log("🚀 ~ file: index.ts:24 ~ setup ~ cardContentTemplate:", cardContentTemplate)

    return { groupByField, headerTemplate, cardContentTemplate };
  },
});
