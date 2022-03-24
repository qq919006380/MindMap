import { Graph, Shape } from "@antv/x6";
import ports from "./ports"
import { EdgeAtr, gridAtr } from "./globalCfg"
// import rectNode from "../../components/mindMap/RectNode.vue";
// import circleNode from "../../components/mindMap/circleNode.vue";

export default class BaseGraph {
  // public graph!: Graph;

  static graph;
  static init(graphOptions) {
    /** 创建X6画布实例 */
    const defaultCfg = this.getDefaultCfg();
    this.graph = new Graph({
      ...defaultCfg,
      ...graphOptions,
    });

    // 注册 vue 矩形组件
    // Graph.registerVueComponent(
    //   "rect-node-component",
    //   {
    //     template: `<rect-node></rect-node>`,
    //     components: { rectNode },
    //   },
    //   true
    // );
    //  // 注册 vue 圆组件
    //  Graph.registerVueComponent(
    //   "circle-node-component",
    //   {
    //     template: `<circle-node></circle-node>`,
    //     components: { circleNode },
    //   },
    //   true
    // );
    return this.graph
  }

  /**
   * 获取画布默认配置项
   * @returns {Partial<GraphOptions>}
   * @memberof X6BaseGraph
   */
  static getDefaultCfg() {

    const defaultCfg = {
      autoResize: true,
      resizing: {
        enabled: true,
        orthogonal: false,
        restricted: false,
        preserveAspectRatio: false,

        minWidth: 80,
        maxWidth: 800,

        minHeight: 60,
        maxHeight: 600,

      },
      // 网格
      grid: {
        ...gridAtr
      },
      background: {
        color: "#F5F7FA",
      },
      /** 无限画布设置 */
      scroller: {
        enabled: true,
        pageVisible: false,
        pageBreak: false,
        pannable: true,
      },
      /** 全局连线配置 */
      connecting: {
        anchor: "center",
        connectionPoint: "anchor",
        snap: true, // 自动吸附
        allowBlank: false, // 是否允许连接到画布空白位置的点
        allowLoop: false, // 是否允许创建循环连线，即边的起始节点和终止节点为同一节点
        allowNode: false, // 是否允许边链接到节点（非节点上的链接桩）
        createEdge() {
          return new Shape.Edge({
            ...EdgeAtr,
            zIndex: 0,
          });
        },
      },
      /** 对齐线 */
      snapline: {
        enabled: true,
      },
      history: true, // 启动历史记录
      // 鼠标滚轮的默认行为是滚动页面
      mousewheel: {
        enabled: true,
        modifiers: ["ctrl", "meta"],
        minScale: 0.5,
        maxScale: 2,
      },
      selecting: {
        enabled: true,
        // showNodeSelectionBox: true,
      },
      keyboard: {
        enabled: true,
      },
      clipboard: {
        enabled: true,
      },
      // 高亮
      highlighting: {
        magnetAvailable: {
          name: "stroke",
          args: {
            padding: 4,
            attrs: {
              strokeWidth: 4,
              stroke: "#6a6c8a",
            },
          },
        },
      },
    };
    return defaultCfg;
  }
  static getGraphData() {
    let data = this.graph.toJSON()
    const model = {
      nodes: [],
      edges: []
    };
    let tmp;
    if (data.cells) {
      tmp = data.cells;
    } else if (data.nodes || data.edges) {
      tmp = [].concat(data.nodes, data.edges);
    }
    if (tmp) {
      tmp.forEach((item) => {
        if (item.shape !== "edge") {
          model.nodes.push(item);
        } else {
          console.log(item)
          let sourceId = item.source;
          let targetId = item.target;
          model.edges.push({
            source: sourceId,
            target: targetId,
            connector: item.connector,
            attrs: item.attrs,
            router: item.router,
            labels: item.labels
          });
        }
      });
    }
    return model;
  }
  static getCompontent() {

    // 矩形
    let rectNodeComponent = this.graph.createNode({
      shape: "rect",
      width: 60,
      height: 60,
      ports,
      attrs: {
        body: {
          strokeWidth: 1,
          stroke: '#5F95FF',
          fill: '#EFF4FF',
        },
        text: {
          textWrap: {
            text: '',
            width: -10, // 宽度减少 10px
          }
        }
      },
    });


    // 椭圆
    let ellipseNodeComponent = this.graph.createNode({
      shape: "ellipse",
      width: 60,
      height: 60,
      ports,
      attrs: {
        body: {
          strokeWidth: 1,
          stroke: '#5F95FF',
          fill: '#EFF4FF',
        },
        text: {
          textWrap: {
            text: '',
            width: -10, // 宽度减少 10px
          }
        }
      },

    });

    // 多边形
    let polygonNodeComponent = this.graph.createNode({
      shape: "polygon",
      width: 60,
      height: 60,
      ports,
      attrs: {
        body: {
          strokeWidth: 1,
          stroke: '#5F95FF',
          fill: '#EFF4FF',
          refPoints: '0,10 10,0 20,10 10,20',
        },
        text: {
          textWrap: {
            text: '',
            width: -10, // 宽度减少 10px
          }
        }
      },

    });

    // 多边形-心
    let heartNodeComponent = this.graph.createNode({
      shape: "path",
      width: 60,
      height: 60,
      ports,
      path:
        'M24.85,10.126c2.018-4.783,6.628-8.125,11.99-8.125c7.223,0,12.425,6.179,13.079,13.543c0,0,0.353,1.828-0.424,5.119c-1.058,4.482-3.545,8.464-6.898,11.503L24.85,48L7.402,32.165c-3.353-3.038-5.84-7.021-6.898-11.503c-0.777-3.291-0.424-5.119-0.424-5.119C0.734,8.179,5.936,2,13.159,2C18.522,2,22.832,5.343,24.85,10.126z',
      attrs: {
        body: {
          strokeWidth: 1,
          stroke: '#5F95FF',
          fill: '#EFF4FF',
        },
        text: {
          textWrap: {
            text: '',
            width: -10, // 宽度减少 10px
          }
        }
      },
    });
    // 多边形-星星
    let starNodeComponent = this.graph.createNode({
      shape: "path",
      width: 60,
      height: 60,
      ports,
      path:

        'M26.285,2.486l5.407,10.956c0.376,0.762,1.103,1.29,1.944,1.412l12.091,1.757c2.118,0.308,2.963,2.91,1.431,4.403l-8.749,8.528c-0.608,0.593-0.886,1.448-0.742,2.285l2.065,12.042c0.362,2.109-1.852,3.717-3.746,2.722l-10.814-5.685c-0.752-0.395-1.651-0.395-2.403,0l-10.814,5.685c-1.894,0.996-4.108-0.613-3.746-2.722l2.065-12.042c0.144-0.837-0.134-1.692-0.742-2.285l-8.749-8.528c-1.532-1.494-0.687-4.096,1.431-4.403l12.091-1.757c0.841-0.122,1.568-0.65,1.944-1.412l5.407-10.956C22.602,0.567,25.338,0.567,26.285,2.486z',
      attrs: {
        body: {
          strokeWidth: 1,
          stroke: '#5F95FF',
          fill: '#EFF4FF',
        },
        text: {
          textWrap: {
            text: '',
            width: -10, // 宽度减少 10px
          }
        }
      },
    });

    // 多边形-音乐
    let MusicNodeComponent = this.graph.createNode({
      shape: "path",
      width: 60,
      height: 60,
      ports,
      path: 'M52.104,0.249c-0.216-0.189-0.501-0.275-0.789-0.241l-31,4.011c-0.499,0.065-0.872,0.489-0.872,0.992v6.017v4.212v26.035C17.706,39.285,14.997,38,11.944,38c-5.247,0-9.5,3.781-9.5,8.444s4.253,8.444,9.5,8.444s9.5-3.781,9.5-8.444c0-0.332-0.027-0.658-0.069-0.981c0.04-0.108,0.069-0.221,0.069-0.343V16.118l29-3.753v18.909C48.706,29.285,45.997,28,42.944,28c-5.247,0-9.5,3.781-9.5,8.444s4.253,8.444,9.5,8.444s9.5-3.781,9.5-8.444c0-0.092-0.012-0.181-0.015-0.272c0.002-0.027,0.015-0.05,0.015-0.077V11.227V7.016V1C52.444,0.712,52.32,0.438,52.104,0.249z',
      attrs: {
        body: {
          strokeWidth: 1,
          stroke: '#5F95FF',
          fill: '#EFF4FF',
        },
        text: {
          textWrap: {
            text: '',
            width: -10, // 宽度减少 10px
          }
        }
      },

    });
    return { rectNodeComponent, ellipseNodeComponent, heartNodeComponent, MusicNodeComponent, starNodeComponent, polygonNodeComponent }
  }

  /**
   * 画布缩放
   * @param {number} factor 缩放比例尺
   * @memberof X6BaseGraph
   */
  zoomGraph(factor) {
    if (typeof factor === "number") {
      this.graph.zoom(factor);
    } else if (factor === "fit") {
      this.graph.zoomToFit({ padding: 12 });
    } else if (factor) {
      this.graph.scale(1);
      this.graph.centerContent();
    }
  }

  /**
   * 移动节点到画布中央
   * @param {(Node | string)} node
   * @memberof X6BaseGraph
   */
  focusNodeToGraphCenter(node) {
    if (node instanceof Node) {
      this.graph.centerCell(node);
    } else {
      const temp = this.cellController.findNodeById(node);
      if (temp) {
        this.graph.centerCell(temp);
      }
    }
  }




}
