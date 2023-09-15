import onSetDataset from "./onSetDataset";
import onSetRefreshPage from "./onSetRefreshPage";
import onSetSimilarityParameters from "./onSetSimilarityParameters";
import onSetView from "./onSetView";
import onSetViewName from "./onSetViewName";
import registerSetter from "./registerSetter";

registerSetter("datasetName", onSetDataset);
registerSetter("refreshPage", onSetRefreshPage);
registerSetter("similarityParameters", onSetSimilarityParameters);
registerSetter("view", onSetView);
registerSetter("viewName", onSetViewName);

export { default } from "./useSetters";
