<script setup lang="ts"></script>

<template>
  <div class="container">
    <h1>Список</h1>
    <table class="custom-table">
      <thead>
        <tr>
          <th>Серийный номер</th>
          <th>Площадь</th>
          <th>Статус</th>
          <th>Название продукта</th>
          <th>Сервис</th>
          <th>Проблема</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>XB550012529</td>
          <td>AB-022</td>
          <td><span class="status no-warranty">NO WARRANTY</span></td>
          <td>L0805 INJET PRINTER</td>
          <td>Установка</td>
          <td>-- -- --</td>
          <td>-- -- --</td>
        </tr>
        <tr>
          <td>XB550012529</td>
          <td>AB-022</td>
          <td><span class="status no-warranty">NO WARRANTY</span></td>
          <td>L0805 INJET PRINTER</td>
          <td>Установка</td>
          <td>-- -- --</td>
          <td>-- -- --</td>
        </tr>
        <tr>
          <td>XB550012529</td>
          <td>AB-022</td>
          <td><span class="status no-warranty">NO WARRANTY</span></td>
          <td>L0805 INJET PRINTER</td>
          <td>Установка</td>
          <td>-- -- --</td>
          <td>-- -- --</td>
        </tr>
        <tr>
          <td>XB550012529</td>
          <td>AB-022</td>
          <td><span class="status no-warranty">NO WARRANTY</span></td>
          <td>L0805 INJET PRINTER</td>
          <td>Установка</td>
          <td>-- -- --</td>
          <td>-- -- --</td>
        </tr>
        <tr>
          <td>XB550012529</td>
          <td>AB-022</td>
          <td><span class="status no-warranty">NO WARRANTY</span></td>
          <td>L0805 INJET PRINTER</td>
          <td>Установка</td>
          <td>-- -- --</td>
          <td>-- -- --</td>
        </tr>
        <tr>
          <td>XB550012529</td>
          <td>AB-022</td>
          <td><span class="status no-warranty">NO WARRANTY</span></td>
          <td>L0805 INJET PRINTER</td>
          <td>Установка</td>
          <td>-- -- --</td>
          <td>-- -- --</td>
        </tr>
        <tr>
          <td>XB550012529</td>
          <td>AB-022</td>
          <td><span class="status no-warranty">NO WARRANTY</span></td>
          <td>L0805 INJET PRINTER</td>
          <td>Установка</td>
          <td>-- -- --</td>
          <td>-- -- --</td>
        </tr>
        <tr>
          <td>XB550012529</td>
          <td>AB-022</td>
          <td><span class="status no-warranty">NO WARRANTY</span></td>
          <td>L0805 INJET PRINTER</td>
          <td>Установка</td>
          <td>-- -- --</td>
          <td>-- -- --</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.container {
  padding: 60px 48px;

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
    margin-top: 40px;
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

  .status {
    padding: 4px 10px;
    border-radius: 6px;
    font-size: 12px;
    font-weight: bold;
    display: inline-block;
  }

  .no-warranty {
    background-color: #ffe6e6;
    color: #ff4d4f;
  }
}
</style>
