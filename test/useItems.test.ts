import { describe, expect, test } from "vitest"
import { renderHook, act } from "@testing-library/react"
import { useItems } from "../src/hooks/useItems"

describe('useItems hook', ()=>{
    test('should add and remove items', ()=>{
        const { result } = renderHook( () => useItems() )
        //console.log(result.current)
        expect(result.current.items.length).toBe(0)

        //es async necesitamos un renderizado por eso usamos act
        act(()=>{
            result.current.addItem('Computer 💻')
        })
        expect(result.current.items.length).toBe(1)
        act(()=>{
            result.current.addItem('Libros 📚')
            result.current.addItem('Videojuegos 🕹️')
        })
        expect(result.current.items.length).toBe(3)
        act(()=>{
            result.current.removeItem(result.current.items[0].id)
        })
        expect(result.current.items.length).toBe(2)
        
    })
})
 
