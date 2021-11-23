import { Graph } from "@antv/x6";
// import Node from '../graph/node'
// import Edge from '../graph/edge'
// import { CellController, EventController } from "../controller/index";

export default class BaseGraph {
  // public graph!: Graph;
  // public cellController!: CellController;
  // public eventController!: EventController;
  static graph;
  static init(graphOptions) {
    // this.cellController = new CellController(this)
    // this.eventController = new EventController(this)

    /** 创建X6画布实例 */
    const defaultCfg = this.getDefaultCfg();
    this.graph = new Graph({
      ...defaultCfg,
      ...graphOptions,
    });
    return this.graph
  }

  /**
   * 获取画布默认配置项
   * @returns {Partial<GraphOptions>}
   * @memberof X6BaseGraph
   */
  static getDefaultCfg() {
    const defaultCfg = {
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
      /** 全局连线配置 */
      connecting: {
        connector: {
          name: "rounded",
        },
        router: {
          name: "er",
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
                strokeWidth: 1,
                targetMarker: {
                  name: "classic",
                  size: 8,
                },
                strokeDasharray: 0, //虚线
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

  /**
   * 更新画布内容
   * @param {GraphData} graphData 画布元素数据
   * @memberof X6BaseGraph
   */
  updateGraph(graphData) {
    if (!graphData) {
      throw new Error("graphData must be defined first!");
    }
    const { addNodesData, addEdgesData } = this.graphContentDiff(graphData);

    this.graph.batchUpdate("updateGraph", () => {
      if (addNodesData && addNodesData.length > 0) {
        this.cellController.addNodes(addNodesData);
      }
      if (addEdgesData && addEdgesData.length > 0) {
        this.cellController.addEdges(addEdgesData);
      }
    });
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

  /**
   * 将Nodes置于画布最前方
   * @param {Node[]} nodes
   * @memberof X6BaseGraph
   */
  bringNodesToFront(nodes) {
    nodes.forEach((node) => {
      node.toBack();
    });
  }

  /**
   * 将Nodes置于画布最后方
   * @param {Node[]} nodess
   * @memberof X6BaseGraph
   */
  bringNodesToBack(nodes) {
    nodes.forEach((node) => {
      node.toBack();
    });
  }

  /**
   * 清空画布内容
   * @memberof X6BaseGraph
   */
  clearGraph() {
    // todo
  }

  /**
   * 注册监听事件
   * @param {EventArg[]} events
   * @memberof X6BaseGraph
   */
  registerEvent(events) {
    this.eventController.registerEvent(events);
  }

  /** 画布内容Diff */
  graphContentDiff(graphData) {
    const { nodes: nodesData, edges: edgesData } = graphData;

    // 新增节点数据
    const addNodesData = [];
    nodesData.forEach((nodeData) => {
      const findNode = this.cellController.findNodeById(nodeData.id);
      if (!findNode) {
        addNodesData.push(nodeData);
      }
    });

    // 保持、更新、移除的节点
    const retainNodes = [];
    const updateNodes = [];
    const removeNodes = [];
    this.cellController.nodes.forEach((node) => {
      const findNodeData = nodesData.find(
        (nodeData) => nodeData.id === node.id
      );
      if (!findNodeData) {
        removeNodes.push(node);
      } else {
        // !!! 目前仅支持节点data数据变化, 才认为更新
        if (_.isEqual(node.data, findNodeData.data)) {
          retainNodes.push(node);
        } else {
          updateNodes.push(node);
          this.cellController.updateNode(node, findNodeData);
        }
      }
    });

    // 新增连线数据
    const addEdgesData = [];
    edgesData.forEach((edgeData) => {
      if (!edgeData.id) {
        return;
      }
      const findEdge = this.cellController.findEdgeById(edgeData.id);
      if (!findEdge) {
        addEdgesData.push(edgeData);
      }
    });

    // 保持、更新、移除的连线
    const retainEdges = [];
    const updateEdges = [];
    const removeEdges = [];
    this.cellController.edges.forEach((edge) => {
      const findEdgeData = edgesData.find(
        (edgeData) => edgeData.id === edge.id
      );
      if (!findEdgeData) {
        removeEdges.push(edge);
      } else {
        // !!! 目前仅支持连线data数据变化, 才认为更新
        if (_.isEqual(edge.data, findEdgeData.data)) {
          retainEdges.push(edge);
        } else {
          updateEdges.push(edge);
          this.cellController.updateEdge(edge, findEdgeData);
        }
      }
    });

    this.cellController.removeNodes(removeNodes);
    this.cellController.removeEdges(removeEdges);

    return {
      addNodesData,
      addEdgesData,
    };
  }
}
