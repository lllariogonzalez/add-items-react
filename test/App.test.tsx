import React from 'react'
import { describe, test, expect } from 'vitest'
// se puede usar screen o también obtener los metodos del render
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../src/App'

describe('<App />', ()=>{
    /* test('should work', ()=>{
        const { getByText } = render(<App />)
        expect(screen.getAllByText('Prueba técnica de React')).toBeDefined()
        // se puede usar regex
        expect(getByText(/React/i)).toBeDefined()
    }) */

    test('should add items and remove them', async ()=>{
        const user = userEvent.setup()
        render(<App />)

        //buscar el input, podemos usar el role, por defecto un input es textbox
        const input = screen.getAllByRole('textbox')[0]
        expect(input).toBeDefined()

        //buscar el form, por defecto no tiene role, debemos darle uno
        const form = screen.getAllByRole('form')[0]
        expect(form).toBeDefined()
        
        //buscar el boton, y gregar un elemento
        const button = form.querySelector('button')
        expect(button).toBeDefined()

        //agregar un random input para verificar
        const randomText = crypto.randomUUID()
        await user.type(input, randomText)
        await user.click(button!)

        //asegurarnos que el elemento se ha agregado
        const list = screen.getByRole('list')
        expect(list).toBeDefined()
        
        // screen.debug() para ver el renderizado por consola
        expect(list.childNodes.length).toBe(1)


        //buscar el boton para eliminar el elemento
        const item = screen.getByText(randomText)
        const removeButton = item.querySelector('button')
        expect(removeButton).toBeDefined()

        //asegurarnos de que lo podemos borrar
        await user.click(removeButton!)

        const noResults = screen.getByText('No hay elementos en la lista')
        expect(noResults).toBeDefined()
    })
})