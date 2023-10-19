import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Input,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Radio, RadioGroup,
    Stack,
    Button,
    Flex,
    FormErrorMessage
  } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { saveCustomer } from '../services/client';
import { successNotification, errorNotification } from '../services/Notification';

const CreateCustomerModal = ({isOpen, onClose, overlay, fetchCustomers}) => {
    const [values, setValues] = useState({name : "", email : "", age : 10, gender : '', password: ""})
    const [error, setError] = useState(null);

    function isValidEmail(email) {
      if(email.length != 0)
          return /\S+@\S+\.\S+/.test(email);
      return true
    }
    const errorStyle = {
      color: "rgb(229, 62, 62)",
      fontSize: "14px",
      marginTop: "7px"
    };
    
    const setname = (e) => {
      setValues((values) => ({ ...values, name: e.target.value }));
    }
    const setemail = (e) => {
      if(!isValidEmail(e.target.value)) {
        setError('Email is invalid')
      } else {
        setError(null);
        setInValid(false)
      }
      setValues((values) => ({ ...values, email: e.target.value }))
    }
    const setage = (val) => {
      setValues((values) => ({ ...values, age: val }));
    }
    const setgender = (val) => {
      setValues((values) => ({ ...values, gender: val }));
    }

    const [submitting, setSubmitting] = useState(false)

    const [nameActive, setNameActive] = useState(false)
    const [emailActive, setEmailActive] = useState(false)
    const [invalid, setInValid] = useState(true)

    const setActive = (val) => {
      if(val == "name") setNameActive(true)
      else if(val == "email") setEmailActive(true)
    }

    useEffect(() => {
      if(values.password != "" && values.name != "" && values.email != "" && isValidEmail(values.email)) 
          setInValid(false)
      else setInValid(true)
    }, [values.name, values.email])
 
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
                <FormControl isRequired isInvalid={values.name.length == 0 && nameActive}>
                    <FormLabel>Full name</FormLabel>
                    <Input placeholder='Full Name' value={values.name} 
                    onChange={(e) => setname(e)} onClick={() => setActive("name")}/>
                    {(values.name.length == 0 && nameActive) ?(
                      <FormErrorMessage>
                        Name is required
                      </FormErrorMessage>
                    ) : ''}
                </FormControl>

                <FormControl mt={4} isRequired isInvalid={values.email.length == 0 && emailActive}>
                    <FormLabel>Email</FormLabel>
                    <Input placeholder='Email' type='email' value={values.email} 
                    onChange={(e) => setemail(e)} onClick={() => setActive("email")}/>
                       <p style={errorStyle}>
                        {error}
                      </p>
                    {(values.email.length == 0 && emailActive) ? (
                      <FormErrorMessage>
                        Email is required
                      </FormErrorMessage>
                    ) : ''}
                </FormControl>
                <FormControl mt={4} isRequired>
                    <FormLabel>Password</FormLabel>
                    <Input placeholder='Password' type='email' value={values.password} 
                    onChange={(e) => setValues((values) => ({...values, password : e.target.value}))} />
                </FormControl>
                <FormControl mt={4}>
                    <FormLabel>Age</FormLabel>
                    <NumberInput size='md' maxW={80} defaultValue={15} min={10} 
                      onChange={(val) => setage(val)}>
                        <NumberInputField  />
                        <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </FormControl>
                
                <FormControl mt={4}>
                    <FormLabel>Gender</FormLabel>
                    <RadioGroup onChange={(val) => setgender(val)} value={values.gender}>
                        <Stack direction='row'>
                            <Radio value='0'>Male</Radio>
                            <Radio value='1'>Female</Radio>
                        </Stack>
                    </RadioGroup>
                </FormControl>
                <FormControl mt={4}>
                <Flex alignItems='center' justifyContent='center'>
                    <Button colorScheme='blue' type='submit'
                    isDisabled={invalid} onClick={() => {
                     setSubmitting(true)
                      saveCustomer(values)
                        .then(res => {
                          onClose()
                           successNotification(
                            "Customer created successfully",
                             `${values.name} is added`
                           )
                            fetchCustomers()
                        }).catch(err => {
                          errorNotification(
                            "An error occured while creating the customer",
                             `Error: ${err.response.data.message}`
                           )
                        }).finally(() => {
                          setSubmitting(false)
                        })
                    }}>Submit</Button>
                </Flex>
                </FormControl>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    )
  }

export default CreateCustomerModal