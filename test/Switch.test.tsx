import React from 'react'
import { shallow } from 'enzyme'

import Switch, { Case, DefaultCase } from '../src/Switch'

describe('Switch', () => {
  it('should show first case on right statement', () => {
    const wrapper = shallow(
      <Switch statement='statement'>
        <Case equals='statement'><span id='right'>test</span></Case>
        <Case equals='statement'><span id='wrong'>test</span></Case>
        <DefaultCase><span id='very-wrong'>test</span></DefaultCase>
      </Switch>
    )

    expect(wrapper.find('span#right').exists()).toBeTruthy()
    expect(wrapper).toMatchSnapshot()
  })

  it('should show first right case', () => {
    const wrapper = shallow(
      <Switch statement='statement'>
        <Case equals='wrong statement'><span id='wrong'>test</span></Case>
        <Case equals='still wrong statement'><span id='still-wrong'>test</span></Case>
        <Case equals='statement'><span id='right'>test</span></Case>
        <Case equals='statement'><span id='kinda-wrong'>test</span></Case>
        <DefaultCase><span id='very-wrong'>test</span></DefaultCase>
      </Switch>
    )

    expect(wrapper.find('span#right').exists()).toBeTruthy()
    expect(wrapper).toMatchSnapshot()
  })

  it('should show first default case', () => {
    const wrapper = shallow(
      <Switch statement='nothing'>
        <Case equals='wrong statement'><span id='wrong'>test</span></Case>
        <Case equals='still wrong statement'><span id='still-wrong'>test</span></Case>
        <Case equals='statement'><span id='wrong3'>test</span></Case>
        <Case equals='statement'><span id='wrong4'>test</span></Case>
        <DefaultCase><span id='right'>test</span></DefaultCase>
        <DefaultCase><span id='kinda-wrong'>test</span></DefaultCase>
      </Switch>
    )

    expect(wrapper.find('span#right').exists()).toBeTruthy()
    expect(wrapper).toMatchSnapshot()
  })

  it('should allow numbers', () => {
    const wrapper = shallow(
      <Switch statement={1}>
        <Case equals={1}><span id='right'>test</span></Case>
        <Case equals={2}><span id='wrong'>test</span></Case>
        <DefaultCase><span id='very-wrong'>test</span></DefaultCase>
      </Switch>
    )

    expect(wrapper.find('span#right').exists()).toBeTruthy()
    expect(wrapper).toMatchSnapshot()
  })

  it('should show null if no default case', () => {
    const wrapper = shallow(
      <Switch statement='statement'>
        <Case equals='wrong-statement'><span id='wrong'>test</span></Case>
      </Switch>
    )

    expect(wrapper.find('span#wrong').exists()).toBeFalsy()
    expect(wrapper).toMatchSnapshot()
  })

  it('should not accept wrong element in the switch', () => {
    const wrapper = () => shallow(
      <Switch statement='nothing'>
        <span>wrong</span>
      </Switch>
    )

    expect(wrapper).toThrowError('Switch child[0] is invalid!')
  })

  it('works', () => {
    const wrapper = shallow(
      <Switch statement='statement'>
        <Case equals='statement'><span id='first'>test</span></Case>
        <Case equals='statement'><span id='second'>test</span></Case>
        <Case equals={1}><span id='third'>test</span></Case>
        <DefaultCase><span id='default'>test</span></DefaultCase>
      </Switch>
    )

    expect(wrapper).toMatchSnapshot()

    expect(wrapper.find('span#first').exists()).toBeTruthy()
    expect(wrapper.find('span#second').exists()).toBeFalsy()
    expect(wrapper.find('span#third').exists()).toBeFalsy()
    expect(wrapper.find('span#default').exists()).toBeFalsy()

    wrapper.setProps({ statement: 1 })

    expect(wrapper.find('span#first').exists()).toBeFalsy()
    expect(wrapper.find('span#second').exists()).toBeFalsy()
    expect(wrapper.find('span#third').exists()).toBeTruthy()
    expect(wrapper.find('span#default').exists()).toBeFalsy()

    wrapper.setProps({ statement: 'none' })

    expect(wrapper.find('span#first').exists()).toBeFalsy()
    expect(wrapper.find('span#second').exists()).toBeFalsy()
    expect(wrapper.find('span#third').exists()).toBeFalsy()
    expect(wrapper.find('span#default').exists()).toBeTruthy()
  })
})
