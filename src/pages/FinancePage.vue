<script setup lang="ts"></script>

<template>
  <div class="container">
    <h1>Финансы</h1>
    <table class="custom-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Клиент</th>
          <th>Сумма $</th>
          <th>Дата</th>
          <th>Статус</th>
          <th>Дни</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="value in 9" :key="value">
          <td>INV-001</td>
          <td>Alpha Tech</td>
          <td>10.000</td>
          <td>25-Aug-2025</td>
          <td>Оплачено</td>
          <td>10</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.container {
  padding: 60px 48px;
}

h1 {
  font-weight: 600;
  font-size: 28px;
}

.custom-table {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  margin-top: 20px;
}

.custom-table thead {
  background-color: #5b3df6;
  color: white;
}

.custom-table th,
.custom-table td {
  padding: 20px 18px;
  text-align: left;
  font-size: 14px;
}

.custom-table tbody tr {
  border-bottom: 1px solid #f0f0f0;
}

.custom-table tbody tr:last-child {
  border-bottom: none;
}
</style>
