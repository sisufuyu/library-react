import { useState, useEffect } from "react"

const useField = (name: string, defaultValue = '') => {
  const [value, setValue] = useState(defaultValue)
  const [err, setErr] = useState('')

  useEffect(() => {
    setValue(defaultValue)
  }, [defaultValue])

  const onChange = (event: React.ChangeEvent) => {
    const target = event.target as HTMLInputElement
    setValue(target.value)
    if (!target.value) {
      setErr(`${name} is required`)
    } else setErr('')
  }

  const validate = () => {
    if (!value) {
      setErr(`${name} is required`)
      return false
    } else {
      setErr('')
      return true
    }
  }

  const reset = () => {
    setValue('')
    setErr('')
  }

  return {
    name,
    value,
    onChange,
    reset,
    err,
    setErr,
    validate
  }
}

export default useField