<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
html, body, div, span, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
abbr, address, cite, code,
del, dfn, em, img, ins, kbd, q, samp,
small, strong, sub, sup, var,
b, i,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, figcaption, figure,
footer, header, hgroup, menu, nav, section, summary,
time, mark, audio, video {
    margin:0;
    padding:0;
    border:0;
    outline:0;
    font-size:100%;
    vertical-align:baseline;
}

article,aside,canvas,details,figcaption,figure,
footer,header,hgroup,menu,nav,section,summary {
    display:block;
}

ul,li {
    list-style:none;
}

a {
    margin:0;
    padding:0;
    border:0;
    font-size:100%;
}
.clearfix::after {
  content: '';
  display: block;
  clear: both;
}
.fill-bg {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: linear-gradient(to bottom, #f8f8f8, #e1dfdf);
  z-index: -2;
}

.fill-bg-2 {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: #F4F4F2;
  z-index: -2;
}

.swiper-pagination-bullet-active {
  background: #fff!important;
}
.locked {
  overflow: hidden;
}

</style>
