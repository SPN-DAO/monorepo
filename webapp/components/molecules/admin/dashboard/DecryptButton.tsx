import { Button, ButtonProps, Text } from "@chakra-ui/react";

function DecryptButton(props: ButtonProps) {
  delete props.width;
  return (
    <Button width={"172px"} {...props}>
      <Text>Decrypt</Text>
    </Button>
  );
}

export default DecryptButton;
