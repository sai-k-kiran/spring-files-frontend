import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Radio, RadioGroup,
    Stack
  } from '@chakra-ui/react'
import { useRef, useState } from 'react'

function ModalForm({isOpen, onClose, overlay}) {
    const initialRef = useRef(null)
    const finalRef = useRef(null)
    const [value, setValue] = useState('1')
  
    return (
      <>
        <Modal isCentered isOpen={isOpen} onClose={onClose}>
          {overlay ? <ModalOverlay
                        bg='blackAlpha.300'
                        backdropFilter='blur(10px) hue-rotate(90deg)'
                    /> 
           : ""}
          <ModalContent>
            <ModalHeader>Create your account</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
                <FormControl>
                    <FormLabel>Full name</FormLabel>
                    <Input ref={initialRef} placeholder='Full Name' />
                </FormControl>

                <FormControl mt={4}>
                    <FormLabel>Email</FormLabel>
                    <Input placeholder='Email' />
                </FormControl>
                <FormControl mt={4}>
                    <FormLabel>Age</FormLabel>
                    <NumberInput size='md' maxW={80} defaultValue={15} min={10}>
                        <NumberInputField />
                        <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </FormControl>
                
                <FormControl mt={4}>
                    <FormLabel>Gender</FormLabel>
                    <RadioGroup onChange={setValue} value={value}>
                        <Stack direction='row'>
                            <Radio value='1'>Male</Radio>
                            <Radio value='2'>Female</Radio>
                        </Stack>
                    </RadioGroup>
                </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button onClick={onClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }

export default ModalForm