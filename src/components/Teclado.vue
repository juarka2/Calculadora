<template>
  <div>
    <input type="text" v-model="aux" readonly ref="text" />
    <br /><br />
    <div
      id="tecl"
      class="flex-teclado"
      v-bind:style="{ width: 4 * (size * 45 + 2 * (size - 1)) + 20 + 'px' }"
    >
      <Boton
        class="btn"
        v-bind:size="size"
        v-bind:vertical="vertical"
        ref="btn1"
        id="element1"
        v-bind:value="1"
        @clicked="onClickBoton"
      >
      </Boton>
      <Boton
        class="btn"
        ref="btn2"
        v-bind:size="size"
        v-bind:vertical="vertical"
        id="element2"
        v-bind:value="2"
        @clicked="onClickBoton"
      >
      </Boton>
      <Boton
        class="btn"
        ref="btn3"
        v-bind:size="size"
        v-bind:vertical="vertical"
        id="element3"
        v-bind:value="3"
        @clicked="onClickBoton"
      >
      </Boton>
      <Boton
        class="btn"
        ref="btn+"
        v-bind:size="size"
        v-bind:vertical="vertical"
        id="element+"
        value="+"
        :disabled="disable.disablePlus"
        :class="{ highlight: operador == '+' }"
        @clicked="onClickBoton"
      >
      </Boton>
      <Boton
        class="btn"
        ref="btn4"
        v-bind:size="size"
        v-bind:vertical="vertical"
        id="element4"
        v-bind:value="4"
        @clicked="onClickBoton"
      >
      </Boton>
      <Boton
        class="btn"
        ref="btn5"
        v-bind:size="size"
        v-bind:vertical="vertical"
        id="element5"
        v-bind:value="5"
        @clicked="onClickBoton"
      >
      </Boton>
      <Boton
        class="btn"
        ref="btn6"
        v-bind:size="size"
        v-bind:vertical="vertical"
        id="element6"
        v-bind:value="6"
        @clicked="onClickBoton"
      >
      </Boton>
      <Boton
        class="btn"
        ref="btn-"
        v-bind:size="size"
        v-bind:vertical="vertical"
        id="element-"
        value="-"
        :disabled="disable.disableMinus"
        :class="{ highlight: operador == '-' }"
        @clicked="onClickBoton"
      >
      </Boton>
      <Boton
        class="btn"
        ref="btn7"
        v-bind:size="size"
        v-bind:vertical="vertical"
        id="element7"
        v-bind:value="7"
        @clicked="onClickBoton"
      >
      </Boton>
      <Boton
        class="btn"
        ref="btn8"
        v-bind:size="size"
        v-bind:vertical="vertical"
        id="element8"
        v-bind:value="8"
        @clicked="onClickBoton"
      >
      </Boton>
      <Boton
        class="btn"
        ref="btn9"
        v-bind:size="size"
        v-bind:vertical="vertical"
        id="element9"
        v-bind:value="9"
        @clicked="onClickBoton"
      >
      </Boton>
      <Boton
        class="btn"
        ref="btn*"
        v-bind:size="size"
        v-bind:vertical="vertical"
        id="element*"
        value="*"
        :disabled="disable.disableBy"
        :class="{ highlight: operador == '*' }"
        @clicked="onClickBoton"
      >
      </Boton>
      <Boton
        class="btn"
        ref="btn0"
        v-bind:size="size"
        v-bind:vertical="vertical"
        id="element0"
        v-bind:value="0"
        @clicked="onClickBoton"
      >
      </Boton>
      <Boton
        class="btnEqual"
        ref="btn="
        v-bind:size="size + 1"
        v-bind:vertical="vertical"
        id="element="
        value="="
        :disabled="disable.disableEqual"
        v-bind:style="{ width: size * 2 * 45 + 'px' }"
        @clicked="calcular"
      >
      </Boton>
      <Boton
        class="btn"
        ref="btn/"
        v-bind:size="size"
        v-bind:vertical="vertical"
        id="element/"
        value="/"
        :disabled="disable.disableDivide"
        :class="{ highlight: operador == '/' }"
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
      aux: 0,
      operando1: null,
      operando2: null,
      operador: "",
      estado: 0,
      highlight: "highlight",
      none: "",
      disable: {
        disablePlus: false,
        disableMinus: false,
        disableBy: false,
        disableDivide: false,
        disableEqual: false,
      },
    };
  },
  created() {
    this.sizeEqual = this.size * 2;
  },
  mounted() {
    this.blockAllOp();
  },
  methods: {
    /* eslint-disable */
    onClickBoton(value) {
      if (this.estado === 2) {
        this.aux = 0;
        this.estado = 0;
      }
      if (this.estado === 0) {
        if (Number.isInteger(value)) {
          this.aux = this.aux * 10 + value;
          if (!this.operando1) this.unblockAllExceptEqual();
          this.operando1 = this.aux;
        } else {
          this.operador = value;
          this.estado = 1;

          return 0;
        }
      }
      if (this.estado === 1) {
        if (Number.isInteger(value)) {
          if (!this.operando2) {
            this.aux = 0;
          }
          this.aux = this.aux * 10 + value;
          this.unblockEqual();
          this.operando2 = this.aux;
        } else if (value != "=") {
          this.operador = value;
        }
      }
    },
    tilt() {
      this.vertical = !this.vertical;
    },
    blockAllOp() {
      for (let item in this.disable) {
        this.disable[item] = true;
      }
    },

    unblockAllOp() {
      for (let item in this.disable) {
        this.disable[item] = false;
      }
    },

    unblockEqual() {
      this.disable.disableEqual = false;
    },

    unblockAllExceptEqual() {
      for (let item in this.disable) {
        if (item != "disableEqual") this.disable[item] = false;
      }
    },
    calcular(value) {
      /*this.aux = eval(
        `${this.operando1.toString()} ${
          this.operador
        } ${this.operando2.toString()}`
      );*/
      switch (this.operador) {
        case "+":
          this.aux = this.operando1 + this.operando2;
          break;
        case "-":
          this.aux = this.operando1 - this.operando2;
          break;
        case "*":
          this.aux = this.operando1 * this.operando2;
          break;
        case "/":
          this.aux = this.operando1 / this.operando2;
          break;
      }
      this.estado = 2;
      this.operador = "";
      this.blockAllOp();
      this.operando1 = null;
      this.operando2 = null;
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
  display: inline-flex;
  justify-content: space-around;
  flex-direction: row;
  flex-grow: 100%;
  flex-wrap: wrap;
  align-content: space-between;
  background: rgb(30, 30, 77);

  margin: 20px auto;
}

.btn {
  margin: 2px !important;
  flex: 1 1 auto;
  overflow-y: auto;
}
.btnEqual {
  margin: 2px !important;
  width: 95px !important;
  flex: 1 1 auto;
  overflow-y: auto;
}
.highlight {
  background-color: dodgerblue;
}
</style>
