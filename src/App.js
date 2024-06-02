import React, { useState, useRef } from "react";

import "semantic-ui-css/semantic.min.css";

import {
  Button,
  Grid,
  Header,
  Image,
  Input,
  Segment,
  List,
  ListItem,
  ListHeader,
  FormField,
  TextArea,
  Form, FormTextArea
} from "semantic-ui-react";

import "./App.css";
import axios from 'axios';

const App = () => {
  const [state, setState] = useState({
    token: '',
    project: '',
    ko: '',
    en: '',
    ja: '',
    de: '',
    fr: '',
    it: '',
    es: '',
    pt: '',
    zhHant: '',
    zhHans: '',
    pl: '',
    th: '',
  });

  const onTextChange = (event) => {
    const { id, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };
  
  const translate = async(source, target, text) => {
    if (target === 'zhHant') {
      target = 'zh-hant';
    } else if (target === 'zhHans') {
      target = 'zh-hans';
    }
    
    try {
      let response = await axios({
        method: 'post',
        headers: {
          'Authorization': 'Bearer ' + state.token,
          'x-goog-user-project': state.project,
          'Content-Type': 'application/json; charset=utf-8'
        },
        url: 'https://translation.googleapis.com/language/translate/v2',
        data: {
          q: text,
          source: source,
          target: target,
          format: 'text',
        }
      });

      return response.data.data.translations[0].translatedText;
    } catch (error) {
      console.error(error);
      return "";
    }    
  };

  const translateText = async(from, to) => {
    let text = await translate(from, to, state[from]);
    setState((prevState) => ({
      ...prevState,
      [to]: text,
    }));
  };
  
  const translateAll = async() => {
    setState((prevState) => ({
      ...prevState,
      ja: '',
      de: '',
      fr: '',
      it: '',
      es: '',
      pt: '',
      zhHant: '',
      zhHans: '',
      pl: '',
      th: '',
    }));
    
    await translateText('en', 'ja');
    await translateText('en', 'de');
    await translateText('en', 'fr');
    await translateText('en', 'it');
    await translateText('en', 'es');
    await translateText('en', 'pt');
    await translateText('en', 'zhHant');
    await translateText('en', 'zhHans');
    await translateText('en', 'pl');
    await translateText('en', 'th');
  }
  
  const handleCopyClipBoardLang = async (lang) => {
    try {
      let text = state[lang];
      await navigator.clipboard.writeText(text);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCopyClipBoard = async () => {
    try {
      let text = "";
      text = state.ko + "\t"
          + state.en + "\t"
          + state.ja + "\t"
          + state.de + "\t"
          + state.fr + "\t"
          + state.it + "\t"
          + state.es + "\t"
          + state.pt + "\t"
          + state.zhHant + "\t"
          + state.zhHans + "\t"
          + state.pl + "\t"
          + state.th
      ;
      
      await navigator.clipboard.writeText(text);
    } catch (e) {
    }
  };
  
  return (
      <div className="App">
        <Grid container stackable>
          <Grid.Row>
            <Segment basic>
              <Image src="/LogoB.png" size="medium"/>
              <Header as="h1" size="huge">
                <Header.Subheader>
                  Language tool
                </Header.Subheader>
              </Header>
            </Segment>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column className="body">
              <Form>
                <FormField
                    id="token"
                    onChange={onTextChange}
                    control={Input}
                    label='Access Token'
                />
                <FormField
                    id="project"
                    onChange={onTextChange}
                    control={Input}
                    label='Project'
                />
                <FormTextArea
                    id="ko"
                    onChange={onTextChange}
                    label='Korean'
                    rows='7'
                />
                <FormField
                    control={Button}
                    onClick={() => translateText('ko', 'en')}
                >
                  Translate to English
                </FormField>
                <FormTextArea
                    id="en"
                    onChange={onTextChange}
                    value={state.en}
                    rows='7'
                    label='English'
                />
                <FormField control={Button}
                           onClick={translateAll}
                >
                  Translate All
                </FormField>
              </Form>
              <br/>
              <List>
                <ListItem>
                  <ListHeader className="langH" onClick={() => handleCopyClipBoardLang('ja')}>Japanese</ListHeader>
                  <pre>
                  {state.ja}
                  </pre>
                </ListItem>
                <ListItem>
                  <ListHeader className="langH" onClick={() => handleCopyClipBoardLang('de')}>German</ListHeader>
                  <pre>
                  {state.de}
                  </pre>
                </ListItem>
                <ListItem>
                  <ListHeader className="langH" onClick={() => handleCopyClipBoardLang('fr')}>French</ListHeader>
                  <pre>
                  {state.fr}
                  </pre>
                </ListItem>
                <ListItem>
                  <ListHeader className="langH" onClick={() => handleCopyClipBoardLang('it')}>Italian</ListHeader>
                  <pre>
                  {state.it}
                  </pre>
                </ListItem>
                <ListItem>
                  <ListHeader className="langH" onClick={() => handleCopyClipBoardLang('es')}>Spanish</ListHeader>
                  <pre>
                  {state.es}
                  </pre>
                </ListItem>
                <ListItem>
                  <ListHeader className="langH" onClick={() => handleCopyClipBoardLang('pt')}>Portuguese</ListHeader>
                  <pre>
                  {state.pt}
                  </pre>
                </ListItem>
                <ListItem>
                  <ListHeader className="langH" onClick={() => handleCopyClipBoardLang('zhHant')}>Chinese Traditional</ListHeader>
                  <pre>
                  {state.zhHant}
                  </pre>
                </ListItem>
                <ListItem>
                  <ListHeader className="langH" onClick={() => handleCopyClipBoardLang('zhHant')}>Chinese Simplified</ListHeader>
                  <pre>
                  {state.zhHans}
                  </pre>
                </ListItem>
                <ListItem>
                  <ListHeader className="langH" onClick={() => handleCopyClipBoardLang('pl')}>Polish</ListHeader>
                  <pre>
                  {state.pl}
                  </pre>
                </ListItem>
                <ListItem>
                  <ListHeader className="langH" onClick={() => handleCopyClipBoardLang('th')}>Thai</ListHeader>
                  <pre>
                  {state.th}
                  </pre>
                </ListItem>
              </List>

              <Button primary onClick={() => handleCopyClipBoard()}>
              Copy to clipboard
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
</div>
)
  ;
};

export default App;