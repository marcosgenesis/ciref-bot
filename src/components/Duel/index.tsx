import { backendApi } from '@/services/api';
import { useDuelStore } from '@/stores/duel';
import { useSelectRepo } from '@/stores/repo';
import { useTimeWindow } from '@/stores/timeWindow';
import {
  Box,
  Center,
  Divider,
  Flex,
  HStack,
  Icon,
  Select,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { RiUser2Line, RiUserLine } from 'react-icons/ri';
import DuelPersonItem from './DuelPersonItem';

// import { Container } from './styles';

const Duel: React.FC = () => {
  const [duelData, setDuelData] = useState([]);
  const { challenged, challenger } = useDuelStore(
    ({ challenger, challenged }) => ({ challenged, challenger })
  );
  const [startDate, endDate] = useTimeWindow((state) => [
    state.startDate,
    state.endDate,
  ]);
  const { selectedRepo, repos } = useSelectRepo(({ selectedRepo, repos }) => ({
    selectedRepo,
    repos,
  }));

  const { data } = useQuery(
    ['repo-people'],
    async () => {
      const findRepoInfo = repos.find((r) => r.repoName === selectedRepo);

      return backendApi
        .get(`/repo/people/${findRepoInfo.repoId}`)
        .then((r) => r.data);
    },
    { initialData: [] }
  );

  useEffect(() => {
    if (challenger && challenged) {
      const findRepoInfo = repos.find((r) => r.repoName === selectedRepo);
      backendApi
        .post('/duel', {
          repoUrl: findRepoInfo.repoUrl,
          user1: challenger,
          user2: challenged,
          startDate,
          endDate,
        })
        .then((response) => setDuelData(Object.entries(response.data)));
    }
  }, [challenged, challenger]);

  return (
    <HStack bg="white" p="4" spacing="4" borderRadius="md">
      <VStack>
        <Box>
          <Text fontWeight="semibold">Duelo de desenvolvedores</Text>
          <Text fontSize="smaller">
            Compare as refatorações feitas pelos devs
          </Text>
        </Box>
        <Divider />
        <VStack w="100%" spacing="4">
          {data.length && data.map((i) => <DuelPersonItem login={i.login} />)}
        </VStack>
      </VStack>
      <Divider orientation="vertical" />
      {/* <Box>{console.log(duelData)}</Box> */}
    </HStack>
  );
};

export default Duel;
