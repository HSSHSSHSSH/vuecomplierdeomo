
// const {describe, expect,test} = require('@jest/globals')
import {sum} from '../sum'

it("init",() => {
  expect(sum(1,1)).toBe(2)
})