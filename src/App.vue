<template>
  <div id="main-app" class="container">
   <div class="row justify-content-center">
     <appointment-list :listOfAppointments="appointments" :hasErrored="errored" :isLoading="loading" @remove-item="removeItem" />
   </div>
  </div>
</template>

<script>
import AppointmentList from './components/AppointmentList';
export default {
  name: 'MainApp',
  data: () => {
    return {
      appointments: [],
      loading: true,
      errored: false
    }
  },
  mounted() {
    this.axios
    .get('./data/appointments.json')
    .then(response => {
      this.appointments = response.data.appointments
    })
    .catch(error => {
      // eslint-disable-next-line
      console.log(error)
      this.errored = true
    })
   
    setTimeout(() => {
      this.loading = false;
    }, 2000)
  },
  components: {
    AppointmentList
  },
  methods: {

    //TODO: determine how to accept child component and remove it from the appointments array
    removeItem: apt => {
      if (this.appointments.length) {
        // eslint-disable-next-line
        console.log('deleted')
        // eslint-disable-next-line
        console.log(apt);
      }
    }
  }
}
</script>
