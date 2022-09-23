
const {AABB} = require('./aabb')
class Octree{
    constructor(aabb, order = 1, value = 0){
        this.aabb = aabb
        this.value = value
        this.children = []
        this.order = order
        this.elements = []
    }
    subdivide(){
        const min = this.aabb.min
        const max = this.aabb.max
        const [x1, y1, z1] = min
        const [x2, y2, z2] = max
        const xc = (x2 - x1) / 2
        const yc = (y2 - y1) / 2
        const zc = (z2 - z1) / 2

        
        const order = this.order + 1
        
        this.children[0] = new Octree(new AABB([x1, y1, z1], [xc, yc, zc]), order)
        this.children[1] = new Octree(new AABB([x1, y1, zc], [xc, yc, z2]), order)
        this.children[2] = new Octree(new AABB([x1, yc, z1], [xc, y2, zc]), order)
        this.children[3] = new Octree(new AABB([x1, yc, zc], [xc, y2, z2]), order)
        this.children[4] = new Octree(new AABB([xc, y1, z1], [x2, yc, zc]), order)
        this.children[5] = new Octree(new AABB([xc, y1, zc], [x2, yc, z2]), order)
        this.children[6] = new Octree(new AABB([xc, yc, z1], [x2, y2, zc]), order)
        this.children[7] = new Octree(new AABB([xc, yc, zc], [x2, y2, z2]), order)
        
    }
    getLeaf(point){
        if(this.order === 5){
            
            return this
        }
       
        if(this.children.length === 0) this.subdivide()
        const xc = (this.aabb.max[0] - this.aabb.min[0]) / 2
        const yc = (this.aabb.max[1] - this.aabb.min[1]) / 2
        const zc = (this.aabb.max[2] - this.aabb.min[2]) / 2
        const i = (point[2] > zc)
        const j = (point[1] > yc)  * 2
        const k = (point[0] > xc) * 4
        return this.children[i | j | k].getLeaf(point)
    }
    
}

const merge = octree =>{
    const value = octree.children.reduce((acc, child) => acc += child.value, 0)
    if(value != octree.children[0].value) return false
    octree.children = []
    octree.value = value
    return true
}
module.exports = {Octree}