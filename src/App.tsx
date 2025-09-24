import { useState } from 'react'
import Weather from './components/Weather'
import Clothes from './components/Clothes'

import { Container, ContentWrap, AvataArea, LookupArea, RoundedButton } from "./components/StyleComponents";
import data from "./data/data.json"

const suggestion = data.suggestion;
const color = data.color;

interface OutfitState {
  topColor: string | null;
  bottomColor: string | null;
  topButtonNames: Record<string,string>;
  bottomButtonNames: Record<string,string>;
}

function App() {
  const [temp, setTemp] = useState<number | null>(null);
  const [outfit, setOutfit] = useState<OutfitState>({
    topColor: null,
    bottomColor: null,
    topButtonNames: Object.fromEntries(Object.keys(color.top).map((name) => [name, name])),
    bottomButtonNames: Object.fromEntries(Object.keys(color.bottom).map((name) => [name, name])),
  });

  
  const matched = temp !== null 
  ? suggestion.find(
    (item) =>
      (item.range.min === null || temp >= item.range.min) &&
    (item.range.max === null || temp <= item.range.max)
  )
  : null;

 function handleTopColor( value: { hex: string; relations: Record<string,string> }) {
  setOutfit((prev) => ({
    ...prev,
    topColor: value.hex,
    topButtonNames: Object.fromEntries(Object.keys(prev.topButtonNames).map((key) => [key, key])),
    bottomButtonNames: Object.fromEntries(
      Object.keys(prev.bottomButtonNames).map((key) => [key, value.relations[key] ?? key])
    ),
  }));
}

function handleBottomColor(value: { hex: string; relations: Record<string,string> }) {
  setOutfit((prev) => ({
    ...prev,
    bottomColor: value.hex,
    bottomButtonNames: Object.fromEntries(Object.keys(prev.bottomButtonNames).map((key) => [key, key])),
    topButtonNames: Object.fromEntries(
      Object.keys(prev.topButtonNames).map((key) => [key, value.relations[key] ?? key])
    ),
  }));
}


  return (
    <Container>
      <h2 className="">오늘 뭐 입지?</h2>
      <Weather onTempChange={setTemp}/>
      <AvataArea>
        <img src="./image/avata.svg" alt="avata" />
        {temp !== null && temp < 17 && (
          <LookupArea>
            <img src="./image/top/tshist_long.svg" alt="긴소매" />
          </LookupArea>
        )}
        {matched?.bottom && (
          <LookupArea>
            <Clothes name={matched.bottom} color={outfit.bottomColor ?? undefined} />
          </LookupArea>
        )}
        {matched?.top && (
          <LookupArea>
            <Clothes name={matched.top} color={outfit.topColor ?? undefined} />
          </LookupArea>
        )}
      </AvataArea>
      <div>
        <span style={{fontSize:"1.25rem", fontWeight:"700"}}>상의 컬러</span>
        <ContentWrap>
          {Object.entries(color.top).map(([name, value]) => (
            <RoundedButton
              key={name}
              backgroundColor={value.hex}
              onClick={() => handleTopColor(value)}
            >
              {outfit.topButtonNames[name]}
            </RoundedButton>
          ))}
                  </ContentWrap>
                  <span style={{fontSize:"1.25rem", fontWeight:"700"}}>하의 컬러</span>
                  <ContentWrap>
          {Object.entries(color.bottom).map(([name, value]) => (
            <RoundedButton
              key={name}
              backgroundColor={value.hex}
              onClick={() => handleBottomColor(value)}
            >
              {outfit.bottomButtonNames[name]}
            </RoundedButton>
          ))}
        </ContentWrap>
      </div>
    </Container>
  )
}

export default App
