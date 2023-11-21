<script setup>
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>

 

  <RouterView />
</template>

<style >
*{
  font-family: 'Clash Display', sans-serif; 
}
:root {
  --primary-color: #0071fe;
  --error-color: #f23648;
  --error-bg-color: #fddfe2;
  --success-color: #21a67a;
  --success-bg-color: #e0eee4;
}
.mag{
  margin-top: 6rem!important;
}
.error-message{
  color: #f23648  !important;
}
.form-group.invalid input {
  background-color: var(--error-bg-color);
  color: var(--error-color);
}

.TextInput.has-error input:focus {
  border-color: var(--error-color);
}

.TextInput.has-error .help-message {
  color: var(--error-color);
}

.TextInput.success input {
  background-color: var(--success-bg-color);
  color: var(--success-color);
}

.TextInput.success input:focus {
  border-color: var(--success-color);
}

.TextInput.success .help-message {
  color: var(--success-color);
}
</style>
