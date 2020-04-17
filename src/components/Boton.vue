<template>

    <div>
        
        <button  :style="btnStyles" @click="handleClick">{{value}}</button>

    </div>

</template>

<script>
export default {
    name: 'Boton',
    props:['value','vertical','size'],
    data(){
        return{ spanX: 1, spanY:1 
        }
        
    },
    created(){
            if(this.vertical){
            this.setHeight();
        }
        else{
            this.setWidth()
        }
    },
    computed: {
        btnStyles(){
            return{
                
                "margin": "2px",
                "font-size": "18px",
                "width": `${(this.spanX*45)+(2*(this.spanX-1))}px`,
                "height": `${(this.spanY*45)+(2*(this.spanY-1))}px`,
                
                
            };
        },
        
        
    },
    methods:{
       
        setWidth(){
            this.spanX=this.size;
            this.spanY=1;
            

        },
        setHeight(){

            this.spanY=this.size;
            this.spanX=1;
            

        },
        handleClick(){
            //console.log(this.value);
            this.$emit('clicked',this.value);
        },
        
    }
}
</script>

