import { Flex, Text } from "@chakra-ui/react";

function Error404() {
    return (
        <Flex
            alignItems={'center'}
            justify={'center'}
            fontSize={'100px'}
            w={"100%"}
            h={"100vh"}
            style={{
                background: 'linear-gradient(to right, #ffffff, #808080)', 
            }}
        >
            <Text color="black">ERROR 404</Text>
        </Flex>
    );
}

export default Error404;
