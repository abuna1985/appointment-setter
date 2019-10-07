<template>
   <div class="list-group-item d-flex align-items-start">
        <button class="mr-2 btn btn-sm btn-danger" data-toggle="modal" data-target="#deleteModal" @click.prevent="toggleModal(row)">
          <font-awesome-icon icon="trash"></font-awesome-icon>
        </button>
        <div class="w-100">
          <div class="d-flex justify-content-between">
            <span class="h4 text-primary" contenteditable="contenteditable" @blur="editAppointment(row.aptId, 'patientName', $event.target.innerText)">{{row.patientName}}</span>
            <span class="float-right">{{row.aptDate | formatDate}}</span>
          </div>
          <div class="owner-name">
            <span class="font-weight-bold text-primary mr-1">Guardian:</span>
            <span class="mr-1" contenteditable="contenteditable" @blur="editAppointment(row.aptId, 'patientGuardian', $event.target.innerText)">{{row.patientGuardian}}</span>
            <span class="font-weight-bold text-primary mr-1 float-">Age:</span>
            <span contenteditable="contenteditable" @blur="editAppointment(row.aptId, 'patientAge', $event.target.innerText)">{{row.patientAge}}</span>
          </div>
          <div contenteditable="contenteditable" @blur="editAppointment(row.aptId, 'patientNotes', $event.target.innerText)">{{row.aptNotes}}</div>
        </div>
      </div>
</template>
<script>

  export default {
    name: 'Appointment',
    props: ['row'],
    methods: {
      toggleModal(row) {
        this.eventHub.$emit('toggleModal', row);
      },
      editAppointment(id, field, text) {
        this.eventHub.$emit('edit', id, field, text);
      }
    }
  }
</script>