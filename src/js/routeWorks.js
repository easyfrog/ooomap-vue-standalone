import * as om from 'ooomap';

// 起点
let from = {
    floorNumber: 1,
    point: [3.817, -9.414, 0]
}

// 途经点1
let point1 = {
    floorNumber: 1,
    point: [-31.11, 52.955, 2]
}

// 途经点2
let point2 = {
    floorNumber: 2,
    point: [38.935, 30.233, 70]
}

// 终点
let to = {
    floorNumber: 3,
    point: [-20.536, 27.346, 136]
}

/**
 * 路径处理类
 */
export class RouteWorks {
    constructor(map) {
        this.map = map
        this.building = null

        this.map.on('buildingLoaded', building => {
            this.building = building

            this.findPath()
        })

        // 用于储存所有的路径点标注
        this.markers = []
    }

    /**
     * points: [
     *     {
     *          floorNumber: 1
     *          point: []
     *      },
     * ]
     * 
     * **注意:** 此方法要在 buildingLoaded 之后调用
     */
    findPath(points) {
        points = points || [from, point1, point2, to]

        if (!this.building) {
            return
        }

        // 创建标注
        points.forEach((p, i) => {
            this.createMarker(i + 1, p)
        })

        this.building.findPath.apply(this.building, points).then(res => {
            console.log('findPath', res);
        })
    }

    clearRoutes() {
        if (this.building) {
            this.building.clearRoutes()
        }

        // 移除所有的标注对象
        this.markers.forEach(marker => {
            marker.dispose()
        })
    }

    _createDom(str) {
        var div = document.createElement('div')
        div.innerText = str

        Object.assign(div.style, {
            padding: '5px 10px',
            backgroundColor: 'rgba(0,0,0,.5)',
            textAlign: 'center',
            color: 'white',
            borderRadius: '5px',
            transform: 'translate(0, -100%)'
        })

        return div
    }

    // 为点创建标记
    createMarker(str, position) {
        var div = this._createDom(str)

        var marker = new om.DomMarker(this.map, {
            dom: div,
            position: position.point
        })

        this.map.omScene.markerNode.add(marker)

        this.markers.push(marker)

        return marker
    }
}


