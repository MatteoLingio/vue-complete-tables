<template>
<caption v-bind:style="{ backgroundColor: color }" class="header-container header-container__light">
    <h3 class="header-title header-title__light">
        <slot />
    </h3>
    
</caption>
</template>

<script lang="ts">
// import SearchInput from '@/components/table-components/search-input.vue'
import {
    Component,
    Prop,
    Vue,
} from 'vue-property-decorator';

import TableMixin from '@/mixins/table-mixin';
import { Mixins } from 'vue-mixin-decorator';

@Component({
    components: {
    }
})

export default class TableHeader extends Mixins<TableMixin>(TableMixin) {
    //@Prop({  default: true }) private search!: Boolean;
    @Prop({ default: '' }) public color!: String;
    
}
</script>

<style lang="scss" scoped>
@import '../../assets/_scss/_variables.scss';

.header-container {
    text-align: left;
    width: 100%;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    &__light {
        background-color: $light-theme-main-color;
    }
}

.header-title {
    text-align: left;
    padding-left: 20px;
    font-weight: 800;
    align-self: center;

    &__light {
        color: $light-theme-font-color;
    }
}
</style>
