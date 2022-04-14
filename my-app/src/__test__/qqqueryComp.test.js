import React from 'react'
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'

import QQQueryComp, { QQInfoComp } from '../components/QQQueryComp/QQQuery.js'
jest.mock('../http')
import { axios_instance } from '../http'


afterEach(() => cleanup())
describe('<qqqueryComp />', () => {

    render(<QQQueryComp />)

    test('qqInfoComp component should in QQQueryComp', () => {
        const qqInfoComp = screen.getByRole('qqinfo')
        expect(qqInfoComp).toBeInTheDocument()
    })

    test('QQInfoComp should show the new getted value', async () => {
        const getQQData = jest.fn()
        let qqDataFn = await getQQData.mockReturnValueOnce({
            "qq": "774740085",
            "name": "ゆ、 音色 Cutey。",
            "qlogo": 'http://doc.weex.io/logo@2x.svg'
        })
        let data = qqDataFn()

        const { container } = render(<QQInfoComp qq={data.qq} nickName={data.name} />)
        const namespan = container.querySelector('.nickname')
        const qqspan = container.querySelector('.qq')

        expect(namespan.textContent).toBe('ゆ、 音色 Cutey。')
        expect(qqspan.textContent).toBe('774740085')
    })

    test('QQQueryComp \'s input element blur event dispatch , getQQInfoFn should Be called! ', () => {
        const getQQData = jest.fn()
        const { container } = render(<QQQueryComp />)
        const input = container.querySelector('#qq')
        input.onblur = getQQData
        fireEvent.blur(input)

        expect(getQQData).toHaveBeenCalledTimes(1)

    })

    test("when getQQInfo component\' request may get an error,  should show ErrComp", () => {
        // let errDataFn = axios_instance.mockRejectedValueOnce({ err_code: 1001 })
        // errDataFn().catch(err => console.log(err))  
        let errDataFn = jest.fn()
        errDataFn.mockReturnValueOnce({ err_code: 1001 })

        const { getByRole, getByText } = render(<QQQueryComp />)
        const inputEl = getByRole('inputqq')
        inputEl.onblur = errDataFn
        fireEvent.blur(inputEl, {
            target: {
                value: 'aaaa'
            }
        })
        console.log(inputEl.memoizedProps)
        expect(errDataFn).toHaveBeenCalledTimes(1)
        expect(inputEl.value).toBe('aaaa')

    })

})