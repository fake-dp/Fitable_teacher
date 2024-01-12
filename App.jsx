import {RecoilRoot} from 'recoil';
import AppInner from './AppInner';

function App(props) {
  return (
    <RecoilRoot>
      <AppInner />
    </RecoilRoot>
  );
}

export default App;
