import './App.scss'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()
import { createRoot } from 'react-dom/client';
import {
  AdaptivityProvider,
  ConfigProvider,
  AppRoot,
  SplitLayout,
  SplitCol,
  View,
  Panel,
  PanelHeader,
  Header,
  Group,
  usePlatform,
  CellButton,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import { useState } from 'react';
import Fact from './components/Fact/Fact';
import Age from './components/Age/Age';
import Navigation from './components/Navigation/Navigation';
import data from "./mock/static.json";

interface IPanelWrapper {
  id: string,
  header: string,
  navigation: JSX.Element,
  vidgedText: string,
  vidget: JSX.Element
}

const App = (): JSX.Element => {
  const platform = usePlatform();
  const [activePanel, setActivePanel] = useState('main');

  const PanelWrapper = ({id, header, navigation, vidgedText, vidget}: IPanelWrapper) => {

    return (
    <Panel id={id}>
    <PanelHeader>{header}</PanelHeader>
    <Group header={
      <Header mode="secondary">{text.navTitle}</Header>
    }>
    {navigation}
    
    </Group>
    <Group header={
      <Header mode="secondary">{vidgedText}</Header>
    }>
    <div className='cell__wrapper'>
      {vidget}
    </div>
    </Group>
    </Panel>)
  }

  const text = data.text.app;
  return (
    <QueryClientProvider client={queryClient}>
    <AppRoot>
      <SplitLayout header={platform !== 'vkcom' && <PanelHeader delimiter="none" />}>
        <SplitCol autoSpaced>
          <View activePanel={activePanel}>
            
            <PanelWrapper 
            id={"main"} 
            header={text.toMain} 
            navigation={
            <>
              <CellButton onClick={() => setActivePanel('age')}>{text.toAge}</CellButton>
              <CellButton onClick={() => setActivePanel('fact')}>{text.toFact}</CellButton>
            </>} 
            vidgedText={text.navText} 
            vidget={<Navigation setActive={setActivePanel} />} 
            />

            <PanelWrapper 
            id={"age"} 
            header={text.ageTitle} 
            navigation={
            <>
              <CellButton onClick={() => setActivePanel('main')}>{text.toMain}</CellButton>
            </>} 
            vidgedText={text.baitAge} 
            vidget={<Age />} 
            />
            
            <PanelWrapper 
            id={"fact"} 
            header={text.factTitle} 
            navigation={
            <>
              <CellButton onClick={() => setActivePanel('main')}>{text.toMain}</CellButton>
            </>} 
            vidgedText={text.baitFact} 
            vidget={<Fact />} 
            />
          </View>
        </SplitCol>
      </SplitLayout>
    </AppRoot>
    </QueryClientProvider>
  );
};

const container = document.getElementById('root');
const root = createRoot(container!)
root.render(
  <ConfigProvider>
    <AdaptivityProvider>
      <App />
    </AdaptivityProvider>
  </ConfigProvider>,
);

export default App