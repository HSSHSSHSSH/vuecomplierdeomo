//模板转token
const State = {
    initial: 1, //初始状态,
    tagOpen: 2, // 标签开始
    tagName: 3, //标签名称
    text: 4, //文本
    tagEnd: 5, //标签结束
    tagEndName: 6, //结束标签名
}

function isAlpha (char) {  //判断是否为字母
   return char >= 'a' && char <= 'z' || char >= 'A' && char <= 'Z'
}

export function tokenize(str) {
    let currentState = State.initial  //初始化状态机
    let chars = new Array() //用于缓存字符
    let tokens = new Array()  //保存生成的token 
    str = str.replace(/\ +/g,"").replace(/[\r\n]/g,"")  //去除空格与回车

    while(str) {
        const char = str[0]

        switch (currentState) {
            case State.initial: 
              if(char === '<') {
                /**
                 * 1.切换到tagOpen状态
                 * 2.消耗当前字符
                 */
                currentState = State.tagOpen
                str = str.slice(1)
              } else if(isAlpha(char)) {
                /**
                 * 1.切换到文本状态
                 * 2.缓存字符
                 * 3.消耗字符
                 */
                currentState = State.text
                chars.push(char)
                str = str.slice(1)
              }

            break

            case State.tagOpen:
                if(isAlpha(char)){
                    /**
                     * 1.切换至tagName
                     * 2.缓存字符
                     * 3.消耗字符
                     */
                    currentState = State.tagName
                    chars.push(char)
                    str = str.slice(1)
                } else if (char === '/') {
                    /**
                     * 1.切换至 tagEnd
                     * 2.消耗字符
                     */
                    currentState = State.tagEnd
                    str = str.slice(1)
                }
            break

            case State.tagName:
                if(isAlpha(char)) {
                    /**
                     * 1.缓存字母
                     * 2.消耗字符
                     */
                    chars.push(char)
                    str = str.slice(1)
                } else if(char === '>') {
                    /**
                     * 1.切换至  initial
                     * 2.创建  tag token
                     * 3.清空缓存字母
                     * 4.消耗字符
                     */
                    currentState = State.initial
                    let tagToken = {
                        type: 'tag',
                        name: chars.join('')
                    }
                    chars.length = 0
                    tokens.push(tagToken)
                    str = str.slice(1)
                }
            break

            case State.text:
                if(char === '<') {
                    /**
                     * 1.切换至 tagOpen
                     * 2.创建  text token
                     * 3.清空字母缓存
                     * 4.消耗字符
                     */
                    currentState = State.tagOpen
                    let textToken = {
                        type: 'text',
                        content: chars.join('')
                    }
                    tokens.push(textToken)
                    chars.length = 0
                    str = str.slice(1)
                } else if (isAlpha(char)) {
                    /**
                     * 1.缓存字母
                     * 2.消耗字符
                     */
                    chars.push(char)
                    str = str.slice(1)
                }
            break

            case State.tagEnd:
                if(isAlpha(char)){
                    /**
                     * 1.切换至 tagEndName
                     * 2.缓存字母
                     * 3.消耗字符
                     */
                    currentState = State.tagEndName
                    chars.push(char)
                    str = str.slice(1)
                }
            break

            case State.tagEndName:
                
                if(isAlpha(char)) {
                    /**
                     * 1.缓存字母
                     * 2.消耗字符
                     */
                    
                    chars.push(char)
                    str = str.slice(1)
                } else if(char === '>') {
                    
                    /**
                     * 1.切换至 initial
                     * 2.创建结束标签token
                     * 3.清空缓存字母
                     * 4.消耗字符
                     */
                    currentState = State.initial
                    let tagEndToken = {
                        type: 'tagEnd',
                        name: chars.join('')
                    }
                    tokens.push(tagEndToken)
                    chars.length = 0
                    str = str.slice(1)
                    
                    
                }
                
            break
        }
        
        
        
    }
    
    return tokens

}


