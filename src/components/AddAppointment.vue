<template>
    <div class="col-12 mt-3">
    <div class="card textcenter mt-3">
      <div class="card-header bg-primary text-white" @click="hidepanel=!hidepanel; isVisible=!isVisible;">
        <font-awesome-icon icon="plus" class="mr-3"/><strong>Add Appointment</strong>
      </div>
    
      <transition  name="slide-fade">
        <div class="card-body add-appointment" :class="{ 'd-none': hidepanel}" v-if="isVisible">
        <form id="aptForm" @submit.prevent="requestAdd">
          <div class="form-group form-row">
            <label class="col-md-2 col-form-label text-md-right" for="patientName">Patient Name</label>
            <div class="col-md-10">
              <input
                type="text"
                class="form-control"
                name="patientName"
                id="patientName"
                placeholder="Patient Name"
                v-model="formData.patientName"
              >
            </div>
          </div>

          <div class="form-group form-row">
            <label class="col-md-2 col-form-label text-md-right" for="patientGuardian">Patient's Guardian</label>
            <div class="col-md-10">
              <input type="text" class="form-control" id="patientGuardian" placeholder="Patient's Guardian" v-model="formData.patientGuardian">
            </div>
          </div>

           <div class="form-group form-row">
            <label class="col-md-2 col-form-label text-md-right" for="patientAge">Patient's Age</label>
            <div class="col-md-10">
              <input type="number" v-model="formData.patientAge" class="form-control" id="patientAge" placeholder="Patient's Age">
            </div>
          </div>

          <div class="form-group form-row">
            <label class="col-md-2 col-form-label text-md-right" for="aptDate">Date</label>
            <div class="col-md-4">
              <input type="date" class="form-control" id="aptDate" v-model="formData.aptDate">
            </div>
            <label class="col-md-2 col-form-label text-md-right" for="aptTime">Time</label>
            <div class="col-md-4">
              <input type="time" class="form-control" name="aptTime" id="aptTime" v-model="formData.aptTime">
            </div>
          </div>

          <div class="form-group form-row">
            <label class="col-md-2 text-md-right" for="aptNotes">Apt. Notes</label>
            <div class="col-md-10">
              <textarea
                class="form-control"
                rows="4"
                cols="50"
                name="aptNotes"
                id="aptNotes"
                placeholder="Appointment Notes"
                v-model="formData.aptNotes"
              ></textarea>
            </div>
          </div>

          <div class="form-group form-row mb-0">
            <div class="offset-md-2 col-md-10">
              <button type="submit" class="btn btn-primary d-block ml-auto">Add Appointment</button>
            </div>
          </div>
        </form>
      </div>
      </transition>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AddAppointment',
  data() {
    return {
      hidepanel: true,
      formData: {},
      isVisible: false
    }
  },
  methods: {
    requestAdd: function() {
      this.formData = {
        patientName: this.formData.patientName,
        patientGuardian: this.formData.patientGuardian,
        patientAge: this.formData.patientAge,
        aptDate: this.formData.aptDate + " " + this.formData.aptTime,
        aptNotes: this.formData.aptNotes,
      };
      this.eventHub.$emit('add', this.formData);
      this.formData=[];
      this.hidepanel= true;
      this.isVisible= false;
    }
  }
}
</script>
<style>
  .card-header {
    cursor: pointer;
  }

  .slide-fade-enter-active {
    transition: all .8s linear;
  }

  .slide-fade-leave-active {
    transition: all .4s linear;
  }
  .slide-fade-enter { 
    transform: translateY(-25px);
    opacity: 0;
  }
  .slide-fade-leave-to {
  transform: translateY(-25px);
    opacity: 0; 
  }
</style>