import { Box, Button, ButtonGroup, HStack, Icon } from "@chakra-ui/react";

//  Confirm Button Icon
const checkSvgIcon = () => {
    return <>
        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M3.00025 8.00057C2.73625 8.00057 2.48125 7.89657 2.29325 7.70757L0.29325 5.70757C-0.09775 5.31657 -0.09775 4.68457 0.29325 4.29357C0.68425 3.90257 1.31625 3.90257 1.70725 4.29357L2.84525 5.43157L6.16825 0.445572C6.47425 -0.0144275 7.09425 -0.138428 7.55525 0.168572C8.01425 0.475572 8.13825 1.09557 7.83225 1.55557L3.83225 7.55557C3.66625 7.80457 3.39625 7.96657 3.09925 7.99557C3.06525 7.99857 3.03325 8.00057 3.00025 8.00057Z" fill="white" fillOpacity="0.88" />
        </svg>

    </>
}
// Close Button Icon

const closeSvgIcon = () => {
    return <>
        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M5.41413 4.00001L7.70713 1.70701C8.09813 1.31601 8.09813 0.684006 7.70713 0.293006C7.31613 -0.0979941 6.68413 -0.0979941 6.29313 0.293006L4.00013 2.58601L1.70713 0.293006C1.31613 -0.0979941 0.684128 -0.0979941 0.293128 0.293006C-0.0978721 0.684006 -0.0978721 1.31601 0.293128 1.70701L2.58613 4.00001L0.293128 6.29301C-0.0978721 6.68401 -0.0978721 7.31601 0.293128 7.70701C0.488128 7.90201 0.744128 8.00001 1.00013 8.00001C1.25613 8.00001 1.51213 7.90201 1.70713 7.70701L4.00013 5.41401L6.29313 7.70701C6.48813 7.90201 6.74413 8.00001 7.00013 8.00001C7.25613 8.00001 7.51213 7.90201 7.70713 7.70701C8.09813 7.31601 8.09813 6.68401 7.70713 6.29301L5.41413 4.00001Z" fill="white" fillOpacity="0.88" />
        </svg>


    </>
}


const TraitsButton = ({ showConfirmButton }: { showConfirmButton?: boolean }) => {
    return <>


        <ButtonGroup as={HStack} w='full' bg='#292929'
            position={'absolute'} bottom='0' left='0' right='0' minH={14} justify='center' size='sm'
            color='#fff !important'
            spacing='14px'
            shadow='sm'
        >




            <Button colorScheme='gray' bg='#474747'
                py='10px'
                px='20px'
                fontWeight={400}
                leftIcon={<Icon as={closeSvgIcon} fontSize={'9px'} fontWeight={600} />}
                borderRadius='6px' color='rgba(255, 255, 255, 0.88)'>Cancel</Button>
            {showConfirmButton &&
                <Button bg='#159D50' borderRadius='6px'
                    py='10px'
                    px='20px'
                    fontWeight={400}

                    colorScheme={'green'}
                    leftIcon={<Icon as={checkSvgIcon} fontSize={'9px'} fontWeight={600} />}
                    color='rgba(255, 255, 255, 0.88)'

                >Confirm</Button>
            }

        </ButtonGroup>

    </>
}


export default TraitsButton