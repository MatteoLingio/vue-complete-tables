<template>
<div id="app">
    <h2>Grouped table</h2>
    <grouped-table 
      :hasHeader="true" 
      :columns="['Name', 'Calories', 'Price', 'Quantity', 'Number', 'Zip', 'Phone']" 
      :data="foods"
      :groupCategory="'category'" 
      :color="'#60b4c9'">

      <template slot-scope="props">
        <td>{{props.item.name}}</td>
        <td>{{props.item.calories}}</td>
        <td>{{props.item.price}}</td>
        <td>{{props.item.Quantity}}</td>
        <td>{{props.item.Number}}</td>
        <td>{{props.item.Zip}}</td>
        <td>{{props.item.Phone}}</td>
      </template>
    </grouped-table>

    <h2>Filter table</h2>
    <filter-table style="margin-top: 50px" 
      :hasHeader="true" 
      :columns="['Name', 'Calories', 'Price', 'Quantity', 'Number', 'Zip', 'Phone']" 
      :data="foods"
      :color="'#60b4c9'">
      <template slot-scope="props">
        <td>{{props.item.name}}</td>
        <td>{{props.item.calories}}</td>
        <td>{{props.item.price}}</td>
        <td>{{props.item.Quantity}}</td>
        <td>{{props.item.Number}}</td>
        <td>{{props.item.Zip}}</td>
        <td>{{props.item.Phone}}</td>
      </template>
    </filter-table>
</div>
</template>

<script>
import GroupedTable from '@/components/grouped-table';
import FilterTable from '@/components/filter-table';

export default {
    name: 'app',
    components: {
        GroupedTable,
        FilterTable
    },
    data: function () {
        return {
            foods: [{
                category: 'Sweet',
                name: 'Pie',
                calories: 500,
                price: '1$',
                Quantity: 200000,
                Number: 123123123,
                Code: 'ASD1231231',
                Zip: '12312',
                Phone: 'Number'

            }, {
                category: 'Sweet',
                name: 'Donut',
                calories: 250,
                price: '0.5$'
            }, {
                category: 'Meat',
                name: 'Steak',
                calories: 300,
                price: '5$'
            }, {
                category: 'Vegatables',
                name: 'Carrot',
                calories: 300,
                price: '5$'
            }, {
                category: 'Vegatables',
                name: 'Salad',
                calories: 300,
                price: '3$'
            }, {
                category: 'Vegatables',
                name: 'Tomatoeeees',
                calories: 300,
                price: '5$'
            }]
        }
    }
}
</script>

<style lang="scss">
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
    font-size: 20px;
}
</style>
