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
    Flex
  } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { updateCustomer } from '../services/client';
import { successNotification, errorNotification } from '../services/Notification';

const UpdateCustomerModal = ({isOpen, onClose, overlay, fetchCustomers, customer}) => {
    const [values, setValues] = useState({name : "", email : "", age : 10, gender : ''})
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

    const [invalid, setInValid] = useState(true)

    const setActive = (val) => {
      if(val == "name") setNameActive(true)
      else if(val == "email") setEmailActive(true)
    }

    useEffect(() => {
      if(isValidEmail(values.email)) setInValid(false)
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
            <ModalHeader>Update your account</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
                <FormControl>
                    <FormLabel>Full name</FormLabel>
                    <Input placeholder={customer.name} value={values.name} 
                    onChange={(e) => setname(e)} onClick={() => setActive("name")}/>
                </FormControl>

                <FormControl mt={4}>
                    <FormLabel>Email</FormLabel>
                    <Input placeholder={customer.email}  type='email' value={values.email} 
                 
                    focusBorderColor={invalid ? 'crimson' : 'blue.400'}
                    onChange={(e) => setemail(e)} onClick={() => setActive("email")}/>
                       <p style={errorStyle}>
                        {error}
                      </p>
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
                    <RadioGroup onChange={(val) => setgender(val)} value={values.gender} defaultValue='0'>
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
                      updateCustomer(customer.id, values)
                        .then(res => {
                           successNotification(
                            "Customer updated successfully",
                             `${values.name} is added`
                           )
                            setSubmitting(false)
                            onClose()
                            fetchCustomers()  
                        }).catch((err) => {
                          errorNotification(
                            "An error occured while updating the customer"
                           )
                           console.log(err)
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

export {UpdateCustomerModal}