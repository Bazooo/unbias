import React from 'react'
import { shallow } from 'enzyme'

import ShowIf, { IsTrue, OrElse, IsFalseAnd } from '../src/ShowIf'

describe('IsTrue', () => {
  it('should return children', () => {
    const component = shallow(
      <IsTrue><span>test</span></IsTrue>
    )

    expect(component.find('span').exists()).toBeTruthy()
    expect(component).toMatchSnapshot()
  })

  it('should show if condition is truthy', () => {
    const component = shallow(
      <ShowIf condition={true}>
        <IsTrue><span id='show'>works</span></IsTrue>
      </ShowIf>
    )

    expect(component.find('span#show').exists()).toBeTruthy()
    expect(component).toMatchSnapshot()
  })

  it('should show nothing if condition is falsy', () => {
    const component = shallow(
      <ShowIf condition={false}>
        <IsTrue><span id='show'>works</span></IsTrue>
      </ShowIf>
    )

    expect(component.find('span#show').exists()).toBeFalsy()
    expect(component).toMatchSnapshot()
  })
})

describe('IsFalseAnd', () => {
  it('should return children', () => {
    const component = shallow(
      <IsFalseAnd condition={true}><span>test</span></IsFalseAnd>
    )

    expect(component.find('span').exists()).toBeTruthy()
    expect(component).toMatchSnapshot()
  })
  it('should show if condition is falsy (F)[T]', () => {
    const component = shallow(
      <ShowIf condition={false}>
        <IsFalseAnd condition={true}><span id='show'>works</span></IsFalseAnd>
      </ShowIf>
    )

    expect(component.find('span#show').exists()).toBeTruthy()
    expect(component).toMatchSnapshot()
  })

  it('should show nothing if condition is falsy but component condition is false (F)[F]', () => {
    const component = shallow(
      <ShowIf condition={false}>
        <IsFalseAnd condition={false}><span id='show'>works</span></IsFalseAnd>
      </ShowIf>
    )

    expect(component.find('span#show').exists()).toBeFalsy()
    expect(component).toMatchSnapshot()
  })

  it('should show nothing if condition is truthy (T)[T,F]', () => {
    const component = shallow(
      <ShowIf condition={true}>
        <IsFalseAnd condition={true}><span id='show'>works</span></IsFalseAnd>
        <IsFalseAnd condition={false}><span id='show2'>works</span></IsFalseAnd>
      </ShowIf>
    )

    expect(component.find('span#show').exists()).toBeFalsy()
    expect(component.find('span#show2').exists()).toBeFalsy()
    expect(component).toMatchSnapshot()
  })

  it('should show only true conditions and in order (F)[T,F,T,F,T]', () => {
    const component = shallow(
      <ShowIf condition={false}>
        <IsFalseAnd condition={true}><span id='show'>works</span></IsFalseAnd>
        <IsFalseAnd condition={false}><span id='show2'>works</span></IsFalseAnd>
        <IsFalseAnd condition={true}><span id='show3'>works</span></IsFalseAnd>
        <IsFalseAnd condition={false}><span id='show4'>works</span></IsFalseAnd>
        <IsFalseAnd condition={true}><span id='show5'>works</span></IsFalseAnd>
      </ShowIf>
    )

    // test existance
    expect(component.find('span#show').exists()).toBeTruthy()
    expect(component.find('span#show2').exists()).toBeFalsy()
    expect(component.find('span#show3').exists()).toBeTruthy()
    expect(component.find('span#show4').exists()).toBeFalsy()
    expect(component.find('span#show5').exists()).toBeTruthy()

    // test ordering
    expect(component.find('span').first().prop('id') === 'show').toBeTruthy()
    expect(component.find('span').at(1).prop('id') === 'show3').toBeTruthy()
    expect(component.find('span').at(2).prop('id') === 'show5').toBeTruthy()

    expect(component).toMatchSnapshot()
  })

  it('should accept functions as condition', () => {
    const truthyFunc = () => true
    const falsyFunc = () => false
    const component = shallow(
      <ShowIf condition={false}>
        <IsFalseAnd condition={truthyFunc}><span id='show'>works</span></IsFalseAnd>
        <IsFalseAnd condition={falsyFunc}><span id='show2'>works</span></IsFalseAnd>
      </ShowIf>
    )

    expect(component.find('span#show').exists()).toBeTruthy()
    expect(component.find('span#show2').exists()).toBeFalsy()
    expect(component).toMatchSnapshot()
  })
})

describe('OrElse', () => {
  it('should return children', () => {
    const component = shallow(
      <OrElse><span>test</span></OrElse>
    )

    expect(component.find('span').exists()).toBeTruthy()
    expect(component).toMatchSnapshot()
  })

  it('should show if condition is falsy', () => {
    const component = shallow(
      <ShowIf condition={false}>
        <OrElse><span id='show'>works</span></OrElse>
      </ShowIf>
    )

    expect(component.find('span#show').exists()).toBeTruthy()
    expect(component).toMatchSnapshot()
  })

  it('should show nothing if condition is truthy', () => {
    const component = shallow(
      <ShowIf condition={true}>
        <OrElse><span id='show'>works</span></OrElse>
      </ShowIf>
    )

    expect(component.find('span#show').exists()).toBeFalsy()
    expect(component).toMatchSnapshot()
  })
})

describe('ShowIf', () => {
  it('should accept functions as condition', () => {
    const truthyFunc = () => true
    const falsyFunc = () => false
    const component = shallow(
      <div>
        <ShowIf condition={truthyFunc}>
          <IsTrue><span id='show'>works</span></IsTrue>
        </ShowIf>
        <ShowIf condition={falsyFunc}>
          <OrElse><span id='show2'>works</span></OrElse>
        </ShowIf>
      </div>
    )

    expect(component.find('span#show').exists()).toBeTruthy()
    expect(component.find('span#show2').exists()).toBeTruthy()
    expect(component).toMatchSnapshot()
  })
})
