import { shallowMount, mount } from '@vue/test-utils'
import Boton from '@/components/Boton.vue'
import Teclado from '@/components/Teclado.vue'

describe('Teclado.vue', () => {
  it('operator buttons are disabled at render',()=>{
    const auxWrapper= mount(Boton);
    const wrapper = mount(Teclado);

    console.log(wrapper.vm);
  });
  

})

