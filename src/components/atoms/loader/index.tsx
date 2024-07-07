import { Flex } from "@chakra-ui/react";
import { Oval } from "react-loader-spinner";

function Loader() {
  return (
    <Flex minH={"80vh"} w={"100%"} justifyContent={"center"} alignItems={"center"}>
      <Oval
        height={300}
        width={300}
        color="orange"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="orange"
        strokeWidth={5}
        strokeWidthSecondary={2}
      />
    </Flex>
  );
}

export default Loader;
