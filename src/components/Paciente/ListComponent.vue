<template>
  <div v-if="showModalAseguradoras" class="modal7">
    <div class="contenedor7">
      <header>
        Status de Convocatoria
      </header>
      <div class="contenido7">
        <label @click="this.autoSave()" for="btn-modal" class=" close"
          >Cerrar</label
        >
        <div class="contenido7">
          <!-- <div>
            <input
              id="search"
              type="search"
              v-model="searchField"
              class="form-control"
              placeholder="Introduzca el nombre del centro"
              @keypress="buscar()"
            />
          </div> -->
          <br />
          <br />
          <div>
            <p>
              STATUS CONVOCATORIA:
            </p>

            <div>
              <div class="form-check form-switch">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="convocar"
                  v-model="this.convocar"
                />
              </div>
            </div>
          </div>
          <div>
            <p>
              COMENTARIO CONVOCATORIA:
            </p>

            <textarea
              id="comentaryConvoc"
              rows="3"
              type="comentaryConvoc"
              class="form-control"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <table v-if="this.totales.evaluacions" id="customers"> -->
  <table id="customers">
    <!-- <th>NO.</th> -->
    <!-- <th>NO.</th> -->
    <th>NO.</th>
    <!-- <th>ORDER.</th> -->
    <th>FECHA</th>
    <!-- <th>DIAS</th> -->
    <th>CEDULA</th>
    <!-- <th>NSS</th> -->
    <th>NOMBRE</th>
    <th>APELLIDO</th>
    <!-- <th>EDAD</th> -->
    <th>TELEFONO</th>
    <th>CONTACTO</th>
    <!-- <th>ESPECIFICACION DE CONTACTO</th> -->
    <!-- <th>NOMBRE DE CONTACTO</th> -->
    <th>
      KIT
    </th>
    <th>
      ENCAMADO
    </th>
    <th>SUPERVISOR</th>
    <th>LLAMAR</th>
    <th v-if="!this.$store.state.user.type == 'Supervisor en Sitio'">INACTIVAR</th>
    <th v-if="!this.$store.state.user.type == 'Supervisor en Sitio'">COMENTARIO</th>
    <th v-if="!this.$store.state.user.type == 'Supervisor en Sitio'">FECHA</th>
    <th>UNAP</th>
    <!-- <th>AFILIACION</th> -->
    <!-- <th
      v-show="
        this.$store.state.user.type == 'Supervisor en Sitio' ||
          this.$store.state.user.type == 'Supervisor General' ||
          this.$store.state.user.type == 'Coordinador de Operaciones' ||
          this.$store.state.user.type == 'Gerente de Operaciones' ||
          this.$store.state.user.type == 'Auditora Interna'
      "
    >
      ESCANEADO
    </th> -->
    <!-- <th
      v-show="
        this.$store.state.user.type == 'Supervisor en Sitio' ||
          this.$store.state.user.type == 'Supervisor General' ||
          this.$store.state.user.type == 'Coordinador de Operaciones' ||
          this.$store.state.user.type == 'Gerente de Operaciones' ||
          this.$store.state.user.type == 'Auditora Interna'
      "
    >
      VERIFICADO
    </th> -->
    <tr v-for="(evaluacion, index) in evaluacions" :key="index">
      <td v-show="this.$store.state.user.orden == 'ASCENDENTE'">
        {{ index + 1 }}
      </td>
      <td v-show="this.$store.state.user.orden == 'DESCENDENTE'">
        {{ evaluacions.length - index }}
      </td>
      <!-- <td>{{ evaluacion.order }}</td> -->
      <td>{{ this.formatDate(evaluacion.fecha) }}</td>

      <!-- <td>{{ this.diffDate(evaluacion.fecha) }}</td> -->
      <td>{{ evaluacion.cedula }}</td>
      <!-- <td>{{ evaluacion.nss }}</td> -->
      <td>{{ evaluacion.nombre }}</td>
      <td>{{ evaluacion.apellido }}</td>
      <!-- <td>{{ evaluacion.edad }}</td> -->
      <td>{{ evaluacion.telefono }}</td>
      <td>
        {{ this.defEspecificacion_contacto(evaluacion) }}
        <!-- {{ this.defEspecificacion_contacto(evaluacion) }} -->
        <!-- {{ evaluacion.nombre_contacto }} -->
      </td>
      <!-- <td>{{ evaluacion.especificacion_contacto }}</td> -->
      <!-- <td>{{ evaluacion.nombre_contacto }}</td> -->
      <td>
        {{ evaluacion.kit }}
      </td>
      <td>
        {{ evaluacion.Encamado }}
      </td>
      <td>
        {{ evaluacion.supervisor }}
      </td>

      <!-- <td>{{ evaluacion.status }}</td> -->

      <!-- <td>{{ this.statusFixedDesc(this.statusFixed(evaluacion.status)) }}</td> -->
      <!-- <td :class="hasDxColor(evaluacion.consAfil)">
        <i :class="hasDxIcon(evaluacion.consAfil)"></i>
      </td> -->
      <td
        :class="hasDxColor(this.diasTranscurr(this.diffDate(evaluacion.fecha)))"
      >
        <i
          :class="
            hasDxIcon(this.diasTranscurr(this.diffDate(evaluacion.fecha)))
          "
        ></i>
      </td>
      <td v-if="!this.$store.state.user.type == 'Supervisor en Sitio'">
        <div v-if="this.diasTranscurr(this.diffDate(evaluacion.fecha))">
          <div class="form-check form-switch">
            <input
              @change="handleConvocar(evaluacion, 'inacConvoc')"
              class="form-check-input"
              type="checkbox"
              id="convocar"
              v-model="evaluacion.inacConvoc"
            />
          </div>
        </div>
      </td>
      <td v-if="!this.$store.state.user.type == 'Supervisor en Sitio'">
        <select
          v-if="this.diasTranscurr(this.diffDate(evaluacion.fecha))"
          @change="handleConvocar(evaluacion, 'comentarioConvoc')"
          id="comentarioConvoc"
          type="comentarioConvoc"
          v-model="evaluacion.comentarioConvoc"
          class="inputList"
        >
          <option>-</option>
          <option>INFORMADO</option>
          <option>NO CONTESTA</option>
          <option>NÚMERO EQUIVOCADO</option>
          <option>NÚMERO FUERA DE SERVICIO O APAGADO</option>
          <option>CAMBIO DE RÉGIMEN</option>
          <option>MUDANZA O CAMBIO DE CPN</option>
          <option>ENCAMADO</option>
          <option>FALLECIDO</option>
        </select>

        <!-- <select
          type="comentarioConvoc"
          v-model="evaluacion.comentarioConvoc"
          class="inputList"
        >
        <option>
        FALLECIDO
        CAMBIO DE REGIMEN
        <option/>
        <select/> -->
      </td>
      <td v-if="!this.$store.state.user.type == 'Supervisor en Sitio'">{{ this.formatDate(evaluacion.fechaComent) }}</td>
      <td>
        {{ evaluacion.unap }}
      </td>
      <!-- <td
        @click="handleConvocar(evaluacion.cedula)"
        :class="hasDxColorInverse(evaluacion.convocar)"
        style="cursor: pointer"
      >
        <i :class="hasDxIconInverse(evaluacion.convocar)"></i>
      </td> -->
      <!-- <td
        v-show="
          this.$store.state.user.type == 'Supervisor en Sitio' ||
            this.$store.state.user.type == 'Supervisor General' ||
            this.$store.state.user.type == 'Coordinador de Operaciones' ||
            this.$store.state.user.type == 'Gerente de Operaciones' ||
            this.$store.state.user.type == 'Auxiliar de Verificación' ||
            this.$store.state.user.type == 'Auditora Interna'
        "
        :class="hasDxColor(evaluacion.evaluacion)"
      >
        <i :class="hasDxIcon(evaluacion.evaluacion)"></i>
      </td> -->
      <!-- <td
        v-show="
          this.$store.state.user.type == 'Supervisor en Sitio' ||
            this.$store.state.user.type == 'Supervisor General' ||
            this.$store.state.user.type == 'Coordinador de Operaciones' ||
            this.$store.state.user.type == 'Gerente de Operaciones' ||
            this.$store.state.user.type == 'Auxiliar de Verificación' ||
            this.$store.state.user.type == 'Auditora Interna'
        "
        :class="hasDxColor(evaluacion.verificacion)"
      >
        <i :class="hasDxIcon(evaluacion.verificacion)"></i>
      </td> -->
    </tr>
  </table>

  <!-- <h6 class="noRegist" v-if="!this.totales.evaluacions">
    No se Encontraron Registros.
  </h6> -->
