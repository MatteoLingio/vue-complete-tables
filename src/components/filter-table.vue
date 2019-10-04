<template>
<div class="table-container">
    <table>
        <table-header v-if="hasHeader" :search="false" :color="color">Foods</table-header>
       
        <!-- <col v-for="(cat, index) in columns" style="width: 0px" :key="cat.id" ref="colonne"> -->
        
        <thead>
            <tr v-if="true">
                <td :colspan="columns.length">
                    <search-input />
                </td>
            </tr>
            <tr v-if="true">
                <td :colspan="columns.length">
                    <div style="display: inline-block" v-for="(cat, index) in columns"  :key="cat.id">
                        
                        <label class="switch">
                            <input  type="checkbox" :value="index" v-model="checkedCol" checked>
                            <span class="slider round"></span>
                        </label>
                        <span style="margin-right: 5px; margin-left: 5px">{{cat}}</span>
                        <!-- <span>{{checkedCol}}</span> -->
                    </div>
                </td>
            </tr>
            <tr class="col-names">
                <th v-for="name in columns" :key="name.id" ref="headers">{{name}}</th>
            </tr>
        </thead>
        <tr v-for="(key) in paginated" :key="key.id" :ref="`rows`" class="border_bottom">
            <slot class="hide" :item="key"></slot>
        </tr>
        <tfoot>
            <tr>
                <td :colspan="columns.length" style="text-align: right">
                    Current Page:{{currentPage}}
                    <font-awesome-icon style="margin-right: 5px;" @click="prevPage()" v-if="currentPage != 1" class="arrow-icon" fas icon="chevron-left" />
                    <font-awesome-icon @click="nextPage()" class="arrow-icon" fas icon="chevron-right" />
                </td>
            </tr>

        </tfoot>
    </table>
</div>
</template>

<script lang="ts">
import TableHeader from "./table-components/table-header.vue";
import ItemPageSelector from "./table-components/item-page-selector.vue";
import SearchInput from "./table-components/search-input.vue";

import {
    Component,
    Prop,
    Watch,
    Vue
} from "vue-property-decorator";

import TableMixin from '../mixins/table-mixin';
import {
    Mixins
} from 'vue-mixin-decorator';

@Component({
    components: {
        TableHeader,
        ItemPageSelector,
        SearchInput
    }
})

export default class FilteredTable extends Mixins < TableMixin > (TableMixin) {
    public checkedCol: Array < number > = [];
    public cols: Array < number > = [];
    public tracker: Array < Object > = [];

    @Watch('checkedCol', {deep: true })
    onColumnSelected(val: any, oldVal: any) {
        let value = this.lodash.differenceWith(val, oldVal, this.lodash.isEqual);
        if(value.length === 0){
            value = this.lodash.differenceWith(oldVal, val, this.lodash.isEqual);
        }
        
        this.displayColumn(value)
    }

    created(){
        for(let i = 0; i < this.columns.length ; i++){
            this.checkedCol.push(i)
        }
    }

    displayColumn(val: any): any{
        for(let i = 0; i < this.$refs.rows.length ; i++){
            if(this.$refs.rows[i].children[val].style.display == 'none'){
                this.$refs.rows[i].children[val].style.display = 'table-cell'
                this.$refs.headers[val].style.display = 'table-cell'
            }
            else{
                this.$refs.rows[i].children[val].style.display = 'none'
                this.$refs.headers[val].style.display = 'none'
            }
        }
    }

    
}
</script>

<style lang="scss">
.switch {
    position: relative;
    display: inline-block;
    width: 53px;
    height: 25px;
}

/* Hide default HTML checkbox */
.switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

/* The slider */
.slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: .4s;
    transition: .4s;
}

.slider:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
}

input:checked+.slider {
    background-color: limegreen;
}

input:focus+.slider {
    box-shadow: 0 0 1px limegreen;
}

input:checked+.slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
    border-radius: 34px;
}

.slider.round:before {
    border-radius: 50%;
}
</style>
