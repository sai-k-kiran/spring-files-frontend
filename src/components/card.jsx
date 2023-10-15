import {
  Badge,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Spacer,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
  AlertDialog, 
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogBody,
  AlertDialogHeader
} from '@chakra-ui/react'
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import { deleteCustomer } from '../services/client'
import { useRef, useState } from 'react'
import { successNotification } from '../services/Notification'
import { UpdateCustomerModal } from '../components/UpdateCustomerModal'

 const Card = ({customer, fetchCustomers}) => {
  const cancelRef = useRef()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { isOpen : isopen, 
    onOpen : onopen, 
    onClose : onclose } = useDisclosure()

  const [overlay, setOverlay] = useState(false)

  return (
    <Center py={6}>
      <Stack
        borderWidth="1px"
        borderRadius="lg"
        w={{ sm: '100%', md: '540px' }}
        height={{ sm: '476px', md: '20rem' }}
        direction={{ base: 'column', md: 'row' }}
        // eslint-disable-next-line react-hooks/rules-of-hooks
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        padding={4}>
        <Flex flex={1} bg="blue.200">
        <Image objectFit="cover" boxSize="100%"
            src={
              'https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1240w,f_auto,q_auto:best/rockcms/2023-03/230315-leonardo-da-vinci-mb-0816-fe9673.jpg'
            }
            alt="#"
          />
        </Flex>
        <Stack
          flex={1}
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          p={1}
          pt={2}>
          <Heading fontSize={'2xl'} fontFamily={'body'}>
            {customer.name}
          </Heading>
          <Text fontWeight={600} color={'gray.500'} size="sm" mb={4}>
            {customer.email}
          </Text>
         
          <Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
          <Badge
              px={2}
              py={1}
              // eslint-disable-next-line react-hooks/rules-of-hooks
              bg={useColorModeValue('gray.50', 'gray.800')}
              fontWeight={'400'}>
              ID : {customer.id}
            </Badge>
            <Badge
              px={2}
              py={1}
              // eslint-disable-next-line react-hooks/rules-of-hooks
              bg={useColorModeValue('gray.50', 'gray.800')}
              fontWeight={'400'}>
              Age : {customer.age}
            </Badge>
          </Stack>

          <Stack
            width={'100%'}
            mt={'5rem'}
            direction={'row'}
            pl={6}
            pr={6}
           >
            <Button
              onClick={() => {
                setOverlay(true)
                onopen()
              }}
              flex={1}
              fontSize={'sm'}
              rounded={'full'}
              bg={'blue.400'}
              color={'white'}
              mr={2}
              boxShadow={
                '0px 1px 15px -5px rgb(64 62 62 / 48%), 0 2px 10px -5px rgb(64 56 49 / 43%)'
              }
              _hover={{
                bg: 'blue.500',
              }}
              _focus={{
                bg: 'blue.500',
              }}>
              <EditIcon />
            </Button>
            <Button
              onClick={onOpen}
              flex={1}
              ml={2}
              fontSize={'sm'}
              rounded={'full'}
              bg={'red.400'}
              color={'white'}
              boxShadow={
                '0px 1px 15px -5px rgb(229 62 62 / 48%), 0 2px 10px -5px rgb(228 56 49 / 43%)'
              }
              _hover={{
                bg: 'red.500',
              }}
              _focus={{
                bg: 'red.500',
              }}>
              <DeleteIcon />
            </Button>
          </Stack>
          <AlertDialog
              isOpen={isOpen}
              leastDestructiveRef={cancelRef}
              onClose={onClose}
            >
              <AlertDialogOverlay>
                <AlertDialogContent>
                  <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                    Delete Customer
                  </AlertDialogHeader>

                  <AlertDialogBody>
                    Are you sure? You can't undo this action afterwards.
                  </AlertDialogBody>

                  <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={onClose}>
                      Cancel
                    </Button>
                    <Button colorScheme='red' ml={3}
                        onClick={() => {
                          deleteCustomer(customer.id)
                          .then(res => {
                            successNotification(
                              "Customer Deleted",
                              "Customer is no longer in the database"
                            )
                          })
                          .catch(err => {
                            console.log(err)
                          })
                          .finally(() => {
                            fetchCustomers()
                            onClose()
                          })
                        }
                          }>
                      Delete
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialogOverlay>
            </AlertDialog>
        </Stack>
      </Stack>
      <UpdateCustomerModal
       isOpen={isopen} 
      overlay={overlay} 
      onClose={onclose} 
      fetchCustomers={fetchCustomers}
      customer={customer}
      />
    </Center>
  )
}

export default Card