</template>

<script lang="ts">
import numeral from "numeral";
import moment from "moment";
// import { updateOne } from "@/services/elderstatistic/Evaluacion";
import { Evaluacion } from "@/interfaces/Evaluacion";
import { updateConvocatoria } from "@/services/evaluacion/Evaluacion";

export default {
  props: ["evaluacions"],
  data() {
    return {
      convocar: true,
      fechaActual: "",
      data: false,
      totales: {},
      showModalAseguradoras: false,
    };
  },
  mounted() {
    this.fechaActual = new Date();
  },
  methods: {
    async handleBlur(cedula: any, attribute: any, value: any) {
      try {
        const res = await updateConvocatoria(cedula, attribute, value)
          .then
          /* async (res) => {
            if (res.data.Status == "Success") {
              alert("Convocatoria Actualizada Exitosamente");
            }
          },
          (err) => {
            alert(err);
          } */
          ();
      } catch (error) {
        console.error(error);
      }
    },

    showModalAseguradorasMethod() {
      this.showModalAseguradoras = !this.showModalAseguradoras;
    },

    handleConvocar(evaluacion: any, origen: string) {
      if (origen == "inacConvoc") {
        if (evaluacion.comentarioConvoc == "" || !evaluacion.comentarioConvoc) {
          evaluacion.inacConvoc = !evaluacion.inacConvoc;
          alert("Asegúrese de seleccionar el comentario");
        } else {
          this.handleBlur(evaluacion.cedula, origen, evaluacion.inacConvoc);
        }
      } else {
        // Obtener la fecha actual
        const currentDate = new Date();

        // Restar 4 horas en milisegundos (1 hora = 3600000 milisegundos)
        const fourHoursAgo = new Date(currentDate.getTime() - 4 * 3600000);

        // Convertir la fecha en una cadena en formato "yyyy-mm-dd"
        const dateString = fourHoursAgo.toISOString().split("T")[0];

        evaluacion.fechaComent = dateString;

        this.handleBlur(evaluacion.cedula, origen, evaluacion.comentarioConvoc);
      }
    },

    defEspecificacion_contacto(evaluacion: any) {
      if (evaluacion.tipo_de_contacto == "PROPIO") {
        return `${evaluacion.tipo_de_contacto}`;
      } else {
        if (evaluacion.tipo_de_contacto == "OTROS") {
          if (evaluacion.especificacion_contacto == undefined) {
            return `${evaluacion.tipo_de_contacto} (NO ESPECIFICADO) > ${evaluacion.nombre_contacto}`;
          } else {
            return `${evaluacion.tipo_de_contacto} (${evaluacion.especificacion_contacto}) > ${evaluacion.nombre_contacto}`;
          }
        } else {
          return `${evaluacion.tipo_de_contacto} > ${evaluacion.nombre_contacto}`;
        }
      }
    },

    goToEval(evaluacion: any) {
      this.$store.state.user.currentEvaluacion = evaluacion;
      this.$router.push(`/evaluacion-complete`);
    },

    diasTranscurr(dias: number) {
      if (dias <= 31) {
        return false;
      } else {
        return true;
      }
    },

    statusFixedDesc(status: number) {
      if (status == 1) {
        return "ACTIVO";
      } else if (status == 2) {
        return "ACTIVO";
      } else if (status == 3) {
        return "EGRESADO";
      }
    },

    statusFixed(status: string) {
      if (status == "ACTIVO") {
        return 1;
      } else if (status == "") {
        return 1;
      } else if (status == "2") {
        return 2;
      } else if (status == "3") {
        return 3;
      } else {
        return 1;
      }
    },

    hasDxColorInverse(dx: string) {
      if (dx) {
        return "red";
      } else {
        return "green";
      }
    },

    hasDxColor(dx: string) {
      if (dx) {
        return "green";
      } else {
        return "red";
      }
    },

    hasDxIconInverse(dx: string) {
      if (dx) {
        return "fas fa-times-circle";
      } else {
        return "fas fa-check-circle";
      }
    },
    hasDxIcon(dx: string) {
      if (dx) {
        return "fas fa-check-circle";
      } else {
        return "fas fa-times-circle";
      }
    },
    calcularEdad(date: any) {
      let years = 0;
      let edad = Math.floor(
        moment(new Date()).diff(moment(date, "YYYY-MM-DD"), "month", true)
      );
      // if (edad > 124 || edad < 0) {
      //   years = 0;
      // } else {
      // years = edad;
      //   }
      years = edad - 1;
      // this.activo.edad = years;
      return years;
    },

    diffDate(dateValue: Date) {
      var NowMoment = moment().format("DD/MM/YYYY");
      // var Date = "2022-06-07";
      var Date = dateValue;

      return moment().diff(moment(Date), "days");
    },

    newFormatDate(dateValue: Date) {
      let out = moment(dateValue).add(4, "hours");
      // return moment(out).format("DD/MM/YYYY");
      moment.locale("es");
      return moment(out).format("MMMM YYYY");
      // .startOf("hour")
      // .fromNow();
    },

    toColor(type: string) {
      if (type == "0") {
        return "valor1";
      } else if (type == "1") {
        return "valor2";
      } else {
        return "valor3";
      }
    },

    toColorDate(type: string) {
      if (type >= "6") {
        return "valor1";
      } else if (type >= "5") {
        return "valor2";
      } else if (type >= "4") {
        return "valor3";
      } else if (type >= "3") {
        return "valor4";
      } else if (type >= "2") {
        return "valor5";
      } else if (type >= "1") {
        return "valor6";
      } else if (type >= "0") {
        return "valor7";
      }
    },

    toColorNumber(type: number) {
      if (type >= 500000) {
        return "valor1";
      } else if (type >= 350000) {
        return "valor2";
      } else if (type >= 225000) {
        return "valor3";
      } else if (type >= 63000) {
        return "valor4";
      } else if (type >= 28000) {
        return "valor5";
      } else if (type >= 7000) {
        return "valor6";
      } else if (type >= 0) {
        return "valor7";
      }
    },

    getARS(id_ars: string) {
      switch (id_ars) {
        case "5":
          return "ARS CMD";
        case "14":
          return "MAPFRE SALUD ARS, S.A.";
        case "8":
          return "FUTURO";
        case "12":
          return "META SALUD";
        case "23":
          return "YUNEN";
        case "17":
          return "RESERVAS";
        case "13":
          return "MONUMENTAL";
        case "4":
          return "ASEMAP";
        case "1":
          return "ARS APS S A";
        case "21":
          return "SIMAG";
        case "16":
          return "RENACER";
        case "59":
          return "GRUPO MEDICO ASOCIADO";
        case "24":
          return "PRIMERA  ARS DE HUMANO";
        case "22":
          return "UNIVERSAL";
        case "29":
          return "ALBA GAS S.R.L.";
        case "10":
          return "HUMANO SEGUROS";
        case "20":
          return "SENASA CONTRIBUTIVO";
        case "61":
          return "SENASA SUBSIDIADO";
        case "18":
          return "SEMMA";
        case "65":
          return "IDOPPRIL";
        default:
          return "ARS Descripcion";
      }
    },

    async marcarListo(evaluacion: Evaluacion) {
      alert("Evaluacion Lista.");
      // try {
      //   const res = await updateOne(evaluacion);
      // } catch (error) {
      //   console.error(error);
      // }
    },

    toColor2(type: string) {
      if (type == "Error") {
        return "table-danger";
      } else if (type == "Función") {
        return "table-success";
      } else if (type == "Evaluacion") {
        return "table-warning";
      }
    },
    valorTotal() {
      this.totales.evaluacions = this.evaluacions.length;
      this.totales.valor = this.evaluacions.reduce(
        (accum: any, item: any) => accum + item.montRec,
        0
      );
    },

    formatNumber(value: number, decimal: boolean) {
      if (decimal == true) {
        return numeral(value).format("0,0.00");
      } else {
        return numeral(value).format("0,0");
      }
    },

    // formatNumber2(value: number) {
    //   return numeral(value).format("0,0");
    // },

    formatSecuence(value: number) {
      return numeral(value).format("00000000");
    },

    formatDate(dateValue: Date) {
      if (dateValue) {
        let out = moment(dateValue).add(4, "h");
        return moment(out).format("D/MM/yyyy");
      }
    },

    formatDateNumber(dateValue: Date) {
      let out = moment(dateValue).add(4, "hours");
      return moment(out).format("MM");
    },

    formatDate2(dateValue: Date) {
      let out = moment(dateValue).add(0, "h");
      return moment(out).format("D/MM/yyyy");
    },
  },

  updated() {
    // this.valorTotal();
    // this.data = !this.data;
  },
};
</script>

