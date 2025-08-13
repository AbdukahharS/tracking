<script lang="ts" setup>
import { ref } from "vue";
import BaseCheckBox from "@/components/BaseCheckBox.vue";
import Forward from "@/assets/icons/forward.svg";
import Up from "@/assets/icons/up.svg";
import ChevronRight from "@/assets/icons/chevron-right.svg";
import Driver from "@/assets/driver.png";

// Active tab state
const activeTab = ref("drivers");

// Mock data for tasks
const tasks = ref([
  { id: 1, name: "JR", amount: 24, done: false },
  { id: 2, name: "UI Review", amount: 15, done: true },
  { id: 3, name: "Client Call", amount: 5, done: false },
  { id: 4, name: "Code Review", amount: 12, done: true },
  { id: 5, name: "Code Review", amount: 12, done: true },
  { id: 6, name: "Project Assesment", amount: 18, done: true },
]);

function formatNumber(num: number): string {
  if (Math.abs(num) >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  } else if (Math.abs(num) >= 1_000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  } else {
    return num.toString();
  }
}

function setActiveTab(tab: string) {
  activeTab.value = tab;
}

const areaChartOptions = {
  dataLabels: { enabled: false },
  chart: { id: "vuechart-example", toolbar: { show: false }, zoom: { enabled: false } },
  stroke: { curve: "smooth" },
  xaxis: { categories: ["Mon", "Tues", "Wed", "Thu", "Fri", "Sat", "Sun"] },
  yaxis: { labels: { formatter: formatNumber } },
  colors: ["#5A32EA"],
};

const donutChartOptions = {
  labels: ["On time", "Late", "App Usage", "Fails", "Recovery"],
  dataLabels: { enabled: false },
  colors: ["#F7DA75", "#EECCC7", "#E1A2A6", "#233DAC", "#67A1E5"],
  legend: { show: false },
  plotOptions: { pie: { size: 250 } },
};

const series = [
  {
    name: "series-1",
    data: [100000000, 95000000, 83000000, 100000000, 95000000, 83000000, 78000000],
  },
];
const donutSeries = [100000000, 62000000, 43000000, 100000000, 60000000];
const donutChange = ["rise", "rise", "rise", "fall", "rise"];
</script>

