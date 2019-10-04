<template>
  <div id="main-app" class="container">
   <div class="row justify-content-center">
     <add-appointment @add="addItem"></add-appointment>
     <search-appointments @searchRecords="searchAppointments"></search-appointments>
     <appointment-list :appointments="searchedApts" :errored="errored" :loading="loading" @remove="removeItem" @edit="editItem"/>
   </div>
  </div>
</template>

<script>
import AppointmentList from './components/AppointmentList';
import AddAppointment from './components/AddAppointment';
import SearchAppointments from './components/SearchAppointments';
import axios from 'axios';

export default {
  name: 'MainApp',
  data() {
    return {
      appointments: [],
      aptIndex: 0,
      searchTerms: "",
      loading: true,
      errored: false
    }
  },
  created() {
    axios.get(`./data/appointments.json`)
      .then(response => this.appointments = response.data.map(item => {
        item.aptIndex = this.aptIndex;
        this.aptIndex++;
        return item;
      }))
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
    AppointmentList,
    AddAppointment,
    SearchAppointments
  },
  computed: {
    searchedApts: function() {
      return this.appointments.filter(function(item) {
        return (
          item.patientName.toLowerCase().match(this.searchTerms.toLowerCase()) ||
          item.patientGuardian.toLowerCase().match(this.searchTerms.toLowerCase()) ||
          item.patientNotes.toLowerCase().match(this.searchTerms.toLowerCase()) 
        );
      });
    }
  },
  methods: {
    removeItem(apt) {
      this.appointments = this.appointments.filter(function(item) {
        return item.patientName !== apt.patientName;
      })
    },
    editItem(id, field, text) {
      const aptIndex = this.appointments.findIndex(function(item) {
        return item.aptIndex === id;
      })
      this.appointments[aptIndex][field] = text;
    },
    addItem(apt) {
      apt.aptIndex = this.aptIndex;
      this.aptIndex++;
      this.appointments.push(apt);
    },
    searchAppointments(terms) {
      this.searchTerms = terms;

    }
  }
}
</script>
