"""
FiftyOne Server mutations

| Copyright 2017-2022, Voxel51, Inc.
| `voxel51.com <https://voxel51.com/>`_
|
"""
from dataclasses import asdict
import strawberry as gql
import typing as t

import eta.core.serial as etas

import fiftyone as fo
import fiftyone.constants as foc
from fiftyone.core.session.events import StateUpdate
import fiftyone.core.view as fov

from fiftyone.server.data import Info
from fiftyone.server.events import get_state, dispatch_event
from fiftyone.server.query import Dataset
from fiftyone.server.scalars import BSONArray


@gql.input
class SelectedLabel:
    field: str
    label_id: str
    sample_id: str
    frame_number: t.Optional[int] = None


@gql.type
class ViewResponse:
    view: BSONArray
    dataset: Dataset
    view_name: t.Optional[str] = None


@gql.type
class Mutation:
    @gql.mutation
    async def set_dataset(
        self,
        subscription: str,
        session: t.Optional[str],
        name: t.Optional[str],
        info: Info,
    ) -> bool:
        state = get_state()
        state.dataset = fo.load_dataset(name) if name is not None else None
        state.selected = []
        state.selected_labels = []
        state.view = None
        await dispatch_event(subscription, StateUpdate(state=state))
        return True

    @gql.mutation
    async def set_selected(
        self,
        subscription: str,
        session: t.Optional[str],
        selected: t.List[str],
    ) -> bool:
        state = get_state()

        state.selected = selected
        await dispatch_event(subscription, StateUpdate(state=state))
        return True

    @gql.mutation
    async def set_selected_labels(
        self,
        subscription: str,
        session: t.Optional[str],
        selected_labels: t.List[SelectedLabel],
    ) -> bool:
        state = get_state()

        state.selected_labels = [asdict(l) for l in selected_labels]
        await dispatch_event(subscription, StateUpdate(state=state))
        return True

    @gql.mutation
    async def set_view(
        self,
        subscription: str,
        session: t.Optional[str],
        view_stages: BSONArray,
        view_name: t.Optional[str],
        dataset_name: str,
        info: Info,
    ) -> ViewResponse:
        state = get_state()
        state.selected = []
        state.selected_labels = []
        if view_name and state.dataset.has_view(view_name):
            state.view = state.dataset.load_view(view_name)
        else:
            state.view = fov.DatasetView._build(state.dataset, view_stages)
        await dispatch_event(subscription, StateUpdate(state=state))
        dataset = await Dataset.resolver(
            name=state.dataset.name,
            view_stages=view_stages,
            view_name=view_name if view_name else state.view.name,
            info=info,
        )
        return ViewResponse(
            # TODO: should this be view_stages?
            view_stages=state.view._serialize(),
            dataset=dataset,
            view_name=view_name if view_name else state.view.name,
        )

    @gql.mutation
    async def store_teams_submission(self) -> bool:
        etas.write_json({"submitted": True}, foc.TEAMS_PATH)
        return True

    @gql.mutation
    async def set_group_slice(
        self,
        subscription: str,
        session: t.Optional[str],
        view_stages: BSONArray,
        view_name: t.Optional[str],
        slice: str,
        info: Info,
    ) -> Dataset:
        state = get_state()
        state.dataset.group_slice = slice
        await dispatch_event(subscription, StateUpdate(state=state))
        return await Dataset.resolver(
            name=state.dataset.name,
            view_stages=view_stages,
            view_name=view_name if view_name else state.view.name,
            info=info,
        )
