import {
  Box,
  Button,
  Divider,
  Flex,
  IconButton,
  Text,
  Tooltip,
  VStack,
} from '@chakra-ui/react';
import { signOut, useSession } from 'next-auth/react';
import React from 'react';
import { RiGitRepositoryLine, RiLogoutCircleRLine } from 'react-icons/ri';

// import { Container } from './styles';

const Profile: React.FC = () => {
  const { data: session } = useSession();

  return (
    <VStack w="100%" p="4" spacing="8">
      <Divider></Divider>
      <Button w="100%" variant="outline" leftIcon={<RiGitRepositoryLine />}>
        Add Repositório
      </Button>
      <Flex alignItems="center" justifyContent="space-around" w="100%">
        <Box as="img" src={session?.user.avatar} width="16" borderRadius="16" />
        <Box>
          <Text fontSize="lg" fontWeight="medium">
            {session?.user.name}
          </Text>
          <Text color="gray.400" fontWeight="regular">
            @{session?.user.username}
          </Text>
        </Box>
        <Tooltip label="Sair da aplicação">
          <IconButton
            aria-label="sair"
            colorScheme="red"
            variant="ghost"
            onClick={() => signOut()}
            icon={<RiLogoutCircleRLine />}
          />
        </Tooltip>
      </Flex>
    </VStack>
  );
};

export default Profile;
