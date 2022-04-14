import React from 'react'
import { render, getByDisplayValue, screen, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import ICarousel from '../components/ICarousel'

describe('<ICarousel />', () => {

    test('the first img\'s El of the three imgs should be showed', () => {
        const { container, getAllByRole, queryAllByText } = render(<ICarousel effect="slide" />)
        const imgEl = getAllByRole('img')
        const txtEl = queryAllByText('aaa')

        expect(txtEl[0].textContent).toBe('aaa')
        expect(imgEl.length).toBe(1)
    })

    test('the navigaton\'s and pagination\'s Els should be showed' , () => {
        const { container } = render(<ICarousel effect="slide" />)
        const liEl = container.querySelectorAll('li')
        const spanEl = container.querySelectorAll('span')
       
        expect(liEl.length).toBe(3)
        expect(spanEl.length).toBe(2)    
    })
    test('when pagination\' El is clicked, classList should be add "react-carousel_pagination-item-active"' , () => {
        const { container } = render(<ICarousel effect="slide" />)
        const liEl = container.querySelectorAll('li')
        
        liEl.forEach((item,index)=>{           
            fireEvent.click(item)          
            let classArr = Array.from(item.classList)
            expect(classArr.includes('react-carousel_pagination-item-active')).toBeTruthy()
        })

       
          
    })
})