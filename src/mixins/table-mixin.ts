import { Mixin } from "vue-mixin-decorator";
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Mixin
export default class MyMixin extends Vue {
  @Prop() public data!: Array<any>;
  @Prop() public columns!: Array<String>;
  @Prop({ default: false }) public hasHeader!: Boolean;
  @Prop({ default: "" }) public color!: String;
  @Prop({ default: 5 }) public pageSize!: number;
  public currentPage: number = 1;

  public searchString: string = "";

  get paginated() {
    return this.data.filter((row, index) => {
      let start = (this.currentPage - 1) * this.pageSize;
      let end = this.currentPage * this.pageSize;
      if (index >= start && index < end) return true;
    });
  }

  nextPage(): void {
    if (this.currentPage * this.pageSize < this.data.length)
      this.currentPage++;
  }

  prevPage(): void {
    if (this.currentPage > 1) this.currentPage--;
  }

  // get search() {
  //   console.log('inside')
  //   let name_re = new RegExp(this.searchString, "i");
  //   let data = [];

  //   for (var i in this.data) {
  //     if (this.groupedItems[i].name.match(name_re)) {
  //       data.push(this.data[i]);
  //     }
  //   }

  //   return data;
  // }

}
