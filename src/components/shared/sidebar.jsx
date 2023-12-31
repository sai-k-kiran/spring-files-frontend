import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Wrap,
  WrapItem,
  Text,
  SkeletonText,
  SkeletonCircle
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon, AddIcon } from '@chakra-ui/icons'
import Card from '../card'
import CreateCustomerModal from '../CreateCustomerModal'
import { useState } from 'react'
import { useAuth } from '../context/authContext'
import {useNavigate} from 'react-router-dom'

const Links = ['Dashboard', 'Projects', 'Team']

const NavLink = ({children}) => {

  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
      href={'#'}>
        {children}
    </Box>
  )
}

export default function Sidebar({customer, fetchCustomers}) {
  
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [overlay, setOverlay] = useState(false) 
  const {user, logOut} = useAuth()
  console.log(user.name)

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box>Logo</Box>
            <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <Button
              onClick = {() => {
                setOverlay(true)
                onOpen()
              }}
              variant={'solid'}
              colorScheme={'teal'}
              size={'sm'}
              mr={4}
              leftIcon={<AddIcon />
             }>
                Add Customer
            </Button>
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}>
                <Avatar
                  size={'sm'}
                  src={
                    'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                  }
                />
              </MenuButton>
              <MenuList>
                <MenuItem>{user.name}</MenuItem>
                <MenuItem>Link 2</MenuItem>
                <MenuDivider />
                <MenuItem onClick={() => {
                  logOut()
                  localStorage.removeItem("user")
                }}>
                  Log Out
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>

      <Box p={4}>
        <Wrap columns={2} spacing='50px' justify='center'>
          {customer.length == 0 ? <Text>No customers available</Text> : ""}
          {customer.length != 0 && customer.map((c) => (
              <WrapItem key={c.id}>
                  <Card customer={c} fetchCustomers={fetchCustomers}/>
              </WrapItem>
            ))}
        </Wrap>
      </Box>
      <CreateCustomerModal
       isOpen={isOpen} 
      overlay={overlay} 
      onClose={onClose} 
      fetchCustomers={fetchCustomers}/>
      
    </>
  )
}