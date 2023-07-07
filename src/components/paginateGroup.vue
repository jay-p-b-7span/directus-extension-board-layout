<template>
    <section>
        <header>
            <component
                :is="`display-${field?.meta?.display}`"
                v-bind="field?.meta?.display_options"
                :type="field?.type"
                :value="fieldValue"
            />

            <span>Total Price {{ totalPrice }}</span>
        </header>
        <main class="paginate-units">
            <paginate-unit
                v-for="page in pages"
                :key="page"
                :page="page"
                :collection-key="collectionKey"
                :field="field"
                :field-value="fieldValue"
                :layout-options="layoutOptions"
                :filter="filter"
                :search="search"
                @has-next-page="hundleHasNextPage"
            />
        </main>
    </section>
</template>

<script lang="ts">
import { Field, Filter, LogicalFilterAND } from "@directus/shared/types";
import { computed, defineComponent, PropType, ref, toRefs, watch } from "vue";
import { LayoutOptions } from "../types";
import PaginateUnit from "./paginateUnit.vue";
import { useItems } from "@directus/extensions-sdk";

export default defineComponent({
    components: { PaginateUnit },
    inheritAttrs: false,
    props: {
        collection: { type: String, required: true },
        field: { type: Object as PropType<Field>, required: true },
        fieldValue: { type: String, required: true },
        layoutOptions: {
            type: Object as PropType<LayoutOptions>,
            required: true,
        },
        filter: {
            type: Object as PropType<Filter | null>,
            default: null,
        },
        search: {
            type: String as PropType<string | null>,
            default: null,
        },
    },
    setup(props) {
        const {
            fieldValue,
            field,
            filter: originFilter,
            collection: collectionKey,
            search,
            layoutOptions,
        } = toRefs(props);
        // console.log(
        //     "🚀 ~ file: paginateGroup.vue:64 ~ setup ~ fieldValue:",
        //     fieldValue
        // );
        // console.log("🚀 ~ file: paginateGroup.vue:64 ~ setup ~ field:", field);
        const pages = ref([1]);

        const totalPrice = ref();

        const filter = computed<LogicalFilterAND>(() => ({
            _and: [
                { [field.value.field]: { _eq: fieldValue.value } },
                originFilter.value || {},
            ],
        }));

        const sort = computed(() => layoutOptions.value?.sort);

        const { items } = useItems(collectionKey, {
            limit: -1,
            fields: ["*"],
        });

        watch(
            [items],
            () => {
                totalPrice.value = items.value.reduce((total, item) => {
                    console.log(
                        "🚀 ~ file: paginateGroup.vue:90 ~ totalPrice ~ item:",
                        item
                    );

                    return total + item.price;
                }, 0);
                console.log(
                    "🚀 ~ file: paginateGroup.vue:95 ~ totalPrice  🎉🎉🎉🎉🎉🎉🎉🎉 ~ totalPrice:",
                    totalPrice.value
                );
            },
            { deep: true, immediate: true }
        );

        // console.log("🚀 ~ file Items 🎉🎉🎉🎉🎉🎉🎉🎉", items);

        watch([filter, sort, search], (after, before) => {
            if (JSON.stringify(after) != JSON.stringify(before)) {
                pages.value = [1];
            }
        });

        function hundleHasNextPage(page: number) {
            pages.value = [...new Set([...pages.value, page])];
        }

        return { pages, collectionKey, hundleHasNextPage, totalPrice };
    },
});
</script>

<style scoped>
section {
    background-color: var(--background-subdued);
    border-radius: var(--border-radius);
    flex: 0 0 320px;
    display: flex;
    flex-flow: column nowrap;
    align-items: stretch;
}

header {
    padding: 16px 16px 0 16px;
    display: flex;
    justify-content: space-between;
}

.paginate-units {
    padding: 16px;
    display: flex;
    flex-flow: column nowrap;
    flex-grow: 1;
}

.paginate-units > * {
    display: flex;
    flex: 0 0 auto;
}

.paginate-units > *:last-child {
    flex-grow: 1;
}
</style>
