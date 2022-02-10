<template>
  <a
    class="github-corner"
    href="https://github.com/qq919006380/MindMap"
    title="Fork me on GitHub"
    target="_blank"
  >
    <svg width="80" height="80" viewBox="0 0 250 250">
      <title>Fork me on GitHub</title>
      <path d="M0 0h250v250" />
      <path
        class="octo-arm"
        d="M127.4 110c-14.6-9.2-9.4-19.5-9.4-19.5 3-7 1.5-11 1.5-11-1-6.2 3-2 3-2 4 4.7 2 11 2 11-2.2 10.4 5 14.8 9 16.2"
        fill="currentColor"
        style="transform-origin:130px 110px;"
      />
      <path
        class="octo-body"
        d="M113.2 114.3s3.6 1.6 4.7.6l15-13.7c3-2.4 6-3 8.2-2.7-8-11.2-14-25 3-41 4.7-4.4 10.6-6.4 16.2-6.4.6-1.6 3.6-7.3 11.8-10.7 0 0 4.5 2.7 6.8 16.5 4.3 2.7 8.3 6 12 9.8 3.3 3.5 6.7 8 8.6 12.3 14 3 16.8 8 16.8 8-3.4 8-9.4 11-11.4 11 0 5.8-2.3 11-7.5 15.5-16.4 16-30 9-40 .2 0 3-1 7-5.2 11l-13.3 11c-1 1 .5 5.3.8 5z"
        fill="currentColor"
      />
    </svg>
  </a>
  <div class="title">一个思维导图在线编辑器</div>
  <div class="container">
    <div class="card">
      <svg
        viewBox="0 0 837 1045"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        xmlns:sketch="http://www.bohemiancoding.com/sketch/ns"
      >
        <g
          id="Page-1"
          stroke="none"
          stroke-width="1"
          fill="none"
          fill-rule="evenodd"
          sketch:type="MSPage"
        >
          <path
            d="M353,9 L626.664028,170 L626.664028,487 L353,642 L79.3359724,487 L79.3359724,170 L353,9 Z"
            class="Polygon"
            stroke="#007FB2"
            stroke-width="6"
            sketch:type="MSShapeGroup"
          />
          <text
            class="Polygon"
            x="203"
            y="350"
            fill="#219F94"
            textLength="250"
            style="font-size: 100px;"
          >在线</text>

          <path
            d="M78.5,529 L147,569.186414 L147,648.311216 L78.5,687 L10,648.311216 L10,569.186414 L78.5,529 Z"
            class="Polygon"
            stroke="#EF4A5B"
            stroke-width="6"
            sketch:type="MSShapeGroup"
          />
          <text
            class="Polygon"
            x="732"
            y="260"
            fill="#FF6464"
            textLength="80"
            style="font-size: 40px;"
          >极简</text>

          <path
            d="M773,186 L827,217.538705 L827,279.636651 L773,310 L719,279.636651 L719,217.538705 L773,186 Z"
            class="Polygon"
            stroke="#FF6464"
            stroke-width="6"
            sketch:type="MSShapeGroup"
          />
          <text
            class="Polygon"
            x="19"
            y="630"
            fill="#FFE162"
            textLength="120"
            style="font-size: 60px;"
          >效率</text>

          <path
            d="M639,529 L773,607.846761 L773,763.091627 L639,839 L505,763.091627 L505,607.846761 L639,529 Z"
            class="Polygon"
            stroke="#BAFFB4"
            stroke-width="6"
            sketch:type="MSShapeGroup"
          />
          <text
            class="Polygon"
            x="515"
            y="720"
            fill="#FFFDA2"
            textLength="250"
            style="font-size: 100px;"
          >免费</text>

          <path
            d="M281,801 L383,861.025276 L383,979.21169 L281,1037 L179,979.21169 L179,861.025276 L281,801 Z"
            class="Polygon"
            stroke="#8946A6"
            stroke-width="6"
            sketch:type="MSShapeGroup"
          />
          <text
            class="Polygon"
            x="200"
            y="950"
            fill="#FFAD60"
            textLength="160"
            style="font-size: 80px;"
          >开源</text>
        </g>
      </svg>
    </div>

    <h1 class="gradient-text" @click="pushMindMap">快速使用</h1>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
function pushMindMap() {
  router.push({
    name: 'mindMap'
  })
}

</script>
<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap");
@media screen and (max-width: 960px) {
  .container {
    display: block !important;
    text-align: center !important;
    .card,
    .gradient-text {
      margin: 0 !important;
    }
    .card {
      svg {
        width: 280px !important;
        height: 400px !important;
      }
    }
  }
  .title {
    top: 80% !important;
    letter-spacing: 10px !important;
    transform: translate(-50%, 0) !important;
  }
}
.container {
  background: linear-gradient(120deg, #c0d8c0 50%, #fbf8f1 50%);
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .card {
    svg {
      width: 380px;
      height: 500px;
    }
    margin-left: 10%;
    .Polygon {
      animation: float 1s infinite ease-in-out alternate;
    }
    @keyframes float {
      100% {
        transform: translateY(20px);
      }
    }
  }
  .gradient-text {
    margin-right: 10%;
    font-family: "Poppins", sans-serif;
    font-size: 8vmin;
    line-height: 20vmin;
    color: transparent;
    background: conic-gradient(
      #d9d7f1 12%,
      #baabda 12%,
      #baabda 33%,
      #e7fbbe 33%,
      #e7fbbe 55%,
      #ffcbcb 55%,
      #ffcbcb 70%,
      #b5deff 70%,
      #b5deff 87%,
      #f7d1ba 87%
    );
    background-size: 50%;
    background-clip: text;
    -webkit-background-clip: text;
    cursor: pointer;
  }
}

.title {
  position: absolute;
  left: 50%;
  transform: translate(-28%, 0);
  top: 60px;
  color: #999;
  letter-spacing: 20px;
  font-size: 18px;
}
.github-corner svg {
  position: absolute;
  right: 0;
  top: 0;
  mix-blend-mode: darken;
  color: #eeeeee;
  fill: #353535;
  clip-path: polygon(0 0, 100% 0, 100% 100%);
}
.github-corner:hover .octo-arm {
  animation: octocatwave 0.56s;
  @keyframes octocatwave {
    0%,
    100% {
      transform: rotate(0);
    }
    20%,
    60% {
      transform: rotate(-20deg);
    }
    40%,
    80% {
      transform: rotate(10deg);
    }
  }
}
</style>