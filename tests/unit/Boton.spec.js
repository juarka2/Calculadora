import { shallowMount, mount } from '@vue/test-utils'
import Boton from '@/components/Boton.vue'

describe('Boton.vue', () => {
  it('renders value when passed', () => {
    const value = 'new message';
    const wrapper = shallowMount(Boton, {
      propsData: { value }
    })
    expect(wrapper.find('button').text()).toMatch(value)
  });
  it('handleClick event emmits value', () => {
    
    const value = 'new message';
   
    const wrapper = mount(Boton, {
      propsData: { value }
    });
    

    wrapper.vm.handleClick();

    expect(wrapper.emitted().clicked[0][0]).toBe(value);
  });
  it('calls handleClick', () => {
    
    
    const handleClick = jest.fn();
    const wrapper = mount(Boton);
    wrapper.setMethods({
        handleClick: handleClick
    })

    wrapper.find('button').trigger('click');

    expect(handleClick).toHaveBeenCalled();
  });
 
  
  it('spanX and spanY are >= 0', () => {
    
    const wrapper = shallowMount(Boton);
    expect((wrapper.vm.spanX>=0&&wrapper.vm.spanY>=0)).toBe(true);
  });
  it('spanX and spanY are integer', () => {
    
    const wrapper = shallowMount(Boton);
    expect(Number.isInteger(wrapper.vm.spanX)
    &&
    Number.isInteger(wrapper.vm.spanY)).toBe(true);
  });
  it('height and width match required formula', () => {
    
    const wrapper = shallowMount(Boton);
    const findWidth = `width: ${(wrapper.vm.spanX*45)+(2*(wrapper.vm.spanX-1))}px`;
    const findHeight = `height: ${(wrapper.vm.spanX*45)+(2*(wrapper.vm.spanX-1))}px`;
    expect(wrapper.find('button').html().includes(findWidth)).toBe(true);
    expect(wrapper.find('button').html().includes(findHeight)).toBe(true);
  });
  it('SpanX and SpanY set to 1 when the other is modified', () => {
    
    const wrapper = shallowMount(Boton);
    wrapper.vm.setHeight();
    expect(wrapper.vm.spanX).toBe(1);
    wrapper.vm.setWidth();
    expect(wrapper.vm.spanY).toBe(1);
    
  });

})

