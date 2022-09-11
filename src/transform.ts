
export function transform(ast) {
   const context = {
    currentNode: null,  //当前节点
    childIndex: 0, // 当前节点在字父节点中的位置
    parent: null, //当前节点的父节点
    replaceNode(node) {  //传入的节点替换当前节点
      this.currentNode = node
      if(this.parent) {
        (this.parent['children'] as Array<any>).splice(this.childIndex,1,node)
      }
    },
    removeNode() {  //删除当前节点
        this.currentNode = null
        if(this.parent) {
            (this.parent['children'] as Array<any>).splice(this.childIndex,1)
        }
        console.log('删除节点');
        
    },
    transforms: [  //对节点进行的操作
        transformElement,
        transformText
    ]
   }
   traverseNode(ast,context)
}

function transformElement(node,context) {   
    if(node.type === 'Element' && node.tag ==='p') {  
        node.tag = 'h1'  //将p element 转化为  h1
    }
    return () => {
        console.log('transform element completed');
        
    }
}

function transformText(node,context) {  
    console.log('transformText');
    
    if(node.type === 'Text'){  
        // node.content = node.content.repeat(2)  //将Text的内容重复两次
        // context.replaceNode({    //将Text节点转换为 span 的 Element
        //     type: 'Element',
        //     tag: 'span'
        // })
        
        context.removeNode()  //删除文本节点
        
    }
    return () => {
        console.log('transform text completed');
    }
}


export function traverseNode(ast, context) {  //处理节点
    context.currentNode = ast
    const transforms = context.transforms
    const exitFns:Array<Function> = [] //退出阶段调动的回调函数组
    for(let i = 0; i < transforms.length; i++){
        exitFns.push(transforms[i](context.currentNode,context))
        if(!context.currentNode) return
    }
    const children = context.currentNode.children
    //进入阶段
    if(children) {  
        for(let i = 0; i < children.length; i++){
            context.parent = context.currentNode
            context.childIndex = i
            traverseNode(children[i],context)
        }
    }
    //退出阶段
    
    let i = exitFns.length
    while(i--){  //反序执行，保证后续注册的转换函数处理完成
        exitFns[i]()
    }
}