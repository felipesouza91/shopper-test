import { Center, Field, Input } from '@chakra-ui/react'
import { useState } from 'react'

function App() {

  return (
    <Center>
      <form>
        <Field label="Identificação do Usuário">
          <Input />
        </Field>
      </form>
      
    </Center>
  )
}

export default App
