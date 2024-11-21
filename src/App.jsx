import { useEffect, useState, useMemo } from 'react'
import DataTable from 'react-data-table-component'
import { CircleLoader } from 'react-spinners'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { data } from './constants/data'
import { columns } from './constants/columns'

import './App.css'

function App() {
  const [filteredData, setFilteredData] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFilteredData(data)
      setLoading(false)
    }, 2000)
    return () => clearTimeout(timeout)
  }, [])

  const handleChange = e => {
    setSearchText(e.target.value)
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
      <div className="loader-container">
        <CircleLoader color="#36d7b7" loading={true} size={40} />
      </div>
    )
  }

  const handleDeleteClick = () => {
    toast.success('Las filas seleccionadas han sido eliminadas', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  }

  const handleExportClick = () => {
    toast.info('Exportación de filas seleccionadas exitosa', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  }
  const contextActions = (
    <>
      <button onClick={handleDeleteClick} className="context-delete-button">
        Eliminar
      </button>
      <button onClick={handleExportClick} className="context-export-button">
        Exportar
      </button>
    </>
  )

  const disabledCriteria = row => {
    if (row.status === 'disabled') {
      return true
    } else {
      return false
    }
  }

  const rowSelectCritera = row => !!row.preselected === true

  const conditionalRowStyles = [
    {
      when: row => row.paginas < 250,
      style: {
        backgroundColor: 'rgba(213, 115, 146, 0.9)',
        color: 'white',
        '&:hover': {
          cursor: 'pointer',
        },
      },
    },
    {
      when: row => row.paginas >= 250,
      style: {
        backgroundColor: 'rgba(224, 219, 220, 0.9)',
        color: 'black',
        '&:hover': {
          cursor: 'pointer',
        },
      },
    },
  ]

  const ExpandedComponent = ({ data }) => (
    // <pre>{JSON.stringify(data, null, 2)}</pre>
    <>
      <h4>Sinopsis</h4>
      <p>{data.sinopsis}</p>
    </>
  )

  const paginationComponentOptions = {
    rowsPerPageText: 'Filas por página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
  }

  const subHeaderContent = useMemo(() => {
    //utilizamos useMemo para que mantenga el foco en el search tras escribir una letra
    return (
      <input
        type="text"
        placeholder="Buscar en la tabla..."
        value={searchText}
        onChange={handleChange}
        className="search-input"
      />
    )
  }, [searchText])

  return (
    <div className="container">
      <DataTable
        title="Biblioteca"
        subHeader
        subHeaderComponent={!loading && subHeaderContent}
        columns={columns}
        data={filteredData}
        pagination
        paginationPerPage={7}
        paginationRowsPerPageOptions={[7, 14, 21]}
        paginationComponentOptions={paginationComponentOptions}
        fixedHeader
        progressPending={loading} // muestra el texto ...loading
        progressComponent={<Loading />} // muestra spinner personalizado
        selectableRows
        contextMessage={{
          singular: 'fila seleccionada', // Mensaje cuando se selecciona solo una fila
          plural: 'filas seleccionadas', // Mensaje cuando se seleccionan varias filas
        }}
        contextActions={contextActions} // Agrega las acciones personalizadas
        onSelectedRowsChange={data => console.log('data = ', data)}
        selectableRowDisabled={disabledCriteria}
        selectableRowSelected={rowSelectCritera}
        conditionalRowStyles={conditionalRowStyles}
        expandableRows // activa las filas expandidas
        expandableRowExpanded={row => row.defaultExpanded} // indica de forma programatica que filas deben estar expandidas inicialmente
        expandableRowDisabled={row => row.disabledExpanded} // indica de forma programatica que filas deben estar expandidas y deshabilitadas
        expandableRowsComponent={ExpandedComponent} //contenido de la fila expandida
        highlightOnHover //
        // striped={true} sombrea las filas de forma alterna para mejorar su lectura
      />
      <ToastContainer />
    </div>
  )
}

export default App
