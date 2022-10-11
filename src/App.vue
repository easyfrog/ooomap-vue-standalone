<script setup>
  import { onMounted, ref } from 'vue';
  
  //　引入　ooomap
  import * as om from 'ooomap';

  // 楼层组件
  import './om_comps/comp_floors/comp_floors.js';

  // 引入路径方法类
  import { RouteWorks } from './js/routeWorks.js';

  let container = ref(null)
  let map, routeWorks

  onMounted(() => {
    /**
		* 创建 ooomap 实例
		*/
		map = new om.Map({

			// 地图容器, domElement
			container: container.value,

			// 在ooomap编辑器中生成，或由官方提供
      appID: '87ae6a00e5ca4e33dd7e858a66b73475',
      verifyUrl: 'https://www.ooomap.com/ooomap-verify/check/50689bb01e0ac2a9d93bb18f1e1260f8',

			// 标记为 本地加载 
			standalone: true,

			// 本地文件所在目录(相对于此 html 文件)
			// 这里直接放置在了　public 目录 
			baseUrl: './'

		})

    console.log('map', map);

    // 初始化 RouteWorks
    routeWorks = new RouteWorks(map)

    // 拾取事件
    map.on('picked', res => {
      console.log('当前拾取的坐标为：', res.intersect.point.toArray());

      if (res.node) {
        console.log('当前拾取的对象为: ', res.node);

        if (res.node.type === 'SpriteMarkerNode') {
            res.node.flash()
        }
      }
    })

    // 初始化楼层组件
    let floorsComp = new Comp_floors({
      target: document.body,
      props: {
        hasOutdoor: false,
        style: 'right: 10px;bottom: 80px;'
      }
    })

    floorsComp.bind(map)

  })
</script>

<template>

  <!-- ooomap container -->
  <div ref="container" class="con"></div>

</template>

<style>
  .con {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
  }
</style>
