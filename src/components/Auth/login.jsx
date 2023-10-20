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
  FormErrorMessage
} from '@chakra-ui/react'
import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
import { useAuth } from '../context/authContext';
import { errorNotification } from '../../services/Notification';

export default function Login() {
    const {user, login} = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
      if(user != null) navigate("/dashboard")
    })

    const [values, setValues] = useState({username : "", password: ""})
    const [invalid, setInValid] = useState(true)
    const [error, setError] = useState(false)
    const [submitting, setSubmitting] = useState(false)

    function isValidEmail(email) {
        if(email.length != 0)
            return /\S+@\S+\.\S+/.test(email);
        return true
    }

    const setPassword = (e) => {
        setValues((values) => ({ ...values, password: e.target.value }));
      }
      const setUsername = (e) => {
        if(!isValidEmail(e.target.value)) {
          setError('Email is invalid')
        } else {
          setError(null);
        }
        setValues((values) => ({ ...values, username: e.target.value }))
      }

      useEffect(() => {
        if(values.password != "" && values.username != "" && !error) setInValid(false)
        else setInValid(true)
      }, [values.username, values.password])


  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'} align={'center'}>
            Log in to enjoy all of our cool <Text color={'blue.400'}>content and features</Text>
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
                <FormControl isInvalid={error}>
                    <FormLabel>Email Address</FormLabel>
                    <Input placeholder='email@abc.com' value={values.username} 
                    onChange={(e) => setUsername(e)}/>
                    {values.username.length != 0 && error ? (
                      <FormErrorMessage>
                        Email is invalid
                      </FormErrorMessage>
                    ) : ''}
                </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" value={values.password} 
              onChange={(e) => setPassword(e)}/>
            </FormControl>
            <Stack spacing={4}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Checkbox>Remember me</Checkbox>
              </Stack>  
              <Button fontSize={'m'} color={'blue.400'} align={'center'} bg={'transparent'}
                  onClick={() => {navigate("/register")}}>
                 Create an account     
              </Button>
              <Button
              isDisabled={invalid} bg={'blue.400'} color={'white'}
                _hover={{
                  bg: 'blue.500',
                }} 
                onClick={() => {
                    setSubmitting(true)
                    login(values).then(res => {
                        navigate("/dashboard")                    
                    }).catch(err => {
                      (err.response.data.statusCode == 401) ? 
                      errorNotification(
                        "Username or Password wrong",
                        err.message
                        ) : ""
                        console.log(err.response.data)
                    }).finally(() => {
                      setSubmitting(false)
                    })
                }}
                >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}
