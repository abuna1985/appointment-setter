<template>
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
          <span>Are you sure you want to delete the appointment for {{modal.patientName}} on {{modal.aptDate | formatDate}}?</span>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-danger" @click="deleteAppointment(modal)" data-dismiss="modal">Delete Appointment</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'AppointmentModal',
    data() {
      return {
        active: false,
        modal: {},
      }
    },
    methods: {
      show() {
        this.active = true;
      },
      deleteAppointment(apt) {
        this.eventHub.$emit('remove', apt)
      }
    },
    created() {
      this.eventHub.$on('toggleModal', (row) => {
        this.modal = row;
        this.show();
      });
    }
  }
</script>