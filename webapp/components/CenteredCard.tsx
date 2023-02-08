import { Center, Card, Box } from "@chakra-ui/react";

interface CenteredCardProps {
  children: React.ReactNode;
  prependedContent?: React.ReactNode;
  appendedContent?: React.ReactNode;
}

const CenteredCard = ({
  children,
  prependedContent,
  appendedContent,
}: CenteredCardProps) => {
  return (
    <>
      <Center
        sx={{
          flex: 1,
        }}
      >
        <Box>
          {prependedContent && <Box mb={16}>{prependedContent}</Box>}
          <Card p={12}>{children}</Card>
          {appendedContent && <Box>{appendedContent}</Box>}
        </Box>
      </Center>
    </>
  );
};

export default CenteredCard;
