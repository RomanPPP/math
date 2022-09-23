
const m4 = require('./m4')
class TRS{
    constructor(translation, rotation, scale){
        this.translation = translation
        this.rotation = rotation
        this.scale = scale
    }
    getMatrix(m) {

        let dst = m || m4.identity();
        var t = this.translation;
        var r = this.rotation;
        var s = this.scale;
        const sin = Math.sin(r[3] / 2)
        const cos = Math.cos(r[3] / 2)
        dst = m4.translate(dst,t[0], t[1], t[2]);

        dst = m4.multiply(dst, m4.fromQuaternion(r))
        
        dst = m4.scale(dst, s[0], s[1], s[2]);
        return dst;
      };
    getRMatrix(){
        let dst = m4.identity();
        var r = this.rotation;
        dst = m4.xRotate(dst, r[0]);
        dst = m4.yRotate(dst, r[1]);
        dst = m4.zRotate(dst, r[2]);
        return dst
    }
}
class Node{
    constructor( name, trs = new TRS()){
        
        this.worldMatrix = m4.identity()
        this.originMatrix = m4.identity()
        this.parent = null
        this.children = []
        this.trs = trs
        this.name = name
        this.parts = []
    }
    setParent(parent){
        if (this.parent) {
            const ndx = this.parent.children.indexOf(this);
            if (ndx >= 0) {
              this.parent.children.splice(ndx, 1);
            }
          }
          if (parent) {
            parent.children.push(this);
          }
          this.parent = parent;
    }
    updateWorldMatrix(parentWorldMatrix){
        
        let matrix = this.trs.getMatrix()
        
        if (parentWorldMatrix) {
          matrix = m4.multiply(parentWorldMatrix, matrix);
        }
        
        this.worldMatrix = matrix
        this.children.forEach((child) => {
          child.updateWorldMatrix([...matrix]);
        })
    }
    updatePartsList(){
        const iter = (node,arr) => {
            arr.push(node)
            node.children.forEach(child => iter(child,arr))
        }
        iter(this, this.parts)
    }
    
    
    
}


module.exports = {Node, TRS}