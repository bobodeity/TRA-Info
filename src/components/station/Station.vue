<template>

  <div class="ui grid stackable container">

    <Loading v-if="status == 'loading'"></Loading>

    <div class="row">

      <div class="ui sixteen wide column">
        <div class="ui red segment">
          <h2 class="ui header">{{ station.WebsiteName }}
            <p>{{ station.Station_EName }} Station</p>
            <div class="sub header">
              {{ period.humanize }}，共有 {{ trainInfo.length }} 班列車。
              <a class="ui label" v-if="!period.today" @click="backToday()"><i class="reply icon"></i>回到今天</a>
            </div>

          </h2>

          <div class="ui list">
            <div class="item">
              <div class="ui orange horizontal label">電話</div>
              {{ station.Telephone }}
            </div>
            <div class="item">
              <div class="ui green horizontal label">地址</div>
              {{ station.ChineseAddress }}
            </div>
          </div>

          <!-- 隱藏已離站列車 toggle -->
          <div class="ui toggle checkbox" v-if="period.today && trainInfo">
            <input type="checkbox" v-model="hideDepartured">
            <label>隱藏已離站列車</label>
          </div>

        </div>

      </div>
    </div>


    <div class="row">
      <div class="ui sixteen wide column">

        <div class="ui two buttons">
          <div class="ui button" :class=" (direction == 0) ? 'active' : '' " @click="directionSwitch(0)">順行</div>
          <div class="ui button" :class=" (direction == 1 ) ? 'active' : ''  " @click="directionSwitch(1) ">逆行</div>
        </div>

      </div>
    </div>

    <!-- COMPUTER TABLET ONLY -->
    <div class="computer tablet only row ">

      <div class="ui sixteen wide column ">

        <table class="ui selectable striped definition table ">
          <thead>
            <th class="two wide ">詳細資料</th>

            <th class="one wide center aligned ">
              <h4 class="ui header ">經由
                <div class="sub header ">Via</div>
              </h4>
            </th>

            <th class="two wide center aligned ">
              <h4 class="ui header ">開車時間
                <div class="sub header ">Departure</div>
              </h4>
            </th>

            <th class="two wide center aligned "></th>
            <th class="two wide center aligned ">
              <h4 class="ui header ">終點站
                <div class="sub header ">Destination</div>
              </h4>
            </th>
            <th class="one wide left aligned " v-if="delay">
              <h4 class="ui header ">誤點
                <div class="sub header ">Delay</div>
              </h4>
            </th>

          </thead>
          <tbody>

            <!-- Link; Rendered as <tr> -->
            <router-link tag="tr" class="pointer " :key="item.TrainNo" v-show="(!period.today || !hideDepartured || !isDeparture( item.DepartureTime ))"
              v-for="item in trainInfoList" :to="{
                name: 'Timetable.train',
                params: {
                  train: item.TrainNo,
                  date: period.date
                }
              }">

              <!-- 車次 -->
              <td>
                <h3 class="ui header" :class="[trainClassZH(item.TrainTypeName, true)]">
                  {{ trainClassZH(item.TrainTypeName) }}
                  <div class="sub header ">{{ item.TrainNo }}</div>
                </h3>
              </td>

              <!-- 經由 -->
              <td class="center aligned ">
                <div class="ui circular basic label" :class="[tripLine(item.TripLine, true)]" v-if="item.TripLine">
                  {{ tripLine(item.TripLine) }}
                </div>
              </td>

              <!-- 出發時間 -->
              <td class="center aligned departure-time ">{{ item.DepartureTime }}</td>

              <!-- 途經 -->
              <td class="center aligned">
                <h5 class="ui trip icon header ">
                  <i class="arrow right icon "></i>
                  <div class="sub header ">
                    <!-- Arrow Note -->
                  </div>
                </h5>
              </td>

              <!-- 終點站 -->
              <td class="center aligned ">
                <h5 class="ui header ">
                  {{ searchStation(item.EndingStationID).Station_Name }}
                  <div class=" sub header ">
                    {{ searchStation(item.EndingStationID).Station_EName }}
                  </div>
                </h5>
              </td>

              <!-- 誤點 -->
              <td v-if="delay">
                <div v-if="isDelay(item.TrainNo, delayInfo, true)">
                  <div class="ui circular empty horizontal medium label delay-indicator" :class="isDelay(item.TrainNo, delayInfo, true)"></div>
                  <span>{{ isDelay( item.TrainNo, delayInfo ) }}</span>
                </div>
              </td>

            </router-link>
          </tbody>
        </table>

      </div>
    </div>


    <!-- MOBILE TABLET ONLY -->
    <div class="mobile only row">

      <div class="ui sixteen wide column">

        <!-- Link; Rendered as <div> -->
        <router-link tag="div" class="ui fluid card pointer" :key="item.TrainNo" v-show="(!period.today || !hideDepartured || !isDeparture( item.DepartureTime ))"
          v-for="item in trainInfoList" :to="{
                name: 'Timetable.train',
                params: {
                  train: item.TrainNo,
                  date: period.date
                }
              }">

          <div class="content">

            <div class="ui grid">

              <!-- 車次 -->
              <div class="twelve wide column">
                <h3 class="ui header" :class="[trainClassZH(item.TrainTypeName, true)]">
                  {{ trainClassZH(item.TrainTypeName) }}
                  <div class="sub header ">{{ item.TrainNo }}</div>
                </h3>
              </div>

              <!-- 經由 -->
              <div class="four wide column">

                <div class="right floated ui">
                  <div class="ui circular basic label" :class="[tripLine(item.TripLine, true)]" v-if="item.TripLine">
                    {{ tripLine(item.TripLine) }}
                  </div>
                </div>

              </div>
            </div>

            <div class="description">

              <div class="ui grid">
                <!-- 出發時間 -->
                <div class="five wide column departure-time">{{ item.DepartureTime }}</div>
                <!-- 箭頭 -->
                <div class="one wide column"><i class="arrow right icon"></i></div>
                <!-- 終點站 -->
                <div class="six wide column">
                  {{ searchStation(item.EndingStationID).Station_Name }} {{ searchStation(item.EndingStationID).Station_EName }}
                </div>
                <!-- 誤點 -->
                <div class="three wide column">
                  <div class="left floated ui">
                    <div v-if="isDelay(item.TrainNo, delayInfo, true)">
                      <div class="ui circular empty horizontal medium label delay-indicator" :class="isDelay(item.TrainNo, delayInfo, true)"></div>
                      <span>{{ isDelay( item.TrainNo, delayInfo ) }}</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </router-link>

      </div>
      <!-- END OF 16 WIDE COLUMN -->
    </div>
    <!-- END OF MOBILE ONLY ROW  -->

  </div>


