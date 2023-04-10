import {
  configFragment,
  configFragment$data,
  configFragment$key,
  graphQLSyncFragmentAtom,
} from "@fiftyone/relay";
import { RGB } from "@fiftyone/utilities";
import { selector } from "recoil";

const configData = graphQLSyncFragmentAtom<
  configFragment$key,
  configFragment$data
>(
  { fragments: [configFragment] },
  {
    key: "configData",
    default: null,
  }
);

export const colorscale = selector<RGB[]>({
  key: "colorscale",
  get: ({ get }) => {
    return get(configData).colorscale as RGB[];
  },
});

export const config = selector({
  key: "config",
  get: ({ get }) => get(configData).config,
});

export const colorPool = selector({
  key: "colorPool",
  get: ({ get }) => get(config).colorPool,
});
