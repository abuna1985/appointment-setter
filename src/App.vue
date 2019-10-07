<template>
  <div>
    <header>
      <appointment-header></appointment-header>
    </header>
    <div id="main-app" class="container">
      <div class="row justify-content-center">
        <add-appointment></add-appointment>
        <search-appointments @searchRecords="searchAppointments" :myKey="filterKey" :myDir="filterDir" @requestKey="changeKey" @requestDir="changeDir"></search-appointments>
        <appointment-list :appointments="filterApts" :errored="errored" :loading="loading" />
      </div>
    </div>
  </div>
</template>

<script>
import AppointmentList from './components/AppointmentList';
import AddAppointment from './components/AddAppointment';
import SearchAppointments from './components/SearchAppointments';
import AppointmentHeader from './components/AppointmentHeader';
import axios from 'axios';
import orderBy from 'lodash.orderby';
import without from 'lodash.without';
import findIndex from 'lodash.findindex';

export default {
  name: 'MainApp',
  data() {
    return {
      appointments: [],
      aptIndex: 0,
      filterKey: 'patientName',
      filterDir: 'asc',
      searchTerms: '',
      loading: true,
      errored: false,
    }
  },
  created() {
    axios.get(`./data/appointments.json`)
      .then(response => this.appointments = response.data.map(item => {
         item.aptId = this.aptIndex;
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
      }, 2000);
  },
  mounted() {
     this.eventHub.$on('edit', (id, field, text) => {
        const aptIndex = findIndex(this.appointments, function(apt) {
          return apt.aptId == id;
        });
        this.appointments[aptIndex][field] = text;
      })

      this.eventHub.$on('remove', apt => {
        this.appointments = without(this.appointments, apt);
      })

      this.eventHub.$on('add', apt => {
        apt.aptId = this.aptIndex;
        this.aptIndex++;
        this.appointments.push(apt);
      })
  },
  components: {
    AppointmentList,
    AddAppointment,
    SearchAppointments,
    AppointmentHeader
  },
  computed: {
    searchedApts: function() {
      return this.appointments.filter(item => {
        return (
          item.patientName.toLowerCase().match(this.searchTerms.toLowerCase()) ||
          item.patientGuardian.toLowerCase().match(this.searchTerms.toLowerCase()) ||
          item.aptNotes.toLowerCase().match(this.searchTerms.toLowerCase())
        )
      });
    },
    filterApts: function() {
      return orderBy(
        this.searchedApts,
        item => {
          return item[this.filterKey].toLowerCase();
        },
        this.filterDir
      );
    }
  },
  methods: {
    changeKey: function(value) {
      this.filterKey = value;
    },
    changeDir: function(value) {
      this.filterDir = value;
    },
    searchAppointments(terms) {
      this.searchTerms = terms;
    }
  }
}
</script>
