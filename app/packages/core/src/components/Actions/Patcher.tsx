import React, { useState } from "react";
import { selector, useRecoilCallback, useRecoilValue } from "recoil";
import { useSpring } from "@react-spring/web";

import {
  CLIPS_FRAME_FIELDS,
  CLIPS_SAMPLE_FIELDS,
  EMBEDDED_DOCUMENT_FIELD,
  PATCHES_FIELDS,
} from "@fiftyone/utilities";

import { useSetView } from "@fiftyone/state";
import {
  OBJECT_PATCHES,
  EVALUATION_PATCHES,
  CLIPS_VIEWS,
} from "../../utils/links";

import Popout from "./Popout";
import { ActionOption } from "./Common";
import { SwitcherDiv, SwitchDiv } from "./utils";
import { useTheme } from "@fiftyone/components";
import * as fos from "@fiftyone/state";

export const patchesFields = selector<string[]>({
  key: "patchesFields",
  get: ({ get }) => {
    const paths = get(fos.labelFields({}));
    return paths.filter((p) =>
      get(
        fos.meetsType({
          path: p,
          ftype: EMBEDDED_DOCUMENT_FIELD,
          embeddedDocType: PATCHES_FIELDS,
        })
      )
    );
  },
});

export const clipsFields = selector<string[]>({
  key: "clipsFields",
  get: ({ get }) =>
    [
      ...get(
        fos.fieldPaths({
          space: fos.State.SPACE.FRAME,
          ftype: EMBEDDED_DOCUMENT_FIELD,
          embeddedDocType: CLIPS_FRAME_FIELDS,
        })
      ),
      ...get(
        fos.fieldPaths({
          space: fos.State.SPACE.SAMPLE,
          ftype: EMBEDDED_DOCUMENT_FIELD,
          embeddedDocType: CLIPS_SAMPLE_FIELDS,
        })
      ),
    ].sort(),
});

const evaluationKeys = selector<string[]>({
  key: "evaluationKeys",
  get: ({ get }) => {
    return get(fos.dataset).evaluations.map(({ key }) => key);
  },
});

const useToPatches = () => {
  const onComplete = useRecoilCallback(
    ({ set }) =>
      () => {
        set(fos.patching, false);
      },
    []
  );
  const setView = useSetView(true, true, onComplete);
  return useRecoilCallback(
    ({ set }) =>
      async (field) => {
        set(fos.patching, true);
        setView(
          (v) => v,
          [
            {
              _cls: "fiftyone.core.stages.ToPatches",
              kwargs: [
                ["field", field],
                ["_state", null],
              ],
            },
          ]
        );
      },
    []
  );
};

const useToClips = () => {
  const onComplete = useRecoilCallback(
    ({ set }) =>
      () => {
        set(fos.patching, false);
      },
    []
  );
  const setView = useSetView(true, true, onComplete);
  return useRecoilCallback(
    ({ set }) =>
      async (field) => {
        set(fos.patching, true);
        setView(
          (v) => v,
          [
            {
              _cls: "fiftyone.core.stages.ToClips",
              kwargs: [
                ["field_or_expr", field],
                ["_state", null],
              ],
            },
          ]
        );
      },
    []
  );
};

const useToEvaluationPatches = () => {
  const onComplete = useRecoilCallback(
    ({ set }) =>
      () => {
        set(fos.patching, false);
      },
    []
  );
  const setView = useSetView(true, true, onComplete);
  return useRecoilCallback(
    ({ set }) =>
      async (evaluation) => {
        set(fos.patching, true);
        setView(
          (v) => v,
          [
            {
              _cls: "fiftyone.core.stages.ToEvaluationPatches",
              kwargs: [
                ["eval_key", evaluation],
                ["_state", null],
              ],
            },
          ]
        );
      },
    []
  );
};

const LabelsClips = ({ close }) => {
  const fields = useRecoilValue(clipsFields);
  const toClips = useToClips();

  return (
    <>
      {fields.map((field) => {
        return (
          <ActionOption
            key={field}
            text={field}
            title={`Switch to clips view for the "${field}" field`}
            onClick={() => {
              close();
              toClips(field);
            }}
          />
        );
      })}
      <ActionOption
        key={0}
        text={"About clips views"}
        title={"About clips views"}
        href={CLIPS_VIEWS}
      />
    </>
  );
};

const LabelsPatches = ({ close }) => {
  const fields = useRecoilValue(patchesFields);
  const toPatches = useToPatches();

  return (
    <>
      {fields.map((field) => {
        return (
          <ActionOption
            key={field}
            text={field}
            title={`Switch to patches view for the "${field}" field`}
            onClick={() => {
              close();
              toPatches(field);
            }}
          />
        );
      })}
      <ActionOption
        key={0}
        text={"About patch views"}
        title={"About patch views"}
        href={OBJECT_PATCHES}
      />
    </>
  );
};

const EvaluationPatches = ({ close }) => {
  const evaluations = useRecoilValue(evaluationKeys);
  const toEvaluationPatches = useToEvaluationPatches();

  return (
    <>
      {evaluations.map((evaluation) => {
        return (
          <ActionOption
            key={evaluation}
            text={evaluation}
            title={`Switch to evaluation patches view for the "${evaluation}" evaluation`}
            onClick={() => {
              close();
              toEvaluationPatches(evaluation);
            }}
          />
        );
      })}
      <ActionOption
        key={0}
        text={"About evaluation views"}
        title={"About evaluation views"}
        href={EVALUATION_PATCHES}
      />
    </>
  );
};

type PatcherProps = {
  close: () => void;
};

const Patcher = ({ bounds, close }: PatcherProps) => {
  const theme = useTheme();
  const isVideo =
    useRecoilValue(fos.isVideoDataset) && useRecoilValue(fos.isRootView);
  const isClips = useRecoilValue(fos.isClipsView);
  const [labels, setLabels] = useState(true);

  const labelProps = useSpring({
    borderBottomColor: labels
      ? theme.primary.plainColor
      : theme.background.level2,
    cursor: labels ? "default" : "pointer",
  });
  const evaluationProps = useSpring({
    borderBottomColor: labels
      ? theme.background.level2
      : theme.primary.plainColor,
    cursor: labels ? "pointer" : "default",
  });
  return (
    <Popout modal={false} bounds={bounds}>
      <SwitcherDiv>
        <SwitchDiv
          style={labelProps}
          onClick={() => !labels && setLabels(true)}
        >
          Labels
        </SwitchDiv>
        {!isVideo && (
          <SwitchDiv
            style={evaluationProps}
            onClick={() => labels && setLabels(false)}
          >
            Evaluations
          </SwitchDiv>
        )}
      </SwitcherDiv>
      {labels && (isVideo || isClips) && <LabelsClips close={close} />}
      {labels && !isVideo && !isClips && <LabelsPatches close={close} />}
      {!labels && <EvaluationPatches close={close} />}
    </Popout>
  );
};

export default React.memo(Patcher);
