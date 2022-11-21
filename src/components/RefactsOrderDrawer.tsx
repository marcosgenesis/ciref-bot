import { backendApi } from '@/services/api';
import { useSelectRepo } from '@/stores/repo';
import { useCreateWeights } from '@/stores/weights';
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  SimpleGrid,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import React, { useRef, useState } from 'react';
import { RiListOrdered } from 'react-icons/ri';

const RefactsOrderDrawer: React.FC = () => {
  const [weights, setWeights, reset] = useCreateWeights((state) => [
    state.weights,
    state.setWeights,
    state.reset,
  ]);
  const [selectedRepo] = useSelectRepo((state) => [state.selectedRepo]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const btnRef = useRef();
  const labelStyles = {
    mt: '2',
    ml: '-2.5',
    fontSize: 'smaller',
  };
  const queryClient = useQueryClient();

  async function handleCreateWeights() {
    try {
      setLoading(true);
      const weightsFormatted = weights.reduce(
        (a, v) => ({ ...a, [v.key.toLowerCase()]: v.value }),
        {}
      );


      await backendApi.post('/weights', {
        repoUrl: selectedRepo,
        weights: weightsFormatted,
      });
      setLoading(false);
      queryClient.invalidateQueries(['refacts-by-authors-points']);
      reset();
      onClose();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Button
        ref={btnRef}
        onClick={() => {
          onOpen();
          reset(); 
          
        }}
        leftIcon={<RiListOrdered />}
        colorScheme="primary"
        variant="solid"
        size="md"
      >
        Priorizar refatorações
      </Button>

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={() => {
          reset();
          onClose();
        }}
        finalFocusRef={btnRef}
        size="md"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Importância das refatorações</DrawerHeader>

          <DrawerBody>
            <VStack w="100%">
              <Alert
                status="info"
                borderRadius="md"
                colorScheme="primary"
                variant="solid"
              >
                <AlertIcon />
                Abaixo, selecione os respectivos pesos para determinar a
                relevância dos tipos de refatoração dentro deste projeto
              </Alert>
              {[
                'Move',
                'Rename',
                'Modify',
                'Extract',
                'Change',
                'Rename',
                'Add',
                'Remove',
                'Others',
              ].map((i) => (
                <SimpleGrid
                  as={Flex}
                  alignItems="center"
                  w="100%"
                  columns={2}
                  h="12"
                >
                  <Text>{i}</Text>
                  <Slider
                    onChangeEnd={(v) => setWeights({ key: i, value: v })}
                    defaultValue={1}
                    min={1}
                    max={5}
                    step={1}
                  >
                    <SliderMark value={1} {...labelStyles}>
                      1x
                    </SliderMark>
                    <SliderMark value={2} {...labelStyles}>
                      2x
                    </SliderMark>
                    <SliderMark value={3} {...labelStyles}>
                      3x
                    </SliderMark>
                    <SliderMark value={4} {...labelStyles}>
                      4x
                    </SliderMark>
                    <SliderMark value={5} {...labelStyles}>
                      5x
                    </SliderMark>
                    <SliderTrack bg="purple.100">
                      <Box position="relative" right={10} />
                      <SliderFilledTrack bg="primary.500" />
                    </SliderTrack>
                    <SliderThumb boxSize={3} bg="primary.500" />
                  </Slider>
                </SimpleGrid>
              ))}
            </VStack>
          </DrawerBody>

          <DrawerFooter>
            <Button
              variant="outline"
              mr={3}
              onClick={() => {
                reset();
                onClose();
              }}
            >
              Cancelar
            </Button>
            <Button
              colorScheme="primary"
              isLoading={loading}
              onClick={() => handleCreateWeights()}
            >
              Salvar ordem
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default RefactsOrderDrawer;
