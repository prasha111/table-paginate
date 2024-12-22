import React from 'react'
import "./table.css"

function Table({tableHeader, dataMap, data}) {
  return (
    <div>
         <table className="table">
          <thead>
            <tr>
                {
                    tableHeader?.map((each)=>{
                        return(
                            <th>
                                {each}
                            </th>
                        )
                    })
                }
            </tr>
          </thead>
          <tbody>
            {data ? data?.map((eachProj, index)=>{
                return(
                    <tr key={index}>
                        { dataMap?.map((each)=>{
                            return(
                        <td>{eachProj[each]}</td>


                            )
                        })}
              </tr>
                )
            })
            :
            "No-data"
        }
          </tbody>
        </table>
    </div>
  )
}

export default Table