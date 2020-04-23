<template>
  <div>
    <input type="text" v-model="aux" readonly ref="text" />
    <br /><br />
    <div
      id="tecl"
      class="flex-teclado"
      v-bind:style="{ width: size * 4 * 45 + 20 + 'px' }"
    >
      <Boton
        class="btn"
        :id="'element' + item"
        :ref="'element' + item"
        v-bind:size="size"
        v-bind:vertical="vertical"
        v-for="(item, index) in values"
        :key="index"
        v-bind:value="item"
        @clicked="onClickBoton"
      >
      </Boton>
    </div>
  </div>
</template>

<script>
import Boton from "../components/Boton";
//class="flex-teclado" v-for="(item,index) in values" :key="index"
//<Boton v-bind:value="value" @clicked="onClickBoton" v-bind:vertical="vertical" v-bind:size="size"></Boton>
export default {
  name: "Teclado",
  components: {
    Boton,
  },
  
  data() {
    return {
      vertical: false,
      size: 1,
      sizeEqual: null,
      aux: 0,
      operando1: null,
      operando2: null,
      operador: "",
      estado: 0,
      values: [1, 2, 3, "+", 4, 5, 6, "-", 7, 8, 9, "*", 0, "=", "/"],
    };
  },
  created() {
    this.sizeEqual = this.size * 2;
  },
  mounted() {    
    document.getElementById("element=")
      .getElementsByTagName("button")[0].style.width =
      this.sizeEqual * 45 + 5 + "px";
      console.log(document.getElementById("element" + "="));
    this.blockAllOp();
  },
  methods: {
    onClickBoton(value) {
      if (this.estado === 2) {
        this.aux = 0;
        this.estado = 0;
        this.operando1 = null;
        this.operando2 = null;
        this.blockAllOp();
      }
      if (this.estado === 0) {
        this.blockAllOp();
        if (Number.isInteger(value)) {
          this.aux = this.aux * 10 + value;
          this.operando1 = this.aux;
          if (this.operando1 / 10 >= 0) {
            this.unblockAllExceptEqual();
          }
        } else if (value !== "=") {
          this.operador = value;

          this.estado = 1;
          this.highlighOp();
          this.unblockAllExceptEqual();
          return 0;
        }
      }
      if (this.estado === 1) {
        if (Number.isInteger(value)) {
          if (!this.operando2) {
            this.aux = 0;
          }
          this.aux = this.aux * 10 + value;
          this.operando2 = this.aux;
          if (this.operando2 / 10 >= 0) {
            this.unblockEqual();
          }
        } else if (value !== "=") {
          this.changeHighlightOp();
          this.operador = value;
          this.highlighOp();
          this.unblockAllExceptEqual();
        }
        if (value === "=") {
          this.calcular();
          this.estado = 2;
          this.unHighlightOp();
          this.blockAllOp();
        }
      }
    },
    tilt() {
      this.vertical = !this.vertical;
      console.log(this.vertical);
    },
    blockAllOp() {
      for (let item of this.values) {
        if (!Number.isInteger(item)) {
          document
            .getElementById("element" + item)
            .getElementsByTagName("button")[0].disabled = true;
        }
      }
    },

    unblockAllOp() {
      for (let item of this.values) {
        if (!Number.isInteger(item)) {
          document
            .getElementById("element" + item)
            .getElementsByTagName("button")[0].disabled = false;
        }
      }
    },

    highlighOp() {
      let elem = document
        .getElementById("element" + this.operador)
        .getElementsByTagName("button")[0];
      elem.disabled = true;
      elem.style.backgroundColor = "dodgerblue";
    },

    unblockEqual() {
      document
        .getElementById("element" + "=")
        .getElementsByTagName("button")[0].disabled = false;
    },
    unHighlightOp() {
      let elem = document
        .getElementById("element" + this.operador)
        .getElementsByTagName("button")[0];
      elem.style.backgroundColor = "buttonface";
    },
    changeHighlightOp() {
      let elem = document
        .getElementById("element" + this.operador)
        .getElementsByTagName("button")[0];
      elem.disabled = true;
      elem.style.backgroundColor = "buttonface";
    },
    unblockAllExceptEqual() {
      for (let item of this.values) {
        if (!Number.isInteger(item) && item !== "=") {
          document
            .getElementById("element" + item)
            .getElementsByTagName("button")[0].disabled = false;
        }
      }
    },
    calcular() {
      this.aux = eval(
        `${this.operando1.toString()} ${
          this.operador
        } ${this.operando2.toString()}`
      );
    },
  },

  computed: {
    valuesDisp: () => {
      return this.values;
    },
  },
};
</script>

<style scoped>
.flex-teclado {
  position: relative;

  display: inline-flex;
  justify-content: space-around;
  flex-direction: row;
  flex-grow: 100%;
  flex-wrap: wrap;
  align-content: space-between;
  background: rgb(30, 30, 77);

  margin: auto;
}

.btn {
  margin: 0px;
  flex: 1 1 auto;
  overflow-y: auto;
}
</style>
