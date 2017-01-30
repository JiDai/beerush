/**
 * Created by jd on 29/01/2017.
 */
import React from 'react'
import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import TestUtils from 'react-addons-test-utils'

let {assert, expect} = chai

chai.should()
chai.use(sinonChai)


export {
    React,
    chai,
    sinon,
    sinonChai,
    assert,
    expect,
    TestUtils
}
