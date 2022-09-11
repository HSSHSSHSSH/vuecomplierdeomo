// 根据token 创建AST
import {tokenize} from './tokenize'

export function parse(str) {
    const tokens = tokenize(str)

    const root = {
        type: 'Root',
        children : new Array()
    }

    const elementStack = new Array()
    elementStack.push(root)
    while(tokens.length) {
        const parent = elementStack[elementStack.length - 1]
        const token = tokens[0]
        
        switch (token.type) {
            case 'tag':
                let elementNode = {
                    type: 'Element',
                    tag: token.name,
                    children: []
                }
                parent.children.push(elementNode)
                elementStack.push(elementNode)
            break
            case 'text':
                let textNode = {
                    type: 'Text',
                    content: token.content,
                }
                parent.children.push(textNode)
            break
            case 'tagEnd':
                elementStack.pop()
            break
        }
        //消耗token
        tokens.shift()
    }
    
    return root
}