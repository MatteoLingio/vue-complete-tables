<template>
<div class="input-search">
    <div class="webflow-style-input">
        <input type="text" v-model="searchString" placeholder="Search" />
    </div>
</div>
</template>

<script lang="ts">

import {
    Component,
    Prop,
    Vue
} from "vue-property-decorator";

@Component({
    components: {
    }
})
export default class SearchInput extends Vue {
    public searchString: string  = '';
}
</script>

<style lang="scss">
</style>
