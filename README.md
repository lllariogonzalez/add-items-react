# Prueba técnica React y Nodejs

> Te damos la bienvenida a la primera prueba técnica del proceso de selección como Senior Software Typescript Developer con React y Nodejs. La prueba consiste en lo siguiente:

### Ejercicio 1. Añadir y eliminar elementos de una lista (React)

**Requisitos**: Tener instalado Nodejs (v16.x.x o superior). Tener instalado npm.

**Enunciado**:

```bash
Crear una app en React que implemente un campo de texto y botón para añadir un elemento.

Cuando se hace click en el botón, el texto en el campo de entrada debe agregarse a continuación en una lista de elementos.

Además, cada vez que se hace click en cualquier elemento de la lista, debe eliminarse de la lista.
```

- [x] _Dar importancia a la funcionalidad y usabilidad, más que al diseño visual._
- [x] _El código debe ser enteramente desarrollado en Typescript._

### Ejercicio 2. API REST (Nodejs)

**Requisitos**: Tener instalado Nodejs (v16.x.x o superior). Tener instalado npm.

**Enunciado**:

```bash
Crear una API REST en Node.js que gestione Libros y Autores. Se deben crear 2 endpoints para operar con la misma.

Se puede usar almacenamiento en memoria o el sistema gestor de bases de datos de su preferencia.
```

**Entidad Libro (book):**

- id: number
- title: string
- chapters: number. Representa la cantidad de capítulos.
- pages: number. Representa la cantidad de páginas.

**Entidad Autor (author):**

- id: number
- name: string

- [x] _Debe existir una relación del tipo Many-to-Many entre los libros y los autores_

**Endpoints:**

1. **Nuevo Libr**o: Creará un nuevo libro, aportando todos sus datos incluidos los autores.
2. **Obtener todos los libros**: Deberá devolver un listado de libros con sus autores.
3. **Crear un autor**: Creará un nuevo autor
4. **Obtener todos los autores**: Deberá devolver un listado de todos los autores con los libros que tengan.
5. **Obtener Promedio de Páginas por Capítulo**: Obtener el dato de una instancia de Libro ya creada. Se debe devolver el id del libro consultado y un promedio de páginas por capítulo. Ambos en formato cadena, y con 2 decimales para el promedio.

- [x] _Para la prueba es necesario realizar lo que dicta el enunciado, aunque se pueden agregar características no mencionadas (manejo de errores, repositorio de datos, validaciones, etc.)._
- [x] _Se pueden asumir los aspectos que no aclare el enunciado, y realizar aclaraciones personales en caso de ser necesario._
- [x] _El código debe ser enteramente desarrollado en Typescript._

---

# Project Inicialization using Vite

```bash
npm create vite@latest
npm install
npm run dev
# for testing
npm install vitest happy-dom @testing-library/react -D
```

## Notas

Comparación de los distintos enfoques para controlar el formulario

### Formulario controlado con estado:

- Ventajas: Proporciona un control total sobre los valores de los campos de entrada y facilita la validación en tiempo real.
- Desventajas: Requiere más código y estado para cada campo de entrada.

```JavaScript
import React, { useState } from 'react';

function MyForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    // Otros campos del formulario
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes procesar los datos del formulario
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      {/* Otros campos del formulario */}
      <button type="submit">Enviar</button>
    </form>
  );
}

export default MyForm;

```

### Acceso directo a los campos a través de FormData:

- Ventajas: Menos código en comparación con un formulario controlado. Útil para formularios con muchos campos o dinámicos.
- Desventajas: Menos control en tiempo real y no es tan intuitivo para la validación.

```JavaScript
import React from 'react';

function MyForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const nameValue = formData.get('name');
    const emailValue = formData.get('email');

    if (nameValue && emailValue) {
      // Realiza acciones con los valores (validación, envío al servidor, etc.)
      console.log('Name:', nameValue);
      console.log('Email:', emailValue);

      // Restablece los valores de los campos de entrada
      e.target.reset();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Nombre" />
      <input type="email" name="email" placeholder="Email" />
      <button type="submit">Enviar</button>
    </form>
  );
}

export default MyForm;

```

### Acceso directo a los campos a través de event.currentTarget y elements.namedItem:

- Ventajas: Proporciona acceso directo a los elementos del formulario. Útil para validaciones avanzadas.
- Desventajas: Requiere más código para la validación y puede ser menos legible.

```JavaScript
import { useState } from 'react'
import './App.css'

interface Item {
  id: `${string}-${string}-${string}-${string}-${string}`
  timestamp: number
  text: string
}

function App() {
  const [items, setItems] = useState<Item[]>([])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>)=>{
    event.preventDefault()
    const { elements } = event.currentTarget
    const input = elements.namedItem('item')
    const isInput = input instanceof HTMLInputElement
    if(!isInput || input == null) return 

    const newItem: Item = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      text: input.value
    }

    setItems((prevItems: Item[]): Item[]=>{
      return [ ...prevItems, newItem]
    })

    input.value = ''
  }

  const handleDelete = (id: string) =>{
    const itemsFilter = items.filter(item=>item.id !== id)
    setItems(itemsFilter)
  }

  return  (
    <main>
      <aside>
        <header>
          <h1>Prueba técnica de React</h1>
          <h2>Añadir y eliminar elementos de un lista</h2>
        </header>
        <form onSubmit={handleSubmit} >
          <label>
            Elemento a introducir
            <input name="item" type="text" placeholder='Videojuegos 🕹️' required />
          </label> 
          <button>Añadir elemento a la lista</button>
        </form>
      </aside>
      <section>
        <header>
          <h2>Lista de elementos</h2>
          {items.length ? (
            <ul>
            {items.map(item=><li key={item.id} onClick={()=>handleDelete(item.id)}>{item.text}</li>)}
            </ul>
          ):(<p>No hay elementos en la lista</p>)}
        </header>
      </section>
    </main>
  )
}

export default App

```


## React + TypeScript + Vite + SWC

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
