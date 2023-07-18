/**
 * @generated SignedSource<<6d82000cca42fd97b302c69162b8924b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type colorSchemeFragment$data = {
  readonly colorPool: ReadonlyArray<string>;
  readonly fields: ReadonlyArray<{
    readonly colorByAttribute: boolean;
    readonly fieldColor: string;
    readonly path: string;
    readonly valueColors: ReadonlyArray<{
      readonly color: string;
      readonly value: string;
    }>;
  }> | null;
  readonly " $fragmentType": "colorSchemeFragment";
};
export type colorSchemeFragment$key = {
  readonly " $data"?: colorSchemeFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"colorSchemeFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "colorSchemeFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "colorPool",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "CustomizeColor",
      "kind": "LinkedField",
      "name": "fields",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "colorByAttribute",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "fieldColor",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "path",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "ValueColor",
          "kind": "LinkedField",
          "name": "valueColors",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "color",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "value",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "ColorScheme",
  "abstractKey": null
};

(node as any).hash = "d97bb99cef1d4ef65508882017ae8831";

export default node;
