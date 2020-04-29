import { shallowMount, mount } from "@vue/test-utils";
import Boton from "@/components/Boton.vue";
import Teclado from "@/components/Teclado.vue";

describe("Teclado.vue", () => {
  it("operator buttons are disabled at render", () => {
    const wrapper = mount(Teclado);

    for (let item in wrapper.vm.disable) {
      //console.log(wrapper.vm.disable[item]);
      expect(wrapper.vm.disable[item]).toBe(true);
    }

    //console.log(wrapper.find({ ref: "btn+" }).html());
  });
  it("operando1 updates at pressing number buttons", () => {
    const wrapper = mount(Teclado);
    expect(wrapper.vm.operando1).toBe(null);
    wrapper.find({ ref: "btn1" }).trigger("click");
    expect(wrapper.vm.operando1).toBe(1);
  });
  it("setting operando1 enables operator buttons", () => {
    const wrapper = mount(Teclado);
    wrapper.find({ ref: "btn1" }).trigger("click");
    for (let item in wrapper.vm.disable) {
      if (item != "disableEqual") expect(wrapper.vm.disable[item]).toBe(false);
    }
  });
  it("clicking operator buttons set operator, allows changing operator value", () => {
    const wrapper = mount(Teclado);
    wrapper.find({ ref: "btn1" }).trigger("click");
    wrapper.find({ ref: "btn+" }).trigger("click");
    expect(wrapper.vm.operador).toBe("+");
    wrapper.find({ ref: "btn*" }).trigger("click");
    expect(wrapper.vm.operador).toBe("*");
  });
  it("after selecting operator clicking number buttons update operando2", () => {
    const wrapper = mount(Teclado);
    wrapper.find({ ref: "btn1" }).trigger("click");
    wrapper.find({ ref: "btn+" }).trigger("click");
    wrapper.find({ ref: "btn5" }).trigger("click");
    expect(wrapper.vm.operando2).toBe(5);
  });
  it("Equal button is enabled after updating operando2", () => {
    const wrapper = mount(Teclado);
    wrapper.find({ ref: "btn1" }).trigger("click");
    wrapper.find({ ref: "btn+" }).trigger("click");
    wrapper.find({ ref: "btn5" }).trigger("click");
    expect(wrapper.vm.disable.disableEqual).toBe(false);
  });
  it("calcular is called after clicking on = button", () => {
    const wrapper = mount(Teclado);

    wrapper.find({ ref: "btn9" }).trigger("click");

    wrapper.find({ ref: "btn+" }).trigger("click");

    wrapper.find({ ref: "btn4" }).trigger("click");

    wrapper.find({ ref: "btn=" }).trigger("click");

    expect(wrapper.vm.aux).toBe(13);
  });
});
