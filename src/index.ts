// import api, { addTokenToURL } from './api.ts';
// import { useFieldsStore } from './stores/fields';
// import { useRelationsStore } from './stores/relations';	
// import { useServerStore } from './stores/server';
// import { getRootPath } from './utils/get-root-path';
// import { translate } from './utils/translate-literal';
// import { useCollection, useFilterFields, useItems, useSync } from '@directus/composables';
// import { User } from '@directus/types';
import { defineLayout, getEndpoint, getRelationType, moveInArray } from '@directus/utils';
// import { computed, ref, toRefs, watch } from 'vue';
import KanbanActions from './actions.vue';
import KanbanLayout from './kanban.vue';
import KanbanOptions from './options.vue';
import type { ChangeEvent, Group, Item, LayoutOptions, LayoutQuery } from './types';

export default defineLayout<LayoutOptions, LayoutQuery>({
	id: 'kanban',
	// name: '$t:layouts.kanban.name',
	name : '7SpanKanban',
	icon: 'view_week',
	component: KanbanLayout,
	headerShadow: false,
	sidebarShadow: true,
	slots: {
		options: KanbanOptions,
		sidebar: () => undefined,
		actions: KanbanActions,
	}
});