<style lang="css" scoped>
.inputList:focus {
  /* height:50px; */
  /* font-size:16px; */
  color: rgb(82, 45, 109);
  font-weight: bold;
}

.inputList {
  /* border-width: 0px;
  border: none; */

  background-color: rgba(0, 0, 0, 0);
  /* color:white; */
  border: none;
  outline: none;
  height: 30px;
  /* transition: height 1s;
  -webkit-transition: height 1s; */
}

.valor1 {
  /* text-align: center; */
  /* background-color: rgb(255, 0, 0); */
  /* margin: 1px; */
  font-weight: bold;
  color: rgb(0, 176, 80);
}

.valor2 {
  /* text-align: center; */
  /* background-color: rgb(255, 64, 0); */
  /* margin: 1px; */
  font-weight: bold;
  color: rgb(255, 192, 0);
}

.valor3 {
  /* text-align: center; */
  /* background-color: rgb(255, 128, 0); */
  /* margin: 1px; */
  font-weight: bold;
  color: rgb(255, 0, 0);
}

.valor4 {
  /* text-align: center; */
  /* background-color: rgb(255, 192, 0); */
  /* margin: 1px; */
  font-weight: bold;
  color: rgb(255, 192, 0);
}

.valor5 {
  /* text-align: center; */
  /* background-color: rgb(171, 187, 26); */
  /* margin: 1px; */
  font-weight: bold;
  color: rgb(171, 187, 26);
}

