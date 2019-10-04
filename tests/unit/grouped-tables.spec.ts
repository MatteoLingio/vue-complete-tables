import { mount, createLocalVue } from "@vue/test-utils";
import GroupedTable from "@/components/grouped-table.vue";
import TableHeader from "@/components/table-components/table-header.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import PreparedData from "./data";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(fas);

var data = new PreparedData().data;
var columns = new PreparedData().columns;

var localVue = createLocalVue();
localVue.component("font-awesome-icon", FontAwesomeIcon);

describe("grouped-teble.vue", () => {
  var wrapper: any;

  const factory = (propsData: any) => {
    return mount(GroupedTable, {
      localVue,
      propsData: {
        columns,
        data,
        ...propsData
      }
    });
  };

  it("has header", () => {
    wrapper = factory({ hasHeader: true, groupCategory: "category" });
    expect(wrapper.find(TableHeader).exists()).toBe(true);
    expect(wrapper.find(".header-container").isVisible()).toBe(true);
  });

  it("hasn't header", () => {
    wrapper = factory({ hasHeader: false, groupCategory: "category" });
    expect(wrapper.find(TableHeader).exists()).toBe(false);
    expect(wrapper.find(".header-container").exists()).toBe(false);
  });

  it("check if table structure is rendered", () => {
    wrapper = factory({ hasHeader: true, groupCategory: "category" });
    expect(wrapper.contains("table")).toBe(true);
    expect(wrapper.contains("thead")).toBe(true);
    expect(wrapper.contains("tbody")).toBe(true);
  });

  it("check panel number grouping by price", () => {
    wrapper = factory({ hasHeader: false, groupCategory: "price" });
    expect(wrapper.findAll(".category-row")).toHaveLength(2);
  });

  it("check panel number grouping by calories", () => {
    wrapper = factory({ hasHeader: false, groupCategory: "calories" });
    expect(wrapper.findAll(".category-row")).toHaveLength(1);
  });

  it("check panel text grouping by category", () => {
    wrapper = factory({ hasHeader: false, groupCategory: "category" });
    let panels = wrapper.findAll(".category-name");
    expect(panels.at(0).text()).toBe("Sweet");
    expect(panels.at(1).text()).toBe("Meat");
  });

  it("check panel text grouping by calories", () => {
    wrapper = factory({ hasHeader: false, groupCategory: "calories" });
    let panels = wrapper.findAll(".category-name");
    expect(panels.at(0).text()).toBe("300");
  });

  it("check all panels initially closed", () => {
    wrapper = factory({ hasHeader: false, groupCategory: "calories" });
    let contents = wrapper.findAll(".border_bottom");
    expect(contents.at(0).isVisible()).toBe(false);
  });

  it("opens the correct panel on click", () => {
    wrapper = factory({ hasHeader: false, groupCategory: "category" });
    let buttons = wrapper.findAll(".arrow-icon");
    let contents = wrapper.findAll(".border_bottom");
    buttons.at(0).trigger("click");
    expect(contents.at(0).isVisible()).toBe(true);
  });

  it("check openPanel method", () => {
    wrapper = factory({ hasHeader: false, groupCategory: "category" });
    wrapper.vm.panels = [];
    wrapper.vm.openPanel(0);
    expect(wrapper.vm.panels).toEqual([0]);
  });

  it("check closePanel method", () => {
    wrapper = factory({ hasHeader: false, groupCategory: "category" });
    wrapper.vm.panels = [0, 2, 3];
    wrapper.vm.closePanel(2);
    expect(wrapper.vm.panels).toEqual([0, 3]);
  });

  it("check panelSelector method", () => {
    wrapper = factory({ hasHeader: false, groupCategory: "category" });
    wrapper.vm.panels = [0, 2, 3];
    let included = wrapper.vm.panelSelector(2);
    expect(included).toBe(true);
    included = wrapper.vm.panelSelector(5);
    expect(included).toBe(false);
  });

  it("check isOneOpen method", () => {
    wrapper = factory({ hasHeader: false, groupCategory: "category" });
    wrapper.vm.panels = [0, 2, 3];
    let isOpen = wrapper.vm.isOneOpen();
    expect(isOpen).toEqual(true);
    wrapper.vm.panels = [];
    isOpen = wrapper.vm.isOneOpen();
    expect(isOpen).toEqual(false);
  });

  it("check groupBy method", () => {
    wrapper = factory({ hasHeader: false, groupCategory: "category" });
    wrapper.vm.panels = [0, 2, 3];
    let array = new PreparedData().shortArray;
    let isOpen = wrapper.vm.groupBy(array, "category");
    expect(isOpen).toEqual(new PreparedData().groupedMock);
  });
});
