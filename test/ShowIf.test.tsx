import React from 'react'
import { shallow } from 'enzyme'

import ShowIf, { IsTrue, OrElse, IsFalseAnd } from '../src/ShowIf'

describe('IsTrue', () => {
  it('should return children', () => {
    const wrapper = shallow(
      <IsTrue><span>test</span></IsTrue>
    )

    expect(wrapper.find('span').exists()).toBeTruthy()
    expect(wrapper).toMatchSnapshot()
  })

  it('should show if condition is truthy', () => {
    const wrapper = shallow(
      <ShowIf condition={true}>
        <IsTrue><span id='show'>works</span></IsTrue>
      </ShowIf>
    )

    expect(wrapper.find('span#show').exists()).toBeTruthy()
    expect(wrapper).toMatchSnapshot()
  })

  it('should show nothing if condition is falsy', () => {
    const wrapper = shallow(
      <ShowIf condition={false}>
        <IsTrue><span id='show'>works</span></IsTrue>
      </ShowIf>
    )

    expect(wrapper.find('span#show').exists()).toBeFalsy()
    expect(wrapper).toMatchSnapshot()
  })
})

describe('IsFalseAnd', () => {
  it('should return children', () => {
    const wrapper = shallow(
      <IsFalseAnd condition={true}><span>test</span></IsFalseAnd>
    )

    expect(wrapper.find('span').exists()).toBeTruthy()
    expect(wrapper).toMatchSnapshot()
  })
  it('should show if condition is falsy (F)[T]', () => {
    const wrapper = shallow(
      <ShowIf condition={false}>
        <IsFalseAnd condition={true}><span id='show'>works</span></IsFalseAnd>
      </ShowIf>
    )

    expect(wrapper.find('span#show').exists()).toBeTruthy()
    expect(wrapper).toMatchSnapshot()
  })

  it('should show nothing if condition is falsy but component condition is false (F)[F]', () => {
    const wrapper = shallow(
      <ShowIf condition={false}>
        <IsFalseAnd condition={false}><span id='show'>works</span></IsFalseAnd>
      </ShowIf>
    )

    expect(wrapper.find('span#show').exists()).toBeFalsy()
    expect(wrapper).toMatchSnapshot()
  })

  it('should show nothing if condition is truthy (T)[T,F]', () => {
    const wrapper = shallow(
      <ShowIf condition={true}>
        <IsFalseAnd condition={true}><span id='show'>works</span></IsFalseAnd>
        <IsFalseAnd condition={false}><span id='show2'>works</span></IsFalseAnd>
      </ShowIf>
    )

    expect(wrapper.find('span#show').exists()).toBeFalsy()
    expect(wrapper.find('span#show2').exists()).toBeFalsy()
    expect(wrapper).toMatchSnapshot()
  })

  it('should show only true conditions and in order (F)[T,F,T,F,T]', () => {
    const wrapper = shallow(
      <ShowIf condition={false}>
        <IsFalseAnd condition={true}><span id='show'>works</span></IsFalseAnd>
        <IsFalseAnd condition={false}><span id='show2'>works</span></IsFalseAnd>
        <IsFalseAnd condition={true}><span id='show3'>works</span></IsFalseAnd>
        <IsFalseAnd condition={false}><span id='show4'>works</span></IsFalseAnd>
        <IsFalseAnd condition={true}><span id='show5'>works</span></IsFalseAnd>
      </ShowIf>
    )

    // test existance
    expect(wrapper.find('span#show').exists()).toBeTruthy()
    expect(wrapper.find('span#show2').exists()).toBeFalsy()
    expect(wrapper.find('span#show3').exists()).toBeTruthy()
    expect(wrapper.find('span#show4').exists()).toBeFalsy()
    expect(wrapper.find('span#show5').exists()).toBeTruthy()

    // test ordering
    expect(wrapper.find('span').first().prop('id') === 'show').toBeTruthy()
    expect(wrapper.find('span').at(1).prop('id') === 'show3').toBeTruthy()
    expect(wrapper.find('span').at(2).prop('id') === 'show5').toBeTruthy()

    expect(wrapper).toMatchSnapshot()
  })

  it('should accept functions as condition', () => {
    const truthyFunc = () => true
    const falsyFunc = () => false
    const wrapper = shallow(
      <ShowIf condition={false}>
        <IsFalseAnd condition={truthyFunc}><span id='show'>works</span></IsFalseAnd>
        <IsFalseAnd condition={falsyFunc}><span id='show2'>works</span></IsFalseAnd>
      </ShowIf>
    )

    expect(wrapper.find('span#show').exists()).toBeTruthy()
    expect(wrapper.find('span#show2').exists()).toBeFalsy()
    expect(wrapper).toMatchSnapshot()
  })
})

