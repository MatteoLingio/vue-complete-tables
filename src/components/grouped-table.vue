<template>
<div class="table-container">
    <table>
        <table-header v-if="hasHeader" :search="false" :color="color">Foods</table-header>
        <thead>
            <tr v-show="isOneOpen()" class="col-names">
                <th v-for="name in columns" :key="name.id">{{name}}</th>
            </tr>
        </thead>
        <tbody v-for="(key, value) in groupedItems" :key="key.id">
            <tr colspan="10">
                <td class="category-row" style="text-align:left" :colspan="columns.length">
                    <font-awesome-icon v-show="!panelSelector(value)" class="arrow-icon" @click="isOpened = openPanel(value)" fas icon="chevron-circle-right" />
                    <font-awesome-icon v-show="panelSelector(value)" class="arrow-icon" @click="isOpened = closePanel(value)" fas icon="chevron-circle-down" />
                    <span class="category-name">{{value}}</span>
                </td>
            </tr>
            <tr class="border_bottom" v-show="panelSelector(item[groupCategory])" v-for="(item) in key" :key="item.id">
                <slot class="field-cells" :item="item"></slot>
            </tr>
        </tbody>
    </table>
</div>
</template>

<script lang="ts">
import TableHeader from "./table-components/table-header.vue";
import ItemPageSelector from "./table-components/item-page-selector.vue";


import {
    Component,
    Prop,
    Vue
} from "vue-property-decorator";

import TableMixin from '../mixins/table-mixin';
import {
    Mixins
} from 'vue-mixin-decorator';

@Component({
    components: {
        TableHeader,
        ItemPageSelector
    }
})

export default class GroupedTable extends Mixins < TableMixin > (TableMixin) {

    @Prop() private groupCategory!: string;

    public isOpened: boolean = false;
    public groupedItems: Array < any > = [];
    public panels: Array < any > = [];

    private created() {
        this.groupedItems = this.groupBy(this.data, this.groupCategory);
        debugger;
    }

    groupBy(array: Array < any > , key: string): Array < any > {
        return array.reduce((groupedArray, item) => {
            (groupedArray[item[key]] = groupedArray[item[key]] || []).push(item);
            return groupedArray;
        }, {});
    }

    openPanel(index: any): boolean {
        this.panels.push(index);
        return true;
    }

    closePanel(index: any): boolean {
        this.panels = this.panels.filter(item => item !== index);
        return false;
    }

    panelSelector(i: any): Boolean {
        return this.panels.includes(i);
    }

    isOneOpen(): Boolean {
        return this.panels.length > 0;
    }
}
</script>

<style lang="scss">
@import "../assets/_scss/_base-table.scss";
@import "../assets/_scss/_variables.scss";

.category-row {
    background-color: $light-theme-main-color;
    color: $light-theme-font-color;
    border-radius: 5px;
    padding: 10px;
}

.category-name {
    font-weight: 600;
    margin-left: 10px;
}

.arrow-icon {
    cursor: pointer;
}
</style>
