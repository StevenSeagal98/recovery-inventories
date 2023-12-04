import formControls from '../utils/FormControls'
import TestForm from '../components/forms/InventoryForm'
import Layout from '../app/layout'
import { useState } from 'react'

interface SuccessMessage {
    msg: string
    cssClasses: string
    icon: string | null
    id: string
}

export default function Home() {
  let keyCounter = 0

  const [formToRender, setFormToRender] = useState(formControls[0])

  const handleFormChange = (newFormIdx: number): void => {
    try {
      const newForm = formControls[newFormIdx]
      newForm.questions.forEach((q) => q.resetValue())
      keyCounter++
      setFormToRender(formControls[newFormIdx])
    } catch(err) {
      console.log(`ERR: ${err}`)
    }
  }

  const validateForm = (): boolean => {
    let formIsValid: boolean = true
    try {
      for(const formField of formToRender.questions) {
        console.log(`Question: `, formField)
        if(!formField.validateInput()) {
          formIsValid = false
          break
        }
      }
    } catch(err) {
      console.log(`ERR: ${err}`)
    }
    return formIsValid
  }

  const fireMessage = (): void => {
    try {
      
    } catch(err) {
        console.log(`ERR: ${err}`)
    }
  }

  const copyToClipboard = (): void => {
    let msg: string = `You left some fields blank. Not a very thorough inventory, huh?`
    try {
        if(!validateForm()) {
            
            // fire error message
            return
        } else {
          navigator.clipboard.writeText(formToRender.questions.map((q, idx) => `${idx + 1}) ${q.label}: \n   ${q.value}`).join(`\n`))
        }
    } catch(err) {
      console.log(`ERR: ${err}`)
    }
  }

  const formMenu = formControls.map(({ identifier, title }, idx) => {
    return (
      <li key={idx}>
        <a key={`${identifier}-a`} onClick={() => handleFormChange(idx)}>{title}</a>
      </li>
    )
  })

  return (
    <section className="container">
      <h1>Home</h1>
      <ul className="inventory-nav">
        {formMenu}
      </ul>
      <TestForm
        activeInventory={formToRender}
        key={`${formToRender.identifier}-${keyCounter}`}
      />
      <button className="btn btn-success my-2" onClick={copyToClipboard}>
        Copy To Clipboard
      </button>
    </section>
  )
}

Home.getLayout = function getLayout(Home: any) {
  return (
    <Layout>
      {Home}
    </Layout>
  )
}