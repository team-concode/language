import _ from 'lodash'
import React from 'react'
import {
  Container,
  Label,
  Image,
} from 'semantic-ui-react'

import './MainBody.css';

const MainBody = () => (
  <div className='MainBody'>
    <Container>
      <Image size='small' src='/Logo.png' style={{ marginRight: '1.5em' }} align='center'/>
      <div className='Body'>
        <div>
          WE CODE YOUR FUN
        </div>

        <div className='GameList'>
          <div>
            <Image size='medium' src='/TheWayHome.png' style={{ marginRight: '1.5em' }} align='center'/>
            <div className='GameTitle'>
              The Way Home
            </div>
            <div className="GameDesc">
              A rogue-like dungeon crawler
            </div>
              <Label as='a' color='red'>
                  Upcoming
              </Label>
          </div>
        </div>
      </div>
    </Container>
  </div>
)

export default MainBody