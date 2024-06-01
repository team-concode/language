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
  Form
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

  const handleCopyClipBoard = async () => {
    try {
      let text = "";
      text = state.ko + "\t"
          + state.en + "\t"
          + state.ja + "\t"
          + state.de + "\t"
          + state.fr + "\t"
          + state.it + "\t"
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
                <FormField
                    id="ko"
                    onChange={onTextChange}
                    control={TextArea}
                    label='Korean'
                />
                <FormField
                    control={Button}
                    onClick={() => translateText('ko', 'en')}
                >
                  Translate to English
                </FormField>
                <FormField
                    id="en"
                    control={TextArea}
                    onChange={onTextChange}
                    value={state.en}
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
                  <ListHeader>Japanese</ListHeader>
                  {state.ja}
                </ListItem>
                <ListItem>
                  <ListHeader>German</ListHeader>
                  {state.de}
                </ListItem>
                <ListItem>
                  <ListHeader>French</ListHeader>
                  {state.fr}
                </ListItem>
                <ListItem>
                  <ListHeader>Italian</ListHeader>
                  {state.it}
                </ListItem>
                <ListItem>
                  <ListHeader>Spanish</ListHeader>
                  {state.es}
                </ListItem>
                <ListItem>
                  <ListHeader>Portuguese</ListHeader>
                  {state.pt}
                </ListItem>
                <ListItem>
                  <ListHeader>Chinese Traditional</ListHeader>
                  {state.zhHant}
                </ListItem>
                <ListItem>
                  <ListHeader>Chinese Simplified</ListHeader>
                  {state.zhHans}
                </ListItem>
                <ListItem>
                  <ListHeader>Polish</ListHeader>
                  {state.pl}
                </ListItem>
                <ListItem>
                  <ListHeader>Thai</ListHeader>
                  {state.th}
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