import {dump} from '../dump'
import {parse} from '../parse'
import {transform} from '../transform'
describe('handleAST',() => {
    it('print AST node', () => {
        const str = `
            <div>
                <p>Vue</p>
                <p>Template</p>
            </div>
        `
        const ast = parse(str)
        dump(ast)
        transform(ast)
        console.log('---------------');
        dump(ast)
        
    })

    it('traverse node', () => {
        
    })
})