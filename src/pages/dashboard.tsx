import {
  Avatar,
  Box,
  Button,
  Code,
  Container,
  Flex,
  Heading,
  Icon,
  Link,
  Spacer,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from '@chakra-ui/react';
import ReactDiffViewer from 'react-diff-viewer';
import {
  RiGithubFill,
  RiGithubLine,
  RiGitPullRequestFill,
  RiGitPullRequestLine,
} from 'react-icons/ri';

import React from 'react';
const oldCode = `
const a = 10
const b = 10
const c = () => console.log('foo')

if(a > 10) {
  console.log('bar')
}

console.log('done')
`;
const newCode = `
const a = 10
const boo = 10

if(a === 10) {
  console.log('bar')
}
`;

const Dashboard: React.FC = () => {
  return (
    <Container maxW="container.xl" centerContent>
      <Flex w="100%" justify="flex-end" m="8">
        <Heading color="purple.500">Ciref BOT</Heading>
        <Spacer />
        <Box textAlign="right" mr="4">
          <Text fontWeight="bold">marcosgenesis</Text>
          <Flex justify="center" align="center">
            <RiGithubFill />
            <Link ml="2">visualizar perfil</Link>
          </Flex>
        </Box>
        <Avatar />
      </Flex>
      <Flex w="90%" bg="gray.100" p="8" borderRadius="lg">
        <Tabs colorScheme="purple" w="100%">
          <TabList>
            <Tab>src/app/index.java</Tab>
            <Tab>src/app/Car.java</Tab>
            <Tab>src/app/Home.java</Tab>
            <Tab>Ops...</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <ReactDiffViewer
                oldValue={oldCode}
                newValue={newCode}
                splitView={true}
              />
            </TabPanel>
            <TabPanel>
              <ReactDiffViewer
                oldValue={oldCode}
                newValue={newCode}
                splitView={true}
              />
            </TabPanel>
            <TabPanel>
              <ReactDiffViewer
                oldValue={oldCode}
                newValue={newCode}
                splitView={true}
              />
            </TabPanel>
            <TabPanel>
              <Flex flexDir="column" justify="center" align="center">
                <Icon as={RiGithubFill} w="40" h="40" color="purple.500" />
                <Heading>Não encontramos nada...</Heading>
                <Text>
                  Não Conseguimos encontrar nenhuma refatoração na sua última PR
                </Text>
              </Flex>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
      <Text fontSize="2xl" fontWeight="bold" textAlign="left" p="8" w="100%">Possíveis Refatorações</Text>
      <VStack spacing="4" w="100%">
        {[0, 1, 2, 3, 4, 5].map((item) => (
          <Flex p="8" borderRadius="lg" bg="gray.100" w="100%">
            <Box>
              <Text fontWeight="bold">EXTRACT METHOD</Text>
              <Code colorScheme="purple">./src/app/Car/Door.java</Code>
            </Box>
            <Spacer />
            <Button leftIcon={<RiGitPullRequestLine />} colorScheme="purple">
              Criar PR
            </Button>
          </Flex>
        ))}
      </VStack>
    </Container>
  );
};

export default Dashboard;
