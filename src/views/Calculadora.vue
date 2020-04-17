<template>
<div>
    
    <Boton v-bind:value="value" @clicked="onClickBoton" v-bind:vertical="vertical" v-bind:size="size"></Boton>
</div>
</template>



<script>

import Boton from '../components/Boton'
export default {
    name: 'viewBoton',
    
    components:{
        Boton
    },
    data(){
        return{
            vertical : false, size : 3, value:'-', aux:''
            }
                },
    methods:{
        onClickBoton(value){
            console.log(value,"desde view");
        },
        tilt(){
            this.vertical=!this.vertical;
            console.log(this.vertical);
        }
    }
}
</script>