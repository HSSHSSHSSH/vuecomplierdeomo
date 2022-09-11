import {parse} from '../parse'

describe('create AST', () => {
    it('happy path',() => {
        const str = `
        <div>
          <p>Vue</p>
          <p>Template</p>
        </div>
        `
        expect(parse(str)).toStrictEqual(
            {
                type: 'Root',
                children: [
                    {
                        type: 'Element',
                        tag: 'div',
                        children: [
                            {
                                type: 'Element',
                                tag: 'p',
                                children: [
                                    {
                                        type: 'Text',
                                        content: 'Vue'
                                    }
                                ]
                            },
                            {
                                type: 'Element',
                                tag: 'p',
                                children: [
                                    {
                                        type: 'Text',
                                        content: 'Template'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        )
    })
})