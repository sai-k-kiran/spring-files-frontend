import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    FormErrorMessage,
    NumberInput,
    NumberInputField,
    NumberIncrementStepper,
    NumberDecrementStepper,
    NumberInputStepper,
    RadioGroup,
    Radio
  } from '@chakra-ui/react'
  import { useState, useEffect } from 'react';
  import {useNavigate} from 'react-router-dom'
  import { saveCustomer } from '../../services/client';
  import { errorNotification, successNotification } from '../../services/Notification';
  
  export default function Register() {
    const navigate = useNavigate()
    const [values, setValues] = useState({name : "", email : "", age : 15, gender : '', password: ""})
    const [error, setError] = useState(null);
 
      const [invalid, setInValid] = useState(true)
      const [submitting, setSubmitting] = useState(false)

      const [emptyFields, setEmptyFields] = useState(false) 
  
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
  
        const setPassword = (e) => {
          setValues((values) => ({ ...values, password: e.target.value }));
        }
        const setname = (e) => {
            setValues((values) => ({ ...values, name: e.target.value }));
          }
        const setemail = (e) => {
            if(e.target.value == ""){
                setError("Email is required")
            }
            else if(!isValidEmail(e.target.value)) {
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
      
  
        useEffect(() => {
          if(values.password != "" && values.name != "" && error == null){
            setInValid(false);
            setEmptyFields(false)
          }
          else{
            setInValid(true)
            setEmptyFields(false)
          }
        }, [values.name, values.email, values.password])
  
  
    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Create your own account</Heading>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
                <FormControl isRequired >
                    <FormLabel>Full name</FormLabel>
                    <Input placeholder='Full Name' value={values.name} 
                    onChange={(e) => setname(e)}/>
                    {(emptyFields) ?(
                      <FormErrorMessage>
                        Name is required
                      </FormErrorMessage>
                    ) : ''}
                </FormControl>
                <FormControl mt={1} isRequired isInvalid={error}>
                    <FormLabel>Email</FormLabel>
                    <Input placeholder='Email' type='email' value={values.email} 
                    onChange={(e) => setemail(e)}/>
                    {(error) ? (
                      <FormErrorMessage>
                        Email is invalid
                      </FormErrorMessage>
                    ) : ''}
                </FormControl>
                <FormControl mt={1} isRequired isInvalid={emptyFields}>
                    <FormLabel>Password</FormLabel>
                    <Input placeholder='Password' type='password' value={values.password} 
                    onChange={(e) => setValues((values) => ({...values, password : e.target.value}))} />
                    {(emptyFields) ? (
                      <FormErrorMessage>
                        Password is required
                      </FormErrorMessage>
                    ) : ''}
                </FormControl>
                <FormControl mt={1}>
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
                
                <FormControl mt={1}>
                    <FormLabel>Gender</FormLabel>
                    <RadioGroup onChange={(val) => setgender(val)} defaultValue={0} value={values.gender}>
                        <Stack direction='row'>
                            <Radio value='0'>Male</Radio>
                            <Radio value='1'>Female</Radio>
                        </Stack>
                    </RadioGroup>
                </FormControl>
              <Stack mt={4}>
                <Button
                isDisabled={invalid} bg={'blue.400'} color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }} 
                  onClick={() => {
                    setSubmitting(true)
                    saveCustomer(values)
                      .then(res => {
                         successNotification(
                          "Customer created successfully",
                           `${values.name} is added`
                         )
                         navigate("/")
                      }).catch(err => {
                        errorNotification(
                          "An error occured while creating the customer",
                           `Error: ${err}`
                         )
                         console.log(err)
                      }).finally(() => {
                        setSubmitting(false)
                      })
                  }}
                  >
                  Sign Up
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    )
  }
  