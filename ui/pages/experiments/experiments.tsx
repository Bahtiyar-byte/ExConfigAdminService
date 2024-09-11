import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import apolloClient from '../../../apolloGraphql';
import { gql } from '@apollo/client'
//import mockData from '../../mock-data/mock-data.json'
import { appRoute } from '../../app-route.enum'
import {
  DataTable,
  Pagination,
  SearchInput,
  usePagination,
  useSearchFilter,
  useSortedFilter,
  useStatusFilter
} from '../../base-components'
import useSelectBox from '../../hue-components/use-hue-select-box'

export const Experiments = () => {
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortConfig, setSortConfig] = useState({ orderBy: '', orderDirection: 'asc' as 'asc' | 'desc' })
  const [selectedStatus, setSelectedStatus] = useState('All')
  const gdsSelectBoxRef = useRef<HTMLSelectElement>(null)
  const itemsPerPage = 25

  const [allExperiments, setAllExperiments] = useState([]);

  const filteredData = useSearchFilter(allExperiments, searchTerm)
  const statusData = useStatusFilter(filteredData, selectedStatus)
  const sortedData = useSortedFilter(statusData, sortConfig)

  const { totalPages, indexOfLastItem, indexOfFirstItem } = usePagination(sortedData.length, itemsPerPage, currentPage)

  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem)
  console.log('currentItems ', currentItems)

  const navigateToNewExperiment = () => {
    navigate(appRoute.newExperiment)
  }
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

    apolloClient.query({
      query: gql`{  getAllExperiments { key { id systemId } experimentName description status owner tagName systemName} }`
      }).then(result => {
        setAllExperiments(result.data.getAllExperiments)
        console.log('all exp ---------------', result)
      })

// apolloClient.query({
//   query: gql`{  getAllExperiments { key { id systemId } experimentName description status owner tagName systemName} }`
//   }).then(result => console.log('all exp ---------------', result))

  const handleSortChange = (orderBy: string, orderDirection: 'asc' | 'desc') => {
    setSortConfig({ orderBy, orderDirection })
  }

  type ChipType = 'success' | 'alert' | 'neutral' | 'generic' | 'warning' | undefined
  const getChipType = (publishStatus: string): ChipType => {
    switch (publishStatus.toLowerCase()) {
      case 'active':
        return 'success'
      case 'failed':
        return 'alert'
      case 'inactive':
        return 'neutral'
      default:
        return 'generic'
    }
  }
  useEffect(() => {
    setCurrentPage(1)
  }, [selectedStatus, filteredData])

  useSelectBox(gdsSelectBoxRef, setSelectedStatus)

//   const { loading, error, data } = useQuery(GET_ALL_EXPERIMENTS);
//
//   console.log('all experiments ', data?.getAllExperiments)
//   console.log('loading ', loading)
//   console.log('error ', error)

  return (
    <>
      <div className="margin-top margin-bottom">
        <gds-page-header>Experiment Exchange</gds-page-header>
      </div>

      <div className="container wider-layout">
        <div className="am-ui-button-container">
          <gds-button-group>
            <button
              type="button"
              onClick={navigateToNewExperiment}
              className="btn btn--primary btn--full-mobile btn--pull-right"
            >
              <span>Add Experiment</span>
            </button>
          </gds-button-group>
        </div>
        <div className="component-row-container">
          <SearchInput onSearchChange={setSearchTerm} />
          <div className="pull-right">
            <gds-select-box ref={gdsSelectBoxRef} id="status-filter" name="Statuses">
              <option value="All">Show All Statuses</option>
              <option value="Not Started Yet">Show Not Started Statuses</option>
              <option value="Active">Show Active Statuses</option>
              <option value="Inactive">Show Inactive Statuses</option>
            </gds-select-box>
          </div>
        </div>

        <DataTable
          data={currentItems}
          columns={[
            { header: 'Experiment Title', dataField: 'experimentName' },
            { header: 'Start Date', dataField: 'startDatetime' },
            { header: 'End Date', dataField: 'endDatetime' },
            { header: 'Team Name', dataField: 'systemName' },
            { header: 'Description', dataField: 'description' },
            {
              header: 'Status',
              dataField: 'status',
              render: dataItem => (
                <gds-chips type={getChipType(dataItem.status)}>
                  <p className="chips">{dataItem.status}</p>
                </gds-chips>
              )
            }
          ]}
          tableName="experiment-summary"
          canUserDelete={true}
          canUserEdit={true}
          canUserArchive={true}
          editLink={appRoute.editExperimentProperties + '/'}
          archiveLink={''} // TODO: After delete confirmation wireframe is finished add link here.
          onSortChange={handleSortChange}
        />
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>
    </>
  )
}



