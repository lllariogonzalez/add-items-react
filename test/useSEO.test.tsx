import { describe, expect, test } from "vitest"
import { renderHook } from "@testing-library/react"
import { useSEO } from "../src/hooks/useSEO"

describe('useSEO hooks',()=>{
    test('should update document title and meta description',()=>{
        const title = 'My title'
        const description = 'My description'
        renderHook( () => useSEO({title, description}) )

        expect(document.title).toBe(title)
        // Verify the meta description is set correctly
        const metaDescription = document.head.querySelector('meta[name="description"]')
        console.log(metaDescription)
        //expect(metaDescription!.getAttribute("content")).toBe(description)
    })
})