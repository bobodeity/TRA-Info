<template>
  <div id="app">
    <div class="ui grid stackable container">
      <h2 class="row">
        <div class="ui sixteen wide column">

          <router-link tag="h2" class="ui header pointer" :to="{name: 'Timetable'}">
            <!-- logo image -->
            <img class="ui image rounded" src="static/img/logo.png">
            <!-- header text -->
            <div class="content">
              臺鐵資訊查詢
              <div class="ui sub header">
                TRA Information
              </div>
            </div>
          </router-link>

        </div>
      </h2>

      <div class="row">
        <div class="ui computer tablet only sixteen wide column">
          <div class="fb-like" data-href="https://www.facebook.com/TRAInformation/" data-layout="standard" data-action="like" data-size="small" data-show-faces="false"
            data-share="true"></div>
        </div>
      </div>

      <div class="row">
        <div class="ui sixteen wide column">

          <div class="ui tabular menu">
            <router-link class="item" :to="{ name: 'Timetable' } ">時刻表查詢</router-link>
            <router-link class="item" :to="{ name: 'Station' }">車站資訊查詢</router-link>
            <router-link class="item" :to="{ name: 'About' }">關於</router-link>
          </div>
        </div>
      </div>

    </div>

    <router-view></router-view>

    <div class="ui grid stackable container">
      <div class="ui sixteen wide column">
        <div class="ui divider"></div>
        臺鐵資訊查詢
        <div>TRA INFORMATION</div>
      </div>
    </div>

  </div>
</template>

<script>
  // Google Analytics
  (function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function () {
      (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date();
    a = s.createElement(o),
      m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)
  })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

  ga('create', 'UA-40661556-5', 'auto');
  ga('send', 'pageview');


  // Facebook JavaScript SDK
  (function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/zh_TW/sdk.js#xfbml=1&version=v2.8";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  /**
   * Trun off Mobile Device scale over 1
   */
  document.addEventListener('touchmove', function (event) {
    if (event.scale !== 1) {
      event.preventDefault();
    }
  }, false);

  export default {
    name: 'app'
  }

</script>

<style>
  #app {
    padding-top: 3em;
  }

  .pointer {
    cursor: pointer;
  }

  .icon.trip.header {
    font-size: 10px;
    margin: 0 0 0 0;
  }
  /* Hide if the train is departured */

  .ui.table tr.display-none {
    display: none !important;
  }

  .ui.card.display-none {
    display: none !important;
  }
  /* Font Size */

  .departure-time {
    font-size: 1.2em;
  }
  /* Delay indicator (minutes) */

  .delay-indicator,
  .vertical-middle {
    vertical-align: middle !important;
  }
  /* Force in-line icon margin-off */

  .inline-icon {
    margin: 0 !important;
  }

</style>
