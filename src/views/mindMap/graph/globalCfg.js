
// 配置所有线
let EdgeAtr = {
    shape: 'custom-edge-label',
    attrs: {
        line: {
            stroke: '#1280FF', // 指定 path 元素的填充色
            strokeDasharray: 3,
            targetMarker: {
                name: 'classic', // 实心箭头
                size: 8
            },
            strokeWidth: 1,
            style: {
                animation: 'ant-line 200s infinite linear',
            },
        },

    },
    labels: [
        {
            attrs: {
                text: {
                    text: '',
                    fontSize: 16,
                    fill: '#333',
                },
            },
        },
    ],
    connector: 'rounded',//'normal',
    router: {
        name: "manhattan",
    },
}

let gridAtr = {
    type: "doubleMesh",
    size: 10,
    visible: true,
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
}
export { EdgeAtr, gridAtr }