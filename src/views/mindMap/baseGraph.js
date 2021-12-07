import { Graph, Shape } from "@antv/x6";
import ports from "./ports"
import rectNode from "../../components/mindMap/RectNode.vue";


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

    // 注册 vue 组件
    Graph.registerVueComponent(
      "rect-node-component",
      {
        template: `<rect-node></rect-node>`,
        components: { rectNode },
      },
      true
    );
    return this.graph
  }

  /**
   * 获取画布默认配置项
   * @returns {Partial<GraphOptions>}
   * @memberof X6BaseGraph
   */
  static getDefaultCfg() {

    const defaultCfg = {
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
        size: 10,
        visible: true,
        type: "doubleMesh",
        args: [
          {
            color: "#E7E8EA",
            thickness: 1,
          },
          {
            color: "#CBCED3",
            thickness: 1,
            factor: 5,
          },
        ],
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
      selecting: true,
      keyboard: true,
      /** 全局连线配置 */
      connecting: {
        connector: {
          name: "rounded",
          args: {
            radius: 8,
          },
        },
        router: {
          name: "manhattan",
          args: {
            direction: "H",
          },
        },
        anchor: "center",
        connectionPoint: "anchor",
        snap: true, // 自动吸附
        allowBlank: false, // 是否允许连接到画布空白位置的点
        allowLoop: false, // 是否允许创建循环连线，即边的起始节点和终止节点为同一节点
        allowNode: false, // 是否允许边链接到节点（非节点上的链接桩）
        createEdge() {
          return new Shape.Edge({
            attrs: {
              line: {
                stroke: "#1890ff",
                strokeWidth: 2,
                targetMarker: {
                  name: "classic",
                  size: 8,
                },
                strokeDasharray: 3, //虚线
                style: {
                  animation: "ant-line 30s infinite linear",
                },
              },
            },
            label: {
              text: "",
            },
            connector: "normal",
            router: {
              name: "manhattan",
            },
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

  static getCompontent() {
    let rectNodeComponent = this.graph.createNode({
      type: "rect",
      shape: "vue-shape",
      width: 140,
      height: 60,
      ports,
      attrs: {
        body: {
          strokeWidth: 1,
          stroke: '#5F95FF',
          fill: '#EFF4FF',
        },
      },
      data: {
        text: ""
      },
      component: "rect-node-component",
    });
    let circleNodeComponent = this.graph.createNode({
      shape: "vue-shape",
      width: 60,
      height: 60,
      ports,
      attrs: {
        body: {
          strokeWidth: 1,
          stroke: '#5F95FF',
          fill: '#EFF4FF',
        },
      },
      data: {
        text: ""
      },
      component: "rect-node-component",
    });
    return { rectNodeComponent, circleNodeComponent }
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