<template>
  <div class="home-page">
    <h1>Dashboard</h1>
    <div class="stat-cards">
      <div class="stat-card">
        <span class="title">Booked loads</span>
        <div class="middle">
          <div class="stats">
            <span class="upper-stat">50</span>
            <span class="lower-stat" style="color: #68778a">2.5%</span>
          </div>
          <div class="icon" style="background: #e1e2e8">
            <Forward style="color: #68778a" />
          </div>
        </div>
        <p class="desc">Compared to last month</p>
      </div>
      <div class="stat-card">
        <span class="title">Booked loads</span>
        <div class="middle">
          <div class="stats">
            <span class="upper-stat">21</span>
            <span class="lower-stat" style="color: #f04d4d">2.5%</span>
          </div>
          <div class="icon" style="background: #fcecec">
            <Forward style="color: #f04d4d; rotate: 180deg" />
          </div>
        </div>
        <p class="desc">Compared to last month</p>
      </div>
      <div class="stat-card">
        <span class="title">Booked loads</span>
        <div class="middle">
          <div class="stats">
            <span class="upper-stat">143</span>
            <span class="lower-stat" style="color: #f68631">2.5%</span>
          </div>
          <div class="icon" style="background: #fff5e9">
            <Forward style="color: #f68631" />
          </div>
        </div>
        <p class="desc">Compared to last month</p>
      </div>
      <div class="stat-card">
        <span class="title">Booked loads</span>
        <div class="middle">
          <div class="stats">
            <span class="upper-stat">50</span>
            <span class="lower-stat" style="color: #68778a">2.5%</span>
          </div>
          <div class="icon" style="background: #e1e2e8">
            <Forward style="color: #68778a" />
          </div>
        </div>
        <p class="desc">Compared to last month</p>
      </div>
    </div>
    <h2>General statistics</h2>
    <div class="container">
      <apexchart
        type="area"
        height="300px"
        :options="areaChartOptions"
        :series="series"
      ></apexchart>
    </div>
    <div class="container inner">
      <h2>Performance</h2>
      <div class="donut-container">
        <div class="donut-wrapper">
          <apexchart
            type="donut"
            :options="donutChartOptions"
            height="250px"
            :series="donutSeries"
          ></apexchart>
        </div>
        <div class="donut-legend">
          <div v-for="(label, index) in donutChartOptions.labels" :key="label" class="legend-item">
            <div class="label-wrapper">
              <span
                class="legend-color"
                :style="{ backgroundColor: donutChartOptions.colors[index] }"
              ></span>
              <span class="legend-label">{{ label }}</span>
            </div>
            <span class="legend-value">{{ formatNumber(donutSeries[index]) }}</span>
            <div :class="`legend-change ${donutChange[index]}`">
              <Up
                :style="
                  donutChange[index] === 'rise'
                    ? { color: '#FD981F' }
                    : { color: '#FF1A1A', transform: 'rotate(180deg)' }
                "
              />
              8.2%
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container inner">
      <h2>Tasks for today</h2>
      <div class="task-list">
        <div v-for="task in tasks" :key="task.id" class="task-item">
          <BaseCheckBox v-model="task.done" color="#5A32EA" />
          <span class="task-name">{{ task.name }}</span>
          <span class="task-amount">{{ task.amount }}</span>
          <div class="task-status" :class="{ done: task.done }">
            {{ task.done ? "Done" : "Not done" }}
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="head">
        <div class="left">
          <button :class="{ active: activeTab === 'drivers' }" @click="setActiveTab('drivers')">
            Drivers
          </button>
          <button :class="{ active: activeTab === 'tracks' }" @click="setActiveTab('tracks')">
            Tracks
          </button>
        </div>
        <button class="right">More <ChevronRight /></button>
      </div>
      <div class="list">
        <!-- Drivers Tab Content -->
        <div v-if="activeTab === 'drivers'" class="tab-content">
          <div class="driver-item" v-for="value in 4" :key="value">
            <img :src="Driver" alt="Driver profile picture" />
            <div>
              <span class="name"> Trevor Vakovskiy </span>
              <span class="number"> +998 77 777 07 77 </span>
            </div>
            <div>
              <span>Дата начало</span>
              <p>Apr 11, 2025</p>
            </div>
            <div>
              <span>Дата окончания</span>
              <p>-- -- --</p>
            </div>
            <div>
              <span>Номер фуры</span>
              <p>AB2701EC67</p>
            </div>
            <div>
              <span>Товар</span>
              <p>Продукты</p>
            </div>
            <button>
              <ChevronRight class="icon" />
            </button>
          </div>
        </div>

        <!-- Tracks Tab Content -->
        <div v-if="activeTab === 'tracks'" class="tab-content">
          <div class="driver-item" v-for="value in 4" :key="value">
            <img :src="Driver" alt="Track profile picture" />
            <div>
              <span class="name"> Track Route #{{ value }} </span>
              <span class="number"> Status: Active </span>
            </div>
            <div>
              <span>Start Location</span>
              <p>Tashkent</p>
            </div>
            <div>
              <span>End Location</span>
              <p>Samarkand</p>
            </div>
            <div>
              <span>Distance</span>
              <p>{{ 250 + value * 50 }}km</p>
            </div>
            <div>
              <span>ETA</span>
              <p>{{ 4 + value }}h 30min</p>
            </div>
            <button>
              <ChevronRight class="icon" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-page {
  padding: 58px 48px;

  h1 {
    font-weight: 600;
    font-size: 28px;
  }

  .stat-cards {
    display: flex;
    gap: 20px;
    flex-direction: row;
    margin: 40px 0;

    .stat-card {
      flex: 1;
      background: #fff;
      border-radius: 24px;
      padding: 20px;

      .title {
        font-size: 18px;
        color: #5a32ea;
      }

      .middle {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        .stats {
          flex: 1;
          display: flex;
          flex-direction: column;

          .upper-stat {
            font-weight: 500;
            font-size: 36px;
          }

          .lower-stat {
            font-size: 16px;
            font-weight: 500;
          }
        }

        .icon {
          width: 58px;
          height: 58px;
          background: #e1e2e8;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
        }
      }

      .desc {
        font-weight: 400;
        font-size: 14px;
        color: #666;
        width: 60%;
        margin-top: 10px;
      }
    }
  }

  h2 {
    font-weight: 600;
    font-size: 24px;
  }

  .container {
    background: #ffffff;
    border-radius: 20px;
    margin-top: 20px;

    &.inner {
      margin-top: 50px;
    }

    h2 {
      padding: 30px 24px;
    }
  }

  .donut-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 75px;

    .donut-wrapper {
      transform: rotate(-20deg);
    }

    .donut-legend {
      display: flex;
      flex: 1;
      flex-direction: row;
      flex-wrap: wrap;
      gap: 30px 50px;
      padding: 20px;
    }

    .legend-item {
      padding: 0 30px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      font-size: 14px;
      width: calc(50% - 25px);
    }

    .label-wrapper {
      width: 120px;
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 10px;

      .legend-color {
        width: 14px;
        height: 14px;
        border-radius: 7px;
        flex-shrink: 0;
      }

      .legend-label {
        color: #333;
        font-size: 16px;
      }
    }

    .legend-value {
      font-weight: 500;
      color: #6f4ced;
      font-size: 18px;
    }

    .legend-change {
      font-weight: 600;
      font-size: 16px;
      padding: 10px 14px;
      border-radius: 22px;
      display: flex;
      align-items: center;
      gap: 12px;

      &.rise {
        background: #ffecd5;
      }
      &.fall {
        background: #ffe3e3;
      }
    }
  }

  .task-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0 20px 28px 20px;
    gap: 30px;

    .task-item {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 40px;

      .task-name {
        width: 180px;
        font-size: 20px;
        font-weight: 500;
      }

      .task-amount {
        color: #5a32ea;
        font-size: 20px;
        font-weight: 500;
        width: 30px;
      }

      .task-status {
        width: 104px;
        text-align: center;
        padding: 6px 0;
        border-radius: 18px;
        font-size: 16px;
        font-weight: 500;

        &.done {
          background: #55fe4c33;
          color: #3cff00;
        }

        &:not(.done) {
          background: #fe4c4c33;
          color: #ff4a4a;
        }
      }
    }
  }

  .footer {
    margin-top: 40px;

    .head {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;

      .left {
        background: #fff;
        border-radius: 20px;

        button {
          font-size: 18px;
          font-weight: 600;
          padding: 6px 40px;
          border-radius: 20px;
          color: #5a32ea99;
          transition: all 0.3s ease;
          cursor: pointer;
          border: none;
          background: transparent;

          &:hover {
            color: #5a32ea;
          }

          &.active {
            background: #5a32ea;
            color: #fff;
          }
        }
      }

      .right {
        color: #5a32ea;
        display: flex;
        align-items: center;
        flex-direction: row;
        gap: 12px;
        font-weight: 500;
        font-size: 20px;
        transition: transform 0.2s ease-in-out;
        border: none;
        background: transparent;
        cursor: pointer;

        &:hover {
          transform: scale(1.2);
        }
      }
    }

    .list {
      .tab-content {
        margin-top: 20px;

        .driver-item {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          background: #fff;
          padding: 22px 30px;
          border-radius: 20px;

          &:not(:last-child) {
            margin-bottom: 20px;
          }

          img {
            border-radius: 50%;
            width: 62px;
            height: 62px;
          }

          div {
            display: flex;
            flex-direction: column;
            gap: 4px;
            align-items: center;

            span {
              font-weight: 600;
              font-size: 16px;
              color: #bcbcbc;

              &.name {
                font-size: 18px;
                color: #000;
              }

              &.number {
                font-weight: 500;
              }
            }

            p {
              font-weight: 500;
              font-size: 18px;
              color: #666666;
            }
          }

          button {
            background: transparent;
            border: none;
            cursor: pointer;

            .icon {
              color: #5a32ea;
              scale: 1.25;
            }
          }
        }
      }
    }
  }
}
</style>
