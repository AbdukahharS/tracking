<script lang="ts" setup>
import Map from "@/assets/icons/Group 4.png";
import Magnifier from "@/assets/icons/magnifier.svg";
import Tuning from "@/assets/icons/tuning.svg";
import Truck from "@/assets/truck.png";
import Driver from "@/assets/driver.png";
import PointRound from "@/assets/icons/round-point.svg";
import PointLocation from "@/assets/icons/location-point.svg";
import Phone from "@/assets/icons/phone.svg";
import Chat from "@/assets/icons/chat-rounded.svg";
import UserGroup from "@/assets/icons/user-group.svg";
</script>

<template>
  <div class="delivery-container">
    <div class="delivery-controls">
      <div class="search-bar">
        <Magnifier />
        <input type="text" placeholder="Search" />
        <Tuning />
      </div>
      <h1>Current delivery</h1>
      <div class="delivery-list">
        <div class="item" v-for="value in 5" :key="value">
          <div class="top">
            <div class="left">
              <span>Shipping number</span>
              <b>EV - 20170002346</b>
              <p>Grocery product</p>
            </div>
            <img :src="Truck" alt="Truck image" />
          </div>
          <div class="divider"></div>
          <div class="middle">
            <div class="location">
              <PointRound />
              <div>
                <p>2122 Grocery product</p>
                <span>Marshall Street, 42B, 22-01</span>
              </div>
            </div>
            <div class="location">
              <PointLocation />
              <div>
                <p>3452 California</p>
                <span>Marshall Street, 42B, 22-01</span>
              </div>
            </div>
          </div>
          <div class="divider"></div>
          <div class="bottom">
            <img :src="Driver" alt="" />
            <div>
              <span>Client</span>
              <b>Trevor Vakovskiy</b>
              <span>California LB-32</span>
            </div>
            <Phone />
            <Chat />
            <UserGroup />
          </div>
        </div>
      </div>
    </div>
    <div class="map-container">
      <img :src="Map" alt="" />
    </div>
  </div>
</template>

<style scoped>
.delivery-container {
  height: 100vh;
  overflow: hidden;
  max-height: 100vh;
  display: flex;
  flex-direction: row;
  background: #f8f8f8;

  .delivery-controls {
    width: 465px;
    border-top-right-radius: 40px;
    transform: translateX(40px);
    background-color: #f8f8f8;
    padding: 52px 30px 52px 0;
    height: 100vh;
    max-height: 100vh;
    overflow-y: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none; /* Chrome, Safari and Opera */
    }

    .search-bar {
      width: 100%;
      position: relative;

      input {
        width: 100%;
        padding: 12px 64px;
        border: 1px solid #dcdcdc;
        border-radius: 26px;
      }

      svg {
        position: absolute;
        top: 12px;

        &:first-child {
          left: 18px;
        }

        &:last-child {
          right: 18px;
        }
      }
    }

    h1 {
      font-weight: 600;
      font-size: 22px;
      margin-top: 30px;
    }
    .delivery-list {
      display: flex;
      flex-direction: column;
      gap: 30px;
      margin-top: 20px;

      .item {
        background: #fff;
        border: 1.5px solid #582fe6;
        padding: 20px 30px 36px 30px;
        border-radius: 20px;

        .divider {
          height: 1px;
          background: #582fe680;
          width: 100%;
          margin: 20px 0;
        }

        .top {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;

          .left {
            display: flex;
            flex-direction: column;
            gap: 8px;

            span {
              color: #bcbcbc;
              font-weight: 500;
              font-size: 18px;
            }

            p {
              color: #666666;
              font-size: 16px;
              font-weight: 600;
            }
          }
        }

        .middle {
          display: flex;
          flex-direction: column;
          gap: 20px;

          .location {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 22px;

            p {
              font-size: 14px;
              font-weight: 600;
            }

            span {
              color: #bcbcbc;
              font-size: 14px;
              font-weight: 500;
            }
          }
        }

        .bottom {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;

          img {
            border-radius: 50%;
          }

          div {
            display: flex;
            flex-direction: column;

            span {
              color: #bcbcbc;
              font-weight: 500;
              font-size: 14px;
            }

            b {
              font-weight: 600;
            }
          }
        }
      }
    }
  }

  .map-container {
    flex: 1;

    img {
      height: 100vh;
      width: 100%;
    }
  }
}
</style>