// import { useState, useEffect, useRef } from 'react'
// import { useNavigate } from 'react-router-dom'
// import mockData from '../../mock-data/mock-data.json'
// import { appRoute } from '../../app-route.enum'
// import {
//   DataTable,
//   Pagination,
//   SearchInput,
//   usePagination,
//   useSearchFilter,
//   useSortedFilter,
//   useStatusFilter
// } from '../../base-components'
// import useSelectBox from '../../hue-components/use-hue-select-box'
//
// export const Experiments = () => {
//   const navigate = useNavigate()
//   const [currentPage, setCurrentPage] = useState(1)
//   const [searchTerm, setSearchTerm] = useState('')
//   const [sortConfig, setSortConfig] = useState({ orderBy: '', orderDirection: 'asc' as 'asc' | 'desc' })
//   const [selectedStatus, setSelectedStatus] = useState('All')
//   const gdsSelectBoxRef = useRef<HTMLSelectElement>(null)
//   const itemsPerPage = 25
//
//   const filteredData = useSearchFilter(mockData, searchTerm)
//   const statusData = useStatusFilter(filteredData, selectedStatus)
//   const sortedData = useSortedFilter(statusData, sortConfig)
//
//   const { totalPages, indexOfLastItem, indexOfFirstItem } = usePagination(sortedData.length, itemsPerPage, currentPage)
//
//   const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem)
//
//   const navigateToNewExperiment = () => {
//     navigate(appRoute.newExperiment)
//   }
//   const handlePageChange = (pageNumber: number) => {
//     setCurrentPage(pageNumber)
//   }
//
//   const handleSortChange = (orderBy: string, orderDirection: 'asc' | 'desc') => {
//     setSortConfig({ orderBy, orderDirection })
//   }
//
//   type ChipType = 'success' | 'alert' | 'neutral' | 'generic' | 'warning' | undefined
//   const getChipType = (publishStatus: string): ChipType => {
//     switch (publishStatus.toLowerCase()) {
//       case 'active':
//         return 'success'
//       case 'failed':
//         return 'alert'
//       case 'inactive':
//         return 'neutral'
//       default:
//         return 'generic'
//     }
//   }
//   useEffect(() => {
//     setCurrentPage(1)
//   }, [selectedStatus, filteredData])
//
//   useSelectBox(gdsSelectBoxRef, setSelectedStatus)
//
//   return (
//     <>
//       <div className="margin-top margin-bottom">
//         <gds-page-header>Experiment Exchange</gds-page-header>
//       </div>
//
//       <div className="container wider-layout">
//         <div className="am-ui-button-container">
//           <gds-button-group>
//             <button
//               type="button"
//               onClick={navigateToNewExperiment}
//               className="btn btn--primary btn--full-mobile btn--pull-right"
//             >
//               <span>Add Experiment</span>
//             </button>
//           </gds-button-group>
//         </div>
//         <div className="component-row-container">
//           <SearchInput onSearchChange={setSearchTerm} />
//           <div className="pull-right">
//             <gds-select-box ref={gdsSelectBoxRef} id="status-filter" name="Statuses">
//               <option value="All">Show All Statuses</option>
//               <option value="Not Started Yet">Show Not Started Statuses</option>
//               <option value="Active">Show Active Statuses</option>
//               <option value="Inactive">Show Inactive Statuses</option>
//             </gds-select-box>
//           </div>
//         </div>
//
//         <DataTable
//           data={currentItems}
//           columns={[
//             { header: 'Experiment Title', dataField: 'experimentName' },
//             { header: 'Start Date', dataField: 'startDatetime' },
//             { header: 'End Date', dataField: 'endDatetime' },
//             { header: 'Team Name', dataField: 'systemName' },
//             { header: 'Description', dataField: 'description' },
//             {
//               header: 'Status',
//               dataField: 'status',
//               render: dataItem => (
//                 <gds-chips type={getChipType(dataItem.status)}>
//                   <p className="chips">{dataItem.status}</p>
//                 </gds-chips>
//               )
//             }
//           ]}
//           tableName="experiment-summary"
//           canUserDelete={true}
//           canUserEdit={true}
//           canUserArchive={true}
//           editLink={appRoute.editExperimentProperties + '/'}
//           archiveLink={''} // TODO: After delete confirmation wireframe is finished add link here.
//           onSortChange={handleSortChange}
//         />
//         <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
//       </div>
//     </>
//   )
// }
