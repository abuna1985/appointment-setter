<template>
  <div id="main-app" class="container">
   <div class="row justify-content-center">
     <appointment-list :appointments="appointments" :errored="errored" :loading="loading" @remove="removeItem"/>
   </div>
  </div>
</template>

<script>
import AppointmentList from './components/AppointmentList';
import axios from 'axios';

export default {
  name: 'MainApp',
  data() {
    return {
      appointments: [],
      loading: true,
      errored: false
    }
  },
  created() {
    axios.get(`./data/appointments.json`)
      .then(response => this.appointments = response.data)
      .catch(function(error) {
        // eslint-disable-next-line
        console.log(error);
        self.errored = true;
      })
      // force a minimum of a 2 second delay
      setTimeout(() => {
        this.loading = false;
      }, 2000)
  },
  components: {
    AppointmentList
  },
  methods: {
    removeItem(apt) {
      this.appointments = this.appointments.filter(function(item) {
        return item.lastName !== apt.lastName;
      })
    }
  }
}
</script>