</template>


<script>
  export default {
    data() {
      return {
        station: '',
        trainInfo: false,
        delayInfo: [],
        direction: undefined,
        hideDepartured: true,
        status: 'loading',
      }
    },
    methods: {
      /**
       * Page initialization
       */
      init: function () {

        this.station = this.searchStation(this.$route.params.station);

        // Station not exists
        if (!this.station) {
          this.$router.push('/station');
        }

        /**
         * Send a request to get train info
         */
        this.getTrainInfo(
          this.station.Station_Code_4
        ).then(
          (response) => {
            this.trainInfo = response.data;
            this.status = true;
          },
          (error) => {
            this.status = false;
          }
        );

        // If it's today, send live board reuqest
        this.getLiveboard(this.station.Station_Code_4).then(
          (response) => {
            this.delayInfo = response.data;
          }
        ) && this.period.today;

      },
      /**
       * Switch direction
       */
      directionSwitch: function (d) {

        this.direction = (d == this.direction) ?
          undefined :
          d;
      },
      /**
       * Back today
       */
      backToday: function () {
        this.period = this.searchDate()
        this.status = 'loading'
        this.trainInfo = false;
        this.init()
        this.$router.replace({
          params: {
            date: this.period.date
          }
        })
      }
    },
    computed: {
      /**
       * Check if it's qualify to show delay information
       */
      delay: function () {
        return (!!this.delayInfo.length && this.period.today) || false;
      },

      /**
       * Train info search
       */
      trainInfoList: function () {

        if (this.direction == undefined) {
          return this.trainInfo
        }

        return this.trainInfo.filter((train) => {
          return train.Direction == this.direction
        })
      }

    },
    mounted() {
      this.init();
    },
  }

</script>
