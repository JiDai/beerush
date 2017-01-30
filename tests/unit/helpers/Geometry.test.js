/**
 * Created by jd on 29/01/2017.
 */
import {
    expect
} from '../../test-helper'

import * as Geometry from '../../../src/helpers/Geometry'


describe('Geometry', () => {
    it('getDirection', () => {
        const rect = {
            top: 0,
            left: 0,
            width: 100,
            height: 100
        }
        expect(Geometry.getDirection(rect, 50, 50)).to.be.undefined
        expect(Geometry.getDirection(rect, 10, 50)).to.be.equal('w')
        expect(Geometry.getDirection(rect, 10, 10)).to.be.equal('nw')
        expect(Geometry.getDirection(rect, 50, 10)).to.be.equal('ne')
        expect(Geometry.getDirection(rect, 80, 80)).to.be.equal('se')
        expect(Geometry.getDirection(rect, 20, 80)).to.be.equal('sw')
        expect(Geometry.getDirection(rect, 80, 50)).to.be.equal('e')
    })
})