describe('OrElse', () => {
  it('should return children', () => {
    const wrapper = shallow(
      <OrElse><span>test</span></OrElse>
    )

    expect(wrapper.find('span').exists()).toBeTruthy()
    expect(wrapper).toMatchSnapshot()
  })

  it('should show if condition is falsy', () => {
    const wrapper = shallow(
      <ShowIf condition={false}>
        <OrElse><span id='show'>works</span></OrElse>
      </ShowIf>
    )

    expect(wrapper.find('span#show').exists()).toBeTruthy()
    expect(wrapper).toMatchSnapshot()
  })

  it('should show nothing if condition is truthy', () => {
    const wrapper = shallow(
      <ShowIf condition={true}>
        <OrElse><span id='show'>works</span></OrElse>
      </ShowIf>
    )

    expect(wrapper.find('span#show').exists()).toBeFalsy()
    expect(wrapper).toMatchSnapshot()
  })
})

describe('ShowIf', () => {
  it('should accept functions as condition', () => {
    const truthyFunc = () => true
    const falsyFunc = () => false
    const wrapper = shallow(
      <div>
        <ShowIf condition={truthyFunc}>
          <IsTrue><span id='show'>works</span></IsTrue>
        </ShowIf>
        <ShowIf condition={falsyFunc}>
          <OrElse><span id='show2'>works</span></OrElse>
        </ShowIf>
      </div>
    )

    expect(wrapper.find('span#show').exists()).toBeTruthy()
    expect(wrapper.find('span#show2').exists()).toBeTruthy()
    expect(wrapper).toMatchSnapshot()
  })

  it('works', () => {
    const wrapper = shallow(
      <ShowIf condition={true}>
        <IsTrue><span id='show'>works</span></IsTrue>
        <IsFalseAnd condition={true}><span id='show2'>works</span></IsFalseAnd>
        <IsFalseAnd condition={false}><span id='show3'>works</span></IsFalseAnd>
        <OrElse><span id='show4'>works</span></OrElse>
      </ShowIf>
    )

    expect(wrapper).toMatchSnapshot()

    expect(wrapper.find('span#show').exists()).toBeTruthy()
    expect(wrapper.find('span#show2').exists()).toBeFalsy()
    expect(wrapper.find('span#show3').exists()).toBeFalsy()
    expect(wrapper.find('span#show4').exists()).toBeFalsy()

    wrapper.setProps({ condition: false })

    expect(wrapper.find('span#show').exists()).toBeFalsy()
    expect(wrapper.find('span#show2').exists()).toBeTruthy()
    expect(wrapper.find('span#show3').exists()).toBeFalsy()
    expect(wrapper.find('span#show4').exists()).toBeFalsy()

    const firstChange = [
      (<IsTrue><span id='show'>works</span></IsTrue>),
      (<IsFalseAnd condition={true}><span id='show2'>works</span></IsFalseAnd>),
      (<IsFalseAnd condition={true}><span id='show3'>works</span></IsFalseAnd>),
      (<OrElse><span id='show4'>works</span></OrElse>)
    ]

    wrapper.setProps({ children: firstChange })

    expect(wrapper.find('span#show').exists()).toBeFalsy()
    expect(wrapper.find('span#show2').exists()).toBeTruthy()
    expect(wrapper.find('span#show3').exists()).toBeTruthy()
    expect(wrapper.find('span#show4').exists()).toBeFalsy()

    const secondChange = [
      (<IsTrue><span id='show'>works</span></IsTrue>),
      (<IsFalseAnd condition={false}><span id='show2'>works</span></IsFalseAnd>),
      (<IsFalseAnd condition={false}><span id='show3'>works</span></IsFalseAnd>),
      (<OrElse><span id='show4'>works</span></OrElse>)
    ]

    wrapper.setProps({ children: secondChange })

    expect(wrapper.find('span#show').exists()).toBeFalsy()
    expect(wrapper.find('span#show2').exists()).toBeFalsy()
    expect(wrapper.find('span#show3').exists()).toBeFalsy()
    expect(wrapper.find('span#show4').exists()).toBeTruthy()
  })

  it('should throw an error if wrong child', () => {
    const wrapper = () => shallow(
      <ShowIf condition={true}>
        <span>wrong</span>
      </ShowIf>
    )

    expect(wrapper).toThrowError('ShowIf child is invalid!')
  })

  it('should throw an error if wrong children', () => {
    const wrapper = () => shallow(
      <ShowIf condition={true}>
        <IsTrue><span>test</span></IsTrue>
        <span>wrong</span>
      </ShowIf>
    )

    expect(wrapper).toThrowError('ShowIf child[1] is invalid!')
  })
})
