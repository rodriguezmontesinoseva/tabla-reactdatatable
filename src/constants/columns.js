export const columns = [
  { name: 'Título', selector: row => row.titulo, sortable: true },
  { name: 'Autor', selector: row => row.autor, sortable: true },
  { name: 'Año', selector: row => row.año },
  { name: 'Género', selector: row => row.genero },
  { name: 'Páginas', selector: row => row.paginas },
  { name: 'ISBN', selector: row => row.isbn },
]
