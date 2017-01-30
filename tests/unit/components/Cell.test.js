import {
    React,
    expect
} from '../../test-helper'
import {shallow} from 'enzyme'

import Cell from '../../../src/components/Cell'


describe('<Cell />', () => {
    it('should contains classes', () => {
        expect(shallow(<Cell />).hasClass('cell'))
            .to.equal(true)
    })
})
