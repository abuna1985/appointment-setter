<template>
  <div class="col-12 col-md-10 col-lg-7">
    <section v-if="errored">
      <p>We're sorry, we're not able to retrieve this information at the moment, please try back later</p>
    </section>
    <section v-else class="list-group list-group-flush">
      <div class="d-flex justify-content-center align-items-center loader-container" v-if="loading">
        <div class="loader"></div>
      </div>

      <div class="list-group-item d-flex align-items-start" v-else v-for="item in appointments" :key="item.aptIndex">
        <button class="mr-2 btn btn-sm btn-danger" data-toggle="modal" data-target="#deleteModal">
          <font-awesome-icon icon="trash"></font-awesome-icon>
        </button>
        <!-- Modal -->
        <div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="deleteModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Delete Appointment</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <span>Are you sure you want to delete the appointment for {{item.patientName}} on {{formattedDate(item.aptDate)}}?</span>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-danger" @click="$emit('remove', item)" data-dismiss="modal">Delete Appointment</button>
              </div>
            </div>
          </div>
        </div>
        <div class="w-100">
          <div class="d-flex justify-content-between">
            <span class="h4 text-primary" contenteditable="contenteditable" @blur="$emit('edit', item.aptIndex, 'patientName', $event.target.innerText)">{{item.patientName}}</span>
            <span class="float-right">{{formattedDate(item.aptDate)}}</span>
          </div>
          <div class="owner-name">
            <span class="font-weight-bold text-primary mr-1">Guardian:</span>
            <span class="mr-1" contenteditable="contenteditable" @blur="$emit('edit', item.aptIndex, 'patientGuardian', $event.target.innerText)">{{item.patientGuardian}}</span>
            <span class="font-weight-bold text-primary mr-1 float-">Age:</span>
            <span contenteditable="contenteditable" @blur="$emit('edit', item.aptIndex, 'patientAge', $event.target.innerText)">{{item.patientAge}}</span>
          </div>
          <div contenteditable="contenteditable" @blur="$emit('edit', item.aptIndex, 'patientNotes', $event.target.innerText)">{{item.aptNotes}}</div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import format from 'date-fns/format'

export default {
  name: 'AppointmentList',
  props:{
    appointments: Array, 
    errored: Boolean, 
    loading: Boolean
  },
  methods: {
    formattedDate: function(date) {
      return format(new Date(date), "MM/dd/yy p");
    }
  }
}
</script>
<style>
  .loader-container {
    height: 100vh;
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