class FormInput {
    label: string
    inputType: string
    placeholder: string
    uniqueId: string
    value: any

    constructor(label: string, inputType: string, placeholder: string) {
        this.label = label
        this.inputType = inputType
        this.placeholder = placeholder
        this.uniqueId = '' // set in form with react useId()
        this.value = inputType === 'radio' ? false : ''
    }

    public validateInput (): boolean {
        let isValid = false
        try {
            isValid = this.value !== ''
        } catch(err) {
            console.log(`ERR: ${err}`)
        }
        return isValid
    }

    public resetValue (): void {
        try {
            this.value = this.inputType === 'radio' ? false : ''
        } catch(err) {
            console.log(`ERR: ${err}`)
        }
    }
}

const naTenthStepInputs: FormInput[] = [
    new FormInput('Did You X Today?', 'radio', ''),
    new FormInput('Did you go to a meeting today?', 'radio', ''),
    new FormInput('Did I leave anything unfinished today?', 'textarea', '')
],
boysList: FormInput[] = [
    new FormInput('What have I left undone that I wish I had done?', 'textarea', ''),
    new FormInput('How have I acted in fear or acted in a way that caused me shame?', 'textarea', ''),
    new FormInput('What have I done for my recovery today?', 'textarea', ''),
    new FormInput('Have I sought out the guidance of my higher power today? How?', 'textarea', ''),
    new FormInput('What did I learn about myself today', 'textarea', ''),
    new FormInput('What did I do today that I wish I had not done?', 'textarea', '')
]
// aaTenthStepInputs: FormInput[] = [
//     new FormInput('AA: Did You Y Today?', 'radio', ''),
//     new FormInput('AA: Did you go to a meeting today?', 'radio', ''),
//     new FormInput('AA: Did I leave anything unfinished today?', 'textarea', '')
// ]

interface InventoryInputs {
    identifier: string
    title: string
    questions: FormInput[]
}

const inventories: InventoryInputs[] = [
    { identifier: 'boysList', title: `A Boys List 🤼‍♀️`, questions: boysList },
    { identifier: 'naTenthStep', title: 'NA - Tenth Step (Under Construction)', questions: naTenthStepInputs },
    //{ identifier: 'aaTenthStep', title: 'AA - Tenth Step', questions: aaTenthStepInputs },
]

export default inventories