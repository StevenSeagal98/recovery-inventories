import { useState } from 'react'

const setUniqueId = (prefix: string): string => {
  let uniqueId: string = ''
  try {
    uniqueId += prefix.slice(0,3)
    uniqueId += `${Date.now()}_${Math.floor(Math.random() * 1000)}`
  } catch(err) {
    console.log(`ERR: ${err}`)
  }
  return uniqueId
}

const TestForm = (props: { activeInventory: any }) => {
  const [inpObjVals, setInpObjVals] = useState(props.activeInventory.questions),
        handleInpObjValsChange = (e: any, i: number): void => {
          const newInputData = [...inpObjVals]
          newInputData[i]['value'] = e.target.value
          setInpObjVals(newInputData)
        }

  const renderedFormFields = props.activeInventory.questions.map((obj: any, idx: number) => {
    const { label, inputType, placeholder, uniqueId, value } = obj
    obj.uniqueId = setUniqueId(props.activeInventory.identifier)
    let element
    try {
      switch(inputType) {
        case 'text':
          element = (
            <div className="form-group" key={idx}>
              <label htmlFor={uniqueId}>{label}</label>
              <input type="text" placeholder={placeholder ?? '...'} id={uniqueId} onChange={(e) => handleInpObjValsChange(e, idx)} />
            </div>
          )
          break
        case 'textarea':
          element = (
            <div className="form-group" key={idx}>
              <label htmlFor={uniqueId}>{label}</label>
              <textarea className="form-control" id={uniqueId} rows={4} cols={50} placeholder={placeholder ?? '...'} onChange={(e) => handleInpObjValsChange(e, idx)} />
            </div>
          )
          break
        case 'radio':
          element = (
            <div key={idx}>
              <p>{label}</p>
              <section className="d-flex flex-row flex-wrap col-12 justify-content-start align-items-center">
                <div className="form-group col-6">
                  <label htmlFor={`${uniqueId}-true`}>True</label>
                  <input className="form-check" id={`${uniqueId}-true`} type="radio" value="true" checked={JSON.parse(inpObjVals[idx]['value']) ?? false} onChange={(e) => handleInpObjValsChange(e, idx)} />
                </div>
                <div className="form-group col-6">
                  <label htmlFor={`${uniqueId}-false`}>False</label>
                  <input className="form-check" id={`${uniqueId}-false`} type="radio" value="false" checked={!JSON.parse(inpObjVals[idx]['value']) ?? false} onChange={(e) => handleInpObjValsChange(e, idx)} />
                </div>
              </section>
            </div>
          )
        default:
          break
      }
    } catch(err) {
      console.log(`ERR: ${err}`)
    }
    return element
  })

  return (
    <form className="rounded col-md-6 col-12 mx-auto shadow p-2">
      <h3>{props.activeInventory.title}</h3>
      { renderedFormFields }
    </form>
  )
}

export default TestForm
