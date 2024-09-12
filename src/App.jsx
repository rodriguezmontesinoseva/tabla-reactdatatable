import DataTable from 'react-data-table-component'
import { useEffect, useState } from 'react'
import { data } from './constants/data'
import { columns } from './constants/columns'

function App() {
  const [filteredData, setFilteredData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFilteredData(data)
      setLoading(false)
    }, 2000)
    return () => clearTimeout(timeout)
  }, [])

  const handleChange = e => {
    // FILTRADO POR UNA CLAVE
    //  const newData = data.filter(data => data.titulo.includes(e.target.value))

    // FILTRADO POR TODAS LAS CLAVES
    const newData = data.filter(item =>
      Object.values(item).some(value =>
        value.toString().toLowerCase().includes(e.target.value.toLowerCase()),
      ),
    )
    setFilteredData(newData)
  }

  const Loading = () => {
    return (
      <div>
        <h1>Cargando los datos</h1>
        <h3>spinner</h3>
      </div>
    )
  }

  return (
    <div>
      <input type="text" onChange={handleChange} />
      <DataTable
        title="Biblioteca"
        columns={columns}
        data={filteredData}
        selectableRows
        onSelectedRowsChange={data => console.log(data)}
        pagination
        paginationPerPage={6}
        fixedHeader
        progressPending={loading} // muestra el texto ...loading
        progressComponent={<Loading />} // muestra spinner personalizado
      />
    </div>
  )
}

export default App
