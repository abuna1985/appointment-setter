<template>
  <div class="col-12 col-md-10 col-lg-7">
    <section v-if="errored">
      <p>We're sorry, we're not able to retrieve this information at the moment, please try back later</p>
    </section>
    <section v-else class="list-group list-group-flush">
      <div class="d-flex justify-content-center align-items-center loader-container" v-if="loading">
        <div class="loader"></div>
      </div>
      <appointment v-for="item in appointments" :key="item.aptId" :row="item" v-else></appointment>
      <appointment-modal></appointment-modal>
    </section>
  </div>
</template>
<script>
import Appointment from './Appointment';
import AppointmentModal from './AppointmentModal';

export default {
  name: 'AppointmentList',
  props:{
    appointments: Array, 
    errored: Boolean, 
    loading: Boolean
  },
  components: {
    'appointment': Appointment,
    'appointment-modal': AppointmentModal
  }
}
</script>
<style>
  .loader-container {
    height: 50vh;
  }
  .loader {
    border: 16px solid #f3f3f3;
    border-radius: 50%;
    border-top: 16px solid #007bff;
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