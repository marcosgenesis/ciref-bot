import {
  RiGithubFill,
  RiGithubLine,
  RiGitPullRequestFill,
  RiGitPullRequestLine,
  RiLogoutBoxFill,
  RiLogoutBoxLine,
} from 'react-icons/ri';
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });
import React, { useEffect, useState } from 'react';
import { getSession, signIn, signOut, useSession } from 'next-auth/react';
import { api, apiGithub, backendApi } from '@/services/api';
import RefactItem from '@/components/RefactItem';
import {
  Box,
  Button,
  Spacer,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from '@chakra-ui/react';
import { colors } from '@twooni-ui/tokens';
import FirstAccess from '@/components/FirstAccess';
import RefactContainer from '@/components/RefactContainer';
import { useSelectRepo } from '@/stores/repo';
import dynamic from 'next/dynamic';
export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}

const Home: React.FC = () => {
  const { data: session } = useSession();
  const [firstAccess, setFirstAccess] = useState(false);
  const selectedRepo = useSelectRepo((state) => state.selectedRepo);
  const [refactsTypes, setRefactsTypes] = useState(false);

  useEffect(() => {
    if (session?.user) {
      backendApi
        .get(`/user/${session?.user.username}`)
        .then((a) => setFirstAccess(a.data.firstAccess));
    }
  }, []);

  useEffect(() => {
    backendApi
      .get(`/info/`, { params: { url: selectedRepo } })
      .then((a) => setRefactsTypes(a.data));
  }, [selectedRepo]);

  return (
    <Box
      margin={0}
      padding={0}
      boxSizing="border-box"
      width="100%"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        width="70"
        maxWidth="300px"
        height="80%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        outline="1px solid"
        outlineColor="gray.700"
        // borderRadius="md"
      >
        <Box as="img" src={session?.user.avatar} width="100%" />
        <Text fontSize="lg" fontWeight="medium">
          {session?.user.name}
        </Text>
        <Text color="gray.400">@{session?.user.username}</Text>
        <VStack w="100%" height="100%" mt="2" padding="2">
          <ApexCharts
            type="donut"
            options={{
              chart: {
                type: 'donut',
                width: '300px',
                height: '300px',
              },
              dataLabels: {
                enabled: true,
                formatter(val, opts?) {
                  return val
                },
              },
              plotOptions: {
                pie: {
                  donut: {
                    size: '50%',
                    labels: {
                      total: {
                        showAlways: true,
                        label: 'Qtd total',
                        color: '#fff' 
                      },
                    },
                  },
                },
              },
              legend: { show: false },
              labels: Object.keys(refactsTypes),
            }}
            series={Object.values(refactsTypes)}
          />
          <Spacer />
          <Button
            width="100%"
            variant="outline"
            onClick={() => signOut()}
            leftIcon={<RiLogoutBoxLine size={16} />}
          >
            Sair
          </Button>
        </VStack>
      </Box>
      <Box
        width="70%"
        height="80%"
        outline="1px solid"
        outlineColor={colors.gray700}
      >
        {!firstAccess ? (
          <FirstAccess setFirstAccess={setFirstAccess} />
        ) : (
          <RefactContainer />
        )}
      </Box>
    </Box>
  );
};

export default Home;