.valor6 {
  /* text-align: center; */
  /* background-color: rgb(86, 182, 53); */
  /* margin: 1px; */
  font-weight: bold;
  color: rgb(86, 182, 53);
}

.valor7 {
  /* text-align: center; */
  /* background-color: rgb(0, 176, 80); */
  /* margin: 1px; */
  font-weight: bold;
  color: rgb(0, 176, 80);
}

.bold {
  font-weight: bold;
}

.gridlistaevaluacions {
  display: grid;
  grid-auto-flow: dense;
  grid-template-rows: auto auto;
  gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
}

img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 25%;
  margin-bottom: 10px;
}

.ta-c {
  text-align: center;
}

p {
  margin: 0px;
}

.red {
  color: red;
}

.blue {
  color: blue;
}

.green {
  color: green;
}

td,
th {
  font-size: 75%;
}

.mith {
  background-color: rgb(160, 57, 149);
}

.cwhite {
  color: white;
}

.der {
  text-align: right;
}

.noRegist {
  font-weight: bold;
  color: rgb(255, 85, 85);
  text-align: center;
  /* background-color: rgb(255, 85, 85); */
  font-size: 75%;
}

/* Tabla */
#customers {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#customers td {
  border: 1px solid #ddd;
  padding: 3px;
}

#customers th {
  border: 1px solid #ddd;
  padding: 3px;
}

#customers tr:nth-child(even) {
  background-color: #f2f2f2;
}

#customers tr:hover {
  background-color: #ddd;
}

#customers th {
  padding-top: 8px;
  padding-bottom: 8px;
  text-align: center;
  background-color: rgb(82, 45, 109);
  color: white;
}

td,
th {
  font-size: 75%;
}

/* Modal 7 */

#search {
  margin-top: 35px;
}

.modal7 {
  z-index: 100;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  transition: all 500ms ease;
  overflow-y: scroll;
}

.contenedor7 {
  width: 350px;
  height: 350px;
  overflow-y: scroll;
  margin: auto;
  background: #fff;
  box-shadow: 1px 7px 25px rgba(0, 0, 0, 0.5);
  transition: all 500ms ease;
  position: relative;
}

.contenedor7 header {
  padding: 10px;
  background: rgb(82, 45, 109);
  color: #fff;
  position: fixed;
  width: 350px;
}

.contenedor7 label {
  position: absolute;
  top: 10px;
  right: 10px;
  color: #fff;
  font-size: 15px;
  cursor: pointer;
}

.contenido7 {
  padding: 7px;
}

.ars {
  margin: 0%;
  font-size: 12px;
}

/* End Modal */
</style>
