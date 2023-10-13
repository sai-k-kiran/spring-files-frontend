import { createStandaloneToast } from '@chakra-ui/react'

const {toast} = createStandaloneToast()

const Toast = (title, desc, status) => {
    toast({
        title,
        desc,
        status,
        isClosable : true,
        duration: 4000
    })
}

export const successNotification = (title, desc) => {
    Toast(title, desc, "success")
}

export const errorNotification = (title, desc) => {
    Toast(title, desc, "error")
}