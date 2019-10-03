<template>
  <div class="col-12 col-md-10 col-lg-7">
    <section v-if="errored">
      <p>We're sorry, we're not able to retrieve this information at the moment, please try back later</p>
    </section>
    <section v-else class="list-group list-group-flush">
      <div v-if="loading" class="loader"></div>
      <div class="list-group-item d-flex align-items-start" v-else v-for="(item, i) in listOfAppointments" :key="i">
        <button class="mr-2 btn btn-sm btn-danger" @click="buttonClicked">
          <font-awesome-icon icon="trash"></font-awesome-icon>
        </button>
        <div class="w-100">
          <div class="d-flex justify-content-between">
            <span class="h4 text-primary">{{item.firstName}} {{item.lastName}}</span>
            <span class="float-right">{{formattedDate(item.aptDate)}}</span>
          </div>
          <div class="owner-name">
            <span class="font-weight-bold text-primary mr-1">Guardian:</span>
            <span class="mr-1">{{item.patientGuardian}}</span>
            <span class="font-weight-bold text-primary mr-1 float-">Age:</span>
            <span>{{item.patientAge}}</span>
          </div>
          <div>{{item.aptNotes}}</div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import format from 'date-fns/format'

export default {
  name: 'AppointmentList',
  props: ["listOfAppointments", "errored", "loading"],
  methods: {
    formattedDate: date => {
      return format(new Date(date), "MM/dd/yy p");
    },
    //TODO: determine how to emit child event (remove/delete) from child to parent component
    buttonClicked() {
      this.$emit('remove-item')
    }
  }
}
</script>
<style>
  .loader {
    border: 16px solid #f3f3f3;
    border-radius: 50%;
    border-top: 16px solid #3498db;
    width: 100px;
    height: 100px;
    -webkit-animation: spin 2s linear infinite; /* Safari */
    animation: spin 2s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>