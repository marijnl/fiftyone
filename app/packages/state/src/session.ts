import { subscribe } from "@fiftyone/relay";
import { SpaceNodeJSON } from "@fiftyone/spaces";
import { useEffect } from "react";
import { atom, DefaultValue, RecoilState, selector } from "recoil";
import { filters, State } from "./recoil";

export interface Session {
  canEditSavedViews?: boolean;
  readOnly?: boolean;
  selectedSamples?: Set<string>;
  selectedLabels?: State.SelectedLabel[];
  sessionSpaces?: SpaceNodeJSON;
}

type Setter = <K extends keyof Session>(key: K, value: Session[K]) => void;

type SessionAtomOptions<K extends keyof Session> = {
  key: K;
  default: Session[K];
};

const sessionRef: Session = {};
let setterRef: Setter;

type Setters<K extends keyof Session = keyof Session> = Partial<{
  [key in K]: (value: Session[K]) => void;
}>;
const setters: Setters = {};

export const useSession = (setter: Setter) => {
  setterRef = setter;

  useEffect(() => {
    return subscribe((_, { reset }) => {
      reset(filters);
    });
  }, []);

  return <K extends keyof Session>(key: K, value: Session[K]) => {
    const setter = setters[key];
    setter && setter(value);
    sessionRef[key] = value;
  };
};

export function sessionAtom<K extends keyof Session>(
  options: SessionAtomOptions<K>
) {
  const value = atom<Session[K]>({
    ...options,
    effects: [
      ({ setSelf, trigger }) => {
        if (trigger === "get") {
          setSelf(
            sessionRef[options.key] === undefined
              ? options.default
              : sessionRef[options.key]
          );
        }

        // @ts-ignore
        setters[options.key] = (value: Session[K]) => setSelf(value);

        return subscribe((_, { set }) => {
          set(
            value,
            sessionRef[options.key] === undefined
              ? options.default
              : sessionRef[options.key]
          );
        });
      },
    ],
  });

  return selector<Session[K]>({
    key: `__${options.key}_SELECTOR`,
    get: ({ get }) => get(value),
    set: ({ set }, newValue) => {
      if (newValue instanceof DefaultValue) {
        newValue = options.default;
      }

      setterRef(options.key, newValue);
      set(value, newValue);
    },
  }) as RecoilState<NonNullable<Session[K]>>;
}
