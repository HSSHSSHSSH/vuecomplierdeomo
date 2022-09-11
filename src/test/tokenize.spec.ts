
// const {tokenize} = require('../tokenize')
import {tokenize} from '../tokenize'
describe('tokenize', () => {
    it('happy path', () => {
      expect(tokenize('<p>Vue</p>')).toStrictEqual([
        {type: 'tag', name: 'p'},
        {type: 'text',content: 'Vue'},
        {type: 'tagEnd',name: 'p'}
      ]);
    });

    it('nested', () => {
      const str = `
      <div>
        <p>Vue</p>
        <p>Template</p>
      </div>
      `
      expect(tokenize(str)).toStrictEqual([
        {type: 'tag',name: 'div'},
        {type: 'tag',name: 'p'},
        {type: 'text',content: 'Vue'},
        {type: 'tagEnd',name: 'p'},
        {type: 'tag',name: 'p'},
        {type: 'text',content: 'Template'},
        {type: 'tagEnd',name: 'p'},
        {type: 'tagEnd',name: 'div'},
      ])
    })
  });